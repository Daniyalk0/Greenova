"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { OrderStatus } from "@prisma/client";

type Props = {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
  disabled?: boolean;
};

// Custom styling function for the Badge (Trigger)
const getBadgeStyles = (status: OrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-50 text-[#0c831f] border-green-200 hover:bg-green-100";
    case "SHIPPED":
    case "PENDING":
    case "PAID":
    case "PLACED":
      return "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100";
    case "CANCELLED":
    case "FAILED":
      return "bg-red-50 text-red-600 border-red-200 hover:bg-red-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100";
  }
};

// Custom styling function for the Menu List Items
const getMenuItemStyles = (status: OrderStatus, isSelected: boolean) => {
  let colorClass = "text-gray-700 hover:bg-gray-50"; 
  
  switch (status) {
    case "DELIVERED":
      colorClass = "text-[#0c831f] hover:bg-green-50";
      break;
    case "SHIPPED":
    case "PENDING":
    case "PAID":
    case "PLACED":
      colorClass = "text-blue-600 hover:bg-blue-50";
      break;
    case "CANCELLED":
    case "FAILED":
      colorClass = "text-red-600 hover:bg-red-50";
      break;
  }

  return `${colorClass} ${isSelected ? "bg-gray-50/80" : ""}`;
};

// Formatter to make statuses look pretty
const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export default function StatusDropdown({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Excluded "PROCESSING" from this list
  const statuses: OrderStatus[] = [
    "PENDING",
    "PAID",
    "PLACED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "FAILED",
  ];

  // Hydration fix for React Portals
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8, // 8px below the button
        right: window.innerWidth - rect.right, // Align right edge to the button's right edge
      });
    }
    setOpen(!open);
  };

  // Close dropdown when clicking outside OR when scrolling the table/page
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      // If clicking outside the dropdown AND outside the trigger button, close it
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      // Close dropdown if the user scrolls the page or the table
      setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll, true); // `true` catches table overflow scrolling too

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <>
      {/* Trigger (Badge) */}
      <button
        ref={buttonRef}
        disabled={disabled}
        onClick={handleToggle}
        className={`flex ${disabled ? "opacity-50 cursor-not-allowed" : ""} items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-dmsans_semibold transition-all duration-200 ${getBadgeStyles(
          value
        )}`}
      >
        {formatStatus(value)}
        <ChevronDown 
          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} 
        />
      </button>

      {/* Dropdown Menu (Rendered via React Portal directly into <body>) */}
      {mounted && open && createPortal(
        <div
          ref={dropdownRef}
          style={{ top: coords.top, right: coords.right }}
          className="fixed w-40 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-[9999] overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-200"
        >
          {statuses.map((status) => {
            const isSelected = value === status;
            
            return (
              <button
                key={status}
             onClick={() => {
    if (disabled) return;
    onChange(status);
    setOpen(false);
  }}
                  disabled={disabled}
                className={`w-full text-left px-4 py-2.5 text-[13px] font-dmsans_semibold flex items-center justify-between transition-colors ${getMenuItemStyles(
                  status,
                  isSelected
                )}`}
              >
                {formatStatus(status)}
                
                {/* Show checkmark if this is the currently active status */}
                {isSelected && <Check className="w-4 h-4 opacity-80" />}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}