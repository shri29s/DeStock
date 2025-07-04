'use client';

import { useAccount } from 'wagmi';
import { useDSTK } from '@/lib/hooks/useDSTK';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useState, useEffect } from 'react';
import { WalletIcon, TrendingUpIcon, PieChartIcon, DollarSignIcon } from 'lucide-react';

interface HoldingItem {
  companyId: number;
  companyName: string;
  shares: string;
  currentPrice: string;
  totalValue: string;
  change: number;
}

export default function PortfolioPage() {
  const { isConnected, address } = useAccount();
  const { balance } = useDSTK();
  const { getShareBalance, nextCompanyId } = useDeStock();
  const [holdings, setHoldings] = useState<HoldingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState('0');

  useEffect(() => {
    if (isConnected && nextCompanyId > 0) {
      loadPortfolio();
    }
  }, [isConnected, nextCompanyId]);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      // Placeholder implementation - would need real contract calls
      const holdingsData: HoldingItem[] = [
        {
          companyId: 0,
          companyName: 'Tech Corp',
          shares: '50',
          currentPrice: '15.2',
          totalValue: '760',
          change: 12.5,
        },
        {
          companyId: 1,
          companyName: 'Green Energy Inc',
          shares: '25',
          currentPrice: '8.7',
          totalValue: '217.5',
          change: -3.2,
        },
      ];
      
      setHoldings(holdingsData);
      
      const totalValue = holdingsData.reduce(
        (sum, holding) => sum + parseFloat(holding.totalValue),
        0
      );
      setPortfolioValue(totalValue.toFixed(2));
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="destock-card text-center py-12">
          <WalletIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600">
            Connect your wallet to view your portfolio and holdings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
        <p className="text-gray-600">
          Track your investments and portfolio performance.
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="destock-card">
          <div className="p-6">
            <div className="flex items-center">
              <DollarSignIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Portfolio Value</h3>
                <p className="text-2xl font-bold text-gray-900">{portfolioValue} DSTK</p>
              </div>
            </div>
          </div>
        </div>

        <div className="destock-card">
          <div className="p-6">
            <div className="flex items-center">
              <WalletIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">DSTK Balance</h3>
                <p className="text-2xl font-bold text-gray-900">{balance} DSTK</p>
              </div>
            </div>
          </div>
        </div>

        <div className="destock-card">
          <div className="p-6">
            <div className="flex items-center">
              <PieChartIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Holdings</h3>
                <p className="text-2xl font-bold text-gray-900">{holdings.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="destock-card">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Holdings</h2>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : holdings.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Holdings Yet
              </h3>
              <p className="text-gray-600">
                Start trading to build your portfolio.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shares
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {holdings.map((holding) => (
                    <tr key={holding.companyId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {holding.companyName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {holding.shares}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {holding.currentPrice} DSTK
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {holding.totalValue} DSTK
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            holding.change >= 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
