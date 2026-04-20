import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Sparkles , Code2} from "lucide-react";
import FawwazTowerLogo from "@/assets/fawwaz-tower.png";

const projects = [
  {
    title: "Fawwaz-tower",
    desc: "A cinematic dark fantasy portfolio inspired by Pick Me Up: Infinite Gacha",
    tags: ["React", "TypeScript"],
    color: "from-primary/20 to-secondary/20",
    image: FawwazTowerLogo,
    demo: "https://github.com/fawwazgoreng/fawwaz-tower",
    github: "https://github.com/fawwazgoreng/fawwaz-tower",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:box-glow-purple transition-all duration-500"
    >
      {/* Project image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />

        {/* Sparkle on hover */}
        {hover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3"
          >
            <Sparkles className="w-5 h-5 text-accent animate-pulse-glow" />
          </motion.div>
        )}

        {/* Links overlay */}
        <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-xs font-heading text-primary hover:box-glow-cyan transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
            Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-xs font-heading text-foreground hover:text-primary hover:box-glow-cyan transition-all"
            onClick={(e) => e.stopPropagation()}
                  >
                <Code2 className="w-3 h-3"/>
            Code
          </a>
        </div>
      </div>

      {/* Top linear bar */}
      <div className={`h-1 w-full bg-linear-to-r ${project.color}`} />

      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-1.5 line-clamp-2">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-heading px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const CreationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="creation" className="relative py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary">Floor 3</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl mt-2 text-foreground">
            The <span className="text-glow-cyan">Creation</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto">
            Artifacts forged through code, design, and relentless iteration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
