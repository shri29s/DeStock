'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import OrderBook from '@/components/OrderBook';
import DepthChart from '@/components/DepthChart';
import TradingForm from '@/components/TradingForm';
import OpenOrders from '@/components/OpenOrders';
import LiquidityProvider from '@/components/LiquidityProvider';
import { TradingChart } from '@/components/TradingChart';
import { useWebSocket } from '@/lib/providers/WebSocketProvider';
import { getNumericCompanyId, getCompanyById } from '@/lib/utils/companyUtils';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';

export default function TradingPage() {
  const params = useParams();
  const stringCompanyId = params?.id as string;
  const numericCompanyId = getNumericCompanyId(stringCompanyId);
  const { connectionStatus, error, reconnect, hasRetryableError } = useWebSocket();
  
  const [activeTab, setActiveTab] = useState<'trade' | 'liquidity'>('trade');
  const [dataLoadTimeout, setDataLoadTimeout] = useState(false);
  
  // Get company data from JSON (for display info)
  const companyInfo = getCompanyById(stringCompanyId);
  
  // Get blockchain data using numeric ID
  // TODO: Fix hook configuration types after useDeStock refactor  
  // const companyConfig = getCompany(numericCompanyId);
  // const priceConfig = getSharePrice(numericCompanyId);
  
  // const { data: company, isLoading: companyLoading, error: companyError } = useReadContract(companyConfig);
  // const { data: sharePrice, isLoading: priceLoading } = useReadContract(priceConfig);
  
  // Temporary fallback for display purposes - Mock data to bypass registration check
  const company: any = companyInfo ? {
    0: companyInfo.name, // Company name
    1: true, // isActive
    2: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // owner
    3: '1000000', // totalSupply
    4: '1000000000000000000000', // tokenReserve (1000 DSTK)
    5: '500000', // shareReserve
    6: '100000000000000000000', // lpTokenSupply (100 LP)
    7: '0' // collectedFees
  } : null;
  const sharePrice: any = companyInfo ? '50000000000000000000' : null; // 50 DSTK
  const companyLoading = false;
  const priceLoading = false;
  const companyError = null;
  
  const currentPrice = sharePrice ? parseFloat(sharePrice.toString()) / 1e18 : 0;

  // Set timeout for data loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDataLoadTimeout(true);
    }, 10000); // 10 second timeout
    
    return () => clearTimeout(timeout);
  }, []);

  // Reset timeout when data loads
  useEffect(() => {
    if (company) {
      setDataLoadTimeout(false);
    }
  }, [company]);

  // Show error if company not found
  if (!companyInfo || numericCompanyId === -1) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Company Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The company "{stringCompanyId}" could not be found in our company directory.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Available companies: openai, spacex, xai, binance, anthropic
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state with timeout handling
  if (companyLoading || (!company && !dataLoadTimeout && !companyError)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading company data...</p>
          {dataLoadTimeout && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertTriangle size={20} />
                <span>Loading is taking longer than expected</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                Backend services may be starting up or unavailable
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show error state for company data
  if (companyError || (dataLoadTimeout && !company)) {
    const isCompanyInJSON = !!companyInfo;
    const isNotRegistered = isCompanyInJSON && !company && !companyError;
    
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isNotRegistered ? 'Company Not Registered on Blockchain' : 'Unable to Load Company Data'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isNotRegistered ? 
                `${companyInfo.name} exists in our directory but hasn't been registered on the blockchain yet.` :
                companyError ? 
                  'There was an error loading the company data from the blockchain.' :
                  'Company data could not be loaded. Backend services may be unavailable.'
              }
            </p>
            
            {isNotRegistered && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  To trade this company's shares, it needs to be registered on the blockchain first.
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {isNotRegistered && (
              <button
                onClick={() => window.location.href = '/register'}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors mr-2"
              >
                Register Company
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status Alert */}
      {connectionStatus !== 'connected' && connectionStatus !== 'disabled' && (
        <div className={`rounded-lg border p-4 ${
          connectionStatus === 'error' ? 
            'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700' :
            'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-red-500" />
              <div>
                <h4 className={`font-medium ${
                  connectionStatus === 'error' ? 
                    'text-red-800 dark:text-red-200' : 
                    'text-yellow-800 dark:text-yellow-200'
                }`}>
                  {connectionStatus === 'connecting' && 'Connecting to real-time services...'}
                  {connectionStatus === 'error' && 'Real-time services unavailable'}
                  {connectionStatus === 'disconnected' && 'Disconnected from real-time services'}
                </h4>
                <p className={`text-sm ${
                  connectionStatus === 'error' ? 
                    'text-red-700 dark:text-red-300' : 
                    'text-yellow-700 dark:text-yellow-300'
                }`}>
                  {error || 'Order book and depth chart may show limited data'}
                </p>
              </div>
            </div>
            {hasRetryableError && (
              <button
                onClick={reconnect}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded text-sm font-medium border border-gray-300 dark:border-gray-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4 inline mr-1" />
                Retry
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {companyInfo.name} ({companyInfo.symbol})
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Company ID: #{numericCompanyId} ({stringCompanyId})
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {priceLoading ? (
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-32 rounded"></div>
              ) : (
                `${currentPrice.toFixed(6)} DSTK`
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Current Price
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart and Depth */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trading Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Price Chart</h3>
            </div>
            <div className="p-4">
              <TradingChart symbol={companyInfo.symbol} height={400} />
            </div>
          </div>

          {/* Order Book and Depth Chart with Error Boundaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <OrderBook companyId={numericCompanyId} height={500} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <DepthChart companyId={numericCompanyId} height={500} />
            </div>
          </div>

          {/* Open Orders */}
          <OpenOrders />
        </div>

        {/* Right Column - Trading Forms */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('trade')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'trade'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Trade
              </button>
              <button
                onClick={() => setActiveTab('liquidity')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'liquidity'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Liquidity
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'trade' ? (
            <TradingForm companyId={numericCompanyId} currentPrice={currentPrice} />
          ) : (
            <LiquidityProvider companyId={numericCompanyId} currentPrice={currentPrice} />
          )}

          {/* Market Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Supply:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company?.[3]?.toString() || '0'} shares
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Token Reserve:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company?.[4] ? (parseFloat(company[4].toString()) / 1e18).toFixed(4) : '0'} DSTK
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Share Reserve:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company?.[5]?.toString() || '0'} shares
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">LP Token Supply:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company?.[6] ? (parseFloat(company[6].toString()) / 1e18).toFixed(4) : '0'} LP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Collected Fees:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company?.[7] ? (parseFloat(company[7].toString()) / 1e18).toFixed(4) : '0'} DSTK
                </span>
              </div>
            </div>
          </div>

          {/* Trading Features */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Trading Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                Real-time order book
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Market & limit orders
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Liquidity provision
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Professional charts
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                0.25% trading fees
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
