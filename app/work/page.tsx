import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechTagList } from "@/components/ui/TechTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { truncate } from "@/lib/utils";
import type { PortfolioData } from "@/types";

export const revalidate = false;

export const metadata = {
  title: "Work — Boreneoux",
  description: "Selected projects by Ichlasul Fikri.",
};

export default async function WorkPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-12 font-medium"
          >
            <ArrowLeft size={14} /> Home
          </Link>

          <SectionLabel>all projects</SectionLabel>
          <h1 className="font-serif italic text-5xl md:text-7xl text-fg mb-16">
            work.
          </h1>

          <div className="flex flex-col gap-16 md:gap-24">
            {(portfolios as unknown as PortfolioData[]).map((p, i) => {
              const isEven = i % 2 === 0;
              return (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  className="group block"
                >
                  <div
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-12 items-center`}
                  >
                    <div className="w-full md:w-1/2 overflow-hidden rounded-xl bg-bg-surface aspect-video">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        width={640}
                        height={360}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div
                      className={`w-full md:w-1/2 flex flex-col gap-3 ${isEven ? "" : "md:items-end md:text-right"}`}
                    >
                      <span className="font-mono text-xs text-fg-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-serif italic text-2xl md:text-3xl text-fg group-hover:text-accent transition-colors leading-snug">
                        {p.title}
                      </h2>
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {truncate(p.shortDescription, 160)}
                      </p>
                      <TechTagList items={p.techStack} max={6} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
