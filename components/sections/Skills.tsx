"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { SkillData } from "@/types";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaNodeJs, FaGithub, FaLinux, FaDatabase,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiPostman, SiKotlin, SiNestjs, SiPrisma,
  SiAndroid, SiDotnet, SiExpress, SiPostgresql, SiChakraui,
} from "react-icons/si";

const ICON_MAP: Record<string, React.ElementType> = {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaNodeJs, FaGithub, FaLinux, FaDatabase,
  SiTypescript, SiTailwindcss, SiPostman, SiKotlin, SiNestjs, SiPrisma,
  SiAndroid, SiDotnet, SiExpress, SiPostgresql, SiChakraui,
};

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  tools: "Tools & Others",
};

const CATEGORY_ORDER = ["frontend", "backend", "mobile", "tools"];

interface SkillsProps {
  skills: SkillData[];
}

export function Skills({ skills }: SkillsProps) {
  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat).sort((a, b) => a.order - b.order);
      return acc;
    },
    {} as Record<string, SkillData[]>
  );

  return (
    <section id="skills" className="py-16 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>what i work with</SectionLabel>
        <h2 className="font-serif italic text-4xl md:text-5xl text-fg mb-12">
          skills.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORY_ORDER.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="space-y-4"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent-alt">
                {CATEGORY_LABELS[cat]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {grouped[cat].map((skill) => {
                  const Icon = ICON_MAP[skill.icon];
                  return (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-surface border border-border-muted text-sm text-fg-muted hover:text-fg hover:border-border transition-colors"
                    >
                      {Icon && <Icon size={14} className="text-accent shrink-0" />}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
