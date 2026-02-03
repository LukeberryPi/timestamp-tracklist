"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="h-14 border-b border-neutral-800 bg-neutral-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold text-neutral-100 hover:text-accent transition-colors tracking-tight"
          >
            TT
          </Link>
          <nav className="flex gap-2">
            <Button variant="ghost" size="default" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="default" size="default" asChild>
              <Link href="/submit">Upload</Link>
            </Button>
          </nav>
        </div>
      </header>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#111111',
            border: '1px solid #262626',
            color: '#e5e5e5',
          },
        }}
      />
    </div>
  );
}
