"use client";

/**
 * SplineCameraSwitchLab Component
 * 
 * Experimental 3D camera switching scene for interaction testing.
 * This is a contained, interactive lab section that can be modified or removed at any time.
 * 
 * Safety Features:
 * - Completely isolated component (no shared code)
 * - Contained within section boundaries (no spillover)
 * - Transparent wrapper (inherits site background)
 * - Overflow hidden for scene containment
 * - Interactive (click to switch cameras) but isolated
 * - Responsive sizing (640px desktop / 420px mobile)
 * - No global effects, no shared parents with Spotify
 */

export function SplineCameraSwitchLab() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Text Block */}
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Eksperiment: Kamera-bytte
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Interaktiv 3D-scene – kun for testing
          </p>
        </div>

        {/* Spline Embed Container */}
        <div className="relative w-full mx-auto" style={{ maxWidth: "1100px" }}>
          <div 
            className="relative w-full overflow-hidden rounded-xl border border-gray-800/50 shadow-2xl"
            style={{
              background: "transparent",
              height: "640px"
            }}
          >
            <iframe
              src="https://my.spline.design/op1clicktoswitchcameras-HqfaZKJP8kiRP2OYOFoND69M/"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{
                background: "transparent",
                border: "none",
                display: "block",
                pointerEvents: "auto"
              }}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              title="Spline Camera Switch Lab - Experimental Interactive Scene"
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

        {/* Lab Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Klikk på scenen for å bytte kamera-vinkler
          </p>
        </div>
      </div>
    </section>
  );
}