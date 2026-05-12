// app/admin/banners/loading.tsx

export default function Loading() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto mt-10 md:mt-0 animate-pulse">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
          <div className="space-y-3">
            <div className="h-8 w-64 rounded-lg bg-gray-200" />
            <div className="h-4 w-80 rounded-lg bg-gray-100" />
          </div>

          <div className="h-11 w-44 rounded-xl bg-gray-200" />
        </div>

        {/* Generic content block */}
        <div className="h-[420px] rounded-2xl bg-white border border-gray-200" />
      </div>
    </main>
  );
}