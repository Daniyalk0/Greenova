"use client";

import { useState } from "react";

type ConfirmDeleteProps = {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  children?: React.ReactNode;

};

export default function ConfirmDelete({
  title = "Delete item",
  description = "Are you sure? This action cannot be undone.",
  onConfirm,
  children,

}: ConfirmDeleteProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center
    transition-opacity duration-300
    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300
      ${open ? "opacity-100" : "opacity-0"}
    `}
        />

        <div
          className={`relative bg-white  rounded-lg w-[90%] max-w-md p-6 space-y-4
      transform transition-all duration-300
      ${open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-3"}
    `}
        >

          <h2 className="text-lg font-semibold text-start">{title}</h2>
          <p className="text-sm text-gray-600 text-start">{description}</p>

          <div className="flex justify-start gap-3 pt-4">
            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className="px-4 py-2 text-sm border rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
