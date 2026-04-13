import { useEffect, useState } from "react";
import { motion , AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Menu , X } from "lucide-react";

const links = [
    { id: "creator", floor: 100, label: "The Creator", color: "text-primary" },
    { id: "journey", floor: 75, label: "The Journey", color: "text-secondary" },
    { id: "creation", floor: 50, label: "The Creation", color: "text-primary" },
    { id: "ascent", floor: 25, label: "The Ascent", color: "text-accent" },
    { id: "portal", floor: 0, label: "The Portal", color: "text-destructive" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeFloor, setActiveFloor] = useState("creator");
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY + window.innerHeight / 3;
            for (let i = links.length - 1; i >= 0; i--) {
                const el = document.getElementById(links[i].id);
                if (el && el.offsetTop <= scrollY) {
                    setActiveFloor(links[i].id);
                    break;
                }
            }
            
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
    };
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
              <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <button onClick={() => scrollTo("creator")} className="flex items-center gap-2 group">
                  <div className="w-9 h-9 rounded-full gradient-portal animate-spin-slow flex items-center justify-center">
                    <span className="font-heading font-black text-sm text-primary-foreground dark:text-foreground">PM</span>
                  </div>
                  <span className="font-heading font-bold text-sm tracking-wider text-foreground hidden sm:block">
                    PICK ME UP
                  </span>
                </button>
        
                {/* Desktop links with floor indicators */}
                <div className="hidden md:flex items-center gap-1">
                  {links.map((l) => {
                    const isActive = activeFloor === l.id;
                    return (
                      <button
                        key={l.id}
                        onClick={() => scrollTo(l.id)}
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-heading text-xs tracking-widest uppercase transition-all duration-300 ${
                          isActive
                            ? "text-foreground bg-muted/60"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        <span className={`text-[10px] font-black ${isActive ? l.color : "text-muted-foreground/50"} transition-colors`}>
                          {l.floor}
                        </span>
                        <span className="hidden lg:inline">{l.label}</span>
                        <span className="lg:hidden">{l.label.replace("The ", "")}</span>
                        {isActive && (
                          <motion.div
                            layoutId="nav-active"
                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
        
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
        
              {/* Mobile menu */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden overflow-hidden bg-card/95 backdrop-blur-md border-b border-border"
                  >
                    <div className="flex flex-col p-4 gap-1">
                      {links.map((l) => {
                        const isActive = activeFloor === l.id;
                        return (
                          <button
                            key={l.id}
                            onClick={() => scrollTo(l.id)}
                            className={`flex items-center gap-3 font-heading text-sm tracking-widest uppercase py-2.5 px-3 rounded-lg text-left transition-all ${
                              isActive
                                ? "text-foreground bg-muted/60"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            <span className={`text-xs font-black ${isActive ? l.color : "text-muted-foreground/50"}`}>
                              {l.floor}
                            </span>
                            {l.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
    );
}
