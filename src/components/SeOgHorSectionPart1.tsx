import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";
import { SeOgHorSectionPart2 } from "./SeOgHorSectionPart2";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

type TempVideo = {
  id: string;
  title: string;
  thumb: string;
  src: string;
  provider: "dropbox" | "youtube";
};

const videos: TempVideo[] = [
  { id: "ep1", title: "EP1: Snapchat", thumb: "/1280.jpeg", src: "https://www.dropbox.com/scl/fi/e2vk1ykl22x2thy7044v9/EP1.mp4", provider: "dropbox" },
  { id: "pod2024", title: "Podcast 2024", thumb: "/Youtube_thumbnail_podcast_01_v2.png", src: "https://www.youtube.com/watch?v=Ai0znYcHO2Q", provider: "youtube" },
  { id: "case", title: "YouTube Prosjekt", thumb: "/Screenshot_2024-01-27_at_23.35.27.png", src: "https://www.youtube.com/watch?v=YtkKr-cDzSk", provider: "youtube" }
];

function toYouTubeEmbed(url: string): string {
  return url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url;
}

function withDropboxRaw(url: string): string {
  return url.includes("raw=1") ? url : url.includes("?") ? `${url}&raw=1` : `${url}?raw=1`;
}

function HoverReactiveVideoCard({ v, i }: { v: TempVideo; i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label={`${v.title} video`}
          className="group relative rounded-xl glass-dark border border-white/10 overflow-hidden hover-lift gradient-border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50"
        >
          <motion.div
            className="absolute -inset-3 bg-gradient-to-br from-brand-red/25 via-[#FF8A5C]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100"
            style={{ transform: "translateZ(-40px)" }}
            transition={{ duration: 0.4 }}
          />
          
          <motion.div 
            className="relative w-full"
            style={{ transform: "translateZ(15px)" }}
          >
            <img
              src={v.thumb}
              alt={v.title}
              loading="lazy"
              className="w-full h-auto object-cover premium-image-hover"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
          
          <motion.div 
            className="absolute inset-0 flex items-end p-4 pointer-events-none"
            style={{ transform: "translateZ(25px)" }}
          >
            <p className="font-medium text-white">{v.title}</p>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="w-16 h-16 rounded-full bg-brand-red/90 flex items-center justify-center pulse-glow">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </motion.div>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-brand-black border-brand-white/10">
        {v.provider === "youtube" ? (
          <div className="aspect-video w-full">
            <iframe
              src={toYouTubeEmbed(v.src)}
              title={v.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        ) : (
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto"
            src={withDropboxRaw(v.src)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SeOgHorSectionPart1() {
  return (
    <section id="se-og-hor" className="relative py-24 md:py-32">
      {/* DEBUG LABEL */}
      <div className="fixed top-20 left-4 z-50 bg-green-500 text-white px-4 py-2 rounded font-bold">
        RENDERING: SeOgHorSectionPart1
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#FF8A5C]/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.35)_100%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-3 text-glow">Se &amp; Hør</h2>
          <p className="text-brand-white/60">
            Se mine seneste videoer
          </p>
        </motion.div>

        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {videos.map((v, i) => (
            <HoverReactiveVideoCard key={v.id} v={v} i={i} />
          ))}
        </motion.div>

        <SeOgHorSectionPart2 />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <motion.h3 
            className="text-center mb-8 text-glow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Utvalgte videoer
          </motion.h3>
          
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {[
              "https://www.youtube.com/embed/VfhaoSaUm6Q?si=meFjLB8dfE9DbLti",
              "https://www.youtube.com/embed/6VcwkqcC-0c?si=qMhjZCZJgFwqr4Yo",
              "https://www.youtube.com/embed/VfhaoSaUm6Q?si=cMx07O_zM0jvYwXN"
            ].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative rounded-xl overflow-hidden glass-dark border border-white/10 hover-lift gradient-border"
              >
                <div className="aspect-video w-full">
                  <iframe
                    src={src}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}