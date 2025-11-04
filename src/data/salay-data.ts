import { CandidateDataType } from "@/types/salay-negotations";


export const candidateData: CandidateDataType = {
  candidate: {
    name: "John",
    profession: "Procurement Specialist",
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
      rotationCycle: "8 Weeks On / 2 Weeks Off",
      workingHours: "10 Hours",
      workingDays: "6 Days",
    },
    compensation: {
      totalBillRate: "$2000 - $2500",
      expectedSalary: "$2100",
    },
  },
  proposals: [
    {
      version: "v2",
      status: "Awaiting candidate acceptance",
      salary: {
        amount: 2300,
        type: "Base Salary",
      },
      joiningDate: "Aug 01, 2025",
      submittedBy: {
        name: "Job (HR)",
        date: "Jul 24, 2025 1:17 PM CST",
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
        talentEngine: ["Provision of Visa and Work Permit (as applicable)", "Employers Liability and All Risks Insurance",
          "Medical Insurance",
          "Local Business Transportation (Daily)",
          "Accommodation and Food",],
        notApplicable: [
          "Third Party Specialist (Representative) requirements",
          "Purchase of Any Project Materials and Consumable Materials",
        ],
      },
      notes:
        "Thank you for reviewing the proposed salary package and sharing your questions. All mandatory benefits such as medical insurance, protective equipment, and training costs (if required) are fully covered by the client and will not be deducted from your salary. Mobilization and demobilization travel expenses are to be arranged by you, and there is no additional reimbursement for these costs outside of the offered package.",
      compensation: {
        baseSalary: 96,
        mandatoryBurdens: 18,
        variableBenefits: 9,
        totalDailyCost: 123,
        overtimeWeekdays: 12,
        overtimeWeekends: 12,
        overtimeHoliday: 13,
        standbyRate: 10,
        notes:
          "This rate is accurate based on the contract between TE and its client Company. Any changes to these terms will affect this price. All values are rounded off.",
      },
    },
    {
      version: "v1",
      status: "Awaiting candidate acceptance",
      salary: {
        amount: 2000,
        type: "Base Salary",
      },
      joiningDate: "Aug 01, 2025",
      submittedBy: {
        name: "John (HR)",
        date: "Jul 22, 2025 1:17 PM CST",
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
          "Provision of Visa and Work Permit (as applicable)",
          "Employers Liability and All Risks Insurance",
          "Medical Insurance",
          "Local Business Transportation (Daily)",
          "Accommodation and Food",
        ],
        talentEngine: ["Provision of Visa and Work Permit (as applicable)"],
        notApplicable: [
          "Third Party Specialist (Representative) requirements",
          "Purchase of Any Project Materials and Consumable Materials",
        ],
      },
      notes:
        "Thank you for reviewing the proposed salary package and sharing your questions. All mandatory benefits such as medical insurance, protective equipment, and training costs (if required) are fully covered by the client and will not be deducted from your salary. Mobilization and demobilization travel expenses are to be arranged by you, and there is no additional reimbursement for these costs outside of the offered package.",
      compensation: {
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
    {
      version: "v3",
      status: "Awaiting candidate acceptance",
      salary: {
        amount: 2500,
        type: "Base Salary",
      },
      joiningDate: "Aug 01, 2025",
      submittedBy: {
        name: "Joe (HR)",
        date: "Jul 23, 2025 1:17 PM CST",
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
          "Provision of Visa and Work Permit (as applicable)",
          "Employers Liability and All Risks Insurance",
          "Medical Insurance",
          "Local Business Transportation (Daily)",
          "Accommodation and Food",
        ],
        talentEngine: ["Provision of Visa and Work Permit (as applicable)"],
        notApplicable: [
          "Third Party Specialist (Representative) requirements",
          "Purchase of Any Project Materials and Consumable Materials",
        ],
      },
      notes:
        "Thank you for reviewing the proposed salary package and sharing your questions. All mandatory benefits such as medical insurance, protective equipment, and training costs (if required) are fully covered by the client and will not be deducted from your salary. Mobilization and demobilization travel expenses are to be arranged by you, and there is no additional reimbursement for these costs outside of the offered package.",
      compensation: {
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
  ],
  expectations: [
    {
      version: "v1",
      salary: {
        amount: 2200,
        type: "Base Salary",
      },
      joiningDate: "Aug 01, 2025",
      submittedBy: {
        name: "John (Candidate)",
        date: "Jul 24, 2025 12:17 PM CST",
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
          "Provision of Visa and Work Permit (as applicable)",
          "Employers Liability and All Risks Insurance",
          "Medical Insurance",
          "Local Business Transportation (Daily)",
          "Accommodation and Food",
        ],
        talentEngine: ["Provision of Visa and Work Permit (as applicable)"],
        notApplicable: [
          "Third Party Specialist (Representative) requirements",
          "Purchase of Any Project Materials and Consumable Materials",
        ],
      },
      notes:
        "Could you please confirm if the medical insurance, travel arrangements, and training costs are fully included in the offered package? If they will be deducted separately?.. Also, will the mobilization/demobilization travel expenses be reimbursed in addition to the salary, or are they covered within the total monthly amount?",
      compensation: {
        baseSalary: 92,
        mandatoryBurdens: 17,
        variableBenefits: 8,
        totalDailyCost: 117,
        overtimeWeekdays: 11,
        overtimeWeekends: 12,
        overtimeHoliday: 13,
        standbyRate: 9,
        notes:
          "This rate is accurate based on the contract between TE and its client Company. Any changes to these terms will affect this price. All values are rounded off.",
      },
    },
    {
      version: "v2",
      salary: {
        amount: 2500,
        type: "Base Salary",
      },
      joiningDate: "Sep 06, 2025",
      submittedBy: {
        name: "Alex (Candidate)",
        date: "Jul 24, 2025 3:45 PM CST",
      },
      terms: {
        byClient: [
          "Personal Income & Social Taxation (as applicable)",
          "Gate Passes",
          "Medical / Health Check",
          "Accommodation provided at site",
        ],
        byCandidate: [
          "Air Travel Costs (including mob/demob flights)",
          "Provision of Visa and Work Permit (as applicable)",
          "Local Business Transportation (Daily)",
        ],
        talentEngine: ["Provision of Visa and Work Permit (as applicable)"],
        notApplicable: [
          "Purchase of Any Project Materials and Consumable Materials",
          "Third Party Specialist (Representative) requirements",
        ],
      },
      notes:
        "Revised expectation with slightly higher base salary due to extended notice period. Please confirm if daily transportation will be covered additionally or considered within the package.",
      compensation: {
        baseSalary: 92,
        mandatoryBurdens: 18,
        variableBenefits: 9,
        totalDailyCost: 121,
        overtimeWeekdays: 12,
        overtimeWeekends: 13,
        overtimeHoliday: 14,
        standbyRate: 10,
        notes:
          "Values adjusted based on revised salary expectation. All values are rounded off.",
      },
    },
    {
      version: "v3",
      salary: {
        amount: 2400,
        type: "Base Salary",
      },
      joiningDate: "Sep 05, 2025",
      submittedBy: {
        name: "Carol (Candidate)",
        date: "Jul 26, 2025 3:45 PM CST",
      },
      terms: {
        byClient: [
          "Personal Income & Social Taxation (as applicable)",
          "Gate Passes",
          "Medical / Health Check",
          "Accommodation provided at site",
        ],
        byCandidate: [
          "Air Travel Costs (including mob/demob flights)",
          "Provision of Visa and Work Permit (as applicable)",
          "Local Business Transportation (Daily)",
        ],
        talentEngine: ["Provision of Visa and Work Permit (as applicable)"],
        notApplicable: [
          "Purchase of Any Project Materials and Consumable Materials",
          "Third Party Specialist (Representative) requirements",
        ],
      },
      notes:
        "Revised expectation with slightly higher base salary due to extended notice period. Please confirm if daily transportation will be covered additionally or considered within the package.",
      compensation: {
        baseSalary: 97,
        mandatoryBurdens: 18,
        variableBenefits: 9,
        totalDailyCost: 125,
        overtimeWeekdays: 12,
        overtimeWeekends: 13,
        overtimeHoliday: 14,
        standbyRate: 10,
        notes:
          "Values adjusted based on revised salary expectation. All values are rounded off.",
      },
    },
  ],
}