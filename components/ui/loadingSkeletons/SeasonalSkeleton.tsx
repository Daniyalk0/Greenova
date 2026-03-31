import SeasonalRowSkeleton from "./SeasonalRowSkeleton";

export default function SeasonalSkeleton() {
  return (
    <div className="px-8 w-full pb-10 my-6">
      <div className="flex flex-col gap-16">
        <section>
          <div className="h-8 w-48 bg-gray-300 rounded mb-6 animate-pulse" />
          <SeasonalRowSkeleton />
        </section>

        <section>
          <div className="h-8 w-56 bg-gray-300 rounded mb-6 animate-pulse" />
          <SeasonalRowSkeleton />
        </section>
      </div>
    </div>
  );
}
