import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import UserProfilePopUp from "./UserProfilePopUp";

type UserMenuProps = {
  user: any; // refine later to actual User type
};

const UserMenu = ({ user }: UserMenuProps) => {
  const pfpRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);


//   const togglePfp = () => setIsOpen((prev) => !prev);

  const name = user?.name || "U";
  const firstLetter = name[0].toUpperCase();

  // Use OAuth image if available, otherwise generate a fallback image URL
  const avatarUrl =
    user?.image ||
    `https://ui-avatars.com/api/?name=${firstLetter}&background=random&size=128`;
    

  if (!user) {
    return (
      <Link
        href="/login"
        className="block text-gray-700 hover:text-indigo-600"
      >
        Login
      </Link>
    );
  }

  return (
     <div className="relative " ref={pfpRef}>
      {/* PFP + Icon */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-1 md:gap-2">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
    
        </div>
      </div>

      {/* UserProfilePopUp */}
      {/* {isOpen && (
        <div className="absolute right-0 mt-2 z-50">
          <UserProfilePopUp isProfileOpen={isOpen} pfpRef={pfpRef} setIsProfileOpen={setIsOpen} />
        </div>
      )} */}
    </div>
  );
};

export default UserMenu;
