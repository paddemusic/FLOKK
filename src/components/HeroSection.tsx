import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { fadeUp, scaleOnPress } from "@/lib/motion";
import { useRef } from "react";
import media from "@/data/media";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -24]);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.85]);

  const scrollToPortfolio = () => {
    const el = document.querySelector("#se-og-hor");
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    const fallback = document.querySelector("#portfolio");
    if (fallback) fallback.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#kontakt") || document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden overlap-fade"
      aria-label="Forside hero"
    >
      {/* Cinematic gradient background with subtle parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"
        style={{ y }}
        aria-hidden="true"
      />
      {/* Subtle texture layer */}
      <div
        data-parallax="0.15"
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${media.artboard14})` }}
        aria-hidden="true"
      />
      {/* Soft vignette for cinematic depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_45%,_rgba(0,0,0,0.4)_100%)]" />

      <div data-parallax="0.15" className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto px-6"
          style={{ opacity }}
        >
          {/* Hero headline */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            data-fade
          >
            <h1 className="mb-6">
              Jeg bygger broer mellom teknologi og følelser med ord, bilder og lyd.
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            className="text-brand-white/80 mb-6"
          >
            Innholdsutvikler, artist og historieforteller.
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
            className="uppercase tracking-wider text-brand-white/50 mb-10"
          >
            <small>Kreativitet. Teknologi. Historiefortelling.</small>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.65 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
            data-fade
          >
            <motion.button
              {...scaleOnPress}
              onClick={scrollToPortfolio}
              aria-label="Se prosjekter"
              className="px-8 py-4 rounded-lg font-semibold bg-brand-red text-brand-white transition-colors shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: "0 0 22px rgba(224, 0, 43, 0.4)" }}
            >
              Se prosjekter
            </motion.button>

            <motion.button
              {...scaleOnPress}
              onClick={scrollToContact}
              aria-label="Kontakt"
              className="px-8 py-4 rounded-lg font-semibold border border-brand-white/40 text-brand-white hover:border-brand-white transition-colors"
            >
              Kontakt
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.6 }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-brand-white/25 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-brand-red rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}