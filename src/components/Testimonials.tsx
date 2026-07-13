import { motion, useReducedMotion } from "motion/react";
import { Star, MessageSquareQuote } from "lucide-react";
import { TranslationDictionary, TestimonialItem } from "../types";
import { EASE } from "../theme";
import { Eyebrow } from "./PageKit";

interface TestimonialsProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="bg-[#0a0a0c]/80 border border-white/[0.06] rounded-3xl p-6 flex-shrink-0">
      <div className="flex items-center gap-1 mb-4" aria-hidden="true">
        {Array.from({ length: item.rating }).map((_, r) => (
          <Star key={r} className="w-3.5 h-3.5 text-[#ecdb33] fill-[#ecdb33]" />
        ))}
      </div>
      <blockquote className="text-zinc-300 text-sm leading-relaxed">{item.quote}</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-white/[0.06] mt-5 pt-5">
        <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0" />
        <div className="min-w-0">
          <cite className="text-sm font-bold text-white not-italic block truncate">{item.name}</cite>
          <span className="text-xs text-zinc-500 block truncate">{item.role} · {item.company}</span>
        </div>
      </figcaption>
    </figure>
  );
}

/** One marquee lane: content is rendered twice back-to-back and translated by
    exactly -50% on an infinite linear loop, so the seam between the two
    copies is invisible — the standard seamless-scroll technique. Frozen
    (single, non-duplicated list, no animation) under prefers-reduced-motion. */
function TestimonialsColumn({ items, duration, className = "" }: { items: TestimonialItem[]; duration: number; className?: string }) {
  const reduce = useReducedMotion();
  const list = reduce ? items : [...items, ...items];
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex flex-col gap-5"
        animate={reduce ? undefined : { y: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration, repeat: Infinity, ease: "linear" }}
      >
        {list.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials({ t }: TestimonialsProps) {
  const reduce = useReducedMotion();
  const items = t.testimonials.items;
  const columns = [items.slice(0, 3), items.slice(3, 6), items.slice(6, 9)];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            className="flex justify-center mb-5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: EASE }}
          >
            <Eyebrow icon={MessageSquareQuote} color="yellow">{t.testimonials.sectionBadge}</Eyebrow>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: EASE }}
          >
            {t.testimonials.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.testimonials.sectionSubhead}
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-[600px] sm:h-[720px]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <TestimonialsColumn items={columns[0]} duration={26} />
          <TestimonialsColumn items={columns[1]} duration={32} className="hidden md:block" />
          <TestimonialsColumn items={columns[2]} duration={29} className="hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
}
