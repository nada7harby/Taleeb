import type { ComponentType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Trophy, Compass, Coins, BarChart3, UserSquare2, Zap } from "lucide-react";
import { TranslationDictionary, AccentKey } from "../types";
import { accents, EASE } from "../theme";

interface FeaturesProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Trophy, Compass, Coins, BarChart3, UserSquare2, Zap,
};

// Asymmetric bento: 6 items, 6 cells, no repeating equal-column row.
const SPANS = ["lg:col-span-5", "lg:col-span-7", "lg:col-span-4", "lg:col-span-8", "lg:col-span-7", "lg:col-span-5"];

export default function Features({ t }: FeaturesProps) {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="py-24 md:py-32 relative px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* No eyebrow here (eyebrow discipline). Headline + sub stacked. */}
        <div className="max-w-3xl mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: EASE }}
          >
            {t.features.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.features.sectionSubhead}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {t.features.items.map((feat, idx) => {
            const c = accents[feat.color as AccentKey];
            const Icon = ICONS[feat.iconName] ?? Zap;
            return (
              <motion.div
                key={feat.id}
                className={`${SPANS[idx]} group relative rounded-3xl bg-[#0a0a0c]/70 border border-white/[0.06] ${c.hoverBorder} p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-colors duration-400`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.55, ease: EASE }}
                whileHover={reduce ? undefined : { y: -6 }}
              >
                <div
                  className="absolute -top-20 -end-16 w-44 h-44 rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.18] transition-opacity duration-500 pointer-events-none"
                  style={{ background: c.hex }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`grid place-items-center w-12 h-12 rounded-2xl ${c.bgSoft} border ${c.border} ${c.text}`}>
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <span className={`px-2.5 py-1 rounded-full ${c.bgSoft} border ${c.border} text-[10px] font-semibold uppercase tracking-wider ${c.text}`}>
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">{feat.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md">{feat.description}</p>
                </div>
                <div className="relative border-t border-white/[0.06] pt-4 mt-6">
                  <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${c.text}`}>
                    {feat.stats}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
