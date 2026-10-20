
import { MdArrowForwardIos } from "react-icons/md";

type ButtonCTAProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonCTA({
  href,
  children,
  className = "",
}: ButtonCTAProps) {
  return (
    <a
      href={href}
      className={`group inline-flex -skew-x-12 items-center gap-5 border border-[#55D6FF] bg-[#55D6FF] px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#102A43] shadow-[6px_6px_0_#1c6ebc] transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[9px_9px_0_#1c6ebc] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55D6FF] ${className}`}
    >
      <span className="skew-x-12">{children}</span>

      <MdArrowForwardIos className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
