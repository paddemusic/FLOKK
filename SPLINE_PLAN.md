# Spline 3D Integration Plan

## Objective
Integrate "Lights / Camera / Action" Spline animation between Hero and Narrative sections without affecting site performance or Spotify functionality.

## Core Rules
1. **NO-TOUCH ZONE**: Spotify components (`SpotifyPlayer.tsx`, `SeOgHorSection*.tsx`) are strictly read-only.
2. **Interaction**: All 3D elements must have `pointer-events: none`.
3. **Integration**: Use `<iframe>` only. No React-Spline libraries.
4. **Layout**: Strict height enforcement (Desktop: 520px, Mobile: 360px).

## Component Structure: `SplineChecklist.tsx`

```tsx
"use client";

export function SplineChecklist() {
  return (
    <div className="w-full flex justify-center py-12 relative z-0 bg-transparent">
      {/* 
        MANDATORY WRAPPER PATTERN
        - Desktop Height: 520px
        - Mobile Height: 360px
        - Max Width: 520px
        - Pointer Events: NONE
      */}
      <div 
        className="relative w-full max-w-[520px] h-[360px] md:h-[520px] mx-auto pointer-events-none"
        aria-hidden="true" // Purely decorative
      >
        <iframe 
          src="https://my.spline.design/checklist-placeholder" // TO BE REPLACED
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            border: 0 
          }}
          title="Lights Camera Action Checklist"
        />
      </div>
    </div>
  );
}
```

## Implementation Steps
1. Create `src/components/SplineChecklist.tsx`.
2. Import in `src/pages/index.tsx`.
3. Place component immediately after `<CinematicHeroEnhanced />`.
4. Verify visibility and responsiveness.