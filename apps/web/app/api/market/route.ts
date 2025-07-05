import { NextRequest, NextResponse } from 'next/server';
import { generateOHLCData, calculateSMA, calculateEMA, calculateRSI, generateVolumeData } from '@/lib/utils/chartData';
import { getAllCompanies } from '@/lib/utils/companyUtils';
import { validateEnvironment, BACKEND_CONFIG, RATE_LIMITING } from '@/lib/constants/shared';

// Rate limiting store
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Cache store
const cache = new Map<string, { data: any; expiry: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 
            request.headers.get('x-real-ip') || 
            'unknown';
  return `market_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const limit = RATE_LIMITING.market;
  
  let record = requestCounts.get(key);
  
  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + limit.windowMs
    };
    requestCounts.set(key, record);
  }
  
  if (record.count >= limit.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }
  
  record.count++;
  
  return {
    allowed: true,
    remaining: limit.maxRequests - record.count,
    resetTime: record.resetTime
  };
}

function getCachedData(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }
  if (cached) {
    cache.delete(key);
  }
  return null;
}

function setCachedData(key: string, data: any, ttlSeconds: number = 60): void {
  cache.set(key, {
    data,
    expiry: Date.now() + (ttlSeconds * 1000)
  });
}

async function fetchFromBackend(endpoint: string, options: RequestInit = {}): Promise<any> {
  const config = validateEnvironment();
  
  if (!config.BACKEND_URL) {
    throw new Error('Backend URL not configured');
  }
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BACKEND_CONFIG.requestTimeout);
  
  try {
    const response = await fetch(`${config.BACKEND_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Backend request timeout');
    }
    throw error;
  }
}

async function getMarketDataFromBackend(type: string, params: Record<string, any> = {}): Promise<any> {
  try {
    switch (type) {
      case 'companies':
        return await fetchFromBackend('/api/companies');
      
      case 'ticker':
        return await fetchFromBackend('/api/market/ticker');
      
      case 'heatmap':
        return await fetchFromBackend('/api/market/heatmap');
      
      case 'chart':
        const { symbol, timeframe, days } = params;
        return await fetchFromBackend(`/api/market/chart?symbol=${symbol}&timeframe=${timeframe}&days=${days}`);
      
      case 'overview':
      default:
        return await fetchFromBackend('/api/market/overview');
    }
  } catch (error) {
    console.error(`Backend fetch failed for ${type}:`, error);
    return null;
  }
}

