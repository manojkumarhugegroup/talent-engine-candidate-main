'use client';

import { useState } from 'react';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import clsx from 'clsx';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept: Record<string, string[]>; // 🔹 allowed types
  maxSize: number; // 🔹 bytes
  minSize?: number;
  multiple?: boolean;
  maxFiles?: number;
}

const FileUpload = ({
  onFileSelect,
  accept,
  maxSize,
  minSize = 1024,
  multiple = false,
  maxFiles = 1,
}: FileUploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    setError(null); // reset error first

    // 🔹 File count validation
    if (acceptedFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} file(s).`);
      return;
    }

    // 🔹 File size validation
    for (let file of acceptedFiles) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
        return;
      }
      if (file.size < minSize) {
        setError(`File "${file.name}" is too small.`);
        return;
      }
    }

    onFileSelect(acceptedFiles);
  };

  const handleError = (err: unknown) => {
    console.error(err);
    setError("Invalid file format or error occurred.");
  };

  return (
    <div>
      <Dropzone
        accept={accept}
        maxFiles={maxFiles}
        maxSize={maxSize}
        minSize={minSize}
        onDrop={handleDrop}
        onError={handleError}
        className={clsx(
          "border-2 border-dashed rounded-md transition-colors bg-transparent hover:bg-transparent",
          error ? "border-red-500" : "border-gray-300"
        )}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
