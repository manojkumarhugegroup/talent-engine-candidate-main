"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TableSkeletonProps {
  columns: number // Number of columns in the table
  rows?: number // Number of rows to show in skeleton
  header?: ReactNode // Optional header component
  compact?: boolean // Compact mode with less padding
  className?: string // Additional className for the container
  bodyOnly?: boolean // Show only body skeleton, not the full table structure
}

export const TableSkeleton = ({
  columns,
  rows = 10,
  header,
  compact = false,
  className,
  bodyOnly = false,
}: TableSkeletonProps) => {
  if (bodyOnly) {
    return (
      <>
        {/* Render custom header if provided */}
        {header}

        {/* Rows skeleton */}
        {Array(rows)
          .fill(0)
          .map((_, rowIdx) => (
            <div key={rowIdx} className="flex border-b border-gray-100 last:border-b-0 animate-pulse">
              {Array(columns)
                .fill(0)
                .map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className={cn("flex-1 border-r border-gray-100 last:border-r-0", compact ? "p-2" : "p-4")}
                  >
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>
                ))}
            </div>
          ))}
      </>
    )
  }

  return (
    <div className={cn("animate-pulse rounded-md border border-border", className)}>
      {/* Custom header or skeleton header */}
      {header ? (
        header
      ) : (
        <div className="flex border-b border-border">
          {Array(columns)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className={cn("flex-1 border-r border-border last:border-r-0", compact ? "p-2" : "p-4")}>
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            ))}
        </div>
      )}

      {/* Rows skeleton */}
      {Array(rows)
        .fill(0)
        .map((_, rowIdx) => (
          <div key={rowIdx} className="flex border-b border-border last:border-b-0">
            {Array(columns)
              .fill(0)
              .map((_, colIdx) => (
                <div
                  key={colIdx}
                  className={cn("flex-1 border-r border-border last:border-r-0", compact ? "p-2" : "p-4")}
                >
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}
