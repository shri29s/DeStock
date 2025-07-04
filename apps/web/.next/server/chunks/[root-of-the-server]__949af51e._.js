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
"[project]/apps/web/lib/constants/companies.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"companies\":{\"openai\":{\"id\":\"openai\",\"name\":\"OpenAI\",\"symbol\":\"OPENAI\",\"tokenName\":\"$OPENAI\",\"category\":\"AI & Tech\",\"description\":\"Advanced AI technology company focused on artificial general intelligence development and breakthrough language models\",\"price\":\"$0.42\",\"marketCap\":\"$420M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreibreh23xkjxjbwyoqisgofmngmhlinrhylhvebi4wirzktufxt4sy\",\"sector\":\"Technology\"},\"spacex\":{\"id\":\"spacex\",\"name\":\"SpaceX\",\"symbol\":\"SPACEX\",\"tokenName\":\"$SPACEX\",\"category\":\"Space & Tech\",\"description\":\"Revolutionary aerospace company advancing space exploration through reusable rocket technology and Mars colonization initiatives\",\"price\":\"$2.10\",\"marketCap\":\"$2.1B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreicapli5emzgdxfsoi3t7xt5quibudcmcj4upj4sjfpxl4ej2cosb4\",\"sector\":\"Aerospace\"},\"xai\":{\"id\":\"xai\",\"name\":\"xAI\",\"symbol\":\"XAI\",\"tokenName\":\"$XAI\",\"category\":\"AI & Tech\",\"description\":\"Next-generation artificial intelligence company developing advanced AI systems with focus on understanding and reasoning\",\"price\":\"$6.90\",\"marketCap\":\"$6.9B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreiadgn4c2a4zoiyzcf4qo7gs53ftp3xbeync7eqnbftyrxssxngzse\",\"sector\":\"Technology\"},\"binance\":{\"id\":\"binance\",\"name\":\"Binance\",\"symbol\":\"BINANCE\",\"tokenName\":\"$BINANCE\",\"category\":\"Exchange\",\"description\":\"Global cryptocurrency exchange platform providing secure digital asset trading and blockchain services\",\"price\":\"$1.00\",\"marketCap\":\"$1B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreicu7wdhrrg3ot62w2rehlbwx3caj3zmsxn44uyo7jyauk5pnv25l4\",\"sector\":\"Cryptocurrency\"},\"anthropic\":{\"id\":\"anthropic\",\"name\":\"Anthropic\",\"symbol\":\"ANTHROPIC\",\"tokenName\":\"$ANTHROPIC\",\"category\":\"AI Safety\",\"description\":\"AI safety company developing constitutional AI systems focused on helpful, harmless, and honest artificial intelligence\",\"price\":\"$3.14\",\"marketCap\":\"$314M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreihsncf43taoeeh2mp5qys67snlzc7wvz2asmjk3gwavjuqfe27maq\",\"sector\":\"Technology\"},\"discord\":{\"id\":\"discord\",\"name\":\"Discord\",\"symbol\":\"DISCORD\",\"tokenName\":\"$DISCORD\",\"category\":\"Social\",\"description\":\"Digital communication platform connecting communities through voice, video, and text channels for gaming and social interaction\",\"price\":\"$0.69\",\"marketCap\":\"$69M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreidmdbopq7eutsk37glpyet37mxu5q3vam3kgsnnbwrs7vdhqw6z3a\",\"sector\":\"Technology\"},\"notion\":{\"id\":\"notion\",\"name\":\"Notion\",\"symbol\":\"NOTION\",\"tokenName\":\"$NOTION\",\"category\":\"Productivity\",\"description\":\"All-in-one workspace platform combining notes, databases, kanban boards, and collaboration tools for enhanced productivity\",\"price\":\"$0.99\",\"marketCap\":\"$99M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreid7mvribtdbz4hrmashf2nadixfcdel3cpyg5gjdwet7i57ratmcq\",\"sector\":\"Software\"},\"canva\":{\"id\":\"canva\",\"name\":\"Canva\",\"symbol\":\"CANVA\",\"tokenName\":\"$CANVA\",\"category\":\"Design\",\"description\":\"User-friendly graphic design platform empowering creators with intuitive design tools and professional templates\",\"price\":\"$0.50\",\"marketCap\":\"$50M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreidf25d7322c5vxwoutxgs2oxqwxphgufq2sfovorqxlitk4xsfjea\",\"sector\":\"Software\"},\"epic-games\":{\"id\":\"epic-games\",\"name\":\"Epic Games\",\"symbol\":\"EPIC\",\"tokenName\":\"$EPIC\",\"category\":\"Gaming\",\"description\":\"Gaming technology company behind Unreal Engine and popular game titles, pioneering immersive digital experiences\",\"price\":\"$1.99\",\"marketCap\":\"$199M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreibydvksrtnl6ydvxbwg44qzonjq7o2sywfjsnxrlcomntltuhwora\",\"sector\":\"Gaming\"},\"riot-games\":{\"id\":\"riot-games\",\"name\":\"Riot Games\",\"symbol\":\"RIOT\",\"tokenName\":\"$RIOT\",\"category\":\"Gaming\",\"description\":\"Premier gaming company developing competitive multiplayer games and esports entertainment platforms\",\"price\":\"$0.75\",\"marketCap\":\"$75M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreidvnplrxwo26mahfceq552bvt3b6qoaewj26l7axbuwkm7c7mxfli\",\"sector\":\"Gaming\"},\"gta6\":{\"id\":\"gta6\",\"name\":\"GTA 6\",\"symbol\":\"GTA6\",\"tokenName\":\"$GTA6\",\"category\":\"Gaming\",\"description\":\"Highly anticipated open-world action-adventure game featuring advanced graphics and immersive gameplay mechanics\",\"price\":\"$6.00\",\"marketCap\":\"$600M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreievey4vjy5ra3hpkfvmliztt5p525tgualok4crmuwufhggerqlnq\",\"sector\":\"Gaming\"},\"github\":{\"id\":\"github\",\"name\":\"GitHub\",\"symbol\":\"GITHUB\",\"tokenName\":\"$GITHUB\",\"category\":\"Development\",\"description\":\"Leading software development platform providing version control, collaboration tools, and code hosting services\",\"price\":\"$0.01\",\"marketCap\":\"$10M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreicxmxxjwiego7silgwexno4pdtppdreg6epw4xz3swv6nzaoihohq\",\"sector\":\"Technology\"},\"zerodha\":{\"id\":\"zerodha\",\"name\":\"Zerodha\",\"symbol\":\"ZERODHA\",\"tokenName\":\"$ZERODHA\",\"category\":\"Trading\",\"description\":\"Leading discount brokerage platform providing innovative trading solutions and financial technology services\",\"price\":\"$0.15\",\"marketCap\":\"$15M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreigsspir6vxg4kmtbqsp2sft2ipn7a6jjwm6ia2rlgqah76vgp2ihy\",\"sector\":\"Finance\"},\"lenskart\":{\"id\":\"lenskart\",\"name\":\"Lenskart\",\"symbol\":\"LENSKART\",\"tokenName\":\"$LENSKART\",\"category\":\"Retail\",\"description\":\"Innovative eyewear company offering comprehensive vision solutions through technology-driven retail experiences\",\"price\":\"$0.20\",\"marketCap\":\"$20M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreiffywakfuv33upm6wkqb2elsn6kfe3ic2swva2roqcs2tv364z7fa\",\"sector\":\"Retail\"},\"polygon-labs\":{\"id\":\"polygon-labs\",\"name\":\"Polygon Labs\",\"symbol\":\"POLYGON\",\"tokenName\":\"$POLYGON\",\"category\":\"Blockchain\",\"description\":\"Leading blockchain scaling solutions provider offering Ethereum-compatible networks with enhanced speed and efficiency\",\"price\":\"$0.05\",\"marketCap\":\"$50M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreiaptmunixgv7rb73iqpeo4muab55ocolispq45x3qow7sztp64t7u\",\"sector\":\"Blockchain\"},\"j3dai\":{\"id\":\"j3dai\",\"name\":\"J3dai\",\"symbol\":\"J3DAI\",\"tokenName\":\"$J3DAI\",\"category\":\"Web3\",\"description\":\"Innovative Web3 collective developing blockchain solutions and decentralized applications for the future of digital interaction\",\"price\":\"$1.38\",\"marketCap\":\"$138M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreicfu4xdn6nhnb76bmfzcie7az3onw63cguh4eyiywmc25xnrzr6su\",\"sector\":\"Web3\"},\"amberdata\":{\"id\":\"amberdata\",\"name\":\"Amberdata\",\"symbol\":\"AMBER\",\"tokenName\":\"$AMBER\",\"category\":\"Analytics\",\"description\":\"Comprehensive blockchain analytics platform providing real-time data insights and market intelligence for digital assets\",\"price\":\"$2.00\",\"marketCap\":\"$200M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreigkfjwbwc2443mksqewc2fqtflp6f6k7k636lons5ldrudh7p23pi\",\"sector\":\"Analytics\"},\"jane-street-capital\":{\"id\":\"jane-street-capital\",\"name\":\"Jane Street Capital\",\"symbol\":\"JANE\",\"tokenName\":\"$JANE\",\"category\":\"Finance\",\"description\":\"Elite quantitative trading firm specializing in high-frequency trading and sophisticated financial market strategies\",\"price\":\"$100.00\",\"marketCap\":\"$10B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreihxf7v5iupgg6c64p3gm6poiaz2oedcsstuup5ts5m5e4crg3nzu4\",\"sector\":\"Finance\"},\"renaissance-technologies\":{\"id\":\"renaissance-technologies\",\"name\":\"Renaissance Technologies\",\"symbol\":\"RENAISSANCE\",\"tokenName\":\"$RENAISSANCE\",\"category\":\"Quant\",\"description\":\"Premier quantitative investment management firm utilizing sophisticated mathematical models and algorithmic trading strategies\",\"price\":\"$500.00\",\"marketCap\":\"$50B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreigxcgpgjblv22iphbxr246m5hsbk6z5nllnmdgqpfde3genacejz4\",\"sector\":\"Finance\"},\"tower-research-capital\":{\"id\":\"tower-research-capital\",\"name\":\"Tower Research Capital\",\"symbol\":\"TOWER\",\"tokenName\":\"$TOWER\",\"category\":\"HFT\",\"description\":\"Advanced high-frequency trading firm specializing in ultra-low latency electronic trading across global markets\",\"price\":\"$250.00\",\"marketCap\":\"$25B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreiap7s5ywdc2yzouxq3fil3xyqbpuquusavgoc23qyy75rr7dhazrq\",\"sector\":\"Finance\"},\"two-sigma\":{\"id\":\"two-sigma\",\"name\":\"Two Sigma\",\"symbol\":\"TWOSIGMA\",\"tokenName\":\"$TWOSIGMA\",\"category\":\"Quant\",\"description\":\"Technology-driven investment management firm applying data science and systematic approaches to financial markets\",\"price\":\"$200.00\",\"marketCap\":\"$20B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreiam3so4cp3fs4lkublmnrz3r6wctil3tqyt3otavbd4zwynhgg7x4\",\"sector\":\"Finance\"},\"de-shaw-and-co\":{\"id\":\"de-shaw-and-co\",\"name\":\"DE Shaw & Co\",\"symbol\":\"DESHAW\",\"tokenName\":\"$DESHAW\",\"category\":\"Quant\",\"description\":\"Multinational investment management firm utilizing computational finance and systematic trading methodologies\",\"price\":\"$300.00\",\"marketCap\":\"$30B\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreifhrtmp7te7ftrxdnflub5ia7dgsva6awwy2yay7s47vhama3gfxa\",\"sector\":\"Finance\"},\"iiit-sricity\":{\"id\":\"iiit-sricity\",\"name\":\"IIIT Sricity\",\"symbol\":\"IIITS\",\"tokenName\":\"$IIITS\",\"category\":\"Education\",\"description\":\"Leading technology institute focused on innovative research and education in computer science and information technology\",\"price\":\"$0.25\",\"marketCap\":\"$25M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreibydi5ds4ejlwfu5fyriqoruicxkqq2fb6nw6rbh7v66xf4vnj2ca\",\"sector\":\"Education\"},\"iit-delhi\":{\"id\":\"iit-delhi\",\"name\":\"IIT Delhi\",\"symbol\":\"IITD\",\"tokenName\":\"$IITD\",\"category\":\"Education\",\"description\":\"Premier engineering and technology institute renowned for excellence in research, innovation, and technical education\",\"price\":\"$0.30\",\"marketCap\":\"$30M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreicdlrmewqe5jewwlua6idqsvvgfmyt5cn5u7z67svelqay42qduga\",\"sector\":\"Education\"},\"nitt\":{\"id\":\"nitt\",\"name\":\"NIT Trichy\",\"symbol\":\"NITT\",\"tokenName\":\"$NITT\",\"category\":\"Education\",\"description\":\"National Institute of Technology providing world-class engineering education and cutting-edge research opportunities\",\"price\":\"$0.35\",\"marketCap\":\"$35M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreiblvz7qjcasnbm6eot67y2zlvpxoqqcmqcyvikigrpcj2jj6kyxti\",\"sector\":\"Education\"},\"yolo-capital\":{\"id\":\"yolo-capital\",\"name\":\"YOLO Capital Group\",\"symbol\":\"YOLO\",\"tokenName\":\"$YOLO\",\"category\":\"VC\",\"description\":\"Dynamic venture capital firm investing in disruptive technologies and innovative startups across emerging markets\",\"price\":\"$4.20\",\"marketCap\":\"$420M\",\"logo\":\"https://gateway.lighthouse.storage/ipfs/bafkreied2jlu7m27pisrvhrdukgnoyrgmiycqvgwsdflhzmapmsvmqzlta\",\"sector\":\"VC\"}},\"sectors\":[\"Technology\",\"Aerospace\",\"Cryptocurrency\",\"Software\",\"Gaming\",\"Finance\",\"Retail\",\"Blockchain\",\"Web3\",\"Analytics\",\"Education\",\"VC\"],\"categories\":[\"AI & Tech\",\"Space & Tech\",\"Exchange\",\"AI Safety\",\"Social\",\"Productivity\",\"Design\",\"Gaming\",\"Development\",\"Trading\",\"Retail\",\"Blockchain\",\"Web3\",\"Analytics\",\"Finance\",\"Quant\",\"HFT\",\"Education\",\"VC\"]}"));}}),
"[project]/apps/web/lib/constants/logos.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"amberdata\":\"https://gateway.lighthouse.storage/ipfs/bafkreigkfjwbwc2443mksqewc2fqtflp6f6k7k636lons5ldrudh7p23pi\",\"anthropic\":\"https://gateway.lighthouse.storage/ipfs/bafkreihsncf43taoeeh2mp5qys67snlzc7wvz2asmjk3gwavjuqfe27maq\",\"binance\":\"https://gateway.lighthouse.storage/ipfs/bafkreicu7wdhrrg3ot62w2rehlbwx3caj3zmsxn44uyo7jyauk5pnv25l4\",\"canva\":\"https://gateway.lighthouse.storage/ipfs/bafkreidf25d7322c5vxwoutxgs2oxqwxphgufq2sfovorqxlitk4xsfjea\",\"de-shaw-and-co\":\"https://gateway.lighthouse.storage/ipfs/bafkreifhrtmp7te7ftrxdnflub5ia7dgsva6awwy2yay7s47vhama3gfxa\",\"discord\":\"https://gateway.lighthouse.storage/ipfs/bafkreidmdbopq7eutsk37glpyet37mxu5q3vam3kgsnnbwrs7vdhqw6z3a\",\"epic-games\":\"https://gateway.lighthouse.storage/ipfs/bafkreibydvksrtnl6ydvxbwg44qzonjq7o2sywfjsnxrlcomntltuhwora\",\"github\":\"https://gateway.lighthouse.storage/ipfs/bafkreicxmxxjwiego7silgwexno4pdtppdreg6epw4xz3swv6nzaoihohq\",\"gta6\":\"https://gateway.lighthouse.storage/ipfs/bafkreievey4vjy5ra3hpkfvmliztt5p525tgualok4crmuwufhggerqlnq\",\"iiit-sricity\":\"https://gateway.lighthouse.storage/ipfs/bafkreibydi5ds4ejlwfu5fyriqoruicxkqq2fb6nw6rbh7v66xf4vnj2ca\",\"iit-delhi\":\"https://gateway.lighthouse.storage/ipfs/bafkreicdlrmewqe5jewwlua6idqsvvgfmyt5cn5u7z67svelqay42qduga\",\"j3dai\":\"https://gateway.lighthouse.storage/ipfs/bafkreicfu4xdn6nhnb76bmfzcie7az3onw63cguh4eyiywmc25xnrzr6su\",\"jane-street-capital\":\"https://gateway.lighthouse.storage/ipfs/bafkreihxf7v5iupgg6c64p3gm6poiaz2oedcsstuup5ts5m5e4crg3nzu4\",\"lenskart\":\"https://gateway.lighthouse.storage/ipfs/bafkreiffywakfuv33upm6wkqb2elsn6kfe3ic2swva2roqcs2tv364z7fa\",\"nitt\":\"https://gateway.lighthouse.storage/ipfs/bafkreiblvz7qjcasnbm6eot67y2zlvpxoqqcmqcyvikigrpcj2jj6kyxti\",\"notion\":\"https://gateway.lighthouse.storage/ipfs/bafkreid7mvribtdbz4hrmashf2nadixfcdel3cpyg5gjdwet7i57ratmcq\",\"openai\":\"https://gateway.lighthouse.storage/ipfs/bafkreibreh23xkjxjbwyoqisgofmngmhlinrhylhvebi4wirzktufxt4sy\",\"polygon-labs\":\"https://gateway.lighthouse.storage/ipfs/bafkreiaptmunixgv7rb73iqpeo4muab55ocolispq45x3qow7sztp64t7u\",\"renaissance-technologies\":\"https://gateway.lighthouse.storage/ipfs/bafkreigxcgpgjblv22iphbxr246m5hsbk6z5nllnmdgqpfde3genacejz4\",\"riot-games\":\"https://gateway.lighthouse.storage/ipfs/bafkreidvnplrxwo26mahfceq552bvt3b6qoaewj26l7axbuwkm7c7mxfli\",\"spacex\":\"https://gateway.lighthouse.storage/ipfs/bafkreicapli5emzgdxfsoi3t7xt5quibudcmcj4upj4sjfpxl4ej2cosb4\",\"tower-research-capital\":\"https://gateway.lighthouse.storage/ipfs/bafkreiap7s5ywdc2yzouxq3fil3xyqbpuquusavgoc23qyy75rr7dhazrq\",\"two-sigma\":\"https://gateway.lighthouse.storage/ipfs/bafkreiam3so4cp3fs4lkublmnrz3r6wctil3tqyt3otavbd4zwynhgg7x4\",\"xai\":\"https://gateway.lighthouse.storage/ipfs/bafkreiadgn4c2a4zoiyzcf4qo7gs53ftp3xbeync7eqnbftyrxssxngzse\",\"yolo-capital\":\"https://gateway.lighthouse.storage/ipfs/bafkreied2jlu7m27pisrvhrdukgnoyrgmiycqvgwsdflhzmapmsvmqzlta\",\"zerodha\":\"https://gateway.lighthouse.storage/ipfs/bafkreigsspir6vxg4kmtbqsp2sft2ipn7a6jjwm6ia2rlgqah76vgp2ihy\"}"));}}),
"[project]/apps/web/lib/utils/companyUtils.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "filterAndSortCompanies": (()=>filterAndSortCompanies),
    "formatMarketCap": (()=>formatMarketCap),
    "formatPrice": (()=>formatPrice),
    "getAllCategories": (()=>getAllCategories),
    "getAllCompanies": (()=>getAllCompanies),
    "getAllSectors": (()=>getAllSectors),
    "getCompaniesByCategory": (()=>getCompaniesByCategory),
    "getCompaniesBySector": (()=>getCompaniesBySector),
    "getCompanyById": (()=>getCompanyById),
    "getCompanyLogo": (()=>getCompanyLogo),
    "getCompanyStats": (()=>getCompanyStats),
    "getRandomCompanies": (()=>getRandomCompanies),
    "getTopCompaniesByMarketCap": (()=>getTopCompaniesByMarketCap),
    "getTrendingCompanies": (()=>getTrendingCompanies),
    "searchCompanies": (()=>searchCompanies)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$companies$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/lib/constants/companies.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$logos$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/apps/web/lib/constants/logos.json (json)");
