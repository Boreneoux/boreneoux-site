import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-fg-subtle mb-3",
        className
      )}
    >
      {children}
    </p>
  );
}
