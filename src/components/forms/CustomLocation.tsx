"use client";
import * as React from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

type Location = {
  label: string;
  value: string;
  code: string;
};

type LocationComboboxProps = {
  locations: Location[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onSelectLocation?: (location: { id: string; code: string }) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  handleSearchInput: (input: string) => void;
  searchInput?: string;
};

export function LocationCombobox({
  locations,
  onSelectLocation,
  onLoadMore,
  hasMore,
  isLoading,
  handleSearchInput,
  searchInput,
  value
}: LocationComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValue = watch("current_location") || value;

  console.log(selectedValue,'selectedValue');
  

  // Deduplicate locations by ID
  const uniqueLocations = React.useMemo(() => {
    const seen = new Set();
    return locations.filter((loc) => {
      if (seen.has(loc.value)) return false;
      seen.add(loc.value);
      return true;
    });
  }, [locations]);

  const handleSelect = (currentValue: string) => {
    const selectedLocation = uniqueLocations.find(
      (loc) => loc.value === currentValue
    );
    if (selectedLocation && onSelectLocation) {
      onSelectLocation({
        id: selectedLocation.value,
        code: selectedLocation.code,
      });
    }
    setOpen(false);
  };

  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open || isLoading) return;

    const timer = requestAnimationFrame(() => {
      const el = listRef.current?.querySelector(
        "[cmdk-list]"
      ) as HTMLDivElement | null;
      if (!el) return;
      const handleScroll = () => {
        if (!hasMore || isLoading) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          onLoadMore?.();
        }
      };
      el.addEventListener("scroll", handleScroll);
      return () => {
        el.removeEventListener("scroll", handleScroll);
      };
    });

    return () => cancelAnimationFrame(timer);
  }, [open, hasMore, isLoading, onLoadMore]);

  return (
    <div className="w-full space-y-1 flex flex-col justify-between">
      <Label
        htmlFor="location"
        className={cn(
          "block text-xs font-medium whitespace-nowrap",
          errors.location
            ? "text-red-500 dark:text-red-200"
            : "text-label dark:text-gray-200"
        )}
      >
        Location *
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-(--key-bg) border-(--interview) text-xs",
              errors.location && "border-red-500 ring-1 ring-red-300"
            )}
          >
            {selectedValue
              ? uniqueLocations.find((loc) => loc.value === selectedValue)
                  ?.label
              : "Select location..."}

            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={4}
          style={{ width: buttonRef.current?.offsetWidth }}
          className="p-0 bg-card border border-input text-foreground shadow-md"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search location..."
              className="h-9 placeholder:text-muted-foreground"
              value={searchInput}
              onValueChange={(val) => {
                handleSearchInput(val);
              }}
            />

            <div ref={listRef}>
              <CommandList className="max-h-60 overflow-y-auto">
                <CommandGroup>
                  {uniqueLocations.map((loc, index) => (
                    <CommandItem
                      key={`${loc.value}-${index}`}
                      value={loc.label}
                      onSelect={() => handleSelect(loc.value)}
                      className="hover:bg-muted"
                    >
                      {loc.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedValue === loc.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>

                {isLoading && (
                  <div className="text-center py-2 text-sm text-muted-foreground">
                    Loading more...
                  </div>
                )}
                {!hasMore && uniqueLocations.length > 0 && (
                  <div className="text-center py-2 text-xs text-muted-foreground">
                    No more locations
                  </div>
                )}
              </CommandList>
            </div>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Error message (updated style) */}
      {typeof errors.location?.message === "string" && (
        <p className="text-sm text-red-500">{errors.location.message}</p>
      )}
    </div>
  );
}
