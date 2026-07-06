import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TranslationDictionary } from "../types";

interface TestimonialsProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Testimonials({ t, locale }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? t.testimonials.items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === t.testimonials.items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden px-4 md:px-8 bg-black/15">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-xs font-bold text-violet-400 uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.testimonials.sectionBadge}
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.testimonials.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.testimonials.sectionSubhead}
          </motion.p>
        </div>

        {/* Carousel Layout for Client Reviews */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Big Quote Accent mark */}
          <div className="absolute -top-10 -left-6 opacity-[0.03] select-none pointer-events-none hidden md:block">
            <Quote className="w-40 h-40 text-violet-400" />
          </div>

          <div className="relative min-h-[350px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {t.testimonials.items.map((item, index) => {
                if (index !== activeIndex) return null;

                return (
                  <motion.div
                    key={item.id}
                    className="w-full bg-[#0e0a20]/75 backdrop-blur-md rounded-3xl border border-violet-500/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
                    initial={{ opacity: 0, x: locale === "en" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: locale === "en" ? -50 : 50 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Glowing ornament inside feedback card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-[40px]" />

                    {/* Rating stars block */}
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(item.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    {/* Review Quote Text */}
                    <blockquote className="text-zinc-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light mb-8 italic">
                      "{item.quote}"
                    </blockquote>

                    {/* Author Signature Info */}
                    <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-6 flex-wrap">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full border-2 border-violet-500/30 object-cover"
                        />
                        <div className="text-start">
                          <cite className="text-sm sm:text-base font-bold text-white not-italic block">
                            {item.name}
                          </cite>
                          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium block mt-0.5 uppercase tracking-wider">
                            {item.role}, {item.company}
                          </span>
                        </div>
                      </div>

                      {/* Achievements visual label representing corporate victory */}
                      <span className="px-3 py-1.5 rounded-full bg-[#1b1735]/60 border border-violet-500/20 text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        MISSION ACCOMPLISHED
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/15 text-zinc-400 hover:text-white hover:bg-violet-600/25 hover:border-violet-500/30 transition-all duration-300"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slider Dots */}
            <div className="flex gap-2">
              {t.testimonials.items.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    dotIdx === activeIndex ? "w-6 bg-violet-500" : "w-2.5 bg-zinc-700 hover:bg-zinc-600"
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/15 text-zinc-400 hover:text-white hover:bg-violet-600/25 hover:border-violet-500/30 transition-all duration-300"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
