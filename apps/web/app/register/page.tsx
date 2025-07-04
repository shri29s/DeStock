import { CompanyRegistry } from '@/components/CompanyRegistry';

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Register Your Company
        </h1>
        <p className="text-lg text-gray-600">
          List your company on DeStock and enable decentralized trading of your shares.
        </p>
      </div>
      
      <CompanyRegistry />
    </div>
  );
}
