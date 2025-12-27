import { motion } from "framer-motion";
import { portfolioCardHover } from "@/lib/motion";
import { Project } from "@/data/projects";
import { ExternalLink, Eye } from "lucide-react";
import React from "react";
import Image from "next/image";

interface PortfolioCardProps {
  project: Project;
  index: number;
}

const PortfolioCard = React.memo(function PortfolioCard({ project, index }: PortfolioCardProps) {
  const isSnapchatSerie = project.id === "snapchat-tv2-2021";

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      {...portfolioCardHover}
      className="group relative block rounded-lg bg-brand-white/5 border border-brand-white/10 hover:border-brand-red/50 transition-all duration-300"
    >
      {/* Wrapper without forced aspect/overflow so image can fully contain */}
      <div className="relative w-full aspect-video">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="fade-in-smooth object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          loading="lazy"
        />

        {isSnapchatSerie && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <Image
              src="/BROSLO_LOGO_BLACK.png"
              alt="BROSLO Logo"
              width={200}
              height={100}
              className="w-1/3 h-auto opacity-90 mix-blend-screen"
              loading="lazy"
            />
          </div>
        )}

        <motion.div
          className="absolute inset-0 bg-brand-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 text-brand-white">
            <ExternalLink size={24} />
            <span className="font-semibold"><small>Se prosjekt</small></span>
          </div>
        </motion.div>

        {project.views && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-brand-black/80 px-3 py-1.5 rounded-full text-brand-white/90">
            <Eye size={14} />
            <span><small>{project.views}</small></span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h5 className="font-semibold text-brand-white group-hover:text-brand-red transition-colors">
            {project.title}
          </h5>
          <span className="text-brand-white/40"><small>{project.year}</small></span>
        </div>

        <p className="text-brand-white/60 mb-3 line-clamp-2">
          <small>{project.description}</small>
        </p>

        <div className="flex items-center justify-between">
          <span className="font-medium text-brand-red/80 bg-brand-red/10 px-3 py-1 rounded-full">
            <small>{project.category}</small>
          </span>
          {project.client && (
            <span className="text-brand-white/40"><small>{project.client}</small></span>
          )}
        </div>
      </div>
    </motion.a>
  );
});

export default PortfolioCard;