import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Candidate } from "@/types/salay-negotations"

interface CandidateProfileProps {
  candidate: Candidate
}

export function CandidateProfile({ candidate }: CandidateProfileProps) {
  return (
    <div className="max-w-md mx-auto p-2 space-y-2 ">
      {/* Profile Section */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar className="w-16 h-16 ">
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback className="text-sm font-medium">
            {candidate.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        {/* Candidate Info */}
        <div className="flex-1 space-y-2 mt-4">
          <div>
            <h3 className="font-semibold text-sm text-(--action-text)">{candidate.profession}</h3>
            <p className="text-xs text-(--action-text) ">Shell</p>
          </div>
         
        </div>
      </div>

      <Separator className=" border-(--salary-div)" />

      {/* Project Info */}
      <div className="space-y-2">
        <h4 className="font-semibold text-(--action-text)">Project Info</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-(--action-text) mb-1 text-xs">Project Name</p>
            <p className="font-bold text-(--action-text) text-xs">{candidate.projectInfo.projectName}</p>
          </div>
          <div>
            <p className="text-(--action-text) mb-1">Location</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.location}</p>
          </div>
          <div>
            <p className="text-(--action-text) mb-1">Project Est. Start Date</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.startDate}</p>
          </div>
          <div>
            <p className="text-(--action-text) mb-1">Project Est. End Date</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.endDate}</p>
          </div>
          <div>
            <p className="text-(--action-text) mb-1">Minimum Contract Duration</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.contractDuration}</p>
          </div>
          <div>
            <p className="text-(--action-text) mb-1">Min. Mob/Demob Notice Period</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.noticePeriod}</p>
          </div>
          <div>
            <p className="text-(--action-text) mb-1">Rotation Cycle</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.rotationCycle}</p>
          </div>
          <div>
            <p className="text-(--action-text) mb-1">Working Hours/Day</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.workingHours}</p>
          </div>
          <div className="col-span-2">
            <p className="text-(--action-text) mb-1">Working Days/Week</p>
            <p className="font-bold text-(--action-text)">{candidate.projectInfo.workingDays}</p>
          </div>
        </div>
      </div>

     
    </div>
  )
}
