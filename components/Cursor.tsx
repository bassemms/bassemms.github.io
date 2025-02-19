"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const links = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");

    const cursorText = document.querySelector(".cursor-text");

    const { innerWidth: width, innerHeight: height } = window;

    gsap.set(cursor, {
      x: width / 2,
      y: height / 2,
    });

    (cursor as HTMLElement).style.display = "flex";

    document.addEventListener("mousemove", () => {
      gsap.to(cursor, { opacity: 1, duration: 1 });
    });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, { x: clientX, y: clientY });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMouseEnterLink = (event: any) => {
      const link = event.target;

      if (link.classList.contains("view")) {
        gsap.to(cursor, { scale: 4 });
        if (cursorText) {
          (cursorText as HTMLElement).style.display = "block";
        }
      } else {
        gsap.to(cursor, { scale: 4 });
      }
    };

    const onMouseLeaveLink = () => {
      if (cursorText) {
        (cursorText as HTMLElement).style.display = "none";
      }
      gsap.to(cursor, { scale: 1 });
    };

    const onMouseHoldClick = () => {
      gsap.to(cursor, { scale: 4 });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMouseReleaseClick = (event: any) => {
      const link = event.target;
      if (link.classList.contains("view")) {
        gsap.to(cursor, { scale: 4 });
        if (cursorText) {
          (cursorText as HTMLElement).style.display = "block";
        }
      } else {
        gsap.to(cursor, { scale: 1 });
      }
    };

    document.addEventListener("mousedown", onMouseHoldClick);

    document.addEventListener("mouseup", onMouseReleaseClick);

    document.addEventListener("mousemove", onMouseMove);
    links.forEach((link) => {
      link.addEventListener("mouseover", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    buttons.forEach((button) => {
      button.addEventListener("mouseover", onMouseEnterLink);
      button.addEventListener("mouseleave", onMouseLeaveLink);
    });
  });

  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="cursor-text">View</span>
    </div>
  );
};

export default Cursor;
