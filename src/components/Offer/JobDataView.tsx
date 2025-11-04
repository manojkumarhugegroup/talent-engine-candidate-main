"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/forms/CustomSheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getRemainingTime } from "../utils";
import { CusTypography } from "@/components/forms/CusTypography";
import { formatCurrency } from "@/lib/utils";

interface JobData {
  name?: string;
  position_start_date?: string;
  position_est_end_date?: string;
  no_of_resources?: number;
  min_bill_rate?: number;
  max_bill_rate?: number;
  billing_currency?: string;
  location?: string;
  work_days_per_week?: number;
  work_hours_per_day?: number;
  rotation_on_weeks?: number;
  rotation_off_weeks?: number;
  project?: string;
  project_type?: string;
  responsibilities?: string;
  qualification?: string[];
  certifications?: { certification?: string }[];
  visa_requirements?: string;
  key_skills?: string[];
  skills_and_experience?: {
    fname: string;
    min_experience: string;
    max_experience: string;
  }[];
  tools_familarity?: {
    fname: string;
    min_experience: string;
    max_experience: string;
  }[];
  language_requirement?: {
    fname: string;
    read: string;
    speak: string;
    write: string;
  }[];
}

type CandidateDrawerProps = {
  open: boolean;
  onOpenChange: () => void;
  data?: JobData | null;
};

interface Certification {
  certification?: string;
}

