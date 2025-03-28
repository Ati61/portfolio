import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import SectionTransition from '@/components/SectionTransition';
import { InView } from 'react-intersection-observer';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [navOpen, setNavOpen] = useState(false);

  // Close mobile navbar when selecting a section
  useEffect(() => {
    if (navOpen) setNavOpen(false);
  }, [activeSection, navOpen]);

  return (
    <>
      <Head>
        <title>Portfolio | Developer & Designer</title>
        <meta name="description" content="Personal portfolio showcasing my projects and skills as a developer and designer." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Remove any font stylesheet links from here */}
      </Head>

      <SmoothScroll />
      <Cursor />
      
      <div className="dark-bg-pattern min-h-screen">
        <SectionTransition />
        <Navbar activeSection={activeSection} navOpen={navOpen} setNavOpen={setNavOpen} />
        
        <main className="relative z-10">
          <InView threshold={0.3} onChange={(inView) => inView && setActiveSection('home')}>
            {({ ref }) => <Hero ref={ref} />}
          </InView>
          
          <InView threshold={0.3} onChange={(inView) => inView && setActiveSection('projects')}>
            {({ ref }) => <Projects ref={ref} />}
          </InView>
          
          <InView threshold={0.3} onChange={(inView) => inView && setActiveSection('about')}>
            {({ ref }) => <About ref={ref} />}
          </InView>
          
          <InView threshold={0.3} onChange={(inView) => inView && setActiveSection('skills')}>
            {({ ref }) => <Skills ref={ref} />}
          </InView>
          
          <InView threshold={0.3} onChange={(inView) => inView && setActiveSection('contact')}>
            {({ ref }) => <Contact ref={ref} />}
          </InView>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
