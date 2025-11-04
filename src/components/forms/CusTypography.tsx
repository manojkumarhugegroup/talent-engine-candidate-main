import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyDetailProps {
    label: string
    value?: string | number | React.ReactNode
    size?: "xs" | "sm" | "base" | "lg"
    className?: string

    // Label props
    labelColor?: string
    labelFontWeight?: "normal" | "bold" | "semibold" | "medium"

    // Value props
    valueColor?: string
    valueFontWeight?: "normal" | "bold" | "semibold" | "medium"

    isMultiline?: boolean // Value handling for multiline
    variant?: "block" | "flex" | "inline-flex" | "inline-block" // Layout variant
    gap?: string // for flex variants
}

const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
}

const weightMap = {
    normal: "font-normal",
    bold: "font-bold",
    semibold: "font-semibold",
}

export const CusTypography: React.FC<TypographyDetailProps> = ({
    label,
    value,
    size = "sm",
    className,
    labelColor = "text-label",
    labelFontWeight = "semibold",
    valueColor = "text-(--muted-foreground)",
    valueFontWeight = "medium",
    isMultiline = false,
    variant = "flex",
    gap = "gap-1",
}) => {
    return (
        <div
            className={cn(
                sizeMap[size],
                variant === "flex" || variant === "inline-flex" ? gap : "",
                variant === "block"
                    ? "block"
                    : variant === "inline-block"
                        ? "inline-block"
                        : variant === "flex"
                            ? "flex items-center"
                            : "inline-flex items-center",
                className
            )}
        >
            <span
                className={cn(
                    "whitespace-nowrap",
                    labelColor,
                    weightMap[labelFontWeight as keyof typeof weightMap] || "font-normal"
                )}
            >
                {label}
                {value && ":"}
                {variant === "block" && " "}
            </span>
            <span
                className={cn(
                    "capitalize",
                    valueColor,
                    weightMap[valueFontWeight as keyof typeof weightMap] || "font-normal",
                    isMultiline ? "block mt-1" : ""
                )}
            >
                {value}
            </span>
        </div>
    )
}
