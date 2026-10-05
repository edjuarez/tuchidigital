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

    const handleEnter = () => {
      gsap.to(follower, {
        width: 70,
        height: 70,
        borderColor: "#FF6B5C",
        backgroundColor: "rgba(255, 107, 92, 0.08)",
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
        duration: 0.25,
      });
    };

    const handleLeave = () => {
      gsap.to(follower, {
        width: 32,
        height: 32,
        borderColor: "rgba(255, 107, 92, 0.5)",
        backgroundColor: "transparent",
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
      "a, button, [data-cursor]"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);

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
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#FF6B5C]/50"
      >
        <span
          ref={labelRef}
          className="scale-50 text-sm text-[#FF6B5C] opacity-0"
        >
          +
        </span>
      </div>

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B5C]"
      />
    </>
  );
}