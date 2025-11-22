"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const HIDDEN_NAV_ROUTES = ["/sessions/new"];

  // 配列内に「prefix マッチするもの」があれば非表示
  const shouldHide = HIDDEN_NAV_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHide) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] flex justify-around items-center py-3 h-[50px]">
      <Link href="/" className="flex flex-col items-center text-teal-600">
        <span className="text-sm">ホーム</span>
      </Link>

      <Link href="/sessions" className="flex flex-col items-center">
        <span className="text-sm">履歴</span>
      </Link>

      <Link href="/stats" className="flex flex-col items-center">
        <span className="text-sm">統計</span>
      </Link>

      <Link href="/chat" className="flex flex-col items-center">
        <span className="text-sm">チャット</span>
      </Link>
    </nav>
  );
}
