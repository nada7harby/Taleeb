import { motion } from "motion/react";
import { Trophy, Compass, Coins, BarChart3, UserSquare2, Zap } from "lucide-react";
import { TranslationDictionary } from "../types";

interface FeaturesProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Features({ t, locale }: FeaturesProps) {
  return (
    <section id="features" className="py-24 relative overflow-hidden px-4 md:px-8 bg-black/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.features.sectionBadge}
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.features.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.features.sectionSubhead}
          </motion.p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((feat, idx) => {
            return (
              <motion.div
                key={feat.id}
                className="relative p-6 sm:p-8 rounded-3xl bg-[#0f0c20]/55 border border-white/5 hover:border-violet-500/20 shadow-xl transition-all duration-500 group overflow-hidden flex flex-col justify-between"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                {/* Background Ambient Color Spots */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Badge & Category Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${feat.color}`}>
                      {feat.badge}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      SYSTEM MODULE {idx + 1}
                    </span>
                  </div>

                  {/* Icon Frame */}
                  <div className="mb-5 inline-block">
                    <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl text-violet-400 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {feat.iconName === "Trophy" && <Trophy className="w-5 h-5" />}
                      {feat.iconName === "Compass" && <Compass className="w-5 h-5" />}
                      {feat.iconName === "Coins" && <Coins className="w-5 h-5" />}
                      {feat.iconName === "BarChart3" && <BarChart3 className="w-5 h-5" />}
                      {feat.iconName === "UserSquare2" && <UserSquare2 className="w-5 h-5" />}
                      {feat.iconName === "Zap" && <Zap className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-violet-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-6">
                    {feat.description}
                  </p>
                </div>

                {/* Performance Footnote Stat */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                    Impact Metric:
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
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
