import React, { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScrollDown = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Characters for the animated name
  const nameChars = "Ati".split("");
  
  // Simulate typing animation for intro command
  const introCommand = "echo \"Hello, I'm\"";
  const introChars = introCommand.split("");

  return (
    <section 
      ref={ref} 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Japanese Matrix Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <HeroCanvas />
      </div>
      
      {/* Background dot pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full grid grid-cols-[repeat(auto-fill,16px)] grid-rows-[repeat(auto-fill,16px)] gap-8">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-accent rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle scanline effect */}
      <div className="absolute inset-0 z-0 bg-scanline pointer-events-none"></div>
      
      <div className="section-container z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <motion.div
              className="terminal-command inline-block"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 10px rgba(58, 69, 232, 0.4)",
                backgroundColor: "rgba(58, 69, 232, 0.1)"
              }}
            >
              {introChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.05,
                    delay: 0.03 * index,
                    ease: "easeIn"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight"
          >
            <div className="flex items-center">
              {nameChars.map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  animate={{
                    color: [
                      '#f2f2f2',
                      '#3a45e8',
                      '#1a237e',
                      '#0d1b5e',
                      '#080e2f',
                      '#f2f2f2'
                    ],
                    textShadow: [
                      '0 0 5px rgba(58, 69, 232, 0.3)',
                      '0 0 20px rgba(58, 69, 232, 0.7)',
                      '0 0 15px rgba(26, 35, 126, 0.7)',
                      '0 0 12px rgba(13, 27, 94, 0.7)',
                      '0 0 8px rgba(8, 14, 47, 0.5)',
                      '0 0 5px rgba(58, 69, 232, 0.3)'
                    ],
                  }}
                  transition={{
                    duration: 8,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="text-text-primary">.</span>
            </div>
          </motion.h1>
          
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-text-secondary mt-2 mb-6 tracking-tight"
            >
            I code and stuff.
            </motion.h2>
            
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-text-secondary max-w-lg mb-10 font-light"
            >
            CS student.<br/>
            Code, chill, repeat. No drama, just vibes.
            </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                handleScrollDown();
              }}
              className="edge-button edge-button-primary"
            >
              View my work
            </a>
            <a 
              href="#contact" 
              className="edge-button edge-button-secondary"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={handleScrollDown}
      >
        <motion.span 
          className="terminal-command mb-3"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 10px rgba(100, 108, 255, 0.4)",
            backgroundColor: "rgba(100, 108, 255, 0.1)" 
          }}
        >
          cd ./projects
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
