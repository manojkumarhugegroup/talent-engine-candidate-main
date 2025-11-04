"use client";
import React from "react";
import { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { FileUploadArea } from "./file-upload-area";
import { ResumePreview } from "./Resume-preview";
import { LocationCombobox } from "@/components/forms/CustomLocation";
import { CusInput } from "../forms/CusInput";
import { CusSelect } from "../forms/CusSelect";
import { CusDobPicker } from "../forms/CusDob";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getCountryCallingCode, CountryCode } from "libphonenumber-js";
import { CusContactField } from "../forms/CusContactField";
import { useRouter } from "next/navigation";
import { currencies } from "@/data/currency";
import { format } from "date-fns";

const candidateSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  contact_no: z.string().min(10, "Please enter a valid contact number"),
  current_location: z.string().min(1, "Please select a location"),
  date_of_birth: z.string().nonempty("Please enter your date of birth"), // handles empty string and missing
  gender: z.string().min(1, "Please select your gender"),
  nationality: z.string().min(1, "Please select your nationality"),
  updated_resume: z.string().min(1, "Please upload your resume"),
});

// This matches the API response
type RawLocation = {
  id: string;
  name: string;
  code: string;
};

// This matches the component prop shape
type FormattedLocation = {
  label: string;
  value: string;
  code: string;
};

type CandidateFormData = z.infer<typeof candidateSchema>;

interface CandidateProfileFormProps {
  onBack: () => void;
}

