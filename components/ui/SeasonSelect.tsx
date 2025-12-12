"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type SeasonOption = {
    id: number;
    label: string;
};

type SeasonSelectProps = {
    seasons: SeasonOption[];
    onSelect: (season: SeasonOption) => void;
    className?: string;
    headingClass?: string;
};

export default function SeasonSelect({
    seasons,
    onSelect,
    className,
    headingClass
}: SeasonSelectProps) {
    const defaultSeason = seasons[0];
    const [selected, setSelected] = useState(defaultSeason);

    const [isOpen, setIsOpen] = useState(false); // mobile
    const [desktopOpen, setDesktopOpen] = useState(false); // desktop

    const handleSelect = (season: SeasonOption) => {
        setSelected(season);
        onSelect(season);
        setIsOpen(false);
        setDesktopOpen(false);
    };

    return (
        <div className={`mt-3 font-dmsans_light relative ${className} `}>
            {/* Mobile (< sm) */}
            <div className="block sm:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white flex justify-between items-center"
                >
                    <span>{selected.label}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            {/* Desktop (≥ sm) */}
            <div className="hidden sm:block w-[20rem]">
                <label
                    className={`${headingClass} block text-xs text-gray-700 mb-2 font-medium`}
                >
                    Choose Season
                </label>

                <button
                    onClick={() => setDesktopOpen(!desktopOpen)}
                    className={`
      w-full 
      border border-gray-300 
      rounded-xl 
      px-4 py-3 
      text-base 
      flex justify-between items-center 
      bg-white 
      shadow-sm 
      hover:shadow-md 
      transition-all
      ${desktopOpen ? "bg-green-100 border-green-400" : ""}
    `}
                >
                    <span className="font-medium">{selected.label}</span>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-600 transition-transform ${desktopOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {desktopOpen && (
                    <div
                        className="
        absolute z-20 mt-2 
        w-[20rem]
        bg-white 
        border border-gray-200 
        rounded-xl 
        shadow-xl 
        overflow-hidden
        animate-fadeIn
      "
                    >
                        {seasons.map((season) => (
                            <button
                                key={season.id}
                                onClick={() => handleSelect(season)}
                                className={`
            flex justify-between items-center 
            w-full 
            px-4 py-3 
            text-base 
            transition-colors
            ${selected.id === season.id
                                        ? "bg-green-100 text-green-700 font-semibold"
                                        : "text-gray-800 hover:bg-gray-100"
                                    }
          `}
                            >
                                <span>{season.label}</span>
                                {selected.id === season.id && (
                                    <Check className="w-5 h-5 text-green-600" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>


            {/* Mobile Bottom Sheet */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end sm:hidden">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative bg-white rounded-t-2xl shadow-lg p-4 h-[30vh] w-full animate-slideUp">
                        <h3 className="text-sm font-medium mb-3 text-gray-700">
                            Choose Season
                        </h3>

                        <div className="flex flex-col gap-2">
                            {seasons.map((season) => (
                                <button
                                    key={season.id}
                                    onClick={() => handleSelect(season)}
                                    className={`px-3 py-2 text-sm rounded-lg border text-left 
                    ${selected.id === season.id
                                            ? "border-green-600 bg-green-50 text-green-700"
                                            : "border-gray-200 hover:bg-gray-100"
                                        }
                  `}
                                >
                                    {season.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
