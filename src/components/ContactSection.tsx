import { motion } from "framer-motion";
import { fadeUpStagger, scaleOnPress } from "@/lib/motion";
import { Mail, Instagram, Youtube, Music, Linkedin } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-black relative overflow-hidden">
      <div className="container-custom max-w-5xl relative z-10">
        <motion.div {...fadeUpStagger} className="text-center mb-16">
          <h2 className="mb-4">Contact — keep it simple</h2>
          <p className="text-brand-white/60">
            Email is best. If it’s easier, book a short call — we’ll align quickly and decide next steps.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-brand-white/80 mb-2"
                >
                  <small>Name</small>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-lg text-brand-white placeholder-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-brand-white/80 mb-2"
                >
                  <small>Email</small>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-lg text-brand-white placeholder-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-transparent transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-medium text-brand-white/80 mb-2"
                >
                  <small>Message</small>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-lg text-brand-white placeholder-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-transparent transition-all resize-none"
                  placeholder="What are you building / hiring for?"
                />
              </div>

              <motion.button
                type="submit"
                {...scaleOnPress}
                className="w-full px-8 py-4 bg-brand-red text-brand-white font-semibold rounded-lg hover:bg-brand-red/90 transition-colors shadow-lg shadow-brand-red/20"
              >
                Send message
              </motion.button>

              <div className="text-center text-sm text-brand-white/50">
                Prefer scheduling?{" "}
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-brand-white/70 transition-colors"
                >
                  Book a short call
                </a>
              </div>
            </form>
          </motion.div>

          <motion.div
            {...fadeUpStagger}
            transition={{ ...fadeUpStagger.transition, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h4 className="font-semibold mb-6 text-brand-white">
                Kontaktinformasjon
              </h4>
              
              <div className="space-y-4">
                <a
                  href="mailto:contact@hellonomusic.com"
                  className="flex items-center gap-3 text-brand-white/70 hover:text-brand-red transition-colors group"
                >
                  <Mail size={20} className="text-brand-red" />
                  <span className="group-hover:underline">contact@hellonomusic.com</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-brand-white">
                Sosiale medier
              </h4>
              
              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/p4trickofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-white/70 hover:text-brand-red transition-colors group"
                >
                  <Instagram size={20} className="text-brand-red" />
                  <span className="group-hover:underline">Instagram @p4trickofficial</span>
                </a>

                <a
                  href="https://www.youtube.com/patrickjorgensen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-white/70 hover:text-brand-red transition-colors group"
                >
                  <Youtube size={20} className="text-brand-red" />
                  <span className="group-hover:underline">YouTube</span>
                </a>

                <a
                  href="https://open.spotify.com/artist/5IdCpGeu22vX9cXMCdpGWp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-white/70 hover:text-brand-red transition-colors group"
                >
                  <Music size={20} className="text-brand-red" />
                  <span className="group-hover:underline">Spotify</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/paddemusic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-white/70 hover:text-brand-red transition-colors group"
                >
                  <Linkedin size={20} className="text-brand-red" />
                  <span className="group-hover:underline">LinkedIn</span>
                </a>
              </div>
            </div>

            <motion.div
              className="pt-8 border-t border-brand-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-brand-white/40 leading-relaxed">
                <small>
                  Trenger du å komme i kontakt raskt? Send en e-post eller en melding på Instagram, så svarer jeg så snart som mulig.
                </small>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}