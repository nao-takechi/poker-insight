"use client";

import { useViewTransitionRouter } from "@/../lib/useViewTransitionRouter";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function VTLink({ href, children, className }: Props) {
  const { push } = useViewTransitionRouter();

  return (
    <button onClick={() => push(href)} className={className}>
      {children}
    </button>
  );
}
