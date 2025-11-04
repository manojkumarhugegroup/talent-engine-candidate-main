import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

interface SearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export function SearchComp({ onSearch, placeholder = "Search..." }: SearchProps) {
  const [value, setValue] = useState("");

  const handleSearchClick = () => {
    onSearch(value); // send the current input value up on button click
  };
  return (
    <div className="relative max-w-sm">
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pr-10 ring-0 focus-visible:ring-0 ring-black outline-black focus-visible:border-gray-200"
      />
      <div className="absolute inset-y-0 -right-3 flex items-center pr-3">
        <Button onClick={handleSearchClick} variant="ghost" className="p-1 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
