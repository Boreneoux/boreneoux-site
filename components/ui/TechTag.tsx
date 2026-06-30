import { cn } from "@/lib/utils";

interface TechTagProps {
  name: string;
  className?: string;
}

export function TechTag({ name, className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-xs px-2 py-0.5 rounded",
        "bg-bg-surface text-accent-alt border border-border-muted",
        className
      )}
    >
      {name}
    </span>
  );
}

export function TechTagList({
  items,
  max,
}: {
  items: string[];
  max?: number;
}) {
  const visible = max ? items.slice(0, max) : items;
  const remaining = max ? items.length - max : 0;
  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((item) => (
        <TechTag key={item} name={item} />
      ))}
      {remaining > 0 && (
        <span className="font-mono text-xs px-2 py-0.5 text-fg-subtle">
          +{remaining}
        </span>
      )}
    </div>
  );
}
