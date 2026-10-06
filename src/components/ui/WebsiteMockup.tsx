import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiArrowUpRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export function WebsiteMockup() {
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockup = mockupRef.current;

    if (!mockup) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mockup,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".mockup-tabs", {
          y: -10,
          opacity: 0,
          duration: 0.5,
        })
        .from(
          ".mockup-browser",
          {
            y: -8,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".mockup-header",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from(
          ".mockup-hero",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          ".mockup-line",
          {
            scaleX: 0,
            transformOrigin: "left center",
            opacity: 0,
            duration: 0.4,
            stagger: 0.06,
          },
          "-=0.3",
        )
        .from(
          ".mockup-card",
          {
            y: 20,
            opacity: 0,
            scale: 0.96,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.25",
        )
        .from(
          ".mockup-arrow",
          {
            x: 15,
            y: 15,
            opacity: 0,
            scale: 0.7,
            duration: 0.5,
          },
          "-=0.25",
        );
    }, mockup);

    return () => context.revert();
  }, []);

  return (
    <div ref={mockupRef} className="relative w-full max-w-xl">
      <div className="relative overflow-hidden rounded-2xl border border-[#F5F3EE]/15 bg-[#F5F3EE] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
        <div className="mockup-tabs flex h-9 items-end justify-between bg-[#102A43] px-3">
          <div className="flex h-full items-end gap-1">
            <div className="flex h-7 w-24 items-center justify-center gap-2 rounded-t-lg bg-[#F5F3EE]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#55D6FF]" />
              <span className="h-1 w-8 rounded-full bg-[#102A43]/20" />
            </div>

            <div className="flex h-7 w-20 items-center justify-center gap-2 rounded-t-lg bg-[#1B3A56]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B4A]/70" />
              <span className="h-1 w-6 rounded-full bg-[#F5F3EE]/20" />
            </div>

            <div className="flex h-7 w-16 items-center justify-center rounded-t-lg bg-[#1B3A56]">
              <span className="h-1 w-6 rounded-full bg-[#F5F3EE]/15" />
            </div>

            <FiPlus className="mb-2 ml-2 text-[10px] text-[#F5F3EE]/50" />
          </div>

          <div className="mb-2 flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
        </div>

        <div className="mockup-browser flex h-10 items-center gap-2 border-b border-[#102A43]/10 bg-[#E8E6E1] px-3">
          <FiChevronLeft className="text-xs text-[#102A43]/45" />
          <FiChevronRight className="text-xs text-[#102A43]/25" />

          <div className="flex h-6 flex-1 items-center gap-2 rounded-md border border-[#102A43]/10 bg-[#F5F3EE] px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#55D6FF]" />

            <div className="h-1 w-28 rounded-full bg-[#102A43]/15 md:w-40" />

            <span className="ml-auto h-1 w-6 rounded-full bg-[#102A43]/10" />
          </div>
        </div>

        <div className="relative bg-[#F5F3EE] px-5 py-6 md:px-8 md:py-7">
          <div className="absolute right-5 top-5 h-14 w-14 rounded-full bg-[#55D6FF]/20 blur-2xl md:right-8 md:top-6 md:h-20 md:w-20" />

          <div className="relative">
            <div className="mockup-header flex items-center justify-between">
              <div className="h-1.5 w-16 rounded-full bg-[#102A43]" />

              <div className="flex gap-1.5">
                <span className="h-1 w-6 rounded-full bg-[#102A43]/20" />
                <span className="h-1 w-6 rounded-full bg-[#102A43]/20" />
                <span className="h-1 w-6 rounded-full bg-[#55D6FF]" />
              </div>
            </div>

            <div className="mockup-hero mt-8 max-w-md">
              <div className="h-2.5 w-20 rounded-full bg-[#55D6FF]" />

              <div className="mt-4 space-y-1.5">
                <div className="h-6 w-[85%] rounded-sm bg-[#102A43] md:h-8" />
                <div className="h-6 w-[65%] rounded-sm bg-[#102A43] md:h-8" />
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="mockup-line h-1.5 w-[75%] rounded-full bg-[#102A43]/20" />
                <div className="mockup-line h-1.5 w-[60%] rounded-full bg-[#102A43]/20" />
                <div className="mockup-line h-1.5 w-[45%] rounded-full bg-[#102A43]/20" />
              </div>

              <div className="mt-5 flex gap-2">
                <div className="h-7 w-24 rounded-full bg-[#102A43]" />
                <div className="h-7 w-20 rounded-full border border-[#102A43]/20" />
              </div>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-2.5 md:mt-10 md:gap-3">
              <div className="mockup-card aspect-[1.35/1] rounded-lg bg-[#102A43]/5 p-3">
                <div className="h-4 w-4 rounded bg-[#55D6FF]" />
                <div className="mt-3 h-1.5 w-[70%] rounded-full bg-[#102A43]/20" />
                <div className="mt-1.5 h-1 w-[50%] rounded-full bg-[#102A43]/10" />
              </div>

              <div className="mockup-card aspect-[1.35/1] rounded-lg bg-[#102A43]/5 p-3">
                <div className="h-4 w-4 rounded-full bg-[#102A43]" />
                <div className="mt-3 h-1.5 w-[60%] rounded-full bg-[#102A43]/20" />
                <div className="mt-1.5 h-1 w-[45%] rounded-full bg-[#102A43]/10" />
              </div>

              <div className="mockup-card aspect-[1.35/1] rounded-lg bg-[#55D6FF]/15 p-3">
                <div className="h-4 w-4 rounded bg-[#FF6B4A]" />
                <div className="mt-3 h-1.5 w-[65%] rounded-full bg-[#102A43]/20" />
                <div className="mt-1.5 h-1 w-[50%] rounded-full bg-[#102A43]/10" />
              </div>
            </div>

            <div className="mt-5 space-y-1.5">
              <div className="mockup-line h-1 w-full rounded-full bg-[#102A43]/10" />
              <div className="mockup-line h-1 w-[85%] rounded-full bg-[#102A43]/10" />
              <div className="mockup-line h-1 w-[70%] rounded-full bg-[#102A43]/10" />
            </div>
          </div>

          <div className="mockup-arrow absolute bottom-5 right-6 hidden md:block">
            <FiArrowUpRight
              className="rotate-[-20deg] text-3xl text-[#102A43]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="flex h-5 items-center justify-between border-t border-[#102A43]/10 bg-[#E8E6E1] px-3">
          <div className="h-1 w-16 rounded-full bg-[#102A43]/10" />

          <div className="flex items-center gap-1.5">
            <span className="h-1 w-6 rounded-full bg-[#102A43]/10" />
            <span className="h-1 w-3 rounded-full bg-[#102A43]/10" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-4 -left-4 hidden h-12 w-12 rounded-full border border-[#55D6FF]/30 md:block" />
    </div>
  );
}