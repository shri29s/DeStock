'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, WalletIcon, GiftIcon } from 'lucide-react';
import { handleFaucetRequest, type FaucetRequestOptions } from '@/lib/utils/faucetUtils';
import { successPulse } from '@/lib/utils/animations';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { balance, refetchBalance } = useDSTK();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = () => {
    connect({ connector: metaMask() });
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId: chainId as 1 | 31337 | 11155111 });
    setIsDropdownOpen(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleFaucetClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!address || !chain?.id) return;
    
    const buttonElement = event.currentTarget;
    
    const requestOptions: FaucetRequestOptions = {
      address,
      chainId: chain.id,
      onLoading: setIsFaucetLoading,
      onSuccess: async (response) => {
        try {
          // Add success pulse animation to the button
          successPulse(buttonElement);
          
          // Wait a moment for the celebration animation to complete
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Refetch balance and close dropdown
          await refetchBalance();
          setIsDropdownOpen(false);
          
          console.log('Faucet success:', response);
        } catch (error) {
          console.error('Error in success callback:', error);
        }
      },
      onError: (error) => {
        console.error('Faucet request failed:', error);
        // Error handling is already done in handleFaucetRequest with toast
      }
    };
    
    await handleFaucetRequest(requestOptions);
  };

  // Show loading placeholder until mounted
  if (!mounted) {
    return (
      <div className="destock-button-primary flex items-center space-x-2 opacity-50">
        <WalletIcon className="w-4 h-4" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="destock-button-primary flex items-center space-x-2"
      >
        <WalletIcon className="w-4 h-4" />
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-destock-primary focus:ring-offset-2"
      >
        <div className="flex items-center space-x-2">
          <WalletIcon className="w-4 h-4 text-destock-primary" />
          <div className="text-left">
            <div className="font-medium">{formatAddress(address!)}</div>
            <div className="text-xs text-gray-500">{balance} DSTK</div>
          </div>
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">
              {formatAddress(address!)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Balance: {balance} DSTK
            </div>
            {chain && (
              <div className="text-xs text-gray-400 mt-1">
                Network: {chain.name}
              </div>
            )}
            
            {/* Enhanced faucet button - always show if on testnet */}
            {chain && (chain.id === 31337 || chain.id === 11155111) && (
              <button
                onClick={handleFaucetClick}
                disabled={isFaucetLoading}
                className="mt-3 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <GiftIcon className={`w-4 h-4 ${isFaucetLoading ? 'animate-pulse' : ''}`} />
                <span>
                  {isFaucetLoading ? 'Getting Tokens...' : 
                   parseFloat(balance) === 0 ? 'Get Test Tokens' : 'Get More Tokens'}
                </span>
              </button>
            )}

            {/* Show helpful message for mainnet */}
            {chain && chain.id === 1 && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  Faucet not available on mainnet. Switch to a testnet to get test tokens.
                </p>
              </div>
            )}
          </div>
          
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 py-1">
              Switch Network
            </div>
            <button
              onClick={() => handleSwitchChain(31337)}
              className={`w-full text-left px-2 py-2 text-sm rounded transition-colors ${
                chain?.id === 31337 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Localhost (31337)
              {chain?.id === 31337 && <span className="ml-2 text-xs">✓</span>}
            </button>
            <button
              onClick={() => handleSwitchChain(11155111)}
              className={`w-full text-left px-2 py-2 text-sm rounded transition-colors ${
                chain?.id === 11155111 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Sepolia Testnet
              {chain?.id === 11155111 && <span className="ml-2 text-xs">✓</span>}
            </button>
          </div>

          <div className="p-2 border-t border-gray-200">
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
