"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
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
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-8 h-8 flex items-center justify-center text-fg-muted hover:text-fg transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <nav className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="font-mono text-sm font-medium text-accent hover:text-accent/80 transition-colors tracking-tight"
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
                  className="text-sm text-fg-muted hover:text-fg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden">
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
        </div>
      )}
    </>
  );
}
