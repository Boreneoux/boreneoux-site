"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#experience", label: "journey" },
  { href: "/#skills", label: "skills" },
  { href: "/work", label: "work" },
  { href: "/#contact", label: "contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = resolvedTheme === "dark";
  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 flex items-center justify-center rounded-full text-fg-muted hover:text-fg hover:bg-fg/[0.07] transition-colors cursor-pointer"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

interface NavbarProps {
  resumeUrl?: string;
}

export function Navbar({ resumeUrl }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = pathname.startsWith("/dashboard");
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isHome) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg/90 backdrop-blur-md border-b border-border-muted"
            : "bg-transparent"
        )}
      >
        {/* Scroll progress bar */}
        {isHome && (
          <div
            className="absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />
        )}

        <nav className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="font-mono text-sm font-medium text-accent hover:text-accent/70 transition-colors tracking-tight"
          >
            boreneoux
          </Link>

          {/* Desktop nav */}
          {!isDashboard && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-subtle hover:text-fg transition-colors font-mono"
                >
                  résumé
                </a>
              )}
            </div>
          )}

          {/* Right: theme + mobile menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!isDashboard && (
              <button
                className="md:hidden flex items-center justify-center w-8 h-8 text-fg-muted hover:text-fg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile menu - full screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif italic text-3xl text-fg hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-fg-muted hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              download résumé
            </a>
          )}
        </div>
      )}
    </>
  );
}
