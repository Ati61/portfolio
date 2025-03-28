import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SectionTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const threshold = 500; // ms between scroll events to consider it a section change

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > threshold) {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 500);
      }
      setLastScrollTime(now);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTime]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gradient-to-r from-accent to-accent-dark pointer-events-none z-50"
        />
      )}
    </AnimatePresence>
  );
}
