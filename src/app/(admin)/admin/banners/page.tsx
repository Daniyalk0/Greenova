import { prisma } from "@/lib/prisma";
import BannerManager from "./BannersManager";
// import BannerManager from "./BannerManager"; // Adjust path if you put it in a components folder

export default async function AdminBannersPage() {
  // Fetch all banners from the database, ordered by their sortOrder
  const banners = await prisma.banner.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      <BannerManager initialBanners={banners} />
    </main>
  );
}