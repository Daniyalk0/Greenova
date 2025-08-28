import { useEffect, useState } from "react";

export function useResponsiveSize(sizes: { base: number; sm?: number; md?: number; lg?: number }) {
  const [size, setSize] = useState(sizes.base);

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      if (sizes.lg && width >= 1024) setSize(sizes.lg);
      else if (sizes.md && width >= 768) setSize(sizes.md);
      else if (sizes.sm && width >= 640) setSize(sizes.sm);
      else setSize(sizes.base);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [sizes]);

  return size;
}
