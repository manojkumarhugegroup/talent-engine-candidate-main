"use client"

import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import { AnimatedNumber } from "./AnimatedNumber"

interface StatCardProps {
    textColor: string
    bgColor: string
    icon?: string
    label: string
    value: number | string
    loading?: boolean
}

export function StatCard({ textColor, bgColor, icon, label, value, loading }: StatCardProps) {
    return (
        <div
            className={`rounded-lg pt-2 pb-1.5 px-3 flex flex-col items-start gap-1 min-w-[110px] justify-between ${loading ? "animate-pulse" : ""
                }`}
            style={{
                backgroundColor: loading ? `var(--${textColor}/40)` : `var(--${bgColor})`
            }}
        >
            <div className="flex items-center gap-2">
                {icon && <Image src={icon} alt={label} width={18} height={18} />}
                <span className="text-xs font-medium text-gray-700">{label}</span>
            </div>
            {loading ? (
                <Skeleton
                    className="h-6 w-12 rounded opacity-10"
                    style={{ backgroundColor: `var(--${textColor})` }}
                />
            ) : (
                <span className="text-xl font-bold" style={{ color: `var(--${textColor})` }}>

                    <AnimatedNumber value={value} />
                    
                </span>
            )}
        </div>
    )
}

