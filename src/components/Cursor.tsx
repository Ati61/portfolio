import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Use motion values for smoother animation
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Apply spring physics for smooth movement but keep it subtle
  const springConfig = { damping: 40, stiffness: 500, mass: 0.2 };
  
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setIsVisible(true);
      
      const handleMouseMove = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };
      
      const handlePointerOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        
        // Enhanced, more specific label detection
        if (target.tagName === 'A' || target.parentElement?.tagName === 'A') {
          // Check for specific link types
          const href = target.getAttribute('href') || target.parentElement?.getAttribute('href');
          if (href) {
            if (href.startsWith('mailto:')) {
              setHoverLabel('send email');
            } else if (href.startsWith('tel:')) {
              setHoverLabel('call');
            } else if (href.startsWith('http')) {
              setHoverLabel('visit link');
            } else if (href.startsWith('#')) {
              setHoverLabel(`goto ${href.substring(1)}`);
            } else {
              setHoverLabel(target.getAttribute('aria-label') || 'link');
            }
          } else {
            setHoverLabel('link');
          }
          setIsInteractive(true);
        } else if (target.tagName === 'BUTTON' || target.closest('button')) {
          // Check for button with specific roles
          const role = target.getAttribute('role') || target.closest('button')?.getAttribute('role');
          if (role === 'submit') {
            setHoverLabel('submit');
          } else if (role === 'reset') {
            setHoverLabel('reset');
          } else {
            setHoverLabel(target.getAttribute('aria-label') || 'button');
          }
          setIsInteractive(true);
        } else if (target.tagName === 'INPUT') {
          // Different input types
          const inputType = target.getAttribute('type');
          if (inputType === 'text') {
            setHoverLabel('type text');
          } else if (inputType === 'email') {
            setHoverLabel('type email');
          } else if (inputType === 'password') {
            setHoverLabel('type password');
          } else if (inputType === 'submit') {
            setHoverLabel('submit');
          } else if (inputType === 'checkbox') {
            setHoverLabel('toggle');
          } else if (inputType === 'radio') {
            setHoverLabel('select');
          } else {
            setHoverLabel(inputType || 'input');
          }
          setIsInteractive(true);
        } else if (target.tagName === 'TEXTAREA') {
          setHoverLabel('type message');
          setIsInteractive(true);
        } else if (target.tagName === 'SELECT') {
          setHoverLabel('select option');
          setIsInteractive(true);
        } else if (target.closest('[role="button"]')) {
          setHoverLabel(target.getAttribute('aria-label') || 'click');
          setIsInteractive(true);
        } else if (target.classList.contains('terminal-command') || target.parentElement?.classList.contains('terminal-command')) {
          setHoverLabel('run command');
          setIsInteractive(true);
        } else if (target.classList.contains('edge-button') || target.parentElement?.classList.contains('edge-button')) {
          // Check for particular button text to provide more specific labels
          const buttonText = target.textContent?.trim().toLowerCase() || 
                            target.parentElement?.textContent?.trim().toLowerCase();
          if (buttonText?.includes('view')) {
            setHoverLabel('view projects');
          } else if (buttonText?.includes('contact')) {
            setHoverLabel('contact me');
          } else if (buttonText?.includes('send')) {
            setHoverLabel('send message');
          } else if (buttonText?.includes('download')) {
            setHoverLabel('download');
          } else {
            setHoverLabel('execute');
          }
          setIsInteractive(true);
        } else if (target.classList.contains('skill-bar') || target.closest('.skill-bar')) {
          setHoverLabel('view skill');
          setIsInteractive(true);
        } else if (target.tagName === 'SVG' || target.closest('svg')) {
          const ariaLabel = target.getAttribute('aria-label') || target.closest('svg')?.getAttribute('aria-label');
          setHoverLabel(ariaLabel || 'icon');
          setIsInteractive(true);
        } else {
          setHoverLabel(null);
          setIsInteractive(false);
        }
      };
      
      const handlePointerOut = () => {
        setHoverLabel(null);
        setIsInteractive(false);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handlePointerOver);
      document.addEventListener('mouseout', handlePointerOut);
      
      // Apply global cursor: none to hide default cursor
      document.body.style.cursor = 'none';
      
      // Apply cursor:none to all elements that would normally change the cursor
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          cursor: none !important;
        }
        
        /* Ensure these still have input cursor behavior visually through our custom cursor */
        input, textarea, [contenteditable="true"] {
          caret-color: #646cff; /* Match accent color */
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handlePointerOver);
        document.removeEventListener('mouseout', handlePointerOut);
        document.body.style.cursor = '';
        document.head.removeChild(style);
      };
    }
  }, [cursorX, cursorY]);

  // Position the tooltip to avoid going offscreen
  useEffect(() => {
    if (cursorRef.current && tooltipRef.current && hoverLabel) {
      const tooltip = tooltipRef.current;
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Check if tooltip would go off right edge
      if (tooltipRect.right > window.innerWidth) {
        tooltip.style.transform = 'translate(-100%, 0)';
        tooltip.style.left = '-10px';
      } else {
        tooltip.style.transform = '';
        tooltip.style.left = '24px';
      }
    }
  }, [hoverLabel]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]" // Increased z-index to be above header
        style={{
          translateX: springX,
          translateY: springY,
          x: '-50%',
          y: '-50%'
        }}
      >
        {/* Default-looking cursor with terminal style */}
        <motion.div
          className="w-6 h-6 flex items-center justify-center"
          initial={{ opacity: 0.9 }}
          animate={{ 
            opacity: 1,
            scale: isInteractive ? 1.1 : 1
          }}
          transition={{ duration: 0.1 }}
        >
          {/* Main cursor shape resembling default arrow but styled */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 16 16" 
            xmlns="http://www.w3.org/2000/svg"
            className={`${isInteractive ? 'text-accent-light' : 'text-accent'} filter drop-shadow-md transition-colors duration-300`}
          >
            <path
              fill="currentColor"
              d="M0,0 L16,7 L7,8.5 L8.5,16 L0,0"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="0.5"
            />
          </svg>
          
          {/* Terminal-style blinking indicator */}
          {isInteractive && (
            <motion.div
              className="absolute right-0 bottom-0 w-1.5 h-1.5"
              animate={{ 
                opacity: [1, 0, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1, 
                ease: "easeInOut" 
              }}
            >
              <div className="w-full h-full rounded-full bg-accent-light" />
            </motion.div>
          )}
        </motion.div>
        
        {/* Cursor tooltip/label that appears when hovering interactive elements */}
        {hoverLabel && (
          <motion.div
            ref={tooltipRef}
            className="absolute left-6 top-0 font-mono text-xs bg-bg-darker border border-accent text-accent py-1 px-2 whitespace-nowrap rounded-sm"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-text-secondary">$</span> {hoverLabel}
            <motion.span 
              className="inline-block w-1.5 h-3 ml-1 bg-accent" 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </motion.div>
        )}
      </motion.div>
      
      <style jsx global>{`
        @media (min-width: 768px) {
          /* Let the custom cursor be visible while still showing system cursors */
          body {
            cursor: none;
          }
          
          /* Show appropriate system cursors for specific interactions */
          a, button, [role="button"], .edge-button, .terminal-command {
            cursor: none;
          }
          
          input, textarea, select {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}
