"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { SKILL_ICON_MAP } from "@/lib/skillIcons";

const ALL_ICONS = Object.entries(SKILL_ICON_MAP).map(([key, Icon]) => ({ key, Icon }));

interface Props {
  value: string;
  onChange: (key: string) => void;
}

export function IconPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = search.trim()
    ? ALL_ICONS.filter((i) => i.key.toLowerCase().includes(search.toLowerCase()))
    : ALL_ICONS;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const SelectedIcon = value ? SKILL_ICON_MAP[value] : null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent hover:border-border transition-colors text-left"
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon size={15} className="text-accent-alt shrink-0" />
            <span className="font-mono text-xs text-fg flex-1">{value}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="text-fg-subtle hover:text-fg transition-colors"
            >
              <X size={12} />
            </button>
          </>
        ) : (
          <span className="text-fg-subtle text-xs flex-1">No icon — click to pick</span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-bg border border-border rounded-xl shadow-xl overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border-muted">
            <Search size={13} className="text-fg-subtle shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-fg-subtle hover:text-fg">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-6 gap-0.5 p-2 max-h-52 overflow-y-auto">
            {filtered.map(({ key, Icon }) => (
              <button
                key={key}
                type="button"
                title={key}
                onClick={() => { onChange(key); setOpen(false); setSearch(""); }}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  value === key
                    ? "bg-accent/15 text-accent"
                    : "text-fg-muted hover:bg-bg-surface hover:text-fg"
                }`}
              >
                <Icon size={16} />
                <span className="font-mono text-[9px] leading-tight truncate w-full text-center">
                  {key.replace(/^(Fa|Si)/, "")}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-6 py-4 text-center text-xs text-fg-subtle">No match</p>
            )}
          </div>

          <div className="px-3 py-1.5 border-t border-border-muted">
            <p className="text-[10px] text-fg-subtle">{filtered.length} icons</p>
          </div>
        </div>
      )}
    </div>
  );
}
