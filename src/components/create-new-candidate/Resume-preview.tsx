"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Trash2 } from "lucide-react";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Dynamically import Viewer and Worker to disable SSR
const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  { ssr: false }
);

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

interface ResumePreviewProps {
  files: File | null;
  onDelete: () => void;
  show?: boolean;
}

export function ResumePreview({ files, onDelete, show }: ResumePreviewProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!files) return;

    const url = URL.createObjectURL(files);
    setFileUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [files]);

  const isPdf = files?.type === "application/pdf";
  const isImage = files?.type?.startsWith("image/");
  if (!show) return null;
  return (
    <Card className="border-gray-200 w-full">
      <CardContent className="p-4 space-y-4">
        {!files ? (
          <div className="text-center text-slate-400 text-sm">
            No file uploaded.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-sm truncate text-slate-300">
                  {files.name}
                </span>
              </div>

              {onDelete && (
                <button
                  onClick={onDelete}
                  className="text-red-500 hover:text-red-600 transition"
                  title="Delete Resume"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {fileUrl && (
              <div
                className="rounded overflow-hidden border border-gray-300 bg-white w-full"
                style={{ height: 600 }}
              >
                {isPdf ? (
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={fileUrl} />
                  </Worker>
                ) : isImage ? (
                  <img
                    src={fileUrl}
                    alt="Uploaded Resume"
                    className="w-full object-contain"
                  />
                ) : (
                  <p className="text-center text-slate-400 text-sm p-4">
                    File preview not supported. Please upload a PDF or image.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
