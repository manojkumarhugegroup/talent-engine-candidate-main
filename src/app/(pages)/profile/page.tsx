"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProfileSection } from "@/components/profile/profileSection";
import { ProfessionalSection } from "@/components/profile/professionalSection";
import { useEffect, useState } from "react";
import { ReviseDrawer } from "@/components/profile/ReviseDrawer";
import { useDataContext } from "@/context/DataProvider";
import { ProfessionalSkeleton } from "@/components/profile/ProfessionalSkeleton";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
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
import Cookies from "js-cookie";

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

  const candidate: SingleCandidateData = convertCandidateData({
    profile: candidateData?.profile,
    profile_version: candidateData?.profile_version,
  });

  const handleview = () => {
    router.push("/profile-history");
  };

  const [reviseDrawerOpen, setReviseDrawerOpen] = useState(false);

  const handleRevise = () => {
    setReviseDrawerOpen(true);
  };
  return (
    <div className="min-h-screen bg-(--bg-profile) text-(--profile-text)">
      <div className="container mx-auto py-6">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-transparent"
              size="sm"
              onClick={() => router.back()}
            >
              <ChevronLeft className="w-10 h-10" />
              <p className="text-lg font-semibold">My Profile</p>
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
            {candidate?.percent_completion != null && (
              <span className="text-(--profile-per) text-sm font-medium mt-2">
                ({candidate.percent_completion}% Completed)
              </span>
            )}
          </div>
          <div className="flex gap-5">
            <Button
              className="bg-(--interview) px-10 py-5 rounded-sm hover:bg-(--interview)"
              onClick={handleRevise}
            >
              Revise
            </Button>
            <Button
              onClick={handleview}
              variant="outline"
              className="border-(--interview) text-(--interview)  rounded-sm py-5 hover:bg-transparent"
            >
              <img src="/assets/icons/candidate/refresh.svg" alt="refresh" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6  gap-4 py-4">
          {/* Profile Column */}
          <div className="space-y-6  col-span-2">
            {loading ? (
              <ProfileSkeleton />
            ) : candidate ? (
              <ProfileSection profile={candidate} />
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                Failed to load profile
              </div>
            )}
          </div>

          <div className="flex flex-col col-span-4">
            {loading ? (
              <ProfessionalSkeleton />
            ) : candidate ? (
              <ProfessionalSection profession={candidate} />
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                Failed to load profile
              </div>
            )}
          </div>
        </div>
      </div>

      <ReviseDrawer
        open={reviseDrawerOpen}
        onOpenChange={() => setReviseDrawerOpen(false)}
      />
    </div>
  );
}
