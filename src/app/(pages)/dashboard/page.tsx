"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { JobCard } from "@/components/dashboard/job-card";
import { StatusCard } from "@/components/dashboard/status-card";
import { InterviewCard } from "@/components/dashboard/interview-card";
import { ActionableCard } from "@/components/dashboard/actionable-card";
import Contract from "@/components/contract/contract";
import { useEffect, useState } from "react";
import { InterviewDrawer } from "@/components/interview/InterviewDrawer";
import { CandidateDrawer } from "@/components/Salary-negotations/CandidateSection";
import Cookies from "js-cookie";
import { OfferLetterView } from "@/components/Offer/page";
import { JobDataView } from "@/components/Offer/JobDataView";
import {
  SingleCandidateData,
  ProfileList,
  ProfileVersionData,
  EducationQualification,
  CertificationTable,
  ProjectTable,
  SkillTable,
  ExternalProfileLink,
} from "@/types/profile";
import { useDataContext } from "@/context/DataProvider";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState({
    profile: true,
    recommendedJobs: true,
    applicationStatuses: true,
    actionables: true,
    interviewData: true,
    jobs: true,
    interviews: true,
    applications: true,
  });

  const user_id = Cookies.get("user_id");

  const searchParams = useSearchParams();
  const [interviewSlot, setInterviewSlot] = useState(false);
  const [interviewID, setinterviewID] = useState("");

  useEffect(() => {
    const slot = searchParams.get("interview_slot");
    if (slot) {
      setInterviewSlot(true);
      setinterviewID(slot);
    } else {
      setInterviewSlot(false);
      setinterviewID("");
    }
  }, [searchParams]);
  
  const {
    singleCandidate,
    fetchSingleCandidate,
    recommendedJobs,
    fetchRecommendedJobs,
    applicationStatus,
    fetchApplicationStatus,
    scheduledInterview,
    fetchScheduledInterview,
    actionables,
    fetchActionables,
  } = useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchSingleCandidate(user_id),
          fetchRecommendedJobs(),
          fetchScheduledInterview(),
          fetchActionables(),
        ]);
      } finally {
        setLoading({
          profile: false,
          recommendedJobs: false,
          applicationStatuses: false,
          actionables: false,
          interviewData: false,
          jobs: false,
          interviews: false,
          applications: false,
        });
      }
    };
    fetchData();
  }, []);

  const candidateData = singleCandidate?.[0]?.message ?? null;

  const convertCandidateData = (data: {
    profile?: ProfileList;
    profile_version?: ProfileVersionData;
  }): SingleCandidateData => {
    const profile = data?.profile || {};
    const version = data?.profile_version || {};

    return {
      name: profile.name || "",
      full_name: profile.full_name || "",
      email: profile.email || "",
      contact_no: profile.contact_no || "",
      profile_completion: 100,
      date_of_birth: profile.date_of_birth || "",
      gender: profile.gender || "",
      open_to_world: version.open_to_world ?? false,
      accept_country_opportunities:
        version.accept_country_opportunities ?? false,
      nationality: version.nationality || "",
      current_location: profile.current_location || "",
      key_skills: Array.isArray(version.key_skills) ? version.key_skills : [],
      external_profile_links: Array.isArray(version.external_profile_links)
        ? version.external_profile_links.map((link: ExternalProfileLink) => ({
            name: link.name || "",
            url: link.url || "",
          }))
        : [],
      skills_table: Array.isArray(version.skills_table)
        ? version.skills_table.map((skill: SkillTable) => ({
            key_skills: skill.key_skills || "",
            experience: skill.experience || 0,
            url: skill.url || "",
          }))
        : [],
      projects_table: Array.isArray(version.projects_table)
        ? version.projects_table.map((proj: ProjectTable) => ({
            title: proj.title || "",
            customer_company: proj.customer_company || "",
            start_date: proj.start_date || "",
            end_date: proj.end_date || "",
            description: proj.description || "",
            roles_responsibilities: proj.roles_responsibilities || "",
          }))
        : [],
      certification_table: Array.isArray(version.certification_table)
        ? version.certification_table.map((cert: CertificationTable) => ({
            certificate: cert.certificate || "",
            organization: cert.organization || "",
            name: cert.name || "",
            issued_date: cert.issued_date || "",
            exp_date: cert.exp_date || "",
            url: cert.url || "",
          }))
        : [],
      education_qualifications: Array.isArray(version.education_qualifications)
        ? version.education_qualifications.map(
            (edu: EducationQualification) => ({
              title: edu.title || "",
              institution: edu.institution || "",
              graduation_year: edu.graduation_year || "",
              specialization: edu.specialization || "",
              score: edu.score || "",
            })
          )
        : [],
      preferred_places: version.preferred_places || [],
      professional_summary: version.professional_summary || "",
      version: version.version || "",
      professional_title: version.professional_title || "",
      experience_years: version.experience_years || 0,
      experience_months: version.experience_months || 0,
      current_salary: version.current_salary || 0,
      current_salary_currency: version.current_salary_currency || "",
      profile_image: profile.profile_image || "",
      profile: profile.name || "",
      percent_completion: 100,
      status: profile.state || "Draft",
      experience: `${version.experience_years || 0} Years ${
        version.experience_months || 0
      } Months`,
    };
  };

  const candidate: SingleCandidateData = convertCandidateData({
    profile: candidateData?.profile,
    profile_version: candidateData?.profile_version,
  });

  useEffect(() => {
    if (!candidateData?.profile?.name) return;
    const fetchStatus = async () => {
      await fetchApplicationStatus(candidateData.profile.name);
    };
    fetchStatus();
  }, [candidateData]);

  console.log(applicationStatus, "applicationStatus");

  const [interviewDrawerOpen, setInterviewDrawerOpen] = useState(false);
  const [salaryDrawerOpen, setSalaryDrawerOpen] = useState(false);
  const [offerDrawerOpen, setOfferDrawerOpen] = useState(false);

  const handleOpen = (type: string) => {
    if (type === "Choose your slot") {
      setInterviewDrawerOpen(true);
    } else if (type === "Salary Negotiation") {
      setSalaryDrawerOpen(true);
    } else if (type === "Review Offer Letter") {
      setOfferDrawerOpen(true);
    }
  };

  const [jobViewState, setjobViewState] = useState(false);
  const [jobViewData, setjobViewData] = useState({});

  const handleJobView = async (job: string) => {
    setjobViewState(true);
    try {
      const response = await fetch(`/api/masters/singleget?job_id=${job}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setjobViewData(data?.data);
    } catch {
      setjobViewData({});
      setjobViewState(false);
    }
  };

  const handleJobClose = async () => {
    setjobViewData({});
    setjobViewState(false);
  };

  const handleSlotClose = async () => {
    setInterviewSlot(false);
    setinterviewID("");
  };

  return (
    <div className="min-h-[calc(100vh-3.4rem)] bg-(--bg-profile) text-(--profile-text)">
      <div className="container mx-auto py-6">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="bg-(--bg-candidate) rounded-lg p-1 flex w-fit cursor-pointer h-10">
            <TabsTrigger
              value="home"
              className="px-14 py-3 rounded-md text-sm font-medium 
        data-[state=active]:bg-primary data-[state=active]:text1
        text-(--tab-text) hover:text-white transition-colors cursor-pointer"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              value="contract"
              className="px-14 py-2 rounded-md text-sm font-medium 
        data-[state=active]:bg-primary data-[state=active]:text1
        text-(--tab-text) hover:text-white transition-colors cursor-pointer"
            >
              Contract
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="home"
            className="mt-2 max-h-[calc(90vh-6rem)] flex flex-col"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full min-h-0">
              <div className="space-y-6 flex flex-col h-full min-h-0 bg-(--bg-candidate) border border-(--bg-border) rounded-md  shadow-md scroll-container">
                {loading.profile ? (
                  <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
                    <div className="h-20 bg-gray-700 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ) : candidate ? (
                  <ProfileCard profile={candidate} />
                ) : (
                  <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                    Failed to load profile
                  </div>
                )}
              </div>

              <div className=" h-full min-h-0  rounded-md bg-(--bg-candidate) border border-(--bg-border) shadow-md flex flex-col">
                <div className="flex-shrink-0">
                  <h2 className="text-(--tab-bg) font-semibold text-md px-4 pt-2">
                    Recommended Jobs
                  </h2>
                  <p className="text-(--tab-profile-text) text-xs mb-2 px-4">
                    Perfect matches for your profile
                  </p>
                </div>

                <div className="flex-1 overflow-auto px-2 pb-2 scroll-container">
                  <div className="space-y-1 ">
                    {loading.jobs ? (
                      Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-gray-800 rounded-lg p-4 animate-pulse"
                        >
                          <div className="h-4 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        </div>
                      ))
                    ) : recommendedJobs && recommendedJobs.length > 0 ? (
                      recommendedJobs.map((job, i) => (
                        <JobCard
                          key={i}
                          job={job}
                          handleJobView={handleJobView}
                        />
                      ))
                    ) : (
                      <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                        No jobs available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 h-full min-h-0">
                <div className="rounded-md bg-(--bg-candidate) border border-(--bg-border) shadow-md flex flex-col flex-[3] min-h-0">
                  <div className="flex-shrink-0 px-3 py-2">
                    <div className="flex items-center justify-between ">
                      <div className="flex-shrink-0">
                        <h2 className="text-(--tab-bg) font-semibold text-md">
                          Application Status
                        </h2>
                        <p className="text-(--tab-profile-text) text-xs mb-2">
                          Track your job application progress
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto px-3 pb-2 scroll-container">
                    <div className="space-y-1">
                      {loading.applications ? (
                        Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-4 animate-pulse"
                          >
                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                          </div>
                        ))
                      ) : applicationStatus.length > 0 ? (
                        applicationStatus.map((status, i) => (
                          <StatusCard key={i} status={status} />
                        ))
                      ) : (
                        <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                          No applications found
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-sm shadow-md flex flex-col flex-[2] min-h-0">
                  <div className="flex-shrink-0 px-3 py-2">
                    <h3 className="text-(--tab-bg) font-semibold text-md mb-1">
                      Interview
                    </h3>
                  </div>

                  <div className="flex-1 overflow-auto px-3 pb-2 scroll-container">
                    <div className="space-y-1">
                      {loading.interviews ? (
                        Array.from({ length: 2 }).map((_, index) => (
                          <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-4 animate-pulse"
                          >
                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                          </div>
                        ))
                      ) : scheduledInterview.length > 0 ? (
                        scheduledInterview.map((interview, i) => (
                          <InterviewCard key={i} interview={interview} />
                        ))
                      ) : (
                        <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                          No interviews scheduled
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-full min-h-0 bg-(--bg-candidate) border border-(--bg-border) rounded-md  shadow-md scroll-container p-3">
                <h2 className="text-[#b8c2cf] font-semibold text-md mb-1">
                  Actionables ({actionables.length})
                </h2>
                <div className="space-y-1">
                  {loading.actionables ? (
                    Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4 animate-pulse"
                      >
                        <div className="h-4 bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))
                  ) : actionables.length > 0 ? (
                    actionables.map((actionable, i) => (
                      <ActionableCard
                        key={i}
                        actionable={actionable}
                        handleOpen={handleOpen}
                      />
                    ))
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                      No actionables available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contract" className="m-0 p-0">
            <Contract />
          </TabsContent>
        </Tabs>
      </div>
      <CandidateDrawer
        open={salaryDrawerOpen}
        onOpenChange={() => setSalaryDrawerOpen(false)}
      />
      <OfferLetterView
        open={offerDrawerOpen}
        onOpenChange={() => setOfferDrawerOpen(false)}
      />

      <JobDataView
        open={jobViewState}
        onOpenChange={handleJobClose}
        data={jobViewData}
      />

      <InterviewDrawer
        open={interviewSlot}
        onOpenChange={handleSlotClose}
        interviewID={interviewID}
      />
    </div>
  );
}
