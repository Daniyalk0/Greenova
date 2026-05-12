export default function BannersSkeleton() {
  return (
    <div className="max-w-6xl mx-auto mt-10 md:mt-0 animate-pulse">
      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                <th className="w-10 px-4 py-4">
                  <div className="w-4 h-4 rounded bg-gray-200 mx-auto" />
                </th>

                <th className="px-5 py-4">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </th>

                <th className="px-5 py-4">
                  <div className="h-3 w-24 rounded bg-gray-200" />
                </th>

                <th className="px-5 py-4">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </th>

                <th className="px-5 py-4 text-right">
                  <div className="h-3 w-16 rounded bg-gray-200 ml-auto" />
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {/* Drag Handle */}
                  <td className="px-4 py-5">
                    <div className="w-5 h-5 rounded bg-gray-200 mx-auto" />
                  </td>

                  {/* Banner Info */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div className="w-24 h-12 rounded-lg bg-gray-200 flex-shrink-0" />

                      {/* Text */}
                      <div className="flex flex-col gap-2">
                        <div className="h-3.5 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-24 rounded bg-gray-100" />
                      </div>
                    </div>
                  </td>

                  {/* URL */}
                  <td className="px-5 py-5">
                    <div className="h-8 w-36 rounded-md bg-gray-100 border border-gray-200" />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <div className="h-8 w-24 rounded-full bg-gray-100 border border-gray-200" />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200" />
                      <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200" />
                      <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}