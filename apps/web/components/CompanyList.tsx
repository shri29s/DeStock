'use client';

import { useEffect, useState } from 'react';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { TrendingUpIcon, TrendingDownIcon, BuildingIcon } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  owner: string;
  initialPrice: string;
  totalSupply: string;
  currentPrice?: string;
}

export function CompanyList() {
  const { isConnected } = useAccount();
  const { nextCompanyId, getCompany, getSharePrice } = useDeStock();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isConnected && nextCompanyId > 0) {
      loadCompanies();
    }
  }, [isConnected, nextCompanyId]);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const companyPromises = [];
      for (let i = 0; i < nextCompanyId; i++) {
        companyPromises.push(loadCompanyData(i));
      }
      const loadedCompanies = await Promise.all(companyPromises);
      setCompanies(loadedCompanies.filter(Boolean) as Company[]);
    } catch (error) {
      console.error('Failed to load companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanyData = async (id: number): Promise<Company | null> => {
    try {
      // Note: This would need to be implemented with actual contract calls
      // const companyData = await getCompany(id);
      // const priceData = await getSharePrice(id);
      
      // Placeholder data for now
      return {
        id,
        name: `Company ${id + 1}`,
        owner: '0x1234567890123456789012345678901234567890',
        initialPrice: '10.0',
        totalSupply: '1000',
        currentPrice: '12.5',
      };
    } catch (error) {
      console.error(`Failed to load company ${id}:`, error);
      return null;
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="destock-card text-center py-8">
        <BuildingIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-gray-600">
          Connect your wallet to view listed companies.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="destock-card animate-pulse">
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="destock-card text-center py-8">
        <BuildingIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Companies Listed
        </h3>
        <p className="text-gray-600 mb-4">
          Be the first to register your company on DeStock!
        </p>
        <Link
          href="/register"
          className="destock-button-primary inline-flex items-center"
        >
          Register Company
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Listed Companies ({companies.length})
        </h3>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="destock-input text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredCompanies.map((company) => {
          const priceChange = company.currentPrice && company.initialPrice
            ? ((parseFloat(company.currentPrice) - parseFloat(company.initialPrice)) / parseFloat(company.initialPrice)) * 100
            : 0;

          return (
            <Link
              key={company.id}
              href={`/company/${company.id}`}
              className="block"
            >
              <div className="company-card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <BuildingIcon className="w-4 h-4 text-destock-primary" />
                      <h4 className="font-medium text-gray-900">{company.name}</h4>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Owner: {formatAddress(company.owner)}</div>
                      <div>Total Supply: {company.totalSupply} shares</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {company.currentPrice || company.initialPrice} DSTK
                    </div>
                    {company.currentPrice && priceChange !== 0 && (
                      <div className={`flex items-center text-sm ${priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {priceChange > 0 ? (
                          <TrendingUpIcon className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDownIcon className="w-3 h-3 mr-1" />
                        )}
                        {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          No companies found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
