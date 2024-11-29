"use client";

import Cursor from "@/components/Cursor";
import Introduction from "@/components/Introduction";
import Lenis from "lenis";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  });

  return (
    <>
      <Cursor />
      <div className="font-[family-name:var(--font-satoshi-variable)]">
        <Introduction />
      </div>
    </>
  );
}
