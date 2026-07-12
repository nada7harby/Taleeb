import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Target, CheckCircle2, Package, Dices, Settings2, Image as ImageIcon, Clapperboard,
  Monitor, Smartphone, Bot, Wrench, Trophy, BarChart3, MapPin, QrCode, Camera, Brain,
  Timer, Users, Star, Award, Clock, Handshake, Flame, Lock, ArrowUpRight, ChevronRight, Zap,
} from "lucide-react";
import { TranslationDictionary, AccentKey } from "../types";
import { accents, EASE } from "../theme";
import { Eyebrow, SectionHeader, GlassCard, IconTile, PageHeroShell } from "../components/PageKit";

interface ProductsPageProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

const CONTACT_HREF = "/#contact";
const ACCENT_CYCLE: AccentKey[] = ["red", "cyan", "yellow", "green"];

// ————————————————————————————————————————————————————————————
// Content ported verbatim from the live products.html (English source —
// see AboutPage.tsx for the same note on why this stays English).
// ————————————————————————————————————————————————————————————
const PLATFORM_CARDS: { icon: typeof Wrench; color: AccentKey; title: string; text: string; bullets: string[] }[] = [
  { icon: Wrench, color: "green", title: "Game Builder", text: "Drag-and-drop challenge creator. Build GPS hunts, QR missions, photo/video tasks, and trivia quizzes in minutes.", bullets: ["100+ challenge templates", "No coding required", "Arabic & English"] },
  { icon: Trophy, color: "yellow", title: "Live Leaderboards", text: "Real-time rankings that update instantly. Individual & team scoreboards with customizable metrics.", bullets: ["Real-time updates", "Team & individual modes", "Embeddable widgets"] },
  { icon: BarChart3, color: "cyan", title: "Analytics Dashboard", text: "Deep insights into engagement, completion rates, and ROI. Export reports for stakeholders.", bullets: ["Custom dashboards", "PDF/Excel export", "ROI calculator"] },
];

const CORE_PRODUCTS: {
  icon: typeof Monitor; color: AccentKey; name: string; tagline: string; popular?: boolean;
  features: { title: string; text: string }[]; cta: string;
}[] = [
  {
    icon: Monitor, color: "green", name: "Taleeb Platform",
    tagline: "Web-based SaaS dashboard for creating and managing gamification campaigns",
    features: [
      { title: "SaaS Web Dashboard", text: "Access from any browser, anywhere" },
      { title: "Unlimited Challenges", text: "Create as many as you need" },
      { title: "Multi-Language Support", text: "Native Arabic & English interface" },
      { title: "Team Management", text: "Roles, permissions & collaboration" },
    ],
    cta: "Request Demo",
  },
  {
    icon: Smartphone, color: "yellow", name: "Taleeb Mobile App", popular: true,
    tagline: "Native iOS & Android app for participants to complete challenges",
    features: [
      { title: "iOS & Android Native", text: "Smooth, native experience on both platforms" },
      { title: "Offline Challenges", text: "Complete tasks without internet" },
      { title: "Push Notifications", text: "Real-time alerts & reminders" },
      { title: "White-Label Option", text: "Your brand, your app" },
    ],
    cta: "Get the App",
  },
  {
    icon: Bot, color: "cyan", name: "Taleeb AI Engine",
    tagline: "AI-powered challenge generation, personalization & predictive analytics",
    features: [
      { title: "Auto-Generate Challenges", text: "AI creates challenges from your goals" },
      { title: "Smart Personalization", text: "Tailored difficulty per participant" },
      { title: "Predictive Analytics", text: "Forecast engagement & churn" },
      { title: "Natural Language Input", text: "Describe challenges in plain text" },
    ],
    cta: "Learn More",
  },
];

const CHALLENGE_TYPES: { icon: typeof MapPin; title: string; text: string; chips: [string, string] }[] = [
  { icon: MapPin, title: "GPS Location Hunts", text: "Participants visit real-world locations to complete challenges. Perfect for campus tours and city explorations.", chips: ["Geo-fencing", "Check-ins"] },
  { icon: QrCode, title: "QR Code Missions", text: "Scan QR codes to unlock challenges, collect points, or reveal hidden content. Great for indoor events.", chips: ["Scan & Play", "Hidden Codes"] },
  { icon: Camera, title: "Photo/Video Challenges", text: "Capture moments, submit creative content, and share achievements. Ideal for social engagement.", chips: ["Selfies", "Video Proof"] },
  { icon: Brain, title: "Trivia & Knowledge Quizzes", text: "Test knowledge with multiple-choice, true/false, or open-ended questions. Perfect for training.", chips: ["Timed", "Multi-format"] },
  { icon: Timer, title: "Time-Based Races", text: "Compete against the clock or other players. Countdown timers add urgency and excitement.", chips: ["Speed Runs", "Deadlines"] },
  { icon: Users, title: "Team Competitions", text: "Collaborate in teams to achieve shared goals. Build camaraderie while competing against others.", chips: ["Co-op", "Vs Mode"] },
];

