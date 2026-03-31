import SkeletonCard from "./SkeletonCard";

export default function SeasonalRowSkeleton({
  count = 5,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={`
        flex gap-4 overflow-x-auto scrollbar-hide
        lg:grid lg:grid-cols-5 sm:gap-6 lg:overflow-visible
      ${className}
      `}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            min-w-[160px] md:min-w-[180px]
            lg:min-w-0
          "
        >
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}
