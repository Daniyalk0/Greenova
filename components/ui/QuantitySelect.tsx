"use client"
import { useEffect, useState } from "react"
import { ChevronDown, Check } from "lucide-react"

// const options = [
//   { id: 1, label: "1 kg - ₹120" },
//   { id: 2, label: "2 kg - ₹230" },
//   { id: 5, label: "5 kg - ₹550" },
// ]
type Option = {
  weight: number
  price: number
}
type QuantitySelectProps = {
  options: Option[]
  onSelect: (option: Option) => void
  className?: string
  headingClass?: string
}


export default function QuantitySelect({ options, onSelect, className, headingClass }: QuantitySelectProps) {
  const defaultOption = options.find(opt => opt.weight === 1) || options[0]
  const [selected, setSelected] = useState(defaultOption)

  const [isOpen, setIsOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(false)
  const handleSelect = (opt: Option) => {
    setSelected(opt)
    onSelect(opt)
    setIsOpen(false) // close dropdown
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);



  return (
    <div className={`mt-3 font-dmsans_light relative ${className}`}>
      {/* ✅ Mobile (< sm) → Trigger button */}
      <div className="block sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs bg-white flex justify-between items-center"
        >
          <span>
            {selected.weight} kg — ₹{selected.price.toFixed(0)}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* ✅ Desktop (≥ sm) → Custom styled dropdown */}
      <div className="hidden sm:block">
        <label className={`${headingClass} block text-[0.6rem] text-gray-700 mb-1`}>Choose Quantity</label>
        <button
          onClick={() => setDesktopOpen(!desktopOpen)}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm flex justify-between items-center focus:outline-none   transition-colors
      ${desktopOpen ? "bg-green-200 " : "bg-white"}
    `}
        >
          <span>
            {selected.weight} kg — ₹{selected.price.toFixed(0)}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${desktopOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* Dropdown list */}
        {desktopOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md">
           {options.map((opt, index) => {
  const isSelected = selected?.weight === opt.weight;

  return (
    <button
      key={index}
      onClick={() => {
        setDesktopOpen(false);
        handleSelect(opt);
      }}
      className={`flex justify-between items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-green-50
        ${isSelected
          ? "text-green-700 font-medium bg-green-50"
          : "text-gray-700"
        }
      `}
    >
      {/* LEFT: Weight + Price */}
      <div className="flex items-center gap-2">
        <span>{opt.weight} kg</span>

        <div className="flex items-center gap-1">
          <span className="font-semibold">
            ₹{opt.price.toFixed(0)}
          </span>

          {opt.originalPrice && opt.originalPrice > opt.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{opt.originalPrice.toFixed(0)}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT: Check icon */}
      {isSelected && (
        <Check className="w-4 h-4 text-green-600 shrink-0" />
      )}
    </button>
  );
})}

          </div>
        )}
      </div>

      {/* ✅ Mobile Bottom Sheet Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-[2000] sm:hidden flex flex-col">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="
      mt-auto 
      bg-white 
      rounded-t-2xl 
      shadow-lg 
      p-4 
      w-full 
      h-[35vh] 
      animate-slideUp 
      relative
    ">
            <h3 className="text-sm font-medium mb-3 text-gray-700">Choose Quantity</h3>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-[28vh]">
             {options.map((opt, index) => {
  const isSelected = selected?.weight === opt.weight;

  return (
    <button
      key={index}
      onClick={() => handleSelect(opt)}
      className={`px-3 py-2 text-sm rounded-lg border text-left transition
        ${isSelected
          ? "border-green-600 bg-green-50 text-green-700"
          : "border-gray-200 hover:bg-gray-100 text-gray-700"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <span>{opt.weight} kg</span>

        <div className="flex items-center gap-1">
          <span className="font-semibold">
            ₹{opt.price.toFixed(0)}
          </span>

          {opt.originalPrice && opt.originalPrice > opt.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{opt.originalPrice.toFixed(0)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
})}

            </div>
          </div>
        </div>
      )}

    </div>
  )
}
