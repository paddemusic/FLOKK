'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Hero timeline
  HERO_ENTER_START: 0,
  HERO_ENTER_END: 150,
  HERO_LOCK_START: 150,
  HERO_LOCK_END: 700,
  HERO_COMPRESS_START: 700,
  HERO_COMPRESS_END: 900,

  // Philosophy timeline
  PHILOSOPHY_ENTER_START: 900,
  PHILOSOPHY_ENTER_END: 1100,
  PHILOSOPHY_LOCK_START: 1100,
  PHILOSOPHY_LOCK_END: 1800,
  PHILOSOPHY_COMPRESS_START: 1800,
  PHILOSOPHY_COMPRESS_END: 2000,

  // Work timeline
  WORK_ENTER_START: 2000,
  WORK_ENTER_END: 2200,
  WORK_LOCK_START: 2200,
  WORK_LOCK_END: 3600,
  WORK_COMPRESS_START: 3600,
  WORK_COMPRESS_END: 3800,

  // Animation parameters
  FOCUS_LINE_VH: 50,
  LERP_FACTOR: 0.15,
  BREATHING_AMOUNT: 2,
  BREATHING_SPEED: 0.0008,

  // Visual parameters
  BLUR_MAX_BG: 4,
  BLUR_MAX_MG: 2,
  OPACITY_FLOOR_BG: 0.15,
  SCALE_COMPRESSED: 0.6,
  PARALLAX_BG: 0.3,

  // Spotlight parameters
  SPOTLIGHT_RADIUS: 300,
  SPOTLIGHT_LERP: 0.12,

  // Total scroll height
  TOTAL_SCROLL_HEIGHT: 4000,
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const clamped = clamp(value, inMin, inMax)
  return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin)
}

// ============================================================================
// DATA
// ============================================================================

const PHILOSOPHY_CARDS = [
  {
    title: 'Clarity Through Restraint',
    description: 'Every element earns its place. What remains is essential.',
  },
  {
    title: 'Motion With Purpose',
    description: 'Animation guides attention. Movement reveals meaning.',
  },
  {
    title: 'Depth in Simplicity',
    description: 'Simple surfaces mask sophisticated systems.',
  },
]

const WORK_CARDS = [
  {
    title: 'Spatial Computing Lab',
    description: 'Exploring interaction paradigms for Vision Pro and beyond.',
    category: 'XR/VR',
  },
  {
    title: 'Generative Systems',
    description: 'AI-driven tools that augment creative workflows.',
    category: 'AI/ML',
  },
  {
    title: 'Digital Experiences',
    description: 'Immersive web experiences pushing browser boundaries.',
    category: 'Web',
  },
  {
    title: 'Design Systems',
    description: 'Scalable component architectures for growing teams.',
    category: 'Systems',
  },
]

// ============================================================================
// ROLLING TEXT COMPONENT
// ============================================================================

function RollingText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          transition: 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className="rolling-text-inner"
      >
        <span style={{ display: 'block' }}>{text}</span>
        <span style={{ display: 'block', position: 'absolute', top: '100%' }}>{text}</span>
      </span>
      <style>{`
        .rolling-text-inner:hover {
          transform: translateY(-100%);
        }
      `}</style>
    </span>
  )
}

// ============================================================================
// SPOTLIGHT SECTION COMPONENT
// ============================================================================

function SpotlightSection({
  children,
  isActive
}: {
  children: React.ReactNode
  isActive: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const smoothMousePos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (!isActive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const animate = () => {
      smoothMousePos.current.x = lerp(smoothMousePos.current.x, mousePos.current.x, CONFIG.SPOTLIGHT_LERP)
      smoothMousePos.current.y = lerp(smoothMousePos.current.y, mousePos.current.y, CONFIG.SPOTLIGHT_LERP)

      if (containerRef.current) {
        containerRef.current.style.setProperty('--spotlight-x', `${smoothMousePos.current.x}px`)
        containerRef.current.style.setProperty('--spotlight-y', `${smoothMousePos.current.y}px`)
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isActive])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        gap: '32px',
        padding: '0 48px',
        maxWidth: '1200px',
        width: '100%',
        justifyContent: 'center',
        // CSS custom properties for spotlight
        ['--spotlight-x' as string]: '50%',
        ['--spotlight-y' as string]: '50%',
      }}
    >
      {children}
    </div>
  )
}

