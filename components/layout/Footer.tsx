import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const socials = [
  { href: "https://github.com/boreneoux", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ichlasulfikri/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://instagram.com/ichlasulfikri_", icon: FaInstagram, label: "Instagram" },
  { href: "https://youtube.com/ichlaso", icon: FaYoutube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-muted py-8 px-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-fg-subtle font-mono">
          © {new Date().getFullYear()} Ichlasul Fikri
        </p>
        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-fg-subtle hover:text-fg transition-colors"
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>
        <Link
          href="/dashboard"
          className="text-xs text-fg-subtle/40 hover:text-fg-subtle transition-colors font-mono"
        >
          admin
        </Link>
      </div>
    </footer>
  );
}
