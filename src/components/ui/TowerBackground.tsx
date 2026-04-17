import { motion } from "framer-motion";

export const TowerBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Central tower silhouette */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 md:w-48 lg:w-56 h-[140%] opacity-[0.04] dark:opacity-[0.08]"
        style={{
          background: "linear-gradient(to top, hsl(var(--muted-foreground) / 0.5), hsl(var(--muted-foreground) / 0.1), transparent 80%)",
          clipPath: "polygon(38% 100%, 44% 10%, 46% 3%, 50% 0%, 54% 3%, 56% 10%, 62% 100%)",
        }}
      />

      {/* Tower window lights */}
      {[15, 25, 38, 52, 66, 78].map((bottom, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: `${bottom}%` }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7 }}
        >
          <div className="w-1 h-2 md:w-1.5 md:h-3 bg-primary/20 dark:bg-primary/30 rounded-full blur-[1px]" />
        </motion.div>
      ))}

      {/* Floating runes/particles along tower */}
      {[20, 40, 60, 80].map((bottom, i) => (
        <motion.div
          key={`rune-${i}`}
          className="absolute"
          style={{
            left: `calc(50% + ${(i % 2 === 0 ? -1 : 1) * (30 + i * 8)}px)`,
            bottom: `${bottom}%`,
          }}
          animate={{
            y: [-5, 5, -5],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 4 + i, repeat: Infinity }}
        >
          <div className="w-1 h-1 rounded-full bg-secondary/30 dark:bg-secondary/40 blur-[2px]" />
        </motion.div>
      ))}

      {/* Subtle spiral galaxy overlay at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 opacity-[0.02] dark:opacity-[0.05] rounded-full"
        style={{
          background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.2), transparent, hsl(var(--primary) / 0.3))",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
};
