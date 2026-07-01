import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechTagList } from "@/components/ui/TechTag";
import { ProjectLinks } from "@/components/ui/ProjectLinks";
import type { PortfolioData, PortfolioLink } from "@/types";
import type { Metadata } from "next";

export const revalidate = false;

export async function generateStaticParams() {
  const portfolios = await prisma.portfolio.findMany({ select: { slug: true } });
  return portfolios.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await prisma.portfolio.findUnique({ where: { slug } });
  if (!portfolio) return { title: "Not Found" };
  return {
    title: `${portfolio.title} - Boreneoux`,
    description: portfolio.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolio = await prisma.portfolio.findUnique({ where: { slug } });
  if (!portfolio) notFound();

  const p = portfolio as unknown as PortfolioData;
  const links = (Array.isArray(p.links) ? p.links : []) as PortfolioLink[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-24 pt-12 px-5">
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-12 font-mono group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            all projects
          </Link>

          {/* Header - title + meta only */}
          <div className="mb-10 space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
              case study
            </p>
            <h1 className="font-serif italic text-4xl md:text-6xl text-fg leading-tight">
              {p.title}
            </h1>
            <TechTagList items={p.techStack} />
          </div>

          {/* Hero image */}
          <div className="mb-8 rounded-2xl overflow-hidden bg-bg-surface">
            <div className="aspect-video">
              <Image
                src={p.imageUrl}
                alt={p.title}
                width={900}
                height={506}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Links - shown right after the visual, before reading */}
          {links.length > 0 && (
            <div className="mb-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle mb-3">
                explore this project
              </p>
              <ProjectLinks links={links} variant="header" />
            </div>
          )}

          {/* Narrative */}
          <article className={links.length > 0 ? "mt-8" : ""}>
            {p.shortDescription && (
              <p className="text-lg md:text-xl text-fg leading-relaxed font-medium mb-8 border-l-2 border-accent pl-5">
                {p.shortDescription}
              </p>
            )}
            <div className="space-y-6 text-fg-muted leading-relaxed text-base md:text-[16.5px]">
              {p.situation && <p>{p.situation}</p>}
              {p.task && <p>{p.task}</p>}
              {p.action && <p>{p.action}</p>}
              {p.result && <p>{p.result}</p>}
            </div>
          </article>

          {/* Back to work */}
          <div className="mt-14">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors font-mono group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to all projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
