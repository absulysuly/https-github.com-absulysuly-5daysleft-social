"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

type NavigationLink = {
  href: string;
  label: string;
  exact?: boolean;
};

const navigationLinks = [
  { label: "Home", href: "/", exact: true },
  { label: "Candidates", href: "/candidates" },
  { label: "Governorates", href: "/governorates" },
  { label: "Statistics", href: "/statistics" },
  { label: "About", href: "/about", exact: true },
] satisfies ReadonlyArray<NavigationLink>;

function normalizePathname(path: string): string {
  if (path === "/") {
    return path;
  }

  return path.replace(/\/+$/, "");
}

export default function TopNavBar(): JSX.Element {
  const pathnameValue = usePathname();
  const pathname = useMemo(
    () => normalizePathname(pathnameValue ?? "/"),
    [pathnameValue],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center border-b border-white/5 bg-neutral-950/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-brand-foreground">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
            DD
          </span>
          Digital Diwan
        </Link>
        <ul className="hidden items-center gap-1 rounded-full border border-neutral-800/80 bg-neutral-900/70 p-1 text-sm text-neutral-300 shadow-lg shadow-black/20 md:flex">
          {navigationLinks.map(({ href, label, exact }) => {
            const isActive =
              normalizedPathname === href || (!exact && normalizedPathname.startsWith(`${href}/`));

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "rounded-full px-4 py-2 transition",
                    isActive
                      ? "bg-brand text-brand-foreground shadow-inner shadow-black/30"
                      : "hover:bg-neutral-800/80 hover:text-neutral-100",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/civic-toolkit"
          className="rounded-full border border-brand/70 px-4 py-2 text-sm font-medium text-brand-foreground transition hover:bg-brand hover:text-neutral-950"
        >
          Civic Toolkit
        </Link>
      </nav>
    </header>
  );
}
