'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, GalleryHorizontal, LayoutDashboard, LogOut, MapPin, Menu, Package, Settings, ShoppingBag, Users, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


const getInitials = (name?: string | null, email?: string | null) => {
  if (name) {
    const parts = name.trim().split(" ");
    return (
      (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")
    ).toUpperCase();
  }
  return email ? email[0].toUpperCase() : "U";
};

// deterministic pastel color based on email
const getPastelColor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`; // pastel
};



export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
    const { data: session, status } = useSession();
     const [loggingOut, setLoggingOut] = React.useState(false);
      const { email, name, image } = session?.user ?? {};
  const initials = getInitials(name, email);
  const pastelBg = getPastelColor(email ?? name ?? "user");

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Service Areas', href: '/admin/service-area', icon: MapPin },
    { name: 'Banners', href: '/admin/banners', icon: GalleryHorizontal },
  ];

  const handleLogout = async () => {
      if (loggingOut) return;
  
      try {
        setLoggingOut(true);
        await signOut();
      } finally {
        setLoggingOut(false);
      }
    };
  
    if (status === "loading") {
      return (
        <div className="w-[90px] h-[38px] rounded-lg bg-gray-200 animate-pulse mr-2" />
      );
    }
  

  return (
  <>
    {/* Mobile Menu Button */}
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className={`
        fixed top-3 p-2 
        bg-white/80 backdrop-blur-md z-[2000] rounded-xl shadow-sm
        md:hidden text-gray-600 hover:text-green-600
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "left-[213px] mt-1" : "left-3 border border-gray-200"}
      `}
    >
      {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
    </button>

    {/* Backdrop */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Sidebar */}
    <aside
      className={`
        fixed top-0 left-0 z-40
        h-screen w-[250px] sm:w-72 bg-white border-r border-gray-100
        flex flex-col transition-transform duration-300 ease-in-out
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 shadow-lg shadow-green-400"
        }
      `}
    >
      {/* Logo */}
      <div className="h-16 sm:h-20 flex items-center px-5 sm:px-8 border-b border-gray-50">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Package className="text-white" size={16} />
          </div>

          <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 uppercase tracking-tight font-monasans_semibold">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-3 sm:px-4 space-y-1 custom-scrollbar">
        <p className="px-3 sm:px-4 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4 font-dmsans_semibold">
          Main Menu
        </p>

        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-2.5 sm:gap-3
                px-3 sm:px-4 py-2.5 sm:py-3
                rounded-xl transition-all duration-200
                group font-dmsans_semibold text-sm sm:text-base
                ${
                  isActive
                    ? "bg-green-50 text-green-600 shadow-sm shadow-green-100/50"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <item.icon
                size={18}
                className={`${
                  isActive
                    ? "text-green-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />

              <span className="font-medium truncate">{item.name}</span>

              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
              )}
            </Link>
          );
        })}

        <div className="pt-5 mt-5 border-t border-gray-50">
          <p className="px-3 sm:px-4 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4 font-dmsans_semibold">
            Support
          </p>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all font-dmsans_semibold"
          >
            <ExternalLink size={18} />
            <span className="font-medium">View Store</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-gray-50">
        <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-2xl border border-gray-100 font-dmsans_semibold">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Avatar */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex items-center justify-center shrink-0">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-xs sm:text-sm font-semibold text-gray-700"
                  style={{ backgroundColor: pastelBg }}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Name */}
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs sm:text-sm text-gray-800 truncate">
                {name || "User"}
              </span>

              <span className="text-[10px] sm:text-xs text-gray-500">
                Admin
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`p-1.5 sm:p-2 transition-colors shrink-0 rounded-md ${
              loggingOut
                ? "text-red-400 bg-red-50/50 cursor-not-allowed"
                : "text-gray-400 hover:text-red-600"
            }`}
          >
            {loggingOut ? (
              <span className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin block" />
            ) : (
              <LogOut size={16} />
            )}
          </button>
        </div>
      </div>
    </aside>
  </>
);
}