'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, GalleryHorizontal, LayoutDashboard, LogOut, MapPin, Menu, Package, Settings, ShoppingBag, Users, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';


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
    const { data: session } = useSession();
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

   return (
    <>
      {/* Mobile Menu Button - Floating Glassmorphism style */}
   <button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className={`
    fixed top-4  p-2.5 
    bg-white/80 backdrop-blur-md z-[2000]  rounded-xl shadow-sm 
    md:hidden text-gray-600 hover:text-green-600 
    transition-all duration-300 ease-in-out
    ${sidebarOpen ? 'left-[240px] mt-1' : 'left-4 border border-gray-200'}
  `}
>
  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
</button>

      {/* Backdrop with blur */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed  top-0 left-0 z-40
          h-screen w-72 bg-white border-r border-gray-100
          flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 shadow-lg shadow-green-400'}
        `}
      >
        {/* BRANDING / LOGO AREA */}
        <div className="h-20 flex items-center px-8 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Package className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 uppercase tracking-tight font-monasans_semibold ">
              Admin Panel
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 font-dmsans_semibold">
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
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-dmsans_semibold
                  ${isActive 
                    ? 'bg-green-50 text-green-600 shadow-sm shadow-green-100/50' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon 
                  size={20} 
                  className={`${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`} 
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-600" />
                )}
              </Link>
            );
          })}

          <div className="pt-6 mt-6 border-t border-gray-50">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 font-dmsans_semibold">
              Support
            </p>
          
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all font-dmsans_semibold"
            >
              <ExternalLink size={20} />
              <span className="font-medium">View Store</span>
            </Link>
          </div>
        </nav>

        {/* FOOTER / USER AREA */}
  <div className="p-4 border-t border-gray-50">
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 font-dmsans_semibold">
    
    <div className="flex items-center gap-3">
      
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-700"
            style={{ backgroundColor: pastelBg }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name + Role */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-gray-800">{name || "User"}</span>
        <span className="text-xs text-gray-500">Admin</span>
      </div>

    </div>

    {/* Logout */}
    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
      <LogOut size={18} />
    </button>

  </div>
</div>
      </aside>
    </>
  );
}