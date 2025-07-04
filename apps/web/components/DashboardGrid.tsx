'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { WidgetWrapper } from './WidgetWrapper';

interface Widget {
  id: string;
  title: string;
  component: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  collapsible?: boolean;
}

interface DashboardGridProps {
  widgets: Widget[];
  layout?: 'grid' | 'tabs';
  className?: string;
}

export function DashboardGrid({ widgets, layout = 'grid', className = '' }: DashboardGridProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [collapsedWidgets, setCollapsedWidgets] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleWidget = (widgetId: string) => {
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
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Tab Navigation */}
        <div className="flex space-x-1 glass-card p-1 rounded-lg">
          {widgets.map((widget, index) => (
            <motion.button
              key={widget.id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === index
                  ? 'bg-destock-primary text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {widget.title}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <WidgetWrapper
            title={widgets[activeTab].title}
            id={widgets[activeTab].id}
            onToggle={() => toggleWidget(widgets[activeTab].id)}
            isCollapsed={collapsedWidgets.has(widgets[activeTab].id)}
            showControls={false}
          >
            {widgets[activeTab].component}
          </WidgetWrapper>
        </motion.div>
      </div>
    );
  }

  // Desktop layout - use resizable panels
  return (
    <motion.div 
      className={`h-[calc(100vh-200px)] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PanelGroup direction="horizontal" className="space-x-4">
        {widgets.map((widget, index) => (
          <Panel
            key={widget.id}
            defaultSize={widget.defaultSize || 50}
            minSize={widget.minSize || 20}
            collapsible={widget.collapsible}
          >
            <motion.div
              className="h-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <WidgetWrapper
                title={widget.title}
                id={widget.id}
                onToggle={() => toggleWidget(widget.id)}
                isCollapsed={collapsedWidgets.has(widget.id)}
                className="h-full"
              >
                {!collapsedWidgets.has(widget.id) && widget.component}
              </WidgetWrapper>
            </motion.div>
            
            {/* Resize Handle */}
            {index < widgets.length - 1 && (
              <PanelResizeHandle className="w-4 flex items-center justify-center">
                <div className="w-1 h-8 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200" />
              </PanelResizeHandle>
            )}
          </Panel>
        ))}
      </PanelGroup>
    </motion.div>
  );
}
