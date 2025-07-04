'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useAccount } from 'wagmi';
import { TradeView } from '@/components/TradeView';
import { BuildingIcon, TrendingUpIcon, TrendingDownIcon, UsersIcon } from 'lucide-react';

interface CompanyData {
  id: number;
  name: string;
  owner: string;
  initialPrice: string;
  totalSupply: string;
  currentPrice: string;
  marketCap: string;
  change24h: number;
}

export default function CompanyPage() {
  const params = useParams();
  const companyId = params?.id as string;
  const { isConnected } = useAccount();
  const { getCompany, getSharePrice } = useDeStock();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companyId && isConnected) {
      loadCompanyData();
    }
  }, [companyId, isConnected]);

  const loadCompanyData = async () => {
    try {
      // Placeholder implementation - would need real contract calls
      const mockCompany: CompanyData = {
        id: parseInt(companyId),
        name: `Company ${parseInt(companyId) + 1}`,
        owner: '0x1234567890123456789012345678901234567890',
        initialPrice: '10.0',
        totalSupply: '1000',
        currentPrice: '12.5',
        marketCap: '12500',
        change24h: 8.7,
      };
      
      setCompany(mockCompany);
    } catch (error) {
      console.error('Failed to load company data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="destock-card text-center py-12">
          <BuildingIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600">
            Connect your wallet to view company details.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="destock-card animate-pulse">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="destock-card animate-pulse">
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="destock-card text-center py-12">
          <BuildingIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Company Not Found
          </h1>
          <p className="text-gray-600">
            The company you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Company Header */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <BuildingIcon className="w-8 h-8 text-destock-primary" />
          <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
        </div>
        <p className="text-gray-600">
          Owned by {formatAddress(company.owner)}
        </p>
      </div>

      {/* Price and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="destock-card">
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Price</h3>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold text-gray-900">{company.currentPrice} DSTK</p>
              <span
                className={`inline-flex items-center text-sm ${
                  company.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {company.change24h >= 0 ? (
                  <TrendingUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDownIcon className="w-4 h-4 mr-1" />
                )}
                {company.change24h >= 0 ? '+' : ''}{company.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="destock-card">
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Market Cap</h3>
            <p className="text-2xl font-bold text-gray-900">{company.marketCap} DSTK</p>
          </div>
        </div>

        <div className="destock-card">
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Supply</h3>
            <p className="text-2xl font-bold text-gray-900">{company.totalSupply}</p>
          </div>
        </div>

        <div className="destock-card">
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Initial Price</h3>
            <p className="text-2xl font-bold text-gray-900">{company.initialPrice} DSTK</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Company Info */}
          <div className="destock-card">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Company ID</dt>
                    <dd className="text-sm text-gray-900">{company.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Owner</dt>
                    <dd className="text-sm text-gray-900">{formatAddress(company.owner)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total Shares</dt>
                    <dd className="text-sm text-gray-900">{company.totalSupply}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Launch Price</dt>
                    <dd className="text-sm text-gray-900">{company.initialPrice} DSTK</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Chart Placeholder */}
          <div className="destock-card">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Price Chart</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Price chart coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div>
          <TradeView />
        </div>
      </div>
    </div>
  );
}
