import type { ReactNode } from "react";

type ActionButtonProps = {
  children: ReactNode;
  variant?: "light" | "dark";
  href?: string;
  onClick?: () => void;
};

export function ActionButton({
  children,
  variant = "light",
  href,
  onClick,
}: ActionButtonProps) {
  const baseStyles =
    "group inline-flex items-center gap-6 border px-8 py-5 text-base font-medium uppercase tracking-[0.12em] transition-all duration-300";

  const variants = {
    light:
      "border-[#55D6FF] bg-[#55D6FF] text-[#102A43] hover:bg-transparent hover:text-[#55D6FF]",
    dark:
      "border-[#102A43] bg-[#102A43] text-white hover:bg-transparent hover:text-[#102A43]",
  };

  const className = `${baseStyles} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}