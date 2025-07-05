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

// Canvas confetti implementation for better performance
interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
}

// Default confetti configuration
const DEFAULT_CONFETTI_OPTIONS: ConfettiOptions = {
  particleCount: 100,
  angle: 90,
  spread: 50,
  startVelocity: 30,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  origin: { x: 0.5, y: 0.5 },
  colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  shapes: ['circle', 'square'],
  scalar: 1
};

// Celebration animation function
export async function celebrate(options: Partial<ConfettiOptions> = {}): Promise<void> {
  const config = { ...DEFAULT_CONFETTI_OPTIONS, ...options };
  
  try {
    // Check if canvas-confetti is available
    if (typeof window !== 'undefined') {
      // Try to use canvas-confetti library if available
      const confetti = (window as any).confetti;
      if (confetti) {
        await confetti(config);
        return;
      }
    }
    
    // Fallback to custom canvas implementation
    await fallbackConfetti(config);
  } catch (error) {
    console.warn('Celebration animation failed:', error);
    // Graceful degradation - show simple success message
    showSimpleSuccess();
  }
}

// Fallback confetti implementation using canvas
async function fallbackConfetti(options: ConfettiOptions): Promise<void> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve();
      return;
    }
    
    // Setup canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    
    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      life: number;
      maxLife: number;
    }> = [];
    
    const colors = options.colors || DEFAULT_CONFETTI_OPTIONS.colors!;
    const particleCount = options.particleCount || DEFAULT_CONFETTI_OPTIONS.particleCount!;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (options.origin?.x || 0.5) * canvas.width,
        y: (options.origin?.y || 0.5) * canvas.height,
        vx: (Math.random() - 0.5) * (options.startVelocity || 30),
        vy: -Math.random() * (options.startVelocity || 30),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
        life: options.ticks || 200,
        maxLife: options.ticks || 200
      });
    }
    
    // Animation loop
    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let activeParticles = 0;
      
      particles.forEach(particle => {
        if (particle.life > 0) {
          activeParticles++;
          
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += options.gravity || 1;
          particle.vx *= options.decay || 0.9;
          particle.life--;
          
          // Draw particle
          const alpha = particle.life / particle.maxLife;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      if (activeParticles > 0) {
        requestAnimationFrame(animate);
      } else {
        if (canvas.parentNode) {
          document.body.removeChild(canvas);
        }
        resolve();
      }
    }
    
    animate();
  });
}

// Simple success fallback
function showSimpleSuccess(): void {
  const notification = document.createElement('div');
  notification.innerHTML = '🎉 Success! Tokens added to your wallet!';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #10B981, #3B82F6);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    }, 300);
  }, 3000);
}

// Token rain animation for special occasions
export async function tokenRain(duration: number = 2000): Promise<void> {
  return celebrate({
    particleCount: 150,
    angle: 90,
    spread: 360,
    startVelocity: 20,
    decay: 0.95,
    gravity: 0.8,
    ticks: duration / 10,
    origin: { x: 0.5, y: 0 },
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    shapes: ['circle']
  });
}

// Burst animation from a specific element
export async function burstFromElement(element: HTMLElement): Promise<void> {
  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;
  
  return celebrate({
    particleCount: 80,
    angle: 90,
    spread: 70,
    startVelocity: 25,
    origin: { x, y },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6']
  });
}

// Success pulse animation for buttons
export function successPulse(element: HTMLElement): void {
  element.style.transform = 'scale(1.1)';
  element.style.transition = 'transform 0.15s ease-out';
  
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 150);
}

// Cleanup function to remove any lingering animations
export function cleanupAnimations(): void {
  // Remove any canvas elements
  const canvases = document.querySelectorAll('canvas[style*="position: fixed"]');
  canvases.forEach(canvas => {
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  });
  
  // Remove notification elements
  const notifications = document.querySelectorAll('div[style*="position: fixed"][style*="z-index: 9999"]');
  notifications.forEach(notification => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });
}
