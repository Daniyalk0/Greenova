import { useEffect, useState } from "react";
import { RoughNotation } from "react-rough-notation";

export default function Heading({text = "heading"} : {text:string}) {
  const [mountedKey, setMountedKey] = useState(0);

  useEffect(() => {
    // remount once after mount to force recompute
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMountedKey(k => k + 1)));
    return () => cancelAnimationFrame(id);
  }, []);


  return (
    <h1 className="text-2xl sm:text-3xl text-center mb-6 lg:mb-10 font-monasans_semibold">
      <RoughNotation
        key={mountedKey}  
        type="highlight"
        show={true}
        color="#a3ff61"
        animationDuration={1200}
        strokeWidth={0.6}
      >
        {text}
      </RoughNotation>
    </h1>
  );
}
