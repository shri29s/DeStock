'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'dots' | 'bars';
  className?: string;
  overlay?: boolean;
}

export function LoadingSpinner({ 
  size = 'medium', 
  variant = 'circular', 
  className = '',
  overlay = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  if (variant === 'circular') {
    return (
      <div className={clsx(
        'flex items-center justify-center',
        overlay && 'fixed inset-0 glass-modal z-50',
        className
      )}>
        <motion.div
          className={clsx(
            'border-2 border-destock-primary/20 border-t-destock-primary rounded-full',
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={clsx(
        'flex items-center justify-center space-x-1',
        overlay && 'fixed inset-0 glass-modal z-50',
        className
      )}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-destock-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className={clsx(
        'flex items-center justify-center space-x-1',
        overlay && 'fixed inset-0 glass-modal z-50',
        className
      )}>
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="w-1 bg-destock-primary rounded-full"
            style={{ height: size === 'small' ? 16 : size === 'medium' ? 24 : 32 }}
            animate={{
              scaleY: [1, 2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
