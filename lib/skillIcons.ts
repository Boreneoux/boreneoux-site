import type { ElementType } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaGithub, FaLinux, FaDatabase, FaSwift, FaPython, FaJava,
  FaSlack, FaAws,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiPostman, SiKotlin, SiNestjs, SiPrisma,
  SiAndroid, SiDotnet, SiExpress, SiPostgresql, SiChakraui,
  SiNextdotjs, SiMysql, SiPhp, SiTensorflow, SiStorybook,
  SiJenkins, SiSqlite, SiDocker, SiCodeigniter, SiGit,
  SiMongodb, SiRedis, SiFirebase, SiFlutter, SiVuedotjs,
  SiAngular, SiGraphql, SiVercel, SiSupabase, SiJest,
  SiCplusplus, SiRust, SiGo, SiDjango, SiLaravel,
  SiSpring, SiFlask, SiFastapi,
  SiJira, SiConfluence, SiNotion, SiTrello, SiLinear,
  SiKubernetes, SiGooglecloud, SiDigitalocean, SiCloudflare, SiNetlify, SiNginx,
  SiTerraform, SiGitlab, SiBitbucket,
  SiNpm, SiYarn, SiPnpm, SiWebpack, SiVite, SiGradle,
  SiSass, SiStyledcomponents,
  SiRedux, SiSvelte, SiNuxt, SiGatsby, SiAstro, SiSolid, SiRemix, SiReactquery,
  SiElectron, SiIonic, SiExpo, SiCapacitor, SiDart,
  SiFigma, SiFramer, SiSketch,
  SiThreedotjs, SiD3, SiChartdotjs, SiUnity,
  SiWordpress, SiStrapi, SiContentful, SiShopify,
  SiRabbitmq, SiApachekafka, SiElastic,
  SiPytorch, SiHuggingface, SiJupyter, SiMeta, SiClaude,
  SiApollographql, SiCypress, SiEslint, SiPrettier, SiStripe,
  SiIntellijidea, SiVim, SiAndroidstudio, SiXcode,
  SiSolidity, SiEthereum, SiWeb3Dotjs,
  SiBun, SiDaisyui, SiShadcnui,
} from "react-icons/si";

export const SKILL_ICON_MAP: Record<string, ElementType> = {
  // Web fundamentals
  FaHtml5, FaCss3Alt, FaJs,
  // Frontend frameworks
  FaReact, SiNextdotjs, SiVuedotjs, SiNuxt, SiAngular,
  SiSvelte, SiAstro, SiGatsby, SiSolid, SiRemix,
  // Frontend libs & styling
  SiTailwindcss, SiSass, SiChakraui, SiStyledcomponents,
  SiRedux, SiReactquery, SiTypescript, SiStorybook,
  // Backend frameworks
  FaNodeJs, SiExpress, SiNestjs, SiFastapi, SiDjango,
  SiFlask, SiLaravel, SiSpring, SiDotnet, SiPrisma,
  // Languages
  FaPython, FaJava, SiKotlin, SiGo, SiRust, SiCplusplus,
  SiPhp, FaSwift, SiDart, SiSolidity,
  // Databases
  SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiRedis,
  SiFirebase, SiSupabase, FaDatabase, SiElastic,
  // Mobile & cross-platform
  SiAndroid, SiFlutter, SiIonic, SiExpo, SiCapacitor, SiElectron,
  // Cloud & DevOps
  SiDocker, SiKubernetes, SiTerraform, SiJenkins,
  FaAws, SiGooglecloud, SiDigitalocean, SiCloudflare, SiNetlify, SiVercel, SiNginx,
  // Version control
  SiGit, FaGithub, SiGitlab, SiBitbucket,
  // Build tools & package managers
  SiNpm, SiYarn, SiPnpm, SiWebpack, SiVite, SiGradle,
  SiEslint, SiPrettier, SiPostman,
  // Testing
  SiJest, SiCypress,
  // AI / ML
  SiTensorflow, SiPytorch, SiHuggingface, SiJupyter, SiMeta, SiClaude,
  // APIs & messaging
  SiGraphql, SiApollographql, SiRabbitmq, SiApachekafka,
  // Payments
  SiStripe,
  // Project management
  SiJira, SiConfluence, FaSlack, SiNotion, SiTrello, SiLinear,
  // CMS & e-commerce
  SiWordpress, SiStrapi, SiContentful, SiShopify,
  // IDEs
  SiIntellijidea, SiAndroidstudio, SiVim, SiXcode,
  // Design
  SiFigma, SiFramer, SiSketch,
  // 3D, data viz & game
  SiThreedotjs, SiD3, SiChartdotjs, SiUnity,
  // Web3
  SiEthereum, SiWeb3Dotjs,
  // OS
  FaLinux,
  // Misc
  SiCodeigniter, SiBun, SiDaisyui, SiShadcnui,
};
