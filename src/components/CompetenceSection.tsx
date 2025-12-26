import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";
import {
  Palette,
  Video,
  Smartphone,
  MessageSquare,
  Image,
  Sparkles,
  Film,
  Music,
  Figma,
  Code,
  TrendingUp,
  Lightbulb,
  Megaphone,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const skills: Skill[] = [
  { name: "Adobe CC", icon: <Palette size={32} />, category: "Design" },
  { name: "Premiere Pro", icon: <Video size={32} />, category: "Video" },
  { name: "After Effects", icon: <Film size={32} />, category: "Motion" },
  { name: "Photoshop", icon: <Image size={32} />, category: "Design" },
  { name: "Figma", icon: <Figma size={32} />, category: "Design" },
  { name: "Flerkameraproduksjon", icon: <Video size={32} />, category: "Video" },
  { name: "Konseptutvikling og storyboards", icon: <Lightbulb size={32} />, category: "Kreativ" },
  { name: "Meta Suite", icon: <Smartphone size={32} />, category: "Social" },
  { name: "Social Media Marketing", icon: <TrendingUp size={32} />, category: "Social" },
  { name: "Kreativ annonsering og markedsføring", icon: <Megaphone size={32} />, category: "Marketing" },
  { name: "ChatGPT", icon: <MessageSquare size={32} />, category: "AI" },
  { name: "Midjourney", icon: <Sparkles size={32} />, category: "AI" },
  { name: "Runway", icon: <Video size={32} />, category: "AI" },
  { name: "Logic Pro", icon: <Music size={32} />, category: "Audio" },
  { name: "Development", icon: <Code size={32} />, category: "Tech" },
];

export default function CompetenceSection() {
  return (
    <section id="competence" className="pt-24 pb-24 md:pt-32 md:pb-32 bg-transparent relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Artboard_174.png')",
            filter: "blur(12px) brightness(0.2)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/88 to-brand-black/92" />
      </div>

      <div className="container-custom relative z-10">
        <motion.h2
          {...fadeUpStagger}
          className="text-center mb-4"
        >
          Ferdigheter & Verktøy
        </motion.h2>
        <motion.p
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
          className="text-center text-brand-white/60 mb-16 max-w-2xl mx-auto"
        >
          Et allsidig verktøysett som dekker design, video, AI og strategi.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              {...fadeUpStagger}
              transition={{
                ...fadeUpStagger.transition,
                delay: index * 0.06,
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(221, 34, 34, 0.5)",
              }}
              className="group relative bg-brand-white/5 border border-brand-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-brand-white/10"
            >
              <motion.div
                className="text-brand-white/80 group-hover:text-brand-red mb-4 transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {skill.icon}
              </motion.div>
              <h6 className="font-semibold text-brand-white">
                {skill.name}
              </h6>
              <p className="text-brand-white/40 mt-1"><small>{skill.category}</small></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}