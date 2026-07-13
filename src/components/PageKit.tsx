import { Fragment, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AccentKey, HighlightedText, LeaderboardPlayer } from "../types";
import { accents, EASE } from "../theme";

/** Renders a HighlightedText value, wrapping the marked substring(s) in the accent
    color — order-independent so AR/EN copy can highlight different words. */
export function renderHighlight(value: HighlightedText, colorClass = "text-[#ecdb33]"): ReactNode {
  const words = (Array.isArray(value.highlight) ? value.highlight : value.highlight ? [value.highlight] : []).filter(Boolean);
  if (words.length === 0) return value.text;
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "g");
  return value.text
    .split(re)
    .filter((part) => part.length > 0)
    .map((part, i) =>
      words.includes(part) ? (
        <span key={i} className={colorClass}>{part}</span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
}

/** Small pill badge above a section heading — the site's established "eyebrow" pattern. */
export function Eyebrow({ icon: Icon, children, color = "yellow" }: { icon: LucideIcon; children: ReactNode; color?: AccentKey }) {
  const c = accents[color];
  return (
    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${c.bgSoft} border ${c.border} ${c.text} text-xs font-semibold tracking-wide`}>
      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  eyebrowIcon?: LucideIcon;
  eyebrowLabel?: ReactNode;
  eyebrowColor?: AccentKey;
  title: ReactNode;
  subhead?: ReactNode;
  center?: boolean;
  className?: string;
}

/** Eyebrow + h2 + subhead, fading up on scroll — matches Statistics/Testimonials headers. */
export function SectionHeader({ eyebrowIcon, eyebrowLabel, eyebrowColor = "yellow", title, subhead, center, className = "" }: SectionHeaderProps) {
  const reduce = useReducedMotion();
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-14 ${className}`}>
      {eyebrowIcon && eyebrowLabel && (
        <motion.div
          className={`mb-5 ${center ? "flex justify-center" : ""}`}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: EASE }}
        >
          <Eyebrow icon={eyebrowIcon} color={eyebrowColor}>{eyebrowLabel}</Eyebrow>
        </motion.div>
      )}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ease: EASE }}
      >
        {title}
      </motion.h2>
      {subhead && (
        <motion.p
          className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {subhead}
        </motion.p>
      )}
    </div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  accent?: AccentKey;
  className?: string;
  delay?: number;
}

/** The site's standard dark glass card — bg-[#0a0a0c]/~75, hairline border, rounded-3xl, fades up into view. */
export function GlassCard({ children, accent, className = "", delay = 0 }: GlassCardProps) {
  const reduce = useReducedMotion();
  const hoverBorder = accent ? accents[accent].hoverBorder : "hover:border-white/[0.14]";
  return (
    <motion.div
      className={`bg-[#0a0a0c]/75 border border-white/[0.06] ${hoverBorder} rounded-3xl transition-colors duration-300 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** A soft-tinted rounded icon box in one of the four brand accents. */
export function IconTile({ icon: Icon, color, size = "md" }: { icon: LucideIcon; color: AccentKey; size?: "sm" | "md" | "lg" }) {
  const c = accents[color];
  const box = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const iconSize = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";
  return (
    <span className={`grid place-items-center ${box} rounded-2xl ${c.bgSoft} border ${c.border} ${c.text} flex-shrink-0`}>
      <Icon className={iconSize} strokeWidth={2} />
    </span>
  );
}

/** Gradient-circle initials avatar — used for named people where no real photo exists. */
export function InitialsAvatar({ name, color, className = "" }: { name: string; color: AccentKey; className?: string }) {
  const c = accents[color];
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`grid place-items-center rounded-full ${c.bgSoft} border ${c.borderStrong} ${c.text} font-bold ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/** Full-bleed hero band shared by About/Products — mirrors the homepage hero's dark,
    glow-accented cinematic treatment instead of the live site's light green gradient. */
export function PageHeroShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden bg-black pt-40 pb-24 md:pt-48 md:pb-32 px-4 md:px-8 ${className}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 start-1/4 w-[46vw] h-[46vw] max-w-[36rem] max-h-[36rem] rounded-full bg-[#ecdb33]/[0.08] blur-[130px]" />
        <div className="absolute -bottom-40 end-1/4 w-[42vw] h-[42vw] max-w-[36rem] max-h-[36rem] rounded-full bg-[#40ccd0]/[0.08] blur-[140px]" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto">{children}</div>
    </section>
  );
}

/** Mono-figure telemetry chip — for XP / point values, per the Telemetry Face Rule. */
export function XPChip({ value, color = "yellow", className = "" }: { value: string; color?: AccentKey; className?: string }) {
  const c = accents[color];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${c.bgSoft} ${c.text} ${className}`}>
      {value}
    </span>
  );
}

/** Level indicator — a ring badge with a mono level number, or a pulsing "current" pill. */
export function LevelBadge({ level, current = false, color = "green", label }: { level: number; current?: boolean; color?: AccentKey; label?: string }) {
  const c = accents[color];
  if (current) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${c.bgSoft} border ${c.border} ${c.text} text-[11px] font-bold font-mono flex-shrink-0`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} /> {label ?? `LVL ${level}`}
      </span>
    );
  }
  return (
    <span className={`relative z-10 grid place-items-center w-11 h-11 rounded-full flex-shrink-0 bg-black border-2 ${c.borderStrong} ${c.text} text-xs font-mono font-bold`}>
      {String(level).padStart(2, "0")}
    </span>
  );
}

