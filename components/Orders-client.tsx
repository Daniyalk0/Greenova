"use client";

import Link from "next/link";
import { Package, ChevronRight, Calendar, ShoppingBag, ArrowRight } from "lucide-react";

type OrderItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type Order = {
  id: number;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
};

type OrdersPageProps = {
  orders: Order[];
};

const getStatusStyles = (status: string) => {
  switch (status.toUpperCase()) {
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

const formatOrderStatus = (status: string) => {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case "delivered":
      return "Delivered";
    case "shipped":
      return "Shipped";
    case "paid":
      return "Paid";
    case "placed":
      return "Placed";
    case "pending":
      return "Pending";
    case "cancelled":
      return "Cancelled";
    case "failed":
      return "Failed";
    default:
      return status;
  }
};

export default function OrdersPage({ orders }: OrdersPageProps) {

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 flex items-center gap-3">
              <Package className="w-8 h-8 text-[#0c831f]" />
              My Orders
            </h1>
            <p className="font-dmsans_light text-gray-500 mt-2 text-[15px]">
              View and track your recent purchases.
            </p>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-dmsans_semibold text-[#0c831f] hover:text-[#0a6c19] transition-colors text-[14px] sm:text-[15px]"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => {
              // Show only first 3 items as preview, count the rest
              const previewItems = order.items.slice(0, 3);
              const remainingItemsCount = order.items.length - 3;

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Card Header: Status & Meta */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 sm:pb-5 border-b border-gray-100 gap-4">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      {/* Status Badge */}
                      <span
                        className={`font-dmsans_semibold text-[13px] px-3 py-1 rounded-full border ${getStatusStyles(
                          order.status
                        )}`}
                      >
                        {formatOrderStatus(order.status)}
                      </span>
                      
                      <div className="flex items-center gap-2 text-gray-500 font-dmsans_light text-[14px]">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="font-dmsans_semibold text-[14px] text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 inline-block w-max">
                      Order ID: {order.id}
                    </div>
                  </div>

                  {/* Card Body: Items Preview & Price */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 sm:pt-5 gap-5">
                    
                    {/* Items Image Stack */}
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {previewItems.map((item, index) => (
                          <div
                            key={item.id}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative z-10"
                            style={{ zIndex: 10 - index }}
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        
                        {remainingItemsCount > 0 && (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center relative z-0">
                            <span className="font-dmsans_semibold text-[13px] text-gray-600">
                              +{remainingItemsCount}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Text summary of items */}
                      <div className="flex flex-col min-w-0">
                        <p className="font-dmsans_semibold text-[15px] text-gray-900 truncate">
                          {order.items.length === 0
                            ? "No items"
                            : order.items.length === 1
                            ? order.items[0].name
                            : `${order.items[0].name} & ${order.items.length - 1} other item${order.items.length - 1 > 1 ? 's' : ''}`}
                        </p>
                        <p className="font-dmsans_light text-[13px] text-gray-500 mt-0.5">
                          {order.items.length} Item{order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {/* Total & Action Button */}
                    <div className="flex items-center justify-between sm:justify-end sm:gap-6 mt-2 sm:mt-0">
                      <div className="text-left sm:text-right">
                        <p className="font-dmsans_light text-[12px] text-gray-500 mb-0.5">Total Amount</p>
                        <p className="font-monasans_semibold text-[16px] sm:text-lg text-gray-900">
                          ₹{order.total}
                        </p>
                      </div>

                      <Link
                        href={`/orders/${order.id}`}
                        className="flex items-center gap-1.5 font-dmsans_semibold text-[14px] bg-white border border-gray-200 text-gray-700 px-4 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 hover:text-[#0c831f] hover:border-[#0c831f]/30 transition-all duration-200"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4 shadow-sm">
            <div className="w-20 h-20 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-5 border border-[#0c831f]/20">
              <ShoppingBag className="w-10 h-10 text-[#0c831f] opacity-90" strokeWidth={1.5} />
            </div>
            <h2 className="font-monasans_semibold text-gray-900 text-xl mb-2">
              No orders found
            </h2>
            <p className="font-dmsans_light text-gray-500 text-[15px] max-w-[300px] leading-relaxed mb-6">
              Looks like you haven&apos;t placed any orders yet. Start exploring our products!
            </p>
            <Link
              href="/"
              className="bg-[#0c831f] text-white font-dmsans_semibold px-6 py-3 rounded-xl hover:bg-[#0a6c19] hover:shadow-[0_4px_12px_rgba(12,131,31,0.2)] transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}