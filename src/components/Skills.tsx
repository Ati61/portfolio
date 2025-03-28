import React, { forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionEndIndicator from './SectionEndIndicator';

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '⟨⟩',
    skills: [
      'HTML & CSS',
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Next.js',
      'SCSS/Sass',
      'Tailwind CSS',
      'Framer Motion',
      'Redux'
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '{}',
    skills: [
      'Node.js',
      '.NET Core',
      'RESTful APIs',
      'Firebase',
      'MySQL',
      'Entity Framework',
      'Authentication',
      'Azure',
      'Docker'
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Methods',
    icon: '⚒️',
    skills: [
      'Git & GitHub',
      'Docker',
      'VS Code',
      'Visual Studio',
      'JetBrains IDEs',
      'npm/yarn',
      'CI/CD',
      'Responsive Design',
      'Android Studio'
    ]
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: '📝',
    skills: [
      'JavaScript',
      'TypeScript',
      'C#',
      'Java',
      'Python',
      'Kotlin',
      'C',
      'SQL',
      'HTML/CSS'
    ]
  },
];

const Skills = forwardRef<HTMLElement>((props, ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal-bottom').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal-bottom').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section ref={ref} id="skills" className="bg-bg-light relative">
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
              <div className="text-text-tertiary text-xs font-mono mx-auto">skills.sh</div>
            </div>
            <div className="terminal-body bg-bg-dark p-3 border border-border rounded-md flex flex-col md:flex-row justify-between items-baseline">
              <h2 className="section-heading reveal-bottom flex items-center gap-3 mb-0 pb-0">
                <motion.div 
                  className="terminal-command text-xs sm:text-sm font-normal"
                  whileHover={{ scale: 1.05 }}
                >
                  ./list-skills --all
                </motion.div>
                <span className="text-accent">Skills</span>
              </h2>
              <p className="text-text-secondary reveal-bottom font-mono text-sm">&#47;&#47; tools of the trade</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-bottom">
            {skillCategories.map((category) => (
              <div 
                key={category.id} 
                className="terminal-box bg-bg-darker border border-border p-5 relative reveal-bottom"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
                  <span className="text-accent font-mono text-lg">{category.icon}</span>
                  <h3 className="text-xl font-mono text-accent">{category.title}</h3>
                </div>
                
                {/* Terminal Output List */}
                <div className="terminal-output-list">
                  <div className="font-mono text-xs text-text-secondary mb-3">
                    <span className="text-accent">$</span> ls ./{category.id}
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="flex items-center gap-2 group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ 
                          x: 5, 
                          transition: { delay: 0 } 
                        }}
                      >
                        <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 py-10 border-t border-border reveal-bottom">
            <div className="terminal-window inline-block mx-auto mb-6">
              <div className="terminal-header flex items-center p-2 bg-bg-dark border border-border rounded-t-md">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-text-tertiary text-xs font-mono mx-auto">learning.sh</div>
              </div>
              <div className="terminal-body bg-bg-darker p-4 border-x border-b border-border rounded-b-md">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <motion.div 
                      className="terminal-command text-xs font-normal"
                      whileHover={{ scale: 1.05 }}
                    >
                      git checkout -b android-development
                    </motion.div>
                    <span className="terminal-text-blink">█</span>
                  </div>
                  <p className="text-text-primary font-bold mb-4">Currently Exploring</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {['Android Studio', 'Kotlin', 'Mobile UI Design', 'Room Database', 'Jetpack Compose'].map((item) => (
                    <div
                      key={item}
                      className="py-2 px-4 border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors relative group"
                    >
                      <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="font-mono text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section end indicator */}
      <div className="absolute bottom-4 left-0 right-0">
        <SectionEndIndicator nextSectionName="Contact" />
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
export default Skills;
