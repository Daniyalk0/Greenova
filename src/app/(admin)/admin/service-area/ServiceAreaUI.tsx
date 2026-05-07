import React from "react";
import { prisma } from "@/lib/prisma";
import { addOrUpdateServiceArea, deleteServiceArea } from "./actions";
import { MapPin, Plus, Trash2, Map } from "lucide-react";
import SubmitButton from "./SubmitButton";

const ServiceAreaUI = ({ areas }: { areas: any[] }) => {
    const getStatusStyles = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-[#0c831f]/10 text-[#0c831f] border-[#0c831f]/20";
    case "LIMITED":
      return "bg-amber-50 text-amber-600 border-amber-200";
    case "UNAVAILABLE":
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
};
  return (
    <div>
      {" "}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h2 className="font-dmsans_semibold text-[16px] text-gray-900 mb-4">
          Add or Update Pincode
        </h2>

        <form
          action={addOrUpdateServiceArea}
          className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4"
        >
          {/* Pincode Input */}
          <div className="sm:col-span-5">
            <input
              type="text"
              name="pincode"
              placeholder="Enter 6-digit Pincode"
              required
              maxLength={6}
              pattern="[0-9]*"
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all"
            />
          </div>

          {/* Status Select */}
          <div className="sm:col-span-4">
            <select
              name="status"
              required
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all appearance-none cursor-pointer"
            >
              <option value="ACTIVE">🟢 Active</option>
              <option value="LIMITED">🟠 Limited</option>
              <option value="UNAVAILABLE">⚫ Unavailable</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-3">
            <SubmitButton />
          </div>
        </form>
      </div>
      {/* List Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/80">
          <h2 className="font-dmsans_semibold text-[15px] text-gray-900">
            Active Service Areas ({areas.length})
          </h2>
        </div>

        {areas.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {areas.map((area) => (
              <div
                key={area.id}
                className="flex flex-row items-center justify-between p-4 sm:px-5 sm:py-4 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>

                  <div className="flex flex-col">
                    <p className="font-dmsans_semibold text-[15px] text-gray-900 tracking-wide">
                      {area.pincode}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-dmsans_semibold uppercase tracking-wider border w-max ${getStatusStyles(
                        area.status,
                      )}`}
                    >
                      {area.status}
                    </span>
                  </div>
                </div>

                <form action={deleteServiceArea}>
                  <input type="hidden" name="id" value={area.id} />
                  <button
                    type="submit"
                    title="Delete Service Area"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 focus:outline-none"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
              <Map className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
            </div>
            <h3 className="font-monasans_semibold text-[16px] text-gray-900 mb-1">
              No service areas found
            </h3>
            <p className="font-dmsans_light text-gray-500 text-[14px] max-w-[250px]">
              Add your first pincode above to start offering deliveries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceAreaUI;
