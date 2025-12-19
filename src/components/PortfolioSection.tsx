import { motion } from "framer-motion";
import { fadeUpStagger, scaleOnPress } from "@/lib/motion";
import { useState } from "react";
import { projects, categories, Category } from "@/data/projects";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Alle");

  const filteredProjects =
    selectedCategory === "Alle"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Artboard_52.png')",
            filter: "blur(10px) brightness(0.15) grayscale(0.3)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/92 to-brand-black/90" />
      </div>

      <div className="container-custom relative z-10">
        <motion.p {...fadeUpStagger} className="smallcaps text-center text-brand-white/55">
          Chapter 03
        </motion.p>
        <motion.h2 {...fadeUpStagger} className="text-center mb-4 mt-4">
          Selected work — proof in frames
        </motion.h2>
        <motion.p
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
          className="text-center text-brand-white/60 mb-12"
        >
          Visual-first outcomes across video, campaigns, design, AI, and music — built to perform, not just impress.
        </motion.p>

        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              {...scaleOnPress}
              onClick={() => setSelectedCategory(category)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.05,
              }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-brand-red text-brand-white shadow-lg shadow-brand-red/20"
                  : "bg-brand-white/5 text-brand-white/60 hover:bg-brand-white/10 hover:text-brand-white border border-brand-white/10"
              }`}
              aria-label={`Filter by ${category}`}
            >
              <small>{category}</small>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-brand-white/40 py-16"
          >
            Ingen prosjekter funnet i denne kategorien
          </motion.p>
        )}
      </div>
    </section>
  );
}