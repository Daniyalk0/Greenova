import { useAnimation } from 'framer-motion';
import React from 'react'

const ArrowButton = () => {
      const controlsMain = useAnimation();
      const controlsSecond = useAnimation();
    
      const handleMouseEnter = () => {
        controlsMain.start({ x: 25, transition: { type: "spring", stiffness: 300, damping: 20 } });
        controlsSecond.start({ x: 11, y: 11, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
      };
    
      const handleMouseLeave = () => {
        controlsMain.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        controlsSecond.start({ x: -6, y: 11, opacity: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
      };
  return (
    <div>ArrowButton</div>
  )
}

export default ArrowButton