"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

type Mode = "create" | "edit" | "view";

export interface DayEntry {
  dateLabel: string; // e.g., "Sep 01"
  weekday: string; // e.g., "Monday"
  hours: number | "";
  remarks: string;
  locked?: boolean; // when a day is non-working, render as "-"
}

export interface WeekDetail {
  id?: string;
  title: string; // "Fuel Operations Manager"
  subtitle: string; // project subtitle
  weekHeading: string; // "Week 36 (This Week)"
  weekRange: string; // "(Aug 31 - Sep 06, 2025)"
  days: DayEntry[];
}

interface TimesheetPanelProps {
  open: boolean;
  mode: Mode;
  data: WeekDetail | null;
  onOpenChange: (v: boolean) => void;
  onSave?: (data: WeekDetail) => void;
  onSubmit?: (data: WeekDetail) => void;
}

export function TimesheetPanel({
  open,
  mode,
  data,
  onOpenChange,
  onSave,
  onSubmit,
}: TimesheetPanelProps) {
  const [local, setLocal] = React.useState<WeekDetail | null>(data);

  React.useEffect(() => {
    if (mode === "create" && data) {
      // For create mode, use the current week structure but reset hours and remarks
      setLocal({
        ...data,
        days: data.days.map((day) => ({
          ...day,
          hours: "",
          remarks: "",
        })),
      });
    } else {
      setLocal(data);
    }
  }, [data, open, mode]);

  const editable = mode === "create" || mode === "edit";

  function updateDay(idx: number, patch: Partial<DayEntry>) {
    if (!local) return;
    setLocal({
      ...local,
      days: local.days.map((d, i) => (i === idx ? { ...d, ...patch } : d)),
    });
  }

  const handleTimesheetAction = (
    action: "save" | "submit",
    data: WeekDetail,
    callback?: (week: WeekDetail) => void
  ) => {
    console.log(
      `${action === "save" ? "Saving" : "Submitting"} timesheet:`,
      data
    );
    callback?.(data);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-3xl overflow-y-auto [&>button]:hidden bg-[#1B1E25]"
      >
        <div className="flex h-full flex-col ">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <button
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              aria-label="Back"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <SheetTitle className="text-white uppercase"></SheetTitle>

            <div className="flex items-center gap-2">
              {editable && (
                <Button
                  variant="outline"
                  className="text-[#5069E7] border-[#5069E7] w-35 bg-transparent"
                  onClick={() =>
                    local && handleTimesheetAction("save", local, onSave)
                  }
                >
                  Save
                </Button>
              )}
              {editable && (
                <Button
                  variant="default"
                  className="w-35 bg-[#5069E7]"
                  onClick={() =>
                    local && handleTimesheetAction("submit", local, onSubmit)
                  }
                >
                  Submit
                </Button>
              )}
            </div>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between px-6 py-4 capitalize">
            <div>
              <h2 className="text-lg font-semibold leading-6">
                {local?.title ?? data?.title}
              </h2>
              <p className=" text-sm text-muted-foreground">
                {local?.subtitle ?? data?.subtitle}
              </p>
            </div>
            <div className="text-right">
              <div className="text-base font-semibold">
                {local?.weekHeading ?? data?.weekHeading}
              </div>
              <div className="text-xs text-muted-foreground">
                {local?.weekRange ?? data?.weekRange}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="px-6 pb-6">
            <div className="overflow-hidden rounded-md border border-border">
              {/* Table Header */}
              <div className="grid grid-cols-[100px_120px_1fr] bg-muted border-b border-border px-4 py-2 text-xs text-muted-foreground font-medium">
                <div className="text-left font-bold text-foreground text-md">
                  Date
                </div>
                <div className="text-left font-bold text-foreground text-md">
                  Total Work Hours
                </div>
                <div className="text-left font-bold text-foreground text-md">
                  Remarks
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {local?.days.map((d, idx) => {
                  const isLocked = d.locked ?? false;
                  const isViewMode = mode == "view";
                  const isEditable = mode === "create" || mode === "edit";
                  const isEvenRow = idx % 2 === 0;

                  return (
                    <div
                      key={idx}
                      className={cn(
                        "grid grid-cols-[100px_120px_1fr] items-center px-4 py-2 text-sm",
                        isEvenRow ? "bg-[#272D3B]" : "bg-[#1B1E25]"
                      )}
                    >
                      {/* Date */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground capitalize">
                          {d.dateLabel}
                        </span>
                        <span className="text-[10px] text-muted-foreground capitalize">
                          {d.weekday}
                        </span>
                      </div>

                      {/* Hours Column */}
                      <div className="flex">
                        {isViewMode ? (
                          <div className="inline-flex h-8 w-[72px] items-center justify-center text-sm text-foreground">
                            {d.hours === "" ||
                            d.hours === null ||
                            d.hours === undefined
                              ? "-"
                              : d.hours}
                          </div>
                        ) : isLocked ? (
                          <div className="inline-flex h-8 w-[72px] items-center justify-center text-sm text-muted-foreground">
                            -
                          </div>
                        ) : (
                          <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className={cn(
                              "h-8 w-[72px] rounded-md border border-border bg-muted text-center text-sm placeholder:text-muted-foreground",
                              isLocked && "opacity-70",
                              "focus-visible:outline-none focus-visible:ring-0 focus:border-none"
                            )}
                            disabled={isLocked}
                            value={d.hours}
                            onChange={(e) => {
                              if (isEditable && !isLocked) {
                                const value = e.target.value;
                                updateDay(idx, {
                                  hours:
                                    value === ""
                                      ? ""
                                      : /^[0-9]+$/.test(value)
                                      ? Number(value)
                                      : d.hours,
                                });
                              }
                            }}
                            aria-label={`Hours for ${d.dateLabel}`}
                          />
                        )}
                      </div>

                      {/* Remarks Column */}
                      <div className="pl-2">
                        {isViewMode ? (
                          <div className="inline-flex h-8 w-full items-center  px-2 text-sm text-foreground">
                            {d.remarks?.trim() || "-"}
                          </div>
                        ) : isLocked ? (
                          <div className="inline-flex h-8 w-full items-center  px-2 text-sm text-muted-foreground">
                            -
                          </div>
                        ) : (
                          <Input
                            type="text"
                            className={cn(
                              "h-8 w-full rounded-md border border-border bg-muted px-2 text-sm placeholder:text-muted-foreground",
                              isLocked && "opacity-70",
                              "focus-visible:outline-none focus-visible:ring-0 focus:border-none"
                            )}
                            disabled={isLocked}
                            value={d.remarks}
                            onChange={(e) => {
                              if (isEditable && !isLocked) {
                                updateDay(idx, { remarks: e.target.value });
                              }
                            }}
                            aria-label={`Remarks for ${d.dateLabel}`}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
