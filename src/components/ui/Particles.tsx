import { useEffect, useRef } from "react";

export const Particles = ({ count = 30 }: { count?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const container = ref.current;
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement("div");
            const size = Math.random() * 4 + 1; 
            particle.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              background: hsl(187 100% 50% / ${Math.random() * 0.6 + 0.2});
              border-radius: 50%;
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
              animation-delay: ${Math.random() * 5}s;
              pointer-events: none;
            `;
            container.appendChild(particle);
        }
    })
    return <div ref={ref}></div>
};