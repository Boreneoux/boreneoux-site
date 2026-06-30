import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Briefcase, Code2, GraduationCap } from "lucide-react";

export default async function DashboardPage() {
  const [expCount, portCount, skillCount] = await Promise.all([
    prisma.experience.count(),
    prisma.portfolio.count(),
    prisma.skill.count(),
  ]);

  const stats = [
    { label: "Experiences", value: expCount, href: "/dashboard/experiences", icon: GraduationCap },
    { label: "Portfolios", value: portCount, href: "/dashboard/portfolios", icon: Briefcase },
    { label: "Skills", value: skillCount, href: "/dashboard/skills", icon: Code2 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif italic text-3xl text-fg">Overview</h1>
        <p className="text-sm text-fg-muted mt-1">Manage your site content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="p-6 rounded-xl bg-bg-surface border border-border-muted hover:border-border transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon size={18} className="text-fg-subtle group-hover:text-accent transition-colors" />
              <span className="font-mono text-3xl font-bold text-fg">{s.value}</span>
            </div>
            <p className="text-sm text-fg-muted font-medium">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-bg-surface border border-border-muted">
        <h2 className="font-medium text-fg mb-2">Quick links</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" target="_blank" className="text-accent hover:underline">View site ↗</Link>
          <Link href="/work" target="_blank" className="text-accent hover:underline">View work page ↗</Link>
        </div>
      </div>
    </div>
  );
}
