"use client";

import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const ProfileSkeleton = () => {
  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="px-4 py-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-card text-base font-medium">
            Personal Information
          </span>
        </div>

        {/* Avatar + Name + Location */}
        <div className="text-center mb-2">
          <Avatar className="w-32 h-32 mx-auto mb-2">
            <Skeleton className="w-full h-full rounded-full" />
            {/* <AvatarFallback>U</AvatarFallback> */}
          </Avatar>
          <Skeleton className="h-5 w-32 mx-auto mb-1" />
          <div className="flex justify-center items-center gap-1">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Resume */}
        <div className="w-full flex justify-center gap-2 mb-6">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Info list */}
        <div className="space-y-3 mb-6">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" /> {/* icon */}
            <p className="text-card text-xs w-1/3">Email</p>
            <Skeleton className="h-3 w-40" />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" />
            <p className="text-card text-xs w-1/3">Phone</p>
            <Skeleton className="h-3 w-32" />
          </div>

          {/* DOB */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-card text-xs w-1/3">Date Of Birth</p>
            <Skeleton className="h-3 w-16" />
          </div>

          {/* Gender */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-card text-xs w-1/3">Gender</p>
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" />
            <p className="text-card text-xs w-1/3">Location</p>
            <Skeleton className="h-3 w-28" />
          </div>

          {/* Nationality */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-card text-xs w-1/3">Nationality</p>
            <Skeleton className="h-3 w-28" />
          </div>

          {/* Passport */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-card text-xs w-1/3">Passport No</p>
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        <Separator className="bg-gray-700 mb-3" />

        {/* Keywords */}
        <div>
          <h3 className="text-card font-medium mb-3">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-(--key-bg) text-(--interview)"
              >
                <Skeleton className="h-3 w-12" />
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  );
};
