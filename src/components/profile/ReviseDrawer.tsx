"use client";

import type * as React from "react";
import { useState, useMemo } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/forms/CustomSheet";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ResumePreview } from "../create-new-candidate/Resume-preview";
import { FileUploadArea } from "../create-new-candidate/file-upload-area";

type ResumeFileData = {
  file_path: string;
  file_name: string;
};

type ReviseDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReviseDrawer({ open, onOpenChange }: ReviseDrawerProps) {
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("is_private", "0");
      formData.append("doctype", "File");
      formData.append("docname", "New");
      formData.append("file_name", file.name);

      const res = await fetch("/api/candidate/file_upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
      const result = await res.json();
      setUploadedFile(file);
      setShowPreview(true);
      // setValue("updated_resume", result?.message?.file_url);
    } catch (err) {
      console.error("❌ API error:", err);
    } finally {
      console.error("❌ API error:");
    }
  };

  const handleCancelUpload = () => {
    setUploadProgress(null);
    setUploadedFile(null);
  };
  const [files, setFiles] = useState<File[]>([]);

  const canSubmit = useMemo(() => {
    return true;
  }, [files]);

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles.slice(0, 1));

    console.log("Parent received:", selectedFiles);
  };

  function resetForm() {
    setFiles([]);
  }

  async function onSubmit() {
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      let resumeFile: ResumeFileData | null = null;
      if (files.length > 0) {
        const file = files[0];
        resumeFile = {
          file_path: URL.createObjectURL(file),
          file_name: file.name,
        };
      }

      const payload = {
        resumeFile,
      };

      console.log("=== Submitting Interview Selection ===");
      console.log(JSON.stringify(payload, null, 2));
      console.log("====================================");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Interview slot selected successfully!");

      resetForm();
      onOpenChange(false);
    } catch (err: any) {
      console.error(
        "❌ Error selecting interview slot:",
        err?.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const toggleDrawer = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Sheet open={open} onOpenChange={toggleDrawer}>
      <SheetContent
        side="right"
        className={
          "w-full max-w-none min-w-[600px] md:min-w-[580px] p-0 gap-0 bg-(--bg-profile) flex flex-col h-full  overflow-auto scroll-container"
        }
      >
        {/* Header */}
        <SheetHeader className="p-2 border-b pb-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex">
              <Button
                variant="ghost"
                onClick={toggleDrawer}
                className="h-8 px-2 hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
              <SheetTitle className="text-lg text-(--action-text)">
                Want to revise your profile?
              </SheetTitle>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className=" rounded-sm border-(--interview) text-(--interview) bg-transparent hover:text-(--interview)"
                onClick={toggleDrawer}
              >
                Cancel
              </Button>
              <Button
                className="px-8 rounded-sm"
                onClick={onSubmit}
                // disabled={!canSubmit || submitting}
              >
                Continue
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-5 px-4 py-3">
          <Link href="/profile/edit-profile">
            <Label className="mb-5 block text-sm font-medium text-(--interview) hover:underline cursor-pointer">
              Upload your resume or continue to edit manually.
            </Label>
          </Link>

          {/* {showPreview && uploadedFile ? (
            <ResumePreview
              file={uploadedFile}
              onDelete={() => {
                setUploadedFile(null);
                setUploadProgress(null);
                setShowPreview(false);
              }}
            />
          ) : (
            <FileUploadArea
              onFileUpload={handleFileUpload}
              uploadProgress={uploadProgress}
              uploadedFileName={uploadedFile?.name}
              onCancelUpload={handleCancelUpload}
            />
          )} */}
          {/* Preview Section */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {files.map((file, index) => {
                const handleRemove = () => {
                  setFiles((prev) => prev.filter((_, i) => i !== index));
                };

                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-md border  shadow-sm text(--action-text)"
                  >
                    {/* File name (truncated if too long) */}
                    <span
                      className="truncate max-w-[160px] text-sm capitalize"
                      title={file.name}
                    >
                      {file.name}
                    </span>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="rounded p-1 hover:bg-muted-foreground/10 cursor-pointer"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="h-3.5 w-3.5 text-(--destructive)" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
