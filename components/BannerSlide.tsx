import Image from "next/image";
import Link from "next/link"; // Changed to handle routing

type BannerColors = {
  text?: string;
  subText?: string;
  badgeBg?: string;
  badgeText?: string;
  ctaBg?: string;
  ctaText?: string;
};

type BannerSlideProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  price?: number;
  originalPrice?: number;
  discountText?: string;
  meta?: string;
  cta: string;
  linkUrl?: string; // ADDED: Where does the banner go?
  imageUrl: string;
  isPriority?: boolean; // ADDED: Set to true for the first slide so it loads instantly
  colors?: BannerColors;
  isPreview?: boolean; // ADDED: If true, use <img> instead of Next.js Image for instant preview without needing a valid URL
};

export default function BannerSlide({
  isPreview,
  title,
  subtitle,
  badge,
  price,
  originalPrice,
  discountText,
  meta,
  cta,
  linkUrl = "/collections/all", // Default fallback
  imageUrl,
  isPriority = false,
  colors = {},
}: BannerSlideProps) {
  // Tailwind note: Ensure you are passing full class names (e.g. "text-black")
  // and not raw hex codes, otherwise Tailwind's compiler will strip them out.
  const {
    text = "text-gray-950",
    subText = "text-gray-700",
    badgeBg = "bg-emerald-500/10",
    badgeText = "text-emerald-700",
    ctaBg = "bg-gray-900",
    ctaText = "text-white",
  } = colors || {};

  const ALLOWED_HOST = "lzpbentohychvxyxgqmx.supabase.co";

  const isStoredImage =
    typeof imageUrl === "string" &&
    imageUrl.startsWith(`https://${ALLOWED_HOST}`);

  const shouldUseNextImage = !isPreview && isStoredImage;
  return (
    <div className="relative w-full  h-full overflow-hidden group">
      {/* 1. Next.js Optimized Image */}
      {shouldUseNextImage ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority={isPriority}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      ) : (
        <img
          src={imageUrl || "/placeholder.png"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
          }}
        />
      )}
      {/* 2. Safety Gradient Overlay (Ensures text is ALWAYS readable regardless of image) */}
<div
  className="
    absolute inset-0

    bg-gradient-to-r
    from-white via-white/75 via-[20%] to-transparent to-[60%]

    sm:from-white sm:via-white/85 sm:via-[26%] sm:to-transparent sm:to-[50%]

    lg:from-white/95 lg:via-white/75 lg:via-[24%] lg:to-transparent lg:to-[45%]
  "
/>
      {/* Badge - Top Left */}
      {badge && (
        <span
          className={`
            absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-5 lg:left-9
            z-20
            w-fit
            text-[10px] sm:text-[11px] lg:text-[12px]
            px-2.5 py-0.5 sm:px-3 sm:py-1
            rounded-full
            font-dmsans_semibold uppercase tracking-wider
            ${badgeBg} ${badgeText}
          `}
        >
          {badge}
        </span>
      )}
      {/* 3. Content Container */}
<div className="relative z-10 h-full flex items-center mt-5">
  <div
    className="
      px-4 sm:px-8 lg:px-12 xl:px-10
      w-full sm:max-w-[65%] lg:max-w-[55%] xl:max-w-[50%]

      flex flex-col justify-center items-start text-left

      gap-2 sm:gap-3 lg:gap-4
      py-2 sm:py-0

      h-full overflow-hidden
    "
  >
    {/* Top Content */}
    <div className="flex flex-col gap-1.5 sm:gap-2">
      
      <h2
        className={`
          text-[16px] sm:text-[22px] md:text-[26px] lg:text-[32px] xl:text-[36px]
          leading-[1.2]
          font-monasans_semibold
          tracking-[-0.01em]

          line-clamp-2 sm:line-clamp-none
          ${text}
        `}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`
            hidden sm:block
            text-[12px] sm:text-[13px] lg:text-[15px] xl:text-[16px]
            leading-relaxed
            font-dmsans_light
            opacity-90
            line-clamp-2
            ${subText}
          `}
        >
          {subtitle}
        </p>
      )}

      {(price || originalPrice) && (
        <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
          {price && (
            <span
              className={`
                text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px]
                font-dmsans_semibold
                ${text}
              `}
            >
              ₹{price}
            </span>
          )}

          {originalPrice && (
            <span className="text-[11px] sm:text-[12px] lg:text-[13px] line-through text-gray-400">
              ₹{originalPrice}
            </span>
          )}

          {discountText && (
            <span className="text-[10px] sm:text-[11px] font-dmsans_semibold text-[#0c831f] bg-[#0c831f]/10 px-1.5 py-0.5 rounded">
              {discountText}
            </span>
          )}
        </div>
      )}
    </div>

    {/* Bottom Actions */}
    <div className="flex items-center gap-3 mt-2 sm:mt-4">
      <Link
        href={linkUrl}
        className={`
          px-4 py-1.5 text-[12px]
          sm:px-5 sm:py-2 sm:text-[13px]
          lg:px-6 lg:text-[14px]

          rounded-full
          border border-black/10
          font-dmsans_semibold
          shadow-sm

          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-lg
          active:translate-y-0

          ${ctaBg} ${ctaText}
        `}
      >
        {cta}
      </Link>

      {meta && (
        <span
          className={`
            hidden sm:block
            text-[11px] sm:text-[12px] lg:text-[13px]
            opacity-80
            ${subText}
          `}
        >
          {meta}
        </span>
      )}
    </div>
  </div>
</div>
    </div>
  );
}
