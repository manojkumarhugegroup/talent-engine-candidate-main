import { Plus, Trash2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SingleCandidateData } from "@/types/profile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CusTextarea } from "@/components/forms/CusTextarea";
import { CusSelect } from "@/components/forms/CusSelect";
import { SelectItem } from "@/components/ui/select";
import { CusInput } from "@/components/forms/CusInput";
import { Checkbox } from "@/components/ui/checkbox";
import CusChipInput from "@/components/forms/CusChipInput";
import { MultiSelectWithChips } from "@/components/forms/CusMultiSelectwithChip";
import CurrencyFlag from "react-currency-flags";
import { currencies } from "@/data/currency";
import { ProjectType } from "@/types/jobs/get.type";
import { CusDatePicker } from "@/components/forms/CusDatePicker";
import { format } from "date-fns";

interface ProfessionCardProps {
  profession: SingleCandidateData;
  onProfessionUpdate?: (updatedProfession: SingleCandidateData) => void;
}

interface ProfessionFormData {
  version?: string;
  professional_title: string;
  professional_summary: string;
  experience_years: number;
  experience_months: number;
  current_salary: number;
  current_salary_currency: string;
  open_to_world: boolean;
  nationality: string;
  accept_country_opportunities: boolean;
  preferred_places: string[];
  key_skills: string[];
  external_profile_links: Array<{ name: string; url: string }>;
  skills_table: Array<{ key_skills: string; experience: number; url: string }>;
  projects_table: Array<{
    title: string;
    start_date: string;
    end_date: string;
    customer_company: string;
    description: string;
    roles_responsibilities: string;
  }>;
  certification_table: Array<{
    name: string;
    organization: string;
    certificate: string;
    issued_date: string;
    exp_date: string;
    url: string;
  }>;
  education_qualifications: Array<{
    title: string;
    institution: string;
    graduation_year: string;
    specialization: string;
    score: string;
  }>;
}

