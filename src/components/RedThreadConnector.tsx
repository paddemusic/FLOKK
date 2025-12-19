import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

export default function RedThreadConnector() {
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  const velocity = useScrollVelocity();
  const [brightness, setBrightness] = useState(0.4);
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.4, 0.4, 0]);

  useEffect(() => {
    const baseBrightness = 0.4;
    const velocityBoost = Math.min(velocity * 0.1, 0.25);
    setBrightness(baseBrightness + velocityBoost);
  }, [velocity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="redThreadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D92727" stopOpacity={brightness}>
              <animate
                attributeName="stop-opacity"
                values={`${brightness}; ${brightness + 0.15}; ${brightness}`}
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#FF8A5C" stopOpacity={brightness * 0.85}>
              <animate
                attributeName="stop-opacity"
                values={`${brightness * 0.85}; ${brightness}; ${brightness * 0.85}`}
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#D92727" stopOpacity={brightness * 0.78}>
              <animate
                attributeName="stop-opacity"
                values={`${brightness * 0.78}; ${brightness * 0.9}; ${brightness * 0.78}`}
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="threadGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          ref={pathRef}
          d="M 50 0 Q 45 15, 50 30 T 50 60 Q 55 75, 50 90 L 50 100"
          stroke="url(#redThreadGradient)"
          strokeWidth="0.15"
          fill="none"
          filter="url(#threadGlow)"
          style={{
            pathLength,
            opacity,
          }}
          initial={{ pathLength: 0 }}
          animate={{
            strokeWidth: [0.15, 0.18, 0.15],
          }}
          transition={{
            strokeWidth: {
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </svg>
    </div>
  );
}
