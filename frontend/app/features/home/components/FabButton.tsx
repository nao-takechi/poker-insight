"use client";

export function FabButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 bg-teal-500 text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center"
      aria-label="セッションを追加"
    >
      +
    </button>
  );
}
