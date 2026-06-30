"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Sentence {
  text: string;
  large?: boolean;
}

interface AnimatedTextProps {
  sentences: Sentence[];
}

export function AnimatedText({ sentences }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;
      const words = textRef.current.querySelectorAll<HTMLElement>(".word");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(words, { opacity: 0.1 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=220%",
            scrub: 1.2,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(words, { opacity: 0.1 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=160%",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div ref={textRef} className="text-center leading-relaxed max-w-3xl px-5">
        {sentences.map((sentence, sIdx) => (
          <span key={sIdx}>
            {sentence.text.split(" ").map((word, wIdx) => (
              <span
                key={`${sIdx}-${wIdx}`}
                className={`word inline text-fg ${
                  sentence.large
                    ? "text-2xl md:text-5xl font-serif italic"
                    : "text-lg md:text-2xl font-medium"
                } tracking-tight`}
              >
                {word}{" "}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
