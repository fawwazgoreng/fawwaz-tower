import { motion } from "framer-motion";
import { useState , useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { Echo } from "@/types/echo.type";
import { GetAllEchoes } from "@/integrations/supabase/echoes";
import EchoesList from "../elements/EchoesList";

export default function EchoesSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [echoes, setEchoes] = useState<Echo[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchEchoes = async () => {
            const data = await GetAllEchoes();
            if (data) setEchoes(data);
            setLoading(false);
        };
        if (!loading) {
            fetchEchoes();
        }
    })
    
    return (
        <section className="relative py-20 md:py-28 bg-card/20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="font-heading text-xs tracking-[0.3em] uppercase text-secondary">
                        Echoes
                    </span>
                    <h2 className="font-heading font-black text-3xl md:text-4xl mt-2 text-foreground">
                        Echoes of the{" "}
                        <span className="text-glow-purple">Tower</span>
                    </h2>
                    <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto text-sm">
                        Leave your mark. Each echo resonates through the floors
                        forever.
                    </p>
                </motion.div>
                <EchoesList echoes={echoes} loading={loading} />
            </div>
        </section>
    );
}
