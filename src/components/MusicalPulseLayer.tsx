
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { useEffect, useState } from "react";

export function MusicalPulseLayer() {
  const { scrollYProgress } = useScroll();
  const velocity = useScrollVelocity();
  const [pulseIntensity, setPulseIntensity] = useState(0.3);

  useEffect(() => {
    const baseIntensity = 0.3;
    const velocityBoost = Math.min(velocity * 0.2, 0.4);
    setPulseIntensity(baseIntensity + velocityBoost);
  }, [velocity]);

  const backgroundGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at 50% 20%, rgba(217, 39, 39, 0.15), transparent 70%)",
      "radial-gradient(circle at 50% 50%, rgba(255, 138, 92, 0.12), transparent 70%)",
      "radial-gradient(circle at 50% 80%, rgba(217, 39, 39, 0.15), transparent 70%)",
    ]
  );

  return (
    <>
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: backgroundGlow,
          opacity: pulseIntensity,
        }}
        animate={{
          opacity: [pulseIntensity * 0.8, pulseIntensity, pulseIntensity * 0.8],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(26, 0, 0, 0.4), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
