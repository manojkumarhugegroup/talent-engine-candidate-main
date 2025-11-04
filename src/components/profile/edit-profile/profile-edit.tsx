import React from "react";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SingleCandidateData } from "@/types/profile";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CusDobPicker } from "@/components/forms/CusDob";
import { CusSelect } from "@/components/forms/CusSelect";
import { SelectItem } from "@/components/ui/select";
import { LocationCombobox } from "@/components/forms/CustomLocation";
import { format } from "date-fns";

interface ProfileCardProps {
  profile: SingleCandidateData;
  onProfileUpdate?: (updatedProfile: SingleCandidateData) => void;
}

interface ProfileFormData {
  name?: string;
  full_name?: string;
  current_location?: string;
  gender?: string;
  date_of_birth?: string;
  contact_no?: string;
  email?: string;
  profile_image?: string;
}

type FormattedLocation = {
  label: string;
  value: string;
  code: string;
};

type GenderType = "Male" | "Female" | "Other";

type RawLocation = {
  id: string;
  name: string;
  code: string;
};

export function ProfileEditSection({
  profile,
  onProfileUpdate,
}: ProfileCardProps) {
  const [locations, setLocations] = React.useState<RawLocation[]>([]);

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

  function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  useEffect(() => {
    fetchLocations(1, "");
  }, []);

  const formattedLocations: FormattedLocation[] = locations.map((loc) => ({
    label: loc.name,
    value: loc.name,
    code: loc.name,
  }));

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

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  const methods = useForm<ProfileFormData>({
    defaultValues: {
      name: profile.name || "",
      full_name: profile.full_name || "",
      email: profile.email || "",
      contact_no: profile.contact_no || "",
      date_of_birth: profile.date_of_birth || "",
      gender: profile.gender ? capitalize(profile.gender) : "",
      current_location: profile.current_location || "",
      profile_image: profile.profile_image || "",
    },
  });

  const {
    control,
    formState: { errors },
  } = methods;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
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
        onProfileUpdate?.({ ...profile, profile_image: result?.message?.file_url });
      } catch (err) {
        console.error("❌ API error:", err);
      } finally {
        console.error("❌ API error:");
      }
    }
  };

  if (!profile) {
    return (
      <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
        <CardContent className="px-4 py-2">
          <div className="text-center text-white">Loading profile...</div>
        </CardContent>
      </div>
    );
  }

  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-base font-medium">
            Personal Information
          </span>
        </div>

        <div className="text-center mb-2">
          <div className="relative w-32 h-32 mx-auto mb-5">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={
                  profile.profile_image || "/assets/icons/placeholder.svg"
                }
              />
              <AvatarFallback className="text-2xl">
                {profile.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-2 bg-white rounded-full p-2 cursor-pointer "
            >
              <img
                src="/assets/icons/candidate/edit-ion.svg"
                className="w-3 h-3 "
              />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <h2 className="text-card text-xl font-semibold mb-1">
            {profile.name}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-white mb-1">
              Enter full name
            </label>
            <div className="bg-gray-700 text-white text-sm rounded-md px-3 py-2">
              {profile.full_name}
            </div>
          </div>
          <div className="col-span-2">
            <Controller
              name="date_of_birth"
              control={control}
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <CusDobPicker
                  label="DOB"
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    const dateString = date ? format(date, "yyyy-MM-dd") : "";
                    field.onChange(dateString);
                    onProfileUpdate?.({
                      ...profile,
                      date_of_birth: dateString,
                    });
                  }}
                  required
                  error={errors.date_of_birth?.message}
                />
              )}
            />
          </div>

          <div className="col-span-2">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <CusSelect
                  label="Gender"
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    onProfileUpdate?.({
                      ...profile,
                      gender: val as GenderType,
                    });
                  }}
                  error={errors.gender?.message}
                >
                  {genderOptions.map((item, i) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </CusSelect>
              )}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-white mb-1">
              Email
            </label>
            <div className="bg-gray-700 text-white text-sm rounded-md px-3 py-2">
              {profile.email}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-white mb-1">
              Contact
            </label>
            <div className="bg-gray-700 text-white text-sm rounded-md px-3 py-2">
              {profile.contact_no}
            </div>
          </div>
          <div className="col-span-2">
            <Controller
              name="current_location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <LocationCombobox
                  locations={formattedLocations}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.current_location?.message}
                  onSelectLocation={({ id }) => {
                    field.onChange(id);
                    onProfileUpdate?.({ ...profile, current_location: id });
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
      </CardContent>
    </div>
  );
}
