import { Suspense } from "react";
import { MapPin, Users } from "lucide-react";
import ServiceAreaSkeleton from "../service-area/ServiceAreaSkeleton";
import ServiceAreaWrapper from "../service-area/ServiceAreaWrapper";
import UsersSkeleton from "./UsersSkeleton";
import UsersTableWrapper from "./UsersTableWrapper";
// import ServiceAreaWrapper from "./ServiceAreaWrapper";
// import ServiceAreaSkeleton from "./ServiceAreaSkeleton";

export default function Page() {
  return (
    <div className="p-3 sm:p-4 lg:p-8 bg-gray-50/50">
      {/* ✅ Header (same pattern as Users) */}
      <div className="my-3 md:mb-3 md:mt-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-monasans_semibold text-gray-900 flex items-center gap-2 sm:gap-3">
          {/* <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#0c831f]" /> */}
          Users
        </h1>

        <p className="text-gray-500 text-[13px] sm:text-[14px] font-dmsans_light mt-1">
          Manage registered users, account details, and customer activity.
        </p>
      </div>

      {/* ✅ Data (same structure everywhere) */}
      <Suspense fallback={<UsersSkeleton />}>
        <UsersTableWrapper />
      </Suspense>
    </div>
  );
}
