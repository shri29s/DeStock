'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

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
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
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
}

export function WebSocketProvider({ children, url = 'ws://localhost:8080' }: WebSocketProviderProps) {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [priceUpdates, setPriceUpdates] = useState<Map<number, PriceUpdate>>(new Map());
  const [orderBooks, setOrderBooks] = useState<Map<number, OrderBookUpdate>>(new Map());
  const [recentTrades, setRecentTrades] = useState<Map<number, TradeUpdate[]>>(new Map());
  const [subscriptions, setSubscriptions] = useState<Set<number>>(new Set());

  const connect = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    setConnectionStatus('connecting');
    
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionStatus('connected');
        
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
              
            default:
              console.log('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        
        // Attempt to reconnect after 3 seconds
        if (!event.wasClean) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 3000);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('error');
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (ws.current) {
      ws.current.close(1000, 'Manual disconnect');
      ws.current = null;
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
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

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [url]);

  const contextValue: WebSocketContextValue = {
    isConnected,
    priceUpdates,
    orderBooks,
    recentTrades,
    subscribe,
    unsubscribe,
    connectionStatus
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}
