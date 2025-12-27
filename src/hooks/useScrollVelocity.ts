
import { useEffect, useState, useRef } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const rafId = useRef<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const isRunning = useRef(false);

  useEffect(() => {
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

      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        setVelocity(0);
      }, 150);

      isRunning.current = false;
    };

    const handleScroll = () => {
      if (isRunning.current) return;

      isRunning.current = true;
      rafId.current = requestAnimationFrame(updateVelocity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    };
  }, []);

  return velocity;
}
