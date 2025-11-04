"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/forms/CusDialog"
import { Button } from "@/components/ui/button"
import { CusInput } from "../forms/CusInput"

type SetLatestVersionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  versionNumber: string
  onConfirm: () => void
}

export function SetLatestVersionDialog({ 
  open, 
  onOpenChange, 
  versionNumber, 
  onConfirm 
}: SetLatestVersionDialogProps) {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState("")

  const handleConfirm = () => {
    if (inputValue.toLowerCase() === "yes") {
      onConfirm()
      onOpenChange(false)
      setInputValue("")
      setError("")
    } else {
      setError("Please type 'YES' to confirm")
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    setInputValue("")
    setError("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (error) setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-(--bg-candidate) border border-(--bg-border) ">
        <DialogHeader>
          <DialogTitle>
    {/* <span className="sr-only">Confirm Version Change</span> */}
    <p className="text-white text-sm  font-normal">
            Changing the version will keep the current one as outdated.
           
          </p>
           <p className="text-sm mt-2 font-normal"> Type YES to confirm and continue.</p>  
          
  </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2 ">
         
       
          <div className="space-y-2">
           <CusInput
              type="text"
              placeholder="Type YES to confirm"
           
              value={inputValue}
              onChange={handleInputChange}
              error={error}
           
            />
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-(--interview) text-(--interview) hover:bg-transparent bg-transparent hover:text-(--interview) rounded-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!inputValue}
            className="bg-(--interview) text-white hover:bg-(--interview) px-8 rounded-sm"
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}