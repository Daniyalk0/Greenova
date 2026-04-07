import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentMethod } from "@prisma/client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// import { authConfig } from "../api/auth/[...nextauth]/auth.config";
import Link from "next/link";
import { authConfig } from "../../api/auth/[...nextauth]/auth.config";
import { ArrowRight, Calendar, CheckCircle, MapPin, ShoppingBag } from "lucide-react";

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
    <div className="max-w-2xl mx-auto py-12 sm:py-20 px-4 min-h-screen bg-gray-50/50">
      
      {/* Header / Hero Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-5 border border-[#0c831f]/20 shadow-[0_4px_20px_-4px_rgba(12,131,31,0.15)]">
          <CheckCircle className="w-8 h-8 text-[#0c831f]" strokeWidth={2} />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-dmsans_semibold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        
        <p className="font-dmsans_light text-gray-500 text-[15px] max-w-sm mb-4">
          {statusText}
        </p>

        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm">
          <span className="font-dmsans_light text-gray-500 text-[13px]">Order ID:</span>
          <span className="font-dmsans_semibold text-gray-900 text-[14px]">{order.id}</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Delivery Address Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#0c831f]" strokeWidth={2} />
            <h2 className="font-dmsans_semibold text-lg text-gray-900">Delivery Details</h2>
          </div>
          
          <div className="pl-7">
            <p className="font-dmsans_semibold text-[15px] text-gray-900 mb-1">
              {order.name} <span className="text-gray-300 mx-1">|</span> {order.phone}
            </p>
            <p className="font-dmsans_light text-gray-500 text-[14px] leading-relaxed">
              {order.street},<br />
              {order.city}, {order.state} - {order.pincode}
            </p>
          </div>
        </div>

        {/* Order Summary / Items Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <ShoppingBag className="w-5 h-5 text-[#0c831f]" strokeWidth={2} />
            <h2 className="font-dmsans_semibold text-lg text-gray-900">Order Summary</h2>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Product Image */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col min-w-0 pr-4">
                    <p className="font-dmsans_semibold text-[14px] sm:text-[15px] text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="font-dmsans_light text-[13px] text-gray-500 mt-0.5">
                      {item.weight} kg <span className="mx-1 text-gray-300">×</span> ₹{item.discountedPrice}
                    </p>
                  </div>
                </div>

                {/* Line Total */}
                <div className="font-dmsans_semibold text-[15px] text-gray-900 flex-shrink-0">
                  ₹{item.lineTotal}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="mt-6 pt-5 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="font-dmsans_light text-[14px]">Estimated Delivery</span>
              </div>
              <span className="font-dmsans_semibold text-[14px] text-gray-900">
                {estimatedDate.toDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center bg-[#f4f8f5]/50 p-4 rounded-xl mt-4 border border-[#0c831f]/10">
              <span className="font-dmsans_semibold text-[16px] sm:text-lg text-gray-900">Total Amount</span>
              <span className="font-dmsans_semibold text-[18px] sm:text-xl text-[#0c831f]">
                ₹{order.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0c831f] text-white rounded-xl font-dmsans_semibold text-[15px] hover:bg-[#0a6c19] hover:shadow-[0_4px_12px_rgba(12,131,31,0.2)] transition-all duration-200"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/orders"
          className="flex-1 flex items-center justify-center px-6 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-dmsans_semibold text-[15px] hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        >
          View My Orders
        </Link>
      </div>
      
    </div>
  );
}