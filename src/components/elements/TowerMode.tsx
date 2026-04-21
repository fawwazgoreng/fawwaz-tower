import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TowerModeProps {
  active: boolean;
  onClose: () => void;
}

const floors = [
  { floor: 100, label: "The Creator",  section: "creator",  stars: 6, color: "text-primary",   dotColor: "hsl(var(--primary))"   },
  { floor: 75,  label: "The Journey",  section: "journey",  stars: 5, color: "text-secondary",  dotColor: "hsl(var(--secondary))" },
  { floor: 50,  label: "The Creation", section: "creation", stars: 4, color: "text-accent",     dotColor: "hsl(var(--accent))"    },
  { floor: 25,  label: "The Ascent",   section: "ascent",   stars: 2, color: "text-muted-foreground", dotColor: "hsl(var(--muted-foreground))" },
  { floor: 0,   label: "The Portal",   section: "portal",   stars: 1, color: "text-destructive", dotColor: "hsl(var(--destructive))" },
];

// widths & heights for the pyramid tower blocks (index 0 = top/Floor 100)
const towerWidths = ["md:w-20 w-14", "md:w-28 w-20", "md:w-36 w-28", "md:w-44 w-36", "md:w-52 w-44"];
const towerHeights = ["h-12",  "h-14",  "h-16", "h-18", "h-20"];

const StarRank = ({ count, className }: { count: number; className?: string }) => (
  <span className={className}>{"★".repeat(count)}</span>
);

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
          {/* Close */}
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
            className="text-center mb-10"
          >
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase text-primary/60">
              ⟨ Tower Progression System ⟩
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground mt-2">
              Tower <span className="text-glow-cyan">Map</span>
            </h2>
          </motion.div>

          {/* Main Layout: Tower Visual + Connector + Floor List */}
          <div className="flex items-center gap-10 md:gap-14">

            {/* Tower Visual (pyramid) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {floors.map((f, i) => (
                <button
                  key={f.floor}
                  onClick={() => scrollTo(f.section)}
                  className={`
                    relative group flex items-center justify-center
                    ${towerWidths[i]} ${towerHeights[i]}
                    -mt-px first:mt-0
                    border-l border-r border-t last:border-b
                    border-current/20
                    bg-linear-to-b from-muted/40 to-card
                    rounded-t-sm
                    first:rounded-t-md last:rounded-b-md
                    transition-all duration-300
                    hover:brightness-125
                    ${f.color}
                  `}
                >
                  <StarRank
                    count={f.stars}
                    className="text-[9px] tracking-[0.15em] opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
              {/* Glow base */}
              <div className="w-44 h-3 mt-1 rounded-full bg-primary/10 blur-lg" />
            </motion.div>

            {/* Connector line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="self-stretch w-px origin-top"
              style={{
                background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
              }}
            />

            {/* Floor List */}
            <div className="flex flex-col">
              {floors.map((f, i) => (
                <motion.button
                  key={f.floor}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.12 }}
                  onClick={() => scrollTo(f.section)}
                  className="relative flex items-center gap-3 px-3 py-3.5 rounded-lg group cursor-pointer hover:bg-muted/30 transition-all"
                >
                  {/* Node dot */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 border-current ${f.color} bg-background group-hover:scale-125 transition-transform`}
                    />
                    <div
                      className={`absolute inset-0 rounded-full ${f.color} opacity-0 group-hover:opacity-40 blur-sm transition-opacity`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-0.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-heading md:text-[12px] text-[9px] tracking-wider text-muted-foreground uppercase">
                        Floor {f.floor}
                      </span>
                      <StarRank
                        count={f.stars}
                        className={`font-heading md:text-[12px] text-[9px] font-black px-1.5 py-0.5 rounded bg-muted ${f.color}`}
                      />
                    </div>
                    <span className="font-heading font-bold md:text-xl text-sm text-foreground">
                      {f.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Rank Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex gap-2 flex-wrap justify-center"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <span
                key={n}
                className={`font-heading text-[9px] font-bold px-2 py-0.5 rounded ${
                  n >= 6
                    ? "text-primary bg-primary/10"
                    : n >= 4
                    ? "text-secondary bg-secondary/10"
                    : n >= 2
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground bg-muted/50"
                }`}
              >
                {"★".repeat(n)}
              </span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};