import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginButton } from "./LoginButton";

export const metadata = {
  title: "Login — Boreneoux Admin",
};

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-bg">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <p className="font-mono text-xs text-fg-subtle uppercase tracking-widest">
            admin access
          </p>
          <h1 className="font-serif italic text-4xl text-fg">dashboard.</h1>
          <p className="text-sm text-fg-muted">
            Sign in to manage your site content.
          </p>
        </div>
        <LoginButton />
        <p className="text-xs text-fg-subtle font-mono">
          restricted to site owner
        </p>
      </div>
    </div>
  );
}
