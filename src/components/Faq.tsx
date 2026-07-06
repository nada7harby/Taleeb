import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { TranslationDictionary } from "../types";

interface FaqProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Faq({ t, locale }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-xs font-bold text-violet-400 uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.faq.sectionBadge}
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.faq.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.faq.sectionSubhead}
          </motion.p>
        </div>

        {/* Elegant FAQ list */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-[#0f0a20] border-violet-500/30 shadow-lg shadow-violet-950/10" 
                    : "bg-[#0d0a18]/45 border-white/5 hover:border-white/10"
                }`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                {/* Trigger Button bar */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-start cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? "text-violet-400" : "text-zinc-500"}`} />
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-violet-300">
                      {item.question}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-full bg-white/5 flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-violet-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Animated Height Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-white/5 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        {item.answer}
                      </div>
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
