"use client";

import React from "react";
import EmblaCarousel, { slidesType } from "./Carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import classNames from "classnames";

const OPTIONS: EmblaOptionsType = { axis: "y" };
const SLIDES: slidesType[] = [
  {
    slideNumber: 1,
    slideTitle: "Alternant Dans la Salle",
    slideText: "Validation of the presence of apprentices in classrooms.",
    slideLink: "https://github.com/bassemms/ads/",
    slideTech: ["Java", "Spring Boot", "React", "Docker"],
  },
  {
    slideNumber: 2,
    slideTitle: "A 2D Rogue-Like RPG Game",
    slideText:
      "Development of a Rogue-Like RPG game in Java using JavaFX and design patterns while adhering to SOLID principles.",
    slideLink: "https://github.com/bassemms/dungeon/",
    slideTech: ["Java", "JavaFX", "Design Patterns", "SOLID"],
  },
  {
    slideNumber: 3,
    slideTitle: "Yet Another Microblogging Server",
    slideText: "Lightweight Java microblogging server and client.",
    slideLink: "https://github.com/bassemms/yams/",
    slideTech: ["Java", "JavaFX", "Design Patterns", "SOLID"],
  },
  {
    slideNumber: 4,
    slideTitle: "FireClock",
    slideText: "Schedule management app made with Flutter framework.",
    slideLink: "https://github.com/bassemms/FireClockFlutter/",
    slideTech: ["Flutter", "Dart", "TypeScript", "NestJS"],
  },
];

type ProjectsProps = {
  isMobile: boolean;
};

const Projects = ({ isMobile }: ProjectsProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col lg:ml-28 items-start justify-start p-6 bg-white rounded-3xl shadow-lg text-black lg:max-w-1/2 grow theme-light",
        isMobile && "mt-16 mx-4 items-center justify-center"
      )}
    >
      <h1
        className={classNames(
          "text-2xl font-bold mb-4 ml-6",
          isMobile && "items-center justify-center"
        )}
      >
        Projects
      </h1>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} isMobile={isMobile} />
    </div>
  );
};

export default Projects;
