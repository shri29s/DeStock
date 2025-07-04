/**
 * Utility functions for safe number handling
 */

/**
 * Safely parse a value to a number, returning 0 if invalid
 */
export function safeParseFloat(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
}

/**
 * Safely parse a value to an integer, returning 0 if invalid
 */
export function safeParseInt(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return Math.floor(value);
  }
  
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
}

/**
 * Format a number for display with safe handling
 */
export function formatNumber(
  value: unknown, 
  options: {
    decimals?: number;
    prefix?: string;
    suffix?: string;
    defaultValue?: number;
  } = {}
): string {
  const { decimals = 2, prefix = '', suffix = '', defaultValue = 0 } = options;
  const safeValue = safeParseFloat(value, defaultValue);
  
  return `${prefix}${safeValue.toFixed(decimals)}${suffix}`;
}

/**
 * Check if a value is a valid finite number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
}
