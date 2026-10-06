import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Edu",
    role: "CEO & Founder",
    image: "/team/edu.webp",
  },
  {
    name: "Vicky",
    role: "Marketing Director",
    image: "/team/vicky.webp",
  },
/*   {
    name: "Angie",
    role: "Creative Director",
    image: "/team/angie.webp",
  }, */
];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      const members = gsap.utils.toArray<HTMLElement>(".team-member");
      gsap.fromTo(
        ".intro-content",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.set(members, {
        opacity: 0,
        y: 80,
      });

      members.forEach((member, index) => {
        ScrollTrigger.create({
          trigger: member,
          start: "top 85%",
          onEnter: () => {
            gsap.to(member, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.12,
              ease: "power3.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(member, {
              opacity: 0,
              y: 80,
              duration: 0.5,
              ease: "power3.in",
            });
          },
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative bg-white text-[#102A43] pb-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40 lg:px-16">
        <div className="intro-content mb-20 max-w-4xl md:mb-28">
          <span className="section-eyebrow section-eyebrow-dark">
            Nuestro equipo
          </span>

          <h2 className="section-header section-header-dark mt-6">
            Personas detrás
            <br />
            de cada <span className="text-lime">proyecto.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#102A43]/60 md:text-2xl">
            Un equipo de profesionales encargados de llevar tu visión a la
            red de una manera clara, estratégica y profesional.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 md:gap-8">
            {team.map((member) => (
              <article
                key={member.name}
                className="team-member group w-full max-w-[320px]"
              >
                <div className="aspect-[4/4.5] w-full overflow-hidden bg-[#F5F3EE]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5 border-t border-[#102A43]/15 pt-4">
                  <h3 className="font-momo text-3xl leading-none tracking-[-0.04em]">
                    {member.name}
                  </h3>

                  <p className="mt-2 font-mono text-[1rem] uppercase tracking-[0.15em] text-[#102A43]/50">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}