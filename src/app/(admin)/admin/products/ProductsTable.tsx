import { prisma } from "@/lib/prisma";
import AdminProductsPage from "./AdminProductsPage";

export default async function ProductsTable({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams)?.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        basePricePerKg: true,
        inStock: true,
      },
    }),
    prisma.product.count(),
  ]);

  return (
    <AdminProductsPage
      products={products}
      totalCount={totalCount}
      page={page}
      limit={limit}
    />
  );
}