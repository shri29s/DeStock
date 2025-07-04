import { TradeView } from '@/components/TradeView';
import { CompanyList } from '@/components/CompanyList';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DeStock
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The decentralized platform for trading company shares using DSTK tokens. 
          Register your company, buy and sell shares, and participate in the future of decentralized finance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Trading Interface</h2>
          <TradeView />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Available Companies</h2>
          <CompanyList />
        </div>
      </div>
    </div>
  );
}
