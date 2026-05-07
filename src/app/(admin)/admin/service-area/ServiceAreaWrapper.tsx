import { prisma } from "@/lib/prisma";
import ServiceAreaUI from "./ServiceAreaUI";

export default async function ServiceAreaWrapper() {
  const areas = await prisma.serviceArea.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ServiceAreaUI areas={areas} />;
}