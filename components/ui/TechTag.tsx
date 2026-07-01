import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaNodeJs,
  FaGithub, FaLinux, FaDatabase,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiPostman, SiKotlin, SiNestjs,
  SiPrisma, SiAndroid, SiDotnet, SiExpress, SiPostgresql, SiChakraui,
  SiNextdotjs, SiMysql, SiPhp, SiTensorflow, SiStorybook,
  SiJenkins, SiSqlite, SiDocker, SiCodeigniter, SiGit,
} from "react-icons/si";

// Keyed by lowercase tech name for case-insensitive lookup
const ICON_MAP: Record<string, ElementType> = {
  // Web fundamentals
  html: FaHtml5,
  html5: FaHtml5,
  css: FaCss3Alt,
  css3: FaCss3Alt,
  javascript: FaJs,
  js: FaJs,

  // Frontend frameworks
  react: FaReact,
  reactjs: FaReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  "tailwind css": SiTailwindcss,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  "chakra ui": SiChakraui,
  chakraui: SiChakraui,
  chakra: SiChakraui,
  storybook: SiStorybook,
  "storybook js": SiStorybook,

  // Backend
  "node.js": FaNodeJs,
  nodejs: FaNodeJs,
  "express.js": SiExpress,
  express: SiExpress,
  nestjs: SiNestjs,
  prisma: SiPrisma,
  jwt: FaDatabase,

  // Databases
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  sqlite: SiSqlite,
  sqlserver: FaDatabase,
  "sql server": FaDatabase,

  // Languages
  typescript: SiTypescript,
  kotlin: SiKotlin,
  php: SiPhp,
  "c#": SiDotnet,
  ".net": SiDotnet,

  // Mobile
  android: SiAndroid,
  "android sdk": SiAndroid,
  "jetpack compose": SiAndroid,

  // AI / ML
  tensorflow: SiTensorflow,
  "tensorflow.js": SiTensorflow,

  // DevOps / Tools
  git: SiGit,
  github: FaGithub,
  linux: FaLinux,
  docker: SiDocker,
  jenkins: SiJenkins,
  postman: SiPostman,
  figma: FaFigma,
  codeigniter: SiCodeigniter,
  codeigniter4: SiCodeigniter,
};

function getTechIcon(name: string): ElementType | undefined {
  return ICON_MAP[name.toLowerCase()];
}

interface TechTagProps {
  name: string;
  className?: string;
}

export function TechTag({ name, className }: TechTagProps) {
  const Icon = getTechIcon(name);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded",
        "bg-bg-surface text-accent-alt border border-border-muted",
        "hover:border-border hover:text-fg transition-colors",
        className
      )}
    >
      {Icon && <Icon size={11} className="shrink-0 opacity-80" />}
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
        <span className="font-mono text-xs px-2 py-0.5 text-fg-subtle self-center">
          +{remaining}
        </span>
      )}
    </div>
  );
}
