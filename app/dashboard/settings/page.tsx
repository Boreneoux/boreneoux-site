import { prisma } from "@/lib/prisma";
import { SettingsClient } from "./SettingsClient";

export default async function SettingsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: "resumeUrl" } });
  return <SettingsClient resumeUrl={setting?.value ?? ""} />;
}
