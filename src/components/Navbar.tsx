import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gamepad2, Languages, Menu, X, ArrowUpRight } from "lucide-react";
import { TranslationDictionary } from "../types";

interface NavbarProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
  setLocale: (l: "en" | "ar") => void;
}

export default function Navbar({ t, locale, setLocale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = nextLocale;
  };

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#features", label: t.nav.features },
    { href: "#impact", label: t.nav.impact },
    { href: "#faq", label: t.nav.faq },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 ${
          scrolled ? "top-2" : "top-0"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          id="navbar-container"
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 border ${
            scrolled
              ? "bg-[#0d0a18]/70 backdrop-blur-md border-violet-500/20 shadow-lg shadow-violet-950/10"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            id="navbar-logo"
            onClick={(e) => handleLinkClick(e, "#")}
          >
            <motion.div
              className="relative p-2.5 rounded-full bg-violet-600/20 border border-violet-500/30 overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Gamepad2 className="w-5 h-5 text-violet-400 group-hover:text-amber-400 transition-colors" />
              <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
            </motion.div>
            <span
              className="text-xl md:text-2xl font-bold tracking-tight font-display bg-gradient-to-r from-violet-200 via-white to-amber-200 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:to-amber-400 transition-all duration-500"
            >
              {t.nav.brandName}
            </span>
          </a>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#120f22]/40 rounded-full py-1 px-1.5 border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions Bar */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle Toggle */}
            <motion.button
              id="language-toggle"
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-violet-600/10 hover:border-violet-500/30 text-sm font-medium text-zinc-300 hover:text-violet-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Languages className="w-4 h-4" />
              <span>{locale === "en" ? "عربي" : "English"}</span>
            </motion.button>

            {/* Launch CTA */}
            <motion.a
              id="navbar-cta"
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="relative overflow-hidden flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-sm text-white shadow-lg shadow-violet-600/20 border border-violet-500/40 hover:from-violet-500 hover:to-indigo-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            className="fixed inset-0 z-40 bg-[#06040c]/95 backdrop-blur-lg md:hidden flex flex-col justify-between pt-28 pb-10 px-6 border-b border-violet-500/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-2xl font-bold font-display text-zinc-300 hover:text-violet-400 transition-colors py-2 block border-b border-white/5"
                  initial={{ opacity: 0, x: locale === "en" ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              className="flex flex-col gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 py-3 w-full rounded-xl bg-white/5 border border-white/10 text-lg font-medium text-zinc-200"
              >
                <Languages className="w-5 h-5 text-violet-400" />
                <span>{locale === "en" ? "عربي" : "English"}</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="flex items-center justify-center gap-2 py-4 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-violet-600/35"
              >
                <span>{t.nav.contact}</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
