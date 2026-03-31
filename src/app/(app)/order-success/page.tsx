import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentMethod } from "@prisma/client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// import { authConfig } from "../api/auth/[...nextauth]/auth.config";
import Link from "next/link";
import { authConfig } from "../../api/auth/[...nextauth]/auth.config";

export default async function OrderSuccess({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) redirect("/login");

  const params = await searchParams;
  const orderId = params?.orderId;

  if (!orderId) redirect("/");

  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: {
      items: {
        include: {
          product: true, // ✅ this is the fix
        },
      },
    },
  });

  // ❌ invalid order
  if (!order) redirect("/");

  // ❌ user trying to access someone else's order
  if (order.userId !== session.user.id) {
    redirect("/");
  }

  // ❌ Razorpay but not paid
  if (
    order.paymentType === PaymentMethod.RAZORPAY &&
    order.status !== OrderStatus.PAID
  ) {
    redirect("/");
  }

  const isCOD = order.paymentType === PaymentMethod.COD;

  const statusText = isCOD
    ? "Order placed successfully. Pay on delivery."
    : "Payment successful. Order confirmed.";

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);


  let paymentStatusText = "";

  if (order.paymentType === PaymentMethod.RAZORPAY) {
    paymentStatusText =
      order.status === OrderStatus.PAID
        ? "Payment Successful"
        : "Payment Pending";
  } else {
    paymentStatusText = "Pay on Delivery";
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold">Order Confirmed</h1>

      <p className="mt-4 text-gray-600">{statusText}</p>

      <p className="mt-2 text-gray-500">
        Order ID: <span className="font-medium">{order.id}</span>
      </p>
   

      {/* Address */}
      <div className="mt-6 border p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Delivery Address</h2>
        <p>
          {order.name}, {order.phone}
        </p>
        <p>
          {order.street}, {order.city}, {order.state} - {order.pincode}
        </p>
      </div>

      {/* Items */}
      <div className="mt-6 border p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Items</h2>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3 border-b"
          >
            <div className="flex items-center gap-3">

              {/* Product Image */}
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-14 h-14 object-cover rounded"
              />

              {/* Product Info */}
              <div>
                <p className="font-medium text-sm">
                  {item.product.name}
                </p>

                <p className="text-xs text-gray-500">
                  {item.weight} kg × ₹{item.discountedPrice}
                </p>
              </div>
            </div>

            {/* Line Total */}
            <div className="text-sm font-medium">
              ₹{item.lineTotal}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹{order.total}</span>
      </div>

      {/* Delivery */}
      <p className="mt-4 text-gray-600 text-sm">
        Estimated Delivery:{" "}
        <span className="font-medium">
          {estimatedDate.toDateString()}
        </span>
      </p>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="px-5 py-3 bg-black text-white rounded-lg"
        >
          Continue Shopping
        </Link>

        <Link
          href="/orders"
          className="px-5 py-3 border rounded-lg"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}