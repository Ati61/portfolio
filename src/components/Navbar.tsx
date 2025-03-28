import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define prop types for the Navbar component
interface NavbarProps {
  activeSection: string;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, navOpen, setNavOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setNavOpen(false); // Close mobile menu after clicking a link
  };

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-bg-dark/90 backdrop-blur-md shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div 
            className="text-accent font-bold text-2xl cursor-pointer terminal-glow cyber-text"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 20px rgba(100, 108, 255, 0.8), 0 0 40px rgba(100, 108, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('home')}
          >
            Ati
          </motion.div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {sections.map((section) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className={`nav-link relative px-1 py-2 ${
                activeSection === section.id 
                  ? 'text-accent font-medium' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
              whileHover={{ 
                scale: 1.05,
                color: "rgb(100, 108, 255)",
                transition: { duration: 0.2 }
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: section.id === 'home' ? 0.1 : 
                       section.id === 'projects' ? 0.2 :
                       section.id === 'about' ? 0.3 :
                       section.id === 'skills' ? 0.4 : 0.5
              }}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" 
                  layoutId="navIndicator"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
            </motion.a>
          ))}
        </nav>
        
        {/* Mobile Navigation Toggle - Enhanced with animations */}
        <motion.button 
          className="md:hidden flex items-center text-text-primary focus:outline-none z-50" 
          onClick={toggleNav}
          aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="sr-only">{navOpen ? "Close menu" : "Open menu"}</span>
          <div className="relative w-6 h-5">
            <motion.span 
              className="absolute h-0.5 w-full bg-text-primary rounded-full"
              animate={{ 
                rotate: navOpen ? 45 : 0, 
                y: navOpen ? 8 : 0,
                backgroundColor: navOpen ? "rgb(100, 108, 255)" : "#f0f0f0"
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span 
              className="absolute h-0.5 w-full bg-text-primary rounded-full top-2"
              animate={{ 
                opacity: navOpen ? 0 : 1, 
                x: navOpen ? 20 : 0,
                backgroundColor: navOpen ? "rgb(100, 108, 255)" : "#f0f0f0"
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span 
              className="absolute h-0.5 w-full bg-text-primary rounded-full top-4"
              animate={{ 
                rotate: navOpen ? -45 : 0, 
                y: navOpen ? -8 : 0,
                backgroundColor: navOpen ? "rgb(100, 108, 255)" : "#f0f0f0" 
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </div>
        </motion.button>
      </div>
      
      {/* Mobile Navigation Menu - Enhanced with cooler animations */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="fixed inset-0 bg-bg-dark/95 flex flex-col justify-center items-center backdrop-blur-lg z-40 md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <motion.nav 
              className="flex flex-col items-center space-y-8"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`text-xl ${
                    activeSection === section.id 
                      ? 'text-accent' 
                      : 'text-text-secondary'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 24
                      }
                    },
                    closed: {
                      y: 50,
                      opacity: 0,
                      transition: {
                        duration: 0.15
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: "rgb(100, 108, 255)",
                    textShadow: "0 0 10px rgba(100, 108, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.a>
              ))}
            </motion.nav>
            
            {/* Add decorative elements to mobile menu */}
            <motion.div 
              className="absolute top-20 left-10 w-16 h-16 border-t-2 border-l-2 border-accent opacity-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-16 h-16 border-b-2 border-r-2 border-accent opacity-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
