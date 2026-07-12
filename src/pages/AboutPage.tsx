import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Target, CheckCircle2, Star, Globe2, BarChart3, MessageCircle, Sparkles,
  Calendar, Users, ArrowRight, ArrowUpRight, ChevronRight, Twitter, Linkedin,
} from "lucide-react";
import { TranslationDictionary, AccentKey } from "../types";
import { accents, EASE } from "../theme";
import { Eyebrow, SectionHeader, GlassCard, IconTile, InitialsAvatar, PageHeroShell } from "../components/PageKit";

interface AboutPageProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

const CONTACT_HREF = "/#contact";

// ————————————————————————————————————————————————————————————
// Content ported verbatim from the live about.html (English source — the
// site has no verified Arabic body copy for this page, only a meta
// description, so we preserve the real English content rather than invent
// a translation).
// ————————————————————————————————————————————————————————————
const MISSION_POINTS: { icon: typeof Globe2; color: AccentKey; title: string; text: string }[] = [
  { icon: Globe2, color: "cyan", title: "Built for the GCC", text: "Arabic-first, culturally relevant, locally supported" },
  { icon: BarChart3, color: "green", title: "Proven Results", text: "60%+ engagement increase on average" },
  { icon: Sparkles, color: "yellow", title: "Enterprise Ready", text: "Trusted by 500+ organizations in the region" },
];

const STATS: { value: string; label: string; desc: string; color: AccentKey }[] = [
  { value: "60%+", label: "Engagement Boost", desc: "Average increase in participant engagement across all programs", color: "green" },
  { value: "500+", label: "GCC Companies", desc: "Organizations trust Taleeb for their gamification needs", color: "cyan" },
  { value: "10K+", label: "Challenges Created", desc: "GPS, QR, photo & video challenges deployed", color: "yellow" },
  { value: "50K+", label: "Active Users", desc: "Monthly active participants on our platform", color: "red" },
];

const WHY_US: { icon: typeof Globe2; color: AccentKey; title: string; text: string; footer: string }[] = [
  { icon: Globe2, color: "green", title: "Arabic-First Interface", text: "Native RTL support with beautiful Arabic typography. Your teams experience the platform in their language, naturally.", footer: "🇸🇦 🇦🇪 🇶🇦 🇰🇼" },
  { icon: BarChart3, color: "cyan", title: "Saudi & UAE Case Studies", text: "Proven success with Aramco, SABIC, UAE Government, and top universities. Real results you can reference.", footer: "View Case Studies" },
  { icon: MessageCircle, color: "yellow", title: "WhatsApp Integration", text: "Push notifications, challenge updates, and leaderboard alerts directly to WhatsApp — the app everyone already uses.", footer: "Native Integration" },
  { icon: Sparkles, color: "red", title: "Sharia-Compliant Gamification", text: "Rewards and competition structures designed to align with Islamic principles. No gambling mechanics, pure engagement.", footer: "Certified Compliant" },
];

const TIMELINE: { year: string; title: string; text: string; final?: boolean }[] = [
  { year: "2020", title: "Founded in Riyadh", text: "Started with a vision to revolutionize corporate training in Saudi Arabia using gamification." },
  { year: "2021", title: "First 100 Clients", text: "Reached 100 corporate clients including major Saudi enterprises. Launched GPS challenges." },
  { year: "2022", title: "UAE Expansion", text: "Opened Dubai office. Partnered with UAE Government entities and top universities." },
  { year: "2023", title: "AI-Powered Features", text: "Launched AI assistant for challenge recommendations. Reached 50,000 monthly active users." },
  { year: "2024 & Beyond", title: "GCC Expansion", text: "Expanding to Qatar, Kuwait & Bahrain. Launching enterprise API and white-label solutions.", final: true },
];

