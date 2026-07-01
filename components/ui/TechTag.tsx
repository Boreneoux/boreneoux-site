import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { SKILL_ICON_MAP } from "@/lib/skillIcons";

// Maps common tech names (lowercase) to icon keys in SKILL_ICON_MAP
const NAME_TO_KEY: Record<string, string> = {
  // Web fundamentals
  html: "FaHtml5", html5: "FaHtml5",
  css: "FaCss3Alt", css3: "FaCss3Alt",
  javascript: "FaJs", js: "FaJs",
  typescript: "SiTypescript", ts: "SiTypescript",

  // Frontend frameworks
  react: "FaReact", reactjs: "FaReact", "react.js": "FaReact",
  "next.js": "SiNextdotjs", nextjs: "SiNextdotjs", next: "SiNextdotjs",
  vue: "SiVuedotjs", "vue.js": "SiVuedotjs", vuejs: "SiVuedotjs",
  nuxt: "SiNuxt", "nuxt.js": "SiNuxt", nuxtjs: "SiNuxt",
  angular: "SiAngular",
  svelte: "SiSvelte",
  astro: "SiAstro",
  gatsby: "SiGatsby",
  solid: "SiSolid", solidjs: "SiSolid", "solid.js": "SiSolid",
  remix: "SiRemix",

  // Frontend libs & styling
  tailwind: "SiTailwindcss", tailwindcss: "SiTailwindcss", "tailwind css": "SiTailwindcss",
  sass: "SiSass", scss: "SiSass",
  "styled-components": "SiStyledcomponents", "styled components": "SiStyledcomponents",
  chakra: "SiChakraui", "chakra ui": "SiChakraui", chakraui: "SiChakraui",
  redux: "SiRedux",
  "react query": "SiReactquery", "tanstack query": "SiReactquery", "react-query": "SiReactquery",
  storybook: "SiStorybook",
  "three.js": "SiThreedotjs", threejs: "SiThreedotjs",
  "d3.js": "SiD3", d3: "SiD3",
  "chart.js": "SiChartdotjs", chartjs: "SiChartdotjs",

  // Backend frameworks
  "node.js": "FaNodeJs", nodejs: "FaNodeJs", node: "FaNodeJs",
  express: "SiExpress", "express.js": "SiExpress",
  nestjs: "SiNestjs", "nest.js": "SiNestjs",
  fastapi: "SiFastapi",
  django: "SiDjango",
  flask: "SiFlask",
  laravel: "SiLaravel",
  spring: "SiSpring", "spring boot": "SiSpring",
  ".net": "SiDotnet", "asp.net": "SiDotnet", dotnet: "SiDotnet",
  prisma: "SiPrisma",

  // Languages
  python: "FaPython",
  java: "FaJava",
  kotlin: "SiKotlin",
  go: "SiGo", golang: "SiGo",
  rust: "SiRust",
  "c++": "SiCplusplus", cpp: "SiCplusplus",
  php: "SiPhp",
  swift: "FaSwift",
  dart: "SiDart",
  solidity: "SiSolidity",

  // Databases
  postgresql: "SiPostgresql", postgres: "SiPostgresql",
  mysql: "SiMysql",
  mongodb: "SiMongodb", mongo: "SiMongodb",
  sqlite: "SiSqlite",
  redis: "SiRedis",
  firebase: "SiFirebase",
  supabase: "SiSupabase",
  elasticsearch: "SiElastic", elastic: "SiElastic",

  // Mobile & cross-platform
  android: "SiAndroid", "android sdk": "SiAndroid", "jetpack compose": "SiAndroid",
  flutter: "SiFlutter",
  ionic: "SiIonic",
  expo: "SiExpo",
  capacitor: "SiCapacitor",
  electron: "SiElectron",

  // Cloud & DevOps
  docker: "SiDocker",
  kubernetes: "SiKubernetes", k8s: "SiKubernetes",
  terraform: "SiTerraform",
  jenkins: "SiJenkins",
  aws: "FaAws", "amazon web services": "FaAws",
  gcp: "SiGooglecloud", "google cloud": "SiGooglecloud",
  digitalocean: "SiDigitalocean",
  cloudflare: "SiCloudflare",
  netlify: "SiNetlify",
  vercel: "SiVercel",
  nginx: "SiNginx",

  // Version control
  git: "SiGit",
  github: "FaGithub",
  gitlab: "SiGitlab",
  bitbucket: "SiBitbucket",

  // Build tools & package managers
  npm: "SiNpm",
  yarn: "SiYarn",
  pnpm: "SiPnpm",
  webpack: "SiWebpack",
  vite: "SiVite",
  gradle: "SiGradle",
  eslint: "SiEslint",
  prettier: "SiPrettier",
  postman: "SiPostman",

  // Testing
  jest: "SiJest",
  cypress: "SiCypress",

  // AI / ML
  tensorflow: "SiTensorflow", "tensorflow.js": "SiTensorflow",
  pytorch: "SiPytorch",
  "hugging face": "SiHuggingface", huggingface: "SiHuggingface",
  jupyter: "SiJupyter",

  // APIs & messaging
  graphql: "SiGraphql",
  apollo: "SiApollographql", "apollo graphql": "SiApollographql",
  rabbitmq: "SiRabbitmq",
  kafka: "SiApachekafka", "apache kafka": "SiApachekafka",

  // Payments
  stripe: "SiStripe",

  // Project management
  jira: "SiJira",
  confluence: "SiConfluence",
  slack: "FaSlack",
  notion: "SiNotion",
  trello: "SiTrello",
  linear: "SiLinear",

  // CMS & e-commerce
  wordpress: "SiWordpress",
  strapi: "SiStrapi",
  contentful: "SiContentful",
  shopify: "SiShopify",

  // IDEs
  vscode: "SiIntellijidea", "vs code": "SiIntellijidea",
  intellij: "SiIntellijidea",
  "android studio": "SiAndroidstudio",
  vim: "SiVim",
  xcode: "SiXcode",

  // Design
  figma: "SiFigma",
  framer: "SiFramer",
  sketch: "SiSketch",

  // Game & 3D
  unity: "SiUnity",

  // Web3
  ethereum: "SiEthereum",

  // OS
  linux: "FaLinux",

  // Misc
  codeigniter: "SiCodeigniter", "codeigniter 4": "SiCodeigniter",
};

function getTechIcon(name: string): ElementType | undefined {
  const key = NAME_TO_KEY[name.toLowerCase()];
  return key ? SKILL_ICON_MAP[key] : undefined;
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
