"use client";

/**
 * SplineChecklist Component
 * 
 * Displays the "Lights / Camera / Action" checklist 3D animation
 * as a decorative element between Hero and Narrative sections.
 * 
 * CRITICAL RULES:
 * - Purely decorative: pointer-events: none
 * - TRANSPARENT background (blends with site gradient)
 * - Explicit heights: 520px (desktop) / 360px (mobile)
 * - Max-width: 640px (updated from 520px)
 * - Centered with container
 * - iframe must be position: absolute; inset: 0
 * - NO scroll hijacking, NO sticky positioning
 * - NO interactivity whatsoever
 */

export function SplineChecklist() {
  return (
    <section 
      className="w-full flex justify-center py-12 md:py-16 relative z-0"
      style={{ background: 'transparent' }}
      aria-label="Decorative 3D Animation"
    >
      <div className="container px-4" style={{ background: 'transparent' }}>
        {/* 
          MANDATORY WRAPPER PATTERN
          - Desktop Height: 520px
          - Mobile Height: 360px
          - Max Width: 640px
          - Pointer Events: NONE (decorative only)
          - Background: TRANSPARENT (critical)
        */}
        <div 
          className="relative w-full max-w-[640px] h-[360px] md:h-[520px] mx-auto pointer-events-none"
          aria-hidden="true"
          style={{ 
            isolation: 'isolate',
            background: 'transparent'
          }}
        >
          <iframe
            src="https://my.spline.design/autolayoutlistcopycopy-XJtw5plj3vbjLvIwLugVCjMm-oFu/?transparent=true"
            className="absolute inset-0 w-full h-full border-0 rounded-lg pointer-events-none"
            title="Lights Camera Action Checklist - Decorative 3D Animation"
            loading="lazy"
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            style={{
              background: 'transparent',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </section>
  );
}