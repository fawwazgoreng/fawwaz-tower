import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sword, Shield, Flame } from "lucide-react";

const timeline = [
    {
        year: "Chapter 1",
        title: "The Awakening",
        desc: "Discovered the world of code and design. First steps into the digital realm.",
        icon: Sword,
        color: "text-primary",
    },
    {
        year: "Chapter 2",
        title: "The Grind",
        desc: "Leveled up through countless projects, late nights, and relentless learning.",
        icon: Shield,
        color: "text-secondary",
    },
    {
        year: "Chapter 3",
        title: "The Breakthrough",
        desc: "Conquered major challenges and built projects that made an impact.",
        icon: Flame,
        color: "text-destructive",
    },
];

const TimelineCard = ({
    item,
    index,
}: {
    item: (typeof timeline)[0];
    index: number;
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = item.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`flex items-start gap-4 md:gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
        >
            <div className="flex-1 bg-card border border-border rounded-lg p-5 md:p-6 hover:box-glow-cyan transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <span className="font-heading text-xs tracking-widest uppercase text-primary">
                        {item.year}
                    </span>
                    <h3 className="font-heading font-bold text-lg mt-1 text-foreground">
                        {item.title}
                    </h3>
                    <p className="font-body text-muted-foreground mt-2 text-sm">
                        {item.desc}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div
                    className={`w-10 h-10 rounded-full border-2 border-border bg-card flex items-center justify-center ${item.color}`}
                >
                    <Icon className="w-4 h-4" />
                </div>
                {index < timeline.length - 1 && (
                    <div className="w-px h-16 bg-border" />
                )}
            </div>
            <div className="flex-1 hidden md:block" />
        </motion.div>
    );
};

export const JourneySection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="journey" className="relative py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-heading text-xs tracking-[0.3em] uppercase text-secondary">
                        Floor 2
                    </span>
                    <h2 className="font-heading font-black text-3xl md:text-5xl mt-2 text-foreground">
                        The <span className="text-glow-purple">Journey</span>
                    </h2>
                    <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto">
                        Every great adventurer has an origin story. Here is
                        mine.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {timeline.map((item, i) => (
                        <TimelineCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};
