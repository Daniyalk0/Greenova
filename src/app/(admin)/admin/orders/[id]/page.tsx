import { Suspense } from "react";
import AdminOrderDetailsSkeleton from "./AdminOrderDetailsSkeleton";
import AdminOrderDetailsContent from "./AdminOrderDetailsContent.";
// import AdminOrderDetailsContent from "@/src/components/admin/orders/AdminOrderDetailsContent";
// import AdminOrderDetailsSkeleton from "@/src/components/admin/orders/AdminOrderDetailsSkeleton";

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<AdminOrderDetailsSkeleton />}>
      <AdminOrderDetailsContent id={Number(id)} />
    </Suspense>
  );
}