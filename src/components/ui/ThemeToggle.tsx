import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(true);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    setFlash(true);
    setTimeout(() => {
      setDark(!dark);
      setTimeout(() => setFlash(false), 300);
    }, 150);
  };

  return (
    <>
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-9999 pointer-events-none bg-primary/30"
          />
        )}
      </AnimatePresence>
      <button
        onClick={toggle}
        className="relative p-2 rounded-full border border-border bg-card/50 backdrop-blur-sm hover:box-glow-cyan transition-all duration-300"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {dark ? (
            <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Moon className="w-5 h-5 text-primary" />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sun className="w-5 h-5 text-accent" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
};
