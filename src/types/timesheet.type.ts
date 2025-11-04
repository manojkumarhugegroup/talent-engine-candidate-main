// timesheet.type.ts
export type TimesheetDay = {
  weekday: string;
  date_label: string;
  hours: number | ""; // allow empty string for locked days
  remarks: string;
  locked: boolean;
};

export type Status =
  | "draft"
  | "sent for approval"
  | "re-submission requested"
  | "approved"; 

export type TimesheetWeek = {
  week_number: number;
  date_range: string;
  total_hours: number;
  status: Status;
  days: TimesheetDay[];
};

export type TimesheetData = {
  contract_title: string;
  contract_subtitle: string;
  year: number;
  weeks: TimesheetWeek[];
};

// ✅ Multiple contracts
export type TimesheetDataList = TimesheetData[];
