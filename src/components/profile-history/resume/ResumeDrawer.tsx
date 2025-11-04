"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/forms/CustomSheet"
import { useState, useEffect } from "react"

type ReviseDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  pdfPath: string
  versionId: string | number
}

export function ResumeDrawer({ open, onOpenChange, pdfPath, versionId }: ReviseDrawerProps) {
  const [pdfError, setPdfError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Reset error state when drawer opens
  useEffect(() => {
    if (open) {
      setPdfError(false)
      setIsLoading(true)
    }
  }, [open])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setPdfError(true)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-none min-w-[600px] md:min-w-[580px] p-0 gap-0 bg-(--bg-profile) flex flex-col h-full"
      >
        {/* Header */}
        <SheetHeader className="p-2 border-b pb-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-8 px-2 hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
              <SheetTitle className="text-lg text-(--action-text)">Resume - Version {versionId}</SheetTitle>
            </div>
          </div>
        </SheetHeader>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-white relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-gray-600">Loading PDF...</div>
            </div>
          )}
          
          {pdfError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Unable to display PDF</p>
                <Button 
                  onClick={() => window.open(pdfPath, '_blank')} 
                  variant="outline"
                >
                  Open PDF in New Tab
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              title={`resume-v${versionId}`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ minHeight: '100%' }}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}