import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Target, CheckCircle2, Package, Dices, Settings2, Image as ImageIcon, Clapperboard,
  Monitor, Smartphone, Bot, Wrench, Trophy, BarChart3, MapPin, QrCode, Camera, Brain,
  Timer, Users, Star, Award, Clock, Handshake, Flame, Lock, ArrowUpRight, ChevronRight, Zap, Radio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TranslationDictionary, AccentKey } from "../types";
import { accents, EASE } from "../theme";
import { Eyebrow, SectionHeader, GlassCard, IconTile, PageHeroShell, StreakMeter, Leaderboard, renderHighlight } from "../components/PageKit";

interface ProductsPageProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

const CONTACT_HREF = "/#contact";
const ACCENT_CYCLE: AccentKey[] = ["red", "cyan", "yellow", "green"];

const ICONS: Record<string, LucideIcon> = {
  Monitor, Smartphone, Bot, Wrench, Trophy, BarChart3, MapPin, QrCode, Camera, Brain,
  Timer, Users, Star, Award, Clock, Handshake, Flame,
};

export default function ProductsPage({ t, locale }: ProductsPageProps) {
  const p = t.products;
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = p.metaTitle;
  }, [p.metaTitle]);

  return (
    <div>
      {/* ————— Hero ————— */}
      <PageHeroShell>
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#ecdb33] transition-colors">{p.breadcrumb.home}</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          <span className="text-zinc-300">{p.breadcrumb.current}</span>
        </nav>

        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] [text-wrap:balance]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE }}
          >
            {renderHighlight(p.hero.title)}
          </motion.h1>
          <motion.p
            className="text-zinc-400 text-lg leading-relaxed mt-6 max-w-xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {p.hero.subheading}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4 mt-9"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {p.hero.badges.map((b) => {
              const Icon = ICONS[b.iconName] ?? Monitor;
              return (
                <span key={b.label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm text-zinc-300">
                  <Icon className="w-4 h-4 text-[#ecdb33]" strokeWidth={2} /> {b.label}
                </span>
              );
            })}
          </motion.div>
        </div>
      </PageHeroShell>

      {/* ————— Platform overview ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Target}
            eyebrowLabel={p.platformOverview.eyebrow}
            title={renderHighlight(p.platformOverview.title)}
            subhead={p.platformOverview.subhead}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {p.platformOverview.cards.map((card, i) => {
              const Icon = ICONS[card.iconName] ?? Wrench;
              return (
                <GlassCard key={card.title} accent={card.color} className="overflow-hidden" delay={i * 0.08}>
                  <div className={`aspect-video ${accents[card.color].bgSoft} border-b border-white/[0.06] grid place-items-center`}>
                    <Icon className={`w-10 h-10 ${accents[card.color].text}`} strokeWidth={1.5} />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— Core products (3 tiers) ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8 bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Package}
            eyebrowLabel={p.coreProducts.eyebrow}
            title={renderHighlight(p.coreProducts.title)}
            subhead={p.coreProducts.subhead}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {p.coreProducts.products.map((prod, i) => {
              const Icon = ICONS[prod.iconName] ?? Monitor;
              return (
                <GlassCard
                  key={prod.name}
                  accent={prod.color}
                  className={`overflow-hidden flex flex-col ${prod.popular ? "border-[#ecdb33]/50" : ""}`}
                  delay={i * 0.08}
                >
                  {prod.popular && (
                    <div className="bg-[#ecdb33] text-black text-[11px] font-bold uppercase tracking-wide text-center py-1.5">
                      {p.coreProducts.popularLabel}
                    </div>
                  )}
                  <div className={`p-7 ${accents[prod.color].bgSoft} border-b border-white/[0.06]`}>
                    <IconTile icon={Icon} color={prod.color} size="lg" />
                    <h3 className="text-lg font-bold text-white mt-4">{prod.name}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mt-2">{prod.tagline}</p>
                  </div>
                  <div className="p-7 flex flex-col gap-4 flex-1">
                    {prod.features.map((f) => (
                      <div key={f.title} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-4 h-4 ${accents[prod.color].text} flex-shrink-0 mt-0.5`} />
                        <div>
                          <div className="text-sm font-semibold text-white">{f.title}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">{f.text}</div>
                        </div>
                      </div>
                    ))}
                    <a
                      href={CONTACT_HREF}
                      className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecdb33] ${accents[prod.color].solid}`}
                    >
                      {prod.cta} <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— Six challenge types ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrowIcon={Dices}
            eyebrowLabel={p.challengeTypes.eyebrow}
            title={renderHighlight(p.challengeTypes.title)}
            subhead={p.challengeTypes.subhead}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {p.challengeTypes.items.map((c, i) => {
              const color = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
              const Icon = ICONS[c.iconName] ?? MapPin;
              return (
                <GlassCard key={c.title} accent={color} className="p-6" delay={i * 0.06}>
                  <IconTile icon={Icon} color={color} />
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
              <Eyebrow icon={Settings2} color="yellow">{p.mechanics.eyebrow}</Eyebrow>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              {renderHighlight(p.mechanics.title)}
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4">
              {p.mechanics.text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {p.mechanics.items.map((m, i) => {
                const Icon = ICONS[m.iconName] ?? Star;
                return (
                  <motion.div
                    key={m.title}
                    className="flex items-center gap-3.5 bg-[#0a0a0c]/60 border border-white/[0.06] rounded-2xl p-4"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, ease: EASE }}
                  >
                    <IconTile icon={Icon} color={m.color} size="sm" />
                    <div>
                      <div className="text-sm font-bold text-white">{m.title}</div>
                      <div className="text-xs text-zinc-500">{m.text}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mock "Your Progress" gamification UI card */}
          <GlassCard accent="yellow" className="p-7 relative">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{p.mechanics.demo.title}</span>
              <Trophy className="w-5 h-5 text-[#ecdb33]" />
            </div>
            <div className="mt-6">
              <div className="text-4xl font-bold font-mono text-[#ecdb33]">2,450</div>
              <div className="text-xs text-zinc-500 mt-1">{p.mechanics.demo.pointsLabel}</div>
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
              <div className="text-[11px] text-zinc-500 mt-2">{p.mechanics.demo.toNextLevel}</div>
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
            <StreakMeter days={7} title={p.mechanics.demo.streakTitle} subtitle={p.mechanics.demo.streakSubtitle} />

            <motion.div
              className="absolute -top-4 -end-3 bg-[#ecdb33] text-black text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl"
              initial={reduce ? false : { opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {p.mechanics.demo.bonusToast}
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* ————— Live leaderboard — the page's one genuine interactive
          moment (PRODUCT.md), not a static mock. ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <div className="mb-5">
              <Eyebrow icon={Radio} color="red">{p.leaderboard.eyebrow}</Eyebrow>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              {renderHighlight(p.leaderboard.title)}
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-lg">
              {p.leaderboard.subhead}
            </p>
          </div>
          <GlassCard className="p-5 sm:p-6">
            <Leaderboard
              players={p.leaderboard.players}
              liveLabel={p.leaderboard.liveLabel}
              rankLabel={p.leaderboard.rankLabel}
              scoreLabel={p.leaderboard.scoreLabel}
            />
          </GlassCard>
        </div>
      </section>

      {/* ————— Product screenshot ————— */}
      <section className="py-24 md:py-32 relative px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            center
            eyebrowIcon={ImageIcon}
            eyebrowLabel={p.screenshot.eyebrow}
            title={renderHighlight(p.screenshot.title)}
          />
          <div className="relative max-w-4xl mx-auto">
            <GlassCard className="aspect-video overflow-hidden">
              <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#40ccd0]/[0.06] to-[#ecdb33]/[0.04]">
                <div className="text-center">
                  <Monitor className="w-14 h-14 text-zinc-600 mx-auto" strokeWidth={1.25} />
                  <p className="text-zinc-600 text-sm mt-3">{p.screenshot.previewLabel}</p>
                </div>
              </div>
            </GlassCard>
            <div className="absolute -top-4 start-6 bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#3cdb4e] flex items-center gap-1.5 shadow-xl">
              <CheckCircle2 className="w-3.5 h-3.5" /> {p.screenshot.toast1}
            </div>
            <div className="absolute -bottom-4 end-6 bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#40ccd0] flex items-center gap-1.5 shadow-xl">
              <BarChart3 className="w-3.5 h-3.5" /> {p.screenshot.toast2}
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
                {p.cta.title}
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4 max-w-xl mx-auto">
                {p.cta.subhead}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ecdb33] font-semibold text-black w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecdb33]">
                  {p.cta.primaryCta} <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href={CONTACT_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/[0.05] transition-colors w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecdb33]">
                  {p.cta.secondaryCta}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 mt-8 text-xs text-zinc-500">
                {p.cta.proofPoints.map((label) => (
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
