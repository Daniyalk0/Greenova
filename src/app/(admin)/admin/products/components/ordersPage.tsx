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
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-500 text-[14px] font-dmsans_light mt-1">
            Manage, track, and update your customer orders.
          </p>
        </div>

        {/* Only show search/filter if the database actually has orders */}
        {orders.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all shadow-sm"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 hover:text-[#0c831f] transition-colors text-[14px] font-dmsans_semibold text-gray-700 shadow-sm flex-shrink-0">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto">
        
        {/* LOGICAL CHECK 1: Are there literally zero orders in the database? */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-20 px-4 flex flex-col items-center text-center shadow-sm">
            <div className="w-20 h-20 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-5 border border-[#0c831f]/20">
              <PackageOpen className="w-10 h-10 text-[#0c831f] opacity-90" strokeWidth={1.5} />
            </div>
            <h3 className="font-monasans_semibold text-xl text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="font-dmsans_light text-gray-500 text-[15px] max-w-[300px] leading-relaxed">
              Orders will appear here once customers start purchasing your products.
            </p>
          </div>

        /* LOGICAL CHECK 2: Database has orders, but search results returned zero? */
        ) : localOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-20 px-4 flex flex-col items-center text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-5 border border-gray-200">
              <Search className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
            </div>
            <h3 className="font-monasans_semibold text-xl text-gray-900 mb-2">
              No matching orders
            </h3>
            <p className="font-dmsans_light text-gray-500 text-[15px] max-w-[300px] leading-relaxed">
              We couldn&apos;t find any orders matching your current search or active filters.
            </p>
          </div>

        /* LOGICAL CHECK 3: Show the Table! */
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead className="bg-gray-50/80 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {localOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      {/* Order ID */}
                      <td className="px-5 py-4">
                        <span className="font-dmsans_semibold text-[14px] text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 group-hover:border-[#0c831f]/30 transition-colors">
                          #{order.id}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-dmsans_semibold text-[14px] text-gray-900">
                            {order.customer || order.user?.name || "Guest User"}
                          </span>
                          <span className="font-dmsans_light text-[13px] text-gray-500">
                            {order.email || order.user?.email || "No email provided"}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 font-dmsans_light text-[14px] text-gray-600">
                        {order.createdAt || order.date ? (
                          new Date(
                            (order.createdAt || order.date) as string | Date,
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        ) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </td>

                      {/* Total */}
                      <td className="px-5 py-4 font-dmsans_semibold text-[14px] text-gray-900">
                        ₹{Number(order.total || 0).toLocaleString("en-IN")}
                      </td>

                      {/* Status Dropdown (FIXED: Moved to Status column) */}
                      <td className="px-5 py-4">
                        <StatusDropdown
                          value={order.status}
                          onChange={(status) => handleStatusChange(order.id, status)}
                        />
                      </td>

                      {/* Actions (FIXED: Clean View button) */}
                      <td className="px-5 py-4 text-right">
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-[#0c831f] hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100 font-dmsans_semibold text-[13px]"
                          onClick={() => router.push(`/admin/orders/${order.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                          View
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
