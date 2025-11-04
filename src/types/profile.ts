export interface Profile {
  name: string;
  location: string;
  email: string;
  phone: string;
  completionPercentage: number;
  date_birth: string;
  gender: string;
  nationality: string;
  loc: string;
  keywords: string[];
  version_no: string;
  percent_completion: number;
  passport_number?: string;
}

export interface Profession {
  title: string;
  experience: string;
  current_salary: string;
  summary: string;
  location: string;
  links: { name: string; url: string }[];
  skills: { name: string; exp: number }[];
  project: {
    project_name: string;
    date: string;
    description: string;
    roles: string[];
    working_period?: { from: Date; to: Date };
  }[];
  certification: {
    title: string;
    institute: string;
    cert_no: string;
    exp_date: string;
    date_range?: { from: Date; to: Date };
  }[];
  education: {
    title: string;
    institution: string;
    graduation_year: number;
    specialization: string;
    score: string;
  }[];
}

export interface EducationQualification {
  title?: string;
  institution?: string;
  graduation_year?: string;
  specialization?: string;
  score?: string;
}

export interface CertificationTable {
  name?: string;
  organization?: string;
  certificate?: string;
  issued_date?: string;
  exp_date?: string;
  url?: string;
}

export interface ProjectTable {
  title?: string;
  customer_company?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  roles_responsibilities?: string;
}

export interface SkillTable {
  key_skills?: string;
  experience?: number;
  url?: string;
}

export interface ExternalProfileLink {
  name?: string;
  url?: string;
}

export interface ProfileList {
  name?: string;
  full_name?: string;
  state?: string;
  current_location?: string;
  gender?: string;
  date_of_birth?: string;
  contact_no?: string;
  email?: string;
  profile_image?: string;
}

export interface ProfileVersionData {
  key_skills?: string[];
  external_profile_links?: ExternalProfileLink[];
  skills_table?: SkillTable[];
  projects_table?: ProjectTable[];
  certification_table?: CertificationTable[];
  education_qualifications?: EducationQualification[];
  preferred_places?: string[];
  professional_summary?: string;
  version?: string;
  professional_title?: string;
  experience_years?: number;
  experience_months?: number;
  current_salary?: number;
  current_salary_currency?: string;
  nationality?: string;
  open_to_world?: boolean;
  accept_country_opportunities?: boolean;
}

export interface SingleCandidateData {
  name?: string;
  full_name?: string;
  state?: string;
  current_location?: string;
  gender?: string;
  date_of_birth?: string;
  contact_no?: string;
  email?: string;
  profile_image?: string;
  key_skills?: string[];
  external_profile_links?: ExternalProfileLink[];
  skills_table?: SkillTable[];
  projects_table?: ProjectTable[];
  certification_table?: CertificationTable[];
  education_qualifications?: EducationQualification[];
  preferred_places?: string[];
  professional_summary?: string;
  version?: string;
  professional_title?: string;
  experience_years?: number;
  experience_months?: number;
  current_salary?: number;
  current_salary_currency?: string;
  nationality?: string;
  profile_completion?: number;
  profile?: string;
  percent_completion?: number;
  status?: string;
  experience?: string;
  open_to_world?: boolean;
  accept_country_opportunities?: boolean;
}

export interface ResSingleCandidateData {
  message: {
    profile: ProfileList;
    profile_version: ProfileVersionData;
  };
}

export interface UpdateCandidateData {
  profile: ProfileList;
  profile_version: ProfileVersionData;
}
