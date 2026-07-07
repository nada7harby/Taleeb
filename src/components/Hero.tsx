import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";
import heroVideo from "@/assets/hero.mp4";

interface HeroProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

// Deterministic ambient particles (no random at runtime → no hydration jitter).
const PARTICLES = [
  { x: "12%", y: "22%", s: 3, d: 0, dur: 11, c: "#ecdb33" },
  { x: "82%", y: "18%", s: 2, d: 1.4, dur: 13, c: "#40ccd0" },
  { x: "68%", y: "70%", s: 4, d: 0.6, dur: 15, c: "#3cdb4e" },
  { x: "24%", y: "76%", s: 2, d: 2.1, dur: 12, c: "#40ccd0" },
  { x: "46%", y: "30%", s: 2, d: 0.9, dur: 14, c: "#ecdb33" },
  { x: "90%", y: "52%", s: 3, d: 1.8, dur: 16, c: "#ecdb33" },
  { x: "34%", y: "48%", s: 2, d: 2.6, dur: 13, c: "#3cdb4e" },
  { x: "58%", y: "84%", s: 3, d: 0.3, dur: 12, c: "#40ccd0" },
];

export default function Hero({ t, locale }: HeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Defer the video past first paint so the headline is the LCP, not the clip.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => setShowVideo(true)) : window.setTimeout(() => setShowVideo(true), 300);
    return () => { if (!w.requestIdleCallback) clearTimeout(id as number); };
  }, [reduce]);

  // Gentle scroll parallax — video drifts slower than content (slow camera feel).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fade = (delay: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.9, ease: EASE } };

  return (
    <section ref={ref} id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">

      {/* ── Layer 0 · background video ─────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={reduce ? undefined : { y: videoY, scale: videoScale }}>
        {showVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-70 [filter:brightness(0.5)_saturate(0.8)_contrast(0.95)]"
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            style={{
              maskImage: "radial-gradient(ellipse 78% 72% at 50% 42%, #000 40%, transparent 92%)",
              WebkitMaskImage: "radial-gradient(ellipse 78% 72% at 50% 42%, #000 40%, transparent 92%)",
            }}
          />
        )}
      </motion.div>

      {/* ── Layer 1 · cinematic overlays + brand radial glows ──── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Directional darkening for text legibility (respects RTL) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className={`absolute inset-0 ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/85 via-black/30 to-transparent`} />
        {/* Soft brand light pools */}
        <div className="absolute top-[8%] start-[6%] w-[38vw] h-[38vw] rounded-full bg-[#ecdb33]/[0.08] blur-[130px]" />
        <div className="absolute bottom-[6%] end-[10%] w-[40vw] h-[40vw] rounded-full bg-[#40ccd0]/[0.07] blur-[150px]" />
        {/* Vignette + seamless fade into the black page below */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 95% 80% at 50% 40%, transparent 55%, rgba(0,0,0,0.85) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* ── Layer 2 · floating light particles ─────────────────── */}
      {!reduce && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: p.c, boxShadow: `0 0 ${p.s * 4}px ${p.c}` }}
              animate={{ y: [0, -22, 0], opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* ── Layer 3 · content ──────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl flex flex-col items-start gap-7 pt-20">
          <motion.div
            {...fade(0.05)}
            className="inline-flex items-center gap-2 ps-2 pe-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 edge-hi"
          >
            <span className="grid place-items-center w-5 h-5 rounded-full bg-[#3cdb4e]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3cdb4e] shadow-[0_0_8px_#3cdb4e]" />
            </span>
            <span className="text-xs md:text-sm font-medium text-zinc-200">{t.hero.badge}</span>
          </motion.div>

          <h1 className="text-[2.7rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem] lg:leading-[1.03] font-bold tracking-tight text-white [text-wrap:balance]">
            <motion.span className="block" {...fade(0.12)}>{t.hero.headlineStart}</motion.span>
            <motion.span className="block text-[#ecdb33]" {...fade(0.18)}>{t.hero.headlineHighlight}</motion.span>
            <motion.span className="block text-2xl sm:text-3xl lg:text-[2.15rem] font-medium text-zinc-400 mt-3" {...fade(0.24)}>
              {t.hero.headlineEnd}
            </motion.span>
          </h1>

          <motion.p {...fade(0.3)} className="text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-[52ch] line-clamp-3">
            {t.hero.subheading}
          </motion.p>

          <motion.div {...fade(0.38)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-2">
            <motion.a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#ecdb33] font-semibold text-black shadow-[0_12px_45px_-10px_rgba(236,219,51,0.55)]"
              whileHover={reduce ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : ""}`} strokeWidth={2} />
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/25 font-medium text-zinc-100 transition-colors"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Play className="w-4 h-4 fill-[#40ccd0] text-[#40ccd0]" />
              <span>{t.hero.ctaSecondary}</span>
            </motion.a>
          </motion.div>

          {/* Small ambient presence line — calm, no HUD */}
          <motion.div {...fade(0.5)} className="flex items-center gap-2.5 mt-2 text-sm text-zinc-500">
            <span className="relative flex h-2 w-2">
              {!reduce && <span className="absolute inline-flex h-full w-full rounded-full bg-[#3cdb4e] opacity-60 animate-ping" />}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3cdb4e]" />
            </span>
            <span className="font-mono tracking-wide">{t.hero.liveStats}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Layer 4 · ambient floating glass orb ───────────────── */}
      {!reduce && (
        <motion.div
          className="absolute z-[5] end-[8%] top-[26%] hidden lg:block w-28 h-28 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 edge-hi pointer-events-none"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 32% 28%, rgba(236,219,51,0.18), transparent 60%)" }} />
        </motion.div>
      )}
    </section>
  );
}
