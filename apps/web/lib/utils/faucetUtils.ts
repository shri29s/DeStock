import { toast } from 'react-hot-toast';
import { celebrate } from './animations';

// TypeScript interfaces for faucet operations
export interface FaucetRequest {
  address: string;
  chainId: number;
}

export interface FaucetResponse {
  success: boolean;
  message: string;
  txHash?: string;
  error?: string;
  remainingTime?: number;
}

export interface FaucetError {
  message: string;
  code?: string;
  isRateLimit?: boolean;
}

export interface FaucetRequestOptions {
  address: string;
  chainId: number;
  onSuccess?: (response: FaucetResponse) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
}

/**
 * Enhanced faucet request handler with celebration animations
 */
export async function handleFaucetRequest({
  address,
  chainId,
  onSuccess,
  onError,
  onLoading
}: FaucetRequestOptions): Promise<FaucetResponse> {
  if (onLoading) onLoading(true);

  try {
    const response = await fetch('/api/faucet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        chainId,
      }),
    });

    const data: FaucetResponse = await response.json();

    if (onLoading) onLoading(false);

    if (data.success) {
      // Trigger celebration animation
      await celebrate({
        particleCount: 120,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#3B82F6', '#10B981', '#F59E0B'],
        startVelocity: 35
      });

      // Show success toast
      const txInfo = data.txHash ? `\nTransaction: ${data.txHash.slice(0, 10)}...` : '';
      toast.success(`🎉 Success! 1000 DSTK tokens added to your wallet!${txInfo}`, {
        duration: 5000,
      });

      if (onSuccess) {
        // Small delay to let animation play
        setTimeout(() => onSuccess(data), 1000);
      }

      return data;
    } else {
      // Handle different error types
      const errorMessage = formatErrorMessage(data);
      
      toast.error(`Faucet Request Failed: ${errorMessage}`, {
        duration: 8000,
      });

      if (onError) onError(errorMessage);
      return data;
    }
  } catch (error) {
    if (onLoading) onLoading(false);
    
    const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
    
    toast.error('Network Error: Failed to connect to faucet service. Please check your connection and try again.', {
      duration: 8000,
    });

    if (onError) onError(errorMessage);
    
    return {
      success: false,
      message: 'Network error',
      error: errorMessage
    };
  }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use handleFaucetRequest with options object instead
 */
export async function requestFaucetTokens(
  address: string,
  chainId: number
): Promise<FaucetResponse> {
  return new Promise((resolve) => {
    handleFaucetRequest({
      address,
      chainId,
      onSuccess: (response) => resolve(response),
      onError: (error) => resolve({
        success: false,
        message: 'Failed to get test tokens',
        error
      })
    });
  });
}

/**
 * Format error messages for better user experience
 */
function formatErrorMessage(response: FaucetResponse): string {
  const { message, error, remainingTime } = response;

  // Rate limiting error
  if (message?.includes('rate limit') || message?.includes('too soon')) {
    if (remainingTime) {
      const hours = Math.ceil(remainingTime / (1000 * 60 * 60));
      return `You can request tokens again in ${hours} hour${hours > 1 ? 's' : ''}. One request per 24 hours is allowed.`;
    }
    return 'You can only request tokens once per 24 hours. Please try again later.';
  }

  // Environment variable errors
  if (message?.includes('environment') || message?.includes('configuration')) {
    return 'Faucet is temporarily unavailable due to configuration issues. Please try again later.';
  }

  // Chain validation errors
  if (message?.includes('chain') || message?.includes('network')) {
    return 'Please switch to the correct network (Localhost or Sepolia testnet) to use the faucet.';
  }

  // Contract permission errors
  if (message?.includes('permission') || message?.includes('unauthorized')) {
    return 'Faucet service does not have permission to mint tokens. Please contact support.';
  }

  // Transaction errors
  if (message?.includes('transaction') || message?.includes('gas')) {
    return 'Transaction failed due to network issues. Please try again in a few moments.';
  }

  // Generic error fallback
  return error || message || 'An unexpected error occurred. Please try again.';
}

/**
 * Validate wallet address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate chain ID for faucet
 */
export function isValidChainForFaucet(chainId: number): boolean {
  const allowedChains = [31337, 11155111]; // Anvil local and Sepolia
  return allowedChains.includes(chainId);
}

/**
 * Get user-friendly chain name
 */
export function getChainName(chainId: number): string {
  switch (chainId) {
    case 31337:
      return 'Anvil Local';
    case 11155111:
      return 'Sepolia Testnet';
    case 1:
      return 'Ethereum Mainnet';
    default:
      return `Chain ${chainId}`;
  }
}

/**
 * Check if an error is a rate limiting error
 * @param error - Error message or object
 * @returns boolean indicating if it's a rate limit error
 */
export function isRateLimitError(error: string | Error): boolean {
  const errorMessage = typeof error === 'string' ? error : error.message;
  return errorMessage.toLowerCase().includes('rate limit') || 
         errorMessage.toLowerCase().includes('24 hours') ||
         errorMessage.toLowerCase().includes('cooldown');
}

/**
 * Get user-friendly error message for faucet errors
 * @param error - Error message or object
 * @returns Formatted error message for display
 */
export function getFaucetErrorMessage(error: string | Error): string {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  if (isRateLimitError(errorMessage)) {
    return 'You can only request tokens once per 24 hours. Please try again later.';
  }
  
  if (errorMessage.toLowerCase().includes('insufficient gas')) {
    return 'Insufficient gas for transaction. Please try again.';
  }
  
  if (errorMessage.toLowerCase().includes('network')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (errorMessage.toLowerCase().includes('contract')) {
    return 'Smart contract error. Please try again or contact support.';
  }
  
  return errorMessage || 'Failed to get test tokens. Please try again.';
}

/**
 * Check if faucet is available for current environment
 */
export function isFaucetAvailable(): boolean {
  // Check if required environment variables are present
  const requiredVars = [
    process.env.NEXT_PUBLIC_DSTK_TOKEN_ADDRESS,
    process.env.PRIVATE_KEY || process.env.FAUCET_PRIVATE_KEY
  ];
  
  return requiredVars.every(variable => variable && variable.trim() !== '');
}

/**
 * Get time until next faucet request is allowed
 */
export function getTimeUntilNextRequest(lastRequestTime: number): {
  canRequest: boolean;
  remainingTime: number;
  remainingTimeFormatted: string;
} {
  const now = Date.now();
  const rateLimitWindow = 24 * 60 * 60 * 1000; // 24 hours
  const timeSinceLastRequest = now - lastRequestTime;
  const remainingTime = Math.max(0, rateLimitWindow - timeSinceLastRequest);
  
  if (remainingTime === 0) {
    return {
      canRequest: true,
      remainingTime: 0,
      remainingTimeFormatted: ''
    };
  }

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  
  let formatted = '';
  if (hours > 0) {
    formatted += `${hours}h `;
  }
  if (minutes > 0) {
    formatted += `${minutes}m`;
  }
  
  return {
    canRequest: false,
    remainingTime,
    remainingTimeFormatted: formatted.trim() || '< 1m'
  };
}
