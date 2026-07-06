import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Rocket, Award, Sparkles, Flame, Coins, Trophy, RefreshCw } from "lucide-react";
import { TranslationDictionary } from "../types";

interface ContactProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function Contact({ t, locale }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    domain: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      domain: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-xs font-bold text-violet-400 uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.contact.sectionBadge}
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.contact.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.contact.sectionSubhead}
          </motion.p>
        </div>

        {/* Dynamic Form Board */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              
              /* 1. INTERACTIVE FORM VIEW */
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0d0a18]/75 backdrop-blur border border-violet-500/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Visual glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-transparent pointer-events-none" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 text-start">
                  
                  {/* Name and Email input rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-zinc-300 font-mono tracking-wider uppercase">
                        {t.contact.formName} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#130f24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-zinc-300 font-mono tracking-wider uppercase">
                        {t.contact.formEmail} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#130f24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all duration-300"
                        placeholder="john@alliance.com"
                      />
                    </div>
                  </div>

                  {/* Company and Domain rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-xs font-bold text-zinc-300 font-mono tracking-wider uppercase">
                        {t.contact.formCompany}
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#130f24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all duration-300"
                        placeholder="Enterprise Ltd."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="domain" className="text-xs font-bold text-zinc-300 font-mono tracking-wider uppercase">
                        {t.contact.formService}
                      </label>
                      <select
                        id="domain"
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#130f24] border border-white/10 text-zinc-400 placeholder-zinc-600 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="" disabled>{t.contact.formServicePlaceholder}</option>
                        {t.contact.servicesList.map((srv, idx) => (
                          <option key={idx} value={srv} className="bg-[#130f24] text-white">
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message rows */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-zinc-300 font-mono tracking-wider uppercase">
                      {t.contact.formMessage}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#130f24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all duration-300"
                      placeholder={t.contact.formMessagePlaceholder}
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    id="submit-contact"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-violet-600/30 border border-violet-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>{t.contact.formSubmitting}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.contact.formSubmit}</span>
                      </>
                    )}
                  </motion.button>

                </form>
              </motion.div>
            ) : (
              
              /* 2. SUCCESS CELEBRATION QUEST UNLOCKED VIEW */
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-[#0f0a20] border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-emerald-950/20 relative overflow-hidden"
              >
                {/* Dynamic animated sparks/shines inside success block */}
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-[50px] animate-blob-reverse" />

                {/* Big trophy or rocket icon with bounce effect */}
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 p-[3px] mx-auto mb-6 shadow-lg shadow-emerald-500/20"
                  animate={{ scale: [0.9, 1.1, 1], y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full bg-[#0d0a18] rounded-full flex items-center justify-center">
                    <Rocket className="w-10 h-10 text-emerald-400" />
                  </div>
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white mb-2">
                  {t.contact.successTitle}
                </h3>
                
                <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed mb-8">
                  {t.contact.successMessage}
                </p>

                {/* Gamified simulated bounty box container */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-10 bg-[#070512] border border-white/5 p-4 rounded-2xl text-start">
                  <div className="p-3 bg-violet-500/10 border border-violet-500/25 rounded-xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-violet-400 flex-shrink-0 animate-spin-slow" />
                    <div>
                      <span className="text-[9px] font-mono block text-zinc-500">QUEST BOUNTY</span>
                      <span className="text-xs font-bold text-white">+5,000 XP</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center gap-3">
                    <Coins className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono block text-zinc-500">CURRENCY</span>
                      <span className="text-xs font-bold text-white">500 Gold Coins</span>
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/25 rounded-xl flex items-center gap-3">
                    <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono block text-zinc-500">BADGES</span>
                      <span className="text-xs font-bold text-white">Pioneer v1.0</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all cursor-pointer"
                >
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
