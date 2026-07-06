import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, Users, CheckCircle, Zap } from "lucide-react";
import { TranslationDictionary } from "../types";

interface StatisticsProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Statistics({ t, locale }: StatisticsProps) {
  // Simple custom count-up simulator for metrics
  const [counts, setCounts] = useState({
    users: 1.0,
    completion: 5,
    productivity: 5,
    quests: 10,
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("impact");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          // Trigger counting
          const interval = setInterval(() => {
            setCounts((prev) => {
              const u = prev.users < 5.4 ? parseFloat((prev.users + 0.2).toFixed(1)) : 5.4;
              const c = prev.completion < 94 ? prev.completion + 3 : 94;
              const p = prev.productivity < 41.6 ? parseFloat((prev.productivity + 1.5).toFixed(1)) : 41.6;
              const q = prev.quests < 120 ? prev.quests + 4 : 120;

              if (u === 5.4 && c === 94 && p === 41.6 && q === 120) {
                clearInterval(interval);
              }
              return { users: u, completion: c, productivity: p, quests: q };
            });
          }, 40);

          return () => clearInterval(interval);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="impact" className="py-24 relative overflow-hidden px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 text-start">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-xs font-bold text-violet-400 uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.stats.sectionBadge}
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t.stats.sectionTitle}
            </motion.h2>
          </div>
          <div className="lg:col-span-6 text-start lg:text-end">
            <motion.p
              className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-xl lg:ml-auto rtl:lg:mr-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t.stats.sectionSubhead}
            </motion.p>
          </div>
        </div>

        {/* Bento Board: Analytics graph and counts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Block: Sleek Custom SVG Line Chart (Span 7) */}
          <motion.div
            className="lg:col-span-7 bg-[#0d0a18]/60 backdrop-blur border border-violet-500/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet-500/20 transition-colors"
            initial={{ opacity: 0, x: locale === "en" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    {locale === "en" ? "Interactive Growth Paradigm" : "تأثير التلعيب على منحنى تفاعل الأفراد"}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase mt-0.5">
                    Traditional Baseline vs. Tal3eeb Platform engagement
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                    <span className="text-zinc-400">Tal3eeb</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                    <span className="text-zinc-500">Traditional</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="relative w-full h-44 sm:h-52 bg-[#090712] rounded-2xl border border-white/5 p-4 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  
                  {/* Traditional Baseline line (decaying graph) */}
                  <path 
                    d="M 10 70 Q 100 80, 200 120 T 390 135" 
                    fill="none" 
                    stroke="#4b5563" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                  />
                  
                  {/* Tal3eeb line (skyrocketing graph) */}
                  <motion.path 
                    d="M 10 70 Q 100 30, 200 20 T 390 15" 
                    fill="none" 
                    stroke="url(#chartGradient)" 
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Highlight dots */}
                  <circle cx="10" cy="70" r="4" fill="#8b5cf6" />
                  <circle cx="390" cy="15" r="5" fill="#10b981" className="animate-ping" />
                  <circle cx="390" cy="15" r="3.5" fill="#10b981" />
                  <circle cx="390" cy="135" r="3.5" fill="#4b5563" />
                </svg>

                {/* Left indicators overlay */}
                <div className="absolute left-6 top-3 text-[9px] font-mono text-zinc-600">
                  ENGAGEMENT LEVEL: 94%
                </div>
                <div className="absolute right-6 bottom-3 text-[9px] font-mono text-zinc-600">
                  TIME DURATION: 12 WEEKS
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-zinc-500">
              <span>* Data averaged across 50+ enterprise installations.</span>
              <span className="text-emerald-400 font-bold font-mono">Verified +683% Interaction</span>
            </div>
          </motion.div>

          {/* Right Block: Stats Highlight Summary (Span 5) */}
          <motion.div
            className="lg:col-span-5 bg-[#0d0a18]/60 backdrop-blur border border-violet-500/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet-500/20 transition-colors"
            initial={{ opacity: 0, x: locale === "en" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono text-violet-400">
                {locale === "en" ? "MEMBER ENGAGEMENT METRIC" : "تأثير الربط على سلوك الأفراد"}
              </h3>
              
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {locale === "en" ? "Immediate Feedback Retention" : "تأثير الاستجابة الفورية للمكافآت"}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light mt-1">
                    Users given interactive rewards immediately upon goal completion show a 4.8x higher repeat behavioral frequency than those rewarded in annual performance reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {locale === "en" ? "Social Interaction Frequency" : "معدل تفاعل الموظفين الاجتماعي"}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light mt-1">
                    Peer-to-peer appreciation leaderboards and group-based raid targets elevate workplace team trust and internal alignment metrics by over 82%.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 mt-6 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Habit Engineering Engine v2.0</span>
              </span>
            </div>
          </motion.div>

        </div>

        {/* 4 Cards Grid - Animated Statistics Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.stats.items.map((stat, sIdx) => {
            const displayVal = sIdx === 0 ? counts.users : sIdx === 1 ? counts.completion : sIdx === 2 ? counts.productivity : counts.quests;

            return (
              <motion.div
                key={stat.id}
                className="p-6 rounded-3xl bg-[#0f0c20]/45 border border-white/5 hover:border-violet-500/20 transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sIdx * 0.1, duration: 0.5 }}
              >
                {/* Background soft glow bubble */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-violet-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                {/* Big Number */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl md:text-5xl font-extrabold font-mono tracking-tight ${stat.color}`}>
                    {displayVal}
                  </span>
                  <span className={`text-xl font-bold font-mono ${stat.color}`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label and Description */}
                <h4 className="text-sm font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {stat.label}
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
