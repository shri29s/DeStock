// Animation utility functions and presets for consistent animations

export const animationVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },

  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },

  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

// Easing functions
export const easingFunctions = {
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  smooth: { duration: 0.3, ease: 'easeInOut' },
  quick: { duration: 0.15, ease: 'easeOut' },
  bounce: { type: 'spring', stiffness: 400, damping: 10 },
};

// Common transition presets
export const transitionPresets = {
  default: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth feel
  },
  fast: {
    duration: 0.15,
    ease: [0.4, 0, 0.2, 1],
  },
  slow: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1],
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  bouncySpring: {
    type: 'spring',
    stiffness: 400,
    damping: 15,
  },
};

// Button hover animations
export const buttonAnimations = {
  hover: {
    scale: 1.05,
    transition: transitionPresets.fast,
  },
  tap: {
    scale: 0.95,
    transition: transitionPresets.fast,
  },
};

// Card hover animations
export const cardAnimations = {
  hover: {
    y: -4,
    scale: 1.02,
    transition: transitionPresets.default,
  },
  tap: {
    scale: 0.98,
    transition: transitionPresets.fast,
  },
};

// Page transition animations
export const pageTransitions = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: transitionPresets.default,
};

// Widget entrance animations
export const widgetAnimations = {
  container: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: transitionPresets.spring,
    },
  },
};

// Number counter animations
export const counterAnimations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: transitionPresets.spring,
};

// Theme switching animations
export const themeTransitions = {
  duration: 0.3,
  ease: 'easeInOut',
};

// Chart animations
export const chartAnimations = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Utility function to create stagger animations
export const createStaggerAnimation = (
  children: number, 
  delay: number = 0.1
) => ({
  animate: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
    },
  },
});

// Utility function for reduced motion support
export const getReducedMotionPreference = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Apply reduced motion variants
export const applyReducedMotion = (variants: any) => {
  if (getReducedMotionPreference()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return variants;
};

// Loading spinner animations
export const spinnerAnimations = {
  rotate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
