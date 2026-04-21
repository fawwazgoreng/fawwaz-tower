import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Zap,
    Code2,
    Database,
    Globe,
    Shield,
    Star,
    Flame,
    Sword,
    ShieldCheck,
} from "lucide-react";

type SkillRarity = "SSR" | "SR" | "S" | "A" | "B" | "C" | "D";

interface Skill {
    name: string;
    level: number;
    icon: typeof Code2;
    rarity: SkillRarity;
    element: string;
    desc: string;
}

const rarityConfig: Record<
    SkillRarity,
    { border: string; bg: string; badge: string; glow: string; stars: number }
> = {
    SSR: {
        border: "border-accent/60",
        bg: "from-accent/10 via-card to-accent/5",
        badge: "bg-accent text-accent-foreground",
        glow: "box-glow-gold",
        stars: 5,
    },
    SR: {
        border: "border-secondary/60",
        bg: "from-secondary/10 via-card to-secondary/5",
        badge: "bg-secondary text-secondary-foreground",
        glow: "box-glow-purple",
        stars: 4,
    },
    S: {
        border: "border-primary/60",
        bg: "from-primary/10 via-card to-primary/5",
        badge: "bg-primary text-primary-foreground",
        glow: "box-glow-cyan",
        stars: 3,
    },
    A: {
        border: "border-destructive/40",
        bg: "from-destructive/10 via-card to-destructive/5",
        badge: "bg-destructive text-destructive-foreground",
        glow: "",
        stars: 2,
    },
    B: {
        border: "border-secondary/40",
        bg: "from-secondary/10 via-card to-secondary/5",
        badge: "bg-secondary text-secondary-foreground",
        glow: "",
        stars: 1,
    },
    C: {
        border: "border-primary/40",
        bg: "from-primary/10 via-card to-primary/5",
        badge: "bg-primary text-primary-foreground",
        glow: "box-glow-cyan",
        stars: 3,
    },
    D: {
        border: "border-secondary/40",
        bg: "from-secondary/10 via-card to-secondary/5",
        badge: "bg-secondary text-secondary-foreground",
        glow: "",
        stars: 1,
    },
};

const skills: Skill[] = [
    {
        name: "Frontend Mastery",
        level: 80,
        icon: Code2,
        rarity: "SR",
        element: "⚡ Lightning",
        desc: "React, TypeScript, Next.js — unstoppable combo attacks",
    },
    {
        name: "Backend Arts",
        level: 60,
        icon: Database,
        rarity: "S",
        element: "🌑 Shadow",
        desc: "Node.js, APIs — the hidden power behind the scenes",
    },
    {
        name: "Performance Burst",
        level: 70,
        icon: Zap,
        rarity: "S",
        element: "⚡ Lightning",
        desc: "Optimizing speed like a boss with 0.1s load times",
    },
    {
        name: "DevOps Deploy",
        level: 10,
        icon: Globe,
        rarity: "D",
        element: "🌍 Earth",
        desc: "CI/CD pipelines, Docker, cloud infrastructure mastery",
    },
    {
        name: "Security Ward",
        level: 50,
        icon: Shield,
        rarity: "A",
        element: "🛡️ Holy",
        desc: "Auth, encryption, vulnerability patching — tower defense",
    },
];

const stats = [
    {
        label: "Dungeons Cleared",
        value: "5+",
        sub: "Projects completed",
        icon: Sword,
    },
    {
        label: "EXP Gained",
        value: "1Y+",
        sub: "Years of grinding",
        icon: Flame,
    },
    {
        label: "Power Level",
        value: "SSR",
        sub: "Current rank",
        icon: Star,
    },
    {
        label: "Inner Citadel",
        value: "UNSHAKEN",
        sub: "Logic-driven focus",
        icon: ShieldCheck,
    },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const Icon = skill.icon;
    const config = rarityConfig[skill.rarity];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, rotateY: -10 }}
            animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative bg-linear-to-b ${config.bg} border ${config.border} rounded-xl overflow-hidden hover:${config.glow} transition-all duration-500 cursor-default`}
        >
            {/* Rarity stripe */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-current to-transparent opacity-60" />

            {/* Rarity badge */}
            <div className="absolute top-3 right-3 z-10">
                <span
                    className={`font-heading text-[10px] font-black px-2 py-0.5 rounded ${config.badge} tracking-wider`}
                >
                    {skill.rarity}
                </span>
            </div>

            <div className="p-5 relative">
                {/* Icon + Level */}
                <div className="flex items-start gap-3 mb-3">
                    <div
                        className={`w-10 h-10 rounded-lg border ${config.border} bg-card flex items-center justify-center`}
                    >
                        <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-sm text-foreground leading-tight">
                            {skill.name}
                        </h3>
                        <span className="font-heading text-[10px] text-muted-foreground">
                            {skill.element}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-2">
                    {skill.desc}
                </p>

                {/* Level bar */}
                <div className="mb-2">
                    <div className="flex justify-between mb-1">
                        <span className="font-heading text-[10px] tracking-wider uppercase text-muted-foreground">
                            Power
                        </span>
                        <span className="font-heading text-[10px] text-foreground font-bold">
                            Lv.{skill.level}
                        </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden border border-border">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{
                                duration: 1.2,
                                delay: index * 0.1 + 0.5,
                                ease: "easeOut",
                            }}
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                                background: `linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary)))`,
                            }}
                        >
                            {/* Shimmer */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-size[length:200%_100%]" />
                        </motion.div>
                    </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 ${
                                i < config.stars
                                    ? "text-accent fill-accent"
                                    : "text-muted-foreground/20"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Hover glow overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

export const AscentSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="ascent" className="relative py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-heading text-xs tracking-[0.3em] uppercase text-accent">
                        Floor 4
                    </span>
                    <h2 className="font-heading font-black text-3xl md:text-5xl mt-2 text-foreground">
                        The <span className="text-glow-gold">Ascent</span>
                    </h2>
                    <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto">
                        Skills acquired through countless battles. Each one a
                        hard-earned ability.
                    </p>
                </motion.div>

                {/* Stats — system window style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mb-16"
                >
                    <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 blur-sm" />
                    <div className="relative bg-card/90 backdrop-blur-sm border border-primary/30 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border-b border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                            <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-primary/80">
                                ⟨ Achievement Log ⟩
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={inView ? { opacity: 1 } : {}}
                                        transition={{
                                            duration: 0.5,
                                            delay: i * 0.1 + 0.3,
                                        }}
                                        className="bg-card p-4 md:p-5 text-center group hover:bg-muted/30 transition-colors"
                                    >
                                        <Icon className="w-4 h-4 mx-auto mb-2 text-muted-foreground group-hover:text-accent transition-colors" />
                                        <div className="font-heading font-black text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors">
                                            {stat.value}
                                        </div>
                                        <div className="font-heading text-[10px] tracking-wider uppercase text-muted-foreground mt-0.5">
                                            {stat.label}
                                        </div>
                                        <div className="font-body text-[10px] text-muted-foreground/50 mt-0.5">
                                            {stat.sub}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Skill Cards — gacha card collection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill, i) => (
                        <SkillCard key={i} skill={skill} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};
