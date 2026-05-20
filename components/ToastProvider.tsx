"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ToastContainer
      position={isMobile ? "top-center" : "bottom-right"}
      autoClose={3000}
      closeOnClick
      pauseOnHover
      draggable
      
      toastClassName={`!overflow-hidden font-dmsans_medium ${
        isMobile
          ? "!w-auto !max-w-[90vw] !mx-auto !mt-3 !min-h-0 !py-2.5 !pl-4 !pr-10 !rounded-full !text-[13px]" // 🔥 Fixed: w-auto + extra right padding (!pr-10)
          : "!rounded-xl !mb-4 !mr-4"
      }`}
    />
  );
};

export default ToastProvider;