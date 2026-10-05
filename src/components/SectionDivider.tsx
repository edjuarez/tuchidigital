type SectionDividerProps = {
  color?: "navy" | "white";
  direction?: "left" | "right";
};

export function SectionDivider({
  color = "white",
  direction = "right",
}: SectionDividerProps) {
  const backgroundColor =
    color === "navy" ? "bg-navy" : "bg-white";

  const clipPath =
    direction === "right"
      ? "[clip-path:polygon(0_100%,100%_0,100%_100%)]"
      : "[clip-path:polygon(0_0,100%_100%,0_100%)]";

  return (
    <div
      aria-hidden="true"
      className={`relative z-20 -mb-20 h-20 w-full ${backgroundColor} ${clipPath}`}
    />
  );
}