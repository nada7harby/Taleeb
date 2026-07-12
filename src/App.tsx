import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";

import BackgroundEffect from "./components/BackgroundEffect";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";

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
      <ScrollToTop />

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
        <Routes>
          <Route path="/" element={<HomePage t={t} locale={locale} />} />
          <Route path="/about" element={<AboutPage t={t} locale={locale} />} />
          <Route path="/products" element={<ProductsPage t={t} locale={locale} />} />
        </Routes>
      </main>

      {/* Footer copyright info */}
      <Footer t={t} locale={locale} />
    </div>
  );
}
