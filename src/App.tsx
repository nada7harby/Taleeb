import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import BackgroundEffect from "./components/BackgroundEffect";
import Navbar from "./components/Navbar";
import { HeroSection } from "@/components/ui/3d-hero-section-boxes";
import LogoWall from "./components/LogoWall";
import Services from "./components/Services";
import Features from "./components/Features";
import Statistics from "./components/Statistics";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { translations } from "./translations";

export default function App() {
  const [locale, setLocale] = useState<"en" | "ar">("ar");
  const t = translations[locale];

  // Configure HTML document direction on startup
  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.title = locale === "ar" ? "تَلْعِيب | منصة وحلول التلعيب التفاعلية للأعمال" : "Tal3eeb | Premium Gamification Solutions";
  }, [locale]);

  // Framer Motion scroll progress indicator (Apple/Linear style)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div id="tal3eeb-root" className="min-h-[100dvh] relative text-zinc-100 font-sans">
      {/* Scroll progress bar overlay */}
      <motion.div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#ecdb33] z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* Global Background Particles & Grid Effects */}
      <BackgroundEffect />

      {/* Floating Header Navbar */}
      <Navbar t={t} locale={locale} setLocale={setLocale} />

      {/* Main Core Content Container */}
      <main id="main-content" className="relative z-10 w-full overflow-hidden">
        
        {/* 1. Immersive 3D Spline Hero Section (app supplies its own Navbar; drop the demo filler) */}
        <HeroSection t={t} locale={locale} showNavbar={false} showPlaceholder={false} />

        {/* 1b. Trusted-by integration logo wall */}
        <LogoWall t={t} locale={locale} />

        {/* 2. Bento-style Services Section */}
        <Services t={t} locale={locale} />

        {/* 3. Gamification Mechanics & Features Section */}
        <Features t={t} locale={locale} />

        {/* 4. Statistics impact metrics Section */}
        <Statistics t={t} locale={locale} />

        {/* 5. Team Testimonials / Client reviews section */}
        <Testimonials t={t} locale={locale} />

        {/* 6. Accordion Frequently Answered Questions */}
        <Faq t={t} locale={locale} />

        {/* 7. Interactive Lead Capturing Form */}
        <Contact t={t} locale={locale} />

      </main>

      {/* Footer copyright info */}
      <Footer t={t} locale={locale} />
    </div>
  );
}
