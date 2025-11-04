import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Actionable } from "@/types/dasboard"

interface ActionableCardProps {
  actionable: Actionable
  handleOpen: (action_type: string) => void;
}

export function ActionableCard({ actionable, handleOpen }: ActionableCardProps) {

  const getActionLabel = (type: number) => {
    switch (type) {
      case 1:
        return "Choose your slot"
      case 2:
        return "Salary Negotiation"
      case 3:
        return "Review Offer Letter"
      default:
        return "Take Action"
    }
  }

  return (
    <Card className="bg-(--bg-candidate) border-(--bg-border) py-4">
      <CardContent className="px-2">

        <div className="mb-2">
          <h3 className="text-(--action-text) font-semibold text-sm mb-1 capitalize">{actionable.job_title}</h3>
          <p className="text-(--tab-profile-text) text-xs mb-1.5">{actionable.job_id}</p>
          <div className="flex flex-wrap gap-1">
            {actionable.round_info &&
              <Badge className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs">Round {actionable.round_info}</Badge>
            }

           
            {actionable.slots &&
              <Badge className="bg-(--job-badge-bg) text-(--job-badge-text) text-xs">{actionable.slots} Slots</Badge>
            }
            {actionable.interview_type &&
              <Badge className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs capitalize">{actionable.interview_type}</Badge>
            }
            {actionable.interview_mode &&
              <Badge className="bg-(--job-badge-bg) text-(--job-badge-text)  text-xs capitalize">
                {actionable.interview_mode}
              </Badge>
            }
          </div>
        </div>

        <Button
          onClick={() => handleOpen(getActionLabel(actionable.action_type))}
          className="bg-(--interview) hover:bg-(--interview) text-white w-full text-xs h-8 cursor-pointer rounded-sm"
        >
          {getActionLabel(actionable.action_type)}
        </Button>


      </CardContent>
    </Card>
  )
}