// ============================================================================
// PHILOSOPHY CARD WITH SPOTLIGHT
// ============================================================================

function PhilosophyCard({
  title,
  description,
  isSpotlightActive
}: {
  title: string
  description: string
  isSpotlightActive: boolean
}) {
  return (
    <div
      style={{
        flex: '1 1 300px',
        maxWidth: '360px',
        padding: '32px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Base text layer (dimmed) */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 500,
          color: isSpotlightActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.9)',
          marginBottom: '12px',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          transition: 'color 0.4s ease',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: isSpotlightActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
          lineHeight: 1.6,
          letterSpacing: '-0.01em',
          transition: 'color 0.4s ease',
        }}
      >
        {description}
      </p>

      {/* Spotlight text layer (revealed by cursor) */}
      {isSpotlightActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '32px',
            background: `radial-gradient(
              ${CONFIG.SPOTLIGHT_RADIUS}px circle at var(--spotlight-x) var(--spotlight-y),
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0) 100%
            )`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            pointerEvents: 'none',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 500,
              marginBottom: '12px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              letterSpacing: '-0.01em',
            }}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Page() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)

  // State
  const [showDebug, setShowDebug] = useState(false)
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [breadcrumbText, setBreadcrumbText] = useState('')
  const [breadcrumbOpacity, setBreadcrumbOpacity] = useState(0)
  const [isPhilosophyActive, setIsPhilosophyActive] = useState(false)

  // Animation values (using refs for performance)
  const smoothScrollY = useRef(0)
  const animationFrameId = useRef<number>(0)
  const breathingPhase = useRef(0)

  // ============================================================================
  // UPDATE FUNCTIONS
  // ============================================================================

  const updateBackground = useCallback((scrollY: number, breathing: number) => {
    if (!backgroundRef.current) return

    // Parallax movement
    const parallaxY = scrollY * CONFIG.PARALLAX_BG

    // Breathing only when not locked
    const isLocked =
      (scrollY >= CONFIG.HERO_LOCK_START && scrollY < CONFIG.HERO_LOCK_END) ||
      (scrollY >= CONFIG.PHILOSOPHY_LOCK_START && scrollY < CONFIG.PHILOSOPHY_LOCK_END) ||
      (scrollY >= CONFIG.WORK_LOCK_START && scrollY < CONFIG.WORK_LOCK_END)

    const breathOffset = isLocked ? 0 : Math.sin(breathing) * CONFIG.BREATHING_AMOUNT

    backgroundRef.current.style.transform = `translateY(${-parallaxY + breathOffset}px) translateZ(0)`
  }, [])

  const updateHero = useCallback((scrollY: number) => {
    if (!heroRef.current) return

    let opacity = 0
    let blur = CONFIG.BLUR_MAX_MG
    let scale = 0.95
    let translateY = 100
    let translateX = 0

    // ENTER: Rising from below, blurry -> sharp
    if (scrollY >= CONFIG.HERO_ENTER_START && scrollY < CONFIG.HERO_ENTER_END) {
      const progress = mapRange(scrollY, CONFIG.HERO_ENTER_START, CONFIG.HERO_ENTER_END, 0, 1)
      opacity = progress
      blur = mapRange(progress, 0, 1, CONFIG.BLUR_MAX_MG, 0)
      scale = mapRange(progress, 0, 1, 0.95, 1)
      translateY = mapRange(progress, 0, 1, 100, 0)
    }
    // LOCK: Perfectly still, perfectly sharp
    else if (scrollY >= CONFIG.HERO_LOCK_START && scrollY < CONFIG.HERO_LOCK_END) {
      opacity = 1
      blur = 0
      scale = 1
      translateY = 0
    }
    // COMPRESS: Shrinking toward top-left, becoming breadcrumb
    else if (scrollY >= CONFIG.HERO_COMPRESS_START && scrollY < CONFIG.HERO_COMPRESS_END) {
      const progress = mapRange(scrollY, CONFIG.HERO_COMPRESS_START, CONFIG.HERO_COMPRESS_END, 0, 1)
      opacity = mapRange(progress, 0, 1, 1, 0)
      blur = mapRange(progress, 0, 1, 0, 2)
      scale = mapRange(progress, 0, 1, 1, CONFIG.SCALE_COMPRESSED)
      translateY = mapRange(progress, 0, 1, 0, -300)
      translateX = mapRange(progress, 0, 1, 0, -400)
    }
    // After compress: hidden
    else if (scrollY >= CONFIG.HERO_COMPRESS_END) {
      opacity = 0
    }

    heroRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) translateZ(0)`
    heroRef.current.style.opacity = String(opacity)
    heroRef.current.style.filter = `blur(${blur}px)`
  }, [])

  const updatePhilosophy = useCallback((scrollY: number) => {
    if (!philosophyRef.current) return

    let opacity = 0
    let blur = CONFIG.BLUR_MAX_MG
    let scale = 0.95
    let translateY = 150
    let translateX = 0

    // Check if philosophy is in active (locked) state for spotlight
    const isActive = scrollY >= CONFIG.PHILOSOPHY_LOCK_START && scrollY < CONFIG.PHILOSOPHY_LOCK_END
    setIsPhilosophyActive(isActive)

    // Before enter: hidden below
    if (scrollY < CONFIG.PHILOSOPHY_ENTER_START) {
      opacity = 0
      translateY = 150
    }
    // ENTER: Rising from below
    else if (scrollY >= CONFIG.PHILOSOPHY_ENTER_START && scrollY < CONFIG.PHILOSOPHY_ENTER_END) {
      const progress = mapRange(scrollY, CONFIG.PHILOSOPHY_ENTER_START, CONFIG.PHILOSOPHY_ENTER_END, 0, 1)
      opacity = progress
      blur = mapRange(progress, 0, 1, CONFIG.BLUR_MAX_MG, 0)
      scale = mapRange(progress, 0, 1, 0.95, 1)
      translateY = mapRange(progress, 0, 1, 150, 0)
    }
    // LOCK: Perfectly still
    else if (scrollY >= CONFIG.PHILOSOPHY_LOCK_START && scrollY < CONFIG.PHILOSOPHY_LOCK_END) {
      opacity = 1
      blur = 0
      scale = 1
      translateY = 0
    }
    // COMPRESS: Shrinking toward top-left
    else if (scrollY >= CONFIG.PHILOSOPHY_COMPRESS_START && scrollY < CONFIG.PHILOSOPHY_COMPRESS_END) {
      const progress = mapRange(scrollY, CONFIG.PHILOSOPHY_COMPRESS_START, CONFIG.PHILOSOPHY_COMPRESS_END, 0, 1)
      opacity = mapRange(progress, 0, 1, 1, 0)
      blur = mapRange(progress, 0, 1, 0, 2)
      scale = mapRange(progress, 0, 1, 1, CONFIG.SCALE_COMPRESSED)
      translateY = mapRange(progress, 0, 1, 0, -300)
      translateX = mapRange(progress, 0, 1, 0, -400)
    }
    // After compress: hidden
    else if (scrollY >= CONFIG.PHILOSOPHY_COMPRESS_END) {
      opacity = 0
    }

    philosophyRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) translateZ(0)`
    philosophyRef.current.style.opacity = String(opacity)
    philosophyRef.current.style.filter = `blur(${blur}px)`
  }, [])

  const updateWork = useCallback((scrollY: number) => {
    if (!workRef.current) return

    let opacity = 0
    let blur = CONFIG.BLUR_MAX_MG
    let scale = 0.95
    let translateY = 150
    let translateX = 0

    // Before enter: hidden below
    if (scrollY < CONFIG.WORK_ENTER_START) {
      opacity = 0
      translateY = 150
    }
    // ENTER: Rising from below
    else if (scrollY >= CONFIG.WORK_ENTER_START && scrollY < CONFIG.WORK_ENTER_END) {
      const progress = mapRange(scrollY, CONFIG.WORK_ENTER_START, CONFIG.WORK_ENTER_END, 0, 1)
      opacity = progress
      blur = mapRange(progress, 0, 1, CONFIG.BLUR_MAX_MG, 0)
      scale = mapRange(progress, 0, 1, 0.95, 1)
      translateY = mapRange(progress, 0, 1, 150, 0)
    }
    // LOCK: Perfectly still
    else if (scrollY >= CONFIG.WORK_LOCK_START && scrollY < CONFIG.WORK_LOCK_END) {
      opacity = 1
      blur = 0
      scale = 1
      translateY = 0
    }
    // COMPRESS: Shrinking toward top-left
    else if (scrollY >= CONFIG.WORK_COMPRESS_START && scrollY < CONFIG.WORK_COMPRESS_END) {
      const progress = mapRange(scrollY, CONFIG.WORK_COMPRESS_START, CONFIG.WORK_COMPRESS_END, 0, 1)
      opacity = mapRange(progress, 0, 1, 1, 0.7)
      blur = mapRange(progress, 0, 1, 0, 1)
      scale = mapRange(progress, 0, 1, 1, CONFIG.SCALE_COMPRESSED)
      translateY = mapRange(progress, 0, 1, 0, -300)
      translateX = mapRange(progress, 0, 1, 0, -400)
    }
    // After compress
    else if (scrollY >= CONFIG.WORK_COMPRESS_END) {
      opacity = 0.7
      blur = 1
      scale = CONFIG.SCALE_COMPRESSED
      translateY = -300
      translateX = -400
    }

    workRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) translateZ(0)`
    workRef.current.style.opacity = String(opacity)
    workRef.current.style.filter = `blur(${blur}px)`
  }, [])

  const updateBreadcrumb = useCallback((scrollY: number) => {
    let text = ''
    let opacity = 0

    if (scrollY >= CONFIG.HERO_COMPRESS_END && scrollY < CONFIG.PHILOSOPHY_COMPRESS_END) {
      text = 'Intro'
      opacity = mapRange(scrollY, CONFIG.HERO_COMPRESS_END, CONFIG.HERO_COMPRESS_END + 100, 0, 0.6)
    } else if (scrollY >= CONFIG.PHILOSOPHY_COMPRESS_END && scrollY < CONFIG.WORK_COMPRESS_END) {
      text = 'Intro · Philosophy'
      opacity = 0.6
    } else if (scrollY >= CONFIG.WORK_COMPRESS_END) {
      text = 'Intro · Philosophy · Selected Work'
      opacity = 0.6
    }

    setBreadcrumbText(text)
    setBreadcrumbOpacity(opacity)
  }, [])

  // ============================================================================
  // ANIMATION LOOP
  // ============================================================================

  const animate = useCallback(() => {
    const targetScrollY = window.scrollY
    smoothScrollY.current = lerp(smoothScrollY.current, targetScrollY, CONFIG.LERP_FACTOR)
    breathingPhase.current += CONFIG.BREATHING_SPEED * 16 // Approximate frame time

    // Update all elements
    updateBackground(smoothScrollY.current, breathingPhase.current)
    updateHero(smoothScrollY.current)
    updatePhilosophy(smoothScrollY.current)
    updateWork(smoothScrollY.current)
    updateBreadcrumb(smoothScrollY.current)

    // Update debug display
    setCurrentScrollY(Math.round(smoothScrollY.current))

    animationFrameId.current = requestAnimationFrame(animate)
  }, [updateBackground, updateHero, updatePhilosophy, updateWork, updateBreadcrumb])

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animate])

  // Debug mode toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') {
        setShowDebug(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${CONFIG.TOTAL_SCROLL_HEIGHT}px`,
        background: '#0a0a0a',
      }}
    >
      {/* Global styles for rolling text hover */}
      <style>{`
        .breadcrumb-segment {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          cursor: default;
        }
        .breadcrumb-segment .rolling-inner {
          display: inline-block;
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .breadcrumb-segment:hover .rolling-inner {
          transform: translateY(-100%);
        }
        .breadcrumb-segment .rolling-inner span {
          display: block;
        }
      `}</style>

      {/* ================================================================== */}
      {/* BACKGROUND LAYER (Z: -100 to -50) */}
      {/* ================================================================== */}
      <div
        ref={backgroundRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        {/* Lens gradient 1 */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        {/* Lens gradient 2 */}
        <div
          style={{
            position: 'absolute',
            top: '60%',
            right: '20%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Film grain texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ================================================================== */}
      {/* FOREGROUND: Fixed Nav (Anchor A) with mix-blend-mode */}
      {/* ================================================================== */}
      <div
        style={{
          position: 'fixed',
          top: '32px',
          left: '32px',
          zIndex: 100,
          mixBlendMode: 'difference',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Patrick Jørgensen
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '4px',
            letterSpacing: '-0.01em',
          }}
        >
          Creative Technologist
        </div>
      </div>

      {/* ================================================================== */}
      {/* FOREGROUND: Breadcrumb with rolling text hover */}
      {/* ================================================================== */}
      <div
        style={{
          position: 'fixed',
          top: '32px',
          right: '32px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.6)',
          zIndex: 100,
          opacity: breadcrumbOpacity,
          transition: 'opacity 0.3s ease',
          letterSpacing: '-0.01em',
        }}
      >
        {breadcrumbText.split(' · ').map((segment, index, arr) => (
          <span key={index}>
            <span className="breadcrumb-segment">
              <span className="rolling-inner">
                <span>{segment}</span>
                <span>{segment}</span>
              </span>
            </span>
            {index < arr.length - 1 && <span style={{ margin: '0 6px', opacity: 0.4 }}>·</span>}
          </span>
        ))}
      </div>

      {/* ================================================================== */}
      {/* MIDGROUND: Hero Section */}
      {/* ================================================================== */}
      <div
        ref={heroRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: 0,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(48px, 10vw, 140px)',
            fontWeight: 200,
            letterSpacing: '-0.06em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            lineHeight: 1.0,
          }}
        >
          The Unfolding
        </h1>
        <p
          style={{
            fontSize: 'clamp(12px, 1.2vw, 16px)',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '32px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore
        </p>
      </div>

      {/* ================================================================== */}
      {/* MIDGROUND: Philosophy Section with Spotlight */}
      {/* ================================================================== */}
      <div
        ref={philosophyRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: 0,
        }}
      >
        <SpotlightSection isActive={isPhilosophyActive}>
          {PHILOSOPHY_CARDS.map((card, index) => (
            <PhilosophyCard
              key={index}
              title={card.title}
              description={card.description}
              isSpotlightActive={isPhilosophyActive}
            />
          ))}
        </SpotlightSection>
      </div>

      {/* ================================================================== */}
      {/* MIDGROUND: Work Section */}
      {/* ================================================================== */}
      <div
        ref={workRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: 0,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            padding: '0 48px',
            maxWidth: '900px',
            width: '100%',
          }}
        >
          {WORK_CARDS.map((card, index) => (
            <div
              key={index}
              style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                {card.category}
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '8px',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.6,
                  letterSpacing: '-0.01em',
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* DEBUG: Focus Line */}
      {/* ================================================================== */}
      {showDebug && (
        <>
          {/* Focus line at 50vh */}
          <div
            style={{
              position: 'fixed',
              top: '50vh',
              left: 0,
              width: '100%',
              height: '1px',
              background: 'rgba(255,100,100,0.5)',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          />
          {/* Debug info */}
          <div
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '32px',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: 'rgba(255,100,100,0.8)',
              background: 'rgba(0,0,0,0.8)',
              padding: '12px 16px',
              borderRadius: '4px',
              zIndex: 1000,
            }}
          >
            <div>scrollY: {currentScrollY}px</div>
            <div style={{ marginTop: '4px', opacity: 0.6 }}>Press F to toggle debug</div>
            <div style={{ marginTop: '4px', opacity: 0.6 }}>
              Philosophy spotlight: {isPhilosophyActive ? 'ON' : 'OFF'}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
