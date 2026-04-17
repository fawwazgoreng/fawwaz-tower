import { motion } from "framer-motion";
import {
    ChevronDown,
    Star,
    Swords,
    Heart,
    Zap,
    Shield,
    Eye,
} from "lucide-react";
import { Particles } from "./Particles";

const bioStats = [
    { label: "STR", value: 88, icon: Swords, color: "text-destructive" },
    { label: "INT", value: 95, icon: Eye, color: "text-primary" },
    { label: "VIT", value: 72, icon: Heart, color: "text-destructive" },
    { label: "AGI", value: 85, icon: Zap, color: "text-accent" },
    { label: "DEF", value: 78, icon: Shield, color: "text-secondary" },
];

const StatusWindow = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className="relative w-full max-w-sm mx-auto mt-8"
    >
        {/* System window outer glow */}
        <div className="absolute -inset-1 rounded-lg bg-linear-to-b from-primary/30 via-primary/10 to-primary/30 blur-sm" />

        {/* Window */}
        <div className="relative bg-card/90 backdrop-blur-md border border-primary/40 rounded-lg overflow-hidden">
            {/* Title bar — manhwa system style */}
            <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                    <span className="font-heading text-[10px] tracking-[0.25em] uppercase text-primary font-bold">
                        ⟨ Player Status ⟩
                    </span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Name & Class */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-heading font-black text-lg text-foreground tracking-wide">
                            Fawwaz
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-heading text-[10px] tracking-wider uppercase text-glow-gold">
                                ★ SSR Rank
                            </span>
                            <span className="text-muted-foreground/40">|</span>
                            <span className="font-heading text-[10px] tracking-wider uppercase text-muted-foreground">
                                Lv. ???
                            </span>
                        </div>
                    </div>
                    <div className="flex">
                        {[1, 2, 3, 4, 5, 6].map((s) => (
                            <Star
                                key={s}
                                className="w-3 h-3 text-accent fill-accent"
                            />
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

                {/* Bio info rows */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                    {[
                        { label: "Class", value: "Full-Stack Developer" },
                        { label: "Guild", value: "Freelancer" },
                        { label: "Region", value: "Indonesia" },
                        { label: "Element", value: "Code" },
                        { label: "Weapon", value: "React + TypeScript" },
                        { label: "Title", value: "The Eternal Scholar" },
                    ].map((row) => (
                        <div key={row.label} className="flex gap-1.5">
                            <span className="font-heading text-muted-foreground/60 uppercase tracking-wider shrink-0">
                                {row.label}:
                            </span>
                            <span className="font-body text-foreground truncate">
                                {row.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

                {/* Stats bars */}
                <div className="space-y-2">
                    {bioStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="flex items-center gap-2"
                            >
                                <Icon
                                    className={`w-3 h-3 ${stat.color} shrink-0`}
                                />
                                <span className="font-heading text-[10px] w-7 text-muted-foreground uppercase">
                                    {stat.label}
                                </span>
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stat.value}%` }}
                                        transition={{
                                            duration: 1.2,
                                            delay:
                                                1 +
                                                bioStats.indexOf(stat) * 0.15,
                                            ease: "easeOut",
                                        }}
                                        className="h-full rounded-full bg-linear-to-r from-primary/80 to-primary relative"
                                    />
                                </div>
                                <span className="font-heading text-[10px] text-muted-foreground w-6 text-right">
                                    {stat.value}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* HP / MP bars */}
                <div className="space-y-1.5 pt-1">
                    <div>
                        <div className="flex justify-between mb-0.5">
                            <span className="font-heading text-[9px] tracking-wider uppercase text-destructive">
                                HP
                            </span>
                            <span className="font-heading text-[9px] text-muted-foreground">
                                ???? / ????
                            </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden border border-destructive/20">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 1.2 }}
                                className="h-full rounded-full bg-linear-to-r from-destructive/80 to-destructive"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-0.5">
                            <span className="font-heading text-[9px] tracking-wider uppercase text-primary">
                                MP
                            </span>
                            <span className="font-heading text-[9px] text-muted-foreground">
                                8500 / 9000
                            </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden border border-primary/20">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "94%" }}
                                transition={{ duration: 1.5, delay: 1.4 }}
                                className="h-full rounded-full bg-linear-to-r from-primary/80 to-primary"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom system text */}
            <div className="px-4 py-2 bg-primary/5 border-t border-primary/20">
                <p className="font-heading text-[9px] tracking-wider text-primary/60 text-center uppercase">
                    ⟨ System Notice: This player has reached the top floor ⟩
                </p>
            </div>
        </div>
    </motion.div>
);

export const HeroSection = () => {
    return (
        <section
            id="creator"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-dark dark:bg-hero-dark"
        >
            <div className="absolute inset-0 bg-hero-light dark:bg-hero-dark" />

            <div className="absolute inset-0 opacity-10 dark:opacity-20">
                <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-40 md:w-64 h-[120%] bg-linear-to-t from-muted/50 via-muted/20 to-transparent"
                    style={{
                        clipPath: "polygon(35% 100%, 45% 0%, 55% 0%, 65% 100%)",
                    }}
                />
            </div>

            <Particles count={40} />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-linear-to-b from-primary/20 via-transparent to-transparent" />
                <div className="absolute top-0 left-[40%] w-px h-[60%] bg-linear-to-b from-secondary/10 to-transparent rotate-3" />
                <div className="absolute top-0 left-[60%] w-px h-[60%] bg-linear-to-b from-secondary/10 to-transparent -rotate-3" />
            </div>

            <div className="relative w-full bg-transparent flex flex-col items-center z-10 text-center px-4 py-20 gap-8">
                <div className="flex flex-col items-center gap-4">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="font-heading font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight text-foreground"
                    >
                        <span className="text-glow-cyan">The</span>{" "}
                        <span className="text-glow-purple">Creator</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="font-body text-base md:text-lg text-muted-foreground max-w-xl"
                    >
                        Summoning Ideas into Reality —{" "}
                        <span className="text-glow-gold">Infinite Gacha</span>{" "}
                        Portfolio
                    </motion.p>

                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        onClick={() =>
                            document
                                .getElementById("journey")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/50 bg-primary/10 text-primary font-heading font-semibold tracking-wider uppercase text-sm hover:bg-primary/20 hover:box-glow-cyan transition-all duration-300 group"
                    >
                        Enter the Tower
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </motion.button>
                </div>

                <div className="flex lg:flex-row-reverse flex-col items-center justify-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="relative w-48 h-72 md:w-56 md:h-80 xl:w-64 xl:h-100 group perspective-midrange"
                    >
                        {/* Glow Effects */}
                        <div className="absolute -inset-4 rounded-2xl bg-linear-to-b from-accent/20 via-secondary/15 to-primary/20 blur-xl animate-pulse-glow opacity-60" />
                        <div className="absolute -inset-2 rounded-xl bg-linear-to-b from-accent/30 via-secondary/10 to-primary/30 blur-sm" />

                        {/* Main Card Container */}
                        <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-accent/50 bg-card shadow-[0_0_30px_-5px_hsl(var(--accent)/0.3)]">
                            {/* Top Ornament */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-accent/20 to-transparent z-10">
                                <div className="absolute top-1 left-1/2 -translate-x-1/2">
                                    <div className="w-6 h-6 border border-accent/40 rotate-45 bg-card flex items-center justify-center">
                                        <div className="w-2 h-2 bg-accent/60 rotate-45" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Lines */}
                            <div className="absolute top-10 bottom-16 left-1 w-px bg-linear-to-b from-transparent via-accent/30 to-transparent" />
                            <div className="absolute top-10 bottom-16 right-1 w-px bg-linear-to-b from-transparent via-accent/30 to-transparent" />
                            <div className="absolute top-10 bottom-16 left-2.5 w-px bg-linear-to-b from-transparent via-primary/20 to-transparent" />
                            <div className="absolute top-10 bottom-16 right-2.5 w-px bg-linear-to-b from-transparent via-primary/20 to-transparent" />

                            {/* Avatar Section */}
                            <div className="absolute inset-3 rounded-lg bg-linear-to-b from-muted/80 via-background to-muted/60 flex items-center justify-center overflow-hidden">
                                <div className="relative flex flex-col items-center justify-center h-full w-full">
                                    <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-secondary/10" />
                                    <div
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 md:w-28 h-32 md:h-44 bg-linear-to-t from-accent/5 to-transparent"
                                        style={{
                                            clipPath:
                                                "polygon(30% 100%, 10% 30%, 40% 0%, 60% 0%, 90% 30%, 70% 100%)",
                                        }}
                                    />
                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-linear-to-b from-foreground/20 to-foreground/10 border border-foreground/10" />
                                        <div
                                            className="w-16 h-20 md:w-20 md:h-28 bg-linear-to-b from-foreground/15 to-foreground/5 rounded-t-lg"
                                            style={{
                                                clipPath:
                                                    "polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%)",
                                            }}
                                        />
                                        <div className="absolute top-6 md:top-8 -right-1 md:right-0 w-1 h-16 md:h-24 bg-linear-to-b from-accent/40 via-accent/20 to-transparent rotate-12 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-card via-card/95 to-transparent pt-6 pb-2 px-3">
                                <div className="flex justify-center gap-0.5 mb-1">
                                    {[1, 2, 3, 4, 5, 6].map((s) => (
                                        <Star
                                            key={s}
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent fill-accent drop-shadow-[0_0_3px_hsl(var(--accent)/0.6)]"
                                        />
                                    ))}
                                </div>
                                <p className="font-heading font-black text-xs md:text-sm tracking-[0.2em] uppercase text-foreground text-center">
                                    Fawwaz
                                </p>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-accent/50" />
                            <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-accent/50" />
                            <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-accent/50" />
                            <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-accent/50" />
                        </div>

                        {/* Floating Particles */}
                        <div className="absolute -top-2 left-1/4 w-1 h-1 rounded-full bg-accent animate-float opacity-60" />
                        <div
                            className="absolute -top-4 right-1/3 w-1.5 h-1.5 rounded-full bg-primary animate-float opacity-40"
                            style={{ animationDelay: "1s" }}
                        />
                        <div
                            className="absolute -bottom-2 left-1/3 w-1 h-1 rounded-full bg-secondary animate-float opacity-50"
                            style={{ animationDelay: "2s" }}
                        />
                    </motion.div>
                    
                    <div className="w-full lg:w-auto flex justify-center">
                        <StatusWindow />
                    </div>

                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
        </section>
    );
};
