import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!cursor || !follower || !label) return;

    const isTouchDevice =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    const moveCursor = (event: MouseEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const handleClick = () => {
      gsap.timeline()
        .to(cursor, {
          scale: 0.65,
          duration: 0.08,
          ease: "power2.in",
        })
        .to(cursor, {
          scale: 1.15,
          duration: 0.16,
          ease: "back.out(2.5)",
        })
        .to(cursor, {
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        });

      gsap.timeline()
        .to(follower, {
          scale: 1.35,
          opacity: 0.35,
          duration: 0.08,
          ease: "power2.out",
        })
        .to(follower, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(2.5)",
        });
    };

    const handleEnter = () => {
      gsap.to(follower, {
        width: 72,
        height: 72,
        borderColor: "#55D6FF",
        backgroundColor: "rgba(85, 214, 255, 0.08)",
        boxShadow: "0 0 30px rgba(85, 214, 255, 0.25)",
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 0,
        duration: 0.2,
      });

      gsap.to(label, {
        opacity: 1,
        scale: 1,
        color: "#55D6FF",
        duration: 0.25,
      });
    };

    const handleLeave = () => {
      gsap.to(follower, {
        width: 40,
        height: 40,
        borderColor: "rgba(85, 214, 255, 0.5)",
        backgroundColor: "transparent",
        boxShadow: "none",
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
      });

      gsap.to(label, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
      });
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]",
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleClick);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#55D6FF]/50"
      >
        <span
          ref={labelRef}
          className="scale-50 text-sm text-[#55D6FF] opacity-0"
        >
          +
        </span>
      </div>

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#55D6FF]"
      />
    </>
  );
}