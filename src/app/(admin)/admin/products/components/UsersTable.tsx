"use client";

import { useState, useMemo, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleteUser } from "../actions";
import { X } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";

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
  updatedAt: string;
  orders: Order[];
}

export default function UsersTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const totalCustomers = users.filter((u) => u.role === "USER").length;

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    startTransition(async () => {
      await deleteUser(id);
      router.refresh();
      setSelectedUser(null);
    });
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };


  return (
    <>

      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full font-monasans_semibold">
          <Card className="rounded-2xl shadow-sm ">
            <CardContent className="p-4">
              <p className="text-xs  sm:text-sm text-muted-foreground">Users</p>
              <p className="text-2xl font-semibold">{totalUsers}</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs sm:text-sm text-muted-foreground">Admins</p>
              <p className="text-2xl font-semibold">{totalAdmins}</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm ">
            <CardContent className="p-4">
              <p className="text-xs sm:text-sm text-muted-foreground">Customers</p>
              <p className="text-2xl font-semibold">{totalCustomers}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <Input
            placeholder="Search by name or email..."
            value={search}
            className="font-dmsans_light"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Mobile: Card View, Desktop: Table */}

        {/* Mobile Cards */}
        {/* <div className="block md:hidden space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="rounded-2xl shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{user.name || "No Name"}</p>
                    <p className="text-muted-foreground text-xs">
                      {user.email || "No Email"}
                    </p>
                  </div>
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role.trim()}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredUsers.length === 0 && (
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center text-muted-foreground">
                No users found.
              </CardContent>
            </Card>
          )}
        </div> */}

        {/* Desktop Table */}


        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left font-dmsans_semibold text-zinc-700 border-b border-zinc-300 uppercase">
                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-medium">
                    User
                  </th>

                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-medium">
                    Role
                  </th>

                  {/* Hide joined on very small screens */}
                  <th className="hidden sm:table-cell px-3 sm:px-4 py-3 sm:py-4 font-medium">
                    Joined
                  </th>

                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-green-100 font-monasans_semibold">

                    {/* User */}
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div>
                        <p className="text-xs sm:text-sm">
                          {user.name || "No Name"}
                        </p>
                        <p className="text-muted-foreground  sm:text-xs truncate max-w-[140px] sm:max-w-none">
                          {user.email || "No Email"}
                        </p>
                      </div>
                    </td>

                    {/* Role */}
                     <td className="px-0 sm:px-2 py-3 sm:py-4">
                      <span
                        className={`bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-dmsans_semibold  sm:text-xs ${user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>

                    {/* Joined (hidden on very small screens) */}
                    <td className="hidden sm:table-cell px-3 sm:px-4 py-3 sm:py-4 font-xs sm:font-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-0">

                        {/* Mobile Icons */}
                        <button
                          onClick={() => handleViewUser(user)}
                          className="sm:hidden p-1 rounded-md hover:bg-muted"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="sm:hidden p-1 rounded-md hover:bg-red-100 text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>

                        {/* Desktop Buttons */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewUser(user)}
                          className="hidden sm:inline-flex"
                        >
                          View
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(user.id)}
                          className="hidden sm:inline-flex"
                        >
                          Delete
                        </Button>

                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-6 text-center text-muted-foreground font-dmsans_light"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <UserDetailsModal
        user={selectedUser}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={(id) => {
          handleDelete(id);
          setIsModalOpen(false);
        }}
      />

    </>
  );
}