'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, WalletIcon } from 'lucide-react';
import { ClientOnly } from './ClientOnly';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { balance } = useDSTK();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    switchChain({ chainId: chainId as any });
    setIsDropdownOpen(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
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
          </div>
          
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 py-1">
              Switch Network
            </div>
            <button
              onClick={() => handleSwitchChain(31337)}
              className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Localhost
            </button>
            <button
              onClick={() => handleSwitchChain(11155111)}
              className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Sepolia Testnet
            </button>
          </div>

          <div className="p-2 border-t border-gray-200">
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
