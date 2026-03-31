"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  totalAmount: number;
}

interface User {
  id: number;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
  updatedAt?: string;
  orders?: Order[];
}

interface Props {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function UserDetailsModal({
  user,
  open,
  onClose,
  onDelete,
}: Props) {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const totalSpent =
    user?.orders?.reduce((acc, o) => acc + o.totalAmount, 0) ?? 0;

  if (!user) return null;

  return (


      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4
    transition-opacity duration-300
    ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm
      transition-opacity duration-300
      ${open ? "opacity-100" : "opacity-0"}
    `}
          onClick={onClose}
        />

        <div
          className={`relative bg-white w-full max-w-2xl max-h-[90vh]
      rounded-2xl shadow-2xl flex flex-col overflow-hidden
      transform transition-all duration-300
      ${open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"}
    `}
        >


          {/* 🔹 Fixed Header */}
          <div className="sticky top-0 z-20 bg-white border-b px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold font-monasans_semibold">
                User Details
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
          </div>

          {/* 🔹 Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <InfoCard label="Name" value={user.name || "No Name"} />
              <InfoCard label="Email" value={user.email || "No Email"} />
              <InfoCard
                label="Role"
                value={user.role === "admin" ? "Admin" : "Customer"}
              />

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString()}
              />

              <InfoCard
                label="Last Updated"
                value={
                  user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "—"
                }
              />

              <InfoCard
                label="Total Orders"
                value={user.orders?.length ?? 0}
                large
              />

              <InfoCard
                label="Total Spent"
                value={`₹${totalSpent.toLocaleString()}`}
                large
              />
            </div>
          </div>

          {/* Optional: Fixed Footer */}
          <div className="border-t px-4 sm:px-6 py-4 bg-white">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end font-dmsans_light">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Close
              </Button>

              <Button
                variant="destructive"
                onClick={() => onDelete(user.id)}
                className="w-full sm:w-auto"
              >
                Delete User
              </Button>
            </div>
          </div>

        </div>
      </div>

  );
}
