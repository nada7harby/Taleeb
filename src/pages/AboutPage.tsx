import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  Target, CheckCircle2, Star, Globe2, BarChart3, MessageCircle, Sparkles,
  TrendingUp, Users, ArrowRight, ArrowUpRight, ChevronRight, Twitter, Linkedin, Quote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TranslationDictionary, AccentKey } from "../types";
import { accents, EASE } from "../theme";
import { Eyebrow, SectionHeader, GlassCard, IconTile, InitialsAvatar, PageHeroShell, LevelBadge, renderHighlight } from "../components/PageKit";

interface AboutPageProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

const CONTACT_HREF = "/#contact";

const ICONS: Record<string, LucideIcon> = { Globe2, BarChart3, Sparkles, MessageCircle };

/** Quiet inline progress bar used on the team roster — a restrained nod to
    the product's own stat bars, not a literal RPG sheet. */
function SkillBar({ label, value, color }: { label: string; value: number; color: AccentKey }) {
  const reduce = useReducedMotion();
  const c = accents[color];
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-medium text-zinc-500 w-14 flex-shrink-0">{label}</span>
      <span className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.span
          className={`block h-full rounded-full ${c.dot}`}
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      </span>
      <span className={`text-[10px] font-mono font-semibold ${c.text} w-7 text-right flex-shrink-0`}>{value}</span>
    </div>
  );
}

