import { differenceInCalendarMonths, differenceInDays } from "date-fns"

type CountType = {
    all: number;
    received: number;
    shortlisted: number;
    interview: number;
    selected: number;
    onboarded: number;
    rejected: number;
};


type StatKey = keyof CountType;

interface CandidateStat {
    label: string;
    key: StatKey;
    color: string;
    bgColor: string;
    icon?: string;
}

export const getStatusColor = (status: string) => {
    switch (status) {
        case "Draft":
            return "bg-[#F1EDFF] text-[#A78BFA] hover:bg-violet-100 border-[#A78BFA]"
        case "Open":
            return "bg-[#E7FFF7] text-[#10B981] hover:bg-green-100 border-[#10B981]"
        case "Closed":
            return "bg-[#F0F0F0] text-[#6C757D] hover:bg-gray-100 border-[#6C757D]"
        case "New":
            return "bg-[#FFF5EB] text-[#FF9B10] hover:bg-yellow-100 border-[#FF9B10]"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-800"
    }
}

export const getRemainingTime = (
  postStart: string,
  postEnd: string,
  type: 1 | 2 = 1
) => {
  const startDate = new Date(postStart);
  const endDate = new Date(postEnd);

  if (type === 2) {
    const totalDays = differenceInDays(endDate, startDate);
    return {
      months: 0,
      days: totalDays,
      formatted: `${totalDays} day${totalDays !== 1 ? "s" : ""}`,
    };
  }

  let monthsBetween = differenceInCalendarMonths(endDate, startDate);

  let adjustedStartDate = new Date(startDate);
  adjustedStartDate.setMonth(startDate.getMonth() + monthsBetween);

  if (adjustedStartDate > endDate) {
    monthsBetween -= 1;
    adjustedStartDate = new Date(startDate);
    adjustedStartDate.setMonth(startDate.getMonth() + monthsBetween);
  }

  const remainingDays = differenceInDays(endDate, adjustedStartDate);

  return {
    months: monthsBetween,
    days: remainingDays,
    formatted: `${monthsBetween > 0 ? monthsBetween + " month" + (monthsBetween !== 1 ? "s" : "") : ""} ${
      remainingDays > 0 ? remainingDays + " day" + (remainingDays !== 1 ? "s" : "") : ""
    }`.trim(),
  };
};


export const candidateStats: CandidateStat[] = [
    { label: "All Candidates", key: "all", color: "all-candidate", bgColor: "all-candidate-light" },
    { label: "Received", key: "received", color: "received", bgColor: "received-light", icon: "/assets/icons/job-listing/received.svg" },
    { label: "Shortlisted", key: "shortlisted", color: "shortlisted", bgColor: "shortlisted-light", icon: "/assets/icons/job-listing/shortlisted.svg" },
    { label: "Interview", key: "interview", color: "interview", bgColor: "interview-light", icon: "/assets/icons/job-listing/interview_f.svg" },
    { label: "Selected", key: "selected", color: "selected", bgColor: "selected-light", icon: "/assets/icons/job-info/Kanban/selected.svg" },
    { label: "Onboarded", key: "onboarded", color: "onboarded", bgColor: "onboarded-light", icon: "/assets/icons/job-info/Kanban/onboarding.svg" },
    { label: "Rejected", key: "rejected", color: "rejected", bgColor: "rejected-light", icon: "/assets/icons/job-info/rejected_f.svg" },
];

export const getCandidateStatus = (sts: string) => {
    return `bg-[var(--${sts}-light)] text-[var(--${sts})] hover:bg-[var(--${sts}-light)] border-[var(--${sts})]/50 capitalize `;
};



