'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface MockOrder {
  id: number;
  companyId: number;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: Date;
}

export default function OpenOrders() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<MockOrder[]>([]);

  useEffect(() => {
    setMounted(true);
    // Initialize orders only on client to avoid hydration mismatch
    const mockOrders: MockOrder[] = [
      {
        id: 1,
        companyId: 1,
        type: 'buy',
        amount: 100,
        price: 0.0025,
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      },
      {
        id: 2,
        companyId: 3,
        type: 'sell',
        amount: 50,
        price: 0.0034,
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      },
    ];
    setOrders(mockOrders);
  }, []);

  const handleCancelOrder = (orderId: number) => {
    console.log('Cancel order:', orderId);
    // TODO: Implement actual order cancellation
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString();
  };

  if (!address) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Open Orders</h3>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Connect your wallet to view open orders</p>
        </div>
      </div>
    );
  }

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Open Orders</h3>
        <div className="text-center py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Open Orders</h3>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No open orders</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Place an order to see it here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Open Orders</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {orders.length} active order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => {
              const total = order.amount * order.price;
              
              return (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.type === 'buy'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {order.type === 'buy' ? 'Buy' : 'Sell'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{order.companyId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {order.price.toFixed(4)} DSTK
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {total.toFixed(4)} DSTK
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatTimestamp(order.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
