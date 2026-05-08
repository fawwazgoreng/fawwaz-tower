import { motion } from "framer-motion";
import { useState , useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { Echo } from "@/types/echo.type";
import { GetAllEchoes } from "@/integrations/supabase/echoes";
import EchoesList from "../elements/EchoesList";
import { Loader2, LogIn, LogOut, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { signInWithOauth } from "@/integrations/supabase/auth";
import { User } from "@supabase/supabase-js";

const RANKS = ["F", "E", "D", "C", "B", "A", "S", "SS", "SSS"];

const floorTitle = (floor: number) => {
  if (floor >= 90) return "Tower Sovereign";
  if (floor >= 75) return "Floor 75 Survivor";
  if (floor >= 50) return "Ascension Seeker";
  if (floor >= 25) return "Dungeon Walker";
  return "Gate Wanderer";
};

export default function EchoesSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [echoes, setEchoes] = useState<Echo[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");
    const [floor, setFloor] = useState(50);
    const [rank, setRank] = useState("B");
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const name = (session.user.user_metadata)?.full_name || (session.user.user_metadata)?.name || session.user.email?.split("@")[0] || "Adventurer";
          setAuthor(name);
        } else {
          setAuthor("");
        }
      });
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const name = (session.user.user_metadata)?.full_name || (session.user.user_metadata)?.name || session.user.email?.split("@")[0] || "Adventurer";
          setAuthor(name);
        }
      });
  
      const fetchEchoes = async () => {
        const data = await GetAllEchoes();
        if (data) setEchoes(data as Echo[]);
        setLoading(false);
      };
        fetchEchoes();
  
      const channel = (supabase)
        .channel("echoes-realtime")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "echoes" }, (payload) => {
          setEchoes((prev) => [payload.new as unknown as Echo, ...prev].slice(0, 20));
        })
        .subscribe();
  
      return () => { supabase.removeChannel(channel); sub.subscription.unsubscribe(); };
    }, []);
  
    const signIn = async () => {
      await signInWithOauth("google");
    };
  
    const signOut = async () => {
      await signOut();
    };
    
    const submit = async (e: React.SubmitEvent) => {
      e.preventDefault();
      if (!user || !message.trim() || !author.trim()) return;
      setSubmitting(true);
  
      const title = floorTitle(floor);
      await (supabase).from("echoes").insert([{ message, author, floor, rank, title }]);
  
      setMessage("");
      setSubmitting(false);
    };
    
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
                <motion.form
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          onSubmit={submit}
                          className="relative mb-10"
                        >
                          <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-secondary/20 via-primary/10 to-secondary/20 blur-sm" />
                          <div className="relative bg-card/90 backdrop-blur-sm border border-secondary/30 rounded-xl p-5 space-y-4">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-glow" />
                                <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-secondary/80">
                                  ⟨ New Ascension Log ⟩
                                </span>
                              </div>
                              {user ? (
                                <button type="button" onClick={signOut} className="flex items-center gap-1 text-[10px] font-heading uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                                  <LogOut className="w-3 h-3" /> Sign out
                                </button>
                              ) : (
                                <button type="button" onClick={signIn} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-[10px] font-heading uppercase tracking-wider text-primary hover:bg-primary/20 transition-all">
                                  <LogIn className="w-3 h-3" /> Sign in with Google
                                </button>
                              )}
                            </div>
                
                            {!user && (
                              <div className="text-[11px] font-body text-muted-foreground/70 italic border-l-2 border-secondary/40 pl-3">
                                ⟨ System ⟩ Authenticate to leave your echo in the tower.
                              </div>
                            )}
                
                            <fieldset disabled={!user} className="space-y-4 disabled:opacity-50 disabled:cursor-not-allowed">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                  value={author}
                                  onChange={(e) => setAuthor(e.target.value)}
                                  placeholder="Adventurer Name..."
                                  required
                                  className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all disabled:cursor-not-allowed"
                                />
                                <div className="flex gap-2">
                                  <select
                                    value={rank}
                                    onChange={(e) => setRank(e.target.value)}
                                    className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-heading text-xs focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:cursor-not-allowed"
                                  >
                                    {RANKS.map((r) => (
                                      <option key={r} value={r}>Rank {r}</option>
                                    ))}
                                  </select>
                                  <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={floor}
                                    onChange={(e) => setFloor(Number(e.target.value))}
                                    className="w-20 px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-heading text-xs text-center focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:cursor-not-allowed"
                                    placeholder="Floor"
                                  />
                                </div>
                              </div>
                
                              <div className="flex gap-2">
                                <input
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  placeholder={user ? "Leave your echo in the tower..." : "Sign in to leave an echo..."}
                                  required
                                  className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all disabled:cursor-not-allowed"
                                />
                                <button
                                  type="submit"
                                  disabled={submitting || !message.trim() || !user}
                                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-heading text-xs font-bold tracking-wider uppercase hover:box-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                              </div>
                            </fieldset>
                          </div>
                        </motion.form>
                <EchoesList echoes={echoes} loading={loading} />
            </div>
        </section>
    );
}
