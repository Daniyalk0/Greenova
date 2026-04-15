import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authConfig } from "../../api/auth/[...nextauth]/auth.config";
import AdminSidebar from "./products/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

return (
  <div className="min-h-screen flex bg-gray-100">
    <AdminSidebar />

    <main className="flex-1 p-6 ml-0 md:ml-72">
      {children}
    </main>
  </div>
);
}
