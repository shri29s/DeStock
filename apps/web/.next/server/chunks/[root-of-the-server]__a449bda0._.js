module.exports = {

"[project]/apps/web/.next-internal/server/app/api/faucet/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[project]/apps/web/lib/constants/shared.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Shared constants for DeStock trading platform
 * Centralizes configuration values used across multiple components
 */ // Chain configuration
__turbopack_context__.s({
    "ALLOWED_CHAIN_IDS": (()=>ALLOWED_CHAIN_IDS),
    "API_ENDPOINTS": (()=>API_ENDPOINTS),
    "BACKEND_CONFIG": (()=>BACKEND_CONFIG),
    "CHAIN_CONFIG": (()=>CHAIN_CONFIG),
    "DEFAULT_CHAIN_ID": (()=>DEFAULT_CHAIN_ID),
    "DESTOCK_CONTRACT_ADDRESS": (()=>DESTOCK_CONTRACT_ADDRESS),
    "DSTK_TOKEN_ADDRESS": (()=>DSTK_TOKEN_ADDRESS),
    "FAUCET_CONFIG": (()=>FAUCET_CONFIG),
    "RATE_LIMITING": (()=>RATE_LIMITING),
    "WS_CONFIG": (()=>WS_CONFIG),
    "WS_URLS": (()=>WS_URLS),
    "getWebSocketUrl": (()=>getWebSocketUrl),
    "isValidChain": (()=>isValidChain),
    "validateEnvironment": (()=>validateEnvironment)
});
const ALLOWED_CHAIN_IDS = [
    31337,
    11155111
]; // Local Anvil and Sepolia testnet
const DEFAULT_CHAIN_ID = 31337;
const DSTK_TOKEN_ADDRESS = ("TURBOPACK compile-time value", "0x5FbDB2315678afecb367f032d93F642f64180aa3") || '';
const DESTOCK_CONTRACT_ADDRESS = ("TURBOPACK compile-time value", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512") || '';
const WS_URLS = {
    development: 'ws://localhost:8080',
    staging: process.env.NEXT_PUBLIC_WS_STAGING_URL || 'ws://localhost:8080',
    production: ("TURBOPACK compile-time value", "ws://localhost:8080") || ''
};
const API_ENDPOINTS = {
    faucet: '/api/faucet',
    market: '/api/market',
    portfolio: '/api/portfolio',
    tradeEngine: ("TURBOPACK compile-time value", "http://localhost:3002") || 'http://localhost:3002',
    backend: ("TURBOPACK compile-time value", "http://localhost:3001") || 'http://localhost:3001'
};
const FAUCET_CONFIG = {
    amount: '1000',
    rateLimitWindow: 24 * 60 * 60 * 1000,
    allowedChains: ALLOWED_CHAIN_IDS
};
const RATE_LIMITING = {
    faucet: {
        maxRequests: 5,
        windowMs: 15 * 60 * 1000
    },
    market: {
        maxRequests: 100,
        windowMs: 60 * 1000
    },
    trading: {
        maxRequests: 50,
        windowMs: 60 * 1000
    },
    portfolio: {
        maxRequests: 200,
        windowMs: 60 * 1000
    }
};
const BACKEND_CONFIG = {
    requestTimeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000
};
const WS_CONFIG = {
    reconnectAttempts: 5,
    reconnectDelay: 1000,
    maxReconnectDelay: 30000,
    connectionTimeout: 10000
};
function isValidChain(chainId) {
    return ALLOWED_CHAIN_IDS.includes(chainId);
}
function validateEnvironment() {
    const requiredVars = [
        'NEXT_PUBLIC_DSTK_TOKEN_ADDRESS',
        'NEXT_PUBLIC_DESTOCK_CONTRACT_ADDRESS',
        'PRIVATE_KEY',
        'NEXT_PUBLIC_WS_URL'
    ];
    const missingVars = requiredVars.filter((varName)=>{
        const value = process.env[varName];
        return !value || value.trim() === '';
    });
    return {
        isValid: missingVars.length === 0,
        missingVars,
        BACKEND_URL: API_ENDPOINTS.backend,
        WS_URL: getWebSocketUrl(),
        CHAIN_ID: DEFAULT_CHAIN_ID
    };
}
function getWebSocketUrl() {
    const env = ("TURBOPACK compile-time value", "development") || 'development';
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        return WS_URLS.development;
    }
}
const CHAIN_CONFIG = {
    [31337]: {
        id: 31337,
        name: 'Anvil Local',
        rpcUrl: 'http://127.0.0.1:8545',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        }
    },
    [11155111]: {
        id: 11155111,
        name: 'Sepolia Testnet',
        rpcUrl: 'https://sepolia.infura.io/v3/',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        }
    }
};
}}),
"[project]/apps/web/app/api/faucet/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createPublicClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/createWalletClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/accounts/privateKeyToAccount.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/sepolia.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/constants/shared.ts [app-route] (ecmascript)");
;
;
;
;
;
// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map();
async function POST(request) {
    try {
        const { address, chainId } = await request.json();
        console.log('Faucet request:', {
            address,
            chainId
        });
        // Validate inputs
        if (!address || !chainId) {
            console.error('Missing required fields:', {
                address: !!address,
                chainId: !!chainId
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Address and chainId are required',
                message: 'Missing required request parameters'
            }, {
                status: 400
            });
        }
        // Validate address format
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            console.error('Invalid address format:', address);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid address format',
                message: 'Please provide a valid Ethereum address'
            }, {
                status: 400
            });
        }
        // Validate environment configuration
        const envCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateEnvironment"])();
        if (!envCheck.isValid) {
            console.error('Environment validation failed:', envCheck.missingVars);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Faucet configuration error',
                message: `Missing environment variables: ${envCheck.missingVars.join(', ')}. Please contact support.`
            }, {
                status: 500
            });
        }
        // Only allow testnet faucet requests  
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidChain"])(chainId)) {
            console.error('Invalid chain ID for faucet:', chainId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Unsupported network',
                message: 'Faucet only available on supported testnet networks (Localhost: 31337, Sepolia: 11155111)'
            }, {
                status: 400
            });
        }
        // Check rate limiting
        const now = Date.now();
        const lastRequest = rateLimitMap.get(address.toLowerCase());
        if (lastRequest && now - lastRequest < __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FAUCET_CONFIG"].rateLimitWindow) {
            const remainingTime = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FAUCET_CONFIG"].rateLimitWindow - (now - lastRequest);
            const hoursLeft = Math.ceil(remainingTime / (60 * 60 * 1000));
            console.log('Rate limit hit for address:', address, 'hours left:', hoursLeft);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Rate limit exceeded',
                message: `Please wait ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''} before requesting again`,
                remainingTime
            }, {
                status: 429
            });
        }
        // Get environment variables with better error handling
        const privateKey = process.env.PRIVATE_KEY || process.env.FAUCET_PRIVATE_KEY;
        const tokenAddress = ("TURBOPACK compile-time value", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
        if (!privateKey) {
            console.error('Missing private key environment variable');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Faucet wallet not configured',
                message: 'Faucet service is temporarily unavailable. Please try again later.'
            }, {
                status: 500
            });
        }
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Set up RPC URL
        const rpcUrl = chainId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sepolia"].id ? process.env.SEPOLIA_RPC_URL : process.env.LOCAL_RPC_URL || 'http://127.0.0.1:8545';
        if (!rpcUrl) {
            console.error('Missing RPC URL for chain:', chainId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'RPC configuration error',
                message: 'Network RPC not configured. Please contact support.'
            }, {
                status: 500
            });
        }
        // Set up clients with explicit chain configuration
        const chain = chainId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sepolia"].id ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$sepolia$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sepolia"] : {
            id: 31337,
            name: 'Localhost',
            network: 'localhost',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: {
                default: {
                    http: [
                        'http://127.0.0.1:8545'
                    ]
                },
                public: {
                    http: [
                        'http://127.0.0.1:8545'
                    ]
                }
            }
        };
        // Validate private key format
        const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
        if (!/^0x[a-fA-F0-9]{64}$/.test(formattedPrivateKey)) {
            console.error('Invalid private key format');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid faucet wallet configuration',
                message: 'Faucet wallet configuration error. Please contact support.'
            }, {
                status: 500
            });
        }
        const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$privateKeyToAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["privateKeyToAccount"])(formattedPrivateKey);
        const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPublicClient"])({
            chain,
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["http"])(rpcUrl)
        });
        const walletClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWalletClient"])({
            account,
            chain,
            transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["http"])(rpcUrl)
        });
        console.log('Attempting to mint tokens:', {
            to: address,
            amount: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FAUCET_CONFIG"].amount,
            tokenAddress,
            chainId
        });
        // Parse the faucet amount
        const faucetAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseEther"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FAUCET_CONFIG"].amount);
        // Mint tokens to the user (this assumes the faucet wallet has mint permissions)
        const hash = await walletClient.writeContract({
            address: tokenAddress,
            abi: [
                {
                    inputs: [
                        {
                            name: 'to',
                            type: 'address'
                        },
                        {
                            name: 'amount',
                            type: 'uint256'
                        }
                    ],
                    name: 'mint',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function'
                }
            ],
            functionName: 'mint',
            args: [
                address,
                faucetAmount
            ]
        });
        console.log('Transaction submitted:', hash);
        // Wait for transaction confirmation
        const receipt = await publicClient.waitForTransactionReceipt({
            hash,
            confirmations: 1,
            timeout: 30000
        });
        console.log('Transaction receipt:', {
            status: receipt.status,
            hash
        });
        if (receipt.status === 'success') {
            // Update rate limiting
            rateLimitMap.set(address.toLowerCase(), now);
            console.log('Faucet success for address:', address);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                txHash: hash,
                transactionHash: hash,
                amount: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FAUCET_CONFIG"].amount,
                message: `Successfully minted ${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$constants$2f$shared$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FAUCET_CONFIG"].amount} DSTK tokens!`
            });
        } else {
            console.error('Transaction failed with status:', receipt.status);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Transaction failed',
                message: 'Token minting transaction failed. Please try again.'
            }, {
                status: 500
            });
        }
    } catch (error) {
        console.error('Faucet error details:', {
            message: error.message,
            code: error.code,
            details: error.details,
            stack: error.stack
        });
        // Provide more specific error messages based on common issues
        let userMessage = 'An unexpected error occurred. Please try again.';
        if (error.message?.includes('insufficient funds')) {
            userMessage = 'Faucet wallet has insufficient funds. Please contact support.';
        } else if (error.message?.includes('execution reverted')) {
            userMessage = 'Transaction was rejected by the contract. The faucet may not have mint permissions.';
        } else if (error.message?.includes('network')) {
            userMessage = 'Network connection error. Please check your connection and try again.';
        } else if (error.message?.includes('timeout')) {
            userMessage = 'Request timed out. Please try again.';
        } else if (error.code === 'UNAUTHORIZED') {
            userMessage = 'Faucet wallet does not have permission to mint tokens. Please contact support.';
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error',
            message: userMessage
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__a449bda0._.js.map