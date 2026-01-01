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
  imageUrl: string;
  colors?: BannerColors;
};
export default function BannerSlide({
  title,
  subtitle,
  badge,
  price,
  originalPrice,
  discountText,
  meta,
  cta,
  imageUrl,
  colors = {},
}: BannerSlideProps) {
  const {
    text = "text-black",
    subText = "text-neutral-700",
    badgeBg = "bg-black/5",
    badgeText = "text-black",
    ctaBg = "bg-white",
    ctaText = "text-black",
  } = colors;

  return (
    <div className="relative w-full h-full">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="px-4 sm:px-6 lg:px-10 max-w-[78%] sm:max-w-[60%] lg:max-w-[46%] flex flex-col gap-2">

          {badge && (
            <span
              className={`w-fit text-[10px] px-2 py-0.5 rounded-full font-dmsans_semibold ${badgeBg} ${badgeText}`}
            >
              {badge}
            </span>
          )}

          <h2
            className={`text-[14px] sm:text-[18px] lg:text-[28px] font-monasans_semibold leading-snug ${text}`}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={`text-[11px] sm:text-[13px] lg:text-[15px] font-dmsans_light ${subText}`}
            >
              {subtitle}
            </p>
          )}

          {(price || originalPrice) && (
            <div className="flex items-center gap-2">
              {price && (
                <span className={`text-[13px] font-dmsans_semibold ${text}`}>
                  ₹{price}
                </span>
              )}
              {originalPrice && (
                <span className="text-[11px] line-through font-dmsans_italic_light text-gray-500">
                  ₹{originalPrice}
                </span>
              )}
              {discountText && (
                <span className="text-[11px] text-green-400 font-dmsans_semibold">
                  {discountText}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 mt-1">
            <button
              className={`px-4 py-1.5 text-[12px] rounded-full shadow font-monasans_semibold transition hover:opacity-90  ${ctaBg} ${ctaText}`}
            >
              {cta}
            </button>

            {meta && (
              <span className={`text-[10px] font-dmsans_light ${subText}`}>
                {meta}
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
