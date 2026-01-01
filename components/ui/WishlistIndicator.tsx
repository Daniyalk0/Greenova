import { AnimatePresence, motion } from "framer-motion";
import { BookHeart, Heart } from "lucide-react";

type Props = {
  likedItemCount: number | null;
  className?: string;
};

const WishlistIndicator = ({ likedItemCount, className }: Props) => {
  return (
    <AnimatePresence>
      {likedItemCount && likedItemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 12, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 12, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`flex flex-col items-center ${className}`}
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 0.35 }}
              className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center"
            >
              <Heart
                className="w-5 h-5 text-green-900"
                strokeWidth={1.8}
              />
            </motion.div>

            {/* Count badge */}
            <span className="absolute -top-0 -right-0 text-[10px] bg-green-900 text-white rounded-full px-1.5 py-[1px] font-monasans_semibold">
              {likedItemCount}
            </span>
          </div>

          {/* Desktop-only label */}
          <span className="hidden lg:block -mt-0 text-[11px] text-gray-600 font-dmsans_semibold">
            Wishlist
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishlistIndicator;