const MECHANICS: { icon: typeof Star; color: AccentKey; title: string; text: string }[] = [
  { icon: Star, color: "yellow", title: "Points", text: "Reward every action" },
  { icon: Award, color: "yellow", title: "Badges", text: "Celebrate milestones" },
  { icon: BarChart3, color: "cyan", title: "Progress Bars", text: "Visualize journey" },
  { icon: Clock, color: "red", title: "Timers", text: "Create urgency" },
  { icon: Handshake, color: "cyan", title: "Team Play", text: "Foster collaboration" },
  { icon: Flame, color: "red", title: "Streaks", text: "Build habits" },
];

export default function ProductsPage(_props: ProductsPageProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = "Products - Taleeb Gamification Platform | Platform, App & AI Engine";
  }, []);

  return (
    <div dir="ltr">
      {/* ————— Hero ————— */}
      <PageHeroShell>
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#ecdb33] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-300">Products</span>
        </nav>

        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] [text-wrap:balance]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE }}
          >
            <span className="text-white">Taleeb </span>
            <span className="text-[#ecdb33]">Product Suite</span>
          </motion.h1>
          <motion.p
            className="text-zinc-400 text-lg leading-relaxed mt-6 max-w-xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Complete gamification platform + mobile app + AI engine. Everything you need to transform engagement.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4 mt-9"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {[{ icon: Monitor, label: "Platform" }, { icon: Smartphone, label: "Mobile App" }, { icon: Bot, label: "AI Engine" }].map((b) => (
              <span key={b.label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm text-zinc-300">
                <b.icon className="w-4 h-4 text-[#ecdb33]" strokeWidth={2} /> {b.label}
              </span>
            ))}
          </motion.div>
        </div>
      </PageHeroShell>

      {/* ————— Platform overview ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Target}
            eyebrowLabel="Platform Overview"
            title={<>Everything You Need in <span className="text-[#ecdb33]">One Platform</span></>}
            subhead="A unified suite of tools designed to create, manage, and analyze gamification experiences at scale."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLATFORM_CARDS.map((card, i) => (
              <GlassCard key={card.title} accent={card.color} className="overflow-hidden" delay={i * 0.08}>
                <div className={`aspect-video ${accents[card.color].bgSoft} border-b border-white/[0.06] grid place-items-center`}>
                  <card.icon className={`w-10 h-10 ${accents[card.color].text}`} strokeWidth={1.5} />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mt-2">{card.text}</p>
                  <ul className="flex flex-col gap-2 mt-4">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${accents[card.color].text} flex-shrink-0`} /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Core products (3 tiers) ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8 bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Package}
            eyebrowLabel="Core Products"
            title={<>Three Products, <span className="text-[#ecdb33]">Infinite Possibilities</span></>}
            subhead="Choose what fits your needs — or get the complete suite for maximum impact."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {CORE_PRODUCTS.map((p, i) => (
              <GlassCard
                key={p.name}
                accent={p.color}
                className={`overflow-hidden flex flex-col ${p.popular ? "border-[#ecdb33]/50" : ""}`}
                delay={i * 0.08}
              >
                {p.popular && (
                  <div className="bg-[#ecdb33] text-black text-[11px] font-bold uppercase tracking-wide text-center py-1.5">
                    Most Popular
                  </div>
                )}
                <div className={`p-7 ${accents[p.color].bgSoft} border-b border-white/[0.06]`}>
                  <IconTile icon={p.icon} color={p.color} size="lg" />
                  <h3 className="text-lg font-bold text-white mt-4">{p.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-2">{p.tagline}</p>
                </div>
                <div className="p-7 flex flex-col gap-4 flex-1">
                  {p.features.map((f) => (
                    <div key={f.title} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 ${accents[p.color].text} flex-shrink-0 mt-0.5`} />
                      <div>
                        <div className="text-sm font-semibold text-white">{f.title}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{f.text}</div>
                      </div>
                    </div>
                  ))}
                  <a
                    href={CONTACT_HREF}
                    className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] ${accents[p.color].solid}`}
                  >
                    {p.cta} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Six challenge types ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Dices}
            eyebrowLabel="Challenge Types"
            title={<>Six Ways to <span className="text-[#ecdb33]">Engage</span></>}
            subhead="Mix and match challenge types to create unique gamification experiences."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHALLENGE_TYPES.map((c, i) => {
              const color = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
              return (
                <GlassCard key={c.title} accent={color} className="p-6" delay={i * 0.06}>
                  <IconTile icon={c.icon} color={color} />
                  <h3 className="text-base font-bold text-white mt-5">{c.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mt-2">{c.text}</p>
                  <div className="flex items-center gap-2 mt-5">
                    {c.chips.map((chip) => (
                      <span key={chip} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${accents[color].bgSoft} ${accents[color].text}`}>{chip}</span>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— Gamification mechanics ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8 bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="mb-5">
              <Eyebrow icon={Settings2} color="yellow">Gamification Mechanics</Eyebrow>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Proven Engagement <span className="text-[#ecdb33]">Mechanics</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4">
              Our platform leverages behavioral psychology and game design principles that have been proven to drive engagement and motivation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {MECHANICS.map((m, i) => (
                <motion.div
                  key={m.title}
                  className="flex items-center gap-3.5 bg-[#0a0a0c]/60 border border-white/[0.06] rounded-2xl p-4"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, ease: EASE }}
                >
                  <IconTile icon={m.icon} color={m.color} size="sm" />
                  <div>
                    <div className="text-sm font-bold text-white">{m.title}</div>
                    <div className="text-xs text-zinc-500">{m.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mock "Your Progress" gamification UI card */}
          <GlassCard accent="yellow" className="p-7 relative">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Your Progress</span>
              <Trophy className="w-5 h-5 text-[#ecdb33]" />
            </div>
            <div className="mt-6">
              <div className="text-4xl font-bold font-mono text-[#ecdb33]">2,450</div>
              <div className="text-xs text-zinc-500 mt-1">Total Points Earned</div>
            </div>
            <div className="mt-5">
              <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#ecdb33]"
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE }}
                />
              </div>
              <div className="text-[11px] text-zinc-500 mt-2">550 pts to next level</div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[Award, Target, Zap].map((Icon, i) => (
                <span key={i} className="grid place-items-center w-11 h-11 rounded-xl bg-[#ecdb33]/10 border border-[#ecdb33]/25 text-[#ecdb33]">
                  <Icon className="w-5 h-5" />
                </span>
              ))}
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-600">
                <Lock className="w-4.5 h-4.5" />
              </span>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/[0.06]">
              <Flame className="w-5 h-5 text-[#d04242]" />
              <div className="flex-1">
                <div className="text-sm font-bold text-white">7-Day Streak!</div>
                <div className="text-[11px] text-zinc-500">Keep it going</div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#d04242]" />
                ))}
              </div>
            </div>

            <motion.div
              className="absolute -top-4 -end-3 bg-[#ecdb33] text-black text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl"
              initial={reduce ? false : { opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              +50 Bonus Points!
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* ————— Product screenshot ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            center
            eyebrowIcon={ImageIcon}
            eyebrowLabel="See It In Action"
            title={<>Beautiful, <span className="text-[#ecdb33]">Intuitive</span> Interface</>}
          />
          <div className="relative max-w-4xl mx-auto">
            <GlassCard className="aspect-video overflow-hidden">
              <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#40ccd0]/[0.06] to-[#ecdb33]/[0.04]">
                <div className="text-center">
                  <Monitor className="w-14 h-14 text-zinc-600 mx-auto" strokeWidth={1.25} />
                  <p className="text-zinc-600 text-sm mt-3">Dashboard Preview</p>
                </div>
              </div>
            </GlassCard>
            <div className="absolute -top-4 start-6 bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#3cdb4e] flex items-center gap-1.5 shadow-xl">
              <CheckCircle2 className="w-3.5 h-3.5" /> Challenge Created!
            </div>
            <div className="absolute -bottom-4 end-6 bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#40ccd0] flex items-center gap-1.5 shadow-xl">
              <BarChart3 className="w-3.5 h-3.5" /> Analytics Ready
            </div>
          </div>
        </div>
      </section>

      {/* ————— Closing CTA ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <GlassCard accent="yellow" className="p-10 md:p-16 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 start-1/3 w-[30vw] h-[30vw] max-w-[28rem] max-h-[28rem] rounded-full bg-[#ecdb33]/[0.1] blur-[110px]" />
            </div>
            <div className="relative z-10">
              <IconTile icon={Clapperboard} color="yellow" size="lg" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-6 [text-wrap:balance]">
                See Products in Action
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-xl mx-auto">
                Request a personalized demo and discover how Taleeb can transform engagement for your organization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ecdb33] font-semibold text-black w-full sm:w-auto">
                  Request Demo <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/[0.05] transition-colors w-full sm:w-auto">
                  View Pricing
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 mt-8 text-xs text-zinc-500">
                {["30-minute walkthrough", "Q&A session included", "Custom use case analysis"].map((label) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3cdb4e]" /> {label}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
