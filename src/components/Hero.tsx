import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Compass, Sparkles, Flame, Coins, CheckCircle, ArrowRight, MousePointerClick } from "lucide-react";
import { TranslationDictionary } from "../types";

interface HeroProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Hero({ t, locale }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"quest" | "leaderboard" | "achievement">("quest");
  const [xp, setXp] = useState(1250);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questProgress, setQuestProgress] = useState(45);

  // Dynamic interval simulation for gamification actions
  useEffect(() => {
    const interval = setInterval(() => {
      setQuestProgress((prev) => {
        if (prev >= 100) {
          setIsCompleted(true);
          setTimeout(() => {
            setQuestProgress(0);
            setIsCompleted(false);
            setXp(1250);
          }, 3000);
          return 100;
        }
        if (prev === 0) {
          return 10;
        }
        const step = Math.floor(Math.random() * 20) + 10;
        setXp((x) => Math.min(x + step * 25, 2450));
        return prev + step;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleManualQuestClick = () => {
    if (questProgress < 100) {
      setQuestProgress((p) => {
        const next = Math.min(p + 15, 100);
        if (next === 100) {
          setIsCompleted(true);
          setTimeout(() => {
            setQuestProgress(0);
            setIsCompleted(false);
            setXp(1250);
          }, 3500);
        }
        setXp((x) => Math.min(x + 300, 2450));
        return next;
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left/Right Column: Text Content (Span 7) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-start">
          
          {/* Badge */}
          <motion.div
            id="hero-badge"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/15 border border-violet-500/30 text-xs md:text-sm font-semibold text-violet-300 shadow-md shadow-violet-950/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t.hero.badge}</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.15]">
            <motion.span
              className="block opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              {t.hero.headlineStart}
            </motion.span>{" "}
            <motion.span
              className="relative inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent glow-primary py-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t.hero.headlineHighlight}
            </motion.span>{" "}
            <motion.span
              className="block opacity-90 text-2xl sm:text-3xl md:text-4xl mt-3 font-medium text-zinc-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t.hero.headlineEnd}
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.p
            id="hero-subheading"
            className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            {t.hero.subheading}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Primary CTA */}
            <motion.a
              href="#services"
              className="relative w-full sm:w-auto overflow-hidden group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-bold text-base text-white shadow-xl shadow-violet-600/30 border border-violet-500/40 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 font-semibold text-base text-zinc-300 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t.hero.ctaSecondary}</span>
            </motion.a>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            id="hero-social-stats"
            className="flex flex-col gap-2 mt-8 border-t border-white/5 pt-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5 rtl:space-x-reverse">
                <img
                  className="w-8 h-8 rounded-full border border-[#0d0a18] shadow"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                />
                <img
                  className="w-8 h-8 rounded-full border border-[#0d0a18] shadow"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                />
                <img
                  className="w-8 h-8 rounded-full border border-[#0d0a18] shadow"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                />
                <div className="w-8 h-8 rounded-full border border-[#0d0a18] bg-violet-600 flex items-center justify-center text-[10px] font-bold text-white shadow">
                  +12k
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-300">{t.hero.activeUsers}</p>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-xs text-zinc-500 font-mono tracking-wide">{t.hero.liveStats}</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Immersive Visual UI Board (Span 5) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[450px]">
          
          {/* Absolute Ambient Background Lights for Right Board */}
          <div className="absolute inset-0 bg-violet-600/10 rounded-3xl filter blur-[60px] pointer-events-none" />

          {/* Interactive UI Box Panel */}
          <motion.div
            id="interactive-play-card"
            className="w-full max-w-md bg-[#0e0a1f]/85 backdrop-blur-md rounded-3xl border border-violet-500/20 p-6 shadow-2xl shadow-violet-950/40 relative overflow-hidden group"
            initial={{ opacity: 0, x: locale === "en" ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Glossy sheen effect on card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-violet-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Quick tabs inside the simulation card */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex bg-[#16122d] p-1 rounded-full border border-white/5 gap-1">
                {(["quest", "leaderboard", "achievement"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wider transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {tab === "quest" ? "Quest" : tab === "leaderboard" ? "Arena" : "Badge"}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live States */}
            <div className="min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                
                {/* 1. Quest Simulation Tab */}
                {activeTab === "quest" && (
                  <motion.div
                    key="quest"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
                          <Compass className="w-5 h-5 animate-spin-slow" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono tracking-wider text-amber-400 font-bold block">
                            {isCompleted ? t.hero.cards.questCompleted : "ACTIVE ADVENTURE"}
                          </span>
                          <h3 className="text-base font-bold text-white mt-0.5">
                            {t.hero.cards.questName}
                          </h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-violet-400 block font-mono">
                          {xp} XP
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono block">
                          {t.hero.cards.rank}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="bg-[#1b1736] p-4 rounded-2xl border border-white/5 mt-2">
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                        <span>Milestone 4/5</span>
                        <span className="font-mono font-bold text-white">{questProgress}%</span>
                      </div>
                      <div className="h-3 w-full bg-[#110e24] rounded-full overflow-hidden border border-white/5 relative p-[1px]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400 relative"
                          animate={{ width: `${questProgress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-sm opacity-60" />
                        </motion.div>
                      </div>
                      {isCompleted ? (
                        <motion.div
                          className="flex items-center gap-1.5 mt-3 text-emerald-400 text-xs font-bold"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: [0.95, 1.05, 1] }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>ALLIANCE BOUNTY GAINED!</span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-500">
                          <span>Auto-progression active</span>
                          <span className="text-violet-400 font-bold cursor-pointer animate-pulse">
                            Click simulation card to boost!
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 2. Live Arena Leaderboard Tab */}
                {activeTab === "leaderboard" && (
                  <motion.div
                    key="leaderboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold font-mono tracking-wider text-violet-400">
                        {t.hero.cards.leaderboardTitle}
                      </h4>
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                    </div>

                    {/* Rankings List */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between bg-violet-600/10 border border-violet-500/20 p-2.5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-zinc-950 font-mono shadow-md">
                            1
                          </div>
                          <span className="text-xs font-bold text-white">{t.hero.cards.player1}</span>
                        </div>
                        <span className="text-xs font-bold text-amber-400 font-mono">+18,490 pts</span>
                      </div>

                      <div className="flex items-center justify-between bg-[#14102c] border border-white/5 p-2.5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-zinc-400 flex items-center justify-center text-xs font-bold text-zinc-950 font-mono shadow-md">
                            2
                          </div>
                          <span className="text-xs font-medium text-zinc-300">{t.hero.cards.player2}</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-400">+16,840 pts</span>
                      </div>

                      <div className="flex items-center justify-between bg-[#14102c] border border-white/5 p-2.5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-700 flex items-center justify-center text-xs font-bold text-white font-mono shadow-md">
                            3
                          </div>
                          <span className="text-xs font-medium text-zinc-300">{t.hero.cards.player3}</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-400">+15,920 pts</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. Badge Achievement Tab */}
                {activeTab === "achievement" && (
                  <motion.div
                    key="achievement"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center gap-4 py-2"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 p-[2px] shadow-lg shadow-amber-500/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-full h-full bg-[#0d0a18] rounded-full flex items-center justify-center">
                        <Trophy className="w-9 h-9 text-amber-400" />
                      </div>
                    </motion.div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-amber-500 font-extrabold block">
                        {t.hero.cards.achievementUnlocked}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">
                        {t.hero.cards.achievementName}
                      </h4>
                      <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
                        Granted to teams exceeding business milestones with 150%+ completion.
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Click-to-Interact Action Button */}
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                id="interactive-boost-btn"
                onClick={handleManualQuestClick}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600/20 border border-violet-500/40 text-xs font-bold text-violet-300 hover:bg-violet-600 hover:text-white transition-all duration-300 w-full justify-center group/btn"
              >
                <MousePointerClick className="w-4 h-4 animate-bounce group-hover/btn:scale-110" />
                <span>BOOST PROGRESS XP (+300 XP)</span>
              </button>
            </div>

          </motion.div>

          {/* Glowing Floater Ornaments */}
          <motion.div
            className="absolute top-10 left-[-40px] p-3 rounded-2xl bg-[#0d0a18]/90 border border-amber-500/30 flex items-center gap-2 shadow-xl backdrop-blur"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400">12 Days Streak!</span>
          </motion.div>

          <motion.div
            className="absolute bottom-12 right-[-30px] p-3 rounded-2xl bg-[#0d0a18]/90 border border-emerald-500/30 flex items-center gap-2 shadow-xl backdrop-blur"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Coins className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-emerald-400">8,400 gold coins</span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
