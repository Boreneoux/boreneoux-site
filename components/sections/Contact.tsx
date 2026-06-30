"use client";

import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const socials = [
  { href: "https://www.linkedin.com/in/ichlasulfikri/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/boreneoux", icon: FaGithub, label: "GitHub" },
  { href: "https://instagram.com/ichlasulfikri_", icon: FaInstagram, label: "Instagram" },
  { href: "https://youtube.com/ichlaso", icon: FaYoutube, label: "YouTube" },
];

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <h2 className="font-serif italic text-5xl md:text-7xl text-fg">
            let&apos;s talk.
          </h2>
          <p className="text-fg-muted text-base md:text-lg max-w-sm">
            reach me at{" "}
            <a
              href="mailto:ichlasul.ap@gmail.com"
              className="text-accent hover:underline font-medium"
            >
              ichlasul.ap@gmail.com
            </a>
          </p>
          <div className="flex items-center gap-6 pt-2">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-fg-muted hover:text-fg transition-colors"
              >
                <s.icon size={22} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
