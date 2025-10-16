"use client"
import { useState } from "react"
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
}


export default function QuantitySelect({ options, onSelect }: QuantitySelectProps) {
const defaultOption = options.find(opt => opt.weight === 1) || options[0]
const [selected, setSelected] = useState(defaultOption)

  const [isOpen, setIsOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(false)
    const handleSelect = (opt: Option) => {
    setSelected(opt)
    onSelect(opt)
    setIsOpen(false) // close dropdown
  }

  console.log('options' , options);
  

  return (
    <div className="mt-3 font-dmsans_light relative">
      {/* ✅ Mobile (< sm) → Trigger button */}
      <div className="block sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white flex justify-between items-center"
        >
           <span>
          {selected.weight} kg — ₹{selected.price.toFixed(0)}
        </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* ✅ Desktop (≥ sm) → Custom styled dropdown */}
      <div className="hidden sm:block">
        <label className="block text-[0.6rem] text-gray-700 mb-1">Choose Quantity</label>
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
            {options.map((opt, index) => (
              <button
                key={index}
                onClick={() => {
                  setDesktopOpen(false)
                  handleSelect(opt)
                }}
                className={`flex justify-between items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-green-50 ${selected.weight === opt.weight
                    ? "text-green-700 font-medium bg-green-50"
                    : "text-gray-700"
                  }`}
              >
                <span>{opt.weight} kg — ₹{opt.price.toFixed(0)}</span>
                {selected?.weight === opt.weight && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </button>
            ))}

          </div>
        )}
      </div>

      {/* ✅ Mobile Bottom Sheet Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="relative bg-white rounded-t-2xl shadow-lg p-4 h-[30vh] w-full animate-slideUp">
            <h3 className="text-sm font-medium mb-3 text-gray-700">
              Choose Quantity
            </h3>
            <div className="flex flex-col gap-2">
              {options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleSelect(opt)
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border text-left ${selected && selected.weight === opt.weight
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 hover:bg-gray-100"
                    }`}
                >
                 <span>{opt.weight} kg — ₹{opt.price.toFixed(0)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
