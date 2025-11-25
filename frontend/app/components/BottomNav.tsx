"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const HIDDEN_NAV_ROUTES = ["/sessions/new"];
  if (HIDDEN_NAV_ROUTES.some((r) => pathname.startsWith(r))) return null;

  // ナビゲーション項目を配列で管理
  const navItems = [
    { href: "/", label: "ホーム" },
    { href: "/sessions", label: "履歴" },
    { href: "/stats", label: "統計" },
    { href: "/chat", label: "チャット" },
  ];

  // アクティブ判定（prefix マッチ）
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] flex justify-around items-center py-3 h-[50px]">
      {navItems.map(({ href, label }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center transition-colors ${
              active ? "text-teal-600" : "text-gray-500"
            }`}
          >
            <span className="text-sm">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
