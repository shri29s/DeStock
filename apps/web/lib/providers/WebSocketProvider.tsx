'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { getWebSocketUrl, WS_CONFIG } from '@/lib/constants/shared';

interface PriceUpdate {
  companyId: number;
  price: number;
  change: number;
  volume: number;
  timestamp: number;
}

interface OrderBookUpdate {
  companyId: number;
  bids: Array<{ price: number; amount: number; total: number }>;
  asks: Array<{ price: number; amount: number; total: number }>;
}

interface TradeUpdate {
  companyId: number;
  price: number;
  amount: number;
  timestamp: number;
  type: 'buy' | 'sell';
}

interface WebSocketContextValue {
  isConnected: boolean;
  priceUpdates: Map<number, PriceUpdate>;
  orderBooks: Map<number, OrderBookUpdate>;
  recentTrades: Map<number, TradeUpdate[]>;
  subscribe: (companyId: number) => void;
  unsubscribe: (companyId: number) => void;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error' | 'disabled';
  error: string | null;
  reconnect: () => void;
  hasRetryableError: boolean;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}

interface WebSocketProviderProps {
  children: React.ReactNode;
  url?: string;
  enabled?: boolean;
}

export function WebSocketProvider({ children, url, enabled = true }: WebSocketProviderProps) {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const connectionTimeoutRef = useRef<NodeJS.Timeout>();
  
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error' | 'disabled'>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [priceUpdates, setPriceUpdates] = useState<Map<number, PriceUpdate>>(new Map());
  const [orderBooks, setOrderBooks] = useState<Map<number, OrderBookUpdate>>(new Map());
  const [recentTrades, setRecentTrades] = useState<Map<number, TradeUpdate[]>>(new Map());
  const [subscriptions, setSubscriptions] = useState<Set<number>>(new Set());

  // Get WebSocket URL from configuration
  const wsUrl = url || getWebSocketUrl();

  const clearTimeouts = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = undefined;
    }
  };

  const getReconnectDelay = (): number => {
    const baseDelay = WS_CONFIG.reconnectDelay;
    const maxDelay = WS_CONFIG.maxReconnectDelay;
    const delay = Math.min(baseDelay * Math.pow(2, reconnectAttempts.current), maxDelay);
    return delay;
  };

  const connect = () => {
    // Don't connect if disabled
    if (!enabled) {
      setConnectionStatus('disabled');
      console.log('WebSocket connection disabled');
      return;
    }

    // Don't connect if no URL configured
    if (!wsUrl) {
      setConnectionStatus('error');
      setError('WebSocket URL not configured');
      console.error('WebSocket URL not configured');
      return;
    }
    
    // Don't reconnect if already connected
    if (ws.current?.readyState === WebSocket.OPEN) return;

    // Check if we've exceeded max reconnect attempts
    if (reconnectAttempts.current >= WS_CONFIG.reconnectAttempts) {
      setConnectionStatus('error');
      setError('Maximum reconnection attempts exceeded');
      console.error('Maximum WebSocket reconnection attempts exceeded');
      return;
    }

    clearTimeouts();
    setConnectionStatus('connecting');
    setError(null);
    
    console.log(`Attempting WebSocket connection to ${wsUrl} (attempt ${reconnectAttempts.current + 1})`);
    
    try {
      ws.current = new WebSocket(wsUrl);

      // Set connection timeout
      connectionTimeoutRef.current = setTimeout(() => {
        if (ws.current && ws.current.readyState === WebSocket.CONNECTING) {
          console.log('WebSocket connection timeout');
          ws.current.close();
          setConnectionStatus('error');
          setError('Connection timeout');
        }
      }, WS_CONFIG.connectionTimeout);

      ws.current.onopen = () => {
        console.log('WebSocket connected successfully');
        clearTimeouts();
        setIsConnected(true);
        setConnectionStatus('connected');
        setError(null);
        reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
        
        // Resubscribe to all channels
        subscriptions.forEach(companyId => {
          ws.current?.send(JSON.stringify({
            type: 'subscribe',
            companyId
          }));
        });
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'price_update':
              setPriceUpdates(prev => new Map(prev.set(data.companyId, data.data)));
              break;
              
            case 'orderbook_update':
              setOrderBooks(prev => new Map(prev.set(data.companyId, data.data)));
              break;
              
            case 'trade_update':
              setRecentTrades(prev => {
                const trades = prev.get(data.companyId) || [];
                const updatedTrades = [data.data, ...trades].slice(0, 100); // Keep last 100 trades
                return new Map(prev.set(data.companyId, updatedTrades));
              });
              break;
              
            case 'error':
              console.error('WebSocket server error:', data.message);
              setError(data.message);
              break;
              
            default:
              console.log('Unknown WebSocket message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          setError('Failed to parse server message');
        }
      };

      ws.current.onclose = (event) => {
        clearTimeouts();
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        
        // Determine if this was a clean close or an error
        const wasClean = event.wasClean || event.code === 1000;
        
        if (!wasClean && enabled && reconnectAttempts.current < WS_CONFIG.reconnectAttempts) {
          setConnectionStatus('connecting');
          reconnectAttempts.current++;
          const delay = getReconnectDelay();
          
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current})`);
          setError(`Connection lost. Reconnecting in ${Math.ceil(delay / 1000)}s...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          setConnectionStatus('disconnected');
          if (!wasClean && !enabled) {
            setError('Connection disabled');
          } else if (!wasClean) {
            setError('Connection failed after maximum retry attempts');
          }
        }
      };

      ws.current.onerror = (event) => {
        clearTimeouts();
        console.error('WebSocket error:', event);
        setConnectionStatus('error');
        setIsConnected(false);
        
        // Provide user-friendly error messages
        if (reconnectAttempts.current === 0) {
          setError('Failed to connect to trading services. Services may be offline.');
        } else {
          setError('Connection error occurred. Retrying...');
        }
      };

    } catch (error) {
      clearTimeouts();
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('error');
      setError('Failed to initialize connection');
    }
  };

  const disconnect = () => {
    clearTimeouts();
    reconnectAttempts.current = WS_CONFIG.reconnectAttempts; // Prevent reconnection
    
    if (ws.current) {
      ws.current.close(1000, 'Manual disconnect');
      ws.current = null;
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
    setError(null);
  };

  const reconnect = () => {
    console.log('Manual reconnection requested');
    disconnect();
    reconnectAttempts.current = 0; // Reset attempts for manual reconnection
    setTimeout(() => connect(), 1000); // Small delay before reconnecting
  };

  const subscribe = (companyId: number) => {
    setSubscriptions(prev => new Set(prev.add(companyId)));
    
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'subscribe',
        companyId
      }));
    }
  };

  const unsubscribe = (companyId: number) => {
    setSubscriptions(prev => {
      const newSet = new Set(prev);
      newSet.delete(companyId);
      return newSet;
    });
    
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'unsubscribe',
        companyId
      }));
    }
  };

  // Determine if error is retryable
  const hasRetryableError = connectionStatus === 'error' && reconnectAttempts.current < WS_CONFIG.reconnectAttempts;

  useEffect(() => {
    if (enabled && wsUrl) {
      connect();
    } else if (!enabled) {
      setConnectionStatus('disabled');
    } else if (!wsUrl) {
      setConnectionStatus('error');
      setError('WebSocket URL not configured');
    }
    
    return () => {
      disconnect();
    };
  }, [wsUrl, enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
      if (ws.current) {
        ws.current.close(1000, 'Component unmount');
      }
    };
  }, []);

  const contextValue: WebSocketContextValue = {
    isConnected,
    priceUpdates,
    orderBooks,
    recentTrades,
    subscribe,
    unsubscribe,
    connectionStatus,
    error,
    reconnect,
    hasRetryableError
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}
