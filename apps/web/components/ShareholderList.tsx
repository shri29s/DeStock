
'use client';

import { useEffect, useState } from 'react';

interface Shareholder {
  address: string;
  balance: number;
}

export function ShareholderList({ companyId }: { companyId: number }) {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShareholders() {
      try {
        const response = await fetch(`/api/shareholders/${companyId}`);
        const data = await response.json();
        setShareholders(data);
      } catch (error) {
        console.error('Failed to fetch shareholders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchShareholders();
  }, [companyId]);

  if (loading) {
    return <div>Loading shareholders...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Shareholders</h3>
      <ul className="space-y-2">
        {shareholders.map((shareholder, index) => (
          <li key={index} className="p-2 rounded-md bg-gray-100">
            <div className="flex justify-between">
              <span>{shareholder.address}</span>
              <span>{shareholder.balance} shares</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
