import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={cn(
        "flex h-screen flex-row items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800",
        font.className,
      )}
    >
      {children}
    </main>
  );
}
