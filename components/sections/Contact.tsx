"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Copy, Check } from "lucide-react";

const EMAIL = "ichlasul.ap@gmail.com";

const socials = [
  { href: "https://www.linkedin.com/in/ichlasulfikri/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/boreneoux", icon: FaGithub, label: "GitHub" },
  { href: "https://instagram.com/ichlasulfikri_", icon: FaInstagram, label: "Instagram" },
  { href: "https://youtube.com/ichlaso", icon: FaYoutube, label: "YouTube" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-40 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-left"
        >
          {/* Label */}
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle mb-6">
            get in touch
          </p>

          {/* Headline */}
          <h2 className="font-serif italic text-[clamp(3.5rem,10vw,7rem)] text-fg leading-[0.88] tracking-tight mb-10">
            let&apos;s<br />talk.
          </h2>

          {/* Email row */}
          <div className="flex flex-col items-center md:flex-row md:items-center gap-3 mb-10">
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-base md:text-lg text-fg-muted hover:text-fg transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-surface border border-border-muted text-xs text-fg-muted hover:text-fg hover:border-border transition-colors font-mono"
              aria-label="Copy email"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-500" />
                  copied
                </>
              ) : (
                <>
                  <Copy size={12} />
                  copy
                </>
              )}
            </button>
          </div>

          {/* Divider + socials */}
          <div className="border-t border-border-muted">
            <div className="pt-6 flex items-center justify-center md:justify-start gap-5">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
