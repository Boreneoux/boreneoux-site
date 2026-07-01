export type PortfolioLinkType =
  | "github"
  | "live"
  | "appstore"
  | "playstore"
  | "youtube"
  | "figma"
  | "docs";

export interface PortfolioLink {
  label: string;
  url: string;
  type: PortfolioLinkType;
}

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  dateIn: string;
  dateOut: string;
  description: string[];
  techStack: string[];
  imageUrl: string;
  order: number;
}

export interface PortfolioData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  techStack: string[];
  imageUrl: string;
  links: PortfolioLink[];
  featured: boolean;
  order: number;
}

export interface SkillData {
  id: string;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "mobile" | "tools";
  order: number;
}
