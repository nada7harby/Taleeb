import { motion, useReducedMotion } from "motion/react";

/**
 * Fixed ambient layer behind the whole page. A true-black canvas with four
 * very low-opacity brand-color light pools (one per HUD accent), a masked
 * grid, and a fine grain film. Pointer-events off, never scrolls.
 */
export default function BackgroundEffect() {
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-black pointer-events-none select-none">
      {/* Brand light pools */}
      <motion.div
        className={`absolute top-[-14%] left-[-8%] w-[46vw] h-[46vw] rounded-full bg-[#ecdb33]/10 blur-[130px] ${reduce ? "" : "animate-drift"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className={`absolute bottom-[-16%] right-[-10%] w-[52vw] h-[52vw] rounded-full bg-[#40ccd0]/10 blur-[150px] ${reduce ? "" : "animate-drift-slow"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2.4 }}
      />
      <motion.div
        className={`absolute top-[42%] right-[22%] w-[34vw] h-[34vw] rounded-full bg-[#3cdb4e]/[0.07] blur-[120px] ${reduce ? "" : "animate-drift"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3 }}
      />
      <motion.div
        className={`absolute bottom-[26%] left-[14%] w-[30vw] h-[30vw] rounded-full bg-[#d04242]/[0.06] blur-[110px] ${reduce ? "" : "animate-drift-slow"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2.6 }}
      />

      {/* Masked technical grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, #000 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, #000 35%, transparent 100%)",
        }}
      />

      {/* Grain film */}
      <div className="absolute inset-0 grain mix-blend-overlay opacity-40" />

      {/* Vignette to seat everything on black */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 55%, rgba(0,0,0,0.65) 100%)" }}
      />
    </div>
  );
}
