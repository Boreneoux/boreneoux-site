import { prisma } from "@/lib/prisma";
import { PortfoliosClient } from "./PortfoliosClient";

export default async function PortfoliosPage() {
  const portfolios = await prisma.portfolio.findMany({ orderBy: { order: "asc" } });
  return <PortfoliosClient initialData={portfolios as any} />;
}
