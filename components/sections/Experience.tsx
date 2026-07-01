"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTagList } from "@/components/ui/TechTag";
import type { ExperienceData } from "@/types";
import { Download } from "lucide-react";

interface ExperienceProps {
  experiences: ExperienceData[];
  resumeUrl?: string;
}

function MapCard({ exp, step }: { exp: ExperienceData; step: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="relative group p-5 rounded-2xl border border-border-muted bg-bg-surface hover:border-border transition-colors duration-200 w-full"
    >
      {/* Company meta row — no date here so name never needs truncation */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`font-mono text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 ${
          exp.type === "edu"
            ? "border-accent text-accent"
            : "border-accent-alt text-accent-alt"
        }`}>
          {step}
        </span>
        <div className="w-6 h-6 rounded-full overflow-hidden bg-bg-elevated ring-1 ring-border shrink-0">
          <Image
            src={exp.imageUrl}
            alt={exp.company}
            width={24}
            height={24}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs font-semibold text-fg">{exp.company}</span>
        <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded border shrink-0 ${
          exp.type === "edu"
            ? "text-accent border-accent/40"
            : "text-accent-alt border-accent-alt/40"
        }`}>
          {exp.type === "edu" ? "edu" : "work"}
        </span>
      </div>

      {/* Position title + date as subtitle */}
      <h3 className="font-serif italic text-base md:text-lg text-fg group-hover:text-accent transition-colors duration-200 leading-snug">
        {exp.position}
      </h3>
      <p className="font-mono text-[10px] text-fg-subtle mb-3 mt-0.5">
        {exp.dateIn} – {exp.dateOut}
      </p>

      {exp.description.length > 0 && (
        <ul className="space-y-1 mb-3">
          {exp.description.map((d, j) => (
            <li key={j} className="flex gap-2 text-xs text-fg-muted leading-relaxed">
              <span className="text-accent-alt mt-1 shrink-0 text-[8px]">◆</span>
              {d}
            </li>
          ))}
        </ul>
      )}

      <TechTagList items={exp.techStack} />
    </motion.div>
  );
}

// Width of the gap div between the two card columns (must match w-20 = 80px)
const GAP_W = 80;
// Horizontal padding on each row div (must match px-8 = 32px) — creates visible
// space at outer edges so the arc corners aren't hidden under card backgrounds
const ROW_PADDING = 32;
// Corner radius for smooth road-like turns
const CORNER_R = 64;

/**
 * Builds an SVG path that snakes across all experience rows like a road:
 * - Horizontal at each row's center Y (goes through both cards and the gap)
 * - Smooth quadratic-bezier corner at the outer edge between rows
 * - Parts hidden under card backgrounds; only gap + outer-edge segments are visible
 */
function buildRoadPath(
  W: number,
  rowCenterYs: number[],
  pairs: [ExperienceData, ExperienceData | null][]
): string {
  if (!rowCenterYs.length) return "";

  const R = CORNER_R;
  // Right edge of the left card column
  const leftColRight = (W - GAP_W) / 2;

  const parts: string[] = [];

  // Start 2px inside the card so the stroke's 1.25px bleed is hidden under bg
  const INSET = 2;
  parts.push(`M ${ROW_PADDING + INSET} ${rowCenterYs[0]}`);

  for (let i = 0; i < rowCenterYs.length; i++) {
    const y = rowCenterYs[i];
    const nextY = rowCenterYs[i + 1];
    const reversed = i % 2 === 1;
    const isLastRow = i === rowCenterYs.length - 1;
    const hasRightCard = pairs[i]?.[1] !== null;

    if (reversed) {
      // Row goes R→L: arrived at (W-R, y) from the previous right arc
      if (isLastRow && !hasRightCard) {
        // Lone right card (unusual edge case) — end inside the right column
        parts.push(`H ${leftColRight + GAP_W + INSET}`);
      } else {
        // Full row: go left to the left outer edge approach
        parts.push(`H ${R}`);
      }
      if (!isLastRow && nextY !== undefined) {
        // Left arc: curve down to next row
        parts.push(`Q 0 ${y} 0 ${y + R}`);
        parts.push(`V ${nextY - R}`);
        parts.push(`Q 0 ${nextY} ${R} ${nextY}`);
      }
    } else {
      // Row goes L→R: arrived at (0, y) [first row] or (R, y) [after left arc]
      if (isLastRow && !hasRightCard) {
        // Lone left card — end 2px inside the card edge so stroke bleed is hidden
        parts.push(`H ${leftColRight - INSET}`);
      } else {
        // Full row: go right to the right outer edge approach
        parts.push(`H ${W - R}`);
      }
      if (!isLastRow && nextY !== undefined) {
        // Right arc: curve down to next row
        parts.push(`Q ${W} ${y} ${W} ${y + R}`);
        parts.push(`V ${nextY - R}`);
        parts.push(`Q ${W} ${nextY} ${W - R} ${nextY}`);
      }
    }
  }

  return parts.join(" ");
}

export function Experience({ experiences, resumeUrl }: ExperienceProps) {
  const pairs = useMemo<[ExperienceData, ExperienceData | null][]>(() => {
    const result: [ExperienceData, ExperienceData | null][] = [];
    for (let i = 0; i < experiences.length; i += 2) {
      result.push([experiences[i], experiences[i + 1] ?? null]);
    }
    return result;
  }, [experiences]);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svgPath, setSvgPath] = useState("");

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();
      const W = cRect.width;

      const rowYs = rowRefs.current
        .slice(0, pairs.length)
        .map((r) => {
          if (!r) return null;
          const rect = r.getBoundingClientRect();
          return rect.top + rect.height / 2 - cRect.top;
        })
        .filter((y): y is number => y !== null);

      setSvgPath(buildRoadPath(W, rowYs, pairs));
    }

    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [pairs]);

  return (
    <section id="experience" className="py-16 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>where i&apos;ve been</SectionLabel>
        <h2 className="font-serif italic text-4xl md:text-5xl text-fg mb-14">
          journey.
        </h2>

        {/* ── Mobile: single column timeline ── */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-[5px] top-3 bottom-3 w-px bg-border" />
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative mb-10 last:mb-0"
            >
              <div className={`absolute -left-8 top-[5px] w-[11px] h-[11px] rounded-full border-2 ${
                exp.type === "edu" ? "border-accent bg-bg" : "border-accent-alt bg-accent-alt"
              }`} />
              <MapCard exp={exp} step={i + 1} />
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: 2-column game map snake ── */}
        <div ref={containerRef} className="hidden md:block relative">
          {/* Road line SVG — single continuous path across all rows.
              Visible only in the gap between cards and at outer-edge arc turns;
              hidden under card backgrounds (bg-bg-surface + z-10). */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none text-accent-alt"
            overflow="visible"
            aria-hidden
          >
            <path
              d={svgPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="14 7"
              strokeLinecap="round"
            />
          </svg>

          {pairs.map(([a, b], rowIndex) => {
            const reversed  = rowIndex % 2 === 1;
            const leftItem  = reversed ? b  : a;
            const rightItem = reversed ? a  : b;
            const leftStep  = reversed ? rowIndex * 2 + 2 : rowIndex * 2 + 1;
            const rightStep = reversed ? rowIndex * 2 + 1 : rowIndex * 2 + 2;
            const isLastRow = rowIndex === pairs.length - 1;

            return (
              <div key={rowIndex}>
                {/* Row div — measured to get center Y for the SVG path.
                    px-8 creates a visible margin so outer-edge arc turns
                    are not hidden under the card backgrounds. */}
                <div
                  ref={(el) => { rowRefs.current[rowIndex] = el; }}
                  className="flex items-center px-8"
                >
                  {/* Left card — z-10 so it sits above the SVG road line */}
                  <div className="flex-1 relative z-10">
                    {leftItem && <MapCard exp={leftItem} step={leftStep} />}
                  </div>

                  {/* Gap — the road line is visible here as dashed connector */}
                  <div className="flex-shrink-0 w-20" />

                  {/* Right card — z-10 so it sits above the SVG road line */}
                  <div className="flex-1 relative z-10">
                    {rightItem && <MapCard exp={rightItem} step={rightStep} />}
                  </div>
                </div>

                {/* Vertical spacer between rows — gives the arc room to breathe */}
                {!isLastRow && <div className="h-16" />}
              </div>
            );
          })}
        </div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 pt-10 border-t border-border-muted"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl bg-bg-surface border border-border-muted">
            <div>
              <p className="text-sm font-medium text-fg mb-1">Want the full picture?</p>
              <p className="text-sm text-fg-muted">
                Grab my resume - covers everything above in one page.
              </p>
            </div>
            {resumeUrl && (
              <a
                href={resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-accent transition-colors shrink-0"
              >
                <Download size={14} />
                Download Resume
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
