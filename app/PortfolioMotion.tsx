"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ParallaxTarget = {
  element: HTMLElement;
  depth: number;
  xTo: ReturnType<typeof gsap.quickTo>;
  yTo: ReturnType<typeof gsap.quickTo>;
};

export default function PortfolioMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) return;

    const skipEntranceAnimations = sessionStorage.getItem("portfolio-locale-switch") === "true";
    const localeSwitchTimer = skipEntranceAnimations
      ? window.setTimeout(() => sessionStorage.removeItem("portfolio-locale-switch"), 2000)
      : undefined;

    gsap.registerPlugin(ScrollTrigger);
    const motionMedia = gsap.matchMedia();

    const context = gsap.context(() => {
      if (!skipEntranceAnimations) {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".site-nav", {
          y: -22,
          scale: 0.985,
          autoAlpha: 0,
          duration: 0.8,
        })
        .from(
          ".hero-copy > *",
          {
            x: -54,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.28",
        )
        .from(
          ".hero-visual",
          {
            scale: 0.9,
            rotation: 2,
            duration: 1.15,
          },
          "-=0.9",
        )
        .from(
          ".status-card",
          { x: 35, duration: 0.7 },
          "-=0.45",
        )
        .from(
          ".hero-shape",
          { scale: 0, autoAlpha: 0, duration: 0.55, stagger: 0.08, ease: "back.out(1.8)" },
          "-=0.35",
        );

      const sectionReveals = [
        { section: ".about", children: ".section-label, .about-grid" },
        { section: ".experience", children: ".section-label, .section-heading" },
        { section: ".work", children: ".section-label, .section-heading" },
        { section: ".skills-education", children: ".skills-block, .education-block" },
        { section: ".contact", children: ".eyebrow, .contact-layout, footer" },
      ];

      sectionReveals.forEach(({ section, children }, index) => {
        const container = document.querySelector<HTMLElement>(section);
        if (!container) return;

        const elements = container.querySelectorAll<HTMLElement>(children);
        gsap.from(elements, {
            x: index % 2 === 0 ? -12 : 12,
            y: 42,
            autoAlpha: 0,
            filter: "blur(7px)",
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: {
              trigger: container,
              start: "top 82%",
              once: true,
            },
          });
      });

      gsap.utils.toArray<HTMLElement>(".job").forEach((job) => {
        gsap.from(job.children, {
          y: 38,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: job, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 70,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
      }

      motionMedia.add("(min-width: 701px)", () => {
        gsap.to(".portrait", {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to(".orbit-one", {
          rotation: 190,
          x: 34,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, document.body);

    const finePointer = window.matchMedia("(pointer: fine)");
    const cleanups: Array<() => void> = [];

    if (finePointer.matches) {
      const targets: ParallaxTarget[] = Array.from(
        document.querySelectorAll<HTMLElement>("[data-cursor-parallax]"),
      ).map((element) => ({
        element,
        depth: Number(element.dataset.parallaxDepth ?? 1),
        xTo: gsap.quickTo(element, "x", { duration: 0.85, ease: "power3.out" }),
        yTo: gsap.quickTo(element, "y", { duration: 0.85, ease: "power3.out" }),
      }));

      const onPointerMove = (event: PointerEvent) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        targets.forEach(({ depth, xTo, yTo }) => {
          xTo(x * 22 * depth);
          yTo(y * 18 * depth);
        });
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onPointerMove));

      document.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
        const onCardMove = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;

          card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
          card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
          gsap.to(card, {
            rotateX: y * -4,
            rotateY: x * 4,
            transformPerspective: 900,
            duration: 0.45,
            ease: "power2.out",
          });
        };
        const onCardLeave = () =>
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.65,
            ease: "elastic.out(1, 0.55)",
          });

        card.addEventListener("pointermove", onCardMove);
        card.addEventListener("pointerleave", onCardLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onCardMove);
          card.removeEventListener("pointerleave", onCardLeave);
        });
      });
    }

    return () => {
      if (localeSwitchTimer) window.clearTimeout(localeSwitchTimer);
      cleanups.forEach((cleanup) => cleanup());
      gsap.killTweensOf("[data-cursor-parallax], .project-card");
      motionMedia.revert();
      context.revert();
    };
  }, []);

  return null;
}
