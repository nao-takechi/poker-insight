"use client";

import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

export function useViewTransitionRouter() {
  const router = useRouter();

  const push = (href: string) => {
    // 対応してなければ普通に遷移
    if (!document.startViewTransition) {
      console.log("1");

      router.push(href);
      return;
    }

    console.log("2");
    document.startViewTransition(() => {
      // React の描画を同期化してキャプチャずれを防ぐ
      flushSync(() => {
        router.push(href);
      });
    });
  };

  return { push };
}
