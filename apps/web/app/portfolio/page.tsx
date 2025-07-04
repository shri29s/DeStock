'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

interface Holding {
  companyId: number;
  balance: number;
}

export default function PortfolioPage() {
  const { address, isConnected } = useAccount();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      if (!address) return;
      try {
        const response = await fetch(`/api/portfolio/${address}`);
        const data = await response.json();
        setHoldings(data);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, [address]);

  if (!isConnected) {
    return <div>Please connect your wallet to view your portfolio.</div>;
  }

  if (loading) {
    return <div>Loading portfolio...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Portfolio</h1>
      <div className="space-y-4">
        {holdings.map((holding) => (
          <div key={holding.companyId} className="p-4 rounded-md bg-gray-100">
            <h2 className="text-xl font-semibold">Company ID: {holding.companyId}</h2>
            <p>Balance: {holding.balance} shares</p>
          </div>
        ))}
      </div>
    </div>
  );
}