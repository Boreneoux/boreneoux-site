import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export const metadata = {
  title: "Dashboard — Boreneoux",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen flex bg-bg">
      <DashboardSidebar user={session.user} />
      <main className="flex-1 md:ml-60 p-6 md:p-10">{children}</main>
    </div>
  );
}
