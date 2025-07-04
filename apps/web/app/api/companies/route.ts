import { NextRequest, NextResponse } from 'next/server';
import { getAllCompanies, getCompanyById, getAllSectors, getAllCategories, getCompanyStats } from '@/lib/utils/companyUtils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    switch (type) {
      case 'companies':
        const companies = getAllCompanies();
        return NextResponse.json({
          success: true,
          companies: companies.map((company, index) => ({
            id: index,
            name: company.name,
            symbol: company.symbol,
            owner: '0x' + Math.random().toString(16).substr(2, 40), // Mock address
            initialPrice: company.price.replace('$', ''),
            totalSupply: '1000000',
            currentPrice: company.price.replace('$', ''),
            change: (Math.random() - 0.5) * 20, // Random change
            changePercent: (Math.random() - 0.5) * 20,
            volume: Math.floor(Math.random() * 1000000),
            marketCap: parseFloat(company.marketCap.replace(/[$BM]/g, '')) * (company.marketCap.includes('B') ? 1000000000 : 1000000),
            sector: company.sector,
            logo: company.logo,
            memeData: company
          }))
        });

      case 'company':
        if (!id) {
          return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
        }
        const company = getCompanyById(id);
        if (!company) {
          return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, company });

      case 'sectors':
        return NextResponse.json({ success: true, sectors: getAllSectors() });

      case 'categories':
        return NextResponse.json({ success: true, categories: getAllCategories() });

      case 'stats':
        return NextResponse.json({ success: true, stats: getCompanyStats() });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
