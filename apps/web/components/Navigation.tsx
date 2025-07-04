'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ConnectWallet } from './ConnectWallet';
import { ThemeToggle } from './ThemeToggle';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Register Company', href: '/register' },
  { name: 'Portfolio', href: '/portfolio' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav 
      className="glass-nav border-b border-white/20 dark:border-black/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-2xl font-bold text-destock-primary">
                DeStock
              </Link>
            </motion.div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      pathname === item.href
                        ? 'border-destock-primary text-destock-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <ConnectWallet />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
