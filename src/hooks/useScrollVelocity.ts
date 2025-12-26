
import { useEffect, useState, useRef } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    let rafId: number;
    let timeoutId: NodeJS.Timeout;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      const distance = Math.abs(currentScrollY - lastScrollY.current);
      const time = currentTime - lastTimestamp.current;
      
      if (time > 0) {
        const newVelocity = Math.min(distance / time, 5);
        setVelocity(newVelocity);
      }
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVelocity(0);
      }, 150);
    };

    const handleScroll = () => {
      rafId = requestAnimationFrame(updateVelocity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return velocity;
}
