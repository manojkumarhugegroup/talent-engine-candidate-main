"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  CircleCheckBig,
  Link,
  CircleCheck,
  File,
} from "lucide-react";
// import { Proposal, Expectation } from "@/types/jobs/kanban/candidate"
import { Separator } from "@/components/ui/separator";
import { Expectation, Proposal } from "@/types/salay-negotations";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { CusTextarea } from "../forms/CusTextarea";

type SectionType = "proposal" | "expectation";

interface UnifiedSectionProps {
  data: Proposal | Expectation;
  type: SectionType;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onLinkProposal?: () => void;
  isLinked?: boolean;
  onAccept?: () => void;
  onRequestClarification?: (message?: string) => void;
  onFileClick?: (pdfUrl: string) => void;
}

// CandidateProposal.tsx

const pdfMapping: Record<string, string> = {
  "Personal Income & Social Taxation (as applicable)": "/Pdf/1.pdf",
  "Pension Plan (as applicable)": "/Pdf/resume_v2.4.pdf",
  "Medical / Health Check": "/Pdf/Advertised_Position.pdf",
};

// Theme configuration for different section types
const themes = {
  proposal: {
    bgColor: "bg-(--bg-candidate)",
    borderColor: "border-(--tab-border)",
    notesColor: "bg-[#E5F2FF]",
    salaryColor: "text-(--action-text)",
    versionColor: "text-(--candidate-label)",
    statusBadge: "bg-slate-800 text-(--labelLight) border-labelLight",
    totalCostColor: "text-(--candidate-label)",
  },
  expectation: {
    bgColor: "bg-[#FFFBF9]",
    borderColor: "border-(--expect-border)",
    notesColor: "bg-[#FFE0C4]",
    salaryColor: "text-(--candidate-total)",
    versionColor: "text-(--candidate-total)",
    statusBadge: "", // Not used for expectations
    totalCostColor: "text-(--candidate-total)",
  },
};

const termsWithFiles = [
  "Personal Income & Social Taxation (as applicable)",
  "Pension Plan (as applicable)",
  "Medical / Health Check",
  "Medical Insurance",
];

