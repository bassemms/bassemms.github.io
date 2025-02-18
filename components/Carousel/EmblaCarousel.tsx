import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import classNames from "classnames";

export type slidesType = {
  slideNumber: number;
  slideTitle: string;
  slideText: string;
  slideLink: string;
  slideTech: string[];
};

type PropType = {
  slides: slidesType[];
  options?: EmblaOptionsType;
  isMobile: boolean;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, isMobile } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={classNames(isMobile ? "embla__mobile" : "embla")}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div
              className="embla__slide flex flex-col gap-2"
              key={slide.slideNumber}
            >
              <span className="font-bold">{slide.slideTitle}</span>
              <span>{slide.slideText}</span>
              <a
                className={classNames(
                  "text-blue-600 dark:text-blue-500 hover:underline font-bold mt-4"
                )}
                href={slide.slideLink}
                target="_blank"
              >
                GitHub Repo
              </a>
              <div className="flex flex-row gap-2 items-center flex-wrap">
                {slide.slideTech.map((tech) => (
                  <span
                    className="rounded-lg bg-violet-200 px-2 text-violet-700 font-semibold"
                    key={tech}
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
