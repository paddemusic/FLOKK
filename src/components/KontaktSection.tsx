import { motion } from "framer-motion";
import { fadeUpStagger } from "@/lib/motion";

export default function KontaktSection() {
  return (
    <section id="kontakt" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      
      {/* Floating ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/8 rounded-full blur-[120px]"
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
      
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.4)_100%)]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          {...fadeUpStagger}
          className="mx-auto mb-6 h-[2px] w-[30px] bg-gradient-to-r from-brand-red to-[#FF8A5C]"
          aria-hidden="true"
        />
        <motion.h2 {...fadeUpStagger} className="mb-4 text-glow">
          Kontakt
        </motion.h2>
        <motion.p
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.08 }}
          className="text-white/80 mb-8"
        >
          Hvis du har kommet helt hit, er det kanskje fordi du kjenner at vi kunne laget noe bra sammen.
        </motion.p>

        <div className="space-y-3 mb-10">
          <motion.p
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.16 }}
            className="text-white/85"
          >
            Jeg liker folk som tenker stort, og tør å teste.
          </motion.p>
          <motion.p
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.24 }}
            className="text-white/85"
          >
            La oss ta en kaffe, et kall, eller en idé som kanskje ikke helt er ferdig ennå.
          </motion.p>
          <motion.p
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.32 }}
            className="italic text-white/70"
          >
            (Verste som kan skje er at vi får en god prat.)
          </motion.p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.a
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.4 }}
            href="mailto:contact@hellonomusic.com"
            className="relative rounded-full px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-brand-red to-[#FF8A5C] transition-all duration-300 overflow-hidden group"
            aria-label="Send e-post"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Heartbeat glow effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(217, 39, 39, 0.3)",
                  "0 0 40px rgba(217, 39, 39, 0.5)",
                  "0 0 20px rgba(217, 39, 39, 0.3)",
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10">Send e-post</span>
            
            {/* Breathing pulse effect like a heartbeat */}
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.a>
          
          <motion.a
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.46 }}
            href="https://www.linkedin.com/in/paddemusic/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-sm font-semibold text-white border border-white/30 transition-all duration-300 hover:border-brand-red hover:bg-white/5"
            aria-label="Åpne LinkedIn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            LinkedIn
          </motion.a>
        </div>

        {/* Social links with staggered animation */}
        <motion.div
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.58 }}
          className="mt-10 text-sm text-white/70"
        >
          <p className="mb-3 font-medium">Sosiale medier:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { name: "Instagram", url: "https://www.instagram.com/p4trickofficial" },
              { name: "YouTube", url: "https://www.youtube.com/patrickjorgensen" },
              { name: "Spotify", url: "https://open.spotify.com/artist/5IdCpGeu22vX9cXMCdpGWp" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/paddemusic/" },
            ].map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-brand-red transition-colors duration-200 text-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Cinematic thread dissolution like the end of a live show */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mt-16"
        >
          <motion.div
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent"
            animate={{
              opacity: [0.3, 0.55, 0.3],
              scaleX: [1, 0.95, 1],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Slow heartbeat glow beneath the line */}
          <motion.div
            className="mx-auto mt-4 w-24 h-24 bg-brand-red/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          {...fadeUpStagger}
          transition={{ ...fadeUpStagger.transition, delay: 0.7 }}
          className="mt-8 text-xs tracking-wide uppercase text-white/40"
        >
          © 2025 Patrick Jørgensen · Bygget med AI og kaffe ☕
        </motion.p>
      </div>
    </section>
  );
}