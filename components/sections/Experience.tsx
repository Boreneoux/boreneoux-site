"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTagList } from "@/components/ui/TechTag";
import type { ExperienceData } from "@/types";
import { Download } from "lucide-react";

interface ExperienceProps {
  experiences: ExperienceData[];
  resumeUrl?: string;
}

export function Experience({ experiences, resumeUrl }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>where i&apos;ve been</SectionLabel>
        <h2 className="font-serif italic text-4xl md:text-5xl text-fg mb-14">
          journey.
        </h2>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical spine */}
          <div className="absolute left-[5px] top-3 bottom-3 w-px bg-border" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-14 last:mb-0"
            >
              {/* Timeline dot — filled for work, outlined for edu */}
              <div className={`absolute -left-8 top-[5px] w-[11px] h-[11px] rounded-full border-2 transition-colors duration-300 ${
                exp.type === "edu"
                  ? "border-accent bg-bg"
                  : "border-accent-alt bg-accent-alt"
              }`} />

              {/* Content card */}
              <div className="group">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-bg-elevated ring-1 ring-border shrink-0">
                      <Image
                        src={exp.imageUrl}
                        alt={exp.company}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-semibold text-fg">{exp.company}</span>
                    <span className={`font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                      exp.type === "edu"
                        ? "text-accent border-accent/40"
                        : "text-accent-alt border-accent-alt/40"
                    }`}>
                      {exp.type === "edu" ? "edu" : "work"}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-fg-subtle shrink-0">
                    {exp.dateIn} – {exp.dateOut}
                  </span>
                </div>

                {/* Role */}
                <h3 className="font-serif italic text-lg md:text-xl text-fg mb-3 group-hover:text-accent transition-colors duration-200">
                  {exp.position}
                </h3>

                {/* Description */}
                <ul className="space-y-1.5 mb-4">
                  {exp.description.map((d, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-fg-muted leading-relaxed">
                      <span className="text-accent-alt mt-1.5 shrink-0 text-xs">◆</span>
                      {d}
                    </li>
                  ))}
                </ul>

                <TechTagList items={exp.techStack} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume CTA - placed after experiences */}
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
