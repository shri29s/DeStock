'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MinusIcon, XIcon, SettingsIcon, GripVerticalIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { LoadingSpinner } from './LoadingSpinner';

interface WidgetWrapperProps {
  title: string;
  id: string;
  children?: ReactNode;
  className?: string;
  isCollapsed?: boolean;
  isLoading?: boolean;
  error?: string;
  onToggle?: () => void;
  onClose?: () => void;
  onSettings?: () => void;
  showControls?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  size?: 'small' | 'medium' | 'large' | 'full';
}

export function WidgetWrapper({
  title,
  id,
  children,
  className = '',
  isCollapsed = false,
  isLoading = false,
  error,
  onToggle,
  onClose,
  onSettings,
  showControls = true,
  draggable = true,
  resizable = true,
  size = 'medium',
}: WidgetWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'min-h-[200px]',
    medium: 'min-h-[300px]',
    large: 'min-h-[400px]',
    full: 'h-full',
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <motion.div
      className={clsx(
        'glass-card widget-enter',
        sizeClasses[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      role="region"
      aria-labelledby={`widget-${id}-title`}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-black/10">
        <div className="flex items-center space-x-2">
          {draggable && (
            <motion.div
              className="cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GripVerticalIcon className="w-4 h-4" />
            </motion.div>
          )}
          <h3 
            id={`widget-${id}-title`}
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            {title}
          </h3>
        </div>

        {/* Widget Controls */}
        {showControls && (
          <AnimatePresence>
            {(isHovered || isCollapsed) && (
              <motion.div
                className="flex items-center space-x-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {onSettings && (
                  <motion.button
                    onClick={onSettings}
                    onKeyDown={(e) => handleKeyDown(e, onSettings)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Settings for ${title}`}
                  >
                    <SettingsIcon className="w-4 h-4" />
                  </motion.button>
                )}
                
                {onToggle && (
                  <motion.button
                    onClick={onToggle}
                    onKeyDown={(e) => handleKeyDown(e, onToggle)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={isCollapsed ? `Expand ${title}` : `Collapse ${title}`}
                  >
                    <MinusIcon className="w-4 h-4" />
                  </motion.button>
                )}
                
                {onClose && (
                  <motion.button
                    onClick={onClose}
                    onKeyDown={(e) => handleKeyDown(e, onClose)}
                    className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Close ${title}`}
                  >
                    <XIcon className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Widget Content */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            className="p-4 h-full overflow-auto custom-scrollbar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {error ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-red-500 dark:text-red-400 text-sm font-medium mb-2">
                    Error loading widget
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {error}
                  </div>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center h-32">
                <LoadingSpinner />
              </div>
            ) : (
              children
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resize Handle */}
      {resizable && !isCollapsed && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="w-full h-full bg-gray-400 dark:bg-gray-600 transform rotate-45 translate-x-2 translate-y-2" />
        </div>
      )}
    </motion.div>
  );
}
