import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface CusSelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  defaultValue?: string;
  onValueChange?: (value: string | number) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

const CusSelect = React.forwardRef<HTMLButtonElement, CusSelectProps>(
  (
    {
      label,
      error,
      required,
      value,
      defaultValue,
      onValueChange,
      children,
      placeholder = "Select...",
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();

    return (
      <div className="w-full space-y-1 flex flex-col justify-between">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block text-xs font-medium mb-1",
              error ? "text-red-500 dark:text-red-200" : "text-label dark:text-gray-200"
            )}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <Select
          value={value?.toString()}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}

        >
          <SelectTrigger
            ref={ref}
            id={selectId}
            className={cn(
              "w-full border-input h-9 rounded-md px-3 text-sm shadow-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              "focus-visible:border-gray-400 focus-visible:ring-0",
              error ? "border-red-500 ring-1 ring-red-300" : "",
              className
            )}
            {...props}
            disabled={disabled}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent className="max-h-80">
            {children}
          </SelectContent>
        </Select>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

CusSelect.displayName = "CusSelect";

export { CusSelect };
