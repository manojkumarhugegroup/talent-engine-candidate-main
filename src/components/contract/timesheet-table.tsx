"use client";

import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronUp, Eye, Pencil, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn/ui skeleton

// Status type
export type Status =
  | "draft"
  | "sent for approval"
  | "re-submission requested"
  | "approved";

export type TimesheetRow = {
  weekNumber: number;
  dateRange: string;
  hours: number;
  status: Status;
};

type Props = {
  rows: TimesheetRow[];
  defaultSort?: { key: "week" | "hours"; dir: "asc" | "desc" };
  onView?: (row: TimesheetRow) => void;
  onEdit?: (row: TimesheetRow) => void;
};

const statusStyles: Record<Status, { label: string; className: string }> = {
  'draft': {
    label: "Draft",
    className: "text-(--job-badge-text) border-(--job-badge-text)",
  },
  "sent for approval": {
    label: "Sent for approval",
    className: "text-(--status-interest) border-(--status-interest)",
  },
  "re-submission requested": {
    label: "Re-submission Requested",
    className: "text-(--failure) border-(--failure)",
  },
  'approved': {
    label: "Approved",
    className: "text-(--status-shortlist) border-(--status-shortlist)",
  },
};

export function TimesheetTable({
  rows,
  defaultSort = { key: "week", dir: "desc" },
  onView,
  onEdit,
}: Props) {
  const [sortKey, setSortKey] = useState<"week" | "hours">(defaultSort.key);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(defaultSort.dir);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSort = (key: "week" | "hours") => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    const list = [...rows];
    list.sort((a, b) => {
      const vA = sortKey === "week" ? a.weekNumber : a.hours;
      const vB = sortKey === "week" ? b.weekNumber : b.hours;
      return sortDir === "asc" ? vA - vB : vB - vA;
    });
    return list;
  }, [rows, sortKey, sortDir]);

  const SortIcon = ({ active }: { active: boolean }) => (
    <ChevronUp
      className={cn(
        "h-3.5 w-3.5 transition-transform",
        active
          ? sortDir === "asc"
            ? "rotate-0"
            : "rotate-180"
          : "opacity-40 rotate-0"
      )}
    />
  );

  return (
    <TooltipProvider delayDuration={150}>
      <div className="overflow-hidden rounded-xl border border-(--tab-border) bg-[#13161a]">
        <Table>
          <TableHeader className="bg-(--bg-candidate)">
            <TableRow>
              <TableHead className="w-[52%] text-foreground">
                <button
                  type="button"
                  onClick={() => toggleSort("week")}
                  className="inline-flex items-center gap-1.5 hover:opacity-90 "
                >
                  <span>Week</span>
                  <SortIcon active={sortKey === "week"} />
                </button>
              </TableHead>
              <TableHead className="w-[18%] text-foreground">
                <button
                  type="button"
                  onClick={() => toggleSort("hours")}
                  className="inline-flex items-center gap-1.5 hover:opacity-90"
                >
                  <span>Total Work Hours</span>
                  <SortIcon active={sortKey === "hours"} />
                </button>
              </TableHead>
              <TableHead className="w-[15%] text-foreground">Status</TableHead>
              <TableHead className="w-[5%] text-right text-foreground"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Skeleton rows
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="border-slate-800">
                  <TableCell>
                    <Skeleton className="h-4 w-40 bg-slate-800" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16 bg-slate-800" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24 rounded-full bg-slate-800" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded bg-slate-800" />
                  </TableCell>
                </TableRow>
              ))
            ) : sorted.length === 0 ? (
              // No data state
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Inbox className="h-10 w-10" />
                    <span>No data available</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Actual rows
              sorted.map((r, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "border-slate-800",
                    index % 2 === 0
                      ? "bg-(--table-odd-bg) hover:bg-(--bg-key)/80"
                      : "bg-(--bg-candidate) hover:bg-(--bg-candidate)/80"
                  )}
                >
                  <TableCell>
                    <div className="text-sm md:text-base font-medium text-foreground">
                      {`Week ${r.weekNumber}, 2025`}{" "}
                      <span className="text-muted-foreground">
                        ({r.dateRange})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm md:text-base font-semibold text-foreground">
                      {r.hours}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium border",
                        statusStyles[r.status].className
                      )}
                    >
                      {statusStyles[r.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      {r.status !== "approved" &&
                      r.status !== "sent for approval" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 bg-transparent border-white text-white hover:bg-slate-900"
                              aria-label="Edit"
                              onClick={() => onEdit?.(r)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 bg-transparent border-(--interview) text-(--interview) hover:text-(--interview) hover:bg-slate-900"
                              aria-label="View"
                              onClick={() => onView?.(r)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
