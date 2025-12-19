import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

interface CardItem {
  title: string;
  body: string;
}

const cards: CardItem[] = [
  {
    title: "Kamera & Lys",
    body:
      "Manuell eksponering, fokus, ISO, farger. Jeg elsker kontrollen, og kaoset når lyset treffer rett.",
  },
  {
    title: "Klipp & Etterarbeid",
    body:
      "Adobe Premiere Pro og litt After Effects. Rytme, pust, og timing. Det er her følelsen settes.",
  },
  {
    title: "Lyd & Detaljer",
    body:
      "Opptak, miks, og lyd som føles ekte. Den usynlige delen av historien.",
  },
];

function HoverTiltImage({ src, index }: { src: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-xl overflow-hidden gradient-border cursor-pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        {/* Ambient light shadow */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-br from-brand-red/20 via-[#FF8A5C]/15 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100"
          style={{ transform: "translateZ(-50px)" }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.img
          src={src}
          alt={`Bak kulissene, arbeid i praksis ${index + 1}`}
          loading="lazy"
          className="w-full h-auto object-cover premium-image-hover"
          style={{ transform: "translateZ(20px)" }}
        />
        
        {/* Subtle overlay glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-brand-red/10 via-transparent to-[#FF8A5C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(25px)" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function BakKameraetSection() {
  return (
    <section id="bak-kameraet" className="relative overflow-hidden pt-24 pb-24 md:pt-32 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a]" />
      
      {/* Floating light accent */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.35)_100%)]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <header className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.span 
              className="block h-10 w-2 rounded-sm bg-gradient-to-b from-brand-red to-[#FF8A5C]" 
              aria-hidden="true"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="leading-tight text-glow">Bak kameraet</h2>
          </motion.div>

          <motion.p
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.05 }}
            className="text-brand-white/80"
          >
            Bak hvert prosjekt finnes det kabler, kameraer, kaffe, og en skaperglede som ikke går over.
          </motion.p>

          <div className="mt-6 space-y-2">
            <motion.p
              {...fadeUpStagger}
              transition={{ ...fadeUpStagger.transition, delay: 0.15 }}
              className="text-brand-white/70"
            >
              Jeg liker å si at jeg er like nerd som jeg er kreativ.
            </motion.p>
            <motion.p
              {...fadeUpStagger}
              transition={{ ...fadeUpStagger.transition, delay: 0.3 }}
              className="text-brand-white/70"
            >
              For meg handler det om å forstå verktøyene, og bruke dem til å fortelle bedre historier.
            </motion.p>
          </div>
        </header>

        {/* Three images side by side with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["/Artboard_1.png", "/Artboard_2.png", "/Artboard_3.png"].map((src, i) => (
              <HoverTiltImage key={src} src={src} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.3 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative rounded-2xl glass-panel p-6 hover-lift cursor-default"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <motion.h4 
                  className="font-semibold text-brand-white mb-3"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {c.title}
                </motion.h4>
                <p className="text-brand-white/70 leading-relaxed">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}