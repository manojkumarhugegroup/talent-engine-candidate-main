// components/CusDatePicker.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface CusDatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
}

const CusDatePicker = React.forwardRef<HTMLButtonElement, CusDatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      required,
      disabled,
      placeholder = "Pick a date",
      maxDate,
      minDate,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-full space-y-1 flex flex-col justify-between">
        {label && (
          <label
            className={cn(
              "block text-xs font-medium whitespace-nowrap",
              error
                ? "text-red-500 dark:text-red-200"
                : "text-label dark:text-gray-200"
            )}
          >
            {label} {required && <span className="text-red-500">*</span>}
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
                !value && "text-muted-foreground",
                error && "border-red-500 ring-1 ring-red-300"
              )}
            >
              {value ? (
                format(value, "MMM dd yyyy")
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarDaysIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(val) => {
                onChange?.(val);
                setOpen(false);
              }}
              disabled={(date) => {
                if (minDate && date < minDate) return true;
                if (maxDate && date > maxDate) return true;
                return date < new Date("2025-01-01");
              }}
              // disabled={(date) =>
              //   (maxDate && date > maxDate) ||
              //   (minDate && date < minDate) ||
              //   date < new Date("1900-01-01")
              // }
              captionLayout="dropdown"
              fromYear={2025}
              toYear={2100}
            />
          </PopoverContent>
        </Popover>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

CusDatePicker.displayName = "CusDatePicker";

export { CusDatePicker };
