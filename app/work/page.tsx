import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechTagList } from "@/components/ui/TechTag";
import { truncate } from "@/lib/utils";
import type { PortfolioData } from "@/types";

export const revalidate = false;

export const metadata = {
  title: "Work - Boreneoux",
  description: "Selected projects by Ichlasul Fikri.",
};

export default async function WorkPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-12 font-mono group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            home
          </Link>

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle mb-4">
            all projects
          </p>
          <h1 className="font-serif italic text-5xl md:text-7xl text-fg mb-16 leading-tight">
            work.
          </h1>

          <div className="flex flex-col gap-20 md:gap-28">
            {(portfolios as unknown as PortfolioData[]).map((p, i) => {
              const isEven = i % 2 === 0;
              return (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  className="group block"
                >
                  <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}>
                    {/* Image */}
                    <div className="w-full md:w-[55%] overflow-hidden rounded-2xl bg-bg-surface relative">
                      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                        - {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="aspect-video">
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          width={640}
                          height={360}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-[45%] flex flex-col gap-3 ${isEven ? "" : "md:items-end md:text-right"}`}>
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
