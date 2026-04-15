"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Package,
  Receipt,
  Calendar,
  CreditCard,
  User,
  Mail,
  Phone,
} from "lucide-react";
import StatusDropdown from "../../products/components/orderStatusDD";
import Link from "next/link";
import { updateOrderStatus } from "../actions";
import { OrderStatus } from "@prisma/client";
import { AdminOrderDetails } from "../../orders/[id]/page";

const Order_details_admin = ({ order }: { order: AdminOrderDetails }) => {
  const [orderState, setOrderState] = useState(order);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: OrderStatus) => {
   if (loading || newStatus === orderState.status) return;

    setLoading(true);
    const prevStatus = orderState.status;

    setOrderState((prev) => ({ ...prev, status: newStatus }));

    try {
      const res = await updateOrderStatus(orderState.id, newStatus);

      if (!res.success) throw new Error();
    } catch {
      setOrderState((prev) => ({ ...prev, status: prevStatus }));
    } finally {
      setLoading(false);
    }
  };

  console.log(orderState);
  useEffect(() => {
  setOrderState(order);
}, [order]);
  
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Top Navigation */}
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0c831f] font-dmsans_semibold text-[14px] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Page Header (Title + Dropdown) */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 flex items-center gap-3 mb-2 sm:mb-3">
              Order #{order.id}
            </h1>
            <div className="flex items-center gap-1.5 font-dmsans_light text-gray-500 text-[13px] sm:text-[14px]">
              <Calendar className="w-4 h-4 text-gray-400" />
              Placed on{" "}
              {new Date(orderState.date).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {/* Admin Status Dropdown */}
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
            <span className="font-dmsans_light text-[13px] text-gray-500 pl-2">
              Status:
            </span>
            {/* NOTE: In a real app, wrap this in a Client Component to handle the onChange API call */}
            <StatusDropdown
              value={orderState.status}
              onChange={handleStatusChange}
              disabled={loading}
            />
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
                  <h2 className="font-dmsans_semibold text-lg text-gray-900">
                    Items Ordered
                  </h2>
                </div>
                <span className="font-dmsans_light text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  {order.items.length} Item{order.items.length !== 1 && "s"}
                </span>
              </div>

              <div className="space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-start sm:items-center"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-100 bg-gray-50 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {item?.imageUrl ? (
                        <img
                          src={item?.imageUrl}
                          alt={item?.name ?? "Product image"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-gray-300" />
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-dmsans_semibold text-[15px] sm:text-[16px] text-gray-900 truncate">
                        {item?.name ?? "Unknown Product"}
                      </p>
                      <p className="font-dmsans_light text-[13px] sm:text-[14px] text-gray-500 mt-1 truncate flex items-center gap-2">
                        <span>{item.weight} kg</span>
                        <span className="text-gray-300">|</span>
                        <span>Weight / QTY: {item.weight || 1}</span>
                        <span className="text-gray-300">|</span>
                        <span>
                          ₹
                          {Number(
                            item.price,
                          ).toLocaleString("en-IN")}{" "}
                          each
                        </span>
                      </p>
                    </div>

                    {/* Item Line Total */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-dmsans_light text-[12px] sm:text-[13px] text-gray-400 mb-0.5">
                        Line total
                      </p>
                      <p className="font-dmsans_semibold text-[15px] sm:text-[16px] text-gray-900">
                        ₹{Number(orderState.subtotal).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Customer, Address & Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Details Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#0c831f]" />
                <h2 className="font-dmsans_semibold text-lg text-gray-900">
                  Customer Details
                </h2>
              </div>

              <div className="space-y-3">
                <p className="font-dmsans_semibold text-[15px] text-gray-900 truncate">
                  {orderState.customerName}
                </p>
                <div className="flex items-center gap-2.5 font-dmsans_light text-[14px] text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{orderState.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2.5 font-dmsans_light text-[14px] text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{orderState.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#0c831f]" />
                <h2 className="font-dmsans_semibold text-lg text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="font-dmsans_light text-gray-600 text-[14px] leading-relaxed break-words">
                  {order.address ? (
                    <>
                      {order.address.street && <p>{order.address.street}</p>}
                      <p>
                        {order.address.city}, {order.address.state} -{" "}
                        {order.address.pincode}
                      </p>
                      {order.address.country && <p>{order.address.country}</p>}
                    </>
                  ) : (
                    <span className="text-gray-400 italic">
                      No specific address provided.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Summary Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Receipt className="w-5 h-5 text-[#0c831f]" />
                <h2 className="font-dmsans_semibold text-lg text-gray-900">
                  Payment Summary
                </h2>
              </div>

              <div className="space-y-3 font-dmsans_light text-[14px] text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between items-center gap-4">
                  <span className="truncate">Subtotal</span>
                  <span className="font-dmsans_semibold text-gray-900 flex-shrink-0">
                    ₹{orderState.subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {orderState.additionalCharges > 0 && (
                  <div className="flex justify-between items-center gap-4">
                    <span className="truncate">Taxes & Delivery</span>
                    <span className="font-dmsans_semibold text-gray-900 flex-shrink-0">
                      ₹{orderState.additionalCharges.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="flex justify-between items-center bg-[#f4f8f5]/60 p-4 rounded-xl border border-[#0c831f]/10 mb-5">
                <span className="font-dmsans_semibold text-[16px] text-gray-900">
                  Total Paid
                </span>
                <span className="font-dmsans_semibold text-[18px] text-[#0c831f]">
                  ₹{Number(orderState.total || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-gray-500 bg-gray-50 py-2.5 px-3 rounded-lg border border-gray-100">
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                <span className="truncate font-dmsans_light">
                  Method: {orderState.PaymentMethod || "Online"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_details_admin;
