import { Download } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SingleCandidateData } from "@/types/profile";
import { MaskedText } from "../forms/CusMaskedText";
import CopyButton from "../buttons/CopyButton";
import Loading from "@/app/Loading";

interface ProfileCardProps {
  profile: SingleCandidateData;
}

export function ProfileSection({ profile }: ProfileCardProps) {
  if (!profile) {
    return (
      <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl min-h-full">
        <CardContent className="px-4 py-2">
          <Loading />
        </CardContent>
      </div>
    );
  }

  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-card text-base font-medium">
            Personal Information
          </span>
        </div>

        <div className="text-center mb-2">
          <Avatar className="w-32 h-32 mx-auto mb-2">
            <AvatarImage
              src={profile.profile_image?.file_url || "/assets/icons/placeholder.svg"}
            />
            <AvatarFallback className="text-2xl">
              {profile.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-card text-xl font-semibold mb-1">
            {profile.name}
          </h2>
          <div className="flex justify-center">
            <img
              src="/assets/icons/candidate/locations.svg"
              className="w-4 h-4 mr-1 mt-0.5"
              alt="map"
            />{" "}
            <p className="text-card text-sm">{profile.current_location}</p>
          </div>
        </div>

        <div className="w-full flex justify-center gap-2 mb-6">
          <Download className="w-4 h-4 text-(--interview) mt-0.5" />
          <span className="text-(--interview) text-sm cursor-pointer hover:underline">
            Resume
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/candidate/ic_email.svg"
              className="w-4 h-4"
              alt="email"
            />
            <div className="flex-1">
              <MaskedText
                text={profile?.email}
                className="text-card text-xs lowercase"
                iconClassName="w-4 h-4 text-card cursor-pointer hover:opacity-70 "
                visibleChars={3}
                beforeIcon={
                  <CopyButton
                    content={profile?.email || ""}
                    icon={"/assets/icons/candidate/profile_copy.svg"}
                  />
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/candidate/ion_call.svg"
              className="w-4 h-4"
              alt="phone"
            />
            <div className="flex-1">
              <MaskedText
                text={profile?.contact_no}
                className="text-card text-xs"
                iconClassName="w-4 h-4 text-card cursor-pointer hover:opacity-70"
                visibleChars={3}
                beforeIcon={
                  <CopyButton
                    content={profile?.contact_no || ""}
                    icon={"/assets/icons/candidate/profile_copy.svg"}
                  />
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-card text-xs w-1/3">Date Of Birth</p>
            <div className="flex  justify-end gap-2">
              <MaskedText
                text={profile.date_of_birth || ""}
                className="text-card text-xs"
                iconClassName="w-4 h-4 text-card cursor-pointer hover:opacity-70"
                visibleChars={2}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-card text-xs">Gender</p>
            <span className="text-card text-xs capitalize">
              {profile.gender}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-card text-xs w-1/3">Location</p>
            <div className="flex  justify-end gap-2">
              <MaskedText
                text={profile.current_location}
                className="text-card text-xs"
                iconClassName="w-4 h-4 text-card cursor-pointer hover:opacity-70"
                visibleChars={2}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-card text-xs">Nationality</p>
            <div className="flex  justify-end gap-2">
              <MaskedText
                text={profile.nationality || ""}
                className="text-card text-xs"
                iconClassName="w-4 h-4 text-card cursor-pointer hover:opacity-70"
                visibleChars={2}
              />
            </div>
          </div>
        </div>
        <Separator className="bg-gray-700 mb-3" />
        <div>
          <h3 className="text-card font-medium mb-3">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {profile?.key_skills?.map((keyword, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-(--key-bg) text-(--interview) capitalize"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  );
}
