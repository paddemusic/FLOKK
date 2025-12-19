import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CDN = "https://sg-b6f2b92d-8212-44cf-ba50-88a04322.vercel.app";
const BTS = [
  `${CDN}/IMG_5010.jpg`,
  `${CDN}/IMG_5011.jpg`,
  `${CDN}/IMG_5022.jpg`,
  `${CDN}/IMG_5026.jpg`,
  `${CDN}/patrick_bts-22.jpg`,
  `${CDN}/patrick_bts-25.jpg`,
  `${CDN}/patrick_bts-8.jpg`,
];

function HoverReactiveImage({ src, index }: { src: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative group cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-xl overflow-hidden glass-dark border border-white/10 hover-lift gradient-border"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        {/* Ambient light shadow that reacts to hover */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-br from-brand-red/20 via-[#FF8A5C]/15 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100"
          style={{
            transform: "translateZ(-50px)",
          }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        <motion.img 
          src={src} 
          alt="Behind the scenes" 
          loading="lazy" 
          decoding="async" 
          className="w-full h-full object-cover premium-image-hover" 
          style={{
            transform: "translateZ(20px)",
          }}
        />
        
        {/* Glow overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-brand-red/10 via-transparent to-[#FF8A5C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: "translateZ(30px)",
          }}
        />
      </motion.div>
    </motion.figure>
  );
}

export default function BTSAltStrip() {
  return (
    <section aria-label="Bak kulissene, alternativ stripe" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]" />
      
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(217,39,39,0.05)_0%,_rgba(0,0,0,0)_50%)]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h3 
            className="font-bold mb-4 text-glow"
            animate={{
              textShadow: [
                "0 0 20px rgba(217, 39, 39, 0.3)",
                "0 0 30px rgba(217, 39, 39, 0.5)",
                "0 0 20px rgba(217, 39, 39, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Bak kulissene
          </motion.h3>
          <p className="text-brand-white/60 max-w-2xl mx-auto">
            Glimt fra arbeidsprosessen der ideene blir til virkelighet
          </p>
        </motion.div>
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {BTS.slice(0, 6).map((src, i) => (
            <HoverReactiveImage key={src} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}