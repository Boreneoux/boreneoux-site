import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechTagList } from "@/components/ui/TechTag";
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
    title: `${portfolio.title} — Boreneoux`,
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

  const githubLinks = links.filter((l) => l.type === "github");
  const demoLinks = links.filter((l) => l.type !== "github");

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

          {/* Header */}
          <div className="mb-10 space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
              case study
            </p>
            <h1 className="font-serif italic text-4xl md:text-6xl text-fg leading-tight">
              {p.title}
            </h1>

            {/* Tech stack */}
            <TechTagList items={p.techStack} />

            {/* Links — prominent CTAs */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {demoLinks.map((link, i) => (
                  <a
                    key={`demo-${i}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-accent transition-colors"
                  >
                    <ExternalLink size={14} />
                    {link.label}
                  </a>
                ))}
                {githubLinks.map((link, i) => (
                  <a
                    key={`gh-${i}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-fg-muted text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                  >
                    <FaGithub size={14} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Hero image */}
          <div className="mb-14 rounded-2xl overflow-hidden bg-bg-surface">
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

          {/* Narrative — flowing prose, no STAR labels */}
          <article className="prose-custom">
            {/* Lead */}
            {p.shortDescription && (
              <p className="text-lg md:text-xl text-fg leading-relaxed font-medium mb-8 border-l-2 border-accent pl-5">
                {p.shortDescription}
              </p>
            )}

            {/* Story paragraphs — displayed as natural prose */}
            <div className="space-y-6 text-fg-muted leading-relaxed text-base md:text-[16.5px]">
              {p.situation && <p>{p.situation}</p>}
              {p.task && <p>{p.task}</p>}
              {p.action && <p>{p.action}</p>}
              {p.result && <p>{p.result}</p>}
            </div>
          </article>

          {/* Bottom links (repeat) */}
          {links.length > 0 && (
            <div className="mt-14 pt-10 border-t border-border-muted">
              <p className="text-sm font-mono text-fg-subtle mb-4 uppercase tracking-widest text-[11px]">
                Links
              </p>
              <div className="flex flex-wrap gap-3">
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-fg-muted hover:border-accent hover:text-accent transition-colors font-medium"
                  >
                    {link.type === "github" ? (
                      <FaGithub size={14} />
                    ) : (
                      <ExternalLink size={14} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Back to work */}
          <div className="mt-16">
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
