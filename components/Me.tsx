"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Skills from "./Skills";

type MeProps = {
  isMobile: boolean;
};

const Me = ({ isMobile }: MeProps) => {
  gsap.registerPlugin(ScrollTrigger);

  const me = useRef<HTMLImageElement>(null);
  const one = useRef<HTMLSpanElement>(null);
  const two = useRef<HTMLSpanElement>(null);
  const three = useRef<HTMLSpanElement>(null);
  const four = useRef<HTMLSpanElement>(null);
  const skills = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (me.current) {
      gsap.from(me.current, {
        scrollTrigger: {
          trigger: me.current,
          toggleActions: "restart reverse restart reverse",
        },
        opacity: 0,
        x: -100,
        ease: "back",
        duration: 1,
      });
    }
    if (one.current) {
      gsap.from(one.current, {
        scrollTrigger: {
          trigger: one.current,
          toggleActions: "restart reverse restart reverse",
        },
        opacity: 0,
        y: 20,
        ease: "back",
        duration: 1,
      });
    }

    if (two.current) {
      gsap.from(two.current, {
        scrollTrigger: {
          trigger: two.current,
          toggleActions: "restart reverse restart reverse",
        },
        opacity: 0,
        y: 20,
        ease: "back",
        duration: 1,
      });
    }

    if (three.current) {
      gsap.from(three.current, {
        scrollTrigger: {
          trigger: three.current,
          toggleActions: "restart reverse restart reverse",
        },
        opacity: 0,
        y: 20,
        ease: "back",
        duration: 1,
      });
    }

    if (four.current) {
      gsap.from(four.current, {
        scrollTrigger: {
          trigger: four.current,
          toggleActions: "restart reverse restart reverse",
        },
        opacity: 0,
        y: 20,
        ease: "back",
        duration: 1,
      });
    }
    if (skills.current) {
      gsap.from(skills.current, {
        scrollTrigger: {
          trigger: skills.current,
          toggleActions: "restart reverse restart reverse",
        },
        opacity: 0,
        y: 100,
        ease: "back",
        duration: 1,
      });
    }
  });

  return (
    <>
      <div className="items-center justify-center select-none mt-4 lg:mt-16">
        <div
          ref={me}
          className="flex flex-col lg:flex-row gap-8 items-center justify-center p-2 bg-white rounded-3xl mx-4 lg:mx-28 shadow-lg"
        >
          <Image
            src="/me.jpg"
            alt="Bassem MSAYIF"
            width={250}
            height={250}
            unoptimized={true}
            className="rounded-full lg:rounded-s-full border-white border-8 flex-shrink-0"
          />
          <div className="flex flex-col gap-8 text-black lg:text-xl text-wrap p-4">
            <span ref={one} id="one">
              Hi! I’m a software engineer from France, passionate about crafting
              efficient and meaningful code.
            </span>
            <span ref={two} id="two">
              I discovered coding early and have never stopped since! Along the
              way, by working with diverse teams and teaching others, I
              developed strong opinions on best coding practices—only to have
              them challenged and refined, which has become one of my favorite
              aspects of the job!
            </span>

            <span ref={three} id="three">
              Throughout my career, I’ve learned to balance architectural
              patterns, development methods, and infrastructure setup to build
              products I genuinely care about. I believe developers should
              immerse themselves as users of their own solutions to create
              impactful and relevant code.
            </span>

            <span ref={four} id="four">
              My goal is to deepen my knowledge across all development areas to
              bridge the gap between the problem a product addresses and the
              solution we engineers create.
            </span>
          </div>
        </div>
      </div>
      {isMobile || <Skills />}
    </>
  );
};

export default Me;
