"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Skills = () => {
  gsap.registerPlugin(ScrollTrigger);

  const skills = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
    <div
      className="flex flex-col lg:flex-row gap-16 lg:gap-4 lg:grid-cols-2 items-center justify-center select-none mt-16 lg:justify-items-end lg:justify-end lg:items-end lg:mr-28"
      ref={skills}
    >
      <div className="flex flex-col gap-8 items-center justify-center p-6 bg-white rounded-3xl shadow-lg text-black lg:max-w-1/2">
        <h1 className="text-2xl font-bold mb-4">Skills</h1>
        <div className="grid grid-cols-3 gap-6 text-center ">
          <div className="flex flex-col items-center">
            <Image
              src="/icons/javascript.svg"
              alt="JavaScript"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">JavaScript⠀</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/typescript.svg"
              alt="TypeScript"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">TypeScript</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/java.svg"
              alt="Java"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">Java</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/csharp.svg"
              alt="C#"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">C#</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/cpp.svg"
              alt="C++"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">C++</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/python.svg"
              alt="Python"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">Python</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center p-6 bg-white rounded-3xl shadow-lg text-black lg:max-w-1/2">
        <h1 className="text-2xl font-bold mb-4">Frameworks</h1>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Image
              src="/icons/nestjs.svg"
              alt="NestJS"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">NestJS</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/dotnet.svg"
              alt=".NET"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">.NET</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/spring.svg"
              alt="Spring Boot"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">Spring Boot</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/nextjs.svg"
              alt="Next.js"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">Next.js</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/react.svg"
              alt="React"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">React</span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/angular.svg"
              alt="Angular"
              width={32}
              height={32}
              className="w-12 h-12 mb-2"
            />
            <span className="font-medium">Angular</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
