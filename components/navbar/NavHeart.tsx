"use client"
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

type NavHeartProps = {
  LikedItemCount: null | number;
  compact?: boolean;
  onClick?: () => void;
};

const NavHeart = ({ LikedItemCount, compact = false, onClick }: NavHeartProps) => {
  const { data: session } = useSession();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={compact ? 'Open wishlist' : 'Wishlist'}
      className={`relative flex ${compact ? 'items-center' : 'flex-col items-center'} cursor-pointer gap-0.5`}
    >
      {/* Icon + badge */}
      <div className="relative">
        <Heart className={`${compact ? 'w-6 h-6' : 'w-5 h-5'}`} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {LikedItemCount}
        </span>
      </div>

      {/* Label - hidden in compact mode */}
      {!compact && (
        <span className="text-[11px] leading-none text-gray-600">
          Wishlist
        </span>
      )}
    </button>
  );
};
export default NavHeart