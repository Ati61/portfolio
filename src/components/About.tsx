import React, { forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionEndIndicator from './SectionEndIndicator';

const About = forwardRef<HTMLElement>((props, ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          if (entry.target.classList.contains('stagger-reveal')) {
            entry.target.classList.add('revealed');
          }
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal-bottom, .stagger-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal-bottom, .stagger-reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section ref={ref} id="about" className="bg-bg-dark relative">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Terminal-style section header */}
          <div className="terminal-window mb-8">
            <div className="terminal-header flex items-center mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-text-tertiary text-xs font-mono mx-auto">about.md</div>
            </div>
            <div className="terminal-body bg-bg-darker p-3 border border-border rounded-md">
              <h2 className="section-heading reveal-bottom flex items-center gap-3 mb-0 pb-0">
                <motion.div 
                  className="terminal-command text-xs sm:text-sm font-normal"
                  whileHover={{ scale: 1.05 }}
                >
                  cat about.md
                </motion.div>
                <span className="text-accent">About Me</span>
              </h2>
              <div className="text-text-secondary text-xs font-mono mt-2">// personal information</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="md:col-span-2 space-y-6">
              {/* Terminal-styled paragraphs */}
              <div className="terminal-box p-4 bg-bg-darker border border-border shadow-md reveal-bottom">
                <div className="flex items-start mb-2">
                  <span className="text-accent-light font-mono text-xs mr-2 mt-1">~$</span>
                  <p className="text-text-secondary">
                    Hello! I'm a 21-year-old Computer Science student at University of Pannonia, currently in my 4th semester. 
                   Been coding since High School.
                  </p>
                </div>
              </div>
              
              <div className="terminal-box p-4 bg-bg-darker border border-border shadow-md reveal-bottom">
                <div className="flex items-start mb-2">
                  <span className="text-accent-light font-mono text-xs mr-2 mt-1">~$</span>
                  <p className="text-text-secondary">
                    Throughout my university studies, I've developed a particular interest in web development.
                  </p>
                </div>
              </div>
              
              <div className="terminal-box p-4 bg-bg-darker border border-border shadow-md reveal-bottom">
                <div className="flex items-start mb-2">
                  <span className="text-accent-light font-mono text-xs mr-2 mt-1">~$</span>
                        <p className="text-text-secondary">
                       I like cars – especially the Supra MK4, which is my all-time favorite. I also spend a lot of time gaming and hanging out with friends online. It's a good balance between work and fun.
                        </p>
                </div>
              </div>
              
              <div className="reveal-bottom mt-8">
                <div className="terminal-window">
                  <div className="terminal-header flex items-center p-2 bg-bg-dark border border-border rounded-t-md">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-text-tertiary text-xs font-mono mx-auto">tech-stack.txt</div>
                  </div>
                  <div className="terminal-body bg-bg-darker p-4 border-x border-b border-border rounded-b-md">
                    <p className="text-text-secondary mb-4 font-mono text-sm">$ cat tech-stack.txt</p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 stagger-reveal">
                      {['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js', 'C#/.NET'].map(tech => (
                        <li key={tech} className="flex items-center">
                          <span className="text-accent mr-2">▹</span> 
                          <span className="text-text-secondary text-sm font-mono">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1 reveal-bottom">
              <div className="terminal-window mb-6">
                <div className="terminal-header flex items-center p-2 bg-bg-dark border border-border rounded-t-md">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-text-tertiary text-xs font-mono mx-auto">profile.jpg</div>
                </div>
                <div className="relative w-full h-48 mx-auto border border-border bg-bg-darker">
                  <div className="absolute inset-0 border-2 border-accent transform translate-x-3 translate-y-3 
                  transition-all group-hover:translate-x-2 group-hover:translate-y-2"></div>
                  <div className="absolute inset-0 bg-bg-lighter overflow-hidden group flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold
                    relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:15px_15px]"></div>
                      <span className="relative z-10">A</span>
                    </div>
                    <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    
                    {/* Edgy corner details */}
                    <div className="absolute w-4 h-4 top-0 left-0 border-t-2 border-l-2 border-accent"></div>
                    <div className="absolute w-4 h-4 top-0 right-0 border-t-2 border-r-2 border-accent"></div>
                    <div className="absolute w-4 h-4 bottom-0 left-0 border-b-2 border-l-2 border-accent"></div>
                    <div className="absolute w-4 h-4 bottom-0 right-0 border-b-2 border-r-2 border-accent"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 space-y-6">
                <div className="terminal-box p-3 bg-bg-darker border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bg-lighter flex items-center justify-center text-accent border border-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs font-mono">ROLE</p>
                      <p className="text-text-primary font-medium">CS Student @ Uni of Pannonia</p>
                    </div>
                  </div>
                </div>
                
                <div className="terminal-box p-3 bg-bg-darker border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bg-lighter flex items-center justify-center text-accent border border-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs font-mono">FOCUS</p>
                      <p className="text-text-primary font-medium">Full-stack Development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section end indicator */}
      <div className="absolute bottom-4 left-0 right-0">
        <SectionEndIndicator nextSectionName="Skills" />
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
