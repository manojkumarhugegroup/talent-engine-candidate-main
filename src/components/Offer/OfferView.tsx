import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/forms/CustomAccordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Candidate } from "@/types/offer"
import { CircleCheckBig } from "lucide-react"

interface candidateProfileProps {
     candidate: Candidate
}

export function OfferView({ candidate }: candidateProfileProps) {
    const sym = candidate.compensation.currencySymbol
    return (
        <div className=" p-3 space-y-2.5">
            {/* Profile Section */}
            <div className="flex items-start gap-6 px-4">
                {/* Avatar */}
                <Avatar className="md:w-24 md:h-24 ">
                    <AvatarImage src={candidate.avatar || "/assets/icons/placeholder.svg"} alt={candidate.name} />
                    <AvatarFallback className="text-lg font-medium">
                        {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>

                {/* candidate Info */}


                <div className="flex flex-row md:gap-12 gap-2 text-xs mt-8">
                    <div className="flex flex-col gap-2 ">
                        <div>
                            <p className="text-(--action-text) mb-1 text-sm font-bold"> {candidate.name}</p>
                            <p className=" text-(--action-text) text-xs">{candidate.profession}</p>
                        </div>
                       </div>

                  



                </div>
            </div>

         <Separator className=" border-(--salary-div)" />

            {/* Project Info */}
            <div className="space-y-2 px-2">
                <h4 className="font-semibold text-(--action-text) text-sm">Project Info</h4>
                <div className="grid grid-cols-4 gap-3 text-xs">
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
                        <p className="font-bold text-(--action-text)">{candidate.projectInfo.rotation_cycle}</p>
                    </div>
                    <div>
                        <p className="text-(--action-text) mb-1">Working Hours/Day</p>
                        <p className="font-bold text-(--action-text)">{candidate.projectInfo.working_hours}</p>
                    </div>
                    <div>
                        <p className="text-(--action-text) mb-1">Working Days/Week</p>
                        <p className="font-bold text-(--action-text)">{candidate.projectInfo.working_days}</p>
                    </div>

                </div>
            </div>

            <Separator className=" border-(--salary-div)" />

          <div className="bg-(--badge-color) p-4 rounded-sm">
            <div className="flex justify-between mb-1">
             <p className="text-sm text-(--action-text)">Base Salary</p>
           <p className="text-md font-semibold text-(--action-text) ">{candidate.compensation.totalSalary}</p>
             </div>
            <div className="flex justify-between">
             <p className="text-xs text-(--action-text)">Proposed Joining Date</p>
           <p className="text-xs  text-(--action-text)">{candidate.compensation.proposedDate}</p>
             </div>
          </div>



            

            <Accordion type="single" collapsible defaultValue="terms" className="border-none">
                <AccordionItem value="terms" className="border-none">
                    <AccordionTrigger className="text-base font-semibold hover:no-underline  py-1">
                        Terms
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                        <div className="grid grid-cols-2 gap-6 relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-(--tab-border) transform -translate-x-1/2"></div>

                            {/* By Client Column */}
                            <div>
                                <h5 className="font-medium text-xs text-(--action-text) mb-1">By Client</h5>
                                <div className="space-y-1">
                                    {candidate.terms.byClient.map((term, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <CircleCheckBig className="h-3 w-3 text-(--onboarded) mt-1 flex-shrink-0" />
                                            <span className="text-xs leading-relaxed  text-(--action-text)">
                                                {term}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* By Candidate Column */}
                            <div className="">
                                <h5 className="font-medium text-xs text-(--action-text) mb-1">By Candidate</h5>
                                <div className="space-y-1">
                                    {candidate.terms.byCandidate.map((term, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <CircleCheckBig className="h-3 w-3 text-(--all-candidate) mt-1 flex-shrink-0" />
                                            <span className="text-xs leading-relaxed text-(--action-text)">
                                                {term}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                               
                                {/* By Talent Engine */}
                                <div className="mt-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-medium text-(--action-text)">By Talent Engine</span>
                                    </div>
                                    <div className="space-y-1">
                                        {candidate.terms.talentEngine.map((item, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <CircleCheckBig className="h-3 w-3 text-(--onboarded) mt-1 flex-shrink-0" />
                                                <span className="text-xs leading-relaxed  text-(--action-text)">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>  {/* Not Applicable */}
                                <div className="mt-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-(--action-text)">Not Applicable</span>
                                    </div>
                                    <div className="space-y-1">
                                        {candidate.terms.notApplicable.map((item, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <CircleCheckBig className="h-3 w-3 text-(--onboarded) mt-1 flex-shrink-0" />
                                                <span className="text-xs leading-relaxed  text-(--action-text)">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
