import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { scaleOnPress } from "@/lib/motion";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "#om-meg", label: "Om meg" },
    { href: "#se-og-hor", label: "Prosjekter" },
    { href: "#bak-kameraet", label: "Bak kameraet" },
    { href: "#some-mindset", label: "SoMe-mindset" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : "-100%",
      }}
      transition={{ 
        duration: 0.28,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-brand-black/95 backdrop-blur-sm border-b border-brand-white/10" 
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection("#")}
            className="relative flex items-center hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to homepage"
          >
            <Image
              src="/964666.webp"
              alt="FLOKK MEDIA logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative text-base text-brand-white/80 hover:text-brand-white transition-colors font-medium group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-brand-red"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.22 }}
                />
              </motion.button>
            ))}
            <a
              href="tel:+4797138007"
              className="flex items-center gap-2 text-base text-brand-white/80 hover:text-brand-red transition-colors font-medium"
            >
              <Phone size={16} />
              <span>+47 971 38 007</span>
            </a>
          </div>

          <motion.button
            {...scaleOnPress}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-brand-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <motion.div
          initial={false}
          animate={{ 
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-4 pt-6 pb-4">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-base text-brand-white/80 hover:text-brand-red transition-colors text-left font-medium"
                whileHover={{ x: 8 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}