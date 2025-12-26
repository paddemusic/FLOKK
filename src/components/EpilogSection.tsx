import { useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export function EpilogSection(): JSX.Element {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 24]);

  const lines = useMemo(
    () => [
      "Jeg tror ikke på tilfeldigheter. Hver film, hver låt og hvert prosjekt jeg har jobbet med, har ledet meg hit. Til ønsket om å lage innhold som faktisk betyr noe.",
      "For meg handler det ikke bare om å fange oppmerksomhet, men om å skape øyeblikk som føles ekte.",
    ],
    []
  );

  return (
    <section
      id="epilog"
      aria-label="Epilog"
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]"
    >
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#FF8A5C]/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          y: yParallax,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.3)_100%)]" />
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-6 py-32 md:py-40 text-center">
        <motion.div
          {...fadeUpStagger}
          className="mx-auto mb-6 h-[2px] w-[30px] bg-gradient-to-r from-brand-red to-[#FF8A5C]"
          aria-hidden="true"
        />
        
        <motion.h2
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.05 }}
          className="text-white mb-4 text-glow"
        >
          Historier som beveger
        </motion.h2>

        <div className="mt-8 space-y-5">
          {lines.map((t, i) => (
            <motion.p
              key={i}
              {...fadeUpStagger}
              transition={{ ...fadeUpStagger.transition, delay: 0.15 + 0.15 * i }}
              className="text-white/85"
            >
              {t}
            </motion.p>
          ))}
          <motion.p
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.15 + 0.15 * lines.length }}
            className="text-white/80 italic"
          >
            Og kanskje er det her neste kapittel begynner.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 w-full max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <video
              controls
              className="w-full h-auto"
              preload="metadata"
            >
              <source
                src="https://www.dropbox.com/scl/fi/ky48itdlaxgui1jzpvd18/D-ds-or-die-Story_06.mp4?rlkey=7iyfwbdw5grpuxc08h4ur4ae3&st=ksf68j3r&dl=1"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="mt-12 w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent"
        />
      </div>
    </section>
  );
}

export default EpilogSection;