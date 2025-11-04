"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface CusTypographyProps {
  label: string
  value: string | number
  variant?: "block" | "flex"
  labelWeight?: "normal" | "medium" | "semibold" | "bold"
  valueWeight?: "normal" | "medium" | "semibold" | "bold"
  labelColor?: string
  valueColor?: string
  labelSize?: "xs" | "sm" | "base" | "lg" | "xl"
  valueSize?: "xs" | "sm" | "base" | "lg" | "xl"
}

export const CusTypography2: React.FC<CusTypographyProps> = ({
  label,
  value,
  variant = "block",
  labelWeight = "normal",
  valueWeight = "medium", // default like your code
  labelColor = "text-(--labelLight)",
  valueColor = "text-label",
  labelSize = "sm",
  valueSize = "base",
}) => {
  const weightMap: Record<string, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }

  const sizeMap: Record<string, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  return variant === "block" ? (
    <div className="flex-1 w-full">
      <p
        className={cn(
          labelColor,
          weightMap[labelWeight],
          sizeMap[labelSize],
          "mb-1"
        )}
      >
        {label}
      </p>
      <p className={cn(valueColor, weightMap[valueWeight], sizeMap[valueSize])}>
        {value}
      </p>
    </div>
  ) : (
    <p className={cn(labelColor, weightMap[labelWeight], sizeMap[labelSize])}>
      {label}:{" "}
      <span
        className={cn(valueColor, weightMap[valueWeight], sizeMap[valueSize])}
      >
        {value}
      </span>
    </p>
  )
}