function generateFallbackData(type: string, params: Record<string, any> = {}): any {
  const memeCompanies = getAllCompanies();
  
  switch (type) {
    case 'companies':
      return {
        companies: memeCompanies.map((company, index) => ({
          id: index,
          name: company.name,
          symbol: company.symbol,
          owner: '0x' + Math.random().toString(16).substr(2, 40),
          initialPrice: company.price.replace('$', ''),
          totalSupply: '1000000',
          currentPrice: company.price.replace('$', ''),
          price: parseFloat(company.price.replace('$', '')),
          change: (Math.random() - 0.5) * 20,
          changePercent: (Math.random() - 0.5) * 20,
          volume: Math.floor(Math.random() * 1000000),
          marketCap: parseFloat(company.marketCap.replace(/[$BM]/g, '')) * (company.marketCap.includes('B') ? 1000000000 : 1000000),
          sector: company.sector,
          logo: company.logo,
          tokenData: company
        }))
      };
    
    case 'ticker':
      return {
        ticker: memeCompanies.slice(0, 10).map(company => ({
          symbol: company.symbol,
          name: company.name,
          price: parseFloat(company.price.replace('$', '')),
          change: (Math.random() - 0.5) * 10,
          changePercent: (Math.random() - 0.5) * 15,
          volume: Math.floor(Math.random() * 1000000),
        }))
      };
    
    case 'heatmap':
      return {
        heatmap: memeCompanies.slice(0, 12).map((company) => {
          const marketCapValue = parseFloat(company.marketCap.replace(/[$BM]/g, ''));
          const marketCapInNumber = company.marketCap.includes('B') ? marketCapValue * 1000000000 : marketCapValue * 1000000;
          
          return {
            id: company.id,
            name: company.name,
            symbol: company.symbol,
            value: parseFloat(company.price.replace('$', '')),
            change: (Math.random() - 0.5) * 20,
            size: Math.min(Math.max((marketCapInNumber / 1000000000) * 50 + 40, 40), 120)
          };
        })
      };
    
    case 'chart':
      const { symbol, days = 30 } = params;
      const basePrice = 100 + Math.random() * 100;
      const ohlcData = generateOHLCData(days, basePrice, 0.025);
      const volumeData = generateVolumeData(ohlcData);
      const sma = calculateSMA(ohlcData, 20);
      const ema = calculateEMA(ohlcData, 20);
      const rsi = calculateRSI(ohlcData, 14);

      const emaFast = calculateEMA(ohlcData, 12);
      const emaSlow = calculateEMA(ohlcData, 26);
      const macd = emaFast.map((fast) => {
        const slow = emaSlow.find(s => s.time === fast.time);
        if (!slow) return null;
        
        const macdValue = fast.value - slow.value;
        return {
          time: fast.time,
          macd: Number(macdValue.toFixed(4)),
          signal: 0,
          histogram: Number(macdValue.toFixed(4)),
        };
      }).filter(Boolean);

      return {
        symbol,
        timeframe: params.timeframe || '1D',
        data: {
          ohlc: ohlcData,
          volume: volumeData,
          indicators: { sma, ema, rsi, macd },
        },
      };
    
    case 'overview':
    default:
      const companies = memeCompanies.slice(0, 15).map((company, index) => ({
        id: index,
        name: company.name,
        symbol: company.symbol,
        owner: '0x' + Math.random().toString(16).substr(2, 40),
        initialPrice: company.price.replace('$', ''),
        totalSupply: '1000000',
        currentPrice: company.price.replace('$', ''),
        price: parseFloat(company.price.replace('$', '')),
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 20,
        volume: Math.floor(Math.random() * 1000000),
        marketCap: parseFloat(company.marketCap.replace(/[$BM]/g, '')) * (company.marketCap.includes('B') ? 1000000000 : 1000000),
        sector: company.sector,
        logo: company.logo,
        tokenData: company
      }));
      
      const marketStats = {
        totalMarketCap: companies.reduce((sum, c) => sum + c.marketCap, 0),
        totalVolume: companies.reduce((sum, c) => sum + c.volume, 0),
        gainers: companies.filter(c => c.change > 0).length,
        losers: companies.filter(c => c.change < 0).length,
        unchanged: companies.filter(c => c.change === 0).length,
      };

      return {
        companies,
        stats: marketStats,
        timestamp: Date.now(),
      };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    const rateLimitResult = checkRateLimit(rateLimitKey);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000) },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const timeframe = searchParams.get('timeframe') || '1D';
    const days = parseInt(searchParams.get('days') || '30');
    const type = searchParams.get('type') || 'overview';

    // Create cache key
    const cacheKey = `market_${type}_${symbol || 'all'}_${timeframe}_${days}`;
    
    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        timestamp: Date.now()
      }, {
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-Cache': 'HIT'
        }
      });
    }

    let responseData: any;
    let dataSource = 'backend';

    // Try to get data from backend first
    const backendData = await getMarketDataFromBackend(type, { symbol, timeframe, days });
    
    if (backendData) {
      responseData = backendData;
    } else {
      // Fallback to mock data
      dataSource = 'fallback';
      responseData = generateFallbackData(type, { symbol, timeframe, days });
      
      // Add a shorter TTL for fallback data
      setCachedData(cacheKey, responseData, 30);
    }

    // Cache successful responses
    if (dataSource === 'backend') {
      setCachedData(cacheKey, responseData, 60);
    }

    // Add metadata
    responseData.meta = {
      source: dataSource,
      timestamp: Date.now(),
      cached: false
    };

    return NextResponse.json(responseData, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-Data-Source': dataSource,
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('Market API error:', error);
    
    // Try to return fallback data in case of critical errors
    try {
      const { searchParams } = new URL(request.url);
      const type = searchParams.get('type') || 'overview';
      const fallbackData = generateFallbackData(type);
      
      return NextResponse.json({
        ...fallbackData,
        meta: {
          source: 'emergency_fallback',
          timestamp: Date.now(),
          error: 'Primary services unavailable'
        }
      }, { 
        status: 206, // Partial Content
        headers: {
          'X-Data-Source': 'emergency_fallback'
        }
      });
    } catch {
      return NextResponse.json(
        { error: 'All market data services unavailable' },
        { status: 503 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for POST requests
    const rateLimitKey = getRateLimitKey(request);
    const rateLimitResult = checkRateLimit(rateLimitKey);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { action, symbol, quantity, price } = body;

    // Validate input
    if (!action || !symbol || !quantity || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: action, symbol, quantity, price' },
        { status: 400 }
      );
    }

    if (!['buy', 'sell'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "buy" or "sell"' },
        { status: 400 }
      );
    }

    // Try to execute trade via backend
    try {
      const tradeResult = await fetchFromBackend('/api/trades', {
        method: 'POST',
        body: JSON.stringify({ action, symbol, quantity, price })
      });
      
      return NextResponse.json({
        ...tradeResult,
        meta: { source: 'backend', timestamp: Date.now() }
      });
    } catch (backendError) {
      console.error('Backend trade execution failed:', backendError);
      
      // Fallback to mock execution
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      
      const executionPrice = price * (1 + (Math.random() - 0.5) * 0.001);
      
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
        meta: {
          source: 'fallback',
          timestamp: Date.now(),
          warning: 'Backend unavailable, using mock execution'
        }
      });
    }

  } catch (error) {
    console.error('Market API POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process trade request' },
      { status: 500 }
    );
  }
}
