import { X } from "lucide-react";

interface ErrorModalProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({
  open,
  title = "Something went wrong",
  message,
  onClose,
}: ErrorModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-lg animate-in fade-in zoom-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <h3 className="font-dmsans_semibold text-lg font-semibold text-gray-900">{title} <span>❌</span></h3>
        <p className="mt-2 text-sm text-gray-600 font-dmsans_light font-semibold">{message}</p>

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-red-600 py-2 text-sm text-white hover:bg-red-700 font-dmsans_semibold transition-all duration-300"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
