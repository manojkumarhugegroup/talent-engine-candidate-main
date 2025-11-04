"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { profileData } from "@/data/profile";
import { useEffect, useState } from "react";
import { ProfileEditSection } from "@/components/profile/edit-profile/profile-edit";
import { ProfessionalEditSection } from "@/components/profile/edit-profile/profession-edit";
import { useDataContext } from "@/context/DataProvider";
import {
  SingleCandidateData,
  ProfileList,
  ProfileVersionData,
  EducationQualification,
  CertificationTable,
  ProjectTable,
  SkillTable,
  ExternalProfileLink,
  UpdateCandidateData,
} from "@/types/profile";
import Cookies from "js-cookie";
import { useForm, FormProvider } from "react-hook-form";

interface Skill {
  name: string;
}

export default function Profile() {
  const router = useRouter();
  const user_id = Cookies.get("user_id");
  const { singleCandidate, fetchSingleCandidate } = useDataContext();
  useEffect(() => {
    fetchSingleCandidate(user_id);
  }, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchSingleCandidate(user_id);
      } catch (error) {
        console.error("Error loading candidate data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const candidateData = singleCandidate?.[0]?.message;

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

  const [candidate, setCandidate] = useState<SingleCandidateData>(() =>
    convertCandidateData({
      profile: candidateData?.profile,
      profile_version: candidateData?.profile_version,
    })
  );

  const handleProfileUpdate = (updatedProfile: SingleCandidateData) => {
    setCandidate(updatedProfile);
  };

  const handleview = () => {
    router.push("/profile-history");
  };

  const methods = useForm<UpdateCandidateData>({
    mode: "onSubmit",
    defaultValues: {
      profile: candidateData?.profile,
      profile_version: candidateData?.profile_version,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: UpdateCandidateData) => {
    const keySkills: Skill[] = Array.isArray(candidate.key_skills)
      ? candidate.key_skills.map((item: string) => ({
          name: item || "",
        }))
      : [{ name: "" }];

    const payload = {
      ...data,
      profile: {
        ...data.profile,
        full_name: candidate.full_name,
        gender: candidate.gender,
        date_of_birth: candidate.date_of_birth,
        current_location: candidate.current_location,
        contact_no: candidate.contact_no,
        email: candidate.email,
        name: candidate.name,
        profile_image: candidate.profile_image,
      },
      profile_version: {
        ...data.profile_version,
        key_skills: keySkills,
        external_profile_links: candidate.external_profile_links,
        skills_table: candidate.skills_table,
        projects_table: candidate.projects_table,
        certification_table: candidate.certification_table,
        education_qualifications: candidate.education_qualifications,
        preferred_places: candidate.preferred_places,
        professional_summary: candidate.professional_summary,
        version: candidate.version,
        professional_title: candidate.professional_title,
        experience_years: candidate.experience_years,
        experience_months: candidate.experience_months,
        current_salary: candidate.current_salary,
        current_salary_currency: candidate.current_salary_currency,
        nationality: candidate.nationality,
      },
    };

    try {
      const endpoint = `/api/candidate/profile_edit?profile_name=${candidate?.name}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Failed: ${res.status} ${res.statusText}`);
      }
      const result = await res.json();
      if (result?.message?.status === "Success") {
        router.push(`/dashboard`, { scroll: false });
      }
      console.log("✅ Form submitted:", result);
    } catch (err) {
      console.error("❌ API error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-profile) text-(--profile-text)">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="container mx-auto py-6">
            <div className="flex justify-between mb-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-transparent"
                  size="sm"
                  onClick={() => router.back()}
                >
                  <ChevronLeft className="w-10 h-10" />
                  <p className="text-lg font-semibold">
                    Edit Candidate Profile
                  </p>
                </Button>
                {candidate?.version && (
                  <Badge className="bg-(--profile-ver-bg) text-(--profile-ver-text) text-sm h-6 mt-1">
                    <>
                      {" "}
                      V
                      {candidate.version != null
                        ? Number(candidate.version).toFixed(1)
                        : ""}
                    </>
                  </Badge>
                )}
                <span className="text-(--profile-per) text-sm font-medium mt-2">
                  ({profileData.percent_completion}% Completed)
                </span>
              </div>
              <div className="flex gap-5">
                <Button
                  onClick={handleview}
                  variant="ghost"
                  className=" text-(--delete) px-5 text-xs py-5 hover:bg-transparent hover:text-(--delete)"
                >
                  <img
                    src="/assets/icons/candidate/delete-ion.svg"
                    className="w-5 h-5"
                  />{" "}
                  Delete this Version
                </Button>
                <Button
                  onClick={handleview}
                  variant="outline"
                  className="border-(--interview) text-(--interview) px-5 rounded-sm py-5 bg-transparent hover:bg-transparent hover:text-(--interview)"
                >
                  Save
                </Button>
                <Button
                  className="bg-(--interview) px-6 py-5 rounded-sm hover:bg-(--interview)"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </div>
            </div>
            {/* bg-(--bg-candidate) */}
            <div className=" border border-(--popover) rounded-md shadow-xl px-2">
              <div className="p-2 flex justify-between">
                <p className="text-base font-semibold">Profile Info</p>

                <div className="flex gap-5">
                  <Button className="bg-(--interview) px-6 py-4 rounded-sm hover:bg-(--interview)">
                    View Mode
                  </Button>
                  <Button
                    onClick={handleview}
                    variant="outline"
                    className="border-(--interview) text-(--interview) bg-transparent  rounded-sm hover:bg-transparent hover:text-(--interview)"
                  >
                    <img
                      src="/assets/icons/candidate/view-ion.svg"
                      className="w-5 h-5"
                    />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5  gap-4 py-1">
                <div className="space-y-6  col-span-2">
                  {loading ? (
                    <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
                      <div className="h-20 bg-gray-700 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    </div>
                  ) : candidate ? (
                    <ProfileEditSection
                      profile={candidate}
                      onProfileUpdate={handleProfileUpdate}
                    />
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                      Failed to load profile
                    </div>
                  )}
                </div>

                <div className="  flex flex-col col-span-3">
                  {loading ? (
                    <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
                      <div className="h-20 bg-gray-700 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    </div>
                  ) : candidate ? (
                    <ProfessionalEditSection
                      profession={candidate}
                      onProfessionUpdate={handleProfileUpdate}
                    />
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                      Failed to load profile
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