export function CandidateProfileForm({ onBack }: CandidateProfileFormProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [locations, setLocations] = React.useState<RawLocation[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const router = useRouter();

  const [showPreview, setShowPreview] = useState(false);

  const getCandidateSchema = (countryCode: string | null) => {
    return z
      .object({
        full_name: z.string().min(2, "Full name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        contact_no: z.string().min(1, "Contact number is required"),
        current_location: z.string().min(1, "Please select a location"),
        date_of_birth: z.string().nonempty("Please enter your date of birth"),
        gender: z.string().min(1, "Please select your gender"),
        nationality: z.string().min(1, "Please select your nationality"),
        updated_resume: z.string().min(1, "Please upload your resume"),
      })
      .refine(
        (data) => {
          if (!countryCode) return true;
          console.log(countryCode, "countryCode");
          const phoneNumber = parsePhoneNumberFromString(
            data.contact_no,
            countryCode?.toUpperCase() as CountryCode
          );
          console.log(phoneNumber?.isValid(), "phoneNumber");
          return phoneNumber?.isValid() ?? false;
        },
        {
          message: "Invalid contact number for the selected country",
          path: ["contact_no"],
        }
      );
  };

  const [locationHasMore, setlocationHasMore] = useState(true);
  const [locationLoading, setlocationLoading] = useState(true);

  const requestedPages = React.useRef<Set<string>>(new Set());

  const fetchLocations = async (
    pageNum: number = 1,
    searchInput: string = ""
  ) => {
    try {
      const key_filter = `${pageNum}-${searchInput.trim().toLowerCase()}`;
      if (requestedPages.current.has(key_filter)) return;
      requestedPages.current.add(key_filter);

      setlocationLoading(true);
      const response = await fetch(
        `/api/masters/location?page=${pageNum}&name=${searchInput}`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const newLocations = data.message?.data || [];
      if (pageNum === 1) setLocations(newLocations);
      else setLocations((prev) => [...prev, ...newLocations]);
      const totalPages = data?.message?.total_pages || 1;
      setlocationHasMore(pageNum < totalPages);
      setlocationLoading(false);
    } catch {
      setLocations([]);
      setlocationHasMore(false);
    }
  };

  React.useEffect(() => {
    fetchLocations(1, "");
  }, []);

  const [locationPage, setlocationPage] = useState(1);

  const [searchInput, setsearchInput] = useState("");

  const handleSearchInput = (input: string) => {
    setsearchInput(input);
    setlocationPage(1);
    requestedPages.current.clear();
    fetchLocations(1, input);
  };

  const handleLoadLocationMore = () => {
    if (locationHasMore && !locationLoading) {
      const nextPage = locationPage + 1;
      setlocationPage(nextPage);
      fetchLocations(nextPage, searchInput);
    }
  };

  const formattedLocations: FormattedLocation[] = locations.map((loc) => ({
    label: loc.name,
    value: loc.name,
    code: loc.name,
  }));

  function getDialCodeByCountryCode(countryCode: string | null): string {
    if (!countryCode) return "";
    try {
      const parts = countryCode.split("--");
      const country = parts[1]?.trim();
      const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      const countryTCode =
        Object.entries(
          regionNames.of("US") ? { US: "United States" } : {}
        ).find(
          ([code, name]) => name.toLowerCase() === country.toLowerCase()
        )?.[0] || "US";
      const dialCode = getCountryCallingCode(
        countryTCode.toUpperCase() as CountryCode
      );
      return `+${dialCode}`;
    } catch {
      return "";
    }
  }

  const schema = React.useMemo(() => {
    return getCandidateSchema(selectedCountryCode);
  }, [selectedCountryCode]); // Add more dependencies if needed

  const methods = useForm<CandidateFormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      full_name: "",
      email: "",
      contact_no: "",
      current_location: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      updated_resume: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid },
    reset,
  } = methods;

  const handleFormReset = () => {
    reset({
      full_name: "",
      email: "",
      contact_no: "",
      current_location: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      updated_resume: "",
    });
    setUploadedFile(null);
    setUploadProgress(null);
    setShowPreview(false);
    setSelectedCountryCode(null);
  };

  const selectedLocation = watch("current_location");

  const uploadRef = React.useRef<XMLHttpRequest | null>(null);

  const handleFileUpload: (file: File) => Promise<void> = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("is_private", "0");
      formData.append("doctype", "File");
      formData.append("docname", "New");
      formData.append("file_name", file.name);

      const res = await fetch("/api/candidate/file_upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
      const result = await res.json();
      setUploadedFile(file);
      setShowPreview(true);
      setValue("updated_resume", result?.message?.file_url);
    } catch (err) {
      console.error("❌ API error:", err);
    } finally {
      console.error("❌ API error:");
    }
  };

  const handleCancelUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.abort();
    }
    setUploadProgress(null);
    setUploadedFile(null);
  };

  const onSubmit = async (data: CandidateFormData) => {
    const dialCode = getCountryCallingCode(
      selectedCountryCode?.toUpperCase() as CountryCode
    );
    const contact_no =
      data.contact_no.startsWith("+") || dialCode === ""
        ? data.contact_no
        : `+${dialCode}${data.contact_no}`;
    const gender =
      data.gender && data.gender.length > 0
        ? data.gender.charAt(0).toUpperCase() +
          data.gender.slice(1).toLowerCase()
        : "";
    const payload = { ...data, contact_no, gender };
    try {
      const endpoint = `/api/candidate/profile_create`;
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
    } catch (err) {
      console.error("❌ API error:", err);
    }
  };

  return (
    <div className="min-h-screen  bg-(--bg-profile) p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-(--create-text) hover:text-(--create-text) hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Create New Candidate Profile
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFormReset}
              className="border-(--interview) text-(--interview) hover:bg-transparent bg-transparent hover:text-(--interview)"
            >
              Reset
            </Button>
            <Button
              size="sm"
              className="bg-(--interview) hover:bg-(--interview"
              onClick={handleSubmit(onSubmit)}
            >
              Create Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* Form Section */}
          <div className="space-y-6   min-w-6xl ">
            <Card className="bg-(--bg-candidate) border-(--bg-border) p-2">
              <CardContent className="p-3 pt-2">
                <h3 className="text-(--create-text) font-semibold mb-6">
                  Personal Information
                </h3>
                <FormProvider {...methods}>
                  <form className="space-y-6">
                    {/* Row 1: Full Name, Email, Contact No. */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <CusInput
                          label="Full Name"
                          {...register("full_name")}
                          error={errors.full_name?.message}
                          required
                          placeholder="Your full name"
                          className="border-(--interview) bg-(--key-bg)"
                        />
                      </div>

                      <div>
                        <CusInput
                          label="Email"
                          type="email"
                          {...register("email")}
                          error={errors.email?.message}
                          required
                          placeholder="sarah@gmail.com"
                          className="border-(--interview) bg-(--key-bg)"
                        />
                      </div>

                      <div>
                        <Controller
                          name="current_location"
                          control={control}
                          rules={{ required: "Location is required" }}
                          render={({ field, fieldState }) => (
                            <LocationCombobox
                              locations={formattedLocations}
                              value={field.value}
                              onChange={field.onChange}
                              error={fieldState.error?.message}
                              onSelectLocation={({ id }) => {
                                field.onChange(id);
                                setValue("current_location", id);
                                const parts = id.split("--");
                                const country = parts[1]?.trim();
                                const regionNames = new Intl.DisplayNames(
                                  ["en"],
                                  { type: "region" }
                                );
                                const isoCountries = Object.fromEntries(
                                  Array.from({ length: 26 * 26 }, (_, i) => {
                                    const code =
                                      String.fromCharCode(
                                        65 + Math.floor(i / 26)
                                      ) + String.fromCharCode(65 + (i % 26));
                                    const name = regionNames.of(code);
                                    return name ? [code, name] : null;
                                  }).filter(Boolean) as [string, string][]
                                );
                                const found = Object.entries(isoCountries).find(
                                  ([_, name]) =>
                                    name.toLowerCase() ===
                                    country?.toLowerCase()
                                );
                                const countryTCode = found ? found[0] : "US";
                                setSelectedCountryCode(countryTCode);
                              }}
                              onLoadMore={handleLoadLocationMore}
                              hasMore={locationHasMore}
                              isLoading={locationLoading}
                              handleSearchInput={handleSearchInput}
                              searchInput={searchInput}
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* Row 2: Location, DOB, Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <CusContactField
                          label="Contact No."
                          {...register("contact_no")}
                          error={errors.contact_no?.message}
                          selectedCountryCode={selectedCountryCode}
                          selectedLocation={selectedLocation}
                          required
                          getDialCodeByCountryCode={getDialCodeByCountryCode}
                        />
                      </div>
                      <div>
                        <Controller
                          name="date_of_birth"
                          control={control}
                          rules={{ required: "Date of birth is required" }}
                          render={({ field }) => (
                            <CusDobPicker
                              label="DOB"
                              value={
                                field.value ? new Date(field.value) : undefined
                              }
                              onChange={(date) => {
                                const dateString = date
                                  ? format(date, "yyyy-MM-dd")
                                  : "";
                                field.onChange(dateString);
                              }}
                              required
                              error={errors.date_of_birth?.message}
                            />
                          )}
                        />
                      </div>
                      <div>
                        <Controller
                          name="gender"
                          control={control}
                          rules={{ required: "Gender is required" }}
                          render={({ field }) => (
                            <CusSelect
                              label="Gender"
                              value={field.value}
                              onValueChange={field.onChange}
                              error={errors.gender?.message}
                              placeholder="Select Gender"
                              className=" bg-(--key-bg)"
                              required
                            >
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="prefer-not-to-say">
                                Prefer not to say
                              </SelectItem>
                            </CusSelect>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Controller
                          name="nationality"
                          control={control}
                          rules={{ required: "Nationality is required" }}
                          render={({ field }) => (
                            <CusSelect
                              label="Nationality"
                              value={field.value}
                              onValueChange={field.onChange}
                              error={errors.nationality?.message}
                              placeholder="Select Nationality"
                              className=" bg-(--key-bg)"
                              required
                            >
                              {currencies.map((option) => (
                                <SelectItem
                                  key={option.code}
                                  value={option.country}
                                >
                                  {option.country}
                                </SelectItem>
                              ))}
                            </CusSelect>
                          )}
                        />
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </CardContent>
            </Card>
            {/* File Upload Section */}
            {showPreview && uploadedFile ? (
              <ResumePreview
                files={uploadedFile}
                show={showPreview}
                onDelete={() => {
                  setUploadedFile(null);
                  setUploadProgress(null);
                  setShowPreview(false);
                }}
              />
            ) : (
              <FileUploadArea
                onFileUpload={handleFileUpload}
                uploadProgress={uploadProgress}
                uploadedFileName={uploadedFile?.name}
                onCancelUpload={handleCancelUpload}
                error={errors.updated_resume?.message}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
