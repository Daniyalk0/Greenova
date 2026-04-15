import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentMethod } from "@prisma/client";
import Order_details_admin from "../../products/components/Order_details_admin";

type OrderItem = {
  id: string;
  name: string;
  imageUrl: string;
  weight: number;
  price: number;
  // paymentType: string;
};

type Address = {
  name?: string | null;
  street?: string | null;
  area?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  country?: string | null;
  phone?: string | null;
};

export type AdminOrderDetails = {
  id: number;
  status: OrderStatus;
  date: string;
  total: number;

  customerName: string;
  customerEmail: string;
  customerPhone: string;
PaymentMethod: PaymentMethod;
  address: Address | null;

  items: OrderItem[];

  subtotal: number;
  additionalCharges: number;
};

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: true,
      address: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return notFound();

  // ✅ define fallbacks FIRST
  const customerName = order.user?.name || order.address?.name || "Guest User";

  const customerEmail = order.user?.email || "No email provided";

  const customerPhone = order.address?.phone || "No phone provided";

  // ✅ calculations BEFORE usage
  const subtotal = order.items.reduce(
    (acc, item) => acc + (item.lineTotal || 0),
    0,
  );

  const additionalCharges = (order.total || 0) - subtotal;

  const address = [
    order.address?.name,
    order.address?.street,
    // order.address?.area,
    order.address?.city,
    order.address?.state,
    // order.address?.pinCode,
    order.address?.country,
  ]
    .filter(Boolean) // removes undefined/null/empty
    .join(", ");

  // ✅ normalize AFTER everything is ready
  const normalizedOrder: AdminOrderDetails = {
    id: order.id,
    status: order.status,
     PaymentMethod: order.paymentType,
    date: order.createdAt.toISOString(),
    total: order.total ?? 0,

    customerName,
    customerEmail,
    customerPhone,

    address: order.address
      ? {
          name: order.address.name,
          street: order.address.street,
          // area: order.address.area,
          city: order.address.city,
          state: order.address.state,
          pincode: order.address.pincode,
          country: order.address.country,
          phone: order.address.phone,
        }
      : null,

    items: order.items.map((item) => ({
      id: item.id.toString(),
      name: item.product?.name ?? "Unknown product",
      imageUrl: item.product?.imageUrl ?? "",
      weight: item.weight,
      price: item.discountedPrice,
    })),

    subtotal,
    additionalCharges,
  };

  // ✅ pass props correctly
  return <Order_details_admin order={normalizedOrder} />;
}
