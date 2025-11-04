"use client";
import * as React from "react";
import { XCircle, Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { commonType } from "@/types/masters/masters.type";

interface MultiSelectProps {
  name: string;
  options: commonType[];
  error?: string;
  placeholder?: string;
  label?: string;
  popoverWidth?: string;
  // optional controlled props (for Controller)
  value?: string[];
  onChange?: (vals: string[]) => void;
}

export function MultiSelectWithChips({
  name,
  options,
  error,
  placeholder = "Select...",
  label,
  popoverWidth = "w-[300px]",
  value: controlledValue,
  onChange: controlledOnChange,
}: MultiSelectProps) {
  // form context for uncontrolled usage
  const form = useFormContext();
  const setValue = form?.setValue;
  const watch = form?.watch;

  // If a controlled value is provided, use it; otherwise read from form context
  const selectedFromForm: string[] = watch ? watch(name) || [] : [];
  const selected = controlledValue ?? selectedFromForm ?? [];

  const setSelected = (vals: string[]) => {
    if (controlledOnChange) {
      controlledOnChange(vals);
      return;
    }
    if (setValue) {
      setValue(name, vals, { shouldValidate: true, shouldDirty: true });
    }
  };

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!controlledValue && setValue) {
      const cur = watch ? watch(name) : undefined;
      if (!Array.isArray(cur)) setValue(name, []);
    }
  }, [name, controlledValue, setValue]);

  const isSelected = (value: string) => selected.includes(value);

  const handleSelect = (value: string) => {
    if (!isSelected(value)) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((s) => s !== value));
    }
  };

  const handleRemove = (value: string) => {
    setSelected(selected.filter((s) => s !== value));
  };

  const displayText = selected.length ? selected.join(", ") : placeholder;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between bg-(--key-bg)",
              error ? "border-red-500" : ""
            )}
          >
            <span className="text-muted-foreground">
              {displayText}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="start"
          className={cn("p-0", popoverWidth)}
        >
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => {
                  const active = isSelected(opt.name);
                  return (
                    <CommandItem
                      key={opt.id ?? opt.name}
                      onSelect={() => handleSelect(opt.name)}
                      className="flex items-center justify-between"
                    >
                      <span>{opt.name}</span>
                      {active && <Check size={16} className="text-green-600" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Chips */}
      <div className="mt-2 flex flex-wrap gap-2">
        {selected.map((value) => (
          <Badge
            variant="secondary"
            key={value}
            className="rounded-sm bg-accent px-2 py-0.5 text-xs h-7 flex items-center"
          >
            <span className="truncate max-w-[10rem]">{value}</span>
            <button
              type="button"
              className="ml-1 p-0.5 h-4 w-4 flex items-center justify-center"
              onClick={() => handleRemove(value)}
              aria-label={`Remove ${value}`}
            >
              <XCircle className="h-3 w-3 text-red-500" />
            </button>
          </Badge>
        ))}
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
