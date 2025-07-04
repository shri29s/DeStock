'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  format?: 'currency' | 'percentage' | 'decimal' | 'integer';
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  colorChange?: boolean;
  previousValue?: number;
}

export function AnimatedCounter({
  value,
  format = 'decimal',
  decimals = 2,
  prefix = '',
  suffix = '',
  duration = 0.5,
  className = '',
  colorChange = false,
  previousValue,
}: AnimatedCounterProps) {
  // Ensure value is a valid number
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safePreviousValue = typeof previousValue === 'number' && !isNaN(previousValue) ? previousValue : undefined;
  
  const [displayValue, setDisplayValue] = useState(safeValue);
  const [isChanging, setIsChanging] = useState(false);

  const springValue = useSpring(safeValue, {
    stiffness: 100,
    damping: 15,
  });

  const displayNumber = useTransform(springValue, (latest) => {
    // Ensure latest is a valid number
    const safeLatest = typeof latest === 'number' && !isNaN(latest) ? latest : 0;
    let formatted: string;
    
    switch (format) {
      case 'currency':
        formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(safeLatest);
        break;
      case 'percentage':
        formatted = `${safeLatest.toFixed(decimals)}%`;
        break;
      case 'integer':
        formatted = Math.round(safeLatest).toLocaleString();
        break;
      case 'decimal':
      default:
        formatted = safeLatest.toFixed(decimals);
        break;
    }

    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (safeValue !== displayValue) {
      setIsChanging(true);
      springValue.set(safeValue);
      setDisplayValue(safeValue);
      
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [safeValue, displayValue, springValue, duration]);

  const getChangeColor = () => {
    if (!colorChange || safePreviousValue === undefined) return '';
    
    if (safeValue > safePreviousValue) return 'text-success';
    if (safeValue < safePreviousValue) return 'text-danger';
    return '';
  };

  return (
    <motion.span
      className={`number-counter ${getChangeColor()} ${className}`}
      animate={isChanging ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }}
      aria-live="polite"
    >
      {displayNumber}
    </motion.span>
  );
}
