import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/auth.config";
import { prisma } from "@/lib/prisma";
import { 
  ArrowLeft, 
  MapPin, 
  Package, 
  Receipt, 
  Calendar, 
  CreditCard,
  Download
} from "lucide-react";

// Helper for status colors
const getStatusStyles = (status?: string) => {
  const safeStatus = (status || "UNKNOWN").toUpperCase();
  switch (safeStatus) {
    case "DELIVERED":
      return "bg-green-50 text-[#0c831f] border-green-200";
    case "SHIPPED":
    case "PAID":
    case "PLACED":
    case "PENDING":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "CANCELLED":
    case "FAILED":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const formatOrderStatus = (status?: string) => {
  if (!status) return "Unknown";
  // Capitalize first letter safely
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const session = await getServerSession(authConfig);
  const {orderId} = await params;

  if (!session?.user?.id) {
    redirect("/login");
  }

  const order = await prisma.order.findUnique({
    where: {
      id: Number(orderId),
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      address: true,
    },
  });

  if (!order) return notFound();

  // Address Fallback Logic
  const shippingAddress = order.address
    ? {
        name: order.address.name,
        phone: order.address.phone,
        street: order.address.street,
        city: order.address.city,
        state: order.address.state,
        pincode: order.address.pincode,
        country: order.address.country,
      }
    : {
        name: order.name,
        phone: order.phone,
        street: order.street,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        country: "India", // Default fallback
      };

  // Calculate dynamic subtotal
  const subtotal = order.items.reduce((acc, item) => acc + (item.lineTotal || 0), 0);
  const additionalCharges = (order.total || 0) - subtotal;

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Navigation */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0c831f] font-dmsans_semibold text-[14px] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 flex items-center gap-3">
              Order Details
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-3">
              <span className="font-dmsans_semibold text-[13px] sm:text-[14px] text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm truncate max-w-[200px] sm:max-w-full">
                ID: {order.id}
              </span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 font-dmsans_light text-gray-500 text-[13px] sm:text-[14px]">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`font-dmsans_semibold text-[13px] sm:text-[14px] px-4 py-1.5 rounded-full border ${getStatusStyles(
                order.status
              )}`}
            >
              {formatOrderStatus(order.status)}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left Column: Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#0c831f]" />
                  <h2 className="font-dmsans_semibold text-lg text-gray-900">Items Ordered</h2>
                </div>
                <span className="font-dmsans_light text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  {order.items.length} Item{order.items.length !== 1 && "s"}
                </span>
              </div>

              <div className="space-y-5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start sm:items-center">
                    {/* Item Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-100 bg-gray-50 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {item.product?.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product?.name ?? "Product image"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-gray-300" />
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-dmsans_semibold text-[15px] sm:text-[16px] text-gray-900 truncate">
                        {item.product?.name ?? "Unknown Product"}
                      </p>
                      <p className="font-dmsans_light text-[13px] sm:text-[14px] text-gray-500 mt-0.5 truncate">
                        {item.weight} kg <span className="mx-1 text-gray-300">|</span> ₹{Number(item.discountedPrice).toLocaleString("en-IN")} each
                      </p>
                    </div>

                    {/* Item Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-dmsans_light text-[12px] sm:text-[13px] text-gray-400 mb-0.5">
                        Line total
                      </p>
                      <p className="font-dmsans_semibold text-[15px] sm:text-[16px] text-gray-900">
                        ₹{Number(item.lineTotal).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Address & Summary */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Delivery Address Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#0c831f]" />
                <h2 className="font-dmsans_semibold text-lg text-gray-900">Delivery Details</h2>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="font-dmsans_semibold text-[15px] text-gray-900 mb-1 truncate">
                  {shippingAddress.name || "Customer Name"}
                </p>
                <p className="font-dmsans_light text-gray-500 text-[14px] mb-3">
                  {shippingAddress.phone || "No phone provided"}
                </p>
                <div className="font-dmsans_light text-gray-600 text-[14px] leading-relaxed break-words">
                  {shippingAddress.street && <p>{shippingAddress.street}</p>}
                  <p>
                    {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                  </p>
                  {shippingAddress.country && <p>{shippingAddress.country}</p>}
                </div>
              </div>
            </div>

            {/* Payment Summary Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Receipt className="w-5 h-5 text-[#0c831f]" />
                <h2 className="font-dmsans_semibold text-lg text-gray-900">Payment Summary</h2>
              </div>

              <div className="space-y-3 font-dmsans_light text-[14px] text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between items-center gap-4">
                  <span className="truncate">Subtotal</span>
                  <span className="font-dmsans_semibold text-gray-900 flex-shrink-0">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {additionalCharges > 0 && (
                  <div className="flex justify-between items-center gap-4">
                    <span className="truncate">Taxes & Delivery</span>
                    <span className="font-dmsans_semibold text-gray-900 flex-shrink-0">
                      ₹{additionalCharges.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="flex justify-between items-center bg-[#f4f8f5]/60 p-4 rounded-xl border border-[#0c831f]/10 mb-5">
                <span className="font-dmsans_semibold text-[16px] text-gray-900">Total</span>
                <span className="font-dmsans_semibold text-[18px] text-[#0c831f]">
                  ₹{Number(order.total || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-gray-500 bg-gray-50 py-2.5 px-3 rounded-lg border border-gray-100">
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                <span className="truncate font-dmsans_light">
                  Paid via {order.paymentType || "Unknown"}
                </span>
              </div>
            </div>

            {/* Action Link (e.g. Download Invoice) */}
            {/* <a 
              href={`#`} // Update to your actual invoice route if you have one
              className="w-full flex items-center justify-center gap-2 font-dmsans_semibold text-[14px] bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl hover:bg-gray-50 hover:text-[#0c831f] transition-all duration-200 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Invoice
            </a> */}
            
          </div>
        </div>

      </div>
    </div>
  );
}