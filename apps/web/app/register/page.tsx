import { CompanyRegistry } from '@/components/CompanyRegistry';
import { BuildingIcon, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <BuildingIcon className="w-16 h-16 text-destock-primary" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-destock-primary via-purple-500 to-destock-primary bg-clip-text text-transparent mb-4">
          Register Your Company
        </h1>
        <p className="text-lg text-medium-contrast leading-relaxed">
          Join the future of decentralized finance. List your company on DeStock and enable 
          <span className="text-destock-primary font-semibold"> transparent, blockchain-based trading </span>
          of your shares.
        </p>
        <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-low-contrast">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Transparent</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Decentralized</span>
          </div>
        </div>
      </div>
      
      <CompanyRegistry />
    </div>
  );
}
