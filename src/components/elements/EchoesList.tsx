import { Echo } from "@/types/echo.type";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MessageSquare } from "lucide-react";

interface EchoesListProps {
    loading: boolean;
    echoes: Echo[];
}

const rankColor = (rank: string) => {
    if (["SSS", "SS"].includes(rank)) return "text-accent";
    if (["S", "A"].includes(rank)) return "text-primary";
    if (rank === "B") return "text-secondary";
    return "text-muted-foreground";
};

export default function EchoesList({ loading, echoes }: EchoesListProps) {
    return (
        <div className="space-y-3">
            {loading ? (
                <div className="text-center py-10">
                    <Loader2 className="w-20 h-20 animate-spin text-muted-foreground mx-auto" />
                </div>
            ) : echoes.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground font-body text-sm">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    No echoes yet. Be the first to leave your mark.
                </div>
            ) : (
                <AnimatePresence>
                    {echoes.map((echo, i) => (
                        <motion.div
                            key={echo.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="relative bg-card/70 border border-border rounded-lg p-4 group hover:border-secondary/30 transition-all"
                        >
                            {/* System log style header */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`font-heading text-[10px] font-black px-1.5 py-0.5 rounded ${rankColor(echo.rank)} bg-muted`}
                                    >
                                        {echo.rank}
                                    </span>
                                    <span className="font-heading text-xs font-bold text-foreground">
                                        {echo.name}
                                    </span>
                                    <span className="text-muted-foreground/40 text-[10px]">
                                        |
                                    </span>
                                    <span className="font-heading text-[10px] text-muted-foreground">
                                        Floor {echo.floor}
                                    </span>
                                </div>
                                <span className="font-heading text-[9px] text-muted-foreground/50">
                                    {new Date(
                                        echo.created_at,
                                    ).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Title */}
                            <div className="font-heading text-[9px] tracking-wider uppercase text-secondary/60 mb-1">
                                「 {echo.title} 」
                            </div>

                            {/* Message */}
                            <p className="font-body text-sm text-foreground/80">
                                {echo.message}
                            </p>

                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-lg bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
}
