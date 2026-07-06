import { motion } from "motion/react";

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-bg-dark pointer-events-none select-none">
      {/* Sleek noise overlay for a cinematic texturing */}
      <div className="absolute inset-0 noise-overlay mix-blend-overlay opacity-30" />

      {/* Dynamic ambient glowing blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-primary/15 blur-[120px] animate-blob"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-primary/10 blur-[150px] animate-blob-reverse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2.5 }}
      />
      <motion.div
        className="absolute top-[40%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-neon-cyan/5 blur-[100px] animate-blob"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3 }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-brand-secondary/5 blur-[90px] animate-blob-reverse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2.2 }}
      />

      {/* Cyberpunk grid overlay with a subtle gradient mask */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
