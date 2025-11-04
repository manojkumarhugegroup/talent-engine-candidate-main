// components/CusDateRangePicker.tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface CusDateRangePickerProps {
  label?: string
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  error?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

const CusDateRangePicker = React.forwardRef<HTMLButtonElement, CusDateRangePickerProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      placeholder = "Pick a date range",
      className,
      disabled = false,
    },
    ref
  ) => {
    const [date, setDate] = React.useState<DateRange | undefined>(value)
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      setDate(value)
    }, [value])

    const handleSelect = (range: DateRange | undefined) => {
      setDate(range)
      onChange?.(range)
      if (range?.from && range?.to) {
        setOpen(false)
      }
    }

    const formatDateRange = (dateRange: DateRange | undefined) => {
      if (!dateRange) return placeholder
      if (dateRange.from) {
        if (dateRange.to) {
          return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(
            dateRange.to,
            "MMM dd, yyyy"
          )}`
        }
        return format(dateRange.from, "MMM dd, yyyy")
      }
      return placeholder
    }

    return (
      <div className={cn("w-full space-y-1 flex flex-col justify-between", className)}>
        {label && (
          <label
            className={cn(
              "block text-xs font-medium whitespace-nowrap",
              error ? "text-red-500 dark:text-red-200" : "text-label dark:text-gray-200"
            )}
          >
            {label}
          </label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              type="button"
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full justify-between text-left font-normal bg-transparent text-xs",
                !date && "text-muted-foreground",
                error && "border-red-500 ring-1 ring-red-300",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {formatDateRange(date)}
              <CalendarIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
              defaultMonth={date?.from || new Date()}
              initialFocus
              className="rounded-lg border-0 shadow-sm"
            />
          </PopoverContent>
        </Popover>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

CusDateRangePicker.displayName = "CusDateRangePicker"

export { CusDateRangePicker }
