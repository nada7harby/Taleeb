import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Languages, Menu, X, ArrowUpRight } from "lucide-react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";

interface NavbarProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
  setLocale: (l: "en" | "ar") => void;
}

export default function Navbar({ t, locale, setLocale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  // Scroll state via Motion — no window scroll listener.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const toggleLanguage = () => {
    const next = locale === "en" ? "ar" : "en";
    setLocale(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  // In-page sections (home only) vs. real routes — routes always navigate;
  // anchors scroll directly on the home page, or hop home-then-scroll from
  // any other route (ScrollToTop picks up the hash once Home has mounted).
  const navLinks = [
    { href: "#services", label: t.nav.services, kind: "anchor" as const },
    { href: "#features", label: t.nav.features, kind: "anchor" as const },
    { href: "#impact", label: t.nav.impact, kind: "anchor" as const },
    { href: "#faq", label: t.nav.faq, kind: "anchor" as const },
    { href: "/about", label: t.nav.about, kind: "route" as const },
    { href: "/products", label: t.nav.products, kind: "route" as const },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!onHome) {
      navigate(`/${href}`);
      return;
    }
    const el = href === "#" ? document.body : document.querySelector(href);
    if (el) {
      const top = href === "#" ? 0 : el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!onHome) {
      navigate("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-3 md:pt-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div
          className={`max-w-[1400px] mx-auto flex items-center justify-between rounded-full pl-3 pr-3 py-2.5 transition-all duration-500 border h-[60px] ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border-white/10 edge-hi shadow-[0_10px_40px_-15px_rgba(0,0,0,0.9)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Brand */}
          <a href="/" onClick={handleBrandClick} className="flex items-center gap-2.5 group ps-2">
            <motion.span
              className="relative grid place-items-center w-9 h-9 rounded-xl bg-[#ecdb33] text-black font-mono font-bold text-lg overflow-hidden"
              whileHover={{ rotate: -6 }}
              whileTap={{ scale: 0.92 }}
            >
              T
              <span className="absolute inset-x-0 -top-6 h-6 bg-white/40 blur-md animate-sheen" />
            </motion.span>
            <span className="text-xl md:text-[1.35rem] font-bold tracking-tight text-white">
              {t.nav.brandName}
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] rounded-full p-1 border border-white/[0.06]">
            {navLinks.map((link) =>
              link.kind === "route" ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-1.5 rounded-full text-[0.9rem] font-medium transition-colors duration-200 ${
                    location.pathname === link.href ? "text-white bg-white/[0.06]" : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-1.5 rounded-full text-[0.9rem] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors duration-200"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#40ccd0]/40 text-sm font-medium text-zinc-300 hover:text-[#40ccd0] transition-colors duration-200"
            >
              <Languages className="w-4 h-4" strokeWidth={1.75} />
              <span>{locale === "en" ? "عربي" : "EN"}</span>
            </button>

            <motion.a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="group flex items-center gap-1.5 ps-5 pe-4 py-2 rounded-full bg-[#ecdb33] font-semibold text-sm text-black shadow-[0_8px_30px_-8px_rgba(236,219,51,0.6)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </motion.a>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/96 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-28 pb-10 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) =>
                link.kind === "route" ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: locale === "en" ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-3xl font-bold text-zinc-200 hover:text-[#ecdb33] transition-colors py-3 border-b border-white/[0.06]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-3xl font-bold text-zinc-200 hover:text-[#ecdb33] transition-colors py-3 border-b border-white/[0.06]"
                    initial={{ opacity: 0, x: locale === "en" ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                  >
                    {link.label}
                  </motion.a>
                )
              )}
            </nav>

            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="flex items-center justify-center gap-2 py-4 rounded-full bg-[#ecdb33] text-lg font-bold text-black"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
