"use client";
import { useEffect, useState } from "react";
import { RoughNotation } from "react-rough-notation";

export default function Heading({text = "heading", className = "", notationType = "highlight", color = "#a3ff61" } : {text:string, className?: string, notationType?: any, color?: string}) {
  const [mountedKey, setMountedKey] = useState(0);

  useEffect(() => {
    // remount once after mount to force recompute
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMountedKey(k => k + 1)));
    return () => cancelAnimationFrame(id);
  }, []);


  return (
    <h1 className={`text-[2.5rem] sm:text-[3rem]  text-center font-playfair ${className}`}>
      <RoughNotation
        key={mountedKey}  
      type={notationType}
        show={true}
        color={color}
        animationDuration={1200}
        strokeWidth={0.6}
      >
        {text}
      </RoughNotation>
    </h1>
  );
}
