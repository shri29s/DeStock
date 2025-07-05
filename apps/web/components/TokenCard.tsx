'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUpIcon, SparklesIcon } from 'lucide-react';
import { Company } from '@/lib/types/company';
import { useState } from 'react';

interface TokenCardProps {
  company: Company;
  index?: number;
  onClick?: () => void;
}

export function TokenCard({ company, index = 0, onClick }: TokenCardProps) {
  const priceValue = parseFloat(company.price.replace('$', ''));
  const [logoError, setLogoError] = useState(false);
  
  // Generate market-based trending logic using market cap
  const marketCapValue = parseFloat(company.marketCap.replace(/[$M|B]/g, ''));
  const isTrending = marketCapValue > 1000; // Over 1B market cap
  const isHighGrowth = priceValue > 5; // High price point

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="glass-card p-6 h-full relative overflow-hidden hover:border-blue-500/50 transition-all duration-300">
        {/* High Growth badge */}
        {isHighGrowth && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 rounded-full text-xs font-bold text-white">
              <TrendingUpIcon className="w-3 h-3" />
              <span>HIGH VALUE</span>
            </div>
          </div>
        )}

        {/* Trending badge */}
        {isTrending && !isHighGrowth && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded-full text-xs font-bold text-white">
              <TrendingUpIcon className="w-3 h-3" />
              <span>TRENDING</span>
            </div>
          </div>
        )}

        {/* Company logo and info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800/50 flex items-center justify-center border-2 border-gray-700/50">
              {!logoError ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={64}
                  height={64}
                  className="object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="text-lg font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full flex items-center justify-center">
                  {company.symbol.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-white truncate">{company.name}</h3>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                {company.sector}
              </span>
            </div>
            <div className="text-gray-400 text-sm mb-1">{company.tokenName}</div>
            <div className="text-gray-500 text-xs">{company.category}</div>
          </div>
        </div>

        {/* Price and market cap */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-white">{company.price}</div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Market Cap</div>
              <div className="text-lg font-semibold text-green-400">{company.marketCap}</div>
            </div>
          </div>
        </div>

        {/* Company description */}
        <div className="mb-4">
          <p className="text-gray-300 text-sm leading-relaxed">{company.description}</p>
        </div>

        {/* Market metrics */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-400">SECTOR:</span>
            <span className="text-sm text-blue-400">{company.sector}</span>
          </div>
          
          <motion.div
            className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
          >
            <SparklesIcon className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Professional info on hover */}
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
          <div className="text-center">
            <div className="text-2xl mb-3 bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white font-bold">
              {company.symbol.charAt(0)}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{company.tokenName}</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{company.description}</p>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg inline-block">
              <span className="text-white font-medium">Trade Now</span>
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
