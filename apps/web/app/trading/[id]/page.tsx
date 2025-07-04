'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import OrderBook from '@/components/OrderBook';
import DepthChart from '@/components/DepthChart';
import TradingForm from '@/components/TradingForm';
import OpenOrders from '@/components/OpenOrders';
import LiquidityProvider from '@/components/LiquidityProvider';
import { TradingChart } from '@/components/TradingChart';
import { useDeStock } from '@/lib/hooks/useDeStock';

export default function TradingPage() {
  const params = useParams();
  const companyId = parseInt(params?.id as string);
  const { getCompany, getSharePrice } = useDeStock();
  
  const [activeTab, setActiveTab] = useState<'trade' | 'liquidity'>('trade');
  
  const { data: company } = getCompany(companyId);
  const { data: sharePrice } = getSharePrice(companyId);
  
  const currentPrice = sharePrice ? parseFloat(sharePrice.toString()) / 1e18 : 0;

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading company data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {company[1]} {/* Company name */}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Company ID: #{companyId}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentPrice.toFixed(6)} DSTK
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
              <TradingChart symbol={company[1]} height={400} />
            </div>
          </div>

          {/* Order Book and Depth Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrderBook companyId={companyId} height={500} />
            <DepthChart companyId={companyId} height={500} />
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
            <TradingForm companyId={companyId} currentPrice={currentPrice} />
          ) : (
            <LiquidityProvider companyId={companyId} currentPrice={currentPrice} />
          )}

          {/* Market Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Supply:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company[3]?.toString() || '0'} shares
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Token Reserve:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company[4] ? (parseFloat(company[4].toString()) / 1e18).toFixed(4) : '0'} DSTK
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Share Reserve:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company[5]?.toString() || '0'} shares
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">LP Token Supply:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company[6] ? (parseFloat(company[6].toString()) / 1e18).toFixed(4) : '0'} LP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Collected Fees:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {company[7] ? (parseFloat(company[7].toString()) / 1e18).toFixed(4) : '0'} DSTK
                </span>
              </div>
            </div>
          </div>

          {/* Trading Features */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Trading Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
