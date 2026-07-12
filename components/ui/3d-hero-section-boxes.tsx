"use client";

import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'motion/react';
import { Plus, Aperture, Play } from 'lucide-react';
import { TranslationDictionary } from '@/src/types';

interface HeroCopy {
  badge: string;
  headlineStart: string;
  headlineHighlight: string;
  headlineEnd: string;
  subheading: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

// Standalone-demo fallback copy (used when no translation dictionary is passed).
const DEMO_COPY: HeroCopy = {
  badge: 'AI \\ WEB3 \\ UI \\ 3D \\ MOTION',
  headlineStart: "We're Building",
  headlineHighlight: 'Cool Experiences',
  headlineEnd: '',
  subheading: 'Crafting Awesome Stories and Killer Designs to Make Brand Stand Out',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'Contact Us',
};

// Particles spread across the WHOLE hero — including the four corners — so there
// is ambient motion even in the regions the centred Spline scene leaves empty.
const PARTICLES = [
  { x: '5%', y: '10%', s: 2, d: 0.0, dur: 16 }, { x: '14%', y: '28%', s: 1.5, d: 2.1, dur: 19 },
  { x: '9%', y: '52%', s: 2, d: 1.2, dur: 17 }, { x: '6%', y: '78%', s: 1.5, d: 3.0, dur: 21 },
  { x: '18%', y: '88%', s: 2, d: 0.7, dur: 18 }, { x: '24%', y: '16%', s: 1.5, d: 1.8, dur: 20 },
  { x: '30%', y: '46%', s: 2, d: 2.6, dur: 15 }, { x: '34%', y: '70%', s: 1.5, d: 0.4, dur: 22 },
  { x: '42%', y: '22%', s: 2, d: 3.3, dur: 18 }, { x: '46%', y: '58%', s: 1.5, d: 1.0, dur: 17 },
  { x: '52%', y: '84%', s: 2, d: 2.2, dur: 19 }, { x: '58%', y: '14%', s: 1.5, d: 0.9, dur: 21 },
  { x: '64%', y: '40%', s: 2, d: 3.6, dur: 16 }, { x: '68%', y: '66%', s: 1.5, d: 1.5, dur: 20 },
  { x: '74%', y: '90%', s: 2, d: 0.3, dur: 18 }, { x: '80%', y: '20%', s: 1.5, d: 2.4, dur: 22 },
  { x: '86%', y: '48%', s: 2, d: 1.1, dur: 17 }, { x: '90%', y: '74%', s: 1.5, d: 3.1, dur: 19 },
  { x: '94%', y: '12%', s: 2, d: 0.6, dur: 20 }, { x: '96%', y: '58%', s: 1.5, d: 2.8, dur: 16 },
  { x: '92%', y: '88%', s: 2, d: 1.7, dur: 21 }, { x: '38%', y: '92%', s: 1.5, d: 0.2, dur: 18 },
];

// Faint, slowly drifting glow blobs anchored in each corner — visible motion for
// the empty top-left / top-right areas, tinted with the brand palette.
function AmbientMotion() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {/* top corners */}
      <motion.div
        className="absolute -top-32 -start-32 w-[42vw] h-[42vw] rounded-full bg-[#40ccd0]/[0.14] blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -top-40 -end-28 w-[38vw] h-[38vw] rounded-full bg-[#ecdb33]/[0.12] blur-[140px]"
        animate={{ x: [0, -36, 0], y: [0, 26, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* mid-height side glows — keep the full-height left/right strips alive */}
      <motion.div
        className="absolute top-1/3 -start-40 w-[34vw] h-[34vw] rounded-full bg-[#3cdb4e]/[0.10] blur-[140px]"
        animate={{ x: [0, 34, 0], y: [0, -18, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 -end-40 w-[32vw] h-[32vw] rounded-full bg-[#40ccd0]/[0.09] blur-[150px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* bottom corners */}
      <motion.div
        className="absolute -bottom-32 -start-20 w-[40vw] h-[40vw] rounded-full bg-[#3cdb4e]/[0.11] blur-[140px]"
        animate={{ x: [0, 30, 0], y: [0, -24, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -end-24 w-[36vw] h-[36vw] rounded-full bg-[#ecdb33]/[0.09] blur-[150px]"
        animate={{ x: [0, -28, 0], y: [0, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/50"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
          animate={{ y: [0, -24, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      {/* Spline's own internal camera/composition isn't controllable from here,
          so scaling the component itself is how we make the cubes actually
          fill the canvas instead of sitting small/off-centre within it. */}
      <Spline
        className="scale-125 md:scale-150 lg:scale-[1.75] xl:scale-[2]"
        style={{
          width: '100%',
          height: '100vh',
          pointerEvents: 'auto',
          transformOrigin: 'center center',
        }}
        scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
      />
      <AmbientMotion />
      {/* Seam blend — the Spline canvas otherwise cuts off in a hard rectangle
          at 100vh. Fading it to black over the last ~22vh, plus a couple of
          faint brand-coloured glows right at the edge, lets the next section's
          own top-of-seam treatment (see LogoWall) pick up the atmosphere
          instead of the page reading as two disconnected blocks. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] z-[2] bg-gradient-to-b from-transparent via-black/70 to-black" />
      {/* This wrapper keeps overflow:hidden (needed to clip the scaled-up
          Spline canvas), so these glows can't bleed past it themselves —
          they just soften the fade zone. The actual cross-section bleed
          into LogoWall is handled from that component's own side instead. */}
      <div className="pointer-events-none absolute bottom-0 start-[18%] w-[26vw] h-[26vw] max-w-[320px] max-h-[320px] translate-y-1/3 rounded-full bg-[#40ccd0]/[0.08] blur-[110px] z-[2]" />
      <div className="pointer-events-none absolute bottom-0 end-[15%] w-[24vw] h-[24vw] max-w-[320px] max-h-[320px] translate-y-1/3 rounded-full bg-[#ecdb33]/[0.07] blur-[120px] z-[2]" />
    </div>
  );
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div ref={screenshotRef} className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full md:w-[80%] lg:w-[70%] mx-auto">
        <div>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2400&q=80&auto=format&fit=crop"
            alt="App Screenshot"
            className="w-full h-auto block rounded-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

function HeroContent({ copy }: { copy: HeroCopy }) {
  return (
    <div className="text-white px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center py-16">

      <div className="w-full lg:w-1/2 lg:pe-8 mb-8 lg:mb-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight [text-wrap:balance]">
          {copy.headlineStart}<br /><span className="text-[#ecdb33]">{copy.headlineHighlight}</span>
          {copy.headlineEnd && (
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/80 mt-2">{copy.headlineEnd}</span>
          )}
        </h1>
        <div className="flex items-center gap-3 mt-6">
          <span className="h-px w-10 bg-white/30" />
          <span className="text-xs font-medium tracking-[0.2em] text-gray-300 uppercase">{copy.badge}</span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:ps-8 flex flex-col items-start">
         <p className="text-base sm:text-lg opacity-80 mb-6 max-w-md leading-relaxed">
           {copy.subheading}
        </p>
        <div className="flex pointer-events-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#services" className="pointer-events-auto bg-[#ecdb33] text-black font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto">
               <Plus className="w-4 h-4 sm:w-5 sm:h-5 me-2" />
               {copy.ctaPrimary}
            </a>
            <a href="#contact" className="border border-white text-white font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 w-full sm:w-auto hover:bg-white hover:text-black flex items-center justify-center">
               <Play className="w-4 h-4 me-2 fill-current" />
               {copy.ctaSecondary}
            </a>
        </div>
      </div>

    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20" style={{ backgroundColor: 'rgba(13, 13, 24, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: '0 0 0.75rem 0.75rem' }}>
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="text-white flex items-center" style={{ width: '32px', height: '32px' }}>
             <Aperture className="w-8 h-8" />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-150">Home</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-150">Cases</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-150">Library</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-150">Resources</a>
          </div>
        </div>

        <div className="flex items-center">
          <a href="#" className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition duration-300">
              Let's Talk!
          </a>
        </div>
      </div>
    </nav>
  );
}

interface HeroSectionProps {
  /** App translation dictionary. When provided, hero copy comes from `t.hero.*`; otherwise the English demo copy is used. */
  t?: TranslationDictionary;
  /** Active locale — reserved for direction-specific tweaks (the RTL flip itself is driven by the document `dir`). */
  locale?: 'en' | 'ar';
  /** Render the component's built-in fixed navbar. Disable when the host app supplies its own. */
  showNavbar?: boolean;
  /** Render the parallax screenshot reveal beneath the hero. */
  showScreenshot?: boolean;
  /** Render the "Other Content Below" placeholder block (demo only). */
  showPlaceholder?: boolean;
}

const HeroSection = ({ t, showNavbar = true, showScreenshot = true, showPlaceholder = true }: HeroSectionProps = {}) => {
  const copy: HeroCopy = t
    ? {
        badge: t.hero.badge,
        headlineStart: t.hero.headlineStart,
        headlineHighlight: t.hero.headlineHighlight,
        headlineEnd: t.hero.headlineEnd,
        subheading: t.hero.subheading,
        ctaPrimary: t.hero.ctaPrimary,
        ctaSecondary: t.hero.ctaSecondary,
      }
    : DEMO_COPY;

  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;

          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
             heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {showNavbar && <Navbar />}

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <HeroContent copy={copy} />
        </div>
      </div>

    
    </div>
  );
};

export { HeroSection }
