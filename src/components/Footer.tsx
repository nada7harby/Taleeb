import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Instagram, ArrowUp } from "lucide-react";
import { TranslationDictionary } from "../types";

interface FooterProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Footer({ t }: FooterProps) {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.06] bg-black py-16 px-4 md:px-8 relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 text-start">
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#ecdb33] text-black font-mono font-bold text-lg">T</span>
            <span className="text-xl font-bold text-white">{t.nav.brandName}</span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">{t.footer.desc}</p>
          <div className="flex items-center gap-2.5 mt-1">
            {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
              <motion.a
                key={i} href="#" aria-label="social"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-[#ecdb33] hover:border-[#ecdb33]/30 transition-colors"
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">{t.footer.linksTitle}</h4>
          <div className="flex flex-col gap-2.5 text-sm text-zinc-500">
            <a href="#services" className="hover:text-[#ecdb33] transition-colors w-fit">{t.nav.services}</a>
            <a href="#features" className="hover:text-[#ecdb33] transition-colors w-fit">{t.nav.features}</a>
            <a href="#impact" className="hover:text-[#ecdb33] transition-colors w-fit">{t.nav.impact}</a>
            <a href="#faq" className="hover:text-[#ecdb33] transition-colors w-fit">{t.nav.faq}</a>
            <Link to="/about" className="hover:text-[#ecdb33] transition-colors w-fit">About</Link>
            <Link to="/products" className="hover:text-[#ecdb33] transition-colors w-fit">Products</Link>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">{t.footer.servicesTitle}</h4>
          <div className="flex flex-col gap-2.5 text-sm text-zinc-500">
            {t.services.items.map((item) => (
              <a key={item.id} href="#services" className="hover:text-[#ecdb33] transition-colors w-fit">{item.title}</a>
            ))}
          </div>
        </div>

        <div className="md:col-span-1 flex md:justify-end">
          <motion.button
            onClick={toTop} aria-label="Scroll to top"
            className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-black hover:bg-[#ecdb33] transition-colors group h-fit"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto border-t border-white/[0.06] mt-12 pt-8 flex items-center justify-between text-zinc-600 text-xs flex-wrap gap-4">
        <span>{t.footer.rights}</span>
        <a href="#" className="hover:text-zinc-400 transition-colors">{t.footer.legalTitle}</a>
      </div>
    </footer>
  );
}
