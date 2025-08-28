import { motion } from "framer-motion";
import Image from "next/image";

interface BouncingIconProps {
  src: string;
  size?: number;            // size in px
  className?: string;
  parentClass?: string;
  rotate?: number;          // rotation in degrees
  amplitude?: number;       // bounce height
  duration?: number;        // bounce speed
  minSize?: number;         // minimum size fallback
}

const BouncingIcon: React.FC<BouncingIconProps> = ({
  src,
  size = 80,
  minSize = 20,             // default minimum size
  className = "",
  rotate = 0,
  amplitude = 15,
  duration = 2,
  parentClass,
}) => {
  const finalSize = Math.max(size, minSize); // ensure it’s not too small

  // const positionStyle: React.CSSProperties = {
  //   position: "absolute",
  //   top,
  //   left,
  //   right,
  //   bottom,
  //   rotate: `${rotate}deg`,
  //   width: finalSize,
  //   height: finalSize,
  // };

  return (
    <motion.div
      className={`absolute ${parentClass} `} // handles responsive positions
      style={{
        rotate: `${rotate}deg`,
        width: finalSize,
        height: finalSize,
      }}
       animate={{ y: [0, -amplitude, 0] }}
    transition={{
      repeat: Infinity,
      duration,
      ease: "easeInOut",
    }}
    >
      {/* <div className=" p-1 rounded-xl">  */}
      <Image
        className={`${className} rounded-xl border-[2px] border-[#eaeaea] shadow-[#d1d1d1] shadow-lg`}
        src={src}
        alt={"icon"}
        width={500}
        height={500}
        style={{ width: "100%", height: "100%" }} // ensure responsive within container

      />
      {/* </div> */}
    </motion.div>

  );
};

export default BouncingIcon;
