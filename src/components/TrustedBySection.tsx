"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  {
    name: "ANT I",
    path: "/91126-20304-original.png",
    width: 180,
    height: 80,
    opticalOffset: 0,
  },
  {
    name: "Nobel Peace Center",
    path: "/images.png",
    width: 180,
    height: 80,
    opticalOffset: 0,
  },
  {
    name: "Fremantle",
    path: "/Fremantle_2018_logo.svg",
    width: 180,
    height: 80,
    opticalOffset: -4,
  },
  {
    name: "Kreftforeningen",
    path: "/Logo-Kreftforeningen.jpg",
    width: 180,
    height: 80,
    opticalOffset: 2,
  },
  {
    name: "Myreze",
    path: "/MYREZE_AS_-_Logo.png",
    width: 180,
    height: 80,
    opticalOffset: -4,
  },
  {
    name: "TV2",
    path: "/tv2_scaled.png",
    width: 180,
    height: 80,
    opticalOffset: 0,
  },
  {
    name: "Sony Music",
    path: "/sony-music-logo-png_seeklogo-261658.png",
    width: 180,
    height: 80,
    opticalOffset: 0,
  },
  {
    name: "Redd Barna",
    path: "/ReddBarna_Logo_Nor_Stacked_ColPos_RGB.png",
    width: 180,
    height: 80,
    opticalOffset: 0,
  },
  {
    name: "BI Norwegian Business School",
    path: "/BI_logo.svg.png",
    width: 180,
    height: 80,
    opticalOffset: 0,
  },
];

export function TrustedBySection() {
  return (
    <section className="relative py-24 px-6 bg-[#090909] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#090909] to-[#0D0D0D] opacity-60" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(217,39,39,0.3),transparent_70%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-white tracking-tight mb-4">
            Samarbeidspartnere
          </h2>
          <p className="text-[#E0E0E0]/70 max-w-2xl mx-auto font-light" style={{ letterSpacing: "0.3px" }}>
            Merkevarer og organisasjoner jeg har jobbet med
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-[24px] p-8 md:p-12 lg:p-16"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.05) 100%)",
            boxShadow: "inset 0 1px 3px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.15 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D92727] to-transparent transform -translate-y-1/2 z-0"
          />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 * index,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="group relative w-full flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="relative w-full aspect-square flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: "0 0 12px rgba(217,39,39,0.15), 0 8px 24px rgba(0,0,0,0.5)",
                    }}
                  />

                  <div 
                    className="logo-inner relative flex items-center justify-center rounded-xl overflow-hidden"
                    style={{
                      width: "85%",
                      height: "85%",
                      background: "#fff",
                      padding: "12px",
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div 
                      className="relative w-full h-full flex items-center justify-center"
                      style={{
                        transform: `translateY(${logo.opticalOffset}px)`,
                      }}
                    >
                      <Image
                        src={logo.path}
                        alt={logo.name}
                        fill
                        className="object-contain"
                        style={{
                          maxWidth: "85%",
                          maxHeight: "85%",
                          margin: "auto",
                          display: "block",
                        }}
                        sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 180px"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .logo-inner > div {
            transform: translateY(calc(var(--optical-offset, 0) * 0.5)) !important;
          }
        }
      `}</style>
    </section>
  );
}