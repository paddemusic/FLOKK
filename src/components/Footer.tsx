import { motion } from "framer-motion";
import { Instagram, Youtube, Music2, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/20">
      <div className="container-custom py-8 text-center text-white/70">
        <p className="mb-1">
          Kontakt:{" "}
          <a href="mailto:contact@hellonomusic.com" className="underline underline-offset-4 hover:text-white">
            contact@hellonomusic.com
          </a>
        </p>
        <p className="mb-4">
          Telefon:{" "}
          <a href="tel:+4797138007" className="hover:text-white">+47 971 38 007</a>
        </p>
        <p className="text-white/40"><small>© 2025 Medie huset</small></p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-[#E0002B]/40 blur-md" aria-hidden="true" />
    </footer>
  );
}