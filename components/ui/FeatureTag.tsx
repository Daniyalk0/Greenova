// FeatureTag.jsx
import React from "react";

export default function FeatureTag({
  label,
  color = "#16a34a", // fallback
  className = "",
//   onClick,
} : any) {
  // derive translucent tones from the base color
  const bgSoft = `${color}14`;   // ~8% fill
  const ringSoft = `${color}33`; // ~20% ring
  const glow = `${color}4d`;     // ~30% shadow

  return (
    <button
      type="button"
    //   onClick={onClick}
      className={[
        "group relative inline-flex items-center gap-2 rounded-full",
        "px-3 py-1.5 text-[13px] font-medium leading-none",
        "outline-none transition-all duration-300",
        "backdrop-blur-[2px] hover:translate-y-[-1px]",
        "focus-visible:ring-2",
        className,
      ].join(" ")}
      style={{
        // glassy fill
        background: `linear-gradient(180deg, ${bgSoft}, transparent)`,
        // soft border using double-gradient trick
        border: "1px solid transparent",
        backgroundImage: `
          linear-gradient(${bgSoft}, ${bgSoft}),
          radial-gradient(120% 120% at 0% 0%, ${color} 0%, transparent 70%)
        `,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: `0 2px 20px -8px ${glow}`,
      }}
      aria-label={label}
    >
      {/* Check icon container with subtle gradient + animation */}
      <span
        className="relative inline-grid place-items-center h-5 w-5 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${color}, ${color}cc)`,
          boxShadow: `0 4px 12px -6px ${glow}`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[13px] w-[13px] stroke-white"
          fill="none"
          strokeWidth="2.4"
        >
          {/* draw-in animation */}
          <path
            className="transition-[stroke-dashoffset] duration-500 ease-out group-hover:stroke-dashoffset-0"
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 24, strokeDashoffset: 24 }}
          />
        </svg>

        {/* start the check revealed for idle; animate on hover by resetting dashoffset */}
        <style>{`
          .group:hover path { stroke-dashoffset: 0 !important; }
        `}</style>
      </span>

      {/* Label with animated underline accent */}
      <span className="relative text-white/95">
        {label}
        <i
          className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: color }}
          aria-hidden="true"
        />
      </span>

      {/* Focus ring (uses derived soft tone) */}
      <style>{`
        .group:focus-visible { box-shadow: 0 0 0 3px ${ringSoft}; }
      `}</style>
    </button>
  );
}