const TEAM: { name: string; role: string; bio: string; color: AccentKey }[] = [
  { name: "Ahmed Al-Saud", role: "CEO & Co-Founder", bio: "Former McKinsey consultant. 10+ years in corporate training & digital transformation across GCC.", color: "yellow" },
  { name: "Fatima Al-Mansoori", role: "CTO & Co-Founder", bio: "Ex-Google engineer. Built scalable platforms for millions of users. MIT Computer Science graduate.", color: "cyan" },
  { name: "Omar Khan", role: "Head of Gamification", bio: "Game design expert with 15+ years in the industry. Previously at EA Games and Ubisoft Middle East.", color: "green" },
  { name: "Sara Al-Ghamdi", role: "AI & ML Lead", bio: "PhD in Machine Learning from Stanford. Specializes in behavioral AI and recommendation systems.", color: "red" },
];

export default function AboutPage(_props: AboutPageProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = "About Taleeb - GCC Gamification Leader | Our Mission & Team";
  }, []);

  return (
    <div dir="ltr">
      {/* ————— Hero ————— */}
      <PageHeroShell>
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#ecdb33] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-300">About</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] [text-wrap:balance]"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE }}
            >
              <span className="block text-white">About Taleeb</span>
              <span className="block text-[#ecdb33] mt-1">GCC Gamification Leader</span>
            </motion.h1>
            <motion.p
              className="text-zinc-400 text-lg leading-relaxed mt-6 max-w-lg"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              Transforming corporate training, education, and team building across Saudi Arabia &amp; GCC with the power of gamification.
            </motion.p>
          </div>

          {/* Team-photo stand-in: a soft mosaic of the four founders' accent
              colours instead of a placeholder image box. */}
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          >
            <div className="grid grid-cols-2 gap-4 bg-[#0a0a0c]/75 border border-white/[0.06] rounded-3xl p-6">
              {TEAM.map((member) => (
                <div key={member.name} className="flex flex-col items-center gap-3 py-6">
                  <InitialsAvatar name={member.name} color={member.color} className="w-16 h-16 text-lg" />
                  <span className="text-xs text-zinc-500 text-center">{member.role}</span>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-5 -start-5 bg-[#0a0a0c] border border-white/10 rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-2xl">
              <IconTile icon={Calendar} color="yellow" size="sm" />
              <div className="text-start">
                <div className="text-[11px] text-zinc-500 leading-none">Founded in</div>
                <div className="text-sm font-bold text-white mt-1">Riyadh, 2020</div>
              </div>
            </div>
          </motion.div>
        </div>
      </PageHeroShell>

      {/* ————— Mission ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <div className="mb-5">
              <Eyebrow icon={Target} color="yellow">Our Mission</Eyebrow>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Making Learning <span className="text-[#ecdb33]">Fun</span> &amp; <span className="text-[#ecdb33]">Engaging</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-6">
              Taleeb is the <strong className="text-zinc-200 font-semibold">first GCC-native gamification platform</strong>. We turn boring training into engaging challenges using GPS hunts, QR missions, photo/video tasks, and AI-powered leaderboards.
            </p>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4">
              Our mission is simple: transform how organizations engage their people. Whether it&apos;s employee onboarding, sales competitions, or student orientation — we make it memorable, measurable, and most importantly, <strong className="text-zinc-200 font-semibold">fun</strong>.
            </p>

            <div className="flex flex-col gap-5 mt-10">
              {MISSION_POINTS.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="flex items-start gap-4"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: EASE }}
                >
                  <span className={`grid place-items-center w-10 h-10 rounded-xl ${accents[p.color].bgSoft} border ${accents[p.color].border} ${accents[p.color].text} flex-shrink-0`}>
                    <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed mt-1">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STATS.map((s, i) => (
              <GlassCard key={s.label} accent={s.color} className="p-6" delay={i * 0.08}>
                <div className={`text-4xl font-bold font-mono tracking-tight ${accents[s.color].text}`}>{s.value}</div>
                <h4 className="text-sm font-bold text-white mt-3">{s.label}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed mt-2">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Why choose us ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8 bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Star}
            eyebrowLabel="Why Choose Us"
            title={<>Why GCC Leaders <span className="text-[#ecdb33]">Trust Taleeb</span></>}
            subhead="We understand the unique needs of organizations in Saudi Arabia, UAE, and the wider GCC region."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((card, i) => (
              <GlassCard key={card.title} accent={card.color} className="p-6 flex flex-col" delay={i * 0.08}>
                <IconTile icon={card.icon} color={card.color} />
                <h3 className="text-base font-bold text-white mt-5">{card.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mt-2 flex-1">{card.text}</p>
                <div className={`text-xs font-medium ${accents[card.color].text} mt-5 pt-4 border-t border-white/[0.06]`}>{card.footer}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Timeline ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Calendar}
            eyebrowLabel="Our Journey"
            title={<>The <span className="text-[#ecdb33]">Taleeb</span> Story</>}
          />
          <div className="max-w-2xl mx-auto flex flex-col gap-5">
            {TIMELINE.map((item, i) => (
              <GlassCard
                key={item.year}
                accent={item.final ? "green" : "yellow"}
                className={`p-6 flex items-start gap-5 ${item.final ? "bg-gradient-to-br from-[#3cdb4e]/[0.08] to-[#0a0a0c]/75" : ""}`}
                delay={i * 0.06}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className={`w-3 h-3 rounded-full ${item.final ? "bg-[#3cdb4e]" : "bg-[#ecdb33]"}`} />
                  {i < TIMELINE.length - 1 && <span className="w-px h-full bg-white/10 mt-2" />}
                </div>
                <div>
                  <span className={`text-xs font-mono font-bold ${item.final ? "text-[#3cdb4e]" : "text-[#ecdb33]"}`}>{item.year}</span>
                  <h4 className="text-base font-bold text-white mt-1">{item.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed mt-1.5">{item.text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Team ————— */}
      <section id="team" className="py-24 md:py-32 relative px-4 md:px-8 bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Users}
            eyebrowLabel="Our Team"
            title={<>Meet the Team Behind <span className="text-[#ecdb33]">Taleeb</span></>}
            subhead="A passionate team of gamification experts, engineers, and designers building the future of engagement."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <GlassCard key={member.name} accent={member.color} className="p-6 group text-center" delay={i * 0.08}>
                <InitialsAvatar name={member.name} color={member.color} className="w-20 h-20 text-xl mx-auto" />
                <div className="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="#" aria-label="Twitter" className="p-1.5 rounded-full bg-white/[0.06] text-zinc-400 hover:text-[#ecdb33] transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
                  <a href="#" aria-label="LinkedIn" className="p-1.5 rounded-full bg-white/[0.06] text-zinc-400 hover:text-[#ecdb33] transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
                </div>
                <h3 className="text-base font-bold text-white mt-3">{member.name}</h3>
                <p className={`text-xs font-medium ${accents[member.color].text} mt-1`}>{member.role}</p>
                <p className="text-zinc-500 text-xs leading-relaxed mt-3">{member.bio}</p>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-zinc-500 text-sm mb-2">Want to join our team?</p>
            <a href="#" className="inline-flex items-center gap-1.5 text-[#ecdb33] text-sm font-semibold hover:gap-2.5 transition-all">
              View Open Positions <ArrowRight className="w-4 h-4" />
            </a>
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
              <IconTile icon={Target} color="yellow" size="lg" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-6 [text-wrap:balance]">
                Ready to Gamify Your Business?
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-xl mx-auto">
                Join 500+ GCC organizations that trust Taleeb. Book a personalized demo and see how gamification can transform your engagement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ecdb33] font-semibold text-black w-full sm:w-auto">
                  Book a Demo <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/[0.05] transition-colors w-full sm:w-auto">
                  Start Free Trial
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 mt-8 text-xs text-zinc-500">
                {["Free consultation", "Custom demo for your industry", "ROI calculator included"].map((label) => (
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
