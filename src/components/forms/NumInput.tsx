// components/NumInput.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface NumInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "defaultValue" | "onChange"> {
  label?: string;
  error?: string;
  value?: number; // controlled value
  defaultValue?: number; // default fallback = 0
  allowDecimal?: boolean; // if false => only integers
  noNegative?: boolean; // if true => block negative values
  min?: number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onChange?: (value: number) => void; // callback returns number
}

const NumInput = React.forwardRef<HTMLInputElement, NumInputProps>(
  (
    {
      className,
      label,
      error,
      id,
      required,
      value,
      defaultValue = 0,
      allowDecimal = false,
      noNegative = false, min,
      startIcon,
      endIcon,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();

    // Handle controlled/uncontrolled
    const [internalValue, setInternalValue] = React.useState<number>(defaultValue);

    React.useEffect(() => {
      if (value !== undefined) setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      // Regex filtering
      const regex = allowDecimal ? /^-?\d*(\.\d*)?$/ : /^-?\d*$/;
      if (!regex.test(val)) return; // ignore invalid characters

      let num = val === "" ? 0 : Number(val);

      // Prevent negative if required
      if (noNegative && num < 0) num = 0;

            if (min !== undefined && num < min) num = min;

            
      setInternalValue(num);
      onChange?.(num);
    };

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-xs font-medium mb-1",
              // whitespace-nowrap w-20 text-ellipsis overflow-hidden
              error ? "text-red-500 dark:text-red-200" : "text-label dark:text-gray-200"
            )}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && <span className="absolute left-0 rounded-l-md top-0 bottom-0 bg-[#F0F0F0] dark:bg-gray-800 text-gray-800 dark:text-[#F0F0F0] flex items-center justify-center w-8 my-0.25 ml-0.25 text-sm font-semibold">{startIcon}</span>}

          <input
            id={inputId}
            ref={ref}
            type="text"
            value={internalValue}
            onChange={handleChange}
            aria-invalid={!!error}
            data-slot="num-input"
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-1 focus-visible:border-gray-400 focus-visible:ring-[0px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              error ? "border-red-500 ring-1 ring-red-300" : "",
              startIcon ? "pl-10" : "",
              endIcon ? "pr-9" : "",
              className
            )}
            {...props}
          />

          {endIcon && <span className="absolute right-3 text-gray-500">{endIcon}</span>}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

NumInput.displayName = "NumInput";

export { NumInput };
