"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

const Navbar = () => {
  const [itemCount, setItemCount] = useState<number | null>(10);
  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);
  const { data } = useSession();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Run once on mount
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileView ? (
    <MobileNav itemCount={itemCount} data={data} />
  ) : (
    <DesktopNav itemCount={cartProducts.length && cartProducts.length } data={data} />
  );
};

export default Navbar;
