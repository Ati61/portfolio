import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionEndIndicator from './SectionEndIndicator';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  timeline: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "BudgetTracker",
    description: "Android application for expense tracking with monthly statistics, category filtering, and interactive visual reports to help users manage their personal finances.",
    tags: ["Kotlin", "Android Studio", "Room DB", "Material Design", "MVVM"],
    image: "/images/inprogress.png",
    githubUrl: "https://github.com/Ati61/budget-tracker",
    status: "Upcoming",
    timeline: "In development"
  },
  {
    id: 2,
    title: "MusicMind",
    description: "Web application that leverages Spotify API to analyze listening habits, create customized playlists, and receive AI-powered song recommendations based on listening patterns.",
    tags: [".NET Core", "React", "Spotify API", "AI Integration", "OAuth"],
    image: "/images/inprogress.png",
    githubUrl: "https://github.com/Ati61/music-mind",
    liveUrl: "https://music-mind-app.vercel.app",
    status: "Planning",
    timeline: "Coming soon"
  }
];

// Terminal window component for reusability
const TerminalWindow = ({ title, children, className = '' }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`terminal-window ${className}`}>
    <div className="terminal-header flex items-center mb-2">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-text-tertiary text-xs font-mono mx-auto">{title}</div>
    </div>
    <div className="terminal-body bg-bg-dark p-3 border border-border rounded-md">
      {children}
    </div>
  </div>
);

// Project card component
const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const [imageError, setImageError] = useState(false);
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className={`relative flex flex-col ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } items-center gap-8 reveal-bottom`}
    >
      <div className="w-full md:w-7/12 h-[300px] md:h-[400px] relative group z-10">
        <div className="absolute inset-0 bg-accent/20 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
        <div className="terminal-window absolute inset-0 overflow-hidden border border-border bg-bg-lighter project-card">
          <div className="terminal-header absolute top-0 left-0 right-0 flex items-center p-2 bg-bg-dark border-b border-border">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-text-tertiary text-xs font-mono mx-auto">concept.png</div>
          </div>
          <div className="absolute inset-0 mt-9 p-4 flex items-center justify-center">
            <img
              src={project.image}
              alt={`${project.title} concept`}
              className="w-full h-full object-contain"
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-bg-dark/70 z-20">
                <div className="text-center p-6">
                  <div className="text-accent font-bold text-xl mb-3">{project.title}</div>
                  <div className="bg-bg-dark p-4 border border-accent rounded-sm">
                    <div className="font-mono text-accent-light text-sm mb-2"># Project in Development</div>
                    <div className="text-text-secondary font-mono text-xs">
                      &gt; {project.status} <br/>
                      &gt; {project.timeline}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className="terminal-tag font-mono text-xs text-accent mb-1 px-2 py-1 inline-block bg-bg-dark border border-border rounded-sm">
          # Assignment Project
        </div>
        
        <h3 className="text-3xl font-bold mb-4 text-text-primary flex items-center gap-2">
          {isEven ? (
            <>
              <span className="terminal-path">{project.title}</span>
              <span className="inline-block w-16 h-[1px] bg-accent"></span>
            </>
          ) : (
            <>
              <span className="inline-block w-16 h-[1px] bg-accent"></span>
              <span className="terminal-path">{project.title}</span>
            </>
          )}
        </h3>
        
        <div className="terminal-box p-6 bg-bg-darker border border-border shadow-lg mb-4 relative">
          <span className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent"></span>
          <span className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent"></span>
          <div className="terminal-line flex items-start mb-2">
            <span className="text-accent-light font-mono text-xs mr-2 mt-1">➜</span>
            <span className="text-text-secondary">{project.description}</span>
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <span className="text-accent-light font-mono text-xs">&gt; Timeline:</span>
            <span className="ml-2 text-text-secondary text-sm">{project.timeline}</span>
          </div>
        </div>
        
        <div className={`flex flex-wrap gap-2 mb-6 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
          {project.tags.map(tag => (
            <span key={tag} className="terminal-tag text-text-tertiary text-xs font-mono py-1 px-2 border border-border bg-bg-darker">
              &lt;{tag}/&gt;
            </span>
          ))}
        </div>
        
        <div className={`flex gap-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
          {project.githubUrl && (
            <ProjectLink url={project.githubUrl} type="github" />
          )}
          
          {project.liveUrl && (
            <ProjectLink url={project.liveUrl} type="live" />
          )}
        </div>
      </div>
    </div>
  );
};

// Project link component
const ProjectLink = ({ url, type }: { url: string, type: 'github' | 'live' }) => (
  <motion.a 
    href={url}
    target="_blank"
    rel="noreferrer"
    className="terminal-link text-text-secondary hover:text-accent transition-colors"
    aria-label={type === 'github' ? 'GitHub Repository' : 'Live Demo'}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {type === 'github' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    )}
  </motion.a>
);

const Projects = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section 
      ref={ref} 
      id="projects" 
      className="bg-bg-light pt-8 pb-20 md:pt-16 md:pb-32 relative"
    >
      <div className="section-container pt-0">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
          <TerminalWindow title="projects.sh" className="mb-6 md:mb-0">
            <h2 className="section-heading reveal-bottom flex items-center gap-3 mb-0 pb-0">
              <motion.div 
                className="terminal-command text-xs sm:text-sm font-normal"
                whileHover={{ scale: 1.05 }}
              >
                ls -la ./upcoming-projects
              </motion.div>
              <span className="text-accent-light">Projects</span>
            </h2>
            <div className="text-text-secondary text-xs font-mono mt-2">// displaying {projects.length} items</div>
          </TerminalWindow>
          
          <p className="text-text-secondary reveal-bottom font-mono text-sm bg-bg-dark px-4 py-2 rounded-md border border-border inline-block">
            <span className="text-accent">$</span> cat ASSIGNMENT.md <span className="terminal-text-blink">█</span>
          </p>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0">
          <SectionEndIndicator nextSectionName="About" />
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';
export default Projects;
