import { useEffect, useState, useCallback } from 'react';

export default function SmoothScroll() {
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Get current section based on scroll position
  const getCurrentSection = useCallback((): string => {
    const sections = ['home', 'projects', 'about', 'skills', 'contact'];
    let currentSection = 'home';
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If the top of the section is above the middle of the screen
        // and the bottom is below the middle, it's the current section
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section;
        }
      }
    });
    
    return currentSection;
  }, []);

  // Get the next section based on the current section
  const getNextSection = useCallback((currentSection: string): string | null => {
    const sections = ['home', 'projects', 'about', 'skills', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
      return sections[currentIndex + 1];
    }
    
    return null; // No next section (we're at the last section)
  }, []);
  
  // Get the previous section based on the current section
  const getPreviousSection = useCallback((currentSection: string): string | null => {
    const sections = ['home', 'projects', 'about', 'skills', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
      return sections[currentIndex - 1];
    }
    
    return null; // No previous section (we're at the first section)
  }, []);
  
  // Check if we're near the end of the current section
  const isNearSectionEnd = useCallback((sectionId: string): boolean => {
    const section = document.getElementById(sectionId);
    if (!section) return false;
    
    const rect = section.getBoundingClientRect();
    const threshold = 100; // How close to the end (in pixels) to trigger the transition
    
    // We're near the end if the bottom of the section is close to the bottom of the viewport
    return rect.bottom > 0 && rect.bottom <= window.innerHeight + threshold;
  }, []);
  
  // Check if we're near the start of the current section
  const isNearSectionStart = useCallback((sectionId: string): boolean => {
    const section = document.getElementById(sectionId);
    if (!section) return false;
    
    const rect = section.getBoundingClientRect();
    const threshold = 100; // How close to the start (in pixels) to trigger the transition
    
    // We're near the start if the top of the section is close to the top of the viewport
    return rect.top >= -threshold && rect.top < window.innerHeight;
  }, []);
  
  useEffect(() => {
    // Handle wheel events for custom smooth scrolling
    const handleWheel = (e: WheelEvent) => {
      // Don't interfere with horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      // If already in a scrolling animation, don't interrupt
      if (isScrolling) return;
      
      const currentSection = getCurrentSection();
      
      // Scrolling down - go to next section
      if (e.deltaY > 0) {
        const nextSection = getNextSection(currentSection);
        
        // Only intercept if we're near the end of current section and there is a next section
        if (nextSection && isNearSectionEnd(currentSection)) {
          e.preventDefault();
          setIsScrolling(true);
          
          const nextSectionElement = document.getElementById(nextSection);
          if (nextSectionElement) {
            nextSectionElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
            
            // Reset scrolling state after animation completes
            setTimeout(() => {
              setIsScrolling(false);
            }, 1000);
          }
        }
      }
      
      // Scrolling up - go to previous section
      else if (e.deltaY < 0) {
        const prevSection = getPreviousSection(currentSection);
        
        // Only intercept if we're near the start of current section and there is a previous section
        if (prevSection && isNearSectionStart(currentSection)) {
          e.preventDefault();
          setIsScrolling(true);
          
          const prevSectionElement = document.getElementById(prevSection);
          if (prevSectionElement) {
            prevSectionElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
            
            // Reset scrolling state after animation completes
            setTimeout(() => {
              setIsScrolling(false);
            }, 1000);
          }
        }
      }
    };
    
    // Special handling for the home section for a better first impression
    const handleHomeSection = (e: WheelEvent) => {
      const currentSection = getCurrentSection();
      
      if (currentSection === 'home' && e.deltaY > 0 && !isScrolling) {
        e.preventDefault();
        setIsScrolling(true);
        
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          
          // Reset scrolling state after animation completes
          setTimeout(() => {
            setIsScrolling(false);
          }, 1000);
        }
      }
    };
    
    // Special handling for the projects section transition
    const handleProjectsSection = (e: WheelEvent) => {
      const currentSection = getCurrentSection();
      
      if (currentSection === 'projects' && e.deltaY > 0 && !isScrolling) {
        // Check if we're near the end of the projects section
        const projectsSection = document.getElementById('projects');
        if (!projectsSection) return;
        
        const rect = projectsSection.getBoundingClientRect();
        const isNearEnd = rect.bottom <= window.innerHeight + 100;
        
        if (isNearEnd) {
          e.preventDefault();
          setIsScrolling(true);
          
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
            
            // Reset scrolling state after animation completes
            setTimeout(() => {
              setIsScrolling(false);
            }, 1000);
          }
        }
      }
    };
    
    // Passive: false is needed to be able to prevent default behavior
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Add specific handler for home section for immediate response
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.addEventListener('wheel', handleHomeSection, { passive: false });
    }
    
    // Add specific handler for projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.addEventListener('wheel', handleProjectsSection, { passive: false });
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (homeSection) {
        homeSection.removeEventListener('wheel', handleHomeSection);
      }
      if (projectsSection) {
        projectsSection.removeEventListener('wheel', handleProjectsSection);
      }
    };
  }, [isScrolling, getCurrentSection, getNextSection, getPreviousSection, isNearSectionEnd, isNearSectionStart]);
  
  return null; // This component doesn't render anything
}
