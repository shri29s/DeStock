import { NextRequest, NextResponse } from 'next/server';
import { generatePortfolioData, generateOHLCData } from '@/lib/utils/chartData';
import { validateEnvironment, BACKEND_CONFIG, RATE_LIMITING } from '@/lib/constants/shared';

// Rate limiting and cache stores
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const cache = new Map<string, { data: any; expiry: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 
            request.headers.get('x-real-ip') || 
            'unknown';
  return `portfolio_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const limit = RATE_LIMITING.portfolio;
  
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

function setCachedData(key: string, data: any, ttlSeconds: number = 30): void {
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

async function getPortfolioFromBackend(type: string, address?: string, params: Record<string, any> = {}): Promise<any> {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const baseEndpoint = address ? `/api/portfolio/${address}` : '/api/portfolio';
    const endpoint = `${baseEndpoint}/${type}${queryParams ? `?${queryParams}` : ''}`;
    
    return await fetchFromBackend(endpoint);
  } catch (error) {
    console.error(`Backend portfolio fetch failed for ${type}:`, error);
    return null;
  }
}

function generateFallbackPortfolioData(type: string, params: Record<string, any> = {}): any {
  const portfolioData = generatePortfolioData();
  
  switch (type) {
    case 'overview':
      const performanceHistory = generateOHLCData(30, portfolioData.summary.totalValue, 0.015)
        .map(candle => ({
          time: candle.time,
          value: candle.close,
          change: candle.close - candle.open,
          changePercent: ((candle.close - candle.open) / candle.open) * 100,
        }));

      return {
        ...portfolioData,
        performance: {
          history: performanceHistory,
          timeframe: params.timeframe || '1M',
        },
        diversification: {
          bySector: calculateSectorDiversification(portfolioData.holdings),
          byPosition: calculatePositionSizing(portfolioData.holdings),
        },
        riskMetrics: {
          beta: Number((0.8 + Math.random() * 0.6).toFixed(2)),
          sharpeRatio: Number((0.5 + Math.random() * 1.0).toFixed(2)),
          volatility: Number((15 + Math.random() * 10).toFixed(2)),
          maxDrawdown: Number((5 + Math.random() * 15).toFixed(2)),
        },
      };
    
    case 'transactions':
      const transactions = generateTransactionHistory(portfolioData.holdings);
      return {
        transactions,
        pagination: {
          page: parseInt(params.page) || 1,
          limit: parseInt(params.limit) || 50,
          total: transactions.length,
        },
      };
    
    case 'analytics':
      return {
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
    
    case 'positions':
      return {
        positions: portfolioData.holdings,
        summary: {
          totalPositions: portfolioData.holdings.length,
          totalValue: portfolioData.summary.totalValue,
          realizedPnL: portfolioData.summary.totalPnL,
          unrealizedPnL: portfolioData.holdings.reduce((sum, h) => sum + (h.pnl || 0), 0),
        }
      };
    
    default:
      throw new Error(`Unknown portfolio type: ${type}`);
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
    const type = searchParams.get('type') || 'overview';
    const timeframe = searchParams.get('timeframe') || '1M';
    const address = searchParams.get('address');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '50';

    // Input validation
    const validTypes = ['overview', 'transactions', 'analytics', 'positions', 'performance'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type parameter. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Create cache key
    const cacheKey = `portfolio_${type}_${address || 'default'}_${timeframe}_${page}_${limit}`;
    
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
    const backendData = await getPortfolioFromBackend(type, address || undefined, { 
      timeframe, 
      page, 
      limit 
    });
    
    if (backendData) {
      responseData = backendData;
    } else {
      // Fallback to mock data
      dataSource = 'fallback';
      responseData = generateFallbackPortfolioData(type, { 
        timeframe, 
        page, 
        limit 
      });
      
      // Shorter TTL for fallback data
      setCachedData(cacheKey, responseData, 20);
    }

    // Cache successful responses
    if (dataSource === 'backend') {
      setCachedData(cacheKey, responseData, 30);
    }

    // Add metadata
    responseData.meta = {
      source: dataSource,
      timestamp: Date.now(),
      cached: false,
      type,
      ...(address && { address }),
    };

    return NextResponse.json(responseData, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-Data-Source': dataSource,
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('Portfolio API error:', error);
    
    // Try to return fallback data in case of critical errors
    try {
      const { searchParams } = new URL(request.url);
      const type = searchParams.get('type') || 'overview';
      const fallbackData = generateFallbackPortfolioData(type);
      
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
        { error: 'All portfolio services unavailable' },
        { status: 503 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    const rateLimitResult = checkRateLimit(rateLimitKey);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { action, address, ...data } = body;

    // Validate input
    if (!action) {
      return NextResponse.json(
        { error: 'Missing required field: action' },
        { status: 400 }
      );
    }

    const validActions = ['sync', 'update', 'refresh'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: `Invalid action. Must be one of: ${validActions.join(', ')}` },
        { status: 400 }
      );
    }

    // Try to execute action via backend
    try {
      const actionResult = await fetchFromBackend('/api/portfolio/actions', {
        method: 'POST',
        body: JSON.stringify({ action, address, ...data })
      });
      
      return NextResponse.json({
        ...actionResult,
        meta: { source: 'backend', timestamp: Date.now() }
      });
    } catch (backendError) {
      console.error('Backend portfolio action failed:', backendError);
      
      // Fallback to mock response
      return NextResponse.json({
        success: true,
        action,
        message: `Portfolio ${action} completed (simulated)`,
        meta: {
          source: 'fallback',
          timestamp: Date.now(),
          warning: 'Backend unavailable, using mock response'
        }
      });
    }

  } catch (error) {
    console.error('Portfolio API POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process portfolio action' },
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
