import React from 'react';
import { motion } from 'framer-motion';

interface SectionEndIndicatorProps {
  nextSectionName?: string;
  showOnMobile?: boolean;
}

export default function SectionEndIndicator({ 
  nextSectionName = "next section", 
  showOnMobile = false 
}: SectionEndIndicatorProps) {
  // Generate a slightly randomized typing effect for each character
  const command = `cd ./${nextSectionName.toLowerCase()}`;
  const characters = command.split('');

  return (
    <div className={`${showOnMobile ? 'flex' : 'hidden md:flex'} justify-center mb-8`}>
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div 
          className="terminal-command mb-3 px-3 py-1"
          initial={{ opacity: 0.4 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 10px rgba(100, 108, 255, 0.4)",
            backgroundColor: "rgba(100, 108, 255, 0.1)"
          }}
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: 0.03 * index + 1, // Staggered delay for typing effect
                ease: "easeIn"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
