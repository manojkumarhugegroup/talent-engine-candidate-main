"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Plus } from "lucide-react";
import { TimesheetTable, type TimesheetRow } from "./timesheet-table";
import {
  TimesheetPanel,
  type WeekDetail as PanelWeekDetail,
} from "./timesheet-panel";
import { Status } from "@/types/timesheet.type";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { useDataContext } from "@/context/DataProvider";

// Mapping function for status
const mapStatus = (status: string): Status => {
  console.log(status, "ssaftatus");
  switch (status) {
    case "draft":
      return "draft";
    case "sent for approval":
      return "sent for approval";
    case "re-submission requested":
      return "re-submission requested";
    case "approved":
      return "approved";
    default:
      return "draft";
  }
};

// Helper: ISO week number
function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export default function Contract() {
  const { contract, fetchContract } = useDataContext();
  useEffect(() => {
    fetchContract();
  }, []);

  console.log(contract, "asdf");

  // Track selected dataset (contract)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    contract_title = "",
    contract_subtitle = "",
    year = "",
    weeks = [],
  } = contract?.[selectedIndex ?? 0] ?? {};
  // const { contract_title, contract_subtitle, year, weeks } =contract[selectedIndex??0];

  // Find the current week based on today's date
  const today = new Date();
  const currentWeekNumber = getWeekNumber(today);
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 });

  // Format nicely: "Sep 15 - Sep 21"
  const currentWeekRange = `${format(weekStart, "MMM d")} - ${format(
    weekEnd,
    "MMM d"
  )}`;

  const current = useMemo(() => {
    return (
      weeks.find((w) => w.week_number === currentWeekNumber) || weeks[0] // fallback if not found
    );
  }, [weeks, currentWeekNumber]);

  // Convert weeks -> table rows
  const rows: TimesheetRow[] = weeks.map((w) => ({
    weekNumber: w.week_number,
    dateRange: w.date_range,
    hours: w.total_hours,
    status: mapStatus(w.status),
  }));

  // Panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"create" | "edit" | "view">(
    "view"
  );
  const [detail, setDetail] = useState<PanelWeekDetail | null>(null);

  function openCreate() {
    const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);

      const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      const dateLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      return {
        weekday,
        dateLabel,
        hours: "",
        remarks: "",
        locked: false,
      };
    });

    setPanelMode("create");
    setDetail({
      title: contract_title,
      subtitle: contract_subtitle,
      weekHeading: `Week ${currentWeekNumber} (This Week)`,
      weekRange: `(${days[0].dateLabel} - ${days[6].dateLabel}, ${year})`,
      days,
    } as PanelWeekDetail);
    setPanelOpen(true);
  }

  function openView(row: TimesheetRow) {
    setPanelMode("view");
    const selected = weeks.find((w) => w.week_number === row.weekNumber);
    if (selected) {
      setDetail({
        title: contract_title,
        subtitle: contract_subtitle,
        weekHeading: `Week ${selected.week_number}${
          selected.week_number === currentWeekNumber ? " (This Week)" : ""
        }`,
        weekRange: `(${selected.date_range}, ${year})`,
        days: selected.days.map((d) => ({
          ...d,
          dateLabel: d.date_label,
          hours: d.hours || "",
          remarks: d.remarks || "",
        })),
      });
    }
    setPanelOpen(true);
  }

  function openEdit(row: TimesheetRow) {
    setPanelMode("edit");
    const selected = weeks.find((w) => w.week_number === row.weekNumber);
    if (selected) {
      setDetail({
        title: contract_title,
        subtitle: contract_subtitle,
        weekHeading: `Week ${selected.week_number}`,
        weekRange: `(${selected.date_range}, ${year})`,
        days: selected.days.map((d) => ({
          ...d,
          dateLabel: d.date_label,
          hours: d.hours || "",
          remarks: d.remarks || "",
        })),
      });
    }
    setPanelOpen(true);
  }

  return (
    <main className="mx-auto w-full container py-4 md:py-6 lg:py-8">
      <header className="mb-6 flex items-start justify-between gap-4">
        {/* Contract title dropdown */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h1 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-1.5 cursor-pointer">
                {contract_title || "Contract Title"}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel>Select Contract</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {contract?.map((contract, idx) => (
                <DropdownMenuItem
                  key={idx}
                  className="cursor-pointer flex items-center justify-between"
                  onClick={() => setSelectedIndex(idx)}
                >
                  <div>
                    <div className="font-medium capitalize ">
                      {contract.contract_title}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {contract.contract_subtitle}
                    </div>
                  </div>
                  {selectedIndex === idx && (
                    <Check className="h-4 w-4 text-(--status-shortlist)" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-sm text-muted-foreground capitalize">
            {contract_subtitle || "Contract Subtitle"}
          </p>
        </div>

        {/* Current week info */}
        <div className="text-right">
          <div className="text-base md:text-lg font-semibold">
            Week {currentWeekNumber || 0}{" "}
            <span className="text-muted-foreground">(This Week)</span>
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            {currentWeekRange || ""}, {year}
          </div>
        </div>
      </header>

      <Card className="border-(--tab-border) bg-(--bg-candidate)">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <CardTitle
              className="text-base md:text-lg cursor-pointer hover:opacity-90"
              onClick={openCreate}
            >
              Time Sheet
            </CardTitle>
            <Button
              size="icon"
              className="h-7 w-7 rounded-full bg-(--interview) hover:bg-(--interview) text-white"
              aria-label="Add"
              onClick={openCreate}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 gap-2 bg-transparent border-(--tab-border) text-foreground hover:bg-slate-900"
              >
                {year}
                <ChevronDown className="h-4 w-4 opacity-80" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuLabel>Year</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                2025
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                2024
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                2023
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <TimesheetTable rows={rows} onView={openView} onEdit={openEdit} />
        </CardContent>
      </Card>

      <TimesheetPanel
        open={panelOpen}
        mode={panelMode}
        data={detail}
        onOpenChange={setPanelOpen}
      />
    </main>
  );
}
