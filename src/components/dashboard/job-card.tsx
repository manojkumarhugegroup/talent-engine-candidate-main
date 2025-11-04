import { Eye, MessageCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/shared/CircularProgress";
import { Job } from "@/types/dasboard";

interface JobCardProps {
  job: Job;
  handleJobView: (jobid: string) => void;
}

export function JobCard({ job, handleJobView }: JobCardProps) {
  const matchScore = typeof job.MatchScore === "number" ? job.MatchScore : 0;

  if (!job) {
    return (
      <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
        <CardContent className="px-4 py-2">
          <div className="text-center text-white">Loading job...</div>
        </CardContent>
      </div>
    );
  }

  return (
    <Card className="bg-(--bg-candidate) border-(--bg-border) mx-2 py-4">
      <CardContent className="px-3">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 space-y-1">
            <h3 className="text-(--job-text) font-semibold text-sm ">
              {job.JobTitle}
            </h3>
            <p className="text-(--tab-profile-text) text-xs">{job.JobID}</p>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-(---tab-profile-text)" />
              <span className="text-(---tab-profile-text) text-xs">
                {job.Location}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-(--job-text) font-bold text-sm">
                {job.Salary}
              </span>
            </div>
            <p className="text-(--tab-profile-text) text-xs">{job.Status}</p>
          </div>
          <div className="flex flex-col items-center ml-4">
            <CircularProgress value={matchScore} size={38} strokeWidth={4} />
            <span className="text-(--match-text) text-xs mt-1">
              Match Score
            </span>
            {job.rotation && job.rotation !== "None" && (
              <Badge
                variant="secondary"
                className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs mt-1"
              >
                Rotation
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="bg-(--interview) hover:bg-(--interview) text-white flex-1 text-xs h-8 cursor-pointer rounded-sm">
            {`I'm Interested`}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleJobView(job.JobID)}
            className="border-(--interview) text-(--interview) hover:bg-transparent hover:text-(--interview) h-8 w-8 p-0 bg-transparent cursor-pointer rounded-sm"
          >
            <Eye className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-(--interview) text-(--interview) hover:bg-transparent hover:text-(--interview) h-8 w-8 p-0 bg-transparent cursor-pointer rounded-sm"
          >
            <MessageCircle className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
