import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export default function VisualInterlude() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "2%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

  return (
    <section
      aria-label="Bak kulissene – visuell interlude"
      data-nobg="true"
      className="relative py-16 md:py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.08)_35%,_rgba(0,0,0,0.55)_100%)]" />

      <motion.p
        {...fadeUpStagger}
        className="relative z-10 text-center text-base italic text-[#E0E0E0] mb-12"
      >
        Bak hvert klipp finnes et blikk — og en historie som venter på å bli fortalt.
      </motion.p>

      {/* Standalone Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-4"
      >
        <div className="relative rounded-lg overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/5">
          <video
            controls
            preload="metadata"
            className="w-full aspect-video object-contain"
            playsInline
          >
            <source
              src="https://www.dropbox.com/scl/fi/f4v38vjhya3bzamrj5rb2/Aritma_showreel.mp4?rlkey=fr34ltzf6xtdqkvuu3db2as0h&st=mlr2bn79&raw=1"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-center space-y-2"
        >
          <h3 className="text-2xl font-semibold text-white">
            Patrick Showreel 2025
          </h3>
          <p className="text-sm text-[#B0B0B0] max-w-3xl mx-auto">
            – Mitt bidrag i disse klippene varierer fra klipp, animasjon, skuespiller, regi, produsent, og spenner fra årene 2015–2023.
          </p>
        </motion.div>

        {/* Two images below the showreel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="/Artboard_8.png"
              alt="Behind the scenes moment 1"
              loading="lazy"
              className="w-full h-auto object-cover fade-in-smooth"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="/Artboard_7.png"
              alt="Behind the scenes moment 2"
              loading="lazy"
              className="w-full h-auto object-cover fade-in-smooth"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom spacer */}
      <div className="relative z-10 h-10" aria-hidden="true" />
    </section>
  );
}
