import { motion } from "motion/react";
import { Gamepad2, Twitter, Linkedin, Github, Instagram, ArrowUp } from "lucide-react";
import { TranslationDictionary } from "../types";

interface FooterProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Footer({ t, locale }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-violet-500/10 bg-[#06040c]/90 py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background visual lights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 text-start">
        
        {/* Brand Information Section (Span 5) */}
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-bold font-display bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
              {t.nav.brandName}
            </span>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
            {t.footer.desc}
          </p>
          
          {/* Social Icons row */}
          <div className="flex items-center gap-3 mt-2">
            {[Twitter, Linkedin, Instagram, Github].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-violet-400 hover:bg-violet-600/10 transition-all duration-300"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick links block 1 (Span 2) */}
        <div className="md:col-span-2 flex flex-col items-start gap-4">
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            {t.footer.linksTitle}
          </h4>
          <div className="flex flex-col gap-2.5 text-sm text-zinc-500">
            <a href="#services" className="hover:text-violet-400 transition-colors">{t.nav.services}</a>
            <a href="#features" className="hover:text-violet-400 transition-colors">{t.nav.features}</a>
            <a href="#impact" className="hover:text-violet-400 transition-colors">{t.nav.impact}</a>
            <a href="#faq" className="hover:text-violet-400 transition-colors">{t.nav.faq}</a>
          </div>
        </div>

        {/* Quick links block 2 - realms (Span 3) */}
        <div className="md:col-span-3 flex flex-col items-start gap-4">
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            {t.footer.servicesTitle}
          </h4>
          <div className="flex flex-col gap-2.5 text-sm text-zinc-500">
            {t.services.items.map((item) => (
              <a key={item.id} href="#services" className="hover:text-violet-400 transition-colors text-start">
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links block 3 - scroll to top (Span 2) */}
        <div className="md:col-span-2 flex flex-col items-start md:items-end gap-4 justify-between">
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider hidden md:block">
            &nbsp;
          </h4>
          <motion.button
            id="scroll-to-top"
            onClick={handleScrollToTop}
            className="p-3.5 rounded-2xl bg-[#0f0c20]/50 border border-white/5 hover:border-violet-500/20 text-zinc-400 hover:text-white transition-all cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex items-center justify-between text-zinc-600 text-xs flex-wrap gap-4 text-start">
        <span>{t.footer.rights}</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-400 transition-colors">{t.footer.legalTitle}</a>
        </div>
      </div>
    </footer>
  );
}
