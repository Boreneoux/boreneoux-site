import { ExternalLink, BookOpen, FileText } from "lucide-react";
import { FaGithub, FaYoutube, FaAppStoreIos } from "react-icons/fa";
import { SiGoogleplay, SiFigma } from "react-icons/si";
import type { PortfolioLink, PortfolioLinkType } from "@/types";

const LINK_CONFIG: Record<
  PortfolioLinkType,
  {
    icon: React.ElementType;
    label: string;
    /** true = filled primary style, false = ghost/border style */
    primary: boolean;
  }
> = {
  live:      { icon: ExternalLink,  label: "Live Demo",    primary: true  },
  github:    { icon: FaGithub,      label: "GitHub",       primary: false },
  appstore:  { icon: FaAppStoreIos, label: "App Store",    primary: false },
  playstore: { icon: SiGoogleplay,  label: "Google Play",  primary: false },
  youtube:   { icon: FaYoutube,     label: "Watch Demo",   primary: false },
  figma:     { icon: SiFigma,       label: "Figma",        primary: false },
  docs:      { icon: FileText,      label: "Docs",         primary: false },
};

interface ProjectLinksProps {
  links: PortfolioLink[];
  /** "header" = compact pills near title, "footer" = larger end-of-article CTAs */
  variant?: "header" | "footer";
}

export function ProjectLinks({ links, variant = "header" }: ProjectLinksProps) {
  if (!links.length) return null;

  // Primary (live/demo) first, then the rest
  const sorted = [
    ...links.filter((l) => LINK_CONFIG[l.type]?.primary),
    ...links.filter((l) => !LINK_CONFIG[l.type]?.primary),
  ];

  if (variant === "footer") {
    return (
      <div className="mt-14 pt-10 border-t border-border-muted">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle mb-5">
          explore this project
        </p>
        <div className="flex flex-wrap gap-3">
          {sorted.map((link, i) => {
            const cfg = LINK_CONFIG[link.type] ?? LINK_CONFIG.live;
            const Icon = cfg.icon;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  cfg.primary
                    ? "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-accent transition-colors"
                    : "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-fg-muted text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                }
              >
                <Icon size={15} />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Header variant - compact pills
  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map((link, i) => {
        const cfg = LINK_CONFIG[link.type] ?? LINK_CONFIG.live;
        const Icon = cfg.icon;
        return (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              cfg.primary
                ? "inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-fg text-bg text-sm font-medium hover:bg-accent transition-colors"
                : "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-fg-muted text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            }
          >
            <Icon size={13} />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
