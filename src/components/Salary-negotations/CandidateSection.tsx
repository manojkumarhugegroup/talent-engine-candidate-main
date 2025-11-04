"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/forms/CustomSheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleCheck, FileText } from "lucide-react";
import { useDataContext } from "@/context/DataProvider";
import { UnifiedSection } from "./CandidateProposal";
import { CandidateProfile } from "./CandidateProfile";
import ScrollableShadowBox from "../layout/ScrollShadowBox";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

type CandidateDrawerProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;
};

export function CandidateDrawer({ open, onOpenChange }: CandidateDrawerProps) {
  const { candidateData, fetchCandidateData } = useDataContext();
  const [currentProposal, setCurrentProposal] = useState(0);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open && !candidateData) {
      fetchCandidateData();
    }
  }, [open, candidateData, fetchCandidateData]);

  if (!candidateData) {
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

  const handleNextProposal = () => {
    setCurrentProposal((prev) => (prev + 1) % candidateData.proposals.length);
  };

  const handlePrevProposal = () => {
    setCurrentProposal((prev) =>
      prev === 0 ? candidateData.proposals.length - 1 : prev - 1
    );
  };

  const handleAccept = () => {
    console.log("Proposal accepted:", candidateData.proposals[currentProposal]);
    // Add your accept logic here
  };

  const handleRequestClarification = () => {
    console.log(
      "Clarification requested for:",
      candidateData.proposals[currentProposal]
    );
    // Add your request clarification logic here
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-none min-w-full lg:min-w-11/12 p-0 gap-0.5 bg-(--bg-profile)"
      >
        <SheetHeader className="p-2 border-b pb-2 mb-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-8 px-2 hover:bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>

            <SheetTitle className="text-lg text-(--action-text)">
              Salary Negotiation
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="grid grid-cols-5 h-[calc(100vh-70px)] px-4 gap-2">
          <ScrollableShadowBox>
            <div className="bg-(--bg-candidate) overflow-y-auto rounded-sm col-span-1 border border-(--tab-border) h-[calc(100vh-70px)]">
              {candidateData.candidate ? (
                <CandidateProfile candidate={candidateData.candidate} />
              ) : (
                <p className="flex justify-center items-center h-full">
                  No candidate data
                </p>
              )}
            </div>
          </ScrollableShadowBox>

          <div className="col-span-2 border rounded-sm overflow-y-auto  scroll-container bg-(--bg-candidate) border-(--tab-border)">
            <UnifiedSection
              data={candidateData.proposals[currentProposal]}
              type="proposal"
              onNext={handleNextProposal}
              onPrev={handlePrevProposal}
              hasNext={candidateData.proposals.length > 1}
              hasPrev={candidateData.proposals.length > 1}
              onAccept={handleAccept}
              onRequestClarification={(msg) => {
                console.log("Clarification requested:", msg);
                handleRequestClarification();
              }}
              onFileClick={setSelectedPdfUrl}
            />
          </div>

          <div className="col-span-2 border rounded-sm overflow-y-auto  scroll-container">
            {selectedPdfUrl ? (
              <div className="h-screen border-l border-gray-300 bg-white flex flex-col overflow-auto">
                <h4 className="text-sm font-semibold mb-2 p-2 border-b text-black">
                  Document Preview
                </h4>
                <div className="flex-grow overflow-hidden">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={selectedPdfUrl} />
                  </Worker>
                </div>
              </div>
            ):
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FileText className="h-12 w-12 mb-2 text-gray-400" />
            <p className="text-center px-4">
              Select a document from the proposal to preview it here.
            </p>
          </div>
            }
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
