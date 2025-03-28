import React, { forwardRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import SectionEndIndicator from './SectionEndIndicator';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formState.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formState.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    
    try {
      // Here you'd typically send the form data to your API
      // Example using fetch:
      /*
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      */
      
      // For now, just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setSubmitMessage('Your message has been sent successfully!');
      
      // Reset form after successful submission
      setFormState({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again later.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={ref} 
      id="contact" 
      className="bg-bg-darker pt-8 pb-20 md:pt-16 md:pb-32 relative"
    >
      <div className="section-container">
        <div className="terminal-window mb-12">
          <div className="terminal-header flex items-center mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-text-tertiary text-xs font-mono mx-auto">contact.sh</div>
          </div>
          <div className="terminal-body bg-bg-dark p-3 border border-border rounded-md">
            <h2 className="section-heading reveal-bottom flex items-center gap-3 mb-0 pb-0">
              <motion.div 
                className="terminal-command text-xs sm:text-sm font-normal"
                whileHover={{ scale: 1.05 }}
              >
                echo "Get in touch" &gt;&gt; ./message.txt
              </motion.div>
              <span className="text-accent-light">Contact</span>
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="reveal-bottom">
            <h3 className="text-2xl font-bold mb-6 text-text-primary">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="terminal-input-group">
                <label htmlFor="name" className="block text-accent-light text-sm font-mono mb-2">
                  $ user.name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark border ${formErrors.name ? 'border-red-500' : 'border-border'} rounded p-3 text-text-primary focus:outline-none focus:border-accent transition-colors`}
                  placeholder="Your Name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1 font-mono">Error: {formErrors.name}</p>
                )}
              </div>
              
              <div className="terminal-input-group">
                <label htmlFor="email" className="block text-accent-light text-sm font-mono mb-2">
                  $ user.email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark border ${formErrors.email ? 'border-red-500' : 'border-border'} rounded p-3 text-text-primary focus:outline-none focus:border-accent transition-colors`}
                  placeholder="Your Email"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1 font-mono">Error: {formErrors.email}</p>
                )}
              </div>
              
              <div className="terminal-input-group">
                <label htmlFor="message" className="block text-accent-light text-sm font-mono mb-2">
                  $ message.content
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-bg-dark border ${formErrors.message ? 'border-red-500' : 'border-border'} rounded p-3 text-text-primary focus:outline-none focus:border-accent transition-colors`}
                  placeholder="Your Message"
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1 font-mono">Error: {formErrors.message}</p>
                )}
              </div>
              
              <div className="terminal-submit">
                <motion.button
                  type="submit"
                  className="button-primary w-full py-3 px-6 bg-accent hover:bg-accent-dark transition-colors text-text-inverted font-medium flex items-center justify-center gap-2 rounded"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Send Message (under development)
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </>
                  )}
                </motion.button>
                
                {submitStatus !== 'idle' && (
                  <div className={`mt-4 p-3 rounded ${submitStatus === 'success' ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
                    <p className={`text-sm ${submitStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {submitMessage}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
          
          <div className="reveal-bottom md:mt-8">
            <div className="terminal-window overflow-hidden border border-border rounded">
              <div className="terminal-header flex items-center p-2 bg-bg-dark border-b border-border">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-text-tertiary text-xs font-mono mx-auto">bash</div>
              </div>
              <div className="terminal-body bg-bg-darker p-5 font-mono text-sm">
                <div className="mb-4">
                  <p className="text-text-secondary">
                    <span className="text-accent-light">$</span> find ./contact-info
                  </p>
                  <div className="pl-4 mt-2 mb-6 text-text-primary">
                    <p>contact-info/email.txt</p>
                    <p>contact-info/socials/</p>
                    <p>contact-info/preferences.md</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-text-secondary">
                    <span className="text-accent-light">$</span> cat ./contact-info/email.txt
                  </p>
                  <div className="pl-4 mt-2 mb-6 text-text-primary">
                    <motion.a 
                      href="mailto:danbercsi@gmail.com" 
                      className="text-accent hover:underline"
                      whileHover={{ x: 5 }}
                    >
                      danbercsi@gmail.com
                    </motion.a>
                  </div>
                </div>
                
                <div>
                  <p className="text-text-secondary">
                    <span className="text-accent-light">$</span> ls -la ./contact-info/socials/
                  </p>
                  <div className="pl-4 mt-2 text-text-primary">
                    <p>total 3 files</p>
                    <div className="flex flex-col space-y-3 mt-3">
                      <motion.a 
                        href="https://github.com/Ati61" 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-text-secondary hover:text-accent transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        github.com/Ati61
                      </motion.a>
                      
                      <motion.a 
                        href="https://www.linkedin.com/in/soon" 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-text-secondary hover:text-accent transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        linkedin.com/in/soon
                      </motion.a>
                      
                      <motion.a 
                        href="https://twitter.com/soon" 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-text-secondary hover:text-accent transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                        twitter.com/soon
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0">
        <SectionEndIndicator nextSectionName="Footer" />
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