export function ProfessionalEditSection({
  profession,
  onProfessionUpdate,
}: ProfessionCardProps) {
  const methods = useForm<ProfessionFormData>({
    defaultValues: {
      professional_title: profession.professional_title || "",
      professional_summary: profession.professional_summary || "",
      experience_years: profession.experience_years || 0,
      experience_months: profession.experience_months || 0,
      current_salary: profession.current_salary || 0,
      current_salary_currency: profession.current_salary_currency || "USD",
      open_to_world: false,
      nationality: (profession?.nationality || "").split("--")[1],
      accept_country_opportunities: false,
      preferred_places: profession.preferred_places || [],
      key_skills: profession.key_skills || [],
      external_profile_links: profession.external_profile_links?.map(
        (link) => ({
          name: link.name || "",
          url: link.url || "",
        })
      ) || [{ name: "", url: "" }],
      skills_table: profession.skills_table?.map((skill) => ({
        key_skills: skill.key_skills,
        experience: skill.experience || 0,
        url: skill.url,
      })) || [{ key_skills: "", experience: 0, url: "" }],
      projects_table: profession.projects_table?.map((project) => ({
        title: project.title,
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        customer_company: project.customer_company || "",
        description: project.description || "",
        roles_responsibilities: project.roles_responsibilities || "",
      })) || [
        {
          title: "",
          start_date: "",
          end_date: "",
          customer_company: "",
          description: "",
          roles_responsibilities: "",
        },
      ],
      certification_table: profession.certification_table?.map((cert) => ({
        name: cert.name || "",
        organization: cert.organization || "",
        certificate: cert.certificate || "",
        issued_date: cert.issued_date || "",
        exp_date: cert.exp_date || "",
        url: cert.url || "",
      })) || [
        {
          name: "",
          organization: "",
          certificate: "",
          issued_date: "",
          exp_date: "",
          url: "",
        },
      ],
      education_qualifications: profession.education_qualifications?.map(
        (edu) => ({
          title: edu.title,
          institution: edu.institution,
          graduation_year: edu.graduation_year?.toString() || "",
          specialization: edu.specialization,
          score: edu.score,
        })
      ) || [
        {
          title: "",
          institution: "",
          graduation_year: "",
          specialization: "",
          score: "",
        },
      ],
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const handleExternalLinkReset = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      external_profile_links: (profession.external_profile_links ?? []).map(
        (link, i) => (i === index ? { ...link, name: "", url: "" } : link)
      ),
    });
  };

  const handleExternalLinkRemove = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      external_profile_links: (profession.external_profile_links ?? []).filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleExternalLinkAdd = () => {
    onProfessionUpdate?.({
      ...profession,
      external_profile_links: [
        ...(profession.external_profile_links ?? []),
        { name: "", url: "" },
      ],
    });
  };

  const handleSkillReset = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      skills_table: (profession.skills_table ?? []).map((link, i) =>
        i === index ? { ...link, key_skills: "", experience: 0, url: "" } : link
      ),
    });
  };

  const handleSkillRemove = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      skills_table: (profession.skills_table ?? []).filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleKeySkillsAdd = () => {
    onProfessionUpdate?.({
      ...profession,
      skills_table: [
        ...(profession?.skills_table ?? []),
        { key_skills: "", experience: 0, url: "" },
      ],
    });
  };

  const handleProjectReset = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      projects_table: (profession.projects_table ?? []).map((link, i) =>
        i === index
          ? {
              ...link,
              title: "",
              start_date: "",
              end_date: "",
              customer_company: "",
              description: "",
              roles_responsibilities: "",
            }
          : link
      ),
    });
  };

  const handleProjectRemove = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      projects_table: (profession.projects_table ?? []).filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleProjectAdd = () => {
    onProfessionUpdate?.({
      ...profession,
      projects_table: [
        ...(profession?.projects_table ?? []),
        {
          title: "",
          start_date: "",
          end_date: "",
          customer_company: "",
          description: "",
          roles_responsibilities: "",
        },
      ],
    });
  };

  const handleCertificationReset = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      certification_table: (profession.certification_table ?? []).map(
        (link, i) =>
          i === index
            ? {
                ...link,
                name: "",
                organization: "",
                certificate: "",
                issued_date: "",
                exp_date: "",
                url: "",
              }
            : link
      ),
    });
  };

  const handleCertificationRemove = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      certification_table: (profession.certification_table ?? []).filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleCertificationAdd = () => {
    onProfessionUpdate?.({
      ...profession,
      certification_table: [
        ...(profession?.certification_table ?? []),
        {
          name: "",
          organization: "",
          certificate: "",
          issued_date: "",
          exp_date: "",
          url: "",
        },
      ],
    });
  };

  const handleEducationReset = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      education_qualifications: (profession.education_qualifications ?? []).map(
        (link, i) =>
          i === index
            ? {
                ...link,
                title: "",
                institution: "",
                graduation_year: "",
                specialization: "",
                score: "",
              }
            : link
      ),
    });
  };

  const handleEducationRemove = (index: number) => {
    onProfessionUpdate?.({
      ...profession,
      education_qualifications: (
        profession.education_qualifications ?? []
      ).filter((_, i) => i !== index),
    });
  };

  const handleEducationAdd = () => {
    onProfessionUpdate?.({
      ...profession,
      education_qualifications: [
        ...(profession?.education_qualifications ?? []),
        {
          title: "",
          institution: "",
          graduation_year: "",
          specialization: "",
          score: "",
        },
      ],
    });
  };

  const platformOptions = [
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "GitHub", label: "GitHub" },
    { value: "Portfolio", label: "Portfolio" },
    { value: "Behance", label: "Behance" },
    { value: "Dribbble", label: "Dribbble" },
    { value: "Elbert Metz III", label: "Elbert Metz III" },
  ];

  const [keySkills, setkeySkills] = useState<ProjectType[]>([]);

  const fetchKeySkills = async () => {
    try {
      const response = await fetch(`/api/masters/keyskills`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setkeySkills(data.data?.options);
    } catch {
      setkeySkills([]);
    }
  };

  useEffect(() => {
    fetchKeySkills();
  }, []);

  if (!profession) {
    return (
      <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
        <CardContent className="px-4 py-2">
          <div className="text-center text-white">Loading profession...</div>
        </CardContent>
      </div>
    );
  }

  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="px-4 py-4">
        <div className="  mb-2">
          <span className="text-white text-base font-medium">
            Professional Details
          </span>
        </div>

        <div className="mb-5">
          <Controller
            name="professional_summary"
            control={control}
            rules={{ required: "Summary is required" }}
            render={({ field }) => (
              <CusTextarea
                label="Summary"
                placeholder="Logistics professional contributing to a national initiative..."
                rows={4}
                error={errors.professional_summary?.message}
                value={field.value}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val);
                  onProfessionUpdate?.({
                    ...profession,
                    professional_summary: val,
                  });
                }}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
          <div className="col-span-4">
            <Controller
              name="professional_title"
              control={control}
              rules={{ required: "Professional title is required" }}
              render={({ field }) => (
                <CusInput
                  label="Professional Title"
                  placeholder="Name"
                  error={errors.professional_title?.message}
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                    onProfessionUpdate?.({
                      ...profession,
                      professional_title: val,
                    });
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name="experience_years"
              control={control}
              render={({ field }) => (
                <CusSelect
                  label="Exp Years"
                  value={field.value?.toString() ?? ""}
                  onValueChange={(val) => {
                    field.onChange(Number(val));
                    onProfessionUpdate?.({
                      ...profession,
                      experience_years: Number(val),
                    });
                  }}
                  error={errors.experience_years?.message}
                >
                  {[...Array(20).keys()].map((i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i}
                    </SelectItem>
                  ))}
                </CusSelect>
              )}
            />
          </div>
          <div className="col-span-2">
            <Controller
              name="experience_months"
              control={control}
              render={({ field }) => (
                <CusSelect
                  label="Exp Months"
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(Number(val));
                    onProfessionUpdate?.({
                      ...profession,
                      experience_months: Number(val),
                    });
                  }}
                  error={errors.experience_months?.message}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i}
                    </SelectItem>
                  ))}
                </CusSelect>
              )}
            />
          </div>
          <div className="col-span-2 mt-5">
            <Controller
              name="current_salary_currency"
              control={control}
              rules={{ required: "Salary type is required" }}
              render={({ field }) => (
                <CusSelect
                  value={field.value ?? ""}
                  onValueChange={(val) => {
                    field.onChange(val);
                    onProfessionUpdate?.({
                      ...profession,
                      current_salary_currency: val.toString(),
                    });
                  }}
                  error={errors.current_salary_currency?.message}
                  className="text-xs mb-0"
                >
                  {currencies.map((item, i) => (
                    <SelectItem key={i} value={item.code}>
                      <CurrencyFlag currency={item.code} width={20} />
                      {item.code}
                    </SelectItem>
                  ))}
                </CusSelect>
              )}
            />
          </div>
          <div className="col-span-2">
            <CusInput
              label="Current Salary / Month"
              placeholder="Current Salary / Month"
              error={errors.current_salary?.message}
              {...register("current_salary", {
                required: "Salary is required",
                onChange: (e) => {
                  const val = e.target.value;
                  onProfessionUpdate?.({
                    ...profession,
                    current_salary: Number(val),
                  });
                },
              })}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-base font-medium mr-4">
              Preferred Job Location
            </h3>
            <Controller
              name="open_to_world"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="open-to-world"
                    checked={field.value}
                    onCheckedChange={(val) => {
                      const isChecked = val === true;
                      field.onChange(isChecked);
                      onProfessionUpdate?.({
                        ...profession,
                        open_to_world: isChecked,
                      });
                    }}
                  />
                  <label htmlFor="open-to-world" className="text-sm text-white">
                    {"  I'm open to working anywhere in the world"}
                  </label>
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <CusSelect
                  label="Country"
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    onProfessionUpdate?.({
                      ...profession,
                      nationality: val.toString(),
                    });
                  }}
                  error={errors.nationality?.message}
                >
                  {currencies.map((option) => (
                    <SelectItem key={option.code} value={option.country}>
                      {option.country}
                    </SelectItem>
                  ))}
                </CusSelect>
              )}
            />

            <Controller
              name="accept_country_opportunities"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="accept-country"
                    checked={field.value}
                    onCheckedChange={(val) => {
                      const isChecked = val === true;
                      field.onChange(isChecked);
                      onProfessionUpdate?.({
                        ...profession,
                        accept_country_opportunities: isChecked,
                      });
                    }}
                  />
                  <label
                    htmlFor="accept-country"
                    className="text-sm text-white"
                  >
                    Accept job opportunities anywhere in this country
                  </label>
                </div>
              )}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-white mb-2 block">Place</label>
            <CusChipInput
              value={profession?.preferred_places || []}
              onChange={(vals) =>
                onProfessionUpdate?.({
                  ...profession,
                  preferred_places: vals,
                })
              }
              placeholder="Add preferred places"
              name="preferred_places"
            />
          </div>
        </div>

        <div className="mb-">
          <h3 className="text-white text-base font-medium mb-1.5">
            Key Skills
          </h3>
          <div className="mb-4">
            <Controller
              name="key_skills"
              control={control}
              rules={{ required: "At least one skill is required" }}
              render={({ field }) => (
                <MultiSelectWithChips
                  name="key_skills"
                  placeholder="Keywords"
                  options={
                    Array.isArray(keySkills)
                      ? keySkills.map((k) => ({
                          id: String(k.id ?? k.name ?? k.title ?? ""),
                          name: k.name ?? k.title ?? "",
                        }))
                      : []
                  }
                  value={field.value ?? []}
                  onChange={(vals: string[]) => {
                    field.onChange(vals);
                    onProfessionUpdate?.({
                      ...profession,
                      key_skills: vals,
                    });
                  }}
                  error={errors.key_skills?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-">
          <h3 className="text-white text-base font-medium mb-1.5">
            External Links
          </h3>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>URL Link</TableHead>
                  <TableHead className="w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profession?.external_profile_links?.map(
                  (field_value, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-1/3">
                        <CusSelect
                          value={field_value.name ?? ""}
                          onValueChange={(val) => {
                            const updatedLinks = (
                              Array.isArray(profession?.external_profile_links)
                                ? profession!.external_profile_links!
                                : []
                            ).map((link, i) =>
                              i === index
                                ? { ...link, name: val.toString() }
                                : link
                            );
                            onProfessionUpdate?.({
                              ...(profession ?? {}),
                              external_profile_links: updatedLinks,
                            });
                          }}
                        >
                          {platformOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </CusSelect>
                      </TableCell>
                      <TableCell>
                        <CusInput
                          placeholder="https://www.linkedin.com/in/username"
                          value={field_value?.url ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            onProfessionUpdate?.({
                              ...(profession ?? {}),
                              external_profile_links: (
                                profession?.external_profile_links ?? []
                              ).map((link, i) =>
                                i === index ? { ...link, url: val } : link
                              ),
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {(profession?.external_profile_links ?? []).length <=
                        1 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExternalLinkReset(index)}
                            className="text-gray-400"
                          >
                            <img
                              src="/assets/icons/candidate/eraser.svg"
                              className="w-5 h-5"
                            />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExternalLinkRemove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              type="button"
              onClick={() => handleExternalLinkAdd()}
              className="text-sm bg-(--salary-div) hover:bg-(--salary-div)"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-white text-base font-medium mb-1.5">Skills</h3>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead>Skills</TableHead>
                  <TableHead>Experience (Months)</TableHead>
                  <TableHead>Reference (Link)</TableHead>
                  <TableHead className="w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profession?.skills_table?.map((field, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CusSelect
                        value={field.key_skills ?? ""}
                        onValueChange={(val) => {
                          const updatedLinks = (
                            Array.isArray(profession?.skills_table)
                              ? profession!.skills_table!
                              : []
                          ).map((link, i) =>
                            i === index
                              ? { ...link, key_skills: val.toString() }
                              : link
                          );
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            skills_table: updatedLinks,
                          });
                        }}
                      >
                        {keySkills.map((option) => (
                          <SelectItem
                            key={option.name}
                            value={option.name ?? option.title ?? ""}
                          >
                            {option.name ?? option.title ?? ""}
                          </SelectItem>
                        ))}
                      </CusSelect>
                    </TableCell>
                    <TableCell>
                      <CusSelect
                        value={field.experience ?? ""}
                        onValueChange={(val) => {
                          const updatedLinks = (
                            Array.isArray(profession?.skills_table)
                              ? profession!.skills_table!
                              : []
                          ).map((link, i) =>
                            i === index
                              ? { ...link, experience: Number(val) }
                              : link
                          );
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            skills_table: updatedLinks,
                          });
                        }}
                      >
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </CusSelect>
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Link"
                        value={field?.url ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            skills_table: (profession?.skills_table ?? []).map(
                              (link, i) =>
                                i === index ? { ...link, url: val } : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {(profession?.skills_table ?? []).length <= 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSkillReset(index)}
                          className="text-gray-400"
                        >
                          <img
                            src="/assets/icons/candidate/eraser.svg"
                            className="w-5 h-5"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSkillRemove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              type="button"
              onClick={() => handleKeySkillsAdd()}
              className="text-sm bg-(--salary-div) hover:bg-(--salary-div)"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-white text-base font-medium mb-1.5">Projects</h3>
          <div className="space-y-2 mb-2">
            {profession?.projects_table?.map((field, index) => (
              <div key={index} className="bg-(--badge-color) p-4 rounded mb-4">
                <div className="border p-2 border-(--tab-border) rounded-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium">Project {index + 1}</h4>
                    {(profession?.projects_table ?? []).length <= 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleProjectReset(index)}
                        className="text-gray-400"
                      >
                        <img
                          src="/assets/icons/candidate/eraser.svg"
                          className="w-5 h-5"
                        />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleProjectRemove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <CusInput
                      label="Project Title"
                      placeholder="Project Title"
                      value={field?.title ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onProfessionUpdate?.({
                          ...(profession ?? {}),
                          projects_table: (
                            profession?.projects_table ?? []
                          ).map((link, i) =>
                            i === index ? { ...link, title: val } : link
                          ),
                        });
                      }}
                    />

                    <CusDatePicker
                      label="Project Start Date"
                      value={
                        field.start_date
                          ? new Date(field.start_date)
                          : undefined
                      }
                      onChange={(date) => {
                        const dateString = date
                          ? format(date, "yyyy-MM-dd")
                          : "";
                        onProfessionUpdate?.({
                          ...(profession ?? {}),
                          projects_table: (
                            profession?.projects_table ?? []
                          ).map((link, i) =>
                            i === index
                              ? { ...link, start_date: dateString }
                              : link
                          ),
                        });
                      }}
                    />

                    <CusDatePicker
                      label="Project End Date"
                      value={
                        field.end_date ? new Date(field.end_date) : undefined
                      }
                      onChange={(date) => {
                        const dateString = date
                          ? format(date, "yyyy-MM-dd")
                          : "";
                        onProfessionUpdate?.({
                          ...(profession ?? {}),
                          projects_table: (
                            profession?.projects_table ?? []
                          ).map((link, i) =>
                            i === index
                              ? { ...link, end_date: dateString }
                              : link
                          ),
                        });
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <CusInput
                      label="Customer/ Company"
                      placeholder="Customer/ Company"
                      value={field?.customer_company ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onProfessionUpdate?.({
                          ...(profession ?? {}),
                          projects_table: (
                            profession?.projects_table ?? []
                          ).map((link, i) =>
                            i === index
                              ? { ...link, customer_company: val }
                              : link
                          ),
                        });
                      }}
                    />

                    <CusTextarea
                      label="Description"
                      placeholder="Description"
                      rows={3}
                      value={field?.description ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onProfessionUpdate?.({
                          ...(profession ?? {}),
                          projects_table: (
                            profession?.projects_table ?? []
                          ).map((link, i) =>
                            i === index ? { ...link, description: val } : link
                          ),
                        });
                      }}
                    />
                  </div>

                  <CusTextarea
                    label="Responsibilities"
                    placeholder="Responsibilities"
                    rows={3}
                    value={field?.roles_responsibilities ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      onProfessionUpdate?.({
                        ...(profession ?? {}),
                        projects_table: (profession?.projects_table ?? []).map(
                          (link, i) =>
                            i === index
                              ? { ...link, roles_responsibilities: val }
                              : link
                        ),
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => handleProjectAdd()}
              className="text-sm bg-(--salary-div) hover:bg-(--salary-div)"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-white text-base font-medium mb-1.5">
            Certifications
          </h3>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className="">Name</TableHead>
                  <TableHead className="">Issuing</TableHead>
                  <TableHead className="">#Certificate</TableHead>
                  <TableHead className="">Issue Date</TableHead>
                  <TableHead className="">Expiration Date</TableHead>
                  <TableHead className="">URL Link</TableHead>
                  <TableHead className="w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profession?.certification_table?.map((field, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CusInput
                        placeholder="Name"
                        value={field?.name ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            certification_table: (
                              profession?.certification_table ?? []
                            ).map((link, i) =>
                              i === index ? { ...link, name: val } : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Issuing"
                        value={field?.organization ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            certification_table: (
                              profession?.certification_table ?? []
                            ).map((link, i) =>
                              i === index
                                ? { ...link, organization: val }
                                : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Certificate"
                        value={field?.certificate ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            certification_table: (
                              profession?.certification_table ?? []
                            ).map((link, i) =>
                              i === index ? { ...link, certificate: val } : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusDatePicker
                        value={
                          field.issued_date
                            ? new Date(field.issued_date)
                            : undefined
                        }
                        onChange={(date) => {
                          const dateString = date
                            ? format(date, "yyyy-MM-dd")
                            : "";
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            certification_table: (
                              profession?.certification_table ?? []
                            ).map((link, i) =>
                              i === index
                                ? { ...link, issued_date: dateString }
                                : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusDatePicker
                        value={
                          field.exp_date ? new Date(field.exp_date) : undefined
                        }
                        onChange={(date) => {
                          const dateString = date
                            ? format(date, "yyyy-MM-dd")
                            : "";
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            certification_table: (
                              profession?.certification_table ?? []
                            ).map((link, i) =>
                              i === index
                                ? { ...link, exp_date: dateString }
                                : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Link"
                        value={field?.url ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            certification_table: (
                              profession?.certification_table ?? []
                            ).map((link, i) =>
                              i === index ? { ...link, url: val } : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {(profession?.certification_table ?? []).length <= 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCertificationReset(index)}
                          className="text-gray-400"
                        >
                          <img
                            src="/assets/icons/candidate/eraser.svg"
                            className="w-5 h-5"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCertificationRemove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              type="button"
              onClick={() => handleCertificationAdd()}
              className="text-sm bg-(--salary-div) hover:bg-(--salary-div)"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-white text-base font-medium mb-3">Education</h3>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Institute</TableHead>
                  <TableHead>Graduation Year</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="w-20">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profession?.education_qualifications?.map((field, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CusInput
                        placeholder="Title"
                        value={field?.title ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            education_qualifications: (
                              profession?.education_qualifications ?? []
                            ).map((link, i) =>
                              i === index ? { ...link, title: val } : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Institution"
                        value={field?.institution ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            education_qualifications: (
                              profession?.education_qualifications ?? []
                            ).map((link, i) =>
                              i === index ? { ...link, institution: val } : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Graduation Year"
                        value={field?.graduation_year ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            education_qualifications: (
                              profession?.education_qualifications ?? []
                            ).map((link, i) =>
                              i === index
                                ? { ...link, graduation_year: val }
                                : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Specialization"
                        value={field?.specialization ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            education_qualifications: (
                              profession?.education_qualifications ?? []
                            ).map((link, i) =>
                              i === index
                                ? { ...link, specialization: val }
                                : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CusInput
                        placeholder="Score"
                        value={field?.score ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          onProfessionUpdate?.({
                            ...(profession ?? {}),
                            education_qualifications: (
                              profession?.education_qualifications ?? []
                            ).map((link, i) =>
                              i === index ? { ...link, score: val } : link
                            ),
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {(profession?.education_qualifications ?? []).length <=
                      1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEducationReset(index)}
                          className="text-gray-400"
                        >
                          <img
                            src="/assets/icons/candidate/eraser.svg"
                            className="w-5 h-5"
                          />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEducationRemove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              type="button"
              onClick={() => handleEducationAdd()}
              className="text-sm bg-(--salary-div) hover:bg-(--salary-div)"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
