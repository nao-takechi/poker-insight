"use client";

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
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-inner flex justify-around py-3">
      <a href="/home" className="flex flex-col items-center text-teal-600">
        <span className="text-sm">ホーム</span>
      </a>
      <a href="/sessions" className="flex flex-col items-center text-gray-600">
        <span className="text-sm">履歴</span>
      </a>
      <a href="/stats" className="flex flex-col items-center text-gray-600">
        <span className="text-sm">統計</span>
      </a>
      <a href="/chat" className="flex flex-col items-center text-gray-600">
        <span className="text-sm">チャット</span>
      </a>
    </nav>
  );
}
