"use client";

import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
};

export function SessionTypeButton({
  label,
  icon: Icon,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "p-4 border-[1.5px] rounded-xl flex flex-col items-center justify-center border-[#64b5a6] bg-[#f2f4f0]"
          : "p-4 border-[0.5px] rounded-xl flex flex-col items-center justify-center border-gray-300 bg-white"
      }
    >
      <Icon size={16} color={active ? "#64b5a6" : "#6b6b6b"} />
      <span className={active ? "text-[#64b5a6]" : "text-secondary"}>
        {label}
      </span>
    </button>
  );
}
