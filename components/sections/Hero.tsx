"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

const roles = ["Web Developer", "Android Developer", "Software Engineer"];

const socials = [
  { href: "https://www.linkedin.com/in/ichlasulfikri/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/boreneoux", icon: FaGithub, label: "GitHub" },
  { href: "https://instagram.com/ichlasulfikri_", icon: FaInstagram, label: "Instagram" },
  { href: "https://youtube.com/ichlaso", icon: FaYoutube, label: "YouTube" },
];

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIndex];
    const speed = deleting ? 40 : 120;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <span className="text-accent font-mono text-base md:text-lg">
      {text}
      <span className="animate-[blink_1s_step-end_infinite] border-r-2 border-accent ml-0.5" />
      <style>{`@keyframes blink { from,to{border-color:transparent} 50%{border-color:var(--accent)} }`}</style>
    </span>
  );
}

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center py-16 px-5">
      <div className="max-w-5xl mx-auto w-full">
        {/* Mobile: photo first, then text */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
          {/* Text content */}
          <motion.div
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Label */}
            <p className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
              cs graduate · full-stack engineer
            </p>

            {/* Name */}
            <div className="space-y-1">
              <h1 className="font-serif italic text-5xl md:text-7xl text-fg leading-tight tracking-tight">
                Ichlasul Fikri
              </h1>
              <p className="font-mono text-sm text-accent-alt tracking-tight">
                (Boreneoux)
              </p>
            </div>

            {/* Typewriter */}
            <div className="h-7 flex items-center">
              <Typewriter />
            </div>

            {/* Bio */}
            <p className="text-fg-muted text-base md:text-lg leading-relaxed max-w-md">
              Full-stack engineer across the delivery cycle — API design, backend
              systems, and frontend with React & Next.js. Recently shipped an
              AI-assisted fintech tool. Building things deliberately.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1">
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-accent-fg text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                View Work <ArrowRight size={15} />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border text-fg-muted text-sm font-medium hover:border-accent hover:text-accent transition-colors"
              >
                Contact
              </Link>
              <a
                href="/Resume_2026_Ichlasul_Fikri.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border-muted text-fg-subtle text-sm font-medium hover:border-border hover:text-fg-muted transition-colors"
              >
                <Download size={14} /> Resume
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 pt-2">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-fg-subtle hover:text-fg transition-colors"
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden ring-4 ring-border shadow-xl">
                <Image
                  src="/images/ichlasul.jpg"
                  alt="Ichlasul Fikri"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Subtle warm glow */}
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
