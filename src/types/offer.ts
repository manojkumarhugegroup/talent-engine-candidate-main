export interface Candidate {
  name: string
  profession: string
  avatar: string
  nationality: string
  category: string
  projectInfo: {
    projectName: string
    location: string
    startDate: string
    endDate: string
    contractDuration: string
    noticePeriod: string
    rotation_cycle:string
    working_hours:string
    working_days:string
   
  }
  workPolicy: {
    monthBillRate: number
    annualBillRate: number
    publicHolidays: number
    vacation: number
    sickLeave: number
    travelDays: number
  }
   terms: {
    byClient: string[]
    byCandidate: string[]
    talentEngine: string[]
    notApplicable: string[]
  }
    compensation: {
          currencySymbol: string 
        totalSalary: string
    proposedDate: string
    baseSalary: number
    mandatoryBurdens: number
    variableBenefits: number
    totalDailyCost: number
    overtimeWeekdays: number
    overtimeWeekends: number
    overtimeHoliday: number
    standbyRate: number
    notes: string
  }
}




export type OrderProfile = Candidate



export interface OrderDataType {
  candidate: Candidate | null
    
}