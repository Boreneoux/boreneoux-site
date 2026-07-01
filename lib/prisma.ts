import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function buildConnectionUrl() {
  const url = new URL(process.env.DATABASE_URL!);
  // Silence pg's SSL mode deprecation warning — current behavior is already
  // verify-full; making it explicit keeps that behavior in future pg versions.
  if (url.searchParams.get("sslmode") !== "verify-full") {
    url.searchParams.set("sslmode", "verify-full");
  }
  return url.toString();
}

function createPrismaClient() {
  const adapter = new PrismaPg(buildConnectionUrl());
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
