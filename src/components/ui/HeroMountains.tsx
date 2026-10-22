
import { useEffect, useRef } from "react";
import gsap from "gsap";
import mountains from "../../assets/hero/mountains.svg";

export default function HeroMountains() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const animation = gsap.to(track, {
      xPercent: -50,
      duration: 90,
      repeat: -1,
      ease: "none",
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        ref={trackRef}
        className="absolute bottom-0 left-0 flex w-[200%] items-end"
      >
        <img
          src={mountains}
          alt=""
          aria-hidden="true"
          className="block w-1/2 shrink-0"
        />
        <img
          src={mountains}
          alt=""
          aria-hidden="true"
          className="block w-1/2 shrink-0"
        />
      </div>
    </div>
  );
}
