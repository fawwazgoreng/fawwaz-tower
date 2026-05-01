import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Particles } from "../ui/Particles";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/fawwazgoreng" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
];

const MathRandom = Math.random();

export const PortalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="portal" className="relative py-24 md:py-32 bg-card/30 overflow-hidden">
      {/* Galaxy Portal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Outer nebula glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-200 h-200 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(268 60% 55% / 0.35) 0%, hsl(190 80% 45% / 0.25) 40%, transparent 70%)",
          }}
        />
        {/* Spinning galaxy ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-150 h-150 rounded-full opacity-50 blur-2xl"
          style={{
            background: "conic-gradient(from 0deg, hsl(190 80% 45% / 0.6), hsl(268 60% 55% / 0.5), hsl(0 55% 45% / 0.4), hsl(42 70% 50% / 0.5), hsl(190 80% 45% / 0.6))",
          }}
        />
        {/* Counter-spinning inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-105 h-105 rounded-full opacity-60 blur-xl"
          style={{
            background: "conic-gradient(from 180deg, hsl(268 60% 55% / 0.7), hsl(190 80% 45% / 0.6), hsl(42 70% 50% / 0.5), hsl(268 60% 55% / 0.7))",
          }}
        />
        {/* Event horizon */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute w-70 h-70 rounded-full"
          style={{
            background: "conic-gradient(from 90deg, hsl(190 80% 45%), hsl(268 60% 55%), hsl(225 15% 5%), hsl(42 70% 50%), hsl(190 80% 45%))",
            boxShadow: "0 0 80px hsl(268 60% 55% / 0.6), inset 0 0 60px hsl(225 15% 5%)",
          }}
        />
        {/* Dark core */}
        <div
          className="absolute w-45 h-45 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(225 15% 3%) 30%, hsl(268 60% 15% / 0.8) 70%, transparent 100%)",
            boxShadow: "inset 0 0 40px hsl(190 80% 45% / 0.3)",
          }}
        />
        {/* Star specks */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-foreground"
            style={{
              left: `${20 + MathRandom * 60}%`,
              top: `${20 + MathRandom * 60}%`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2 + MathRandom * 3, repeat: Infinity, delay: MathRandom * 4 }}
          />
        ))}
      </div>

      <Particles count={20} />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-destructive">Floor 5</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl mt-2 text-foreground">
            The <span className="text-destructive">Portal</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto">
            Open a gateway. Let's create something legendary together.
          </p>
        </motion.div>

        {/* Portal ring decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-2xl gradient-portal opacity-20 blur-xl animate-pulse-glow" />

          <form onSubmit={handleSubmit} className="relative bg-card border border-border rounded-2xl p-6 md:p-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-heading text-xs tracking-wider uppercase text-muted-foreground mb-2 block">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Adventurer Name..."
                />
              </div>
              <div>
                <label className="font-heading text-xs tracking-wider uppercase text-muted-foreground mb-2 block">Your Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="adventurer@realm.com"
                />
              </div>
            </div>
            <div>
              <label className="font-heading text-xs tracking-wider uppercase text-muted-foreground mb-2 block">Your Message</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="Describe your quest..."
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold tracking-wider uppercase text-sm hover:box-glow-cyan transition-all duration-300 flex items-center justify-center gap-2"
            >
              {submitted ? (
                <span>✨ Portal Opened! Message Sent!</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Summon Me</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:box-glow-cyan hover:border-primary/50 transition-all duration-300"
                aria-label={s.label}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-16 font-body text-xs text-muted-foreground/50">
          © 2026 — Forged with passion. Inspired by Pick Me Up! Infinite Gacha.
        </div>
      </div>
    </section>
  );
};
