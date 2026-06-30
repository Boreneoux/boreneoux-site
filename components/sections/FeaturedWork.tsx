"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechTagList } from "@/components/ui/TechTag";
import { truncate } from "@/lib/utils";
import type { PortfolioData } from "@/types";

interface FeaturedWorkProps {
  portfolios: PortfolioData[];
}

export function FeaturedWork({ portfolios }: FeaturedWorkProps) {
  return (
    <section id="portfolio" className="py-16 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>selected work</SectionLabel>
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif italic text-4xl md:text-5xl text-fg">
            projects.
          </h2>
          <Link
            href="/work"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors font-medium"
          >
            All work <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col gap-12 md:gap-20">
          {portfolios.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="group block"
                >
                  <div
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 items-center`}
                  >
                    {/* Image */}
                    <div className="w-full md:w-1/2 overflow-hidden rounded-xl aspect-video bg-bg-surface">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`w-full md:w-1/2 flex flex-col gap-3 ${isEven ? "md:items-start" : "md:items-end md:text-right"}`}
                    >
                      <span className="font-mono text-xs text-fg-subtle">
                        0{i + 1}
                      </span>
                      <h3 className="font-serif italic text-2xl md:text-3xl text-fg group-hover:text-accent transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {truncate(p.shortDescription, 140)}
                      </p>
                      <TechTagList items={p.techStack} max={5} />
                      <span className="inline-flex items-center gap-1 text-sm text-accent font-medium mt-1 group-hover:gap-2 transition-all">
                        View project <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile "all work" link */}
        <div className="mt-12 flex sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors font-medium"
          >
            See all work <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
