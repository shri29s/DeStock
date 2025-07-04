
'use client';

import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';

interface Trade {
  type: 'buy' | 'sell';
  address: string;
  amount: number;
  price: string;
  timestamp: string;
}

export function TradeHistory({ companyId }: { companyId: number }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const response = await fetch(`/api/trades/${companyId}`);
        const data = await response.json();
        setTrades(data);
      } catch (error) {
        console.error('Failed to fetch trade history:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrades();
  }, [companyId]);

  if (loading) {
    return <div>Loading trade history...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Trade History</h3>
      <ul className="space-y-2">
        {trades.map((trade, index) => (
          <li key={index} className={`p-2 rounded-md ${trade.type === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="flex justify-between">
              <span>{trade.type.toUpperCase()}</span>
              <span>{new Date(trade.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>{trade.amount} shares</span>
              <span>{formatUnits(BigInt(trade.price), 18)} DSTK</span>
            </div>
            <div className="text-sm text-gray-500">{trade.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
