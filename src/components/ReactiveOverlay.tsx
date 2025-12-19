
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export function ReactiveOverlay() {
  const { scrollYProgress } = useScroll();

  const bgColor = useTransform(
    scrollYProgress,
    [0.0, 0.4, 0.8, 1.0],
    ["rgba(255,0,0,0.25)", "rgba(80,80,80,0.25)", "rgba(0,255,128,0.25)", "rgba(0,0,0,0.3)"]
  );

  const blur = useTransform(scrollYProgress, [0, 1], ["8px", "2px"]);
  const backdrop = useMotionTemplate`blur(${blur})`;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none mix-blend-soft-light"
      style={{
        backgroundColor: bgColor,
        backdropFilter: backdrop,
      }}
    />
  );
}
  