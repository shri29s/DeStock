/**
 * Shared constants for DeStock trading platform
 * Centralizes configuration values used across multiple components
 */

// Chain configuration
export const ALLOWED_CHAIN_IDS = [31337, 11155111]; // Local Anvil and Sepolia testnet
export const DEFAULT_CHAIN_ID = 31337;

// Contract addresses
export const DSTK_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_DSTK_TOKEN_ADDRESS || '';
export const DESTOCK_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DESTOCK_CONTRACT_ADDRESS || '';

// WebSocket URLs for different environments
export const WS_URLS = {
  development: 'ws://localhost:8080',
  staging: process.env.NEXT_PUBLIC_WS_STAGING_URL || 'ws://localhost:8080',
  production: process.env.NEXT_PUBLIC_WS_URL || ''
};

// API endpoints
export const API_ENDPOINTS = {
  faucet: '/api/faucet',
  market: '/api/market', 
  portfolio: '/api/portfolio',
  tradeEngine: process.env.NEXT_PUBLIC_TRADE_ENGINE_URL || 'http://localhost:3002',
  backend: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
};

// Faucet configuration
export const FAUCET_CONFIG = {
  amount: '1000', // DSTK tokens to mint
  rateLimitWindow: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  allowedChains: ALLOWED_CHAIN_IDS
};

// Rate limiting configuration
export const RATE_LIMITING = {
  faucet: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  market: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },
  trading: {
    maxRequests: 50,
    windowMs: 60 * 1000, // 1 minute
  },
  portfolio: {
    maxRequests: 200,
    windowMs: 60 * 1000, // 1 minute
  }
};

// Backend configuration
export const BACKEND_CONFIG = {
  requestTimeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

// WebSocket configuration
export const WS_CONFIG = {
  reconnectAttempts: 5,
  reconnectDelay: 1000,
  maxReconnectDelay: 30000,
  connectionTimeout: 10000
};

// Chain validation function
export function isValidChain(chainId: number): boolean {
  return ALLOWED_CHAIN_IDS.includes(chainId);
}

// Environment validation function
export function validateEnvironment(): { 
  isValid: boolean; 
  missingVars: string[];
  BACKEND_URL?: string;
  WS_URL?: string;
  CHAIN_ID?: number;
} {
  const requiredVars = [
    'NEXT_PUBLIC_DSTK_TOKEN_ADDRESS',
    'NEXT_PUBLIC_DESTOCK_CONTRACT_ADDRESS',
    'PRIVATE_KEY',
    'NEXT_PUBLIC_WS_URL'
  ];

  const missingVars = requiredVars.filter(varName => {
    const value = process.env[varName];
    return !value || value.trim() === '';
  });

  return {
    isValid: missingVars.length === 0,
    missingVars,
    BACKEND_URL: API_ENDPOINTS.backend,
    WS_URL: getWebSocketUrl(),
    CHAIN_ID: DEFAULT_CHAIN_ID
  };
}

// Get WebSocket URL based on environment
export function getWebSocketUrl(): string {
  const env = process.env.NODE_ENV || 'development';
  
  if (env === 'production') {
    return WS_URLS.production;
  } else {
    return WS_URLS.development;
  }
}

// Chain configuration objects
export const CHAIN_CONFIG = {
  [31337]: {
    id: 31337,
    name: 'Anvil Local',
    rpcUrl: 'http://127.0.0.1:8545',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
  },
  [11155111]: {
    id: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
  }
};
