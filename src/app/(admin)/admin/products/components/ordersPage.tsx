"use client"
import React, { useState } from 'react';
import { PackageOpen, Eye, Filter, Search, MoreVertical } from 'lucide-react';

const AdminOrdersPage = () => {
  // Mock Data - Change this to an empty array [] to see the fallback UI
  const [orders, setOrders] = useState([
    { id: '#ORD-7721', customer: 'John Doe', date: 'Oct 24, 2023', total: '$120.50', status: 'Delivered' },
    { id: '#ORD-7722', customer: 'Sarah Smith', date: 'Oct 25, 2023', total: '$85.00', status: 'Processing' },
    { id: '#ORD-7723', customer: 'Mike Johnson', date: 'Oct 25, 2023', total: '$210.00', status: 'Shipped' },
    { id: '#ORD-7724', customer: 'Emily Brown', date: 'Oct 26, 2023', total: '$45.20', status: 'Cancelled' },
  ]);

  // Helper to color-code status badges
  const getStatusStyles = (status: any) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
  <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">

  {/* Page Header */}
  <div className="max-w-6xl mx-auto mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">

    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-monasans_semibold">
        Orders
      </h1>
      <p className="text-gray-500 text-sm font-dmsans_light">
        Manage and track your customer orders
      </p>
    </div>

    {orders.length > 0 && (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Filter */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition text-sm font-medium font-dmsans_light">
          <Filter className="w-4 h-4" /> Filter
        </button>

      </div>
    )}
  </div>

  {/* Main Content */}
  <div className="max-w-6xl mx-auto">
    {orders.length > 0 ? (

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Horizontal scroll for mobile */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-dmsans_semibold text-gray-500 uppercase">Order ID</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-dmsans_semibold text-gray-500 uppercase">Customer</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-dmsans_semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-dmsans_semibold text-gray-500 uppercase">Total</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-dmsans_semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-dmsans_semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">

                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 font-dmsans_semibold">
                    {order.id}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 font-dmsans_semibold">
                    {order.customer}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 font-dmsans_semibold">
                    {order.date}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-900 font-dmsans_semibold">
                    {order.total}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-dmsans_semibold ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    ) : (

      <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 py-16 sm:py-20 px-6 flex flex-col items-center justify-center text-center">

        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <PackageOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300" />
        </div>

        <h3 className="text-base sm:text-lg font-dmsans_semibold text-gray-900">
          No orders found
        </h3>

        <p className="text-gray-500 max-w-xs mx-auto mt-2 text-sm font-dmsans_light">
          Your store doesn&apos;t have any orders yet. Once a customer makes a purchase, it will appear here.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm"
        >
          Refresh Dashboard
        </button>

      </div>

    )}
  </div>
</div>
  );
};

export default AdminOrdersPage;