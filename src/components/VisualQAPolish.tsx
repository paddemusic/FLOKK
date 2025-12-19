
import { useEffect } from "react";

export function VisualQAPolish() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.background = "#0a0a0a";
    document.body.style.color = "#f5f5f5";
  }, []);

  return (
    <style jsx global>{`
      h1, h2, h3, h4 {
        letter-spacing: -0.015em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      p {
        color: #d0d0d0;
        line-height: 1.6;
      }

      button, .btn {
        transition: all 0.25s ease;
        border-radius: 8px;
      }
      button:hover, .btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(224, 0, 43, 0.4);
      }

      section {
        max-width: 1280px;
        margin: 0 auto;
        padding: 6rem 1.5rem;
        position: relative;
        z-index: 1;
      }

      nav {
        backdrop-filter: blur(6px);
        background: rgba(10, 10, 10, 0.85);
      }
      nav a {
        color: #f0f0f0;
        transition: color 0.25s ease;
      }
      nav a:hover {
        color: var(--brand-red, #E0002B);
      }

      footer {
        padding: 3rem 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        color: #999;
        text-align: center;
        font-size: 0.85rem;
      }
      footer a {
        color: var(--brand-red, #E0002B);
      }

      img {
        image-rendering: auto;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      [data-motion] {
        transition: all 0.3s ease-in-out;
      }
    `}</style>
  );
}

export default VisualQAPolish;
  