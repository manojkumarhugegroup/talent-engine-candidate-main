import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { InterviewData } from "@/types/dasboard"
import { Calendar, Clock } from "lucide-react"

interface InterviewCardProps {
  interview: InterviewData
}

export function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <Card className="bg-(--bg-candidate) border-(--bg-border) py-4">
      <CardContent className="px-2">
        <div className="">
          <h3 className="text-white font-semibold text-sm mb-0.5">{interview.job_title}</h3>
          <p className="text-(--tab-profile-text) text-xs mb-1.5">{interview.job_id}</p>
          <div className="flex flex-wrap gap-1">
            <Badge className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs">Round {interview.round}</Badge>
            <Badge className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs"><Calendar className="w-3 h-3" />{interview.date}</Badge>
            <Badge className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs"><Clock className="w-3 h-3" />{interview.time} {interview.time_zone}</Badge>
            <Badge className="bg-(--job-badge-bg) text-(--job-badge-text) text-xs capitalize">{interview.interview_type}</Badge>
            <Badge className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs capitalize">
              {interview.interview_mode}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
