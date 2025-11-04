import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent, useId } from 'react';
import { Button } from '../ui/button';
import { Plus, X, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

export interface ChipInputProps {
  label?: string;
  value: string[];
  onChange: (chips: string[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  name?: string;
}

const CusChipInput: React.FC<ChipInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter...",
  error,
  disabled = false,
  required = false,
  onBlur,
  onFocus,
  name,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const id = useId();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setDuplicateError(null);  // Clear error when user starts typing again
    if (e.target.value.trim()) {
      setInfoMessage("Click Enter or the Add button to add.");
    } else {
      setInfoMessage(null);
    }
  };

  const handleAddChip = () => {
    if (inputValue.trim() === '') return;  // Don't add if input is empty
    if (value.includes(inputValue.trim())) {
      setDuplicateError("This value already exists.");
      return;  // Prevent adding duplicate chip
    }
    const newChips = [...value, inputValue.trim()];
    onChange(newChips);
    setInputValue('');
    setInfoMessage(null); // Clear the info message after adding the chip
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddChip();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      const newChips = value.slice(0, -1);
      onChange(newChips);
    }
  };

  const handleRemoveChip = (index: number) => {
    const newChips = value.filter((_, i) => i !== index);
    onChange(newChips);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex jusbtify-between flex-1">
        {label && (
          <label
            htmlFor={id}
            className={`text-xs font-medium mb-1 flex-1 ${duplicateError || error ? 'text-red-500 dark:text-red-200' : 'text-label dark:text-gray-200'}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {/* <span></span>
        {(duplicateError || error || infoMessage) && (
          <p className={`${(duplicateError || error) ? "text-red-500" : "text-gray-500"} text-xs mt-1"`}>{duplicateError || error || infoMessage}</p>
        )} */}

      </div>
      <div
        className={`flex items-center border rounded-md border-input transition-colors duration-200
          ${duplicateError || error
            ? 'border-red-500 focus-within:ring-0'
            : 'border-gray-300 focus-within:border-gray-400 focus-within:ring-0'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      >
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ''}
          name={name}
          className="flex-1 border-none outline-none bg-transparent py-1 px-3  min-w-20 disabled:cursor-not-allowed text-sm h-9"
        />
        {/* Plus icon visible only if inputValue is not empty */}
        {inputValue.trim() && (
          <Button
            type="button"
            variant={'ghost'}
            onClick={handleAddChip}
            disabled={disabled}
            className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none bg-transparent cursor-pointer"
            title="Add chip"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 text-xs">
          {value.map((chip, index) => (
            <Badge
              variant="secondary"
              key={index}
              className="rounded-sm bg-accent px-2 py-0.5 text-xs h-7"
            >
              {chip}
              <Button type='button'
                variant="ghost"
                size="icon"
                className="bg-muted ml-1 p-0.5 h-4 w-4 cursor-pointer "
                onClick={() => handleRemoveChip(index)}
              >
                <XCircle className="h-3 w-3 text-red-500" />
              </Button>
            </Badge>
          ))}
        </div>
      )}




      {(duplicateError || error || infoMessage) && (
        <p className={`${(duplicateError || error) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}>{duplicateError || error || infoMessage}</p>
      )}

    </div>
  );
};

export default CusChipInput;
