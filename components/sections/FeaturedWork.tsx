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
        <div className="flex items-end justify-between mb-14">
          <h2 className="font-serif italic text-4xl md:text-5xl text-fg">
            projects.
          </h2>
          <Link
            href="/work"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors font-medium group"
          >
            All projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {portfolios.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/work/${p.slug}`} className="group block">
                  <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}>
                    {/* Image */}
                    <div className="w-full md:w-[55%] overflow-hidden rounded-2xl bg-bg-surface relative">
                      {/* Index badge */}
                      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                        - {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="aspect-video">
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          width={680}
                          height={383}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-[45%] flex flex-col gap-3 ${isEven ? "md:items-start" : "md:items-end md:text-right"}`}>
                      <h3 className="font-serif italic text-2xl md:text-3xl text-fg group-hover:text-accent transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {truncate(p.shortDescription, 150)}
                      </p>
                      <TechTagList items={p.techStack} max={5} />
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent font-medium mt-1 group-hover:gap-2.5 transition-all duration-200">
                        View project <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile "all work" link */}
        <div className="mt-14 flex sm:hidden justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors font-medium"
          >
            See all projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
