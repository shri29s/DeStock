// Utility functions for generating and managing chart data

export interface OHLCData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface IndicatorData {
  time: number;
  value: number;
}

export interface ChartData {
  ohlc: OHLCData[];
  volume: { time: number; value: number; color?: string }[];
  sma?: IndicatorData[];
  ema?: IndicatorData[];
  rsi?: IndicatorData[];
  macd?: {
    time: number;
    macd: number;
    signal: number;
    histogram: number;
  }[];
}

// Generate realistic OHLC data
export function generateOHLCData(
  days: number = 30,
  startPrice: number = 100,
  volatility: number = 0.02
): OHLCData[] {
  const data: OHLCData[] = [];
  let currentPrice = startPrice;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  for (let i = days; i >= 0; i--) {
    const time = now - (i * dayMs);
    
    // Generate random price movements
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    const open = currentPrice;
    const close = open + change;
    
    // Generate high and low based on open and close
    const maxPrice = Math.max(open, close);
    const minPrice = Math.min(open, close);
    const high = maxPrice + Math.random() * 0.01 * currentPrice;
    const low = minPrice - Math.random() * 0.01 * currentPrice;
    
    // Generate volume (higher volume on bigger price changes)
    const volume = Math.floor(
      (10000 + Math.random() * 50000) * (1 + Math.abs(change) / currentPrice * 5)
    );

    data.push({
      time: Math.floor(time / 1000), // Lightweight Charts expects seconds
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    currentPrice = close;
  }

  return data;
}

// Calculate Simple Moving Average
export function calculateSMA(data: OHLCData[], period: number = 20): IndicatorData[] {
  const sma: IndicatorData[] = [];
  
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += data[j].close;
    }
    
    sma.push({
      time: data[i].time,
      value: Number((sum / period).toFixed(2)),
    });
  }
  
  return sma;
}

// Calculate Exponential Moving Average
export function calculateEMA(data: OHLCData[], period: number = 20): IndicatorData[] {
  const ema: IndicatorData[] = [];
  const multiplier = 2 / (period + 1);
  
  // Start with SMA for the first value
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i].close;
  }
  
  ema.push({
    time: data[period - 1].time,
    value: Number((sum / period).toFixed(2)),
  });
  
  // Calculate EMA for the rest
  for (let i = period; i < data.length; i++) {
    const value = (data[i].close - ema[ema.length - 1].value) * multiplier + ema[ema.length - 1].value;
    ema.push({
      time: data[i].time,
      value: Number(value.toFixed(2)),
    });
  }
  
  return ema;
}

// Calculate RSI (Relative Strength Index)
export function calculateRSI(data: OHLCData[], period: number = 14): IndicatorData[] {
  const rsi: IndicatorData[] = [];
  const gains: number[] = [];
  const losses: number[] = [];
  
  // Calculate gains and losses
  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
  }
  
  // Calculate initial average gain and loss
  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  
  // Calculate RSI
  for (let i = period; i < data.length; i++) {
    const rs = avgGain / avgLoss;
    const rsiValue = 100 - (100 / (1 + rs));
    
    rsi.push({
      time: data[i].time,
      value: Number(rsiValue.toFixed(2)),
    });
    
    // Update average gain and loss for next iteration
    if (i < data.length - 1) {
      const change = data[i + 1].close - data[i].close;
      const gain = change > 0 ? change : 0;
      const loss = change < 0 ? -change : 0;
      
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }
  }
  
  return rsi;
}

// Generate volume data with colors
export function generateVolumeData(ohlcData: OHLCData[]): { time: number; value: number; color?: string }[] {
  return ohlcData.map((candle, index) => {
    const prevCandle = index > 0 ? ohlcData[index - 1] : candle;
    const isUp = candle.close > prevCandle.close;
    
    return {
      time: candle.time,
      value: candle.volume || 0,
      color: isUp ? '#00D4AA' : '#F6465D', // Success green for up, danger red for down
    };
  });
}

// Generate mock company data
export function generateCompanyData(count: number = 20) {
  const companies = [
    'Apple Inc.', 'Microsoft Corp.', 'Amazon.com Inc.', 'Alphabet Inc.',
    'Tesla Inc.', 'Meta Platforms', 'NVIDIA Corp.', 'Netflix Inc.',
    'PayPal Holdings', 'Adobe Inc.', 'Salesforce Inc.', 'Zoom Video',
    'Spotify Technology', 'Uber Technologies', 'Airbnb Inc.', 'Twitter Inc.',
    'Snap Inc.', 'Pinterest Inc.', 'Shopify Inc.', 'Square Inc.',
  ];
  
  const sectors = [
    'Technology', 'Consumer Discretionary', 'Communication Services',
    'Healthcare', 'Financials', 'Industrials', 'Consumer Staples',
  ];
  
  return Array.from({ length: Math.min(count, companies.length) }, (_, index) => {
    const basePrice = 50 + Math.random() * 200;
    const change = (Math.random() - 0.5) * 0.1 * basePrice;
    const changePercent = (change / basePrice) * 100;
    
    return {
      id: index,
      name: companies[index],
      symbol: companies[index].split(' ')[0].slice(0, 4).toUpperCase(),
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      price: Number(basePrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 100000,
      marketCap: Math.floor((basePrice * (Math.random() * 1000000 + 100000)) / 1000) * 1000,
      chartData: generateOHLCData(30, basePrice, 0.02),
    };
  });
}

// Generate portfolio data
export function generatePortfolioData() {
  const holdings = generateCompanyData(8).map((company, index) => {
    const shares = Math.floor(Math.random() * 100) + 10;
    const avgCost = company.price * (0.8 + Math.random() * 0.4); // ±20% from current price
    const totalValue = shares * company.price;
    const totalCost = shares * avgCost;
    const pnl = totalValue - totalCost;
    const pnlPercent = (pnl / totalCost) * 100;
    
    return {
      ...company,
      shares,
      avgCost: Number(avgCost.toFixed(2)),
      totalValue: Number(totalValue.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      pnl: Number(pnl.toFixed(2)),
      pnlPercent: Number(pnlPercent.toFixed(2)),
    };
  });
  
  const totalValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalCost = holdings.reduce((sum, holding) => sum + holding.totalCost, 0);
  const totalPnL = totalValue - totalCost;
  const totalPnLPercent = (totalPnL / totalCost) * 100;
  
  return {
    holdings,
    summary: {
      totalValue: Number(totalValue.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      totalPnL: Number(totalPnL.toFixed(2)),
      totalPnLPercent: Number(totalPnLPercent.toFixed(2)),
      dayChange: Number((totalValue * (Math.random() - 0.5) * 0.02).toFixed(2)),
      dayChangePercent: Number(((Math.random() - 0.5) * 2).toFixed(2)),
    },
  };
}

// Real-time data simulation
export function createRealTimeDataStream(
  initialData: OHLCData[],
  callback: (newData: OHLCData) => void,
  interval: number = 5000
) {
  const lastCandle = initialData[initialData.length - 1];
  let currentPrice = lastCandle.close;
  
  const generateNextCandle = () => {
    const now = Math.floor(Date.now() / 1000);
    const change = (Math.random() - 0.5) * 0.02 * currentPrice;
    const open = currentPrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 0.005 * currentPrice;
    const low = Math.min(open, close) - Math.random() * 0.005 * currentPrice;
    const volume = Math.floor(Math.random() * 50000) + 10000;
    
    const newCandle: OHLCData = {
      time: now,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    };
    
    currentPrice = close;
    callback(newCandle);
  };
  
  const intervalId = setInterval(generateNextCandle, interval);
  
  return () => clearInterval(intervalId);
}
