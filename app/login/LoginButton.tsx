"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-border bg-bg-surface text-fg text-sm font-medium hover:bg-bg-elevated transition-colors"
    >
      <FaGoogle size={16} className="text-accent" />
      Continue with Google
    </button>
  );
}
