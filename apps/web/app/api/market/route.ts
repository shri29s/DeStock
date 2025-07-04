import { NextRequest, NextResponse } from 'next/server';
import { generateOHLCData, generateCompanyData, calculateSMA, calculateEMA, calculateRSI, generateVolumeData } from '@/lib/utils/chartData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const timeframe = searchParams.get('timeframe') || '1D';
    const days = parseInt(searchParams.get('days') || '30');
    const type = searchParams.get('type') || 'overview';

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

    if (type === 'companies') {
      const companies = generateCompanyData(20);
      return NextResponse.json({ companies });
    }

    if (type === 'ticker') {
      // Generate ticker data for multiple companies
      const companies = generateCompanyData(10);
      const tickerData = companies.map(company => ({
        symbol: company.symbol,
        name: company.name,
        price: company.price,
        change: company.change,
        changePercent: company.changePercent,
        volume: company.volume,
      }));
      
      return NextResponse.json({ ticker: tickerData });
    }

    if (type === 'heatmap') {
      // Generate heatmap data
      const companies = generateCompanyData(12);
      const heatmap = companies.map((company, index) => ({
        id: index.toString(),
        name: company.name,
        symbol: company.symbol,
        value: company.price,
        change: company.changePercent,
        size: Math.min(Math.max((company.marketCap / 1000000000) * 50 + 40, 40), 120) // Scale market cap to size
      }));
      
      return NextResponse.json({ heatmap });
    }

    if (symbol && type === 'chart') {
      // Generate chart data for specific symbol
      const basePrice = 100 + Math.random() * 100;
      const ohlcData = generateOHLCData(days, basePrice, 0.025);
      const volumeData = generateVolumeData(ohlcData);
      const sma = calculateSMA(ohlcData, 20);
      const ema = calculateEMA(ohlcData, 20);
      const rsi = calculateRSI(ohlcData, 14);

      // Calculate MACD (simplified)
      const emaFast = calculateEMA(ohlcData, 12);
      const emaSlow = calculateEMA(ohlcData, 26);
      const macd = emaFast.map((fast, index) => {
        const slow = emaSlow.find(s => s.time === fast.time);
        if (!slow) return null;
        
        const macdValue = fast.value - slow.value;
        return {
          time: fast.time,
          macd: Number(macdValue.toFixed(4)),
          signal: 0, // Simplified - would need EMA of MACD
          histogram: Number(macdValue.toFixed(4)),
        };
      }).filter(Boolean);

      return NextResponse.json({
        symbol,
        timeframe,
        data: {
          ohlc: ohlcData,
          volume: volumeData,
          indicators: {
            sma,
            ema,
            rsi,
            macd,
          },
        },
      });
    }

    // Default market overview
    const companies = generateCompanyData(15);
    const marketStats = {
      totalMarketCap: companies.reduce((sum, c) => sum + c.marketCap, 0),
      totalVolume: companies.reduce((sum, c) => sum + c.volume, 0),
      gainers: companies.filter(c => c.change > 0).length,
      losers: companies.filter(c => c.change < 0).length,
      unchanged: companies.filter(c => c.change === 0).length,
    };

    return NextResponse.json({
      companies,
      stats: marketStats,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, symbol, quantity, price } = body;

    // Simulate trade execution
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (action === 'buy' || action === 'sell') {
      const executionPrice = price * (1 + (Math.random() - 0.5) * 0.001); // Small slippage
      
      return NextResponse.json({
        success: true,
        transaction: {
          id: Math.random().toString(36).substr(2, 9),
          symbol,
          action,
          quantity,
          requestedPrice: price,
          executedPrice: Number(executionPrice.toFixed(2)),
          timestamp: Date.now(),
          status: 'executed',
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Market API POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
