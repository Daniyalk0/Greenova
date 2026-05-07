"use client";

import React, { useEffect, useState } from "react";
import { PackageOpen, Eye, Filter, Search, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import StatusDropdown from "./orderStatusDD";
import { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "../actions";

export type OrderUser = {
  id?: string | number;
  name?: string | null;
  email?: string | null;
};

export type OrderItem = {
  id: string | number;
  name?: string;
  imageUrl?: string | null;
  quantity?: number;
  price?: number;
  discountedPrice?: number;
  lineTotal?: number;
  // If your data comes from Prisma relations, it might be nested inside `product`:
  product?: {
    name: string;
    imageUrl?: string | null;
  };
};

export type BaseOrder = {
  id: number;
  status: OrderStatus;
  total: number;

  createdAt?: string | Date;
  date?: string | Date;

  // Directly on the order (matches your actual database response)
  customer?: string | null;
  email?: string | null;

  // Legacy/Alternative relation (just in case)
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;

  items?: OrderItem[];
};

// export type OrderStatus =
//   | "PENDING"
//   | "PAID"
//   | "PLACED"
//   | "SHIPPED"
//   | "DELIVERED"
//   | "CANCELLED"
//   | "FAILED";

export const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  PLACED: "bg-indigo-100 text-indigo-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  FAILED: "bg-gray-200 text-gray-700",
};

const AdminOrdersPage = ({ orders }: { orders: BaseOrder[] }) => {
  const [localOrders, setLocalOrders] = useState(orders);
  const router = useRouter();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  console.log(orders);

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus,
  ) => {
    // 🔁 keep previous state for rollback
    const prevOrders = localOrders;

    // ⚡ optimistic update
    setLocalOrders((orders) =>
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );

    try {
      const res = await updateOrderStatus(orderId, newStatus);

      if (!res.success) {
        throw new Error("Update failed");
      }
    } catch (error) {
      // ❌ rollback if failed
      setLocalOrders(prevOrders);
      console.error("Failed to update status");
    }
  };

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  return (
    <div className=" sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-8 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
   

      {/* Main */}
      <div className="max-w-6xl mx-auto">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-16 sm:py-20 px-4 flex flex-col items-center text-center shadow-sm">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-4 sm:mb-5 border border-[#0c831f]/20">
              <PackageOpen
                className="w-8 sm:w-10 h-8 sm:h-10 text-[#0c831f] opacity-90"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-monasans_semibold text-lg sm:text-xl text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="font-dmsans_light text-gray-500 text-[14px] sm:text-[15px] max-w-[300px] leading-relaxed">
              Orders will appear here once customers start purchasing your
              products.
            </p>
          </div>
        ) : localOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-16 sm:py-20 px-4 flex flex-col items-center text-center shadow-sm">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-5 border border-gray-200">
              <Search
                className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-monasans_semibold text-lg sm:text-xl text-gray-900 mb-2">
              No matching orders
            </h3>
            <p className="font-dmsans_light text-gray-500 text-[14px] sm:text-[15px] max-w-[300px] leading-relaxed">
              We couldn&apos;t find any orders matching your current search or
              active filters.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 👇 allow scroll ONLY when needed */}
            <div className="overflow-x-auto">
              {/* ❌ removed min-w-[800px] */}
              <table className="w-full table-fixed border-collapse">
                <thead className="bg-gray-50/80 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-[11px] sm:text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-left">
                      Order ID
                    </th>

                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-[11px] sm:text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-left">
                      Customer
                    </th>

                    {/* hide on very small screens */}
                    <th className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 text-[11px] sm:text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-left">
                      Date
                    </th>

                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-[11px] sm:text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-left">
                      Total
                    </th>

                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-[11px] sm:text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-left">
                      Status
                    </th>

                    <th className="px-3 sm:px-5 py-3 sm:py-4 text-[11px] sm:text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {localOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      {/* ID */}
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <span className="font-dmsans_semibold text-[13px] sm:text-[14px] text-gray-900 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                          #{order.id}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <div className="flex flex-col leading-tight">
                          <span className="font-dmsans_semibold text-[13px] sm:text-[14px] text-gray-900">
                            {order.customer || order.user?.name || "Guest User"}
                          </span>
                          <span className="font-dmsans_light text-[12px] sm:text-[13px] text-gray-500 truncate max-w-[140px] sm:max-w-none">
                            {order.email || "No email"}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="hidden sm:table-cell px-3 sm:px-5 py-3 sm:py-4 font-dmsans_light text-[13px] sm:text-[14px] text-gray-600">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>

                      {/* Total */}
                      <td className="px-3 sm:px-5 py-3 sm:py-4 font-dmsans_semibold text-[13px] sm:text-[14px] text-gray-900 whitespace-nowrap">
                        ₹{Number(order.total).toLocaleString("en-IN")}
                      </td>

                      {/* Status */}
                      <td className="px-3 sm:px-5 py-3 sm:py-4">
                        <StatusDropdown
                          value={order.status}
                          onChange={(status) =>
                            handleStatusChange(order.id, status)
                          }
                        />
                      </td>

                      {/* Actions */}
                      <td className="px-3 sm:px-5 py-3 sm:py-4 text-right">
                        <button
                          className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-gray-500 hover:text-[#0c831f] hover:bg-green-50 rounded-lg transition-colors text-[12px] sm:text-[13px]"
                          onClick={() =>
                            router.push(`/admin/orders/${order.id}`)
                          }
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline font-dmsans_light">
                            View
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
