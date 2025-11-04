"use client";

import type * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/forms/CustomCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Custom-components/CusTable";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/forms/CustomSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  InterviewFormData,
  InterviewMode,
  InterviewSlot,
  InterviewType,
} from "@/types/interview";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface InterviewData {
  job_title: string;
  round: number | string;
  interview_type: string;
  interview_mode: string;
  available_slots: {
    id: string;
    name: string;
    slot_date: string;
    slot_time: string;
  }[];
}

type InterviewDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interviewID: string;
  profileData?: {
    id: string;
    name: string;
    position: string;
    image?: string;
  };
  interviewSlots?: InterviewSlot[];
};

export function InterviewDrawer({
  open,
  onOpenChange,
  interviewID
}: InterviewDrawerProps) {
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const canSubmit = useMemo(() => {
    return !!selectedSlot;
  }, [selectedSlot]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  function resetForm() {
    setSelectedSlot("");
  }

  async function onSubmit() {
    try {
      setSubmitting(true);
      const payload = {
        interview_name: interviewID,
        slot_name: selectedSlot,
      };
      const endpoint = `/api/candidate/slot_accept`;
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Failed: ${res.status} ${res.statusText}`);
      }
      const responseData = await res.json();
      console.log(responseData,'responseData');
      
      if (responseData?.message?.status === "success") {
        toast.success(responseData?.message?.message || "Slot Accepted ✅");
        toggleDrawer();
      } else {
        toast.error("Interview slot accepted failed ❌");
      }
      setSubmitting(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  }

  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);

  const fetchInterviewSlot = async () => {
    try {
      const url = `/api/candidate/slot_get?interview_id=${interviewID}`;

      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInterviewData(data?.message?.data);
    } catch {
      setInterviewData(null);
    }
  };

  useEffect(() => {
    if (interviewID === "") return;
    fetchInterviewSlot();
  }, [interviewID]);

  const toggleDrawer = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Sheet open={open}>
      <SheetContent
        side="right"
        className={
          "w-full max-w-none min-w-[600px] md:min-w-[580px] p-0 gap-0 bg-(--bg-profile) flex flex-col h-full"
        }
      >
        {/* Header */}
        <SheetHeader className="p-2 border-b pb-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex">
              <SheetTitle className="text-lg text-(--action-text)">
                Interview Details
              </SheetTitle>
            </div>
            <Button
              className="px-8 rounded-sm"
              onClick={onSubmit}
              disabled={!canSubmit || submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </SheetHeader>

        {/* Profile row */}
        <div className="px-5 pt-2.5 pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage alt="John" src="/assets/icons/placeholder.svg" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="text-md font-semibold leading-none text-(--interview-text)">
                {interviewData?.job_title}
              </p>
              <p className="mt-1 text-sm text-[#4B5563]">Shell</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 flex flex-col px-4 min-h-0">
          <Card className="rounded-lg bg-(--bg-candidate) border-(--interview-border)">
            <CardHeader className="px-3 py-1">
              <div className="flex gap-4">
                <CardTitle className="text-base font-semibold text-(--interview-text)">
                  Round {interviewData?.round}
                </CardTitle>
                <Badge className="bg-(--interview-badge-bg) text-(--interview-badge-text) rounded-full">
                  {interviewData?.interview_type}
                </Badge>
                <Badge className="bg-(--interview-badge-bg) text-(--interview-badge-text) rounded-full">
                  <img
                    src="/assets/icons/candidate/tabler_video.svg"
                    alt="video"
                  />
                  {interviewData?.interview_mode}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-3 pt-0 pb-5 space-y-1">
              {/* Slot Details */}
              <div className="space-y-1.5">
                <div className="overflow-hidden rounded-md border flex-1 flex flex-col min-h-0">
                  <div
                    className="overflow-y-auto flex-1 min-h-0"
                    style={{ maxHeight: 260 }}
                  >
                    <RadioGroup
                      value={selectedSlot}
                      onValueChange={setSelectedSlot}
                    >
                      <Table>
                        <TableHeader className="bg-(--bg-profile)">
                          <TableRow className="">
                            <TableHead className="w-[80px] text-(--action-text)">
                              Select
                            </TableHead>
                            <TableHead className="w-[100px] text-(--action-text)">
                              #Slot
                            </TableHead>
                            <TableHead className="text-(--action-text)">
                              Interview Date<span className=""> *</span>
                            </TableHead>
                            <TableHead className="text-(--action-text)">
                              Interview Time<span className=""> *</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {interviewData?.available_slots?.map((slot , index) => (
                            <TableRow key={slot.id}>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value={slot.name}
                                    id={slot.name}
                                    className="text-(--interview) cursor-pointer data-[state=checked]:border-(--interview) "
                                  />
                                  <Label htmlFor={slot.name} className="sr-only">
                                    Select slot {index + 1}
                                  </Label>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium text-(--action-text)">
                                Slot {index + 1}
                              </TableCell>
                              <TableCell className="text-(--action-text)">
                                {formatDate(slot.slot_date)}
                              </TableCell>
                              <TableCell className="text-(--action-text)">
                                {formatTime(slot.slot_time)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Footer */}
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
