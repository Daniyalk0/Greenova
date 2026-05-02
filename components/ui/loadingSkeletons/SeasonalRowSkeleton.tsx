import SkeletonCard from "./SkeletonCard";

export default function SeasonalRowSkeleton({
  count = 5,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
<div className="w-full px-2 sm:px-6 md:px-10 lg:px-16 py-6 ">
  <div
    className={`
      grid grid-cols-2 gap-4
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      w-full
      
      ${className}
    `}
  >
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
</div>
  );
}
