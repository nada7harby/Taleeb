import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { AccentKey } from "../types";
import { accents, EASE } from "../theme";

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