export function UnifiedSection({
  data,
  type,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  onLinkProposal,
  isLinked = false,
  onAccept,
  onFileClick,
  onRequestClarification,
}: UnifiedSectionProps) {
  const theme = themes[type];
  const isProposal = type === "proposal";
  const proposal = isProposal ? (data as Proposal) : null;
  const expectation = !isProposal ? (data as Expectation) : null;

  const title = isProposal ? "Proposal" : "Candidate Expectation";
  const notesTitle = isProposal ? "Notes" : "Candidate Remarks";
  const [showClarification, setShowClarification] = useState(false);
  const [clarificationText, setClarificationText] = useState("");

  const handleClarificationClick = () => {
    setShowClarification(true);
  };

  const renderTermWithIcon = (term: string, colorClass: string) => {
    const hasFile = termsWithFiles.includes(term);
    const handleFileClick = () => {
      const pdfUrl = pdfMapping[term];
      if (pdfUrl) {
        onFileClick?.(pdfUrl); // ✅ Notify parent
      } else {
        console.warn("No PDF mapped for this term");
      }
    };

    return (
      <div className="flex items-start gap-2">
        <CircleCheckBig className="h-3 w-3 text-(--onboarded) mt-1 flex-shrink-0" />

        <span className={`text-xs leading-relaxed ${colorClass}`}>
          {term}

          {/* <File className="h-3 w-3 text-blue-500 mt-1 " /> */}
          {hasFile && (
            <Button
              variant={"ghost"}
              type="button"
              onClick={handleFileClick}
              className="flex-shrink-0 p-1 h-4.5 w-4.5"
              aria-label={`Open file for ${term}`}
            >
              <img
                src="/assets/icons/file.svg"
                // className="h-2.5 w-2.5"
                alt="file icon"
              />
            </Button>
          )}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-2xl w-full  py-1 ">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-(--action-text)">
            {title}
          </h3>
          <span className={`text-sm font-medium ${theme.versionColor}`}>
            ({data.version})
          </span>
          {isProposal && (
            <>
              {/* <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                <Pencil className="h-3 w-3 text-gray-500" />
              </Button> */}
              <Badge
                className={`text-xs px-2 py-0.5 rounded-sm ${theme.statusBadge}`}
              >
                {proposal?.status}
              </Badge>
            </>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            className="h-7 w-7 p-0 bg-(--interview) hover:bg-(--interview) rounded cursor-pointer"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            className="h-7 w-7 p-0 bg-(--interview) hover:bg-(--interview) rounded cursor-pointer"
            onClick={onNext}
            disabled={!hasNext}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div
        className={`border-2 ${theme.borderColor} ${theme.bgColor} rounded-lg m-3`}
      >
        {/* Salary Section */}
        <div className={`px-1 py-2 border-b ${theme.borderColor} mx-2`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`text-lg font-bold ${theme.salaryColor}`}>
                  ${data.salary.amount}
                </span>
                <span className={`text-base font-medium ${theme.salaryColor}`}>
                  /Month
                </span>
                <span className="text-sm text-gray-500 italic ml-1">
                  ({data.salary.type})
                </span>
              </div>
              <div className="text-xs text-(--salary-text) mt-0.5">
                Proposed Joining Date -{" "}
                <span className="font-semibold">{data.joiningDate}</span>
              </div>
            </div>
            <div className="text-right text-xs text-(--propose-text) mt-4">
              <div className="font-medium">{data.submittedBy.name}</div>
              <div>{data.submittedBy.date}</div>
            </div>
          </div>
        </div>

        {/* Terms Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="terms"
          className="border-none"
        >
          <AccordionItem value="terms" className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline px-4 py-2 text-(--action-text)">
              Terms
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid grid-cols-2 gap-6 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-(--tab-border) transform -translate-x-1/2"></div>

                {/* By Client Column */}
                <div>
                  <h5 className="font-medium text-xs text-(--action-text) mb-1">
                    By Client
                  </h5>
                  <div className="space-y-1">
                    {data.terms.byClient.map((term, index) => (
                      <div key={index}>
                        {renderTermWithIcon(
                          term,
                          isProposal ? "text-(--action-text)" : "text-gray-700"
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* By Candidate Column */}
                <div>
                  <h5 className="font-medium text-xs text-(--action-text) mb-1">
                    By Candidate
                  </h5>
                  <div className="space-y-1">
                    {data.terms.byCandidate.map((term, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CircleCheckBig className="h-3 w-3 text-(--all-candidate) mt-1 flex-shrink-0" />
                        <span
                          className={`text-xs leading-relaxed ${
                            isProposal
                              ? "text-(--action-text)"
                              : "text-gray-700"
                          }`}
                        >
                          {term}
                        </span>
                        {termsWithFiles.includes(term) && (
                          <File className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* By Talent Engine */}
                  <div className={`mt-2 ${isProposal ? " " : "mt-1"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-(--action-text)">
                        By Talent Engine
                      </span>
                    </div>
                    <div className="space-y-1">
                      {data.terms.talentEngine.map((item, index) => (
                        <div key={index}>
                          {renderTermWithIcon(
                            item,
                            isProposal
                              ? "text-(--action-text)"
                              : "text-gray-700"
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Not Applicable */}
                  <div className={`mt-2 ${isProposal ? "pt-0 " : "mt-1"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-(--action-text)">
                        Not Applicable
                      </span>
                    </div>
                    <div className="space-y-1">
                      {data.terms.notApplicable.map((item, index) => (
                        <div key={index}>
                          {renderTermWithIcon(
                            item,
                            isProposal
                              ? "text-(--action-text)"
                              : "text-gray-700"
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="px-4">
          <Separator className={`border-b-2 ${theme.borderColor}`} />
        </div>

        {showClarification && (
          <>
            <div className="px-4 py-3">
              <Textarea
                value={clarificationText}
                onChange={(e) => setClarificationText(e.target.value)}
                placeholder="Enter your clarification request..."
                className="w-full resize-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-within:border-gray-400 focus-visible:border-gray-400 focus-visible:outline-none "
              />
            </div>
          </>
        )}

        {isProposal && (
          <div className="px-4 pb-4 pt-2">
            <div className="flex flex-col gap-2">
              {onAccept && !showClarification && (
                <Button
                  onClick={onAccept}
                  className="w-full bg-(--interview) hover:bg-(--interview) text-white"
                >
                  Accept
                </Button>
              )}
              {onRequestClarification && (
                <Button
                  onClick={handleClarificationClick}
                  variant="ghost"
                  className="w-full border-(--interview) text-(--interview) hover:bg-transparent hover:text-(--interview)"
                >
                  Request Clarification{" "}
                  <img
                    src="/assets/icons/candidate/upload.svg"
                    alt="upload"
                    className="w-4 h-4"
                  />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrapper components for backward compatibility and type safety
interface ProposalSectionProps {
  proposal: Proposal;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onAccept?: () => void;
  onRequestClarification?: (message?: string) => void;
}

export function ProposalSection(props: ProposalSectionProps) {
  return (
    <UnifiedSection
      data={props.proposal}
      type="proposal"
      onNext={props.onNext}
      onPrev={props.onPrev}
      hasNext={props.hasNext}
      hasPrev={props.hasPrev}
      onAccept={props.onAccept}
      onRequestClarification={props.onRequestClarification}
    />
  );
}

interface ExpectationSectionProps {
  expectation: Expectation;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onLinkProposal?: () => void;
  isLinked?: boolean;
}

export function ExpectationSection(props: ExpectationSectionProps) {
  return (
    <UnifiedSection
      data={props.expectation}
      type="expectation"
      onNext={props.onNext}
      onPrev={props.onPrev}
      hasNext={props.hasNext}
      hasPrev={props.hasPrev}
      onLinkProposal={props.onLinkProposal}
      isLinked={props.isLinked}
    />
  );
}
