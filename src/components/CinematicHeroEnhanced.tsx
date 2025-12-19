import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { fadeUp, scaleOnPress } from "@/lib/motion";
import { useRef, useEffect, useState } from "react";
import media from "@/data/media";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { Section3DOverlay } from "@/components/Section3DOverlay";

export default function CinematicHeroEnhanced() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useScrollVelocity();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; ax: number; ay: number; d: number }>>([]);
  
  const y = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -24]);
  const textY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.85]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const baseIntensity = 1;
    const velocityBoost = Math.min(velocity * 0.15, 0.3);
    setPulseIntensity(baseIntensity + velocityBoost);
  }, [velocity]);

  useEffect(() => {
    const seed = 42;
    const rng = (i: number) => {
      const x = Math.sin(seed + i * 9973) * 10000;
      return x - Math.floor(x);
    };
    const next = Array.from({ length: 8 }).map((_, i) => ({
      x: rng(i * 3) * 100,
      y: rng(i * 3 + 1) * 100,
      ax: rng(i * 3 + 2) * 100,
      ay: rng(i * 3 + 3) * 100,
      d: 15 + rng(i * 3 + 4) * 10,
    }));
    setParticles(next);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    if (!prefersReduced) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [prefersReduced]);

  const scrollToPortfolio = () => {
    const el = document.querySelector("#projects");
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    const fallback = document.querySelector("#portfolio");
    if (fallback) fallback.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact") || document.querySelector("#kontakt");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black"
      aria-label="Homepage hero"
    >
      {/* 3D Movie Camera Overlay - scroll-animated entrance */}
      <Section3DOverlay
        modelPath="/models/15._Movie_Camera.glb"
        position={[3, 1, -2]}
        scale={0.4}
        mobileScale={0.25}
        rotation={[0.3, -0.5, 0.1]}
        floatSpeed={1.2}
        floatIntensity={0.3}
        scrollAnimation={true}
      />

      {/* Cinematic gradient background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a]"
        style={{ y, scale }}
        aria-hidden="true"
      />
      
      {/* Floating light particles (client-only to avoid hydration mismatch) */}
      {particles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-red/30 rounded-full blur-sm"
              initial={{
                x: `${p.x}%`,
                y: `${p.y}%`,
              }}
              animate={{
                x: [`${p.x}%`, `${p.ax}%`],
                y: [`${p.y}%`, `${p.ay}%`],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: p.d,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Texture layer with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url(${media.artboard14})`,
          x: prefersReduced ? 0 : mousePosition.x * 0.5,
          y: prefersReduced ? 0 : mousePosition.y * 0.5,
        }}
        aria-hidden="true"
      />
      
      {/* Enhanced vignette with red glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(217,39,39,0.08)_0%,_rgba(0,0,0,0)_35%,_rgba(0,0,0,0.6)_100%)]" />

      {/* Enhanced pulsing background glow - bassline simulation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(217, 39, 39, 0.18), transparent 65%)",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Glowing SVG red thread with shimmer effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <svg width="800" height="600" viewBox="0 0 800 600" className="opacity-40">
          <defs>
            <linearGradient id="heroThreadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D92727">
                <animate
                  attributeName="stop-color"
                  values="#D92727; #FF8A5C; #D92727"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#FF8A5C">
                <animate
                  attributeName="stop-color"
                  values="#FF8A5C; #D92727; #FF8A5C"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <filter id="heroGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M 100 300 Q 250 200, 400 300 T 700 300"
            stroke="url(#heroThreadGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#heroGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: pulseIntensity * 0.8,
              strokeWidth: [3, 3.5, 3],
            }}
            transition={{ 
              pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 },
              opacity: { duration: 0.3 },
              strokeWidth: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </svg>
      </div>

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
        style={{ opacity, y: textY }}
      >
        {/* Hero headline */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <h1 className="mb-6">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Calm execution.
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-brand-red to-[#FF8A5C] bg-clip-text text-transparent relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.85, 1, 0.85],
                y: 0,
              }}
              transition={{
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 0.8, delay: 0.5 },
              }}
              style={{
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 50%",
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(90deg, #D92727, #FF8A5C, #D92727)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Proof you can measure.
              </motion.span>
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Story-first craft, built for modern channels.
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          className="text-brand-white/80 mb-6"
        >
          Creative strategy, production, and narrative pacing — delivered with clarity.
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.5 }}
          className="uppercase tracking-wider text-brand-white/50 mb-10"
        >
          <small>Clarity · Taste · Momentum</small>
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.65 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            {...scaleOnPress}
            onClick={scrollToPortfolio}
            aria-label="See selected work"
            className="px-8 py-4 rounded-lg font-semibold bg-brand-red text-brand-white transition-all shadow-lg relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(217, 39, 39, 0.4)",
                "0 0 30px rgba(217, 39, 39, 0.6)",
                "0 0 20px rgba(217, 39, 39, 0.4)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-red to-[#FF8A5C]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">See selected work</span>
          </motion.button>

          <motion.button
            {...scaleOnPress}
            onClick={scrollToContact}
            aria-label="Contact"
            className="px-8 py-4 rounded-lg font-semibold border border-brand-white/40 text-brand-white hover:border-brand-white transition-all backdrop-blur-sm"
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            Contact
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.6 }}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-brand-white/25 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-brand-red to-[#FF8A5C]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}