(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/web/components/LoadingSpinner.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LoadingSpinner": (()=>LoadingSpinner)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
'use client';
;
;
;
function LoadingSpinner({ size = 'medium', variant = 'circular', className = '', overlay = false }) {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };
    if (variant === 'circular') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('flex items-center justify-center', overlay && 'fixed inset-0 glass-modal z-50', className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('border-2 border-destock-primary/20 border-t-destock-primary rounded-full', sizeClasses[size]),
                animate: {
                    rotate: 360
                },
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/components/LoadingSpinner.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/LoadingSpinner.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    if (variant === 'dots') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('flex items-center justify-center space-x-1', overlay && 'fixed inset-0 glass-modal z-50', className),
            children: [
                0,
                1,
                2
            ].map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "w-2 h-2 bg-destock-primary rounded-full",
                    animate: {
                        scale: [
                            1,
                            1.5,
                            1
                        ],
                        opacity: [
                            0.5,
                            1,
                            0.5
                        ]
                    },
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.2
                    }
                }, index, false, {
                    fileName: "[project]/apps/web/components/LoadingSpinner.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/components/LoadingSpinner.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    if (variant === 'bars') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('flex items-center justify-center space-x-1', overlay && 'fixed inset-0 glass-modal z-50', className),
            children: [
                0,
                1,
                2,
                3
            ].map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "w-1 bg-destock-primary rounded-full",
                    style: {
                        height: size === 'small' ? 16 : size === 'medium' ? 24 : 32
                    },
                    animate: {
                        scaleY: [
                            1,
                            2,
                            1
                        ]
                    },
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.1
                    }
                }, index, false, {
                    fileName: "[project]/apps/web/components/LoadingSpinner.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/components/LoadingSpinner.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this);
    }
    return null;
}
_c = LoadingSpinner;
var _c;
__turbopack_context__.k.register(_c, "LoadingSpinner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/components/WidgetWrapper.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WidgetWrapper": (()=>WidgetWrapper)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as MinusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SettingsIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as SettingsIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVerticalIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVerticalIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LoadingSpinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/LoadingSpinner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function WidgetWrapper({ title, id, children, className = '', isCollapsed = false, isLoading = false, error, onToggle, onClose, onSettings, showControls = true, draggable = true, resizable = true, size = 'medium' }) {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sizeClasses = {
        small: 'min-h-[200px]',
        medium: 'min-h-[300px]',
        large: 'min-h-[400px]',
        full: 'h-full'
    };
    const handleKeyDown = (event, action)=>{
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('glass-card widget-enter', sizeClasses[size], className),
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        layout: true,
        initial: {
            scale: 0.95,
            opacity: 0
        },
        animate: {
            scale: 1,
            opacity: 1
        },
        exit: {
            scale: 0.95,
            opacity: 0
        },
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20
        },
        role: "region",
        "aria-labelledby": `widget-${id}-title`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-4 border-b border-white/10 dark:border-black/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            draggable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
                                whileHover: {
                                    scale: 1.1
                                },
                                whileTap: {
                                    scale: 0.9
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVerticalIcon$3e$__["GripVerticalIcon"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                id: `widget-${id}-title`,
                                className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    showControls && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: (isHovered || isCollapsed) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "flex items-center space-x-1",
                            initial: {
                                opacity: 0,
                                scale: 0.8
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.8
                            },
                            transition: {
                                duration: 0.2
                            },
                            children: [
                                onSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: onSettings,
                                    onKeyDown: (e)=>handleKeyDown(e, onSettings),
                                    className: "p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-200",
                                    whileHover: {
                                        scale: 1.1
                                    },
                                    whileTap: {
                                        scale: 0.9
                                    },
                                    "aria-label": `Settings for ${title}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SettingsIcon$3e$__["SettingsIcon"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                        lineNumber: 115,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                    lineNumber: 107,
                                    columnNumber: 19
                                }, this),
                                onToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: onToggle,
                                    onKeyDown: (e)=>handleKeyDown(e, onToggle),
                                    className: "p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-200",
                                    whileHover: {
                                        scale: 1.1
                                    },
                                    whileTap: {
                                        scale: 0.9
                                    },
                                    "aria-label": isCollapsed ? `Expand ${title}` : `Collapse ${title}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__["MinusIcon"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                        lineNumber: 128,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                    lineNumber: 120,
                                    columnNumber: 19
                                }, this),
                                onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: onClose,
                                    onKeyDown: (e)=>handleKeyDown(e, onClose),
                                    className: "p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200",
                                    whileHover: {
                                        scale: 1.1
                                    },
                                    whileTap: {
                                        scale: 0.9
                                    },
                                    "aria-label": `Close ${title}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                        lineNumber: 141,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                    lineNumber: 133,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                            lineNumber: 99,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "p-4 h-full overflow-auto custom-scrollbar",
                    initial: {
                        opacity: 0,
                        height: 0
                    },
                    animate: {
                        opacity: 1,
                        height: 'auto'
                    },
                    exit: {
                        opacity: 0,
                        height: 0
                    },
                    transition: {
                        duration: 0.3,
                        ease: 'easeInOut'
                    },
                    children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-32",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-red-500 dark:text-red-400 text-sm font-medium mb-2",
                                    children: "Error loading widget"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                    lineNumber: 163,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-500 dark:text-gray-400 text-xs",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                                    lineNumber: 166,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                            lineNumber: 162,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                        lineNumber: 161,
                        columnNumber: 15
                    }, this) : isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-32",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LoadingSpinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingSpinner"], {}, void 0, false, {
                            fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                            lineNumber: 173,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                        lineNumber: 172,
                        columnNumber: 15
                    }, this) : children
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            resizable && !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full bg-gray-400 dark:bg-gray-600 transform rotate-45 translate-x-2 translate-y-2"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/WidgetWrapper.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(WidgetWrapper, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c = WidgetWrapper;
var _c;
__turbopack_context__.k.register(_c, "WidgetWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/components/DashboardGrid.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DashboardGrid": (()=>DashboardGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$WidgetWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/WidgetWrapper.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function DashboardGrid({ widgets, layout = 'grid', className = '' }) {
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [collapsedWidgets, setCollapsedWidgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardGrid.useEffect": ()=>{
            const checkIsMobile = {
                "DashboardGrid.useEffect.checkIsMobile": ()=>{
                    setIsMobile(window.innerWidth < 768);
                }
            }["DashboardGrid.useEffect.checkIsMobile"];
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile);
            return ({
                "DashboardGrid.useEffect": ()=>window.removeEventListener('resize', checkIsMobile)
            })["DashboardGrid.useEffect"];
        }
    }["DashboardGrid.useEffect"], []);
    const toggleWidget = (widgetId)=>{
        const newCollapsed = new Set(collapsedWidgets);
        if (newCollapsed.has(widgetId)) {
            newCollapsed.delete(widgetId);
        } else {
            newCollapsed.add(widgetId);
        }
        setCollapsedWidgets(newCollapsed);
    };
    // Mobile layout - use tabs
    if (isMobile || layout === 'tabs') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `space-y-4 ${className}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-1 glass-card p-1 rounded-lg",
                    children: widgets.map((widget, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            onClick: ()=>setActiveTab(index),
                            className: `flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === index ? 'bg-destock-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`,
                            whileTap: {
                                scale: 0.98
                            },
                            children: widget.title
                        }, widget.id, false, {
                            fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    exit: {
                        opacity: 0,
                        x: -20
                    },
                    transition: {
                        duration: 0.2
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$WidgetWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetWrapper"], {
                        title: widgets[activeTab].title,
                        id: widgets[activeTab].id,
                        onToggle: ()=>toggleWidget(widgets[activeTab].id),
                        isCollapsed: collapsedWidgets.has(widgets[activeTab].id),
                        showControls: false,
                        children: widgets[activeTab].component
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                }, activeTab, false, {
                    fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/DashboardGrid.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this);
    }
    // Desktop layout - use resizable panels
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: `h-[calc(100vh-200px)] ${className}`,
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        transition: {
            duration: 0.3
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
            direction: "horizontal",
            className: "space-x-4",
            children: widgets.map((widget, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                    defaultSize: widget.defaultSize || 50,
                    minSize: widget.minSize || 20,
                    collapsible: widget.collapsible,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "h-full",
                            initial: {
                                scale: 0.95,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            transition: {
                                delay: index * 0.1,
                                duration: 0.3
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$WidgetWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetWrapper"], {
                                title: widget.title,
                                id: widget.id,
                                onToggle: ()=>toggleWidget(widget.id),
                                isCollapsed: collapsedWidgets.has(widget.id),
                                className: "h-full",
                                children: !collapsedWidgets.has(widget.id) && widget.component
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this),
                        index < widgets.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
                            className: "w-4 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-1 h-8 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                                lineNumber: 129,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                            lineNumber: 128,
                            columnNumber: 15
                        }, this)
                    ]
                }, widget.id, true, {
                    fileName: "[project]/apps/web/components/DashboardGrid.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/components/DashboardGrid.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/DashboardGrid.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(DashboardGrid, "IVdD/I5Wuw35VMkFnbpjfSRPjbQ=");
_c = DashboardGrid;
var _c;
__turbopack_context__.k.register(_c, "DashboardGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/lib/hooks/useDeStock.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useDeStock": (()=>useDeStock)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/contracts.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/abi/DeStock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/lib/contracts.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseEther.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useDeStock() {
    _s();
    var _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature();
    const { address, chainId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const contractAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDeStock.useMemo[contractAddress]": ()=>{
            if (!chainId) return undefined;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getContractAddress"])('DESTOCK', chainId);
        }
    }["useDeStock.useMemo[contractAddress]"], [
        chainId
    ]);
    const { writeContract, data: hash, error, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"])({
        hash
    });
    // Read functions
    const { data: nextCompanyId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
        address: contractAddress,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
        functionName: 'nextCompanyId'
    });
    const getCompany = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s1({
        "useDeStock.useCallback[getCompany]": (companyId)=>{
            _s1();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'companies',
                args: [
                    BigInt(companyId)
                ]
            });
        }
    }["useDeStock.useCallback[getCompany]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getCompany]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getCompany]"]), [
        contractAddress
    ]);
    const getSharePrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s2({
        "useDeStock.useCallback[getSharePrice]": (companyId)=>{
            _s2();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'getSharePrice',
                args: [
                    BigInt(companyId)
                ]
            });
        }
    }["useDeStock.useCallback[getSharePrice]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getSharePrice]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getSharePrice]"]), [
        contractAddress
    ]);
    const getShareBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s3({
        "useDeStock.useCallback[getShareBalance]": (companyId, userAddress)=>{
            _s3();
            const targetAddress = userAddress || address;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'balanceOf',
                args: targetAddress ? [
                    targetAddress,
                    BigInt(companyId)
                ] : undefined,
                query: {
                    enabled: !!targetAddress
                }
            });
        }
    }["useDeStock.useCallback[getShareBalance]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getShareBalance]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getShareBalance]"]), [
        contractAddress,
        address
    ]);
    const getLPTokenBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s4({
        "useDeStock.useCallback[getLPTokenBalance]": (companyId, userAddress)=>{
            _s4();
            const targetAddress = userAddress || address;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'getLPTokenBalance',
                args: targetAddress ? [
                    targetAddress,
                    BigInt(companyId)
                ] : undefined,
                query: {
                    enabled: !!targetAddress
                }
            });
        }
    }["useDeStock.useCallback[getLPTokenBalance]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getLPTokenBalance]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getLPTokenBalance]"]), [
        contractAddress,
        address
    ]);
    const getUserOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s5({
        "useDeStock.useCallback[getUserOrders]": (userAddress)=>{
            _s5();
            const targetAddress = userAddress || address;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'getUserOrders',
                args: targetAddress ? [
                    targetAddress
                ] : undefined,
                query: {
                    enabled: !!targetAddress
                }
            });
        }
    }["useDeStock.useCallback[getUserOrders]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getUserOrders]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getUserOrders]"]), [
        contractAddress,
        address
    ]);
    const getOrderDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s6({
        "useDeStock.useCallback[getOrderDetails]": (orderId)=>{
            _s6();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'getOrderDetails',
                args: [
                    BigInt(orderId)
                ]
            });
        }
    }["useDeStock.useCallback[getOrderDetails]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getOrderDetails]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getOrderDetails]"]), [
        contractAddress
    ]);
    const getBuyPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s7({
        "useDeStock.useCallback[getBuyPrice]": (companyId, amount)=>{
            _s7();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'getBuyPrice',
                args: [
                    BigInt(companyId),
                    BigInt(amount)
                ]
            });
        }
    }["useDeStock.useCallback[getBuyPrice]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getBuyPrice]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getBuyPrice]"]), [
        contractAddress
    ]);
    const getSellPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s8({
        "useDeStock.useCallback[getSellPrice]": (companyId, amount)=>{
            _s8();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'getSellPrice',
                args: [
                    BigInt(companyId),
                    BigInt(amount)
                ]
            });
        }
    }["useDeStock.useCallback[getSellPrice]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getSellPrice]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getSellPrice]"]), [
        contractAddress
    ]);
    const getTradingVolume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(_s9({
        "useDeStock.useCallback[getTradingVolume]": (companyId)=>{
            _s9();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"])({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'getTradingVolume',
                args: [
                    BigInt(companyId)
                ]
            });
        }
    }["useDeStock.useCallback[getTradingVolume]"], "nYQx3518H2XOstW/ZXNm7dsNRfg=", false, {
        "useDeStock.useCallback[getTradingVolume]": function() {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
            ];
        }
    }["useDeStock.useCallback[getTradingVolume]"]), [
        contractAddress
    ]);
    // Write functions
    const registerCompany = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeStock.useCallback[registerCompany]": (name, initialPrice, totalSupply)=>{
            if (!contractAddress) return;
            writeContract({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'registerCompany',
                args: [
                    name,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(initialPrice),
                    BigInt(totalSupply)
                ]
            });
        }
    }["useDeStock.useCallback[registerCompany]"], [
        contractAddress,
        writeContract
    ]);
    const buyShares = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeStock.useCallback[buyShares]": (companyId, amount)=>{
            if (!contractAddress) return;
            writeContract({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'buyShares',
                args: [
                    BigInt(companyId),
                    BigInt(amount)
                ]
            });
        }
    }["useDeStock.useCallback[buyShares]"], [
        contractAddress,
        writeContract
    ]);
    const sellShares = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeStock.useCallback[sellShares]": (companyId, amount)=>{
            if (!contractAddress) return;
            writeContract({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'sellShares',
                args: [
                    BigInt(companyId),
                    BigInt(amount)
                ]
            });
        }
    }["useDeStock.useCallback[sellShares]"], [
        contractAddress,
        writeContract
    ]);
    const addLiquidity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeStock.useCallback[addLiquidity]": (companyId, tokenAmount, shareAmount)=>{
            if (!contractAddress) return;
            writeContract({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'addLiquidity',
                args: [
                    BigInt(companyId),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(tokenAmount),
                    BigInt(shareAmount)
                ]
            });
        }
    }["useDeStock.useCallback[addLiquidity]"], [
        contractAddress,
        writeContract
    ]);
    const removeLiquidity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeStock.useCallback[removeLiquidity]": (companyId, lpTokens)=>{
            if (!contractAddress) return;
            writeContract({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'removeLiquidity',
                args: [
                    BigInt(companyId),
                    BigInt(lpTokens)
                ]
            });
        }
    }["useDeStock.useCallback[removeLiquidity]"], [
        contractAddress,
        writeContract
    ]);
    const placeOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeStock.useCallback[placeOrder]": (companyId, isBuy, amount, price)=>{
            if (!contractAddress) return;
            writeContract({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'placeOrder',
                args: [
                    BigInt(companyId),
                    isBuy,
                    BigInt(amount),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseEther$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEther"])(price)
                ]
            });
        }
    }["useDeStock.useCallback[placeOrder]"], [
        contractAddress,
        writeContract
    ]);
    const cancelOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeStock.useCallback[cancelOrder]": (orderId)=>{
            if (!contractAddress) return;
            writeContract({
                address: contractAddress,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$abi$2f$DeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DESTOCK_ABI"],
                functionName: 'cancelOrder',
                args: [
                    BigInt(orderId)
                ]
            });
        }
    }["useDeStock.useCallback[cancelOrder]"], [
        contractAddress,
        writeContract
    ]);
    return {
        // Contract data
        contractAddress,
        nextCompanyId: nextCompanyId ? Number(nextCompanyId) : 0,
        // Read functions
        getCompany,
        getSharePrice,
        getShareBalance,
        getLPTokenBalance,
        getUserOrders,
        getOrderDetails,
        getBuyPrice,
        getSellPrice,
        getTradingVolume,
        // Write functions
        registerCompany,
        buyShares,
        sellShares,
        addLiquidity,
        removeLiquidity,
        placeOrder,
        cancelOrder,
        // Transaction state
        hash,
        isPending,
        isConfirming,
        isConfirmed,
        error
    };
}
_s(useDeStock, "R6IQDKds7DV5NSXSbsLyriGbzjc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWaitForTransactionReceipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWaitForTransactionReceipt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContract"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/components/AnimatedCounter.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AnimatedCounter": (()=>AnimatedCounter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AnimatedCounter({ value, format = 'decimal', decimals = 2, prefix = '', suffix = '', duration = 0.5, className = '', colorChange = false, previousValue }) {
    _s();
    const [displayValue, setDisplayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const [isChanging, setIsChanging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const springValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(value, {
        stiffness: 100,
        damping: 15
    });
    const displayNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(springValue, {
        "AnimatedCounter.useTransform[displayNumber]": (latest)=>{
            let formatted;
            switch(format){
                case 'currency':
                    formatted = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals
                    }).format(latest);
                    break;
                case 'percentage':
                    formatted = `${latest.toFixed(decimals)}%`;
                    break;
                case 'integer':
                    formatted = Math.round(latest).toLocaleString();
                    break;
                case 'decimal':
                default:
                    formatted = latest.toFixed(decimals);
                    break;
            }
            return `${prefix}${formatted}${suffix}`;
        }
    }["AnimatedCounter.useTransform[displayNumber]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedCounter.useEffect": ()=>{
            if (value !== displayValue) {
                setIsChanging(true);
                springValue.set(value);
                setDisplayValue(value);
                const timer = setTimeout({
                    "AnimatedCounter.useEffect.timer": ()=>{
                        setIsChanging(false);
                    }
                }["AnimatedCounter.useEffect.timer"], duration * 1000);
                return ({
                    "AnimatedCounter.useEffect": ()=>clearTimeout(timer)
                })["AnimatedCounter.useEffect"];
            }
        }
    }["AnimatedCounter.useEffect"], [
        value,
        displayValue,
        springValue,
        duration
    ]);
    const getChangeColor = ()=>{
        if (!colorChange || previousValue === undefined) return '';
        if (value > previousValue) return 'text-success';
        if (value < previousValue) return 'text-danger';
        return '';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
        className: `number-counter ${getChangeColor()} ${className}`,
        animate: isChanging ? {
            scale: [
                1,
                1.05,
                1
            ]
        } : {},
        transition: {
            type: 'tween',
            duration: 0.3,
            ease: 'easeInOut'
        },
        "aria-live": "polite",
        children: displayNumber
    }, void 0, false, {
        fileName: "[project]/apps/web/components/AnimatedCounter.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(AnimatedCounter, "K2bpvL02N824sXc2j2N2JhV/e3Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = AnimatedCounter;
var _c;
__turbopack_context__.k.register(_c, "AnimatedCounter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/components/TradeView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TradeView": (()=>TradeView)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/hooks/useDeStock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDSTK$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/hooks/useDSTK.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCartIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCartIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSignIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSignIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript) <export default as AlertCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$AnimatedCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/AnimatedCounter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LoadingSpinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/LoadingSpinner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    companyId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Please select a company'),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Amount is required')
});
function TradeView() {
    _s();
    const { isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { buyShares, sellShares, getSharePrice, getShareBalance, nextCompanyId, isPending, isConfirming, isConfirmed, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeStock"])();
    const { balance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDSTK$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDSTK"])();
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCompany, setSelectedCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tradeType, setTradeType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('buy');
    const [userShares, setUserShares] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fix hydration by ensuring client-side rendering only after mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradeView.useEffect": ()=>{
            setMounted(true);
        }
    }["TradeView.useEffect"], []);
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(schema)
    });
    const watchedCompanyId = watch('companyId');
    const watchedAmount = watch('amount');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradeView.useEffect": ()=>{
            if (isConnected && nextCompanyId > 0) {
                loadCompanies();
            }
        }
    }["TradeView.useEffect"], [
        isConnected,
        nextCompanyId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradeView.useEffect": ()=>{
            if (watchedCompanyId) {
                const company = companies.find({
                    "TradeView.useEffect.company": (c)=>c.id.toString() === watchedCompanyId
                }["TradeView.useEffect.company"]);
                if (company) {
                    setSelectedCompany(company);
                    loadUserShares(company.id);
                }
            }
        }
    }["TradeView.useEffect"], [
        watchedCompanyId,
        companies
    ]);
    const loadCompanies = async ()=>{
        try {
            // Placeholder implementation - would need real contract calls
            const companiesData = [];
            for(let i = 0; i < nextCompanyId; i++){
                companiesData.push({
                    id: i,
                    name: `Company ${i + 1}`,
                    price: '12.5'
                });
            }
            setCompanies(companiesData);
        } catch (error) {
            console.error('Failed to load companies:', error);
        }
    };
    const loadUserShares = async (companyId)=>{
        try {
            // Placeholder implementation - would need real contract calls
            setUserShares('100');
        } catch (error) {
            console.error('Failed to load user shares:', error);
            setUserShares('0');
        }
    };
    const calculateCost = ()=>{
        if (!selectedCompany || !watchedAmount) return '0';
        return (parseFloat(selectedCompany.price) * parseFloat(watchedAmount)).toFixed(2);
    };
    const onSubmit = async (data)=>{
        if (!selectedCompany) return;
        setLoading(true);
        try {
            if (tradeType === 'buy') {
                await buyShares(selectedCompany.id, data.amount);
            } else {
                await sellShares(selectedCompany.id, data.amount);
            }
            reset();
        } catch (error) {
            console.error('Trade failed:', error);
        } finally{
            setLoading(false);
        }
    };
    const canTrade = ()=>{
        if (!selectedCompany || !watchedAmount) return false;
        const amount = parseFloat(watchedAmount);
        if (amount <= 0) return false;
        if (tradeType === 'buy') {
            const cost = parseFloat(calculateCost());
            return parseFloat(balance) >= cost;
        } else {
            return parseFloat(userShares) >= amount;
        }
    };
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "trading-card text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCartIcon$3e$__["ShoppingCartIcon"], {
                    className: "w-12 h-12 text-gray-400 mx-auto mb-4"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TradeView.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-2",
                    children: "Connect Your Wallet"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TradeView.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "Connect your wallet to start trading shares."
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TradeView.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/TradeView.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this);
    }
    // Render simple version before hydration to prevent mismatch
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "trading-card text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCartIcon$3e$__["ShoppingCartIcon"], {
                    className: "w-12 h-12 text-gray-400 mx-auto mb-4"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TradeView.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-2",
                    children: "Trade Shares"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TradeView.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "Loading trading interface..."
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/TradeView.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/TradeView.tsx",
            lineNumber: 155,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "glass-card p-6",
        initial: {
            opacity: 0,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        transition: {
            duration: 0.3
        },
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h3, {
                        className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: 0.1
                        },
                        children: "Trade Shares"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "flex glass-button rounded-lg p-1",
                        initial: {
                            opacity: 0,
                            x: 20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: 0.1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>setTradeType('buy'),
                                className: `px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${tradeType === 'buy' ? 'bg-success text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`,
                                whileTap: {
                                    scale: 0.95
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Buy"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>setTradeType('sell'),
                                className: `px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${tradeType === 'sell' ? 'bg-danger text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`,
                                whileTap: {
                                    scale: 0.95
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDownIcon$3e$__["TrendingDownIcon"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Sell"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/TradeView.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].form, {
                onSubmit: handleSubmit(onSubmit),
                className: "space-y-6",
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "destock-label",
                                htmlFor: "companyId",
                                children: "Select Company"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                ...register('companyId'),
                                id: "companyId",
                                className: "destock-input",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Choose a company"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TradeView.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    companies.map((company)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: company.id.toString(),
                                            children: [
                                                company.name,
                                                " - ",
                                                company.price,
                                                " DSTK"
                                            ]
                                        }, company.id, true, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: errors.companyId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                    className: "mt-1 text-sm text-danger flex items-center space-x-1",
                                    initial: {
                                        opacity: 0,
                                        y: -10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircleIcon$3e$__["AlertCircleIcon"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 260,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: errors.companyId.message
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: selectedCompany && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "glass-card p-4",
                            initial: {
                                opacity: 0,
                                scale: 0.95,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95,
                                y: -20
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                                            children: selectedCompany.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 278,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            className: "text-lg font-bold text-destock-primary",
                                            initial: {
                                                scale: 1.2,
                                                color: '#10B981'
                                            },
                                            animate: {
                                                scale: 1,
                                                color: '#3B82F6'
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$AnimatedCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedCounter"], {
                                                value: parseFloat(selectedCompany.price),
                                                suffix: " DSTK",
                                                decimals: 2
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                                lineNumber: 288,
                                                columnNumber: 19
                                            }, this)
                                        }, selectedCompany.price, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Your Holdings:"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 296,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$AnimatedCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedCounter"], {
                                            value: parseFloat(userShares),
                                            suffix: " shares",
                                            decimals: 0,
                                            className: "font-medium"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TradeView.tsx",
                            lineNumber: 270,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: 0.4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "destock-label",
                                htmlFor: "amount",
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ...register('amount'),
                                type: "number",
                                step: "1",
                                min: "1",
                                id: "amount",
                                className: "destock-input",
                                placeholder: "Number of shares"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: errors.amount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                    className: "mt-1 text-sm text-danger flex items-center space-x-1",
                                    initial: {
                                        opacity: 0,
                                        y: -10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircleIcon$3e$__["AlertCircleIcon"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: errors.amount.message
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 328,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: selectedCompany && watchedAmount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "glass-card p-4",
                            initial: {
                                opacity: 0,
                                scale: 0.95
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSignIcon$3e$__["DollarSignIcon"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 352,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Transaction Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 353,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-sm text-gray-600 dark:text-gray-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Shares:"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: watchedAmount
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Price per share:"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        selectedCompany.price,
                                                        " DSTK"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 360,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between font-semibold border-t border-white/10 dark:border-black/10 pt-2 text-gray-900 dark:text-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Total ",
                                                        tradeType === 'buy' ? 'Cost' : 'Proceeds',
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$AnimatedCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedCounter"], {
                                                    value: parseFloat(calculateCost()),
                                                    suffix: " DSTK",
                                                    decimals: 2,
                                                    className: tradeType === 'buy' ? 'text-danger' : 'text-success'
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 364,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this),
                                tradeType === 'buy' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Your DSTK Balance:"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 376,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$AnimatedCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedCounter"], {
                                            value: parseFloat(balance || '0'),
                                            suffix: " DSTK",
                                            decimals: 2,
                                            className: "font-medium"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradeView.tsx",
                                            lineNumber: 377,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradeView.tsx",
                                    lineNumber: 375,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TradeView.tsx",
                            lineNumber: 344,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "glass-card p-4 border border-danger/30 bg-danger/10",
                            initial: {
                                opacity: 0,
                                scale: 0.95
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-danger flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircleIcon$3e$__["AlertCircleIcon"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TradeView.tsx",
                                        lineNumber: 399,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Transaction failed: ",
                                            error.message
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/TradeView.tsx",
                                        lineNumber: 400,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 398,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/TradeView.tsx",
                            lineNumber: 392,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        type: "submit",
                        disabled: !canTrade() || isPending || isConfirming || loading,
                        className: `w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${tradeType === 'buy' ? 'bg-success hover:bg-success/80 text-white shadow-lg' : 'bg-danger hover:bg-danger/80 text-white shadow-lg'}`,
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: 0.98
                        },
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.5
                        },
                        children: [
                            isPending || isConfirming || loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LoadingSpinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingSpinner"], {
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 422,
                                columnNumber: 13
                            }, this) : tradeType === 'buy' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 424,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDownIcon$3e$__["TrendingDownIcon"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 426,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: isPending || isConfirming || loading ? 'Processing...' : !canTrade() ? tradeType === 'buy' ? 'Insufficient Balance' : 'Insufficient Shares' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} Shares`
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "glass-card p-4 border border-success/30 bg-success/10",
                            initial: {
                                opacity: 0,
                                scale: 0.95,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95,
                                y: -20
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-success flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TradeView.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Transaction completed successfully! 🎉"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TradeView.tsx",
                                        lineNumber: 451,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/TradeView.tsx",
                                lineNumber: 449,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/TradeView.tsx",
                            lineNumber: 442,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradeView.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/TradeView.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/TradeView.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s(TradeView, "0rsJ+wYNYzXCLxBnjOQq00RbXjs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeStock"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDSTK$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDSTK"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = TradeView;
var _c;
__turbopack_context__.k.register(_c, "TradeView");
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
"[project]/apps/web/components/CompanyList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CompanyList": (()=>CompanyList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/hooks/useDeStock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BuildingIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as BuildingIcon>");
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
;
;
;
function CompanyList() {
    _s();
    const { isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { nextCompanyId, getCompany, getSharePrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeStock"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('marketCap');
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('desc');
    const [selectedSector, setSelectedSector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CompanyList.useEffect": ()=>{
            loadCompanies();
        }
    }["CompanyList.useEffect"], []);
    const loadCompanies = async ()=>{
        setLoading(true);
        try {
            // Try to load from API first
            const response = await fetch('/api/market?type=companies');
            if (response.ok) {
                const result = await response.json();
                setCompanies(result.companies || []);
            } else {
                // Fallback to token data
                const tokenCompanies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCompanies"])();
                const transformedCompanies = tokenCompanies.map((company, index)=>({
                        id: index,
                        name: company.name,
                        symbol: company.symbol,
                        owner: '0x' + Math.random().toString(16).substr(2, 40),
                        initialPrice: company.price.replace('$', ''),
                        totalSupply: '1000000',
                        currentPrice: company.price.replace('$', ''),
                        change: (Math.random() - 0.5) * 20,
                        changePercent: (Math.random() - 0.5) * 20,
                        volume: Math.floor(Math.random() * 1000000),
                        marketCap: parseFloat(company.marketCap.replace(/[$BM]/g, '')) * (company.marketCap.includes('B') ? 1000000000 : 1000000),
                        sector: company.sector,
                        logo: company.logo,
                        tokenData: company // Store the full token data
                    }));
                setCompanies(transformedCompanies);
            }
        } catch (error) {
            console.error('Failed to load companies:', error);
            // Final fallback to contract data if available
            if (isConnected && nextCompanyId > 0) {
                await loadCompaniesFromContract();
            }
        } finally{
            setLoading(false);
        }
    };
    const loadCompaniesFromContract = async ()=>{
        const companyPromises = [];
        for(let i = 0; i < nextCompanyId; i++){
            companyPromises.push(loadCompanyData(i));
        }
        const loadedCompanies = await Promise.all(companyPromises);
        setCompanies(loadedCompanies.filter(Boolean));
    };
    const loadCompanyData = async (id)=>{
        try {
            // Note: This would need to be implemented with actual contract calls
            // const companyData = await getCompany(id);
            // const priceData = await getSharePrice(id);
            // Placeholder data for now
            return {
                id,
                name: `Company ${id + 1}`,
                owner: '0x1234567890123456789012345678901234567890',
                initialPrice: '10.0',
                totalSupply: '1000',
                currentPrice: '12.5'
            };
        } catch (error) {
            console.error(`Failed to load company ${id}:`, error);
            return null;
        }
    };
    const handleSort = (field)=>{
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };
    const sortedAndFilteredCompanies = companies.filter((company)=>{
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || company.symbol && company.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSector = !selectedSector || company.sector === selectedSector;
        return matchesSearch && matchesSector;
    }).sort((a, b)=>{
        let aValue, bValue;
        switch(sortField){
            case 'name':
                aValue = a.name;
                bValue = b.name;
                break;
            case 'currentPrice':
                aValue = parseFloat(a.currentPrice || '0');
                bValue = parseFloat(b.currentPrice || '0');
                break;
            case 'change':
                aValue = a.change || 0;
                bValue = b.change || 0;
                break;
            case 'volume':
                aValue = a.volume || 0;
                bValue = b.volume || 0;
                break;
            case 'marketCap':
                aValue = a.marketCap || 0;
                bValue = b.marketCap || 0;
                break;
            default:
                return 0;
        }
        if (typeof aValue === 'string') {
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
    const uniqueSectors = Array.from(new Set(companies.map((c)=>c.sector).filter(Boolean)));
    const formatAddress = (address)=>{
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    const formatNumber = (num)=>{
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
        return num.toString();
    };
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "destock-card text-center py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BuildingIcon$3e$__["BuildingIcon"], {
                    className: "w-12 h-12 text-gray-400 mx-auto mb-4"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-medium text-gray-900 mb-2",
                    children: "Connect Your Wallet"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "Connect your wallet to view listed companies."
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/CompanyList.tsx",
            lineNumber: 190,
            columnNumber: 7
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                ...Array(3)
            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "destock-card animate-pulse",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 bg-gray-200 rounded w-3/4 mb-2"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                lineNumber: 208,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-3 bg-gray-200 rounded w-1/2 mb-2"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-3 bg-gray-200 rounded w-1/4"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                        lineNumber: 207,
                        columnNumber: 13
                    }, this)
                }, i, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/components/CompanyList.tsx",
            lineNumber: 204,
            columnNumber: 7
        }, this);
    }
    if (companies.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "destock-card text-center py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BuildingIcon$3e$__["BuildingIcon"], {
                    className: "w-12 h-12 text-gray-400 mx-auto mb-4"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-medium text-gray-900 mb-2",
                    children: "No Companies Listed"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-4",
                    children: "Be the first to register your company on DeStock!"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 225,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/register",
                    className: "destock-button-primary inline-flex items-center",
                    children: "Register Company"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/CompanyList.tsx",
            lineNumber: 220,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "glass-card p-6",
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
            delay: 0.1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
                children: "Market Overview"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/CompanyList.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "mb-6 space-y-4",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search companies or symbols...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    className: "w-full p-3 pl-10 rounded-xl bg-gray-800/50 border border-gray-700/50    text-white placeholder-gray-400 focus:outline-none focus:ring-2    focus:ring-blue-500/50 transition-all duration-200"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "absolute left-3 top-3 w-5 h-5 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                            lineNumber: 257,
                            columnNumber: 11
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
                                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                                    lineNumber: 283,
                                    columnNumber: 13
                                }, this),
                                uniqueSectors.map((sector)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: sector,
                                        children: sector
                                    }, sector, false, {
                                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/CompanyList.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "overflow-x-auto",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.3
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-gray-700/50",
                                children: [
                                    [
                                        {
                                            key: 'name',
                                            label: 'Company'
                                        },
                                        {
                                            key: 'currentPrice',
                                            label: 'Price'
                                        },
                                        {
                                            key: 'change',
                                            label: 'Change (24h)'
                                        },
                                        {
                                            key: 'volume',
                                            label: 'Volume'
                                        },
                                        {
                                            key: 'marketCap',
                                            label: 'Market Cap'
                                        }
                                    ].map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left py-4 px-4 text-gray-300 font-medium cursor-pointer    hover:text-white transition-colors duration-200",
                                            onClick: ()=>handleSort(key),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 21
                                                    }, this),
                                                    sortField === key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: `w-4 h-4 transition-transform duration-200 ${sortDirection === 'desc' ? 'rotate-180' : ''}`,
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M5 15l7-7 7 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                lineNumber: 314,
                                                columnNumber: 19
                                            }, this)
                                        }, key, false, {
                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                            lineNumber: 308,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left py-4 px-4 text-gray-300 font-medium",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: sortedAndFilteredCompanies.map((company, index)=>{
                                const changeColor = (company.change || 0) >= 0 ? 'text-green-400' : 'text-red-400';
                                const changePrefix = (company.change || 0) >= 0 ? '+' : '';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].tr, {
                                    className: "border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors duration-200",
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        duration: 0.3,
                                        delay: index * 0.05
                                    },
                                    whileHover: {
                                        scale: 1.01
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500    flex items-center justify-center text-white font-bold relative",
                                                        children: [
                                                            company.logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: company.logo,
                                                                alt: `${company.name} logo`,
                                                                width: 40,
                                                                height: 40,
                                                                className: "object-cover rounded-full",
                                                                onError: (e)=>{
                                                                    // Fallback to symbol if image fails
                                                                    e.currentTarget.style.display = 'none';
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                                lineNumber: 353,
                                                                columnNumber: 27
                                                            }, this) : null,
                                                            !company.logo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-bold",
                                                                children: company.symbol ? company.symbol.charAt(0) : company.name.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                                lineNumber: 366,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "absolute inset-0 flex items-center justify-center text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 hover:opacity-100 transition-opacity",
                                                                children: company.symbol ? company.symbol.charAt(0) : company.name.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-white",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: company.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                                    lineNumber: 377,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: company.symbol || formatAddress(company.id.toString())
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                                    lineNumber: 380,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                                lineNumber: 379,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                lineNumber: 349,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                            lineNumber: 348,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-white",
                                                children: [
                                                    company.currentPrice,
                                                    " DSTK"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                lineNumber: 386,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                            lineNumber: 385,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `py-4 px-4 font-semibold ${changeColor}`,
                                            children: [
                                                changePrefix,
                                                company.change?.toFixed(2) || '0.00',
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                            lineNumber: 390,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-4 text-gray-300",
                                            children: formatNumber(company.volume || 0)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                            lineNumber: 393,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-4 text-gray-300",
                                            children: [
                                                formatNumber(company.marketCap || 0),
                                                " DSTK"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                            lineNumber: 396,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                onClick: ()=>router.push(`/company/${company.id}`),
                                                className: "px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600    hover:from-blue-700 hover:to-purple-700 rounded-lg    transition-all duration-200 text-sm font-medium text-white",
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: 0.95
                                                },
                                                children: "Trade"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/components/CompanyList.tsx",
                                                lineNumber: 400,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                                            lineNumber: 399,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, company.id, true, {
                                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                                    lineNumber: 340,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/components/CompanyList.tsx",
                            lineNumber: 334,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/CompanyList.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/CompanyList.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            sortedAndFilteredCompanies.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                className: "text-center py-12 text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg font-medium mb-2",
                        children: "No companies found"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm",
                        children: searchTerm ? `No results for "${searchTerm}"` : 'No companies available'
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/CompanyList.tsx",
                        lineNumber: 425,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/CompanyList.tsx",
                lineNumber: 419,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/CompanyList.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_s(CompanyList, "bVaFU1GQbb1/nu5ME0wUN4vWV10=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$hooks$2f$useDeStock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeStock"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CompanyList;
var _c;
__turbopack_context__.k.register(_c, "CompanyList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/components/TradingChart.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TradingChart": (()=>TradingChart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bar$2d$chart$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bar-chart-3.js [app-client] (ecmascript) <export default as BarChart3Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$line$2d$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChartIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/line-chart.js [app-client] (ecmascript) <export default as LineChartIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LoadingSpinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/LoadingSpinner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Stable empty array reference to prevent unnecessary re-renders
const EMPTY_DATA = [];
function TradingChart({ symbol = 'DEMO', data = EMPTY_DATA, height = 400, showTimeframes = true, showIndicators = true, className = '' }) {
    _s();
    const chartContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const candlestickSeriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(EMPTY_DATA);
    const [selectedTimeframe, setSelectedTimeframe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1D');
    const [chartType, setChartType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('candlestick');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [chartData, setChartData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const timeframes = [
        '1H',
        '4H',
        '1D',
        '1W',
        '1M'
    ];
    // Initialize chart
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!chartContainerRef.current) return;
            const isDark = theme === 'dark';
            const chart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChart"])(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height,
                layout: {
                    background: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorType"].Solid,
                        color: 'transparent'
                    },
                    textColor: isDark ? '#E5E7EB' : '#374151'
                },
                grid: {
                    vertLines: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    horzLines: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                crosshair: {
                    mode: 1
                },
                timeScale: {
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    timeVisible: true,
                    secondsVisible: false
                },
                rightPriceScale: {
                    borderColor: isDark ? '#374151' : '#D1D5DB'
                }
            });
            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#00D4AA',
                downColor: '#F6465D',
                borderDownColor: '#F6465D',
                borderUpColor: '#00D4AA',
                wickDownColor: '#F6465D',
                wickUpColor: '#00D4AA'
            });
            chartRef.current = chart;
            candlestickSeriesRef.current = candlestickSeries;
            // Handle resize
            const handleResize = {
                "TradingChart.useEffect.handleResize": ()=>{
                    if (chartContainerRef.current && chartRef.current) {
                        chartRef.current.applyOptions({
                            width: chartContainerRef.current.clientWidth
                        });
                    }
                }
            }["TradingChart.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "TradingChart.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    if (chartRef.current) {
                        chartRef.current.remove();
                        chartRef.current = null;
                        candlestickSeriesRef.current = null;
                    }
                }
            })["TradingChart.useEffect"];
        }
    }["TradingChart.useEffect"], [
        height,
        theme
    ]);
    // Update chart theme
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!chartRef.current) return;
            const isDark = theme === 'dark';
            chartRef.current.applyOptions({
                layout: {
                    background: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorType"].Solid,
                        color: 'transparent'
                    },
                    textColor: isDark ? '#E5E7EB' : '#374151'
                },
                grid: {
                    vertLines: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    horzLines: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                timeScale: {
                    borderColor: isDark ? '#374151' : '#D1D5DB'
                },
                rightPriceScale: {
                    borderColor: isDark ? '#374151' : '#D1D5DB'
                }
            });
        }
    }["TradingChart.useEffect"], [
        theme
    ]);
    // Handle prop data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            // Only update if data reference actually changed and has content
            if (data !== dataRef.current && data.length > 0 && data !== EMPTY_DATA) {
                console.log('TradingChart: Using provided data', data.length, 'points');
                dataRef.current = data;
                setChartData(data);
                setLoading(false);
            }
        }
    }["TradingChart.useEffect"], [
        data
    ]);
    // Load chart data from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            const loadData = {
                "TradingChart.useEffect.loadData": async ()=>{
                    // Skip API loading if data is provided via props
                    if (data.length > 0 && data !== EMPTY_DATA) {
                        return;
                    }
                    console.log('TradingChart: Loading data from API', {
                        symbol,
                        selectedTimeframe
                    });
                    setLoading(true);
                    try {
                        // Fetch data from API
                        const response = await fetch(`/api/market?type=chart&symbol=${symbol}&timeframe=${selectedTimeframe}&days=30`);
                        const result = await response.json();
                        if (response.ok && result.data && result.data.ohlc) {
                            const apiData = result.data.ohlc || [];
                            // Convert to proper format for Lightweight Charts
                            const formattedData = apiData.map({
                                "TradingChart.useEffect.loadData.formattedData": (item)=>({
                                        ...item,
                                        time: item.time
                                    })
                            }["TradingChart.useEffect.loadData.formattedData"]);
                            console.log('TradingChart: API data loaded', formattedData.length, 'points');
                            setChartData(formattedData);
                        } else {
                            console.warn('Failed to fetch chart data:', result);
                            // Set empty data to stop loading
                            setChartData([]);
                        }
                        setLoading(false);
                    } catch (error) {
                        console.error('Failed to load chart data:', error);
                        setChartData([]);
                        setLoading(false);
                    }
                }
            }["TradingChart.useEffect.loadData"];
            loadData();
        }
    }["TradingChart.useEffect"], [
        symbol,
        selectedTimeframe
    ]);
    // Update chart data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradingChart.useEffect": ()=>{
            if (!candlestickSeriesRef.current || chartData.length === 0) return;
            candlestickSeriesRef.current.setData(chartData);
            // Fit content after data is loaded
            if (chartRef.current) {
                chartRef.current.timeScale().fitContent();
            }
        }
    }["TradingChart.useEffect"], [
        chartData
    ]);
    const handleTimeframeChange = (timeframe)=>{
        setSelectedTimeframe(timeframe);
    };
    const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].close : 0;
    const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].close : currentPrice;
    const priceChange = currentPrice - previousPrice;
    const priceChangePercent = previousPrice > 0 ? priceChange / previousPrice * 100 : 0;
    const isPositive = priceChange >= 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-white/10 dark:border-black/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900 dark:text-gray-100",
                                        children: symbol
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                                        lineNumber: 230,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-gray-900 dark:text-gray-100",
                                                children: [
                                                    "$",
                                                    currentPrice.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/TradingChart.tsx",
                                                lineNumber: 236,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex items-center space-x-1 ${isPositive ? 'text-success' : 'text-danger'}`,
                                                children: [
                                                    isPositive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 19
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDownIcon$3e$__["TrendingDownIcon"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: [
                                                            isPositive ? '+' : '',
                                                            priceChange.toFixed(2),
                                                            " (",
                                                            priceChangePercent.toFixed(2),
                                                            "%)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/components/TradingChart.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/TradingChart.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>setChartType('candlestick'),
                                        className: `p-2 rounded-md transition-colors duration-200 ${chartType === 'candlestick' ? 'bg-destock-primary text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`,
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bar$2d$chart$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3Icon$3e$__["BarChart3Icon"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradingChart.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>setChartType('line'),
                                        className: `p-2 rounded-md transition-colors duration-200 ${chartType === 'line' ? 'bg-destock-primary text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`,
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$line$2d$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChartIcon$3e$__["LineChartIcon"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/TradingChart.tsx",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/TradingChart.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this),
                    showTimeframes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-1",
                        children: timeframes.map((timeframe)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>handleTimeframeChange(timeframe),
                                className: `px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${selectedTimeframe === timeframe ? 'bg-destock-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`,
                                whileTap: {
                                    scale: 0.95
                                },
                                children: timeframe
                            }, timeframe, false, {
                                fileName: "[project]/apps/web/components/TradingChart.tsx",
                                lineNumber: 283,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/TradingChart.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$LoadingSpinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingSpinner"], {}, void 0, false, {
                            fileName: "[project]/apps/web/components/TradingChart.tsx",
                            lineNumber: 304,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        ref: chartContainerRef,
                        className: `${loading ? 'opacity-30' : 'opacity-100'} transition-opacity duration-200`,
                        initial: {
                            opacity: 0,
                            scale: 0.95
                        },
                        animate: {
                            opacity: loading ? 0.3 : 1,
                            scale: 1
                        },
                        transition: {
                            duration: 0.3
                        },
                        style: {
                            height: `${height}px`
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/TradingChart.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/TradingChart.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-white/10 dark:border-black/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 gap-4 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 dark:text-gray-400 block",
                                    children: "Open"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-gray-900 dark:text-gray-100",
                                    children: [
                                        "$",
                                        chartData.length > 0 ? chartData[chartData.length - 1].open.toFixed(2) : '0.00'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TradingChart.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 dark:text-gray-400 block",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-success",
                                    children: [
                                        "$",
                                        chartData.length > 0 ? chartData[chartData.length - 1].high.toFixed(2) : '0.00'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TradingChart.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 dark:text-gray-400 block",
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 334,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-danger",
                                    children: [
                                        "$",
                                        chartData.length > 0 ? chartData[chartData.length - 1].low.toFixed(2) : '0.00'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TradingChart.tsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 dark:text-gray-400 block",
                                    children: "Volume"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 340,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-gray-900 dark:text-gray-100",
                                    children: chartData.length > 0 ? (chartData[chartData.length - 1].volume || 0).toLocaleString() : '0'
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/components/TradingChart.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/components/TradingChart.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/TradingChart.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/TradingChart.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s(TradingChart, "xLmgt+i2f1Itvbt1fENYS/FoOLs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = TradingChart;
var _c;
__turbopack_context__.k.register(_c, "TradingChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/components/MarketHeatMap.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MarketHeatMap": (()=>MarketHeatMap)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/companyUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MarketHeatMap({ className }) {
    _s();
    const [heatMapData, setHeatMapData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketHeatMap.useEffect": ()=>{
            loadHeatMapData();
        }
    }["MarketHeatMap.useEffect"], []);
    const loadHeatMapData = async ()=>{
        try {
            const response = await fetch('/api/market?type=heatmap');
            const result = await response.json();
            setHeatMapData(result.heatmap || []);
        } catch (error) {
            console.error('Failed to load heatmap data:', error);
            // Fallback to real token data
            const companies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCompanies"])().slice(0, 12);
            const fallbackData = companies.map((company)=>{
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
            setHeatMapData(fallbackData);
        } finally{
            setLoading(false);
        }
    };
    const getColorByChange = (change)=>{
        if (change > 5) return 'from-green-500 to-green-600';
        if (change > 2) return 'from-green-400 to-green-500';
        if (change > 0) return 'from-green-300 to-green-400';
        if (change > -2) return 'from-red-300 to-red-400';
        if (change > -5) return 'from-red-400 to-red-500';
        return 'from-red-500 to-red-600';
    };
    const getTextColor = (change)=>{
        return Math.abs(change) > 3 ? 'text-white' : 'text-gray-800';
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `glass-card p-6 ${className}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
                    children: "Market Heat Map"
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 md:grid-cols-6 gap-2",
                    children: [
                        ...Array(12)
                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-square rounded-lg bg-gray-700/30 animate-pulse"
                        }, i, false, {
                            fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: `glass-card p-6 ${className}`,
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
            delay: 0.4
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
                children: "Market Heat Map"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 md:grid-cols-6 gap-2",
                children: heatMapData.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: `
              aspect-square rounded-lg p-2 cursor-pointer
              bg-gradient-to-br ${getColorByChange(item.change)}
              hover:scale-105 transition-all duration-200
              flex flex-col justify-between
              ${getTextColor(item.change)}
            `,
                        style: {
                            minHeight: `${Math.max(item.size, 60)}px`,
                            opacity: 0.8 + Math.abs(item.change) / 20 * 0.2
                        },
                        initial: {
                            opacity: 0,
                            scale: 0.8
                        },
                        animate: {
                            opacity: 0.8 + Math.abs(item.change) / 20 * 0.2,
                            scale: 1
                        },
                        transition: {
                            duration: 0.3,
                            delay: index * 0.05
                        },
                        whileHover: {
                            scale: 1.05,
                            opacity: 1,
                            transition: {
                                duration: 0.2
                            }
                        },
                        title: `${item.name} (${item.symbol}): ${item.change > 0 ? '+' : ''}${item.change.toFixed(2)}%`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-semibold truncate",
                                children: item.symbol
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-bold",
                                children: [
                                    item.change > 0 ? '+' : '',
                                    item.change.toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between text-xs text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded bg-gradient-to-r from-green-400 to-green-500"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Positive"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded bg-gradient-to-r from-red-400 to-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Negative"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs",
                        children: "Size = Market Cap | Color = 24h Change"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/MarketHeatMap.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(MarketHeatMap, "JJClNPmKIumRt2So/VtLLhQa/Ts=");
_c = MarketHeatMap;
var _c;
__turbopack_context__.k.register(_c, "MarketHeatMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/components/PriceTicker.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PriceTicker": (()=>PriceTicker)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$AnimatedCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/AnimatedCounter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/utils/companyUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PriceTicker({ speed = 50, direction = 'left', className = '', pauseOnHover = true }) {
    _s();
    const [tickerData, setTickerData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PriceTicker.useEffect": ()=>{
            const fetchTickerData = {
                "PriceTicker.useEffect.fetchTickerData": async ()=>{
                    try {
                        const response = await fetch('/api/market?type=ticker');
                        const result = await response.json();
                        setTickerData(result.ticker || []);
                    } catch (error) {
                        console.error('Failed to fetch ticker data:', error);
                        // Fallback to real token data
                        const companies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$utils$2f$companyUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCompanies"])().slice(0, 10);
                        const fallbackData = companies.map({
                            "PriceTicker.useEffect.fetchTickerData.fallbackData": (company)=>({
                                    symbol: company.symbol,
                                    name: company.name,
                                    price: parseFloat(company.price.replace('$', '')),
                                    change: (Math.random() - 0.5) * 10,
                                    changePercent: (Math.random() - 0.5) * 15,
                                    volume: Math.floor(Math.random() * 1000000)
                                })
                        }["PriceTicker.useEffect.fetchTickerData.fallbackData"]);
                        setTickerData(fallbackData);
                    } finally{
                        setLoading(false);
                    }
                }
            }["PriceTicker.useEffect.fetchTickerData"];
            fetchTickerData();
            // Update ticker data every 30 seconds
            const interval = setInterval(fetchTickerData, 30000);
            return ({
                "PriceTicker.useEffect": ()=>clearInterval(interval)
            })["PriceTicker.useEffect"];
        }
    }["PriceTicker.useEffect"], []);
    // Real-time price updates simulation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PriceTicker.useEffect": ()=>{
            if (tickerData.length === 0) return;
            const interval = setInterval({
                "PriceTicker.useEffect.interval": ()=>{
                    setTickerData({
                        "PriceTicker.useEffect.interval": (prev)=>prev.map({
                                "PriceTicker.useEffect.interval": (item)=>{
                                    const changePercent = (Math.random() - 0.5) * 0.5; // ±0.25%
                                    const newPrice = item.price * (1 + changePercent / 100);
                                    const priceChange = newPrice - item.price;
                                    return {
                                        ...item,
                                        price: Number(newPrice.toFixed(2)),
                                        change: Number(priceChange.toFixed(2)),
                                        changePercent: Number((priceChange / item.price * 100).toFixed(2))
                                    };
                                }
                            }["PriceTicker.useEffect.interval"])
                    }["PriceTicker.useEffect.interval"]);
                }
            }["PriceTicker.useEffect.interval"], 5000);
            return ({
                "PriceTicker.useEffect": ()=>clearInterval(interval)
            })["PriceTicker.useEffect"];
        }
    }["PriceTicker.useEffect"], [
        tickerData.length
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `glass-card h-16 flex items-center justify-center ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-4",
                children: Array.from({
                    length: 5
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2 animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/apps/web/components/PriceTicker.tsx",
                        lineNumber: 93,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/components/PriceTicker.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/components/PriceTicker.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card overflow-hidden relative ${className}`,
        onMouseEnter: ()=>pauseOnHover && setIsPaused(true),
        onMouseLeave: ()=>pauseOnHover && setIsPaused(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-16 flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "flex space-x-8 whitespace-nowrap",
                    animate: {
                        x: direction === 'left' ? '-50%' : '50%'
                    },
                    transition: {
                        duration: speed,
                        repeat: Infinity,
                        ease: 'linear'
                    },
                    style: {
                        animationPlayState: isPaused ? 'paused' : 'running'
                    },
                    children: [
                        ...tickerData,
                        ...tickerData
                    ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "flex items-center space-x-3 min-w-fit",
                            whileHover: pauseOnHover ? {
                                scale: 1.05
                            } : {},
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-gray-900 dark:text-gray-100",
                                    children: item.symbol
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$AnimatedCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedCounter"], {
                                    value: item.price,
                                    format: "currency",
                                    decimals: 2,
                                    className: "font-medium text-gray-900 dark:text-gray-100"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex items-center space-x-1 ${item.change >= 0 ? 'text-success' : 'text-danger'}`,
                                    children: [
                                        item.change >= 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUpIcon$3e$__["TrendingUpIcon"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                            lineNumber: 147,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDownIcon$3e$__["TrendingDownIcon"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium",
                                            children: [
                                                item.change >= 0 ? '+' : '',
                                                item.change.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: [
                                                "(",
                                                item.changePercent >= 0 ? '+' : '',
                                                item.changePercent.toFixed(2),
                                                "%)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-500 dark:text-gray-400",
                                    children: [
                                        "Vol: ",
                                        (item.volume / 1000000).toFixed(1),
                                        "M"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/components/PriceTicker.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `${item.symbol}-${index}`, true, {
                            fileName: "[project]/apps/web/components/PriceTicker.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/components/PriceTicker.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/components/PriceTicker.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/PriceTicker.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/apps/web/components/PriceTicker.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/components/PriceTicker.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s(PriceTicker, "VlLJ8OtN31vBO/6U0cyCS7tJydQ=");
_c = PriceTicker;
var _c;
__turbopack_context__.k.register(_c, "PriceTicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$DashboardGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/DashboardGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$TradeView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/TradeView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$CompanyList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/CompanyList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$TradingChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/TradingChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$MarketHeatMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/MarketHeatMap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$PriceTicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/components/PriceTicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function HomePage() {
    _s();
    // Memoize widget components to prevent re-creation on every render
    const widgets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[widgets]": ()=>[
                {
                    id: 'trading',
                    title: 'Trading Interface',
                    component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$TradeView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TradeView"], {}, void 0, false, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 18,
                        columnNumber: 18
                    }, this),
                    defaultSize: 40,
                    minSize: 30
                },
                {
                    id: 'chart',
                    title: 'Price Chart',
                    component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$TradingChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TradingChart"], {
                        symbol: "DSTK",
                        height: 350
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 25,
                        columnNumber: 18
                    }, this),
                    defaultSize: 60,
                    minSize: 40
                }
            ]
    }["HomePage.useMemo[widgets]"], []);
    const bottomWidgets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[bottomWidgets]": ()=>[
                {
                    id: 'companies',
                    title: 'Market Overview',
                    component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$CompanyList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompanyList"], {}, void 0, false, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 35,
                        columnNumber: 18
                    }, this),
                    defaultSize: 60,
                    minSize: 50
                },
                {
                    id: 'heatmap',
                    title: 'Market Heat Map',
                    component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$MarketHeatMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarketHeatMap"], {}, void 0, false, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 42,
                        columnNumber: 18
                    }, this),
                    defaultSize: 40,
                    minSize: 30
                }
            ]
    }["HomePage.useMemo[bottomWidgets]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "space-y-6",
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "text-center glass-card p-8",
                initial: {
                    opacity: 0,
                    y: -20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.1,
                    duration: 0.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4",
                        children: "Welcome to DeStock"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto",
                        children: "The professional decentralized trading platform with advanced charting, real-time analytics, and seamless Web3 integration. Trade company shares using DSTK tokens with institutional-grade tools."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    x: -50
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                transition: {
                    delay: 0.2,
                    duration: 0.5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$PriceTicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceTicker"], {}, void 0, false, {
                    fileName: "[project]/apps/web/app/page.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.95
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                transition: {
                    delay: 0.3,
                    duration: 0.5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$DashboardGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardGrid"], {
                    widgets: widgets
                }, void 0, false, {
                    fileName: "[project]/apps/web/app/page.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/page.tsx",
                lineNumber: 82,
                columnNumber: 7
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
                    delay: 0.4,
                    duration: 0.5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$components$2f$DashboardGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardGrid"], {
                    widgets: bottomWidgets,
                    layout: "grid"
                }, void 0, false, {
                    fileName: "[project]/apps/web/app/page.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(HomePage, "aV1UJPLzpKHGjtKXcEFhloIxAR0=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_web_dc977420._.js.map