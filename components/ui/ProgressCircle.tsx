"use client";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressCircleProps {
    size?: number;       // size of the circle
    strokeWidth?: number; // stroke thickness
    value: number;    // % value (0–100)
    color?: string;
    nutritionName?: string;
    progressColor?: string;
    textColor?:string;
    className?: string | undefined;     // progress color
}

export default function ProgressCircle({
    size = 80,
    strokeWidth = 8,
    value,
    color = "lime",
    progressColor,
    className,
    nutritionName,
    textColor,
}: ProgressCircleProps) {
    const radius = (size / 2) - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            {/* Circle with value in center */}
            <div
                className="relative flex items-center justify-center transition-all duration-700"
                style={{ width: size, height: size }}
            >
                <svg className="absolute -rotate-90" width={size} height={size}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />

                    {/* Progress circle with animation */}
                    <motion.circle
                        key={value}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={progressColor}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{
                            strokeDashoffset:
                                circumference - (value / 100) * circumference,
                        }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                </svg>

                {/* Value (inside circle) */}
                <div className="text-white text-xs sm:text-sm font-bold text-center font-monasans_semibold">
                    {value}
                </div>
            </div>

            {/* Nutrition name (below circle) */}
            <p className={`text-[9px] sm:text-[9px] mt-0 font-monasans_semibold transition-all duration-200`} style={{color:textColor}}>
                {nutritionName}
            </p>
        </div>


    );
}

