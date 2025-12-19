import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";
import { Space_Grotesk } from "next/font/google";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SpotifyPlayer = dynamic(
  () => import("./SpotifyPlayer").then(mod => mod.SpotifyPlayer),
  { ssr: false }
);

interface VideoItem {
  id: string;
  title: string;
  thumbSrc: string;
  videoUrl: string;
  provider: "youtube" | "dropbox";
}

const videoItems: VideoItem[] = [
  {
    id: "ep1",
    title: "EP1: Snapchat",
    thumbSrc: "/1280.jpeg",
    videoUrl: "https://www.dropbox.com/scl/fi/e2vk1ykl22x2thy7044v9/EP1.mp4?rlkey=fc5nx8j7tjetz2pfdpit5jfps&dl=0",
    provider: "dropbox",
  },
  {
    id: "pod2024",
    title: "Podcast 2024",
    thumbSrc: "/Youtube_thumbnail_podcast_01_v2.png",
    videoUrl: "https://www.youtube.com/watch?v=Ai0znYcHO2Q",
    provider: "youtube",
  },
  {
    id: "case",
    title: "YouTube Prosjekt",
    thumbSrc: "/Screenshot_2024-01-27_at_23.35.27.png",
    videoUrl: "https://www.youtube.com/watch?v=YtkKr-cDzSk",
    provider: "youtube",
  },
];

function toYouTubeEmbed(url: string): string {
  try {
    if (url.includes("watch?v=")) {
      const base = url.replace("watch?v=", "embed/");
      return base;
    }
    return url;
  } catch {
    return url;
  }
}

function withDropboxRaw(url: string): string {
  return url.includes("raw=1") ? url : url.includes("?") ? `${url}&raw=1` : `${url}?raw=1`;
}

function VideoThumb({ item }: { item: VideoItem }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="group relative rounded-xl bg-black/40 border border-brand-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50"
          aria-label={`Spill av video: ${item.title}`}
        >
          <img
            src={item.thumbSrc}
            alt={item.title}
            className="w-full opacity-90 transition duration-300 group-hover:opacity-100 fade-in-smooth"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
          <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
            <p className="text-brand-white/85"><small>{item.title}</small></p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-brand-black border-brand-white/10">
        {item.provider === "youtube" ? (
          <div className="w-full">
            <iframe
              src={toYouTubeEmbed(item.videoUrl)}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-[56.25vw] max-h-[70vh]"
            />
          </div>
        ) : (
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto"
            src={withDropboxRaw(item.videoUrl)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function SeOgHorSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="se-og-hor" className={`relative overflow-hidden ${spaceGrotesk.className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.35)_100%)]" />
      <div className="container-custom relative z-10 py-20 md:py-28">
        <motion.h2
          {...fadeUpStagger}
          className="text-center mb-2"
        >
          Se &amp; Hør
        </motion.h2>

        <motion.p
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.05 }}
          className="text-center text-brand-white/60 mb-10"
        >
          Se mine seneste videoer
        </motion.p>

        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {videoItems.map((item) => (
            <VideoThumb key={item.id} item={item} />
          ))}
        </motion.div>

        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.2 }}
          className="mt-16 md:mt-24"
        >
          <h3 className="text-center mb-3">Lytt til musikken min</h3>
          <p className="text-center text-brand-white/60 mb-6">
            Følg meg på{" "}
            <a
              className="underline underline-offset-4 hover:text-brand-red transition-colors"
              href="https://open.spotify.com/artist/5IdCpGeu22vX9cXMCdpGWp"
              target="_blank"
              rel="noreferrer"
            >
              Spotify
            </a>{" "}
            og{" "}
            <a
              className="underline underline-offset-4 hover:text-brand-red transition-colors"
              href="https://www.youtube.com/patrickjorgensen"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
            .
          </p>
          <div className="mx-auto max-w-3xl">
            <SpotifyPlayer />
          </div>
        </motion.div>
      </div>
    </section>
  );
}