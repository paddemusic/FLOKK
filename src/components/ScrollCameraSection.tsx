"use client";

import { useRef, useEffect, useState, Suspense, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import { ErrorBoundary } from "react-error-boundary";

// ========================================
// DESKTOP & MOBILE CONSTANTS
// Tweak these to refine camera behavior
// ========================================
const DESKTOP_SCALE = 0.72;          // Hero-level presence, 40% smaller than 1.2
const MOBILE_SCALE = 0.18;           // Compact for mobile screens

const DESKTOP_FINAL_X = 2.5;         // Right of text block
const DESKTOP_FINAL_Y = -0.5;        // Lower-right of text (frames it)
const DESKTOP_FINAL_Z = 0;           // No depth shift

const MOBILE_FINAL_X = 0;            // Centered on mobile
const MOBILE_FINAL_Y = -1.2;         // Below text on mobile
const MOBILE_FINAL_Z = 0;

const LANDING_FREEZE_PROGRESS = 0.8; // Stop all motion at 80%

interface CameraModelProps {
  scrollProgress: number;
  isMobile: boolean;
}

function CameraModel({ scrollProgress, isMobile }: CameraModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const modelUrl = "/models/scroll-camera.glb";

  // Sanity check (in development)
  useEffect(() => {
    fetch(modelUrl)
      .then(res => {
        if (!res.ok) console.error(`Failed to fetch model: ${res.status} ${res.statusText}`);
        else console.log("Model fetch check: OK");
      })
      .catch(err => console.error("Model fetch error:", err));
  }, []);
  
  const { scene } = useGLTF(modelUrl);

  useFrame(() => {
    if (meshRef.current) {
      // ========================================
      // LANDING FREEZE: Stop all motion after 80%
      // ========================================
      if (scrollProgress >= LANDING_FREEZE_PROGRESS) {
        // Camera has landed - maintain final position
        const finalRotationY = Math.PI * 2;
        const finalRotationX = -0.18;
        const finalRotationZ = 0.12;
        
        const finalScale = isMobile ? MOBILE_SCALE : DESKTOP_SCALE;
        const finalPositionX = isMobile ? MOBILE_FINAL_X : DESKTOP_FINAL_X;
        const finalPositionY = isMobile ? MOBILE_FINAL_Y : DESKTOP_FINAL_Y;
        const finalPositionZ = isMobile ? MOBILE_FINAL_Z : DESKTOP_FINAL_Z;
        
        meshRef.current.rotation.y = finalRotationY;
        meshRef.current.rotation.x = finalRotationX;
        meshRef.current.rotation.z = finalRotationZ;
        meshRef.current.position.x = finalPositionX;
        meshRef.current.position.y = finalPositionY;
        meshRef.current.position.z = finalPositionZ;
        meshRef.current.scale.setScalar(finalScale);
        return;
      }

      // ========================================
      // ACTIVE ANIMATION PHASE (0-80%)
      // ========================================
      const activeProgress = scrollProgress / LANDING_FREEZE_PROGRESS; // Normalize to 0-1
      
      // Y-axis rotation: complete full 360° by landing
      const targetRotationY = activeProgress * Math.PI * 2;
      
      // Final tilt: gradual X and Z rotation, settle by end
      const targetRotationX = activeProgress < 0.9 
        ? Math.sin(activeProgress * Math.PI) * 0.15 
        : -0.18;
      const targetRotationZ = activeProgress < 0.9 
        ? Math.cos(activeProgress * Math.PI * 0.5) * 0.08 
        : 0.12;
      
      // Vertical movement: Y from +4 (high above) to final Y (landed)
      const easeOut = 1 - Math.pow(1 - activeProgress, 3);
      const startY = 4;
      const finalY = isMobile ? MOBILE_FINAL_Y : DESKTOP_FINAL_Y;
      const targetPositionY = startY + (easeOut * (finalY - startY));
      
      // Horizontal: Desktop moves right to frame text, mobile stays centered
      // Reduce drift near end for stable landing
      const horizontalProgress = Math.min(activeProgress * 1.2, 1); // Arrive earlier
      const finalX = isMobile ? MOBILE_FINAL_X : DESKTOP_FINAL_X;
      const targetPositionX = horizontalProgress * finalX;
      
      // Depth: No Z-axis movement (keep camera on same plane as text)
      const targetPositionZ = isMobile ? MOBILE_FINAL_Z : DESKTOP_FINAL_Z;
      
      // Scale: Grow to hero-level on desktop, compact on mobile
      const targetScale = isMobile ? MOBILE_SCALE : DESKTOP_SCALE;

      // Smooth interpolation with tighter lerp near landing
      const lerpFactor = activeProgress > 0.7 ? 0.08 : 0.05;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * lerpFactor;
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * lerpFactor;
      meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * lerpFactor;
      meshRef.current.position.y += (targetPositionY - meshRef.current.position.y) * lerpFactor;
      meshRef.current.position.x += (targetPositionX - meshRef.current.position.x) * lerpFactor;
      meshRef.current.position.z += (targetPositionZ - meshRef.current.position.z) * lerpFactor;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * lerpFactor
      );
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={isMobile ? MOBILE_SCALE : DESKTOP_SCALE}
      position={[0, 4, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Preload the model
useGLTF.preload("/models/scroll-camera.glb");

function FallbackBox() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.8]} />
        <meshStandardMaterial 
          color="#FF6B6B" 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function ModelErrorFallback() {
  return <FallbackBox />;
}

interface ScrollCameraSectionProps {
  children: ReactNode;
}

export function ScrollCameraSection({ children }: ScrollCameraSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Detect mobile and WebGL support
  useEffect(() => {
    const checkMobile = window.innerWidth < 768;
    setIsMobile(checkMobile);

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      style={{ 
        position: 'relative',
        minHeight: '60vh',
        width: '100%'
      }}
    >
      {/* Sticky 3D Canvas - lives inside narrative, not above it */}
      {webGLSupported && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            pointerEvents: 'none',
            zIndex: 5,
            background: 'transparent',
          }}
        >
          <Canvas
            dpr={[1, 2]}
            shadows={false}
            gl={{ antialias: true, alpha: true }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

            {/* Clean lighting - no dramatic effects */}
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow={false}
            />
            <directionalLight
              position={[-5, 5, -5]}
              intensity={0.6}
              castShadow={false}
            />
            <pointLight position={[0, 5, 0]} intensity={0.5} />

            <Environment preset="city" />

            <Suspense fallback={<FallbackBox />}>
              <ErrorBoundary FallbackComponent={ModelErrorFallback}>
                <CameraModel 
                  scrollProgress={scrollProgress} 
                  isMobile={isMobile}
                />
              </ErrorBoundary>
            </Suspense>
          </Canvas>

          {/* Development debug only */}
          {process.env.NODE_ENV === "development" && (
            <div className="absolute bottom-2 left-2 text-brand-white/40 text-xs font-mono pointer-events-none">
              3D: {Math.round(scrollProgress * 100)}% | 
              Scale: {isMobile ? MOBILE_SCALE : DESKTOP_SCALE} | 
              FinalX: {isMobile ? MOBILE_FINAL_X : DESKTOP_FINAL_X}
            </div>
          )}
        </div>
      )}

      {/* Content scrolls naturally - camera is anchored to this surface */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}