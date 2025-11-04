
export interface Job {
  id: string
  JobTitle: string
  JobID: string
  Location: string
  currency: string
  Salary: string
  pay_rate: string
  salaryPeriod?: string // This seems to be missing from API response
  MatchScore: number
  status: string
  Status: string
  rotation?: string // This is in your API response
}

export interface ApplicationStatus {
  id: string
  job_title: string
  job_id: string
  status: "Shortlisted" | "Interview" | "Sent Interest"
  date: string
  interviewDate?: string
  interviewTime?: string
}

export interface Actionable {
  id: string    
  job_title: string
  job_id: string
  round_info: string
  slots: number
  interview_type: string
  interview_mode: string
  action_type: number
}

export interface Profile {
  name: string
  location: string
  email: string
  phone: string
  completionPercentage: number
  description: string
  keywords: string[]
  avatar: string
}
export interface InterviewData {
  id: string;
  job_title: string;
  job_id: string;
  round: string;
  date: string;
  time: string;
  time_zone: string;
  interview_type: string;
  interview_mode: string;
}