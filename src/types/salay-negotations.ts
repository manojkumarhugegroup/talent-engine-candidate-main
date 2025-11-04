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
    rotationCycle: string
    workingHours: string
    workingDays: string
  }
  compensation: {
    totalBillRate: string
    expectedSalary: string
  }
}

export type CandidateProfile = Candidate

export interface Proposal {
  version: string
  status: string
  salary: {
    amount: number
    type: string
  }
  joiningDate: string
  submittedBy: {
    name: string
    date: string
  }
  terms: {
    byClient: string[]
    byCandidate: string[]
    talentEngine: string[]
    notApplicable: string[]
  }
  notes: string
  compensation: {
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

export interface Expectation {
  version: string
  salary: {
    amount: number
    type: string
  }
  joiningDate: string
  submittedBy: {
    name: string
    date: string
  }
  terms: {
    byClient: string[]
    byCandidate: string[]
    talentEngine: string[]
    notApplicable: string[]
  }
  notes: string
  compensation: {
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

export interface CandidateDataType {
  candidate: Candidate | null
  proposals: Proposal[]
   expectations: Expectation[]  
}