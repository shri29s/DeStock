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
  const [displayValue, setDisplayValue] = useState(value);
  const [isChanging, setIsChanging] = useState(false);

  const springValue = useSpring(value, {
    stiffness: 100,
    damping: 15,
  });

  const displayNumber = useTransform(springValue, (latest) => {
    let formatted: string;
    
    switch (format) {
      case 'currency':
        formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
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
  });

  useEffect(() => {
    if (value !== displayValue) {
      setIsChanging(true);
      springValue.set(value);
      setDisplayValue(value);
      
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [value, displayValue, springValue, duration]);

  const getChangeColor = () => {
    if (!colorChange || previousValue === undefined) return '';
    
    if (value > previousValue) return 'text-success';
    if (value < previousValue) return 'text-danger';
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
