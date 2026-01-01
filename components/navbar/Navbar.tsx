"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import LikedDrawer from "../likedProducts/LikedPopup";
import { calcOrderSummary } from "@/lib/calcOrderSummary";

const Navbar = () => {
  const [itemCount, setItemCount] = useState<number | null>(10);
  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlistProducts.items);
  const { data } = useSession();
  const [isMobileView, setIsMobileView] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const {total} = calcOrderSummary(cartProducts)
    
    
    useEffect(() => {
      console.log('isDrawerOpen', isDrawerOpen);
    }, [isDrawerOpen])
    

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    // Run once on mount
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

return (
  <>
    {isMobileView ? (
      <MobileNav itemCount={cartProducts.length} likedItemCount={wishlistItems.length} data={data}  setDrawerOpen={setDrawerOpen} total={total}/>
    ) : (
      <DesktopNav likedItemCount={wishlistItems.length}  itemCount={cartProducts.length} data={data} setDrawerOpen={setDrawerOpen} total={total}/>
    )}

    {/* Always render LikedDrawer */}
    <LikedDrawer isOpen={isDrawerOpen}  onClose={() => setDrawerOpen(false)} />
  </>
);

};

export default Navbar;
