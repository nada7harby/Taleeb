import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, GraduationCap, Gift, Gamepad2, ArrowRight, X, 
  Car, Play, Sparkles, Check, Flame, Trophy, Lock, Unlock, 
  HelpCircle, RefreshCw, Star
} from "lucide-react";
import { TranslationDictionary, ServiceItem } from "../types";

interface ServicesProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Services({ t, locale }: ServicesProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // 1. Workplace Simulation State
  const [cars, setCars] = useState([
    { name: locale === "en" ? "Faisal (Riyadh)" : "فيصل (الرياض)", progress: 75, color: "bg-violet-500", speed: 4 },
    { name: locale === "en" ? "Amal (Jeddah)" : "أمل (جدة)", progress: 60, color: "bg-fuchsia-500", speed: 2 },
    { name: locale === "en" ? "Saeed (Dammam)" : "سعيد (الدمام)", progress: 45, color: "bg-cyan-500", speed: 1.5 },
  ]);

  const handleWorkplaceAction = () => {
    setCars((prev) => 
      prev.map((car, index) => {
        if (index === 0) { // Main player boost
          const next = car.progress + 10;
          return { ...car, progress: next >= 100 ? 100 : next };
        }
        // Others auto-progress slightly
        const increment = Math.floor(Math.random() * 8) + 2;
        const next = car.progress + increment;
        return { ...car, progress: next >= 100 ? 100 : next };
      })
    );
  };

  const resetWorkplace = () => {
    setCars([
      { name: locale === "en" ? "Faisal (Riyadh)" : "فيصل (الرياض)", progress: 30, color: "bg-violet-500", speed: 4 },
      { name: locale === "en" ? "Amal (Jeddah)" : "أمل (جدة)", progress: 45, color: "bg-fuchsia-500", speed: 2 },
      { name: locale === "en" ? "Saeed (Dammam)" : "سعيد (الدمام)", progress: 25, color: "bg-cyan-500", speed: 1.5 },
    ]);
  };

  // 2. Education Skill Tree State
  const [skills, setSkills] = useState([
    { id: "s1", label: locale === "en" ? "Behavioral Psychology" : "علم النفس السلوكي", unlocked: true, active: true },
    { id: "s2", label: locale === "en" ? "Octalysis Framework" : "إطار أوكتاليسيس", unlocked: false, active: false, req: "s1" },
    { id: "s3", label: locale === "en" ? "Interaction Sound Design" : "هندسة الصوت التفاعلي", unlocked: false, active: false, req: "s2" },
    { id: "s4", label: locale === "en" ? "Feedback Loop Mechanics" : "آليات حلقات التغذية", unlocked: false, active: false, req: "s2" },
  ]);
  const [points, setPoints] = useState(1);

  const unlockSkill = (id: string, req?: string) => {
    if (req) {
      const parent = skills.find((s) => s.id === req);
      if (!parent || !parent.unlocked) return;
    }
    if (points >= 1) {
      setSkills((prev) =>
        prev.map((s) => {
          if (s.id === id) {
            return { ...s, unlocked: true, active: true };
          }
          return s;
        })
      );
      setPoints((p) => p - 1);
    }
  };

  const earnPoint = () => {
    setPoints((p) => p + 1);
  };

  const resetSkills = () => {
    setSkills([
      { id: "s1", label: locale === "en" ? "Behavioral Psychology" : "علم النفس السلوكي", unlocked: true, active: true },
      { id: "s2", label: locale === "en" ? "Octalysis Framework" : "إطار أوكتاليسيس", unlocked: false, active: false, req: "s1" },
      { id: "s3", label: locale === "en" ? "Interaction Sound Design" : "هندسة الصوت التفاعلي", unlocked: false, active: false, req: "s2" },
      { id: "s4", label: locale === "en" ? "Feedback Loop Mechanics" : "آليات حلقات التغذية", unlocked: false, active: false, req: "s2" },
    ]);
    setPoints(1);
  };

  // 3. Marketing Spin State
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const rewards = [
    locale === "en" ? "Rare Avatar Armor" : "درع الشخصية النادر",
    locale === "en" ? "Double Experience Booster" : "مضاعف نقاط الخبرة 2x",
    locale === "en" ? "Exclusive Profile Frame" : "إطار ملف شخصي حصري",
    locale === "en" ? "VIP Discord Guild Role" : "رتبة نقابة كبار الشخصيات",
  ];

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      setSpinResult(null);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * rewards.length);
        setSpinResult(rewards[randomIndex]);
        setSpinning(false);
      }, 1500);
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-xs font-bold text-violet-400 uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.services.sectionBadge}
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.services.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.services.sectionSubhead}
          </motion.p>
        </div>

        {/* Bento-Grid Style Services Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
          {t.services.items.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            const gridSpan = isLarge ? "lg:col-span-7" : "lg:col-span-5";

            return (
              <motion.div
                key={item.id}
                className={`${gridSpan} rounded-3xl bg-[#0d0a18]/60 backdrop-blur border border-violet-500/10 p-6 sm:p-8 flex flex-col justify-between hover:border-violet-500/30 transition-all duration-500 group relative overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Background Gradient Ornaments */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700 pointer-events-none`} />

                <div>
                  {/* Icon & Metrics Block */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg shadow-violet-950/20`}>
                      {item.iconName === "Briefcase" && <Briefcase className="w-6 h-6" />}
                      {item.iconName === "GraduationCap" && <GraduationCap className="w-6 h-6" />}
                      {item.iconName === "Gift" && <Gift className="w-6 h-6" />}
                      {item.iconName === "Gamepad2" && <Gamepad2 className="w-6 h-6" />}
                    </div>
                    
                    {/* Performance highlight indicator */}
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-extrabold text-white font-mono block">
                        {item.metrics.value}
                      </span>
                      <span className="text-[10px] sm:text-xs text-zinc-500 font-medium block uppercase tracking-wider">
                        {item.metrics.label}
                      </span>
                    </div>
                  </div>

                  {/* Service Titles */}
                  <span className="text-xs font-mono font-bold tracking-wider text-violet-400 block uppercase mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>

                  {/* Bullet point lists */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 border-t border-white/5 pt-4">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags and CTA Simulation Trigger */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-5 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-medium text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Simulation button triggers */}
                  <button
                    onClick={() => setActiveDemo(item.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-amber-400 transition-colors group/btn"
                  >
                    <span>{t.services.viewDemo}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover/btn:-translate-x-1" : ""}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Immersive Sandbox Simulator Overlay - Modal Experience */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div
              id="sandbox-simulator-overlay"
              className="fixed inset-0 z-50 bg-[#06040c]/80 backdrop-blur-md flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-xl bg-[#0e0a20] border border-violet-500/20 rounded-3xl overflow-hidden p-6 shadow-2xl relative shadow-violet-950/50"
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25 }}
              >
                {/* Header of Sandbox */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
                    <div>
                      <h4 className="text-sm font-extrabold text-white font-display">
                        TAL3EEB SANDBOX EMULATOR
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        Running custom behavioral game loop v2.6
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveDemo(null)}
                    className="p-1.5 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content based on the selected demo */}
                <div className="min-h-[280px]">
                  
                  {/* A. WORKPLACE SALES RACE SIMULATOR */}
                  {activeDemo === "workplace" && (
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Car className="w-4 h-4 text-violet-400" />
                            {locale === "en" ? "Q3 Sales Velocity Grand Prix" : "سباق المبيعات للربع الثالث"}
                          </h5>
                          <button
                            onClick={resetWorkplace}
                            className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                            title="Reset Simulator"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-400 mb-6 font-light">
                          {locale === "en" 
                            ? "Simulate closing a live enterprise contract. Closing deals boosts your racer down the track in real-time."
                            : "قم بمحاكاة إغلاق صفقة مبيعات حية للشركة. إغلاق الصفقات يدفع سيارة موظفك للأمام على حلبة السباق."}
                        </p>

                        {/* Tracks */}
                        <div className="flex flex-col gap-4 mb-6">
                          {cars.map((car, idx) => (
                            <div key={idx} className="flex flex-col gap-1.5">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className={idx === 0 ? "text-violet-400 font-bold" : "text-zinc-400"}>
                                  {car.name} {idx === 0 && "🏆"}
                                </span>
                                <span className="font-bold text-white">{car.progress}%</span>
                              </div>
                              <div className="h-6 w-full bg-[#16122d] rounded-full overflow-hidden border border-white/5 relative p-1">
                                <motion.div
                                  className={`h-full rounded-full ${car.color} flex items-center justify-end px-3`}
                                  animate={{ width: `${car.progress}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                  {idx === 0 && <Car className="w-3.5 h-3.5 text-zinc-950 animate-bounce" />}
                                </motion.div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Boost Button */}
                      <button
                        onClick={handleWorkplaceAction}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{locale === "en" ? "CLOSE CORPORATE DEAL (+10% BOOST)" : "إغلاق صفقة جديدة (+10% تقدم)"}</span>
                      </button>
                    </div>
                  )}

                  {/* B. EDUCATION COGNITIVE SKILL TREE */}
                  {activeDemo === "education" && (
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-400" />
                            {locale === "en" ? "Gamification Architect Skill Tree" : "شجرة مهارات مصمم الألعاب الرقمي"}
                          </h5>
                          <button
                            onClick={resetSkills}
                            className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                            title="Reset Tree"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-400 mb-6 font-light">
                          {locale === "en" 
                            ? "Complete training quests to gain skill points. Invest points to climb your professional mastery tree."
                            : "أكمل غارات التعريب اليومية لتكسب نقاط خبرة. استخدم النقاط لفتح وتطوير فروع تخصصك."}
                        </p>

                        {/* Point Pool Status */}
                        <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/25 p-3 rounded-xl mb-6">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                            <span className="text-xs text-zinc-300">
                              {locale === "en" ? "Skill Point Pool:" : "مخزون نقاط المهارة المتاح:"}
                            </span>
                          </div>
                          <span className="text-base font-extrabold text-amber-400 font-mono">{points} SP</span>
                        </div>

                        {/* Skill Nodes Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {skills.map((skill) => {
                            const isReqMet = !skill.req || skills.find((s) => s.id === skill.req)?.unlocked;
                            const isClickable = !skill.unlocked && isReqMet && points >= 1;

                            return (
                              <button
                                key={skill.id}
                                disabled={skill.unlocked || !isReqMet || points < 1}
                                onClick={() => unlockSkill(skill.id, skill.req)}
                                className={`p-4 rounded-xl text-start border transition-all flex items-center justify-between ${
                                  skill.unlocked 
                                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                    : isReqMet && points >= 1
                                    ? "bg-[#18132e] border-violet-500/30 text-zinc-300 cursor-pointer hover:border-amber-400"
                                    : "bg-black/20 border-white/5 text-zinc-600 cursor-not-allowed"
                                }`}
                              >
                                <div>
                                  <span className="text-[9px] font-mono block text-zinc-500 uppercase">
                                    {skill.unlocked ? "ACTIVE LEVEL" : "LOCKED SKILL"}
                                  </span>
                                  <span className="text-xs font-bold block mt-0.5">{skill.label}</span>
                                </div>
                                <div>
                                  {skill.unlocked ? (
                                    <Unlock className="w-4 h-4 text-amber-400" />
                                  ) : (
                                    <Lock className="w-4 h-4 text-zinc-500" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Earn Points Action Button */}
                      <button
                        onClick={earnPoint}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                      >
                        <Flame className="w-4 h-4 fill-zinc-950 text-zinc-950" />
                        <span>{locale === "en" ? "COMPLETE RECALL QUIZ (+1 SKILL POINT)" : "أكمل تحدي المعرفة اليومي (+1 نقطة مهارة)"}</span>
                      </button>
                    </div>
                  )}

                  {/* C. MARKETING SPIN WHEEL */}
                  {activeDemo === "marketing" && (
                    <div className="flex flex-col justify-between h-full text-center">
                      <div>
                        <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                          <Gift className="w-4 h-4 text-cyan-400" />
                          {locale === "en" ? "Brand Activation Prize Wheel" : "عجلة جوائز العلامة التجارية التفاعلية"}
                        </h5>
                        <p className="text-xs text-zinc-400 mb-6 max-w-sm mx-auto font-light">
                          {locale === "en" 
                            ? "Spin to unlock premium virtual collectibles. Gamified reward mechanics yield 4.8x more social shares."
                            : "أدر العجلة للحصول على مقتنيات ملفك الشخصي الافتراضي. تزيد آليات المفاجأة من مشاركة علامتك بنسبة هائلة."}
                        </p>

                        {/* Interactive Rotating Graphic */}
                        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-500/30 flex items-center justify-center"
                            animate={{ rotate: spinning ? 1080 : 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          >
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-transparent flex items-center justify-center relative">
                              {/* Internal spokes of wheel */}
                              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-cyan-500/20" />
                              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-500/20" />
                            </div>
                          </motion.div>
                          
                          {/* Indicator Arrow */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyan-400 z-10" />

                          {/* Spin Center Button */}
                          <button
                            disabled={spinning}
                            onClick={spinWheel}
                            className={`absolute w-16 h-16 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                              spinning 
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                                : "bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/30 hover:scale-105 cursor-pointer"
                            }`}
                          >
                            {spinning ? "SPINNING" : "SPIN"}
                          </button>
                        </div>

                        {/* Result Display Box */}
                        <div className="min-h-[44px]">
                          <AnimatePresence mode="wait">
                            {spinResult && (
                              <motion.div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{spinResult}</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Launch Trigger */}
                      <button
                        disabled={spinning}
                        onClick={spinWheel}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-zinc-950 font-bold text-sm shadow-lg shadow-cyan-500/20 mt-4 disabled:opacity-50"
                      >
                        {locale === "en" ? "SPIN WHEEL FOR PRIZE" : "اضغط لتدوير عجلة الحظ الكبرى"}
                      </button>
                    </div>
                  )}

                  {/* D. CUSTOM GAME STUDIO MULTIPLAYER SIM */}
                  {activeDemo === "consultancy" && (
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Gamepad2 className="w-4 h-4 text-fuchsia-400" />
                          {locale === "en" ? "Custom Multiplayer Match Lobby" : "بوابة خادم الألعاب والانتظار المخصصة"}
                        </h5>
                        <p className="text-xs text-zinc-400 mb-6 font-light">
                          {locale === "en" 
                            ? "Simulating a custom web-based concurrent gaming room designed for corporate teams."
                            : "محاكاة لغرفة انتظار وتحدي جماعي مباشر عبر الويب مخصصة لفرق عمل المكاتب المشتركة."}
                        </p>

                        {/* Simulated Tech Log Monitor */}
                        <div className="bg-[#050308] border border-fuchsia-500/10 rounded-2xl p-4 font-mono text-[10px] text-fuchsia-400 flex flex-col gap-1.5 mb-6">
                          <div>&gt; CONNECTING SECURE GATEWAY... OK</div>
                          <div>&gt; SYSTEM_READY: AUTHENTICATING GCC CLIENT LOBBY</div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>&gt; LOBBY STATUS: 28 TEAM PLAYERS ACTIVE</span>
                          </div>
                          <div className="text-zinc-500">&gt; Faisal_Riyadh Joined Team Alpha (Leader)</div>
                          <div className="text-zinc-500">&gt; Noura_Dubai Joined Team Beta (Fighter)</div>
                          <div className="text-zinc-500">&gt; Khalid_Jeddah Unlocked Achievements badge 'Glory'</div>
                          <div className="animate-pulse text-yellow-400">&gt; CURRENT ALLIANCE RANKING SCORE: 48,290 XP</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const alertTxt = locale === "en" 
                            ? "Connecting to custom multiplayer sandbox servers..." 
                            : "جاري ربط الخادم بغرفة انتظار تحدي المبيعات الجماعي الحالي...";
                          alert(alertTxt);
                        }}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-500 hover:from-fuchsia-400 hover:to-rose-400 text-white font-bold text-sm shadow-lg shadow-fuchsia-500/20"
                      >
                        {locale === "en" ? "DEPLOY CUSTOM SERVER Blueprints" : "إعداد ونشر خادم ألعاب خاص بنقابتك"}
                      </button>
                    </div>
                  )}

                </div>

                {/* Footer close */}
                <div className="border-t border-white/5 pt-4 mt-6 text-center">
                  <span className="text-[10px] text-zinc-500 font-mono block">
                    {locale === "en" 
                      ? "Interactive simulations are simplified showcases of our robust deployment capabilities."
                      : "النماذج الممثلة أعلاه هي تمثيلات بصرية مبسطة لقدرات البناء والدمج البرمجية المعتمدة لدينا."}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