;
;
const getAllCompanies = ()=>{
    const companies = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$companies$2e$json__$28$json$29$__["default"].companies;
    return Object.values(companies);
};
const getCompanyById = (id)=>{
    const companies = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$companies$2e$json__$28$json$29$__["default"].companies;
    return companies[id];
};
const getCompanyLogo = (companyId)=>{
    const logos = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$logos$2e$json__$28$json$29$__["default"];
    return logos[companyId];
};
const getCompaniesBySector = (sector)=>{
    return getAllCompanies().filter((company)=>company.sector === sector);
};
const getCompaniesByCategory = (category)=>{
    return getAllCompanies().filter((company)=>company.category === category);
};
const searchCompanies = (searchTerm)=>{
    const term = searchTerm.toLowerCase();
    return getAllCompanies().filter((company)=>company.name.toLowerCase().includes(term) || company.symbol.toLowerCase().includes(term) || company.tokenName.toLowerCase().includes(term) || company.description.toLowerCase().includes(term) || company.category.toLowerCase().includes(term) || company.sector.toLowerCase().includes(term));
};
const filterAndSortCompanies = (options)=>{
    let companies = getAllCompanies();
    // Apply search filter
    if (options.searchTerm) {
        companies = searchCompanies(options.searchTerm);
    }
    // Apply sector filter
    if (options.selectedSector) {
        companies = companies.filter((company)=>company.sector === options.selectedSector);
    }
    // Apply category filter
    if (options.selectedCategory) {
        companies = companies.filter((company)=>company.category === options.selectedCategory);
    }
    // Apply sorting
    if (options.sortField && options.sortDirection) {
        companies.sort((a, b)=>{
            let aValue, bValue;
            switch(options.sortField){
                case 'name':
                    aValue = a.name;
                    bValue = b.name;
                    break;
                case 'price':
                    // Extract numeric value from price string (e.g., "$1.00" -> 1.00)
                    aValue = parseFloat(a.price.replace('$', ''));
                    bValue = parseFloat(b.price.replace('$', ''));
                    break;
                case 'marketCap':
                    // Extract numeric value from market cap string (e.g., "$1B" -> 1000000000)
                    aValue = parseMarketCap(a.marketCap);
                    bValue = parseMarketCap(b.marketCap);
                    break;
                default:
                    return 0;
            }
            if (typeof aValue === 'string') {
                return options.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return options.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }
    return companies;
};
// Parse market cap string to number for sorting
const parseMarketCap = (marketCap)=>{
    const value = parseFloat(marketCap.replace(/[$,]/g, ''));
    if (marketCap.includes('B')) {
        return value * 1e9;
    } else if (marketCap.includes('M')) {
        return value * 1e6;
    } else if (marketCap.includes('K')) {
        return value * 1e3;
    }
    return value;
};
const getAllSectors = ()=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$companies$2e$json__$28$json$29$__["default"].sectors;
};
const getAllCategories = ()=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$companies$2e$json__$28$json$29$__["default"].categories;
};
const getRandomCompanies = (count)=>{
    const companies = getAllCompanies();
    const shuffled = [
        ...companies
    ].sort(()=>0.5 - Math.random());
    return shuffled.slice(0, count);
};
const getTrendingCompanies = ()=>{
    return getAllCompanies().filter((company)=>{
        const marketCapValue = parseFloat(company.marketCap.replace(/[$BM]/g, ''));
        const marketCapInNumber = company.marketCap.includes('B') ? marketCapValue * 1000 : marketCapValue;
        return marketCapInNumber > 500; // Companies with market cap over 500M
    }).sort((a, b)=>{
        const aValue = parseFloat(a.marketCap.replace(/[$BM]/g, '')) * (a.marketCap.includes('B') ? 1000 : 1);
        const bValue = parseFloat(b.marketCap.replace(/[$BM]/g, '')) * (b.marketCap.includes('B') ? 1000 : 1);
        return bValue - aValue;
    });
};
const getTopCompaniesByMarketCap = (count = 10)=>{
    return getAllCompanies().sort((a, b)=>parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap)).slice(0, count);
};
const formatMarketCap = (marketCapString)=>{
    const value = parseMarketCap(marketCapString);
    if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
};
const formatPrice = (priceString)=>{
    const value = parseFloat(priceString.replace('$', ''));
    return `$${value.toFixed(2)}`;
};
const getCompanyStats = ()=>{
    const companies = getAllCompanies();
    const totalMarketCap = companies.reduce((sum, company)=>sum + parseMarketCap(company.marketCap), 0);
    return {
        totalCompanies: companies.length,
        totalMarketCap: formatMarketCap(`$${totalMarketCap}`),
        sectors: getAllSectors().length,
        categories: getAllCategories().length,
        averagePrice: companies.reduce((sum, company)=>sum + parseFloat(company.price.replace('$', '')), 0) / companies.length
    };
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/companyUtils.ts [app-route] (ecmascript)");
;
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
            // Use meme token data instead of generated data
            const memeCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllCompanies"])();
            const companies = memeCompanies.map((company, index)=>({
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                companies
            });
        }
        if (type === 'ticker') {
            // Use real token data for ticker
            const memeCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllCompanies"])();
            const tickerData = memeCompanies.slice(0, 10).map((company)=>({
                    symbol: company.symbol,
                    name: company.name,
                    price: parseFloat(company.price.replace('$', '')),
                    change: (Math.random() - 0.5) * 10,
                    changePercent: (Math.random() - 0.5) * 15,
                    volume: Math.floor(Math.random() * 1000000)
                }));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ticker: tickerData
            });
        }
        if (type === 'heatmap') {
            // Use real token data for heatmap
            const memeCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllCompanies"])();
            const heatmap = memeCompanies.slice(0, 12).map((company, index)=>{
                const marketCapValue = parseFloat(company.marketCap.replace(/[$BM]/g, ''));
                const marketCapInNumber = company.marketCap.includes('B') ? marketCapValue * 1000000000 : marketCapValue * 1000000;
                return {
                    id: company.id,
                    name: company.name,
                    symbol: company.symbol,
                    value: parseFloat(company.price.replace('$', '')),
                    change: (Math.random() - 0.5) * 20,
                    size: Math.min(Math.max(marketCapInNumber / 1000000000 * 50 + 40, 40), 120)
                };
            });
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
        // Default market overview - use real token data
        const memeCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllCompanies"])();
        const companies = memeCompanies.slice(0, 15).map((company, index)=>({
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

//# sourceMappingURL=%5Broot-of-the-server%5D__949af51e._.js.map