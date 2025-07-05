'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDeStock } from '@/lib/hooks/useDeStock';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BuildingIcon } from 'lucide-react';
import { getAllCompanies } from '@/lib/utils/companyUtils';
import { Company as CompanyType } from '@/lib/types/company';

interface Company {
  id: number;
  name: string;
  symbol?: string;
  owner: string;
  initialPrice: string;
  totalSupply: string;
  currentPrice?: string;
  change?: number;
  changePercent?: number;
  volume?: number;
  marketCap?: number;
  sector?: string;
  logo?: string;
  tokenData?: CompanyType;
}

type SortField = 'name' | 'currentPrice' | 'change' | 'volume' | 'marketCap';
type SortDirection = 'asc' | 'desc';

export function CompanyList() {
  const { isConnected } = useAccount();
  const { nextCompanyId } = useDeStock();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      // Try to load from API first
      const response = await fetch('/api/market?type=companies');
      if (response.ok) {
        const result = await response.json();
        setCompanies(result.companies || []);
      } else {
        // Fallback to token data with client-side random values
        const tokenCompanies = getAllCompanies();
        if (mounted) {
          const transformedCompanies = tokenCompanies.map((company, index) => ({
            id: index,
            name: company.name,
            symbol: company.symbol,
            owner: '0x' + Math.random().toString(16).substr(2, 40), // Mock address - only on client
            initialPrice: company.price.replace('$', ''),
            totalSupply: '1000000',
            currentPrice: company.price.replace('$', ''),
            change: (Math.random() - 0.5) * 20, // Random change - only on client
            changePercent: (Math.random() - 0.5) * 20, // Only on client
            volume: Math.floor(Math.random() * 1000000), // Only on client
            marketCap: parseFloat(company.marketCap.replace(/[$BM]/g, '')) * (company.marketCap.includes('B') ? 1000000000 : 1000000),
            sector: company.sector,
            logo: company.logo,
            tokenData: company // Store the full token data
          }));
          setCompanies(transformedCompanies);
        } else {
          // Static fallback for SSR
          const staticFallbackCompanies = tokenCompanies.map((company, index) => ({
            id: index,
            name: company.name,
            symbol: company.symbol,
            owner: `0x${'0'.repeat(40)}`, // Static mock address for SSR
            initialPrice: company.price.replace('$', ''),
            totalSupply: '1000000',
            currentPrice: company.price.replace('$', ''),
            change: 0, // Static value for SSR
            changePercent: 0, // Static value for SSR
            volume: 500000, // Static value for SSR
            marketCap: parseFloat(company.marketCap.replace(/[$BM]/g, '')) * (company.marketCap.includes('B') ? 1000000000 : 1000000),
            sector: company.sector,
            logo: company.logo,
            tokenData: company // Store the full token data
          }));
          setCompanies(staticFallbackCompanies);
        }
      }
    } catch (error) {
      console.error('Failed to load companies:', error);
      // Final fallback to contract data if available
      if (isConnected && nextCompanyId > 0) {
        await loadCompaniesFromContract();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadCompaniesFromContract = async () => {
    const companyPromises = [];
    for (let i = 0; i < nextCompanyId; i++) {
      companyPromises.push(loadCompanyData(i));
    }
    const loadedCompanies = await Promise.all(companyPromises);
    setCompanies(loadedCompanies.filter(Boolean) as Company[]);
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedAndFilteredCompanies = companies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (company.symbol && company.symbol.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSector = !selectedSector || company.sector === selectedSector;
      return matchesSearch && matchesSector;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'currentPrice':
          aValue = parseFloat(a.currentPrice || '0');
          bValue = parseFloat(b.currentPrice || '0');
          break;
        case 'change':
          aValue = a.change || 0;
          bValue = b.change || 0;
          break;
        case 'volume':
          aValue = a.volume || 0;
          bValue = b.volume || 0;
          break;
        case 'marketCap':
          aValue = a.marketCap || 0;
          bValue = b.marketCap || 0;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const uniqueSectors = Array.from(new Set(companies.map(c => c.sector).filter(Boolean)));

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
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
    <motion.div 
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Market Overview
      </h2>
      
      {/* Search and Filter Controls */}
      <motion.div 
        className="mb-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search companies or symbols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-xl bg-gray-800/50 border border-gray-700/50 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500/50 transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          >
            <option value="">All Sectors</option>
            {uniqueSectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Company Table */}
      <motion.div 
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              {[
                { key: 'name', label: 'Company' },
                { key: 'currentPrice', label: 'Price' },
                { key: 'change', label: 'Change (24h)' },
                { key: 'volume', label: 'Volume' },
                { key: 'marketCap', label: 'Market Cap' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="text-left py-4 px-4 text-gray-300 font-medium cursor-pointer 
                           hover:text-white transition-colors duration-200"
                  onClick={() => handleSort(key as SortField)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {sortField === key && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          sortDirection === 'desc' ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
              <th className="text-left py-4 px-4 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredCompanies.map((company: Company, index: number) => {
              const changeColor = (company.change || 0) >= 0 ? 'text-green-400' : 'text-red-400';
              const changePrefix = (company.change || 0) >= 0 ? '+' : '';
              
              return (
                <motion.tr
                  key={company.id}
                  className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 
                                    flex items-center justify-center text-white font-bold relative">
                        {company.logo ? (
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            width={40}
                            height={40}
                            className="object-cover rounded-full"
                            onError={(e) => {
                              // Fallback to symbol if image fails
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : null}
                        {!company.logo && (
                          <span className="text-sm font-bold">
                            {company.symbol ? company.symbol.charAt(0) : company.name.charAt(0)}
                          </span>
                        )}
                        {/* Fallback text overlay */}
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                          {company.symbol ? company.symbol.charAt(0) : company.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          <span>{company.name}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          <span>{company.symbol || formatAddress(company.id.toString())}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">
                      {company.currentPrice} DSTK
                    </div>
                  </td>
                  <td className={`py-4 px-4 font-semibold ${changeColor}`}>
                    {changePrefix}{company.change?.toFixed(2) || '0.00'}%
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {formatNumber(company.volume || 0)}
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {formatNumber(company.marketCap || 0)} DSTK
                  </td>
                  <td className="py-4 px-4">
                    <motion.button
                      onClick={() => router.push(`/company/${company.id}`)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
                               hover:from-blue-700 hover:to-purple-700 rounded-lg 
                               transition-all duration-200 text-sm font-medium text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Trade
                    </motion.button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {sortedAndFilteredCompanies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-400"
        >
          <div className="text-lg font-medium mb-2">No companies found</div>
          <div className="text-sm">
            {searchTerm ? `No results for "${searchTerm}"` : 'No companies available'}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
