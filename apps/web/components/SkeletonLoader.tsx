'use client';

import { clsx } from 'clsx';

interface SkeletonLoaderProps {
  variant?: 'card' | 'table' | 'chart' | 'text' | 'avatar' | 'button';
  count?: number;
  className?: string;
  height?: string;
  width?: string;
}

export function SkeletonLoader({ 
  variant = 'card', 
  count = 1, 
  className = '',
  height,
  width 
}: SkeletonLoaderProps) {
  const baseClasses = 'skeleton-shimmer rounded-md bg-gray-200 dark:bg-gray-700';

  const variants = {
    card: 'glass-card p-4 space-y-3',
    table: 'space-y-2',
    chart: 'glass-card p-6',
    text: 'h-4',
    avatar: 'rounded-full',
    button: 'h-10 rounded-md',
  };

  const renderSkeleton = (index: number) => {
    if (variant === 'card') {
      return (
        <div key={index} className={clsx(variants.card, className)}>
          <div className={clsx(baseClasses, 'h-6 w-3/4')} />
          <div className={clsx(baseClasses, 'h-4 w-1/2')} />
          <div className={clsx(baseClasses, 'h-4 w-full')} />
          <div className={clsx(baseClasses, 'h-8 w-24')} />
        </div>
      );
    }

    if (variant === 'table') {
      return (
        <div key={index} className={clsx(variants.table, className)}>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-4">
              <div className={clsx(baseClasses, 'h-4 w-1/4')} />
              <div className={clsx(baseClasses, 'h-4 w-1/3')} />
              <div className={clsx(baseClasses, 'h-4 w-1/6')} />
              <div className={clsx(baseClasses, 'h-4 w-1/4')} />
            </div>
          ))}
        </div>
      );
    }

    if (variant === 'chart') {
      return (
        <div key={index} className={clsx(variants.chart, className)}>
          <div className={clsx(baseClasses, 'h-6 w-48 mb-4')} />
          <div className={clsx(baseClasses, 'h-64 w-full')} />
          <div className="flex justify-between mt-4">
            <div className={clsx(baseClasses, 'h-4 w-16')} />
            <div className={clsx(baseClasses, 'h-4 w-16')} />
            <div className={clsx(baseClasses, 'h-4 w-16')} />
            <div className={clsx(baseClasses, 'h-4 w-16')} />
          </div>
        </div>
      );
    }

    if (variant === 'text') {
      return (
        <div
          key={index}
          className={clsx(
            baseClasses,
            variants.text,
            className
          )}
          style={{ height, width }}
        />
      );
    }

    if (variant === 'avatar') {
      return (
        <div
          key={index}
          className={clsx(
            baseClasses,
            variants.avatar,
            'w-10 h-10',
            className
          )}
          style={{ height, width }}
        />
      );
    }

    if (variant === 'button') {
      return (
        <div
          key={index}
          className={clsx(
            baseClasses,
            variants.button,
            'w-24',
            className
          )}
          style={{ height, width }}
        />
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </div>
  );
}
