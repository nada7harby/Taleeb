import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";

interface TestimonialsProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Testimonials({ t, locale }: TestimonialsProps) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const items = t.testimonials.items;
  const prev = () => setI((p) => (p === 0 ? items.length - 1 : p - 1));
  const next = () => setI((p) => (p === items.length - 1 ? 0 : p + 1));

  return (
    <section id="testimonials" className="py-24 md:py-32 relative px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* No eyebrow (discipline) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: EASE }}
          >
            {t.testimonials.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.testimonials.sectionSubhead}
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <Quote className="absolute -top-8 -start-4 w-24 h-24 text-[#ecdb33]/[0.07] hidden md:block" />

          <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              {items.map((item, idx) => idx === i && (
                <motion.figure
                  key={item.id}
                  className="w-full bg-[#0a0a0c]/80 border border-white/[0.06] rounded-3xl p-6 sm:p-10"
                  initial={reduce ? false : { opacity: 0, x: locale === "en" ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: locale === "en" ? -40 : 40 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: item.rating }).map((_, r) => (
                      <Star key={r} className="w-4 h-4 text-[#ecdb33] fill-[#ecdb33]" />
                    ))}
                  </div>
                  <blockquote className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-8 line-clamp-4">
                    {item.quote}
                  </blockquote>
                  <figcaption className="flex items-center gap-3.5 border-t border-white/[0.06] pt-6">
                    <img src={item.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-white/10" />
                    <div>
                      <cite className="text-sm sm:text-base font-bold text-white not-italic block">{item.name}</cite>
                      <span className="text-xs text-zinc-500 block mt-0.5">{item.role}, {item.company}</span>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} aria-label={locale === "en" ? "Previous" : "السابق"} className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-[#ecdb33]/40 transition-colors">
              <ChevronLeft className={`w-5 h-5 ${locale === "ar" ? "rotate-180" : ""}`} />
            </button>
            <div className="flex gap-2">
              {items.map((_, d) => (
                <button
                  key={d}
                  onClick={() => setI(d)}
                  aria-label={`${d + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${d === i ? "w-7 bg-[#ecdb33]" : "w-2 bg-zinc-700 hover:bg-zinc-600"}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label={locale === "en" ? "Next" : "التالي"} className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-[#ecdb33]/40 transition-colors">
              <ChevronRight className={`w-5 h-5 ${locale === "ar" ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
