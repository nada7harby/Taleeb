import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Send, Rocket, Sparkles, Coins, Award, RefreshCw } from "lucide-react";
import { TranslationDictionary } from "../types";
import { EASE } from "../theme";

interface ContactProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white placeholder-zinc-500 text-sm focus:border-[#ecdb33] focus:ring-2 focus:ring-[#ecdb33]/30 outline-none transition-all";
const labelCls = "text-xs font-semibold text-zinc-300 tracking-wide";

export default function Contact({ t, locale }: ContactProps) {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", company: "", domain: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };
  const reset = () => { setForm({ name: "", email: "", company: "", domain: "", message: "" }); setSubmitted(false); };

  return (
    <section id="contact" className="py-24 md:py-32 relative px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* This page's 3rd (and final) eyebrow */}
          <motion.span
            className="inline-block text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-[#ecdb33] mb-4"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.contact.sectionBadge}
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, ease: EASE }}
          >
            {t.contact.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-4"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            {t.contact.sectionSubhead}
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={submit}
                className="bg-[#0a0a0c]/80 border border-white/[0.06] rounded-3xl p-6 sm:p-9 flex flex-col gap-5 text-start"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className={labelCls}>{t.contact.formName} *</label>
                    <input id="name" type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls} placeholder={locale === "en" ? "Faisal Al-Otaibi" : "فيصل العتيبي"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className={labelCls}>{t.contact.formEmail} *</label>
                    <input id="email" type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls} placeholder="name@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className={labelCls}>{t.contact.formCompany}</label>
                    <input id="company" type="text" value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputCls} placeholder={locale === "en" ? "Your organization" : "اسم المنظمة"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="domain" className={labelCls}>{t.contact.formService}</label>
                    <select id="domain" value={form.domain}
                      onChange={(e) => setForm({ ...form, domain: e.target.value })}
                      className={`${inputCls} appearance-none ${form.domain ? "text-white" : "text-zinc-500"}`}>
                      <option value="" disabled>{t.contact.formServicePlaceholder}</option>
                      {t.contact.servicesList.map((s, idx) => (
                        <option key={idx} value={s} className="bg-black text-white">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className={labelCls}>{t.contact.formMessage}</label>
                  <textarea id="message" rows={4} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputCls} placeholder={t.contact.formMessagePlaceholder} />
                </div>

                <motion.button
                  type="submit" disabled={submitting}
                  className="w-full py-4 rounded-full bg-[#ecdb33] text-black font-bold text-base flex items-center justify-center gap-2.5 disabled:opacity-60 shadow-[0_12px_40px_-10px_rgba(236,219,51,0.6)] mt-1"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  {submitting ? <><RefreshCw className="w-5 h-5 animate-spin" /> {t.contact.formSubmitting}</>
                    : <><Send className="w-5 h-5" /> {t.contact.formSubmit}</>}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="bg-[#0a0a0c] border border-[#3cdb4e]/30 rounded-3xl p-8 sm:p-12 text-center"
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, type: "spring", damping: 24 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-[#3cdb4e]/10 border border-[#3cdb4e]/30 grid place-items-center mx-auto mb-6"
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket className="w-9 h-9 text-[#3cdb4e]" strokeWidth={1.75} />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">{t.contact.successTitle}</h3>
                <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed mb-8">{t.contact.successMessage}</p>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-9 text-start">
                  {[
                    { Icon: Sparkles, tone: "text-[#ecdb33]", bg: "bg-[#ecdb33]/10 border-[#ecdb33]/25", k: locale === "en" ? "Bounty" : "المكافأة", v: "+5,000 XP" },
                    { Icon: Coins, tone: "text-[#3cdb4e]", bg: "bg-[#3cdb4e]/10 border-[#3cdb4e]/25", k: locale === "en" ? "Currency" : "العملة", v: locale === "en" ? "500 coins" : "500 عملة" },
                    { Icon: Award, tone: "text-[#40ccd0]", bg: "bg-[#40ccd0]/10 border-[#40ccd0]/25", k: locale === "en" ? "Badge" : "الوسام", v: "Pioneer" },
                  ].map(({ Icon, tone, bg, k, v }) => (
                    <div key={k} className={`p-3 rounded-xl border ${bg} flex flex-col gap-1.5`}>
                      <Icon className={`w-5 h-5 ${tone}`} strokeWidth={1.75} />
                      <span className="text-[9px] font-mono uppercase text-zinc-500">{k}</span>
                      <span className="text-xs font-bold text-white">{v}</span>
                    </div>
                  ))}
                </div>

                <button onClick={reset} className="px-8 py-3.5 rounded-full bg-[#3cdb4e] text-black font-bold text-sm hover:brightness-105 transition-all">
                  {t.contact.successButton}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
