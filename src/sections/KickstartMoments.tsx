import { motion } from "framer-motion";
import media from "@/data/media";
import { fadeUpStagger } from "@/lib/motion";

export default function KickstartMoments() {
  return (
    <section
      aria-label="Liveøyeblikk – bak scenen"
      className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(224,0,43,0.15),transparent)]" />

      <div className="relative gallery-grid grid-cols-1 sm:grid-cols-3 px-6 md:px-12 max-w-6xl z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <img
            src={media.bts6}
            alt="Bak scenen – øyeblikk 1"
            loading="lazy"
            className="fade-in-smooth"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <img
            src={media.bts8}
            alt="Bak scenen – øyeblikk 2"
            loading="lazy"
            className="fade-in-smooth"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <img
            src={media.bts25}
            alt="Bak scenen – øyeblikk 3"
            loading="lazy"
            className="fade-in-smooth"
          />
        </motion.div>
      </div>

      <motion.div
        {...fadeUpStagger}
        className="relative z-20 mt-10 md:mt-12 text-center max-w-xl px-6"
      >
        <h2 className="text-3xl font-semibold text-white tracking-tight">
          Kickstart Moments
        </h2>
        <p className="text-white/80 mt-4 leading-relaxed text-base">
          Et glimt av øyeblikkene der alt stemmer. Lyset. Lyden. Publikum.
          Historien som blir levende — i realtid.
        </p>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
