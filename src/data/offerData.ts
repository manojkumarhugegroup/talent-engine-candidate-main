import { OrderDataType } from "@/types/offer";





export const orderData: OrderDataType = {
  candidate: {
    name: "Procurement Specialist",
    profession: "Shell",
    avatar: "/assets/icons/placeholder.svg",
    nationality: "USA",
    category: "Skilled Technician",
    projectInfo: {
      projectName: "Fuel Operations",
      location: "Houston, South, US",
      startDate: "Aug 01, 2025",
      endDate: "Jul 30, 2027",
      contractDuration: "24 Months",
      noticePeriod: "30 Days",
      rotation_cycle:"8 Weeks On / 2 Weeks Off",
      working_hours:"10 Hours",
      working_days:"6 Days"

    },
    workPolicy: {
      monthBillRate: 24,
      annualBillRate: 288,
      publicHolidays: 10,
      vacation: 20,
      sickLeave: 15,
      travelDays: 15,
    },

    terms: {
      byClient: [

        "Personal Income & Social Taxation (as applicable)",
        "Pension Plan (as applicable)",
        "Gate Passes",
        "Medical / Health Check",
        "Temporary Site Offices",
        "Power and Water supply to temporary site offices",
        "Site Facilities (workshop, restroom, stores, etc.)",
        "Test Instruments, Construction Equipment, Access Platforms and Scaffolding",
      ],
      byCandidate: [
        "Air Travel Costs (including mob/demob flights)",

      ],
      talentEngine: ["Provision of Visa and Work Permit (as applicable)",
        "Employers Liability and All Risks Insurance",
        "Medical Insurance",
        "Local Business Transportation (Daily)",
        "Accommodation and Food",],
      notApplicable: [
        "Third Party Specialist (Representative) requirements",
        "Purchase of Any Project Materials and Consumable Materials",
      ],
    },

    compensation: {
      currencySymbol: "$",
      totalSalary: "$2400/Month",
      proposedDate: "Aug 01, 2025",
      baseSalary: 94,
      mandatoryBurdens: 15,
      variableBenefits: 4,
      totalDailyCost: 132,
      overtimeWeekdays: 12,
      overtimeWeekends: 12,
      overtimeHoliday: 13,
      standbyRate: 10,
      notes:
        "This rate is accurate based on the contract between TE and its client Company. Any changes to these terms will affect this price. All values are rounded off.",
    },
  },

}