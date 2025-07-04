(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/web/components/TokenCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TokenCard": (()=>TokenCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as SparklesIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TokenCard({ company, index = 0, onClick }) {
    _s();
    const priceValue = parseFloat(company.price.replace('$', ''));
    const [logoError, setLogoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Generate market-based trending logic using market cap
    const marketCapValue = parseFloat(company.marketCap.replace(/[$M|B]/g, ''));
    const isTrending = marketCapValue > 1000; // Over 1B market cap
    const isHighGrowth = priceValue > 5; // High price point
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            delay: index * 0.1
        },
        whileHover: {
            scale: 1.02
        },
        whileTap: {
            scale: 0.98
        },
        className: "group cursor-pointer",
        onClick: onClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "glass-card p-6 h-full relative overflow-hidden hover:border-blue-500/50 transition-all duration-300",
            children: [
                isHighGrowth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 right-4 z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 rounded-full text-xs font-bold text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "HIGH VALUE"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TokenCard.tsx",
                        lineNumber: 38,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this),
                isTrending && !isHighGrowth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 right-4 z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded-full text-xs font-bold text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "TRENDING"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TokenCard.tsx",
                        lineNumber: 48,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start space-x-4 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 rounded-full overflow-hidden bg-gray-800/50 flex items-center justify-center border-2 border-gray-700/50",
                                children: !logoError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: company.logo,
                                    alt: `${company.name} logo`,
                                    width: 64,
                                    height: 64,
                                    className: "object-cover",
                                    onError: ()=>setLogoError(true)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 60,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full flex items-center justify-center",
                                    children: company.symbol.charAt(0)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 69,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/TokenCard.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-white truncate",
                                            children: company.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TokenCard.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full",
                                            children: company.sector
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TokenCard.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-400 text-sm mb-1",
                                    children: company.tokenName
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-500 text-xs",
                                    children: company.category
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TokenCard.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-white",
                                children: company.price
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-400",
                                        children: "Market Cap"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TokenCard.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-semibold text-green-400",
                                        children: company.marketCap
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TokenCard.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TokenCard.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-300 text-sm leading-relaxed",
                        children: company.description
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TokenCard.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium text-gray-400",
                                    children: "SECTOR:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-blue-400",
                                    children: company.sector
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TokenCard.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "text-blue-400 group-hover:text-blue-300 transition-colors duration-200",
                            whileHover: {
                                scale: 1.1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/TokenCard.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gray-900/95 backdrop-blur-sm p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl mb-3 bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white font-bold",
                                children: company.symbol.charAt(0)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-lg font-bold text-white mb-2",
                                children: company.tokenName
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 text-sm leading-relaxed mb-4",
                                children: company.description
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg inline-block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-medium",
                                    children: "Trade Now"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TokenCard.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TokenCard.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TokenCard.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/TokenCard.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/TokenCard.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(TokenCard, "7i598QxtGc10IssbVHeH2hGlpB8=");
_c = TokenCard;
var _c;
__turbopack_context__.k.register(_c, "TokenCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
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
"[project]/apps/web/lib/utils/companyUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/app/tokens/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TokensPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as SearchIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$TokenCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/TokenCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/companyUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function TokensPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedSector, setSelectedSector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('marketCap');
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('desc');
    const allCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCompanies"])();
    const allSectors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllSectors"])();
    const allCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCategories"])();
    const trendingCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTrendingCompanies"])();
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompanyStats"])();
    const filterOptions = {
        searchTerm,
        selectedSector,
        selectedCategory,
        sortField,
        sortDirection
    };
    const filteredCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TokensPage.useMemo[filteredCompanies]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterAndSortCompanies"])(filterOptions)
    }["TokensPage.useMemo[filteredCompanies]"], [
        searchTerm,
        selectedSector,
        selectedCategory,
        sortField,
        sortDirection
    ]);
    const handleCompanyClick = (companyId)=>{
        router.push(`/company/${companyId}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4",
                            children: "DeStock Tokens"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-gray-300 mb-6",
                            children: "Professional decentralized trading platform for company tokens with advanced analytics and real-time market data"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-6 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "glass-card px-6 py-4",
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-blue-400",
                                            children: stats.totalCompanies
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Total Tokens"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "glass-card px-6 py-4",
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-green-400",
                                            children: stats.totalMarketCap
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Total Market Cap"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "glass-card px-6 py-4",
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-purple-400",
                                            children: stats.sectors
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Sectors"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "glass-card px-6 py-4",
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-pink-400",
                                            children: [
                                                "$",
                                                stats.averagePrice.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-400",
                                            children: "Avg Price"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                trendingCompanies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        delay: 0.2
                    },
                    className: "mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                    className: "w-6 h-6 text-blue-400"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-white",
                                    children: "Trending Tokens"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: trendingCompanies.slice(0, 4).map((company, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$TokenCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenCard"], {
                                    company: company,
                                    index: index,
                                    onClick: ()=>handleCompanyClick(company.id)
                                }, company.id, false, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        delay: 0.3
                    },
                    className: "glass-card p-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative lg:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Search tokens, companies, or themes...",
                                            value: searchTerm,
                                            onChange: (e)=>setSearchTerm(e.target.value),
                                            className: "w-full p-3 pl-10 rounded-xl bg-gray-800/50 border border-gray-700/50    text-white placeholder-gray-400 focus:outline-none focus:ring-2    focus:ring-blue-500/50 transition-all duration-200"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchIcon$3e$__["SearchIcon"], {
                                            className: "absolute left-3 top-3 w-5 h-5 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedSector,
                                    onChange: (e)=>setSelectedSector(e.target.value),
                                    className: "p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white    focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "All Sectors"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this),
                                        allSectors.map((sector)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: sector,
                                                children: sector
                                            }, sector, false, {
                                                fileName: "[project]/apps/web/app/tokens/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedCategory,
                                    onChange: (e)=>setSelectedCategory(e.target.value),
                                    className: "p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white    focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "All Categories"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this),
                                        allCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: category,
                                                children: category
                                            }, category, false, {
                                                fileName: "[project]/apps/web/app/tokens/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: `${sortField}-${sortDirection}`,
                                    onChange: (e)=>{
                                        const [field, direction] = e.target.value.split('-');
                                        setSortField(field);
                                        setSortDirection(direction);
                                    },
                                    className: "p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white    focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "marketCap-desc",
                                            children: "Market Cap (High to Low)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "marketCap-asc",
                                            children: "Market Cap (Low to High)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "price-desc",
                                            children: "Price (High to Low)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 177,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "price-asc",
                                            children: "Price (Low to High)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "name-asc",
                                            children: "Name (A to Z)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "name-desc",
                                            children: "Name (Z to A)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 text-gray-400 text-sm",
                            children: [
                                "Showing ",
                                filteredCompanies.length,
                                " of ",
                                allCompanies.length,
                                " tokens"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        delay: 0.4
                    },
                    children: filteredCompanies.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                        children: filteredCompanies.map((company, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$TokenCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenCard"], {
                                company: company,
                                index: index,
                                onClick: ()=>handleCompanyClick(company.id)
                            }, company.id, false, {
                                fileName: "[project]/apps/web/app/tokens/page.tsx",
                                lineNumber: 199,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/tokens/page.tsx",
                        lineNumber: 197,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        className: "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                children: "🔍"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/tokens/page.tsx",
                                lineNumber: 213,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold text-white mb-2",
                                children: "No tokens found"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/tokens/page.tsx",
                                lineNumber: 214,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters'
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/tokens/page.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/tokens/page.tsx",
                        lineNumber: 208,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        delay: 0.6
                    },
                    className: "text-center mt-16 glass-card p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-white mb-4",
                            children: "Ready to Trade?"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300 mb-6",
                            children: "Connect your wallet and start trading company tokens with professional-grade tools"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: ()=>router.push('/'),
                            className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700    px-8 py-4 rounded-xl font-bold text-white transition-all duration-200",
                            children: "Start Trading Now"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/tokens/page.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/tokens/page.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/app/tokens/page.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/app/tokens/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(TokensPage, "khdIhGjoStU3Zgl7XRsBe2pc450=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TokensPage;
var _c;
__turbopack_context__.k.register(_c, "TokensPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_web_3bd1ffb6._.js.map