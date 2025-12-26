"use client";

/**
 * SeOgHorSectionPart2: Spotify embed section
 * Simple, stable implementation that works
 */
export function SeOgHorSectionPart2() {
  return (
    <section 
      className="relative py-16 md:py-24" 
      style={{ 
        minHeight: "500px",
        background: "transparent"
      }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Spotify Player Block */}
        <div 
          className="glass-dark rounded-2xl border border-white/10 p-6 md:p-8"
          style={{ 
            minHeight: "420px"
          }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white text-center">
            Lytt til musikken min
          </h3>
          
          <div className="w-full" style={{ minHeight: "352px" }}>
            <iframe
              data-testid="embed-iframe"
              src="https://open.spotify.com/embed/artist/5IdCpGeu22vX9cXMCdpGWp?utm_source=generator&theme=0"
              width="100%"
              height="352"
              style={{ 
                borderRadius: "12px", 
                display: "block",
                border: "none"
              }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Patrick Jørgensen – Spotify"
            />
          </div>
        </div>

        {/* Call to action text */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm md:text-base">
            Oppdager du noe du liker? Del gjerne med dine venner 🎵
          </p>
        </div>
      </div>
    </section>
  );
}