export function JobDataView({
  open,
  onOpenChange,
  data,
}: CandidateDrawerProps) {
  const positionStart = data?.position_start_date
    ? data?.position_start_date
    : "";
  const positionEnd = data?.position_est_end_date
    ? data?.position_est_end_date
    : "";

  const { formatted } =
    positionStart && positionEnd
      ? getRemainingTime(positionStart, positionEnd)
      : { formatted: "" };

  const certifications: Certification[] =
    (data?.certifications as Certification[]) || [];

  if (!data || Object.keys(data).length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full max-w-none p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Loading Jobs Data</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading jobs data...</p>
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
        className="w-full max-w-none  min-w-full lg:min-w-[40%] p-0 gap-0.5 bg-(--bg-profile)"
      >
        <SheetHeader className="p-1.5">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={onOpenChange}
                className="cursor-pointer hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <SheetTitle
                className="text-label text-base"
                style={{ color: "#5069e7" }}
              >
                {data?.name}
              </SheetTitle>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-2 h-full pt-0 px-10 pb-10 max-h-[calc(98vh-0.5rem)]">
          <div className="space-y-4 text-sm h-full overflow-auto ">
            <div className="grid grid-cols-1 gap-2 ">
              <CusTypography
                label="Position Start Date"
                value={positionStart}
                className="sm:flex-wrap"
              />
              <CusTypography
                label="Position Est. End Date"
                value={positionEnd}
                className="sm:flex-wrap"
              />
              <CusTypography
                label="No. of Resources"
                value={data?.no_of_resources ?? "N/A"}
              />
              <CusTypography
                label="Salary"
                value={
                  data?.min_bill_rate === data?.billing_currency
                    ? `${formatCurrency(
                        data?.min_bill_rate,
                        data?.billing_currency
                      )}`
                    : `${formatCurrency(
                        data?.min_bill_rate,
                        data?.billing_currency
                      )} - ${formatCurrency(
                        data?.max_bill_rate,
                        data?.billing_currency
                      )}`
                }
              />
              <CusTypography label="Location" value={data?.location ?? "N/A"} />
              <CusTypography
                label="Working Days / Week"
                value={data?.work_days_per_week ?? "N/A"}
              />
              <CusTypography
                label="Working Hours / Day"
                value={data?.work_hours_per_day ?? "N/A"}
              />
              <CusTypography
                label="Rotation Cycle"
                value={`${data?.rotation_on_weeks ?? 0} On / ${
                  data?.rotation_off_weeks ?? 0
                } Off (weeks)`}
              />
              <CusTypography
                label="Project Name"
                value={`${data?.project ?? "N/A"}`}
              />
              <CusTypography
                label="Project Type"
                value={data?.project_type ?? "N/A"}
              />
              <CusTypography label="Expected Duration" value={formatted} />
              <CusTypography
                label="Responsibilities"
                value={data?.responsibilities ?? "N/A"}
                variant="block"
              />

              <div className="">
                <p className={"font-semibold text-label"}>Qualification </p>
                <ul className="ps-4 mt-2 space-y-1 list-disc list-inside marker:text-(--label)">
                  {Array.isArray(data?.qualification) &&
                  data.qualification.length > 0
                    ? data?.qualification?.map(
                        (item: string, index: number) => (
                          <li
                            key={index}
                            className="capitalize text-muted-foreground"
                          >
                            {item}
                          </li>
                        )
                      )
                    : "N/A"}
                </ul>
              </div>
              <div className="">
                <p className={"font-semibold text-label"}>Certification </p>
                <ul className="ps-4 mt-2 space-y-1 list-disc list-inside marker:text-(--label)">
                  {certifications.length > 0 ? (
                    certifications.map((item, index) => (
                      <li
                        key={index}
                        className="capitalize text-muted-foreground"
                      >
                        {item.certification || "N/A"}
                      </li>
                    ))
                  ) : (
                    <span>N/A</span>
                  )}
                </ul>
              </div>
              <div className="">
                <CusTypography
                  label="Visa Requirement"
                  value={`${data?.visa_requirements ?? "N/A"}`}
                />
              </div>
              <div className="">
                <p className={"font-semibold text-label"}>Key Skills </p>
                <ul className="ps-4 mt-2 space-y-1 list-disc list-inside marker:text-(--label)">
                  {data?.key_skills?.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="capitalize text-muted-foreground"
                    >
                      {item || "N/A"}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-label">Skills & Experience</p>
                <ul className="ps-4 mt-2 space-y-1 list-disc list-inside marker:text-label">
                  {Array.isArray(data?.skills_and_experience) &&
                  data.skills_and_experience.length > 0
                    ? data?.skills_and_experience?.map(
                        (
                          item: {
                            fname: string;
                            min_experience: string;
                            max_experience: string;
                          },
                          index: number
                        ) => (
                          <li
                            key={index}
                            className="capitalize text-muted-foreground"
                          >
                            {item.fname} ({item.min_experience} -{" "}
                            {item.max_experience} years)
                          </li>
                        )
                      )
                    : "N/A"}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-label">Tools</p>
                <ul className="ps-4 mt-2 space-y-1 list-disc list-inside marker:text-label">
                  {Array.isArray(data?.tools_familarity) &&
                  data.tools_familarity?.length > 0
                    ? data.tools_familarity?.map(
                        (
                          item: {
                            fname: string;
                            min_experience: string;
                            max_experience: string;
                          },
                          index: number
                        ) => (
                          <li
                            key={index}
                            className="capitalize text-muted-foreground"
                          >
                            {item.fname} ({item.min_experience} -{" "}
                            {item.max_experience} years)
                          </li>
                        )
                      )
                    : "N/A"}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-label mb-4">Languages</h3>
                <div className="grid gap-4">
                  {data?.language_requirement?.map(
                    (
                      item: {
                        fname: string;
                        read: string;
                        speak: string;
                        write: string;
                      },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border border-border rounded-md p-4 bg-accent hover:shadow-sm transition"
                      >
                        <h4 className="text-sm font-semibold text-label capitalize mb-2">
                          {item.fname}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-2 py-1 rounded bg-accent text-accent-foreground font-medium">
                            Read: {item.read}
                          </span>
                          <span className="px-2 py-1 rounded bg-accent text-accent-foreground font-medium">
                            Speak: {item.speak}
                          </span>
                          <span className="px-2 py-1 rounded bg-accent text-accent-foreground font-medium">
                            Write: {item.write}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
