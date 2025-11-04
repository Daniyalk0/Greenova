"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}


export default function NavLink({ href, children, className = "" } : NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? "text-[#6ed067]" : "text-[#000000]"} hover:text-[#6ed067] transition-all duration-300`}
    >
      {children}
    </Link>
  );
}
