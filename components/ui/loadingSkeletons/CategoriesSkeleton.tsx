import SkeletonCard from "./SkeletonCard";

export default function CategoriesSkeleton({
  count = 10,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={`
        w-full
        overflow-x-hidden
        ${className}
      `}
    >
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-4
          w-full
        "
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-full min-w-0">
            <SkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
}