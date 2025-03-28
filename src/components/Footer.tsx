import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-bg-dark pt-8 pb-6">
      <div className="container mx-auto px-6">
        <div className="divider mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-tertiary text-sm mb-4 md:mb-0">
            © {currentYear} <motion.span 
              className="inline-block"
              whileHover={{
                color: ['#666666', '#646cff', '#3a45e8', '#0d1b5e', '#666666'],
                transition: { duration: 1, times: [0, 0.25, 0.5, 0.75, 1] }
              }}
            >
              Ati
            </motion.span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="#home" className="text-text-tertiary hover:text-accent transition-colors text-sm">
              Home
            </Link>
            <Link href="#projects" className="text-text-tertiary hover:text-accent transition-colors text-sm">
              Projects
            </Link>
            <Link href="#about" className="text-text-tertiary hover:text-accent transition-colors text-sm">
              About
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-text-tertiary text-xs">
            Designed & Built by <motion.span 
              className="inline-block"
              whileHover={{
                color: '#3a45e8',
                textShadow: '0 0 5px rgba(58, 69, 232, 0.5)',
                y: -2,
                transition: { duration: 0.3 }
              }}
            >
              Ati
            </motion.span>
          </p>
        </div>
      </div>
    </footer>
  );
}
