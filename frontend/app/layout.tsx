"use client";

import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Afacad } from "next/font/google";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

const afacad = Afacad({
  subsets: ["latin"],
  variable: "--font-eng",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  return (
    <html lang="ja" className={afacad.variable}>
      <body className="bg-[#f8f7f4]">
        <main className="max-w-[600px] m-auto relative min-h-screen px-6 pt-8 pb-12">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 40 }}
            animate={{
              opacity: [0, 0.6, 1],
              x: [40, 10, 0],
            }}
            transition={{
              duration: 0.48, // ← ほんの少し短く
              ease: ["easeOut", "easeOut", [0.33, 0.0, 0.2, 1.0]], // ← 初速を軽く強め
            }}
          >
            {children}
          </motion.div>

          <BottomNav />
        </main>
      </body>
    </html>
  );
}
