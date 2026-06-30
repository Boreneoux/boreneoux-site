"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Briefcase, Code2, GraduationCap, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/experiences", label: "Experiences", icon: GraduationCap },
  { href: "/dashboard/portfolios", label: "Portfolios", icon: Briefcase },
  { href: "/dashboard/skills", label: "Skills", icon: Code2 },
];

interface DashboardSidebarProps {
  user?: { name?: string | null; email?: string | null; image?: string | null };
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-60 hidden md:flex flex-col border-r border-border-muted bg-bg-surface z-30">
      {/* Brand */}
      <div className="p-6 border-b border-border-muted">
        <Link href="/" className="font-mono text-sm text-accent font-medium">
          boreneoux
        </Link>
        <p className="text-xs text-fg-subtle mt-0.5 font-mono">admin panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-accent/10 text-accent"
                  : "text-fg-muted hover:text-fg hover:bg-bg-elevated"
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="p-4 border-t border-border-muted">
        <div className="flex items-center gap-3 mb-3">
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="min-w-0">
            <p className="text-xs font-medium text-fg truncate">{user?.name}</p>
            <p className="text-xs text-fg-subtle truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-xs text-fg-subtle hover:text-fg transition-colors w-full"
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </aside>
  );
}
