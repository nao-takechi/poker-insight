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
    <html lang="ja">
      <body className={afacad.variable}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
