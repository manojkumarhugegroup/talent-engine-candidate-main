import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyDetailProps {
    label: string
    value?: string | number | React.ReactNode
    size?: "xs" | "sm" | "base" | "lg"
    className?: string
    color?: string // Optional color prop
    fontWeight?: "normal" | "bold" | "semibold" // Optional font weight
    vFontWeight?: "normal" | "bold" | "semibold" // Optional font weight
    isMultiline?: boolean // Optional prop to control multiline behavior
}

const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
}

export const CusTypography: React.FC<TypographyDetailProps> = ({
    label,
    value,
    size = "base",
    className,
    color,
    fontWeight = "normal",
    vFontWeight = "normal",
    isMultiline = false,
}) => {
    return (
        <p className={cn("text-foreground", sizeMap[size], className)}>
            <span className="font-medium">{label}{value && ":"}</span>{" "}
            {/* Conditionally apply styles for color, font weight, and multiline */}
            <span
                className={cn('capitalize',
                    color ? color : "text-muted-foreground", // Color
                    // fontWeight === "bold" ? "font-bold" : fontWeight === "semibold" ? "font-semibold" : "font-normal", // Font weight
                    vFontWeight === "bold" ? "font-bold" : fontWeight === "semibold" ? "font-semibold" : "font-normal", // Font weight
                    isMultiline ? "block mt-1" : "" // Multiline handling
                )}
            >
                {value}
            </span>
        </p>
    )
}
