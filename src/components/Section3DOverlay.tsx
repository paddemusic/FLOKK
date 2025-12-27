"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

interface Section3DOverlayProps {
  modelPath: string;
  sectionId?: string;
  position?: [number, number, number];
  scale?: number;
  mobileScale?: number;
  rotation?: [number, number, number];
  floatSpeed?: number;
  floatIntensity?: number;
  scrollAnimation?: boolean;
}

/**
 * Section3DOverlay: Reusable 3D decoration component
 * 
 * CRITICAL CONSTRAINTS:
 * - ALWAYS pointer-events: none (purely decorative)
 * - ALWAYS position: absolute within section bounds
 * - NEVER position: fixed or sticky
 * - NEVER applies transforms/filters to parent
 * - Responsive: smaller scale and simpler motion on mobile
 * 
 * STRICT NO-TOUCH ZONES:
 * - NEVER use this near Spotify sections
 * - NEVER wrap Spotify iframes
 * - NEVER modify SeOgHorSectionPart1/Part2
 */

interface ModelProps {
  path: string;
  position: [number, number, number];
  scale: number;
  rotation?: [number, number, number];
  floatSpeed?: number;
  floatIntensity?: number;
  scrollAnimation?: boolean;
}

function Model({ 
  path, 
  position, 
  scale, 
  rotation = [0, 0, 0], 
  floatSpeed = 1, 
  floatIntensity = 0.5,
  scrollAnimation = false 
}: ModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!scrollAnimation) return;

    let rafId: number | null = null;
    let isRunning = false;

    const updateScrollY = () => {
      setScrollY(window.scrollY);
      isRunning = false;
    };

    const handleScroll = () => {
      if (isRunning) return;

      isRunning = true;
      rafId = requestAnimationFrame(updateScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollAnimation]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle ambient rotation
      meshRef.current.rotation.y += 0.003;
      
      // Scroll-based entrance animation
      if (scrollAnimation) {
        const scrollProgress = Math.min(scrollY / 800, 1);
        meshRef.current.position.y = position[1] - (1 - scrollProgress) * 3;
        meshRef.current.rotation.x = rotation[0] + (1 - scrollProgress) * Math.PI;
      } else {
        // Subtle float motion
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * floatIntensity;
      }
    }
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.2}
      floatIntensity={floatIntensity}
    >
      <primitive
        ref={meshRef}
        object={scene.clone()}
        position={position}
        scale={scale}
        rotation={rotation}
      />
    </Float>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return null;
}

function Scene({ 
  modelPath, 
  position, 
  scale, 
  rotation, 
  floatSpeed, 
  floatIntensity,
  scrollAnimation 
}: Section3DOverlayProps) {
  return (
    <Suspense fallback={null}>
      <CameraController />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ff6b6b" />
      
      {/* 3D Model */}
      <Model
        path={modelPath}
        position={position || [0, 0, 0]}
        scale={scale || 0.5}
        rotation={rotation}
        floatSpeed={floatSpeed}
        floatIntensity={floatIntensity}
        scrollAnimation={scrollAnimation}
      />
    </Suspense>
  );
}

/**
 * Section3DOverlay Component
 * 
 * Usage:
 * <section style={{ position: "relative" }}>
 *   <Section3DOverlay 
 *     modelPath="/models/Camera.glb"
 *     position={[2, 0, 0]}
 *     scale={0.5}
 *     scrollAnimation
 *   />
 *   <div>Your section content...</div>
 * </section>
 */
export function Section3DOverlay({
  modelPath,
  position = [0, 0, 0],
  scale = 0.5,
  mobileScale,
  rotation = [0, 0, 0],
  floatSpeed = 1,
  floatIntensity = 0.5,
  scrollAnimation = false,
}: Section3DOverlayProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted || typeof window === 'undefined') return null;

  const finalScale = isMobile ? (mobileScale || scale * 0.6) : scale;

  return (
    <div 
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene
          modelPath={modelPath}
          position={position}
          scale={finalScale}
          rotation={rotation}
          floatSpeed={floatSpeed}
          floatIntensity={floatIntensity}
          scrollAnimation={scrollAnimation}
        />
      </Canvas>
    </div>
  );
}

// Preload common models
useGLTF.preload("/models/15._Movie_Camera.glb");
useGLTF.preload("/models/Camera.glb");
useGLTF.preload("/models/02_Classic_SLR_Camera.glb");