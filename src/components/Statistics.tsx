import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { TrendingUp, Zap, Users, CheckCircle2 } from "lucide-react";
import { TranslationDictionary, AccentKey } from "../types";
import { accents, EASE } from "../theme";

interface StatisticsProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Statistics({ t, locale }: StatisticsProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const targets = t.stats.items.map((s) => s.value);
  const [counts, setCounts] = useState<number[]>(() => (reduce ? targets : targets.map(() => 0)));

  // One-shot count-up, triggered when the tiles enter view. No scroll listener.
  useEffect(() => {
    if (!inView || reduce) { if (reduce) setCounts(targets); return; }
    let raf = 0;
    let startTs = 0;
    const dur = 1500;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts(targets.map((tv) => (Number.isInteger(tv) ? Math.round(tv * e) : parseFloat((tv * e).toFixed(1)))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <section id="impact" className="py-24 md:py-32 relative px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Stacked header (no split-header, no eyebrow) */}
        <div className="max-w-3xl mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: EASE }}
          >
            {t.stats.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.stats.sectionSubhead}
          </motion.p>
        </div>

        {/* Chart + insight panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          <motion.div
            className="lg:col-span-7 bg-[#0a0a0c]/80 border border-white/[0.06] rounded-3xl p-6 sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#3cdb4e]" strokeWidth={2} />
                {locale === "en" ? "Engagement, tracked over 12 weeks" : "منحنى التفاعل عبر 12 أسبوعاً"}
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-zinc-300"><span className="w-2.5 h-2.5 rounded-full bg-[#ecdb33]" /> Tal3eeb</span>
                <span className="flex items-center gap-1.5 text-zinc-500"><span className="w-2.5 h-2.5 rounded-full bg-zinc-600" /> {locale === "en" ? "Baseline" : "التقليدي"}</span>
              </div>
            </div>

            <div className="relative w-full h-48 sm:h-56 bg-black rounded-2xl border border-white/[0.06] p-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
                {[20, 70, 120].map((y) => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}
                <path d="M 10 70 Q 100 82, 200 118 T 390 132" fill="none" stroke="#3f3f46" strokeWidth="2" strokeDasharray="4 5" />
                <motion.path
                  d="M 10 70 Q 100 32, 200 22 T 390 14"
                  fill="none" stroke="url(#g)" strokeWidth="4" strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ecdb33" />
                    <stop offset="55%" stopColor="#40ccd0" />
                    <stop offset="100%" stopColor="#3cdb4e" />
                  </linearGradient>
                </defs>
                <circle cx="390" cy="14" r="5" fill="#3cdb4e" />
                <circle cx="390" cy="132" r="3.5" fill="#3f3f46" />
              </svg>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
              <span>{locale === "en" ? "Averaged across 50+ enterprise installs." : "متوسط عبر أكثر من 50 تطبيقاً مؤسسياً."}</span>
              <span className="text-[#3cdb4e] font-bold font-mono">+683%</span>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 bg-[#0a0a0c]/80 border border-white/[0.06] rounded-3xl p-6 sm:p-8 flex flex-col gap-6 justify-center"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <div className="flex items-start gap-4">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#3cdb4e]/10 border border-[#3cdb4e]/25 text-[#3cdb4e] flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">{locale === "en" ? "Immediate feedback retention" : "أثر الاستجابة الفورية"}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
                  {locale === "en"
                    ? "Rewards delivered the moment a goal is met produce 4.8x higher repeat behavior than annual reviews."
                    : "المكافآت الفورية عند الإنجاز تحقق تكراراً للسلوك أعلى بـ 4.8 مرة من التقييمات السنوية."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#40ccd0]/10 border border-[#40ccd0]/25 text-[#40ccd0] flex-shrink-0">
                <Users className="w-5 h-5" strokeWidth={2} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">{locale === "en" ? "Social interaction frequency" : "معدل التفاعل الاجتماعي"}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
                  {locale === "en"
                    ? "Peer leaderboards and group raid targets lift team trust and alignment by over 82%."
                    : "لوحات الصدارة والأهداف الجماعية ترفع الثقة والانسجام بأكثر من 82%."}
                </p>
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-4 flex items-center gap-2 text-xs text-zinc-500">
              <Zap className="w-4 h-4 text-[#ecdb33]" /> <span>{locale === "en" ? "Habit engineering engine" : "محرك هندسة العادات"}</span>
            </div>
          </motion.div>
        </div>

        {/* Stat tiles with count-up */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.stats.items.map((stat, i) => {
            const c = accents[stat.color as AccentKey];
            const val = counts[i];
            const display = Number.isInteger(targets[i]) ? Math.round(val) : val.toFixed(1);
            return (
              <motion.div
                key={stat.id}
                className={`group rounded-3xl bg-[#0a0a0c]/70 border border-white/[0.06] ${c.hoverBorder} p-6 transition-colors duration-300`}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
              >
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-4xl md:text-5xl font-bold font-mono tracking-tight tabular-nums ${c.text}`}>{display}</span>
                  <span className={`text-xl font-bold font-mono ${c.text}`}>{stat.suffix}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{stat.label}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
