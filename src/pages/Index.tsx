import Navbar from "@/components/elements/Navbar";
import { TowerBackground } from "@/components/ui/TowerBackground";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { TowerMode } from "@/components/elements/TowerMode";
import Floor100_Creator from "@/components/sections/Floor100_Creator";

export default function LandingPage() {
    const [towerMode, setTowerMode] = useState(false);
    const handleClose = () => setTowerMode(false);
    return (
        <>
            <TowerBackground />
            <Navbar />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTowerMode(true)}
              className="fixed top-20 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-card/90 border border-primary/40 backdrop-blur-sm font-heading text-xs tracking-wider uppercase text-primary hover:box-glow-cyan transition-all shadow-lg"
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Tower Mode</span>
            </motion.button>
            <TowerMode active={towerMode} onClose={handleClose} />
            <motion.div
                animate={towerMode ? {opacity: 1, scale: 1} : {opacity: 1, scale: 0.95}}
            >
            <Floor100_Creator />
            </motion.div>
        </>
    );
}
