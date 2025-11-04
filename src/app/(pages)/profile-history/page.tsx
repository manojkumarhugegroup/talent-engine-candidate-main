"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { VersionCard } from "@/components/profile-history/versionCard";
import { PersonalDetails } from "@/components/profile-history/personalDetails";
import { useEffect, useMemo, useState } from "react";
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
} from "@/types/profile";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState({
    version: true,
    profession: true,
  });

  const { singleCandidate, fetchSingleCandidate, historyData, fetchHistory } =
    useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchSingleCandidate(), fetchHistory()]);
      } finally {
        setLoading({
          version: false,
          profession: false,
        });
      }
    };
    fetchData();
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

  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);
  const [latestVersionId, setLatestVersionId] = useState<string | null>(null);

  // Get latest version
  const latestVersion = useMemo(() => {
    if (!historyData || historyData.length === 0) return null;
    return historyData.find((version) => version.is_latest) || historyData[0];
  }, [historyData]);

  // Handle version selection
  const handleVersionSelect = async (versionId: string) => {
    setActiveVersionId(versionId);
    setLoading((prev) => ({ ...prev, profession: true }));

    try {
      await fetchSingleCandidate(versionId);
    } finally {
      setLoading((prev) => ({ ...prev, profession: false }));
    }
  };

  // By default show latest version if none selected
  const displayedVersionId = activeVersionId ?? latestVersion?.id;

  const refreshAll = () => {};

  const handleSetLatest = (versionId: string) => {
    setLatestVersionId(versionId);
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
              <p className="text-lg font-semibold">Profile Version History</p>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
          {/* Profile Column */}
          <div className="space-y-6 col-span-1">
            {loading.version ? (
              <div className="bg-gray-800 rounded-lg p-4 animate-pulse min-h-screen">
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="h-20 bg-gray-700 rounded mb-4 mt-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="h-20 bg-gray-700 rounded mb-4 mt-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ) : historyData && historyData.length > 0 ? (
              <VersionCard
                versions={historyData}
                activeVersionId={activeVersionId || latestVersion?.id}
                onSelectVersion={handleVersionSelect}
                latestVersionId={latestVersionId}
              />
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                Failed to load profile
              </div>
            )}
          </div>

          <div className="flex flex-col col-span-4">
            {loading.profession ? (
              <div className="bg-gray-800 rounded-lg p-4 animate-pulse h-full">
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="h-20 bg-gray-700 rounded mb-4 mt-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="h-20 bg-gray-700 rounded mb-4 mt-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="h-20 bg-gray-700 rounded mb-4 mt-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ) : candidate ? (
              <PersonalDetails
                profession={candidate}
                isLatest={
                  activeVersionId === latestVersion?.id ||
                  (!activeVersionId && latestVersion?.is_latest)
                }
                versionId={activeVersionId || latestVersion?.id}
                onSetLatest={handleSetLatest}
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
  );
}
