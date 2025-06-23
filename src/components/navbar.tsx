"use client";

import React from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/utils/cn";

export default function Navbar({ className }: { className?: string }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  return (
    <div className={cn("fixed top-4 inset-x-0 max-w-6xl mx-auto z-50", className)}>
      <nav className="flex items-center justify-between px-4 py-2 bg-zinc-900 rounded-xl shadow-md border border-zinc-800">
        <div className="text-white text-xl font-semibold tracking-wide">
          Taleem App
        </div>

        <div className="flex items-center space-x-6">
          <UserButton />
          <button
            onClick={async () => {
              await signOut();
              window.location.href = "/sign-in";
            }}
            className="text-sm px-3 py-1.5 rounded-md bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
}
