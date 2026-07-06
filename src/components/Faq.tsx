import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";

interface FaqProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Faq({ t }: FaqProps) {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(t.faq.items[0]?.id ?? null);

  return (
    <section id="faq" className="py-24 md:py-32 relative px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left rail heading (no eyebrow) */}
        <div className="lg:col-span-4">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white lg:sticky lg:top-28"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: EASE }}
          >
            {t.faq.sectionTitle}
            <span className="block text-base font-normal text-zinc-500 mt-4 max-w-xs leading-relaxed">
              {t.faq.sectionSubhead}
            </span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {t.faq.items.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${isOpen ? "bg-[#0a0a0c] border-[#ecdb33]/30" : "bg-[#0a0a0c]/50 border-white/[0.06] hover:border-white/15"}`}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: EASE }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-start"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-semibold transition-colors ${isOpen ? "text-white" : "text-zinc-200"}`}>
                    {item.question}
                  </span>
                  <span className={`grid place-items-center w-8 h-8 rounded-full flex-shrink-0 transition-colors ${isOpen ? "bg-[#ecdb33] text-black" : "bg-white/[0.05] text-zinc-400"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                    >
                      <p className="px-5 sm:px-6 pb-6 pt-1 text-sm text-zinc-400 leading-relaxed max-w-[62ch]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
