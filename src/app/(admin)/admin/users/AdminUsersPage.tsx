import { Suspense } from "react";
import UsersSkeleton from "./UsersSkeleton";
import UsersTableWrapper from "./UsersTableWrapper";
// import UsersTableWrapper from "./UsersTableWrapper";
// import UsersSkeleton from "./UsersSkeleton";

export default function AdminUsersPage() {
  return (
    <div className="sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-8 bg-gray-50/50 min-h-screen">
      
      {/* Header (instant render) */}
      <div className="my-3 md:mb-3 md:mt-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-monasans_semibold text-gray-900">
          Users Management
        </h1>
        <p className="text-gray-500 text-[13px] sm:text-[14px] font-dmsans_light mt-1">
          Manage, monitor, and control all registered users on your platform.
        </p>
      </div>

      {/* Suspense handles loading */}
      <Suspense fallback={<UsersSkeleton />}>
        <UsersTableWrapper />
      </Suspense>
    </div>
  );
}