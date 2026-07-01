"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
    const speed = deleting ? 40 : 110;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) {
          setTimeout(() => setDeleting(true), 1800);
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
    <span className="text-accent font-mono text-sm md:text-base">
      {text}
      <span className="animate-[blink_1s_step-end_infinite] border-r-2 border-accent ml-0.5" />
      <style>{`@keyframes blink{from,to{border-color:transparent}50%{border-color:var(--accent)}}`}</style>
    </span>
  );
}

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-14 px-5">
      <div className="max-w-5xl mx-auto w-full">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 inline-flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-fg-muted tracking-wide">open to opportunities</span>
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col md:flex-row md:items-end gap-12 md:gap-16">
          {/* Text block */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Monospace label */}
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle mb-4">
              cs graduate · full-stack engineer
            </p>

            {/* Display name — editorial, large */}
            <div className="mb-5">
              <h1 className="font-serif italic leading-[0.88] tracking-tight text-fg">
                <span className="block text-[clamp(3.5rem,10vw,6.5rem)]">Ichlasul</span>
                <span className="block text-[clamp(3.5rem,10vw,6.5rem)]">Fikri.</span>
              </h1>
              <p className="font-mono text-xs text-accent-alt mt-2 tracking-widest">
                ↳ Boreneoux
              </p>
            </div>

            {/* Typewriter */}
            <div className="flex items-center gap-2 h-6 mb-6">
              <span className="text-fg-subtle text-sm font-mono">currently:</span>
              <Typewriter />
            </div>

            {/* Bio */}
            <p className="text-fg-muted text-base leading-relaxed max-w-[38ch] mb-8">
              Full-stack engineer across the delivery cycle — API design, backend
              systems, and frontend with React & Next.js. Recently shipped an
              AI-assisted fintech tool. Building things deliberately.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-accent transition-colors duration-200"
              >
                View Work <ArrowRight size={14} />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-fg-muted text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200"
              >
                Contact
              </Link>
              <a
                href="/Resume_2026_Ichlasul_Fikri.pdf"
                download
                className="inline-flex items-center gap-1.5 text-sm text-fg-subtle hover:text-accent transition-colors font-mono group"
              >
                resume.pdf
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center md:justify-start gap-6">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-fg-muted hover:text-fg transition-colors"
                >
                  <s.icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Photo — portrait with decorative frame */}
          <motion.div
            className="flex-shrink-0 self-center md:self-end"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Decorative offset border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-accent/40 pointer-events-none" />
              {/* Decorative corner accent */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent-alt/60 rounded-tl-sm pointer-events-none" />

              {/* Photo */}
              <div className="relative w-52 h-[17rem] sm:w-60 sm:h-[20rem] md:w-64 md:h-[21rem] rounded-2xl overflow-hidden bg-bg-surface">
                <Image
                  src="/images/ichlasul.jpg"
                  alt="Ichlasul Fikri"
                  fill
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 240px, 256px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
