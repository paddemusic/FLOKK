
import { useEffect } from "react";

export function useMotionSync() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-fade],[data-rise]");
    const reveal = () => {
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        if (inView) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, []);
}
  