"use client";

import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/forms/CustomSheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useDataContext } from "@/context/DataProvider";
import { OfferView } from "./OfferView";

type CandidateDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OfferLetterView({ open, onOpenChange }: CandidateDrawerProps) {
  const { orderData, fetchOrderData } = useDataContext();

  useEffect(() => {
    if (open && !orderData) {
      fetchOrderData();
    }
  }, [open, orderData, fetchOrderData]);

  if (!orderData) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full max-w-none p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Loading Candidate Data</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading candidate data...</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!orderData.candidate) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full max-w-none p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>No Candidate Data</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p>No candidate data available</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-none  min-w-full lg:min-w-4/5 p-0 gap-0.5 bg-(--bg-profile)"
      >
        <SheetHeader className="p-1.5">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="cursor-pointer hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <SheetTitle className="text-label text-base">
                Offer Letter
              </SheetTitle>
            </div>
            <div className="flex gap-4">
              <Button className="bg-(--label) hover:bg-(--label) rounded-sm">
                <img
                  src="/assets/icons/candidate/download.svg"
                  alt="download"
                  className="w-4 h-4"
                />
              </Button>
              <Button className="mr-3.5 px-6 rounded-sm">Submit</Button>
            </div>
          </div>
        </SheetHeader>

        <div className="grid grid-cols-12 h-[calc(100vh-80px)] px-5 gap-2">
          <div className="bg-(--bg-candidate) rounded-sm col-span-6 overflow-y-auto scroll-container border border(--tab-border)">
            <OfferView candidate={orderData.candidate} />
          </div>

          <div className="col-span-6 border rounded-sm h-full overflow-y-auto scroll-container">
            {/* <CompensationSummary/> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
