import { NextRequest, NextResponse } from 'next/server';
import { generatePortfolioData, generateOHLCData } from '@/lib/utils/chartData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    const timeframe = searchParams.get('timeframe') || '1M';

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));

    if (type === 'overview') {
      const portfolioData = generatePortfolioData();
      
      // Generate portfolio performance history
      const performanceHistory = generateOHLCData(30, portfolioData.summary.totalValue, 0.015)
        .map(candle => ({
          time: candle.time,
          value: candle.close,
          change: candle.close - candle.open,
          changePercent: ((candle.close - candle.open) / candle.open) * 100,
        }));

      return NextResponse.json({
        ...portfolioData,
        performance: {
          history: performanceHistory,
          timeframe,
        },
        diversification: {
          bySector: calculateSectorDiversification(portfolioData.holdings),
          byPosition: calculatePositionSizing(portfolioData.holdings),
        },
        riskMetrics: {
          beta: Number((0.8 + Math.random() * 0.6).toFixed(2)), // 0.8 - 1.4
          sharpeRatio: Number((0.5 + Math.random() * 1.0).toFixed(2)), // 0.5 - 1.5
          volatility: Number((15 + Math.random() * 10).toFixed(2)), // 15% - 25%
          maxDrawdown: Number((5 + Math.random() * 15).toFixed(2)), // 5% - 20%
        },
      });
    }

    if (type === 'transactions') {
      const portfolioData = generatePortfolioData();
      const transactions = generateTransactionHistory(portfolioData.holdings);
      
      return NextResponse.json({
        transactions,
        pagination: {
          page: 1,
          limit: 50,
          total: transactions.length,
        },
      });
    }

    if (type === 'analytics') {
      const portfolioData = generatePortfolioData();
      
      // Calculate portfolio analytics
      const analytics = {
        allocation: {
          stocks: 85.5,
          cash: 10.2,
          other: 4.3,
        },
        performance: {
          ytd: Number((Math.random() * 30 - 10).toFixed(2)),
          oneMonth: Number((Math.random() * 10 - 3).toFixed(2)),
          threeMonths: Number((Math.random() * 20 - 5).toFixed(2)),
          oneYear: Number((Math.random() * 40 - 15).toFixed(2)),
        },
        topPerformers: portfolioData.holdings
          .sort((a, b) => b.pnlPercent - a.pnlPercent)
          .slice(0, 3),
        bottomPerformers: portfolioData.holdings
          .sort((a, b) => a.pnlPercent - b.pnlPercent)
          .slice(0, 3),
      };

      return NextResponse.json(analytics);
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}

function calculateSectorDiversification(holdings: any[]) {
  const sectorTotals: { [key: string]: number } = {};
  const totalValue = holdings.reduce((sum, h) => sum + h.totalValue, 0);
  
  holdings.forEach(holding => {
    if (!sectorTotals[holding.sector]) {
      sectorTotals[holding.sector] = 0;
    }
    sectorTotals[holding.sector] += holding.totalValue;
  });
  
  return Object.entries(sectorTotals).map(([sector, value]) => ({
    sector,
    value: Number(value.toFixed(2)),
    percentage: Number(((value / totalValue) * 100).toFixed(1)),
  }));
}

function calculatePositionSizing(holdings: any[]) {
  const totalValue = holdings.reduce((sum, h) => sum + h.totalValue, 0);
  
  return holdings.map(holding => ({
    symbol: holding.symbol,
    name: holding.name,
    value: holding.totalValue,
    percentage: Number(((holding.totalValue / totalValue) * 100).toFixed(1)),
  }));
}

function generateTransactionHistory(holdings: any[]) {
  const transactions = [];
  const types = ['buy', 'sell', 'dividend'];
  
  // Generate 20-50 random transactions
  const transactionCount = 20 + Math.floor(Math.random() * 30);
  
  for (let i = 0; i < transactionCount; i++) {
    const holding = holdings[Math.floor(Math.random() * holdings.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    
    let transaction: any = {
      id: Math.random().toString(36).substr(2, 9),
      symbol: holding.symbol,
      name: holding.name,
      type,
      date: date.toISOString(),
      status: 'completed',
    };
    
    if (type === 'buy' || type === 'sell') {
      const quantity = Math.floor(Math.random() * 50) + 1;
      const price = holding.price * (0.9 + Math.random() * 0.2); // ±10%
      
      transaction = {
        ...transaction,
        quantity,
        price: Number(price.toFixed(2)),
        total: Number((quantity * price).toFixed(2)),
        fees: Number((quantity * price * 0.001).toFixed(2)), // 0.1% fee
      };
    } else if (type === 'dividend') {
      transaction = {
        ...transaction,
        amount: Number((Math.random() * 100 + 10).toFixed(2)),
        quantity: holding.shares,
        dividendPerShare: Number((Math.random() * 2 + 0.5).toFixed(3)),
      };
    }
    
    transactions.push(transaction);
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
