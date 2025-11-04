"use client"

import { FC } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CreateButtonType } from "@/types/shared.types"
import { useRouter } from "next/navigation"



export const CreateButton: FC<CreateButtonType> = ({
  label,
  createPrivilege = false,
  path,
}) => {
  const router = useRouter()
  const onPlusClick = () => {
    if (path) {
      router.push(path)
    }
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <Label className="text-2xl font-bold text-[#212529]">{label}</Label>
      {createPrivilege && (
        <Button
  variant="outline"
  size="icon"
  onClick={onPlusClick}
  className="rounded-full bg-primary text-[#fafafa] cursor-pointer hover:bg-primary/95 hover:text-white"
>
  <Plus size={32} />
</Button>


      )}
    </div>
  )
}
