module.exports = {

"[project]/apps/web/.next-internal/server/app/api/market/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/apps/web/app/api/market/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/chartData.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const symbol = searchParams.get('symbol');
        const timeframe = searchParams.get('timeframe') || '1D';
        const days = parseInt(searchParams.get('days') || '30');
        const type = searchParams.get('type') || 'overview';
        // Simulate network delay for realism
        await new Promise((resolve)=>setTimeout(resolve, Math.random() * 500 + 200));
        if (type === 'companies') {
            const companies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCompanyData"])(20);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                companies
            });
        }
        if (type === 'ticker') {
            // Generate ticker data for multiple companies
            const companies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCompanyData"])(10);
            const tickerData = companies.map((company)=>({
                    symbol: company.symbol,
                    name: company.name,
                    price: company.price,
                    change: company.change,
                    changePercent: company.changePercent,
                    volume: company.volume
                }));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ticker: tickerData
            });
        }
        if (type === 'heatmap') {
            // Generate heatmap data
            const companies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCompanyData"])(12);
            const heatmap = companies.map((company, index)=>({
                    id: index.toString(),
                    name: company.name,
                    symbol: company.symbol,
                    value: company.price,
                    change: company.changePercent,
                    size: Math.min(Math.max(company.marketCap / 1000000000 * 50 + 40, 40), 120) // Scale market cap to size
                }));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                heatmap
            });
        }
        if (symbol && type === 'chart') {
            // Generate chart data for specific symbol
            const basePrice = 100 + Math.random() * 100;
            const ohlcData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateOHLCData"])(days, basePrice, 0.025);
            const volumeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateVolumeData"])(ohlcData);
            const sma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateSMA"])(ohlcData, 20);
            const ema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateEMA"])(ohlcData, 20);
            const rsi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRSI"])(ohlcData, 14);
            // Calculate MACD (simplified)
            const emaFast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateEMA"])(ohlcData, 12);
            const emaSlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateEMA"])(ohlcData, 26);
            const macd = emaFast.map((fast, index)=>{
                const slow = emaSlow.find((s)=>s.time === fast.time);
                if (!slow) return null;
                const macdValue = fast.value - slow.value;
                return {
                    time: fast.time,
                    macd: Number(macdValue.toFixed(4)),
                    signal: 0,
                    histogram: Number(macdValue.toFixed(4))
                };
            }).filter(Boolean);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                symbol,
                timeframe,
                data: {
                    ohlc: ohlcData,
                    volume: volumeData,
                    indicators: {
                        sma,
                        ema,
                        rsi,
                        macd
                    }
                }
            });
        }
        // Default market overview
        const companies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$chartData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCompanyData"])(15);
        const marketStats = {
            totalMarketCap: companies.reduce((sum, c)=>sum + c.marketCap, 0),
            totalVolume: companies.reduce((sum, c)=>sum + c.volume, 0),
            gainers: companies.filter((c)=>c.change > 0).length,
            losers: companies.filter((c)=>c.change < 0).length,
            unchanged: companies.filter((c)=>c.change === 0).length
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            companies,
            stats: marketStats,
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('Market API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch market data'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { action, symbol, quantity, price } = body;
        // Simulate trade execution
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        if (action === 'buy' || action === 'sell') {
            const executionPrice = price * (1 + (Math.random() - 0.5) * 0.001); // Small slippage
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                transaction: {
                    id: Math.random().toString(36).substr(2, 9),
                    symbol,
                    action,
                    quantity,
                    requestedPrice: price,
                    executedPrice: Number(executionPrice.toFixed(2)),
                    timestamp: Date.now(),
                    status: 'executed'
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid action'
        }, {
            status: 400
        });
    } catch (error) {
        console.error('Market API POST error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to process request'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__437d4ed8._.js.map