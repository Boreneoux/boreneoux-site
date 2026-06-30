"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTagList } from "@/components/ui/TechTag";
import type { ExperienceData } from "@/types";

interface ExperienceProps {
  experiences: ExperienceData[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>where i&apos;ve been</SectionLabel>
        <h2 className="font-serif italic text-4xl md:text-5xl text-fg mb-12">
          journey.
        </h2>

        <div className="flex flex-col divide-y divide-border-muted">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group py-8 first:pt-0 last:pb-0 hover:bg-bg-surface -mx-4 px-4 rounded-lg transition-colors duration-200"
            >
              {/* Mobile layout */}
              <div className="flex flex-col gap-4 md:hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-bg-elevated shrink-0">
                      <Image
                        src={exp.imageUrl}
                        alt={exp.company}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-sm text-fg">{exp.company}</span>
                  </div>
                  <span className="font-mono text-xs text-fg-subtle whitespace-nowrap">
                    {exp.dateIn} – {exp.dateOut}
                  </span>
                </div>
                <h3 className="font-medium text-fg group-hover:text-accent transition-colors">
                  {exp.position}
                </h3>
                <ul className="space-y-1.5 text-sm text-fg-muted">
                  {exp.description.map((d, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-accent-alt mt-1.5 shrink-0">·</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <TechTagList items={exp.techStack} />
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-[200px_1fr_120px] gap-8 items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-bg-elevated shrink-0">
                    <Image
                      src={exp.imageUrl}
                      alt={exp.company}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-sm text-fg">{exp.company}</span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-fg group-hover:text-accent transition-colors">
                    {exp.position}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-fg-muted">
                    {exp.description.map((d, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-accent-alt mt-1.5 shrink-0">·</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <TechTagList items={exp.techStack} />
                </div>

                <div className="text-right">
                  <p className="font-mono text-xs text-fg-subtle">{exp.dateIn}</p>
                  <p className="font-mono text-xs text-fg-subtle">{exp.dateOut}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
