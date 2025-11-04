import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // or use clsx or your own class merging utility

interface CusContactFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  selectedCountryCode?: string | null;
  selectedLocation?: string | null;
  required?: boolean;
  getDialCodeByCountryCode: (code: string | null) => string;
}

export const CusContactField = React.forwardRef<HTMLInputElement, CusContactFieldProps>(
  (
    {
      label = "Contact No.",
      error,
      selectedCountryCode,
      selectedLocation,
      required,
      getDialCodeByCountryCode,
      className,
      ...props
    },
    ref
  ) => {
    const dynamicPlaceholder = selectedLocation
      ? "Enter your contact number"
      : "Choose Location to enter your contact number";

    return (
      <div className="w-full space-y-1 flex flex-col justify-between">
        {label && (
          <Label
            className={cn(
              "mb-1 block text-xs font-medium",
              error ? "text-red-500 dark:text-red-200" : "text-label dark:text-gray-200"
            )}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
        )}

        <div className="relative flex items-center">
          {selectedCountryCode && (
            <div className="absolute left-2">
              <img
                src={`https://flagcdn.com/24x18/${selectedCountryCode.toLowerCase()}.png`}
                alt={selectedCountryCode}
                className="w-6 h-4 rounded-sm"
              />
            </div>
          )}

          {selectedCountryCode && (
            <span className="absolute left-10 text-muted-foreground text-sm">
              {getDialCodeByCountryCode(selectedCountryCode)}
            </span>
          )}

          <Input
            type="tel"
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              `${selectedLocation ? "pl-24" : "pl-2"} pr-4 text-(--create-text) border-(--interview) bg-(--key-bg) focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-slate-400`,
              error ? "border-red-500 ring-1 ring-red-300" : "",
              className
            )}
            placeholder={dynamicPlaceholder}
            disabled={!selectedLocation}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            {...props}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

CusContactField.displayName = "CusContactField";
