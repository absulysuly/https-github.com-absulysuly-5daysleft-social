import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import TopNavBar from "@/components/TopNavBar";

export const metadata: Metadata = {
  title: "Digital Diwan – Iraqi Election Platform",
  description:
    "Track Iraqi parliamentary candidates, governorate insights, election statistics, and AI-assisted civic engagement tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <TopNavBar />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 pb-24 pt-24">
          {children}
        </main>
        <footer className="border-t border-neutral-800/60 bg-neutral-950/80 py-10 text-sm text-neutral-400">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6">
            <p className="font-medium text-neutral-200">Digital Diwan</p>
            <p>
              Data sourced from open IEC bulletins, media monitoring partners, and community verification teams across all
              governorates.
            </p>
            <p className="text-xs text-neutral-500">
              Built with transparency-first principles. Contact civic@digitaldiwan.io for data corrections and partnerships.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