export default function AboutPage({ t, locale }: AboutPageProps) {
  const a = t.about;
  const reduce = useReducedMotion();
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ["start 0.7", "end 0.55"],
  });
  const railScale = useTransform(journeyProgress, [0, 1], [0, 1]);
  const railGradient = `linear-gradient(to bottom, ${a.journey.items.map((item) => accents[item.color].hex).join(", ")})`;

  useEffect(() => {
    document.title = a.metaTitle;
  }, [a.metaTitle]);

  return (
    <div>
      {/* ————— Hero ————— */}
      <PageHeroShell>
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#ecdb33] transition-colors">{a.breadcrumb.home}</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          <span className="text-zinc-300">{a.breadcrumb.current}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] [text-wrap:balance]"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE }}
            >
              {renderHighlight(a.hero.title)}
            </motion.h1>
            <motion.p
              className="text-zinc-400 text-lg leading-relaxed mt-6 max-w-lg"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {a.hero.subheading}
            </motion.p>
          </div>

          {/* Company "profile card" — Taleeb telling its own story in the
              same stat-card language its product gives to every player. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          >
            <div className="relative overflow-hidden bg-[#0a0a0c]/80 border border-white/[0.08] rounded-3xl p-7 sm:p-8">
              <div className="pointer-events-none absolute -top-10 -end-10 w-40 h-40 rounded-full bg-[#ecdb33]/10 blur-[80px]" />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono tracking-[0.2em] text-zinc-500">{a.hero.companyCard.est}</div>
                  <div className="text-2xl font-bold text-white font-mono tracking-tight mt-1">{t.nav.brandName}</div>
                </div>
                <LevelBadge level={5} current color="green" label={a.hero.companyCard.level} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-8">
                {a.hero.stats.map((s) => (
                  <div key={s.label}>
                    <div className={`text-3xl font-bold font-mono tracking-tight ${accents[s.color].text}`}>{s.value}</div>
                    <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/[0.06] mt-7 pt-5 text-xs text-zinc-500 leading-relaxed">
                {a.hero.companyCard.footer}
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
              <Eyebrow icon={Target} color="yellow">{a.mission.eyebrow}</Eyebrow>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              {renderHighlight(a.mission.title)}
            </h2>
            {a.mission.paragraphs.map((p, i) => (
              <p key={i} className={`text-zinc-400 text-base sm:text-lg leading-relaxed ${i === 0 ? "mt-6" : "mt-4"}`}>
                {p}
              </p>
            ))}

            <div className="flex flex-col gap-5 mt-10">
              {a.mission.points.map((p, i) => {
                const Icon = ICONS[p.iconName] ?? Globe2;
                return (
                  <motion.div
                    key={p.title}
                    className="flex items-start gap-4"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, ease: EASE }}
                  >
                    <span className={`grid place-items-center w-10 h-10 rounded-xl ${accents[p.color].bgSoft} border ${accents[p.color].border} ${accents[p.color].text} flex-shrink-0`}>
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{p.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed mt-1">{p.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Founder pull-quote — a human, editorial beat instead of a
              second stats grid duplicating the hero card. */}
          <GlassCard accent="yellow" className="p-8 sm:p-10 relative overflow-hidden" delay={0.1}>
            <Quote className="w-10 h-10 text-[#ecdb33]/25 rtl:-scale-x-100" strokeWidth={1.5} />
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug tracking-tight mt-4 [text-wrap:balance]">
              {a.mission.quote.text}
            </p>
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.06]">
              <InitialsAvatar name={a.mission.quote.name} color="yellow" className="w-11 h-11 text-sm" />
              <div>
                <div className="text-sm font-bold text-white">{a.mission.quote.name}</div>
                <div className="text-xs text-zinc-500">{a.mission.quote.role}</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ————— Why choose us — asymmetric bento, not four equal tiles ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8 bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Star}
            eyebrowLabel={a.whyUs.eyebrow}
            title={renderHighlight(a.whyUs.title)}
            subhead={a.whyUs.subhead}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {a.whyUs.cards.map((card, i) => {
              const Icon = ICONS[card.iconName] ?? Globe2;
              return (
                <GlassCard
                  key={card.title}
                  accent={card.color}
                  className={`p-7 flex flex-col ${card.size === "lg" ? "lg:col-span-2" : ""}`}
                  delay={i * 0.08}
                >
                  <IconTile icon={Icon} color={card.color} />
                  <h3 className="text-base font-bold text-white mt-5">{card.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mt-2 flex-1 max-w-md">{card.text}</p>
                  <div className={`text-xs font-medium ${accents[card.color].text} mt-5 pt-4 border-t border-white/[0.06]`}>{card.footer}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— Journey — Level Log: a scroll-linked rail through the brand's
          own accents, real doubling XP thresholds. The one section where a
          numbered sequence is earned by the content, not decorative. ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={TrendingUp}
            eyebrowLabel={a.journey.eyebrow}
            title={renderHighlight(a.journey.title)}
            subhead={a.journey.subhead}
          />
          <div ref={journeyRef} className="max-w-2xl md:max-w-4xl mx-auto relative">
            {/* Mobile rail — start-aligned */}
            <div className="md:hidden absolute top-2 bottom-2 start-[21px] w-[2px] rounded-full bg-white/10" aria-hidden="true" />
            <motion.div
              className="md:hidden absolute top-2 bottom-2 start-[21px] w-[2px] rounded-full origin-top"
              style={{ scaleY: railScale, backgroundImage: railGradient }}
              aria-hidden="true"
            />
            {/* Desktop rail — centered spine for the alternating layout */}
            <div className="hidden md:block absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[2px] rounded-full bg-white/10" aria-hidden="true" />
            <motion.div
              className="hidden md:block absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[2px] rounded-full origin-top"
              style={{ scaleY: railScale, backgroundImage: railGradient }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-10 md:gap-6">
              {a.journey.items.map((item, i) => {
                const c = accents[item.color];
                const isLeft = i % 2 === 0;
                const meta = (
                  <>
                    <span className={`text-xs font-mono font-bold ${c.text}`}>{item.year}</span>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${c.bgSoft} ${c.text}`}>+{item.xp} XP</span>
                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#d04242]/10 border border-[#d04242]/25 text-[#d04242]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d04242] animate-pulse" /> LIVE
                      </span>
                    )}
                  </>
                );
                return (
                  <motion.div
                    key={item.year}
                    className="relative"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.05, ease: EASE }}
                  >
                    {/* Mobile: single column, dot + card side by side */}
                    <div className="flex md:hidden items-start gap-5">
                      <LevelBadge level={item.level} color={item.color} />
                      <div className="flex-1 pt-1.5">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">{meta}</div>
                        <h4 className="text-base font-bold text-white mt-1.5">{item.title}</h4>
                        <p className="text-zinc-500 text-sm leading-relaxed mt-1">{item.text}</p>
                      </div>
                    </div>

                    {/* Desktop: card alternates left/right of the centered spine.
                        Explicit col-start placement (not `order`) — the unused
                        side simply has nothing placed in it. */}
                    <div className="hidden md:grid grid-cols-[1fr_2.75rem_1fr] items-center gap-6">
                      <div className="row-start-1 col-start-2 flex justify-center">
                        <LevelBadge level={item.level} color={item.color} />
                      </div>
                      <div className={`row-start-1 ${isLeft ? "col-start-1 flex justify-end" : "col-start-3 flex justify-start"}`}>
                        <div className={`bg-[#0a0a0c]/80 border border-white/[0.06] ${c.hoverBorder} transition-colors duration-300 rounded-3xl p-6 max-w-md w-full ${isLeft ? "text-right" : "text-left"}`}>
                          <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${isLeft ? "justify-end" : ""}`}>
                            {meta}
                          </div>
                          <h4 className="text-base font-bold text-white mt-1.5">{item.title}</h4>
                          <p className="text-zinc-500 text-sm leading-relaxed mt-1">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ————— Team — a roster of rows, quiet skill bars, not an
          avatar grid with hover social icons ————— */}
      <section id="team" className="py-24 md:py-32 relative px-4 md:px-8 bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Users}
            eyebrowLabel={a.team.eyebrow}
            title={renderHighlight(a.team.title)}
            subhead={a.team.subhead}
          />
          <div className="flex flex-col gap-4">
            {a.team.members.map((member, i) => (
              <GlassCard key={member.name} accent={member.color} className="p-6 sm:p-7" delay={i * 0.06}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex items-center gap-4 sm:w-64 flex-shrink-0">
                    <InitialsAvatar name={member.name} color={member.color} className="w-14 h-14 text-base flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white">{member.name}</h3>
                      <p className={`text-xs font-medium ${accents[member.color].text} mt-0.5`}>{member.role}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <a href="#" aria-label={`${member.name} — ${locale === "ar" ? "تويتر" : "Twitter"}`} className="p-1 rounded-full bg-white/[0.06] text-zinc-500 hover:text-[#ecdb33] transition-colors"><Twitter className="w-3 h-3" /></a>
                        <a href="#" aria-label={`${member.name} — LinkedIn`} className="p-1 rounded-full bg-white/[0.06] text-zinc-500 hover:text-[#ecdb33] transition-colors"><Linkedin className="w-3 h-3" /></a>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1">{member.bio}</p>
                  <div className="flex flex-col gap-2.5 sm:w-56 flex-shrink-0">
                    {member.skills.map((s) => (
                      <SkillBar key={s.label} label={s.label} value={s.value} color={member.color} />
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-zinc-500 text-sm mb-2">{a.team.joinText}</p>
            <a href="#" className="inline-flex items-center gap-1.5 text-[#ecdb33] text-sm font-semibold hover:gap-2.5 transition-all">
              {a.team.joinCta} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
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
                {a.cta.title}
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-xl mx-auto">
                {a.cta.subhead}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ecdb33] font-semibold text-black w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecdb33]">
                  {a.cta.primaryCta} <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/[0.05] transition-colors w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecdb33]">
                  {a.cta.secondaryCta}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 mt-8 text-xs text-zinc-500">
                {a.cta.proofPoints.map((label) => (
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
