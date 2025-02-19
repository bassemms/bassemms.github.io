"use client";

import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Hyperspeed from "../Backgrounds/Hyperspeed/Hyperspeed.jsx";

import AudioSpectrum from "react-audio-spectrum";
import classNames from "classnames";

type IntroductionProps = {
  width: number;
  height: number;
};

const Introduction = ({ width, height }: IntroductionProps) => {
  gsap.registerPlugin(ScrollTrigger);

  const nameText = useRef<HTMLHeadingElement>(null);
  const titleText = useRef<HTMLParagraphElement>(null);
  const github = useRef<HTMLAnchorElement>(null);
  const linkedin = useRef<HTMLAnchorElement>(null);
  const hyperspeed = useRef<HTMLDivElement>(null);

  const audioEleRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioEleRef.current = new Audio("/music.mp3");
      audioEleRef.current.volume = 0.1;
    }
  }, []);

  const togglePlay = () => {
    if (!audioEleRef.current) return;
    if (isPlaying) {
      audioEleRef.current.pause();
    } else {
      audioEleRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [blur, setBlur] = useState(4);

  useEffect(() => {
    document.addEventListener("mousedown", onMouseHoldClick);
    document.addEventListener("mouseup", onMouseReleaseClick);

    let interval: NodeJS.Timeout;

    function onMouseHoldClick() {
      interval = setInterval(() => {
        setBlur((prev) => prev - 1);
        if (blur === 0) {
          clearInterval(interval);
        }
      }, 100);
    }

    function onMouseReleaseClick() {
      clearInterval(interval);
      setBlur(4);
    }
  }, []);

  const [rotate, setRotate] = useState(false);

  const handleRotation = (e: React.MouseEvent) => {
    const icon = e.currentTarget;
    setRotate((prev) => !prev);
    gsap.to(icon, {
      rotation: rotate ? 0 : 360,
      duration: 1,
      ease: "back",
    });
  };

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
    if (github.current) {
      gsap.from(github.current, {
        opacity: 0,
        rotate: 360,
        ease: "back",
        duration: 1,
        delay: 1,
      });
    }
    if (linkedin.current) {
      gsap.from(linkedin.current, {
        opacity: 0,
        y: 100,
        ease: "back",
        duration: 1,
        delay: 1,
      });
    }
    if (hyperspeed.current) {
      gsap.from(hyperspeed.current, {
        opacity: 0,
        ease: "back",
        duration: 5,
        delay: 2,
      });
    }
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen items-center justify-items-center bg-black">
      <div
        id="hyperspeed"
        className={"z-0 absolute w-full h-full"}
        style={{ filter: `blur(${blur}px)` }}
        ref={hyperspeed}
      >
        <Hyperspeed />
      </div>

      {audioEleRef.current && (
        <div
          className={classNames(
            "z-1 absolute bottom-0",
            isPlaying ? "visible" : "invisible"
          )}
        >
          <AudioSpectrum
            id="audio-canvas5"
            audioEle={audioEleRef.current}
            capColor={"#FF1396"}
            width={width - 25}
            height={height / 2}
            capHeight={2}
            meterWidth={8}
            meterCount={256}
            gap={4}
            meterColor={[
              { stop: 0, color: "#CF9FFF" },
              { stop: 0.5, color: "#0CD7FD" },
              { stop: 1, color: "#CF9FFF" },
            ]}
          />
        </div>
      )}
      <div className="flex flex-col gap-8 row-start-2 items-center lg:items-start">
        <div>
          <h1
            id="name"
            className="text-5xl lg:text-9xl font-bold text-nowrap select-none"
            ref={nameText}
          >
            Bassem MSAYIF
          </h1>
        </div>
        <p
          className="text-4xl lg:text-6xl font-light select-none"
          ref={titleText}
        >
          Software Engineer
        </p>
        <div className="flex flex-row w-full gap-8 select-none justify-center lg:justify-end lg:px-8">
          <a
            href="https://github.com/bassemms"
            target="_blank"
            rel="noreferrer"
            ref={github}
            onClick={handleRotation}
          >
            <Image
              src="/github.png"
              alt="Github"
              width={64}
              height={64}
              unoptimized={true}
            />
          </a>

          <a
            href="https://www.linkedin.com/in/bassemms/"
            target="_blank"
            rel="noreferrer"
            ref={linkedin}
            onClick={handleRotation}
          >
            <Image
              src="/linkedin.png"
              alt="Linkedin"
              width={64}
              height={64}
              unoptimized={true}
            />
          </a>
        </div>
      </div>

      {/* Music Player Section */}
      <div className="absolute bottom-8 flex items-center gap-4 bg-gray-800/30 p-3 rounded-xl backdrop-blur-3xl">
        <a
          className="text-white text-lg underline-offset-4 underline"
          href="https://soundcloud.com/neoslyde"
          target="_blank"
        >
          Hear my music?
        </a>
        <button
          onClick={togglePlay}
          className="bg-blue-500/80 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition backdrop-blur-3xl cursor-none"
        >
          {isPlaying ? "Pause" : "Play "}
        </button>
      </div>
    </div>
  );
};

export default Introduction;
