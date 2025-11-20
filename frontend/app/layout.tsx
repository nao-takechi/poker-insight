import { BottomNav } from "@/components/BottomNav";
import type { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className="max-w-[600px] mx-auto p-6 space-y-4">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
