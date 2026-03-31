export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-200 p-3 animate-pulse">
      {/* Image */}
      <div className="h-[120px] w-full rounded-lg bg-gray-200 mb-3" />

      {/* Title */}
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />

      {/* Price */}
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />

      {/* Button */}
      <div className="h-9 w-full bg-gray-200 rounded-lg" />
    </div>
  );
}
