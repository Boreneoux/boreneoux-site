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

const STAR_ITEMS = [
  { key: "situation", label: "Situation" },
  { key: "task", label: "Task" },
  { key: "action", label: "Action" },
  { key: "result", label: "Result" },
] as const;

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
      <main className="min-h-screen py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-10 font-medium"
          >
            <ArrowLeft size={14} /> All work
          </Link>

          {/* Header */}
          <div className="mb-8 space-y-4">
            <h1 className="font-serif italic text-4xl md:text-6xl text-fg leading-tight">
              {p.title}
            </h1>
            <TechTagList items={p.techStack} />
            {links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-1">
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
            )}
          </div>

          {/* Hero image */}
          <div className="mb-12 rounded-2xl overflow-hidden bg-bg-surface aspect-video">
            <Image
              src={p.imageUrl}
              alt={p.title}
              width={900}
              height={506}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-fg mb-4">About the Project</h2>
            <p className="text-fg-muted leading-relaxed text-base md:text-lg">
              {p.shortDescription}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border-muted mb-12" />

          {/* S.T.A.R */}
          <div>
            <h2 className="font-serif text-2xl text-fg mb-8">
              Project Journey{" "}
              <span className="font-mono text-sm text-fg-subtle">(S.T.A.R)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STAR_ITEMS.map(({ key, label }) => (
                <div
                  key={key}
                  className="p-6 rounded-xl bg-bg-surface border border-border-muted space-y-3"
                >
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent-alt">
                    {label}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {p[key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
