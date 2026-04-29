// /app/(admin)/admin/service-area/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Plus, Loader2 } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0c831f] text-white rounded-xl hover:bg-[#0a6c19] hover:shadow-[0_4px_12px_rgba(12,131,31,0.2)] transition-all font-dmsans_semibold text-[14px] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      {pending ? "Saving..." : "Save Area"}
    </button>
  );
}