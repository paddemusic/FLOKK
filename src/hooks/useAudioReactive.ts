import { useEffect, useRef, useState } from "react";

/**
 * useAudioReactive - Disabled to prevent microphone permission requests
 * Returns mock values for visual consistency without audio input
 */
export function useAudioReactive() {
  const [volume, setVolume] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Simulate gentle ambient motion without actual audio input
    const animate = () => {
      const time = Date.now() / 1000;
      // Gentle sine wave for ambient effect
      const mockVolume = (Math.sin(time * 0.5) + 1) * 0.15; // 0-0.3 range
      setVolume(mockVolume);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    setIsActive(true);
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsActive(false);
    };
  }, []);

  return {
    volume,
    isActive,
    normalizedVolume: volume * 100, // 0-30 range
  };
}