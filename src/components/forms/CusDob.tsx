// components/forms/CusDobPicker.tsx
"use client";

import * as React from "react";
import { format, subYears } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface CusDobPickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const CusDobPicker = React.forwardRef<HTMLButtonElement, CusDobPickerProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      required,
      disabled,
      placeholder = "Pick your date of birth",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const maxAllowedDate = subYears(new Date(), 18);
    const minAllowedDate = new Date("1950-01-01");

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
                "w-full justify-between text-left font-normal text-(--create-text)  border-(--interview) bg-(--key-bg) text-xs ",
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
              defaultMonth={value ?? maxAllowedDate}
              disabled={(date) =>
                date > maxAllowedDate || date < minAllowedDate
              }
              captionLayout="dropdown"
              fromYear={1950}
              toYear={maxAllowedDate.getFullYear()}
            />
          </PopoverContent>
        </Popover>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

CusDobPicker.displayName = "CusDobPicker";

export { CusDobPicker };
