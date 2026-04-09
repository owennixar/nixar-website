interface LogoProps {
  variant?: "dark-bg" | "light-bg";
  height?: number;
  className?: string;
}

export default function Logo({ variant = "dark-bg", height = 30, className }: LogoProps) {
  const solutionsColor = variant === "dark-bg" ? "#FFFFFF" : "#231F20";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 48"
      fill="none"
      height={height}
      style={{ width: "auto" }}
      className={className}
      aria-hidden="true"
    >
      <text
        x="0"
        y="34"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="38"
        letterSpacing="-1"
        fill="#E71840"
      >
        NIXAR
      </text>
      <text
        x="142"
        y="34"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="10"
        letterSpacing="3.5"
        fill={solutionsColor}
      >
        SOLUTIONS
      </text>
    </svg>
  );
}
