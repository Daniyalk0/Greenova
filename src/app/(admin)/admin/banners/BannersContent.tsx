// app/admin/banners/BannersContent.tsx

import { prisma } from "@/lib/prisma";
import BannerManager from "./BannersManager";

export default async function BannersContent() {
  const banners = await prisma.banner.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });

  return <BannerManager initialBanners={banners} />;
}