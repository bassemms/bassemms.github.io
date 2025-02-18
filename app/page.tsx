"use client";

import Cursor from "@/components/Cursor";
import Introduction from "@/components/Introduction";
import Me from "@/components/Me";
import Lenis from "lenis";
import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth(); // Set width initially
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (isMobile) {
      sectionRefs.current.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
          });
        }
      });
    } else {
      sectionRefs.current.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            snap: {
              snapTo: 1,
              duration: { min: 0.2, max: 0.5 },
              delay: 0.5,
              ease: "power1.inOut",
            },
          });
        }
      });
    }
  }, [isMobile]);

  return (
    <>
      {isMobile || <Cursor />}
      <div className="font-[family-name:var(--font-satoshi-variable)]">
        <div
          className="section h-screen w-full overflow-hidden"
          ref={addToRefs}
        >
          <Introduction />
        </div>
        <div
          className="section min-h-screen w-full overflow-hidden"
          ref={addToRefs}
        >
          <Me isMobile={isMobile} />
        </div>
        {isMobile && (
          <div
            className="section min-h-screen w-full overflow-hidden"
            ref={addToRefs}
          >
            <Skills isMobile={isMobile} />
          </div>
        )}
        {isMobile && (
          <div
            className="section min-h-screen w-full overflow-hidden"
            ref={addToRefs}
          >
            <Projects isMobile={isMobile} />
          </div>
        )}
      </div>
    </>
  );
}
