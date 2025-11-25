"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export function FabButton({ onClick }: { onClick: () => void }) {
  const pathname = usePathname();

  const HIDDEN_ROUTES = ["/sessions/new"];
  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 bg-teal-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
      aria-label="セッションを追加"
    >
      <Plus size={26} strokeWidth={3} />
    </button>
  );
}
