import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";
import heroVideo from "@/assets/hero2.mp4";

interface HeroProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

// A handful of faint dust motes — barely-there, monochrome, no colored glow.
const MOTES = [
  { x: "22%", y: "34%", s: 2, d: 0, dur: 16 },
  { x: "71%", y: "28%", s: 1.5, d: 2.5, dur: 19 },
  { x: "58%", y: "66%", s: 2, d: 1.2, dur: 17 },
  { x: "38%", y: "72%", s: 1.5, d: 3.4, dur: 21 },
  { x: "80%", y: "54%", s: 2, d: 0.8, dur: 18 },
];

export default function Hero({ t, locale }: HeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Defer the video past first paint so the title is the LCP, not the clip.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => setShowVideo(true)) : window.setTimeout(() => setShowVideo(true), 300);
    return () => { if (!w.requestIdleCallback) clearTimeout(id as number); };
  }, [reduce]);

  // Gentle scroll parallax layered on top of the slow CSS camera push.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 1.1, ease: EASE } };

  return (
    <section ref={ref} id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black">

      {/* ── Layer 0 · the environment (video) ──────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={reduce ? undefined : { y: videoY }}>
        {showVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-95 animate-cine [filter:brightness(0.68)_saturate(0.85)_contrast(1.04)_hue-rotate(-6deg)]"
            src={heroVideo}
            autoPlay loop muted playsInline preload="metadata" aria-hidden="true"
            style={{
              maskImage: "radial-gradient(ellipse 95% 88% at 55% 45%, #000 62%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 95% 88% at 55% 45%, #000 62%, transparent 100%)",
            }}
          />
        )}
      </motion.div>

      {/* ── Layer 1 · cinematic grade, fog, rays, vignette ─────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Teal-shadow color grade (Dune / BR2049 cool push) — light touch */}
        <div className="absolute inset-0 bg-[#081018]/25 mix-blend-multiply" />
        {/* Soft cool bloom on the illuminated subject only */}
        <div className="absolute start-[14%] top-[38%] w-[36vw] h-[36vw] rounded-full bg-[#40ccd0]/[0.05] blur-[140px]" />
        {/* Volumetric fog banks, slowly drifting */}
        <div className={`absolute -bottom-1/4 -start-[10%] w-[70vw] h-[55vh] rounded-full bg-[#0b1a24]/40 blur-[120px] ${reduce ? "" : "animate-fog"}`} />
        <div className={`absolute top-[10%] end-[-8%] w-[50vw] h-[45vh] rounded-full bg-[#0a141c]/30 blur-[130px] ${reduce ? "" : "animate-fog"}`} style={{ animationDelay: "-14s" }} />
        {/* Faint diagonal light rays */}
        <div className="absolute -top-[30%] start-[24%] w-[22%] h-[170%] rotate-[14deg] bg-gradient-to-b from-white/[0.045] via-white/[0.015] to-transparent blur-2xl" />
        {/* Directional legibility scrim — dark behind copy, clears to reveal the
            subject and energy streams on the opposite side (RTL-aware) */}
        <div className={`absolute inset-0 ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/80 from-5% via-black/20 via-45% to-transparent to-75%`} />
        {/* Top + bottom cinematic falloff (bottom blends into the black page) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black" />
        {/* Lens vignette — softened so the centre stays open */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 96% 82% at 52% 44%, transparent 58%, rgba(0,0,0,0.7) 100%)" }} />
      </div>

      {/* ── Layer 2 · film grain ───────────────────────────────── */}
      <div className="absolute inset-0 z-[2] grain mix-blend-overlay opacity-[0.1] pointer-events-none" />

      {/* ── Layer 3 · dust motes ───────────────────────────────── */}
      {!reduce && (
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {MOTES.map((m, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/40"
              style={{ left: m.x, top: m.y, width: m.s, height: m.s }}
              animate={{ y: [0, -26, 0], opacity: [0.06, 0.28, 0.06] }}
              transition={{ duration: m.dur, delay: m.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* ── Layer 4 · content (calm title card) ────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-2xl flex flex-col items-start gap-8">
          {/* Title-card label — a hairline, not a glowing pill */}
          <motion.div {...rise(0.1)} className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/25" />
            <span className="text-[11px] font-medium uppercase tracking-[0.34em] text-zinc-400">{t.hero.badge}</span>
          </motion.div>

          {/* Short, powerful headline — two lines */}
          <h1 className="text-[3rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] lg:leading-[1.03] font-semibold tracking-tight text-white/95 [text-wrap:balance]">
            <motion.span className="block" {...rise(0.2)}>{t.hero.headlineStart}</motion.span>
            <motion.span className="block text-[#ecdb33]" {...rise(0.3)}>{t.hero.headlineHighlight}</motion.span>
          </h1>

          {/* One concise supporting sentence */}
          <motion.p {...rise(0.42)} className="text-lg sm:text-xl text-zinc-300/85 font-light tracking-tight max-w-[40ch]">
            {t.hero.headlineEnd}
          </motion.p>

          <motion.div {...rise(0.54)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-4">
            <motion.a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ecdb33] font-semibold text-black shadow-[0_10px_30px_-14px_rgba(236,219,51,0.45)]"
              whileHover={reduce ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : ""}`} strokeWidth={2} />
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-zinc-300 hover:text-white font-medium transition-colors"
              whileHover={reduce ? undefined : { x: locale === "ar" ? -3 : 3 }}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.hero.ctaSecondary}</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
