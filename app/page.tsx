import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Contact } from "@/components/sections/Contact";
import type { ExperienceData, PortfolioData, SkillData } from "@/types";

export const revalidate = false;

async function getData() {
  const [experiences, portfolios, skills] = await Promise.all([
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.portfolio.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ]);
  return { experiences, portfolios, skills };
}

export default async function Home() {
  const { experiences, portfolios, skills } = await getData();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills skills={skills as SkillData[]} />
        <Experience experiences={experiences as ExperienceData[]} />
        <FeaturedWork portfolios={portfolios as unknown as PortfolioData[]} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
