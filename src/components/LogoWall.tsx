import { motion, useReducedMotion } from "motion/react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";

interface LogoWallProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

// Real integration partners named in the FAQ — sourced as SVG wordmarks from
// Simple Icons. Rendered in a single neutral tone so the wall reads as one system.
const LOGOS = [
  { slug: "salesforce", name: "Salesforce" },
  { slug: "sap", name: "SAP" },
  { slug: "oracle", name: "Oracle" },
  { slug: "slack", name: "Slack" },
  { slug: "zoom", name: "Zoom" },
  { slug: "hubspot", name: "HubSpot" },
];

export default function LogoWall({ t, locale }: LogoWallProps) {
  const reduce = useReducedMotion();
  const track = [...LOGOS, ...LOGOS];

  return (
    <section className="relative px-4 md:px-8 pb-8 pt-2">
      {/* Seam blend — continues the hero's ambient glow/particles up past this
          section's own top edge (unclipped, so it genuinely bleeds across the
          boundary) and fades it back to plain black within ~14rem, so the two
          sections read as one continuous atmosphere instead of a hard cut. */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-56 overflow-hidden -z-10">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-black/60 to-black" />
        <div className="absolute left-[22%] top-4 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] rounded-full bg-[#3cdb4e]/[0.05] blur-[100px]" />
        <div className="absolute right-[20%] top-8 w-[26vw] h-[26vw] max-w-[280px] max-h-[280px] rounded-full bg-[#40ccd0]/[0.05] blur-[110px]" />
        {/* a few stray embers continuing the hero's particle field */}
        {[
          { x: "12%", y: "20%" }, { x: "34%", y: "42%" }, { x: "58%", y: "16%" },
          { x: "74%", y: "36%" }, { x: "88%", y: "24%" },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{ left: p.x, top: p.y, width: 1.5, height: 1.5 }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-center text-sm text-zinc-500 mb-8"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {locale === "ar"
            ? "يتكامل بسلاسة مع الأنظمة التي تعتمدها مؤسستك"
            : "Plugs into the enterprise stack your teams already run"}
        </motion.p>

        {/* Single marquee (the one permitted on this page) */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className={`flex w-max items-center gap-16 ${reduce ? "" : "animate-marquee"}`}>
            {track.map((logo, i) => (
              <img
                key={`${logo.slug}-${i}`}
                src={`https://cdn.simpleicons.org/${logo.slug}/a1a1aa`}
                alt={logo.name}
                loading="lazy"
                className="h-7 w-auto opacity-55 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 shrink-0"
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs font-mono text-zinc-600 mt-8 tracking-wide">
          {t.hero.activeUsers}
        </p>
      </div>
    </section>
  );
}
