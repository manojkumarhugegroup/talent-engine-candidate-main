"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProfessionalSkeleton = () => {
  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="px-4 py-4 space-y-3">
        {/* Heading */}
        <div>
          <span className="text-white text-base font-medium">
            Professional Details
          </span>
        </div>

        {/* Current Role + Salary */}
        <div className="bg-(--badge-color) p-3 rounded space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        {/* Summary */}
        <div>
          <span className="text-white text-md font-medium">Summary</span>
          <div className="mt-2 space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        {/* Preferred Job Location */}
        <div>
          <span className="text-white text-base font-medium">
            Preferred Job Location
          </span>
          <Skeleton className="h-3 w-1/3 mt-2" />
        </div>

        {/* External Profile Links */}
        <SectionTable
          title="External Profile Links"
          headers={["Platform", "URL Link"]}
          rows={3}
          cols={[24, 40]}
        />

        {/* Skills */}
        <SectionTable
          title="Skills"
          headers={["Name", "Experience (Months)", "Reference (Link)"]}
          rows={3}
          cols={[24, 12, 40]}
        />

        {/* Projects */}
        <div>
          <span className="text-white text-base font-medium">Projects</span>
          <div className="bg-(--badge-color) p-4 rounded space-y-4 mt-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2 border-b pb-2 last:border-0">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <SectionTable
          title="Certifications"
          headers={[
            "Title",
            "Issuing",
            "#Certificate",
            "Issue - Expiration Date",
            "URL Link",
          ]}
          rows={2}
          cols={[32, 24, 16, 28, 36]}
        />

        {/* Education */}
        <SectionTable
          title="Education"
          headers={[
            "Title",
            "Institution",
            "Graduation Year",
            "Specialization",
            "Score",
          ]}
          rows={2}
          cols={[28, 36, 12, 24, 10]}
        />
      </CardContent>
    </div>
  );
};

/* 🔹 Reusable Skeleton Table Component */
const SectionTable = ({
  title,
  headers,
  rows,
  cols,
}: {
  title: string;
  headers: string[];
  rows: number;
  cols: number[];
}) => (
  <div className="flex flex-col">
    <span className="text-white text-base font-medium mb-1.5">{title}</span>
    <div className="rounded-sm border border-(--badge-color) inline-block max-w-full">
      <Table>
        <TableHeader className="bg-(--badge-color)">
          <TableRow>
            {headers.map((h, i) => (
              <TableHead key={i}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, r) => (
            <TableRow key={r}>
              {cols.map((w, c) => (
                <TableCell key={c}>
                  <Skeleton className={`h-3 w-${w}`} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
