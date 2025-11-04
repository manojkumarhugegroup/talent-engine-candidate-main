import { Edit, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { ResumeDrawer } from "./resume/ResumeDrawer";
import { SetLatestVersionDialog } from "./setLatestVerionDialog";
import { useRouter } from "next/navigation";
import { SingleCandidateData } from "@/types/profile";
import { formatDate } from "@/lib/utils";

interface ProfessionCardProps {
  profession: SingleCandidateData;
  isLatest?: boolean;
  versionId?: string; // Changed from number to string
  onSetLatest?: (versionId: string) => void;
}

export function PersonalDetails({
  profession,
  isLatest,
  versionId,
  onSetLatest,
}: ProfessionCardProps) {
  const isDraft = profession.status === "Draft";

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  // pick PDF path based on version
  const pdfPath = `/resume/resume_v${versionId}.pdf`;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSetLatest = () => {
    setDialogOpen(true);
  };

  const handleConfirmSetLatest = () => {
    if (versionId && onSetLatest) {
      onSetLatest(versionId);
    }
  };

  const router = useRouter();
  const handleEdit = () => {
    router.push("/profile/edit-profile");
  };
  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="px-6 py-4">
        <div className="  mb-2 flex justify-between">
          <span className="text-white text-base font-medium">
            Personal Information
          </span>

          {isDraft ? (
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className=" text-(--delete) hover:text-(--delete) hover:bg-transparent"
              >
                {" "}
                <img
                  src="/assets/icons/candidate/delete-ion.svg"
                  className="w-4 h-4"
                />
                Delete this Draft
              </Button>

              <Button
                onClick={handleEdit}
                className="bg-(--interview) text-white"
              >
                {" "}
                <Edit /> Edit
              </Button>
            </div>
          ) : isLatest ? (
            <Badge className="bg-(--badge-color) rounded-full py-2.5 px-3 text-xs">
              Cloned from Version 2.2
            </Badge>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleOpen}
                className="border-(--interview) text-(--interview) bg-transparent hover:text-(--interview) hover:bg-transparent"
              >
                <Eye /> View Resume
              </Button>
              <Button
                onClick={handleSetLatest}
                className="bg-(--interview) text-white"
              >
                Set as Latest Version
              </Button>
            </div>
          )}
        </div>
        <div className="mb-6 flex gap-8">
          <Avatar className="w-32 h-32 flex-shrink-0">
            <AvatarImage
              src={profession.profile || "/assets/icons/placeholder.svg"}
            />
            <AvatarFallback className="text-2xl">
              {profession?.name || ""}
            </AvatarFallback>
          </Avatar>
          <div className="grid grid-col-3 gap-6">
            {/* First row: Name, Location, DOB, Gender */}
            <div className="flex items-center gap-16">
              <div>
                <h2 className="text-white text-2xl font-semibold">
                  {profession.name}
                </h2>
                <div className="flex items-center">
                  <img
                    src="/assets/icons/candidate/locations.svg"
                    className="w-3 h-3 mr-1 "
                    alt="location"
                  />
                  <span className="text-white text-xs">
                    {profession.current_location}
                  </span>
                </div>
              </div>
              <div className="text-xs">
                <p className="text-white mb-0.5">Date Of Birth</p>
                <span className="text-white font-bold">{profession.date_of_birth}</span>
              </div>
              <div className="text-xs">
                <p className="text-white mb-0.5">Gender</p>
                <span className="text-white font-bold">
                  {profession.gender}
                </span>
              </div>
            </div>
            {/* Second row: Email, Phone, Location, Nationality */}
            <div className="flex items-center gap-20">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/icons/candidate/ic_email.svg"
                    className="w-4 h-4  "
                    alt="persona-mail"
                  />
                  <span className="text-white text-xs lowercase">
                    {profession.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/icons/candidate/ion_call.svg"
                    className="w-4 h-4 "
                    alt="mobile"
                  />
                  <span className="text-white text-xs">{profession.contact_no}</span>
                </div>
              </div>
              <div className="text-xs">
                <p className="text-white mb-0.5">Location</p>
                <span className="text-white font-bold">
                  {profession.current_location}
                </span>
              </div>
              <div className="text-xs">
                <p className="text-white mb-0.5">Nationality</p>
                <span className="text-white font-bold">
                  {profession.nationality}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 ">
          <h3 className="text-white font-medium mb-3 text-base">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {profession?.key_skills?.map((keyword, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-(--key-bg) text-(--interview) capitalize"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
        <div className="  mb-2">
          <span className="text-white text-base font-medium">
            Professional Details
          </span>
        </div>
        <div className="bg-(--badge-color) p-3 rounded">
          <p className="text-base font-medium mb-1">
            {profession.current_salary_currency}
          </p>
          <p className="text-sm ">
            Current Salary/month : {profession.current_salary}
          </p>
        </div>
        <div className=" py-4">
          <span className="text-white text-md font-medium">Summary</span>
          <p className="text-xs mt-0.5 font-normal">{profession.professional_summary}</p>
        </div>
        {/* <div className="mb-2">
          <span className="text-white text-base font-medium">
            Proffered Job Location
          </span>
          <p className="text-xs mt-1 font-normal">{profession.location}</p>
        </div> */}
        <div className=" py-4 flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            External Profile Links
          </span>
          <div className="rounded-sm border border-(--badge-color) inline-block max-w-full">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className="w-2/3">Platform</TableHead>
                  <TableHead className="w-1/3">URL Link</TableHead>
                </TableRow>
              </TableHeader>
              {/* <TableBody className="bg-transparent">
                {profession.links.map((product, i) => (
                  <TableRow key={i} className="odd:bg-muted/50">
                    <TableCell className=" w-2/3">{product.name}</TableCell>
                    <TableCell className="w-1/3">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--link-text) hover:text-(--link-text) underline break-all"
                      >
                        {product.url}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </div>
        </div>
        <div className="mb-2  flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            Skills
          </span>
          <div className="rounded-sm border border-(--badge-color) inline-block max-w-full">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className=" w-1/3">Name</TableHead>
                  <TableHead className=" w-1/3">Experience (Months)</TableHead>
                  <TableHead className="">Reference (Link)</TableHead>
                </TableRow>
              </TableHeader>
              {/* <TableBody className="bg-transparent">
                {profession.skills.map((skill, i) => (
                  <TableRow key={i} className="odd:bg-muted/50">
                    <TableCell className="">{skill.name}</TableCell>
                    <TableCell className="">{skill.exp}</TableCell>
                    <TableCell className="">
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--link-text) hover:text-(--link-text) underline break-all"
                      >
                        {skill.url}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </div>
        </div>

        <div className=" py-2">
          <span className="text-white text-base font-medium">Projects</span>
        </div>
        {/* <div className="bg-(--badge-color) p-4 rounded mb-2">
          {profession.project?.map((project, i) => {
            const startDate = formatDate(project.start_date);
            const endDate = formatDate(project.end_date);

            return (
              <div key={i} className="flex flex-col gap-1 pb-2 mb-2 border-b">
                <p className="text-md font-medium">{project.project_name}</p>
                <p className="text-xs">
                  {startDate} {endDate ? `- ${endDate}` : ""}
                </p>
                <p className="text-xs">
                  <span className="font-bold">Description:</span>{" "}
                  {project.description}
                </p>
                <p className="text-xs mt-1 font-bold">
                  Roles & Responsibilities
                </p>
                <ul className="text-xs ml-4 space-y-1">
                  {project.roles?.map((role, roleIndex) => (
                    <li key={roleIndex} className="list-disc capitalize">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div> */}

        <div className="mb-2 py-2 flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            Certifications
          </span>
          <div className="rounded-sm border border-(--badge-color) inline-block max-w-full">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className="">Title</TableHead>
                  <TableHead className="">Issuing</TableHead>
                  <TableHead className="">#Certificate</TableHead>
                  <TableHead className="">Issue - Expiration Date</TableHead>
                  <TableHead className="">URL Link</TableHead>
                </TableRow>
              </TableHeader>
              {/* <TableBody className="bg-transparent">
                {profession.certification.map((certi, i) => {
                  const issuedDate = formatDate(certi.issued_date);
                  const expDate = formatDate(certi.exp_date);
                  return (
                    <TableRow key={i} className="odd:bg-muted/50">
                      <TableCell
                        className="max-w-[300px] truncate cursor-default capitalize"
                        title={certi.title}
                      >
                        {certi.title}
                      </TableCell>
                      <TableCell className=" ">{certi.organization}</TableCell>
                      <TableCell className=" ">{certi.cert_no}</TableCell>
                      <TableCell>
                        {issuedDate} - {expDate}
                      </TableCell>
                      <TableCell className="cursor-pointer">
                        <a
                          href={certi.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-(--link-text) hover:text-(--link-text) underline break-all"
                        >
                          {certi.url}
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody> */}
            </Table>
          </div>
        </div>
        <div className="mb-2 py-2 flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            Education
          </span>
          <div className="rounded-sm border border-(--badge-color) inline-block max-w-full">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className="">Title</TableHead>
                  <TableHead className="">Institution</TableHead>
                  <TableHead className="">Graduation Year</TableHead>
                  <TableHead className="">Specialization</TableHead>
                  <TableHead className="">Score</TableHead>
                </TableRow>
              </TableHeader>
              {/* <TableBody className="bg-transparent">
                {profession.education.map((education, i) => (
                  <TableRow key={i} className="odd:bg-muted/50">
                    <TableCell
                      className="max-w-[300px] truncate cursor-default"
                      title={education.title}
                    >
                      {education.title}
                    </TableCell>
                    <TableCell className=" ">{education.institute}</TableCell>
                    <TableCell className=" ">
                      {education.graduated_year}
                    </TableCell>
                    <TableCell className=" ">{education.dept}</TableCell>
                    <TableCell className=" ">{education.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </div>
        </div>
      </CardContent>

      <ResumeDrawer
        open={open}
        onOpenChange={() => setOpen(false)}
        pdfPath={pdfPath}
        versionId={versionId ?? ""}
      />

      <SetLatestVersionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        versionNumber={versionId ?? ""}
        onConfirm={handleConfirmSetLatest}
      />
    </div>
  );
}