/** Weekly streak meter — flame + fill dots, one per elapsed day. */
export function StreakMeter({ days, total = 7, title, subtitle }: { days: number; total?: number; title: string; subtitle: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
      <Flame className="w-5 h-5 text-[#d04242] flex-shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="text-[11px] text-zinc-500">{subtitle}</div>
      </div>
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <motion.span
            key={i}
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i < days ? "bg-[#d04242]" : "bg-white/10"}`}
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Live-feeling leaderboard — the Products page's one genuine interactive moment
 * (per PRODUCT.md/DESIGN.md decision), not a static screenshot. Scores tick up
 * on a client-side interval and rows reorder with a FLIP animation. Frozen
 * (no auto-updates) under prefers-reduced-motion, per the same doc's a11y rule.
 */
export function Leaderboard({
  players,
  liveLabel,
  rankLabel,
  scoreLabel,
}: {
  players: LeaderboardPlayer[];
  liveLabel: string;
  rankLabel: string;
  scoreLabel: string;
}) {
  const reduce = useReducedMotion();
  const [rows, setRows] = useState<LeaderboardPlayer[]>(() =>
    [...players].sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }))
  );

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setRows((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const bumped = prev.map((p, i) => (i === idx ? { ...p, score: p.score + 5 + Math.floor(Math.random() * 45) } : p));
        return [...bumped].sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }));
      });
    }, 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <ul className="flex flex-col gap-2" aria-label={liveLabel}>
      {rows.map((p, i) => {
        const c = accents[p.color];
        const topThree = i < 3;
        return (
          <motion.li
            key={p.name}
            layout={reduce ? false : true}
            transition={{ duration: 0.5, ease: EASE }}
            className={`flex items-center gap-3 sm:gap-4 rounded-2xl px-3 sm:px-4 py-3 border ${topThree ? `${c.bgSoft} ${c.border}` : "bg-white/[0.02] border-white/[0.06]"
              }`}
          >
            <span aria-label={`${rankLabel} ${p.rank}`} className={`w-7 text-center font-mono text-sm font-bold flex-shrink-0 ${topThree ? c.text : "text-zinc-500"}`}>
              {p.rank}
            </span>
            <InitialsAvatar name={p.name} color={p.color} className="w-9 h-9 text-xs flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{p.name}</div>
              <div className="text-[11px] text-zinc-500 truncate">{p.affiliation}</div>
            </div>
            <motion.span
              key={p.score}
              aria-label={`${scoreLabel} ${p.score}`}
              initial={reduce ? false : { opacity: 0.5, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`font-mono text-sm font-bold flex-shrink-0 ${c.text}`}
            >
              {p.score.toLocaleString()}
            </motion.span>
          </motion.li>
        );
      })}
    </ul>
  );
}
