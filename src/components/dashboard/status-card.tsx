import { Eye, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ApplicationStatus } from "@/types/dasboard"

interface StatusCardProps {
  status: ApplicationStatus
}

export function StatusCard({ status }: StatusCardProps) {
  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case "Shortlisted":
        return "bg-transparent text-(--status-shortlist) border-(--status-shortlist)"
      case "Interview":
        return "bg-transparent text-(--status-interview) border-(--status-interview)"
      case "Sent Interest":
        return "bg-transparent text-(--status-interest) border-(--status-interest)"
      default:
        return "bg-transparent text-gray-300 border-gray-700"
    }
  }

  console.log(status,'statusstatus');
  

  return (
    <Card className="bg-(--bg-candidate) border-(--bg-border) py-4">
      <CardContent className="px-2">
        <div className="mb-1">
          <h3 className="text-white font-semibold text-sm">{status.job_title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-(--tab-profile-text) text-xs">{status.job_id}</p>
            <Badge className={`text-xs ${getStatusColor(status.status)}`}>{status.status}</Badge>
          </div>
          <p className="text-(--tab-profile-text) text-xs">
            {status.status === "Shortlisted"
              ? "Shortlisted on"
              : status.status === "Interview"
                ? "Interview on"
                : "Sent interest on"}{" "}
            {status.date}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="border-(--interview) text-(--interview) hover:bg-transparent w-1/2 p-0 bg-transparent cursor-pointer rounded-sm hover:text-(--interview)"
          >
            <Eye className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-(--interview) text-(--interview) hover:bg-transparent w-1/2 p-0 bg-transparent cursor-pointer rounded-sm hover:text-(--interview)"
          >
            <MessageCircle className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
