import { prisma } from "@/lib/prisma";
import { ExperiencesClient } from "./ExperiencesClient";
import type { ExperienceData } from "@/types";

export default async function ExperiencesPage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return <ExperiencesClient initialData={experiences as ExperienceData[]} />;
}
