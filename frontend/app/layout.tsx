import { BottomNav } from "@/components/BottomNav";
import { Afacad } from "next/font/google";
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
  return (
    <html lang="ja" className={afacad.variable}>
      <body className="bg-[#f8f7f4]">
        <main className="max-w-[600px] m-auto relative min-h-screen px-6 pt-8 pb-12">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
