import * as React from "react";
import { cn } from "@/lib/utils";

interface CusTextareaProps extends React.ComponentProps<"textarea"> {
  error?: string;
  label?: string;

  mHeight?: string
}

function CusTextarea({ label, mHeight = "100px", className, error, ...props }: CusTextareaProps) {
  return (
    <div>
      {label && (
        <label
          className={cn(
            "block text-xs font-medium mb-1",
            // whitespace-nowrap w-20 text-ellipsis overflow-hidden
            error ? "text-red-500 dark:text-red-200" : "text-label dark:text-gray-200"
          )}
        >
          {label}{" "}
        </label>
      )}

      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-within:border-gray-400 focus-within:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-10 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-destructive ring-destructive/20",  
          className
        )}
        aria-invalid={error ? "true" : "false"}
        {...props}
        style={{ resize: "none", maxHeight: mHeight }}
      />
      {error && (
        <p className="text-destructive text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { CusTextarea };