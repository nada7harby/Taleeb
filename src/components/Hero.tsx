import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play, Flame, Coins, Zap, Radio } from "lucide-react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";
import heroVideo from "@/assets/hero.mp4";

interface HeroProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Hero({ t, locale }: HeroProps) {
  const reduce = useReducedMotion();
  const [xp, setXp] = useState(1250);
  const [progress, setProgress] = useState(45);
  const [complete, setComplete] = useState(false);

  // Live quest loop — demonstrates the product's core mechanic on the console.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setComplete(true);
          setTimeout(() => { setProgress(8); setComplete(false); setXp(1250); }, 2600);
          return 100;
        }
        const step = Math.floor(Math.random() * 14) + 8;
        setXp((x) => Math.min(x + step * 22, 2450));
        return Math.min(p + step, 100);
      });
    }, 1900);
    return () => clearInterval(id);
  }, [reduce]);

  const boost = () => {
    if (progress >= 100) return;
    setProgress((p) => {
      const n = Math.min(p + 16, 100);
      if (n === 100) { setComplete(true); setTimeout(() => { setProgress(8); setComplete(false); setXp(1250); }, 2600); }
      return n;
    });
    setXp((x) => Math.min(x + 320, 2450));
  };

  const fade = (delay: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.7, ease: EASE } };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center px-4 md:px-8 pt-28 lg:pt-24 pb-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* ---------- Copy column ---------- */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <motion.div
            {...fade(0)}
            className="inline-flex items-center gap-2 ps-2 pe-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10"
          >
            <span className="grid place-items-center w-5 h-5 rounded-full bg-[#3cdb4e]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3cdb4e]" />
            </span>
            <span className="text-xs md:text-sm font-medium text-zinc-300">{t.hero.badge}</span>
          </motion.div>

          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.1rem] lg:leading-[1.02] font-bold tracking-tight text-white">
            <motion.span className="block" {...fade(0.06)}>{t.hero.headlineStart}</motion.span>
            <motion.span className="block text-[#ecdb33]" {...fade(0.12)}>{t.hero.headlineHighlight}</motion.span>
            <motion.span className="block text-2xl sm:text-3xl lg:text-[2.1rem] font-medium text-zinc-400 mt-3" {...fade(0.18)}>
              {t.hero.headlineEnd}
            </motion.span>
          </h1>

          <motion.p {...fade(0.24)} className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-[54ch] line-clamp-3">
            {t.hero.subheading}
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-1">
            <motion.a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#ecdb33] font-semibold text-black shadow-[0_12px_40px_-10px_rgba(236,219,51,0.6)]"
              whileHover={reduce ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : ""}`} strokeWidth={2} />
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 font-medium text-zinc-200 transition-colors"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Play className="w-4 h-4 fill-[#40ccd0] text-[#40ccd0]" />
              <span>{t.hero.ctaSecondary}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* ---------- Console column (the hero video) ---------- */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-xl aspect-[4/3.4] sm:aspect-[4/3] rounded-[28px] overflow-hidden console-glow cursor-pointer group"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
            onClick={boost}
          >
            {/* Brand video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideo}
              autoPlay={!reduce}
              loop
              muted
              playsInline
              preload="auto"
            />
            {/* Legibility scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[28px]" />
            {/* Screen sheen */}
            <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/10 blur-2xl skew-x-12 animate-sheen pointer-events-none" />

            {/* Top status row */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-[#d04242]/40 text-[10px] font-mono font-semibold text-[#d04242] uppercase tracking-wider">
                <Radio className="w-3 h-3" /> Live
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] font-mono text-zinc-300 tracking-wider">
                TAL3EEB · ENGINE
              </span>
            </div>

            {/* HUD overlay — live quest */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
              <div className="rounded-2xl bg-black/55 backdrop-blur-md border border-white/10 edge-hi p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#ecdb33] text-black">
                      <Zap className="w-4.5 h-4.5 fill-black" strokeWidth={2} />
                    </span>
                    <div className="leading-tight">
                      <span className={`block text-[10px] font-mono font-bold uppercase tracking-wider ${complete ? "text-[#3cdb4e]" : "text-[#ecdb33]"}`}>
                        {complete ? t.hero.cards.questCompleted : t.hero.cards.questName}
                      </span>
                      <span className="block text-[11px] text-zinc-400 mt-0.5">{t.hero.cards.rank}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#ecdb33] text-sm tabular-nums">{xp.toLocaleString()} XP</span>
                </div>

                <div className="h-2.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${complete ? "bg-[#3cdb4e]" : "bg-[#ecdb33]"}`}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-zinc-500">
                  <span className="tabular-nums">{progress}% · Milestone 4/5</span>
                  <span className="text-[#40ccd0]">{locale === "ar" ? "انقر لتعزيز التقدم" : "Tap to boost"}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating chips */}
          <motion.div
            className="absolute -top-3 -start-3 sm:-start-6 flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/70 backdrop-blur border border-[#d04242]/30 shadow-xl"
            animate={reduce ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="w-4 h-4 text-[#d04242]" />
            <span className="text-xs font-mono font-bold text-[#d04242]">12 {locale === "ar" ? "يوم" : "day"} streak</span>
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -end-2 sm:-end-6 flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/70 backdrop-blur border border-[#3cdb4e]/30 shadow-xl"
            animate={reduce ? undefined : { y: [0, 11, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            <Coins className="w-4 h-4 text-[#3cdb4e]" />
            <span className="text-xs font-mono font-bold text-[#3cdb4e]">8,400 {locale === "ar" ? "عملة" : "coins"}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
