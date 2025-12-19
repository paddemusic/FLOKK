import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function VisualGalleryLayer() {
  const { scrollYProgress } = useScroll();

  const fade1 = useTransform(scrollYProgress, [0.0, 0.25], [1, 0]);
  const fade2 = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const fade3 = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);

  const [muteBg, setMuteBg] = React.useState(false);

  React.useEffect(() => {
    const candidates = Array.from(document.querySelectorAll("section, div"))
      .filter((el) => {
        const t = (el.textContent || "").toLowerCase();
        return (
          t.includes("bak hvert klipp finnes et blikk") ||
          t.includes("hvis teknologi bygger strukturen")
        );
      })
      .map((el) => el.closest("section") || el);

    if (candidates.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const anyInView = entries.some((e) => e.isIntersecting);
        setMuteBg(anyInView);
      },
      { root: null, threshold: 0.25 }
    );

    candidates.forEach((el) => el && obs.observe(el as Element));
    return () => obs.disconnect();
  }, []);

  const layerOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const computedOpacity = (base: any) => ({
    opacity: muteBg ? 0 : (typeof base === "number" ? base : base),
  });

  const images = [
    { src: "/patrick_bts-13.jpg", alt: "Behind the scenes", style: fade1 },
    { src: "/patrick_bts-6.jpg", alt: "Portrait BTS", style: fade2 },
    { src: "/Artboard_40.png", alt: "Texture accent", style: fade3 },
  ];

  return (
    <motion.div
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ opacity: layerOpacity }}
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          style={{
            ...computedOpacity(img.style as any),
            position: "absolute",
            inset: 0,
            transition: "opacity 0.9s ease",
            willChange: "opacity, transform",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover object-center opacity-70"
            priority={i === 0}
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </motion.div>
  );
}
