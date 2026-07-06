import { useState } from "react";
import type { ComponentType } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Briefcase, GraduationCap, Gift, Gamepad2, ArrowRight, X,
  Car, Play, Sparkles, Check, Flame, Trophy, Lock, Unlock, RefreshCw, Star,
} from "lucide-react";
import { TranslationDictionary, AccentKey } from "../types";
import { accents, EASE } from "../theme";

interface ServicesProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Briefcase, GraduationCap, Gift, Gamepad2,
};

export default function Services({ t, locale }: ServicesProps) {
  const reduce = useReducedMotion();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Workplace race sim
  const initialCars = () => [
    { name: locale === "en" ? "Faisal · Riyadh" : "فيصل · الرياض", progress: 72, dot: "bg-[#ecdb33]" },
    { name: locale === "en" ? "Amal · Jeddah" : "أمل · جدة", progress: 58, dot: "bg-[#40ccd0]" },
    { name: locale === "en" ? "Saeed · Dammam" : "سعيد · الدمام", progress: 44, dot: "bg-[#3cdb4e]" },
  ];
  const [cars, setCars] = useState(initialCars);
  const boostRace = () =>
    setCars((prev) => prev.map((c, i) => ({
      ...c,
      progress: Math.min(c.progress + (i === 0 ? 12 : Math.floor(Math.random() * 8) + 2), 100),
    })));

  // Education skill tree
  const initialSkills = () => [
    { id: "s1", label: locale === "en" ? "Behavioral Psychology" : "علم النفس السلوكي", unlocked: true, req: undefined as string | undefined },
    { id: "s2", label: locale === "en" ? "Octalysis Framework" : "إطار أوكتاليسيس", unlocked: false, req: "s1" },
    { id: "s3", label: locale === "en" ? "Sound Design" : "هندسة الصوت", unlocked: false, req: "s2" },
    { id: "s4", label: locale === "en" ? "Feedback Loops" : "حلقات التغذية", unlocked: false, req: "s2" },
  ];
  const [skills, setSkills] = useState(initialSkills);
  const [points, setPoints] = useState(1);
  const unlockSkill = (id: string, req?: string) => {
    if (req && !skills.find((s) => s.id === req)?.unlocked) return;
    if (points < 1) return;
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, unlocked: true } : s)));
    setPoints((p) => p - 1);
  };

  // Marketing spin
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const rewards = locale === "en"
    ? ["Rare Avatar Armor", "2x XP Booster", "Exclusive Frame", "VIP Guild Role"]
    : ["درع نادر", "مضاعف نقاط 2x", "إطار حصري", "رتبة كبار الشخصيات"];
  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSpinResult(null);
    setTimeout(() => { setSpinResult(rewards[Math.floor(Math.random() * rewards.length)]); setSpinning(false); }, 1500);
  };

  return (
    <section id="services" className="py-24 md:py-32 relative px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header — carries this page's 2nd eyebrow */}
        <div className="max-w-3xl mb-14">
          <motion.span
            className="inline-block text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-[#40ccd0] mb-4"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.services.sectionBadge}
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, ease: EASE }}
          >
            {t.services.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            {t.services.sectionSubhead}
          </motion.p>
        </div>

        {/* Bento — asymmetric 7/5, 5/7 rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {t.services.items.map((item, index) => {
            const c = accents[item.color as AccentKey];
            const Icon = ICONS[item.iconName] ?? Briefcase;
            const span = index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5";
            return (
              <motion.div
                key={item.id}
                className={`${span} group relative rounded-3xl bg-[#0a0a0c]/80 border border-white/[0.06] ${c.hoverBorder} p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-colors duration-500`}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: EASE }}
              >
                <div
                  className="absolute -top-24 -end-24 w-56 h-56 rounded-full blur-[90px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ background: c.hex }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <span className={`grid place-items-center w-14 h-14 rounded-2xl ${c.solid}`}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </span>
                    <div className="text-end">
                      <span className={`block text-2xl sm:text-3xl font-bold font-mono ${c.text}`}>{item.metrics.value}</span>
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{item.metrics.label}</span>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${c.text}`}>{item.subtitle}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-lg">{item.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 border-t border-white/[0.06] pt-5">
                    {item.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-2.5 text-[13px] text-zinc-300">
                        <Check className={`w-4 h-4 flex-shrink-0 ${c.text}`} strokeWidth={2.5} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5 mt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag, ti) => (
                      <span key={ti} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveDemo(item.id)}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${c.text} hover:text-white transition-colors group/btn`}
                  >
                    <span>{t.services.viewDemo}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover/btn:-translate-x-1" : ""}`} strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Simulator modal */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActiveDemo(null)}
          >
            <motion.div
              className="w-full max-w-xl bg-[#0a0a0c] border border-white/10 edge-hi rounded-3xl overflow-hidden p-6 shadow-2xl"
              initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#ecdb33]" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{locale === "en" ? "Tal3eeb Sandbox" : "بيئة تَلْعِيب التجريبية"}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono">Behavioral game loop · interactive</p>
                  </div>
                </div>
                <button onClick={() => setActiveDemo(null)} className="p-1.5 rounded-full bg-white/[0.05] text-zinc-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="min-h-[280px]">
                {/* Workplace race */}
                {activeDemo === "workplace" && (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#ecdb33]" /> {locale === "en" ? "Q3 Sales Grand Prix" : "سباق مبيعات الربع الثالث"}
                      </h5>
                      <button onClick={() => setCars(initialCars)} className="p-1 text-zinc-500 hover:text-zinc-300"><RefreshCw className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="flex flex-col gap-4 mb-6">
                      {cars.map((car, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className={i === 0 ? "text-[#ecdb33] font-bold" : "text-zinc-400"}>{car.name}{i === 0 ? " ★" : ""}</span>
                            <span className="font-bold text-white tabular-nums">{car.progress}%</span>
                          </div>
                          <div className="h-3 w-full bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div className={`h-full rounded-full ${car.dot}`} animate={{ width: `${car.progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={boostRace} className="mt-auto w-full py-3.5 rounded-full bg-[#ecdb33] text-black font-bold text-sm flex items-center justify-center gap-2">
                      <Play className="w-4 h-4 fill-black" /> {locale === "en" ? "Close a deal · +12%" : "إغلاق صفقة · +12%"}
                    </button>
                  </div>
                )}

                {/* Education tree */}
                {activeDemo === "education" && (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-[#40ccd0]" /> {locale === "en" ? "Mastery Skill Tree" : "شجرة المهارات"}
                      </h5>
                      <button onClick={() => { setSkills(initialSkills); setPoints(1); }} className="p-1 text-zinc-500 hover:text-zinc-300"><RefreshCw className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="flex items-center justify-between bg-[#40ccd0]/10 border border-[#40ccd0]/25 p-3 rounded-xl mb-5">
                      <span className="flex items-center gap-2 text-xs text-zinc-300"><Star className="w-4 h-4 text-[#40ccd0] fill-[#40ccd0]" /> {locale === "en" ? "Skill points" : "نقاط المهارة"}</span>
                      <span className="text-base font-bold font-mono text-[#40ccd0] tabular-nums">{points} SP</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {skills.map((skill) => {
                        const reqMet = !skill.req || skills.find((s) => s.id === skill.req)?.unlocked;
                        const clickable = !skill.unlocked && reqMet && points >= 1;
                        return (
                          <button
                            key={skill.id}
                            disabled={!clickable}
                            onClick={() => unlockSkill(skill.id, skill.req)}
                            className={`p-3.5 rounded-xl text-start border flex items-center justify-between transition-all ${
                              skill.unlocked ? "bg-[#40ccd0]/10 border-[#40ccd0]/30 text-[#40ccd0]"
                              : clickable ? "bg-white/[0.03] border-white/10 text-zinc-300 hover:border-[#40ccd0]/50 cursor-pointer"
                              : "bg-white/[0.02] border-white/[0.06] text-zinc-600 cursor-not-allowed"
                            }`}
                          >
                            <span className="text-xs font-bold">{skill.label}</span>
                            {skill.unlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4 opacity-60" />}
                          </button>
                        );
                      })}
                    </div>
                    <button onClick={() => setPoints((p) => p + 1)} className="mt-auto w-full py-3.5 rounded-full bg-[#40ccd0] text-black font-bold text-sm flex items-center justify-center gap-2">
                      <Flame className="w-4 h-4 fill-black" /> {locale === "en" ? "Complete quiz · +1 SP" : "أكمل التحدي · +1 نقطة"}
                    </button>
                  </div>
                )}

                {/* Marketing spin */}
                {activeDemo === "marketing" && (
                  <div className="flex flex-col items-center text-center h-full">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                      <Gift className="w-4 h-4 text-[#3cdb4e]" /> {locale === "en" ? "Brand Prize Wheel" : "عجلة جوائز العلامة"}
                    </h5>
                    <p className="text-xs text-zinc-400 mb-6 max-w-sm">{locale === "en" ? "Surprise rewards drive 4.8x more social shares." : "آليات المفاجأة تضاعف مشاركة علامتك بشكل كبير."}</p>
                    <div className="relative w-36 h-36 mb-6 grid place-items-center">
                      <motion.div className="absolute inset-0 rounded-full border-4 border-dashed border-[#3cdb4e]/30" animate={{ rotate: spinning ? 1080 : 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#3cdb4e]" />
                      <button disabled={spinning} onClick={spinWheel} className={`w-16 h-16 rounded-full font-bold text-xs ${spinning ? "bg-zinc-800 text-zinc-500" : "bg-[#3cdb4e] text-black hover:scale-105 transition-transform"}`}>
                        {spinning ? "..." : "SPIN"}
                      </button>
                    </div>
                    <div className="min-h-[40px]">
                      <AnimatePresence mode="wait">
                        {spinResult && (
                          <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3cdb4e]/15 border border-[#3cdb4e]/30 text-xs font-bold text-[#3cdb4e]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                            <Sparkles className="w-3.5 h-3.5" /> {spinResult}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <button disabled={spinning} onClick={spinWheel} className="mt-auto w-full py-3.5 rounded-full bg-[#3cdb4e] text-black font-bold text-sm disabled:opacity-50">
                      {locale === "en" ? "Spin the wheel" : "أدر العجلة"}
                    </button>
                  </div>
                )}

                {/* Consultancy lobby */}
                {activeDemo === "consultancy" && (
                  <div className="flex flex-col h-full">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                      <Gamepad2 className="w-4 h-4 text-[#d04242]" /> {locale === "en" ? "Multiplayer Match Lobby" : "غرفة التحدي الجماعي"}
                    </h5>
                    <p className="text-xs text-zinc-400 mb-5">{locale === "en" ? "A live web-based room built for corporate teams." : "غرفة تحدي مباشرة عبر الويب لفرق العمل."}</p>
                    <div className="bg-black border border-[#d04242]/15 rounded-2xl p-4 font-mono text-[10px] text-[#d04242] flex flex-col gap-1.5 mb-6">
                      <div>&gt; CONNECTING SECURE GATEWAY... OK</div>
                      <div>&gt; AUTHENTICATING GCC CLIENT LOBBY</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3cdb4e]" /> LOBBY: 28 PLAYERS ACTIVE</div>
                      <div className="text-zinc-500">&gt; Faisal_Riyadh joined Team Alpha</div>
                      <div className="text-zinc-500">&gt; Noura_Dubai joined Team Beta</div>
                      <div className="text-[#ecdb33]">&gt; ALLIANCE SCORE: 48,290 XP</div>
                    </div>
                    <button onClick={() => setActiveDemo(null)} className="mt-auto w-full py-3.5 rounded-full bg-[#d04242] text-white font-bold text-sm">
                      {locale === "en" ? "Deploy custom server" : "نشر خادم مخصص"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
