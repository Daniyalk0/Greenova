import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function SearchPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on "Esc" key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

       const modalRef = useRef<HTMLDivElement | null>(null);
      //   const [showModal, setShowModal] = useState(false);
      
      
        // Close when clicking outside the modal
        useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
              setIsOpen(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [setIsOpen]);

  return (
    <div className="relative md:w-[40%] lg:w-[50%]">
      {/* Search Input */}
      <div className="relative w-fit md:w-full">
        {/* Magnifying Glass (only mobile) */}
        <Search className="w-5 h-5 block md:hidden "  onClick={() => setIsOpen(true)} />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 hidden md:inline-block " />

        <input
          type="text"
          placeholder="Search..."
          className="w-full hidden md:flex pl-8 pr-3 py-2 text-sm border-gray-300 rounded-md focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none border-b-[1px]"
          onFocus={() => setIsOpen(true)}
        />
      </div>


      {/* Overlay & Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50">
          <div className="mt-40 w-[95%] md:w-full max-w-lg bg-white rounded-xl shadow-lg p-4" ref={modalRef}>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium text-gray-700">Search Products</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xs"
              >
                Esc ✕
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                autoFocus
              />
            </div>

            {/* Results */}
            <ul className="mt-4 max-h-60 overflow-y-auto text-sm">
              <li className="p-2 rounded hover:bg-gray-100 cursor-pointer">🍎 Apples</li>
              <li className="p-2 rounded hover:bg-gray-100 cursor-pointer">🥕 Carrots</li>
              <li className="p-2 rounded hover:bg-gray-100 cursor-pointer">🥭 Mangoes</li>
              <li className="p-2 rounded hover:bg-gray-100 cursor-pointer">🍌 Bananas</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
