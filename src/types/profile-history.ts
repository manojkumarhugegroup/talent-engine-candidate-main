export interface Profile {
  name: string
  location: string
  email: string
  phone: string
  completionPercentage: number
  date_birth: string
  gender: string
  nationality: string
  loc: string
  keywords: string[]
  avatar: string
}

export interface VersionItem {
  id: string
  version: number
  created_by: string
  created_time: string
  created_on: string
  timezone: string
  status: string
  cloned_from: string
  is_latest: boolean
}

export interface VersionResponse {
  versions: VersionItem[]
}

export interface PersonalData {
  name: string
  email: string
  phone: string
  completionPercentage: number
  date_birth: string
  gender: string
  location: string
  nationality: string
  loc: string
  keywords: string[]
  avatar: string
  title: string
  experience: string
  current_salary: string
  summary: string
  locations: string
  links: { name: string, url: string }[]
  skills: { name: string; exp: number }[]
  project: { project_name: string; date: string; description: string, roles: string[] }[]
  certification: { title: string; institute: string; cert_no: string; exp_date: string }[]
  education: { title: string; institute: string; year: number; dept: string; score: string }[]
  status?: "Draft" | "Published"
}