import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

const CDN = "https://sg-b6f2b92d-8212-44cf-ba50-88a04322.vercel.app";
const BG_SoMe = `${CDN}/IMG_6205.jpg`;

export default function SoMeMindsetSection() {
  return (
    <section
      id="some-mindset"
      aria-label="SoMe-mindset"
      data-nobg="true"
      className="relative overflow-hidden section-y overlap-fade"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_SoMe})`, filter: "blur(12px) saturate(1.05) brightness(0.82)", transform: "scale(1.06)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,rgba(0,0,0,0.15),rgba(0,0,0,0.75)_60%,rgba(0,0,0,0.9)_90%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <header className="text-center max-w-3xl mx-auto">
          <motion.h2 {...fadeUpStagger}>SoMe-mindset</motion.h2>
          <motion.p
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.08 }}
            className="text-brand-white/80 mt-3"
          >
            Strategi i ryggmargen, tempo i fingertuppene. Jeg lager innhold som
            føles naturlig i feeden, og som faktisk blir sett.
          </motion.p>
        </header>

        <motion.ul
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.14 }}
          className="mt-8 grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto"
        >
          <li className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white/90">Idé, klipp, tekst, publisering</li>
          <li className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white/90">TikTok &amp; Reels: hook, beat &amp; retention</li>
          <li className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white/90">Organisk først, paid som forsterker</li>
          <li className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white/90">Iterasjon på innsikt, ikke magefølelse</li>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 backdrop-blur-sm">
            <video
              controls
              className="w-full h-auto"
              preload="metadata"
            >
              <source
                src="https://www.dropbox.com/scl/fi/usocybr5jldmq3xvo7ua6/2021-06-20-22.41.09.mp4?rlkey=lgjiphn3yp98bp0a8sjl9lado&st=kekd6r8c&raw=1"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 backdrop-blur-sm">
            <video
              controls
              className="w-full h-auto"
              preload="metadata"
            >
              <source
                src="https://www.dropbox.com/scl/fi/apvk87bay8kk9sp434mzh/KASKO1-BLOOPERS-TIKTOK-organisk.mp4?rlkey=v3xznfrd1yxg7yy375m57tem6&st=namsfkk4&raw=1"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}