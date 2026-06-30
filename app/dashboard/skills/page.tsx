import { prisma } from "@/lib/prisma";
import { SkillsClient } from "./SkillsClient";
import type { SkillData } from "@/types";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return <SkillsClient initialData={skills as SkillData[]} />;
}
