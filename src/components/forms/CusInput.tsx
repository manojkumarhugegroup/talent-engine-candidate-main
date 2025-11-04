// components/CusInput.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface CusInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  allowDecimal?: boolean;
  allowNegative?: boolean;
}

const CusInput = React.forwardRef<HTMLInputElement, CusInputProps>(
  ({ className, type, label, error, id, required, allowDecimal, allowNegative, ...props }, ref) => {
    const inputId = id ?? React.useId();

      // Handle number validation (keypress level)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === "number") {
        const key = e.key;

        // Block "e", "+", etc. unless explicitly allowed
        if (key === "e" || key === "E" || key === "+") {
          e.preventDefault();
        }

        // Block "-" if negatives are not allowed
        if (!allowNegative && key === "-") {
          e.preventDefault();
        }

        // Block "." if decimals are not allowed
        if (!allowDecimal && key === ".") {
          e.preventDefault();
        }
      }

      // Call user-defined onKeyDown if passed
      props.onKeyDown?.(e);
    };

    return (
      <div className="w-full space-y-1 flex flex-col justify-between">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-xs font-medium mb-1",
              // whitespace-nowrap w-20 text-ellipsis overflow-hidden
              error ? "text-red-500 dark:text-red-200" : "text-label dark:text-gray-200"
            )}
          >
            {label}{" "}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <input
          id={inputId}
          type={type}
          ref={ref}
          aria-invalid={!!error}
          data-slot="input"
           onKeyDown={handleKeyDown}
          // required={required}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-1 focus-visible:border-gray-400 focus-visible:ring-[0px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            error ? "border-red-500 ring-1 ring-red-300" : "",
              // Remove "appearance-none" if present → ensures arrows show for type=number
            className
          )}
          {...props}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

CusInput.displayName = "CusInput";

export { CusInput };
