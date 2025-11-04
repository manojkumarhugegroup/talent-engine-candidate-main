export type InterviewType = "Technical" | "HR" | "Managerial" | "Culture Fit"
export type InterviewMode = "Virtual Meeting" | "In-person" | "Phone"

export interface InterviewSlot {
  id: string
  index: number // 1-based for display
  date: string // ISO yyyy-MM-dd
  time: string // HH:mm (24h)
}

export interface InterviewFormData {
  interviewType: InterviewType
  interviewMode: InterviewMode
  interviewers: string[]
  slots: InterviewSlot[]
}
