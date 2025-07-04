module.exports = {

"[project]/apps/web/.next-internal/server/app/api/portfolio/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/apps/web/lib/utils/chartData.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Utility functions for generating and managing chart data
__turbopack_context__.s({
    "calculateEMA": (()=>calculateEMA),
    "calculateRSI": (()=>calculateRSI),
    "calculateSMA": (()=>calculateSMA),
    "createRealTimeDataStream": (()=>createRealTimeDataStream),
    "generateCompanyData": (()=>generateCompanyData),
    "generateOHLCData": (()=>generateOHLCData),
    "generatePortfolioData": (()=>generatePortfolioData),
    "generateVolumeData": (()=>generateVolumeData)
});
function generateOHLCData(days = 30, startPrice = 100, volatility = 0.02) {
    const data = [];
    let currentPrice = startPrice;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    for(let i = days; i >= 0; i--){
        const time = now - i * dayMs;
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
        const volume = Math.floor((10000 + Math.random() * 50000) * (1 + Math.abs(change) / currentPrice * 5));
        data.push({
            time: Math.floor(time / 1000),
            open: Number(open.toFixed(2)),
            high: Number(high.toFixed(2)),
            low: Number(low.toFixed(2)),
            close: Number(close.toFixed(2)),
            volume
        });
        currentPrice = close;
    }
    return data;
}
function calculateSMA(data, period = 20) {
    const sma = [];
    for(let i = period - 1; i < data.length; i++){
        let sum = 0;
        for(let j = i - period + 1; j <= i; j++){
            sum += data[j].close;
        }
        sma.push({
            time: data[i].time,
            value: Number((sum / period).toFixed(2))
        });
    }
    return sma;
}
function calculateEMA(data, period = 20) {
    const ema = [];
    const multiplier = 2 / (period + 1);
    // Start with SMA for the first value
    let sum = 0;
    for(let i = 0; i < period; i++){
        sum += data[i].close;
    }
    ema.push({
        time: data[period - 1].time,
        value: Number((sum / period).toFixed(2))
    });
    // Calculate EMA for the rest
    for(let i = period; i < data.length; i++){
        const value = (data[i].close - ema[ema.length - 1].value) * multiplier + ema[ema.length - 1].value;
        ema.push({
            time: data[i].time,
            value: Number(value.toFixed(2))
        });
    }
    return ema;
}
function calculateRSI(data, period = 14) {
    const rsi = [];
    const gains = [];
    const losses = [];
    // Calculate gains and losses
    for(let i = 1; i < data.length; i++){
        const change = data[i].close - data[i - 1].close;
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? -change : 0);
    }
    // Calculate initial average gain and loss
    let avgGain = gains.slice(0, period).reduce((a, b)=>a + b, 0) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b)=>a + b, 0) / period;
    // Calculate RSI
    for(let i = period; i < data.length; i++){
        const rs = avgGain / avgLoss;
        const rsiValue = 100 - 100 / (1 + rs);
        rsi.push({
            time: data[i].time,
            value: Number(rsiValue.toFixed(2))
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
function generateVolumeData(ohlcData) {
    return ohlcData.map((candle, index)=>{
        const prevCandle = index > 0 ? ohlcData[index - 1] : candle;
        const isUp = candle.close > prevCandle.close;
        return {
            time: candle.time,
            value: candle.volume || 0,
            color: isUp ? '#00D4AA' : '#F6465D'
        };
    });
}
function generateCompanyData(count = 20) {
    const companies = [
        'Apple Inc.',
        'Microsoft Corp.',
        'Amazon.com Inc.',
        'Alphabet Inc.',
        'Tesla Inc.',
        'Meta Platforms',
        'NVIDIA Corp.',
        'Netflix Inc.',
        'PayPal Holdings',
        'Adobe Inc.',
        'Salesforce Inc.',
        'Zoom Video',
        'Spotify Technology',
        'Uber Technologies',
        'Airbnb Inc.',
        'Twitter Inc.',
        'Snap Inc.',
        'Pinterest Inc.',
        'Shopify Inc.',
        'Square Inc.'
    ];
    const sectors = [
        'Technology',
        'Consumer Discretionary',
        'Communication Services',
        'Healthcare',
        'Financials',
        'Industrials',
        'Consumer Staples'
    ];
    return Array.from({
        length: Math.min(count, companies.length)
    }, (_, index)=>{
        const basePrice = 50 + Math.random() * 200;
        const change = (Math.random() - 0.5) * 0.1 * basePrice;
        const changePercent = change / basePrice * 100;
        return {
            id: index,
            name: companies[index],
            symbol: companies[index].split(' ')[0].slice(0, 4).toUpperCase(),
            sector: sectors[Math.floor(Math.random() * sectors.length)],
            price: Number(basePrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000) + 100000,
            marketCap: Math.floor(basePrice * (Math.random() * 1000000 + 100000) / 1000) * 1000,
            chartData: generateOHLCData(30, basePrice, 0.02)
        };
    });
}
function generatePortfolioData() {
    const holdings = generateCompanyData(8).map((company, index)=>{
        const shares = Math.floor(Math.random() * 100) + 10;
        const avgCost = company.price * (0.8 + Math.random() * 0.4); // ±20% from current price
        const totalValue = shares * company.price;
        const totalCost = shares * avgCost;
        const pnl = totalValue - totalCost;
        const pnlPercent = pnl / totalCost * 100;
        return {
            ...company,
            shares,
            avgCost: Number(avgCost.toFixed(2)),
            totalValue: Number(totalValue.toFixed(2)),
            totalCost: Number(totalCost.toFixed(2)),
            pnl: Number(pnl.toFixed(2)),
            pnlPercent: Number(pnlPercent.toFixed(2))
        };
    });
    const totalValue = holdings.reduce((sum, holding)=>sum + holding.totalValue, 0);
    const totalCost = holdings.reduce((sum, holding)=>sum + holding.totalCost, 0);
    const totalPnL = totalValue - totalCost;
    const totalPnLPercent = totalPnL / totalCost * 100;
    return {
        holdings,
        summary: {
            totalValue: Number(totalValue.toFixed(2)),
            totalCost: Number(totalCost.toFixed(2)),
            totalPnL: Number(totalPnL.toFixed(2)),
            totalPnLPercent: Number(totalPnLPercent.toFixed(2)),
            dayChange: Number((totalValue * (Math.random() - 0.5) * 0.02).toFixed(2)),
            dayChangePercent: Number(((Math.random() - 0.5) * 2).toFixed(2))
        }
    };
}
function createRealTimeDataStream(initialData, callback, interval = 5000) {
    const lastCandle = initialData[initialData.length - 1];
    let currentPrice = lastCandle.close;
    const generateNextCandle = ()=>{
        const now = Math.floor(Date.now() / 1000);
        const change = (Math.random() - 0.5) * 0.02 * currentPrice;
        const open = currentPrice;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 0.005 * currentPrice;
        const low = Math.min(open, close) - Math.random() * 0.005 * currentPrice;
        const volume = Math.floor(Math.random() * 50000) + 10000;
        const newCandle = {
            time: now,
            open: Number(open.toFixed(2)),
            high: Number(high.toFixed(2)),
            low: Number(low.toFixed(2)),
            close: Number(close.toFixed(2)),
            volume
        };
        currentPrice = close;
        callback(newCandle);
    };
    const intervalId = setInterval(generateNextCandle, interval);
    return ()=>clearInterval(intervalId);
}
}}),
"[project]/apps/web/app/api/portfolio/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/chartData.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'overview';
        const timeframe = searchParams.get('timeframe') || '1M';
        // Simulate network delay
        await new Promise((resolve)=>setTimeout(resolve, Math.random() * 300 + 100));
        if (type === 'overview') {
            const portfolioData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generatePortfolioData"])();
            // Generate portfolio performance history
            const performanceHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateOHLCData"])(30, portfolioData.summary.totalValue, 0.015).map((candle)=>({
                    time: candle.time,
                    value: candle.close,
                    change: candle.close - candle.open,
                    changePercent: (candle.close - candle.open) / candle.open * 100
                }));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ...portfolioData,
                performance: {
                    history: performanceHistory,
                    timeframe
                },
                diversification: {
                    bySector: calculateSectorDiversification(portfolioData.holdings),
                    byPosition: calculatePositionSizing(portfolioData.holdings)
                },
                riskMetrics: {
                    beta: Number((0.8 + Math.random() * 0.6).toFixed(2)),
                    sharpeRatio: Number((0.5 + Math.random() * 1.0).toFixed(2)),
                    volatility: Number((15 + Math.random() * 10).toFixed(2)),
                    maxDrawdown: Number((5 + Math.random() * 15).toFixed(2))
                }
            });
        }
        if (type === 'transactions') {
            const portfolioData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generatePortfolioData"])();
            const transactions = generateTransactionHistory(portfolioData.holdings);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                transactions,
                pagination: {
                    page: 1,
                    limit: 50,
                    total: transactions.length
                }
            });
        }
        if (type === 'analytics') {
            const portfolioData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generatePortfolioData"])();
            // Calculate portfolio analytics
            const analytics = {
                allocation: {
                    stocks: 85.5,
                    cash: 10.2,
                    other: 4.3
                },
                performance: {
                    ytd: Number((Math.random() * 30 - 10).toFixed(2)),
                    oneMonth: Number((Math.random() * 10 - 3).toFixed(2)),
                    threeMonths: Number((Math.random() * 20 - 5).toFixed(2)),
                    oneYear: Number((Math.random() * 40 - 15).toFixed(2))
                },
                topPerformers: portfolioData.holdings.sort((a, b)=>b.pnlPercent - a.pnlPercent).slice(0, 3),
                bottomPerformers: portfolioData.holdings.sort((a, b)=>a.pnlPercent - b.pnlPercent).slice(0, 3)
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(analytics);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid type parameter'
        }, {
            status: 400
        });
    } catch (error) {
        console.error('Portfolio API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch portfolio data'
        }, {
            status: 500
        });
    }
}
function calculateSectorDiversification(holdings) {
    const sectorTotals = {};
    const totalValue = holdings.reduce((sum, h)=>sum + h.totalValue, 0);
    holdings.forEach((holding)=>{
        if (!sectorTotals[holding.sector]) {
            sectorTotals[holding.sector] = 0;
        }
        sectorTotals[holding.sector] += holding.totalValue;
    });
    return Object.entries(sectorTotals).map(([sector, value])=>({
            sector,
            value: Number(value.toFixed(2)),
            percentage: Number((value / totalValue * 100).toFixed(1))
        }));
}
function calculatePositionSizing(holdings) {
    const totalValue = holdings.reduce((sum, h)=>sum + h.totalValue, 0);
    return holdings.map((holding)=>({
            symbol: holding.symbol,
            name: holding.name,
            value: holding.totalValue,
            percentage: Number((holding.totalValue / totalValue * 100).toFixed(1))
        }));
}
function generateTransactionHistory(holdings) {
    const transactions = [];
    const types = [
        'buy',
        'sell',
        'dividend'
    ];
    // Generate 20-50 random transactions
    const transactionCount = 20 + Math.floor(Math.random() * 30);
    for(let i = 0; i < transactionCount; i++){
        const holding = holdings[Math.floor(Math.random() * holdings.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const daysAgo = Math.floor(Math.random() * 90);
        const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        let transaction = {
            id: Math.random().toString(36).substr(2, 9),
            symbol: holding.symbol,
            name: holding.name,
            type,
            date: date.toISOString(),
            status: 'completed'
        };
        if (type === 'buy' || type === 'sell') {
            const quantity = Math.floor(Math.random() * 50) + 1;
            const price = holding.price * (0.9 + Math.random() * 0.2); // ±10%
            transaction = {
                ...transaction,
                quantity,
                price: Number(price.toFixed(2)),
                total: Number((quantity * price).toFixed(2)),
                fees: Number((quantity * price * 0.001).toFixed(2))
            };
        } else if (type === 'dividend') {
            transaction = {
                ...transaction,
                amount: Number((Math.random() * 100 + 10).toFixed(2)),
                quantity: holding.shares,
                dividendPerShare: Number((Math.random() * 2 + 0.5).toFixed(3))
            };
        }
        transactions.push(transaction);
    }
    return transactions.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__95eccfd7._.js.map