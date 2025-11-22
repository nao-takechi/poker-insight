"use client";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "w-full py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-[#64b5a6] text-white hover:bg-[#57a094] focus:ring-blue-300 disabled:bg-[#64b5a6]",
    secondary:
      "bg-white text-secondary hover:bg-gray-200 focus:ring-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
