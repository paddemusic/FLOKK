"use client";

/**
 * SplineVisionProLab Component
 * 
 * Experimental 3D playground using Spline's Vision Pro portfolio concept.
 * This is a contained, interactive lab section that can be modified or removed at any time.
 * 
 * Safety Features:
 * - Contained within section boundaries (no spillover)
 * - Transparent wrapper (inherits site background)
 * - Overflow hidden with rounded corners
 * - Interactive but isolated (no global effects)
 * - Responsive sizing (700px desktop / 420px mobile)
 */

export function SplineVisionProLab() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Text Block */}
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Eksperiment
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Dette er en lekeplass for 3D – kan endres / fjernes når som helst.
          </p>
        </div>

        {/* Spline Embed Container */}
        <div className="relative w-full mx-auto" style={{ maxWidth: "1100px" }}>
          <div 
            className="relative w-full overflow-hidden rounded-xl border border-gray-800/50 shadow-2xl"
            style={{
              background: "transparent",
              height: "700px"
            }}
          >
            <iframe
              src="https://my.spline.design/applevisionpro3dportfolioconcept-MEkqpPEiQKncCg1BqRX93DIp/"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{
                background: "transparent",
                border: "none",
                display: "block"
              }}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              title="Spline Vision Pro Lab - Experimental 3D Environment"
            />
          </div>

          {/* Mobile Height Override */}
          <style jsx>{`
            @media (max-width: 768px) {
              .relative > div {
                height: 420px !important;
              }
            }
          `}</style>
        </div>

        {/* Optional Lab Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Interaktiv 3D-scene fra Spline – klikk og dra for å utforske
          </p>
        </div>
      </div>
    </section>
  );
}