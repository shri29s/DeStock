'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SearchIcon, TrendingUpIcon } from 'lucide-react';
import { TokenCard } from '@/components/TokenCard';
import { getAllCompanies, getAllSectors, getAllCategories, filterAndSortCompanies, getCompanyStats, getTrendingCompanies } from '@/lib/utils/companyUtils';
import { FilterOptions, SortField, SortDirection } from '@/lib/types/company';

export default function TokensPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const allCompanies = getAllCompanies();
  const allSectors = getAllSectors();
  const allCategories = getAllCategories();
  const trendingCompanies = getTrendingCompanies();
  const stats = getCompanyStats();

  const filterOptions: FilterOptions = {
    searchTerm,
    selectedSector,
    selectedCategory,
    sortField,
    sortDirection
  };

  const filteredCompanies = useMemo(() => 
    filterAndSortCompanies(filterOptions), 
    [searchTerm, selectedSector, selectedCategory, sortField, sortDirection]
  );

  const handleCompanyClick = (companyId: string) => {
    router.push(`/trading/${companyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            DeStock Tokens
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Professional decentralized trading platform for company tokens with advanced analytics and real-time market data
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <motion.div 
              className="glass-card px-6 py-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-400">{stats.totalCompanies}</div>
              <div className="text-sm text-gray-400">Total Tokens</div>
            </motion.div>
            <motion.div 
              className="glass-card px-6 py-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-green-400">{stats.totalMarketCap}</div>
              <div className="text-sm text-gray-400">Total Market Cap</div>
            </motion.div>
            <motion.div 
              className="glass-card px-6 py-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-purple-400">{stats.sectors}</div>
              <div className="text-sm text-gray-400">Sectors</div>
            </motion.div>
            <motion.div 
              className="glass-card px-6 py-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-pink-400">${stats.averagePrice.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Avg Price</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trending Section */}
        {trendingCompanies.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUpIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Trending Tokens</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingCompanies.slice(0, 4).map((company, index) => (
                <TokenCard
                  key={company.id}
                  company={company}
                  index={index}
                  onClick={() => handleCompanyClick(company.id)}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <input
                type="text"
                placeholder="Search tokens, companies, or themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 rounded-xl bg-gray-800/50 border border-gray-700/50 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500/50 transition-all duration-200"
              />
              <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>

            {/* Sector Filter */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <option value="">All Sectors</option>
              {allSectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <option value="">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                setSortField(field as SortField);
                setSortDirection(direction as SortDirection);
              }}
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <option value="marketCap-desc">Market Cap (High to Low)</option>
              <option value="marketCap-asc">Market Cap (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="name-asc">Name (A to Z)</option>
              <option value="name-desc">Name (Z to A)</option>
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredCompanies.length} of {allCompanies.length} tokens
          </div>
        </motion.div>

        {/* Token Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCompanies.map((company, index) => (
                <TokenCard
                  key={company.id}
                  company={company}
                  index={index}
                  onClick={() => handleCompanyClick(company.id)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No tokens found</h3>
              <p className="text-gray-400">
                {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters'}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 glass-card p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Trade?</h2>
          <p className="text-gray-300 mb-6">
            Connect your wallet and start trading company tokens with professional-grade tools
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     px-8 py-4 rounded-xl font-bold text-white transition-all duration-200"
          >
            Start Trading Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
