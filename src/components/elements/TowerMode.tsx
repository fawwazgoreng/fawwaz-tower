import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TowerModeProps {
  active: boolean;
  onClose: () => void;
}

const floors = [
  { floor: 100, label: "The Creator", section: "creator", rank: "SSS", color: "text-primary" },
  { floor: 75, label: "The Journey", section: "journey", rank: "SS", color: "text-secondary" },
  { floor: 50, label: "The Creation", section: "creation", rank: "S", color: "text-primary" },
  { floor: 25, label: "The Ascent", section: "ascent", rank: "A", color: "text-accent" },
  { floor: 0, label: "The Portal", section: "portal", rank: "B", color: "text-destructive" },
];

export const TowerMode = ({ active, onClose }: TowerModeProps) => {
  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-60 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase text-primary/60">
              ⟨ Tower Progression System ⟩
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground mt-2">
              Tower <span className="text-glow-cyan">Map</span>
            </h2>
          </motion.div>

          {/* Vertical progression */}
          <div className="relative flex flex-col items-center gap-0">
            {/* Progress bar line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 origin-top"
              style={{
                background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
              }}
            />

            {floors.map((f, i) => (
              <motion.button
                key={f.floor}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                onClick={() => scrollTo(f.section)}
                className="relative flex items-center gap-4 py-4 group cursor-pointer"
              >
                {/* Node dot */}
                <div className="relative z-10">
                  <div className={`w-4 h-4 rounded-full border-2 border-current ${f.color} bg-background group-hover:scale-125 transition-transform`} />
                  <div className={`absolute inset-0 rounded-full ${f.color} opacity-0 group-hover:opacity-40 blur-md transition-opacity`} />
                </div>

                {/* Floor info */}
                <div className="text-left min-w-50 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3 group-hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-heading text-[10px] tracking-wider text-muted-foreground">
                      FLOOR {f.floor}
                    </span>
                    <span className={`font-heading text-[10px] font-black px-1.5 py-0.5 rounded ${f.color} bg-muted`}>
                      {f.rank}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-sm text-foreground">{f.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Rank system legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex gap-3"
          >
            {["F", "E", "D", "C", "B", "A", "S", "SS", "SSS"].map((rank, i) => (
              <span
                key={rank}
                className={`font-heading text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  i >= 7 ? "text-accent bg-accent/10" : i >= 5 ? "text-primary bg-primary/10" : "text-muted-foreground bg-muted/50"
                }`}
              >
                {rank}
              </span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
