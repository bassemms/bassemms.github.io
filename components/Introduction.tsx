import React from "react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Introduction = () => {
  const nameText = useRef<HTMLHeadingElement>(null);
  const titleText = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (nameText.current) {
      const split = SplitType.create(nameText.current, {
        types: "chars",
      });
      gsap.from(split.chars, {
        opacity: 0,
        y: 100,
        ease: "back",
        duration: 1,
        stagger: 0.05,
      });
    }

    if (titleText.current) {
      gsap.from(titleText.current, {
        opacity: 0,
        x: -100,
        ease: "back",
        duration: 1,
        delay: 1,
      });
    }
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen items-center justify-items-center">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1
            id="name"
            className="text-4xl sm:text-6xl md:text-6xl lg:text-9xl font-bold text-nowrap select-none"
            ref={nameText}
          >
            Bassem MSAYIF
          </h1>
        </div>
        <p
          className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-light select-none"
          ref={titleText}
        >
          Software Engineer
        </p>
        <a
          href="#about"
          className="view text-lg sm:text-xl md:text-xl lg:text-2xl select-none"
        >
          More about me
        </a>
      </div>
    </div>
  );
};

export default Introduction;
