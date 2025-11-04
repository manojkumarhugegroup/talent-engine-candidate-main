import { Copy, Download, Eye, Mail, Map, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/types/profile";
import { VersionItem } from "@/types/profile-history";

interface ProfileCardProps {
  versions: VersionItem[];
  activeVersionId?: string; // Changed from number to string
  onSelectVersion?: (versionId: string) => void; // Changed parameter name and type
  latestVersionId?: string | null; // Changed from number to string
}

export function VersionCard({
  versions,
  activeVersionId,
  onSelectVersion,
  latestVersionId,
}: ProfileCardProps) {
  const latestVersion = versions.find((v) => v.is_latest) || versions[0];
  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="p-0">
        {versions.map((ver, i) => {
          const isActive = activeVersionId === ver.id;
          const isLatest = ver.is_latest || ver.id === latestVersionId;
          const isDraft = ver.status?.toLowerCase().includes("draft");

          return (
            <div
              key={i}
              className={`flex flex-col gap-1.5 mb-0.5 border-b p-2 pb-4 border-(--ver-border) last:border-0 cursor-pointer transition-colors ${
                isActive ? "bg-(--key-bg) " : ""
              }`}
              onClick={() => onSelectVersion?.(ver.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-(--badge) text-md font-bold">
                    Version{" "}
                    {typeof ver?.version === "number"
                      ? ver.version.toFixed(1)
                      : "N/A"}
                  </p>
                  {isLatest && (
                    <Badge className="bg-(--version-bg) hover:bg-(--version-bg) text-(--interview) text-xs px-2 py-0.25 rounded-full">
                      Latest
                    </Badge>
                  )}

                  {isDraft && (
                    <Badge className="bg-yellow-500 text-white text-xs px-2 py-0.25 rounded-full">
                      Draft
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-(--badge) ">
                <p>
                  Created by{" "}
                  <span className="font-bold capitalize">{ver.created_by}</span>
                </p>
                <p className="text-(--badge) font-normal ">
                  {ver.created_on} | {ver.created_time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </div>
  );
}
