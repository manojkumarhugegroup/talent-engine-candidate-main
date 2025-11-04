import { Card, CardContent } from "@/components/ui/card";
import { Profession, Profile, SingleCandidateData } from "@/types/profile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate } from "@/lib/utils";
import Loading from "@/app/Loading";

interface ProfessionCardProps {
  profession: SingleCandidateData;
}

export function ProfessionalSection({ profession }: ProfessionCardProps) {
  if (!profession) {
    return (
      <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl h-full flex justify-center items-center">
        <CardContent className="px-4 py-2">
          <Loading />
        </CardContent>
      </div>
    );
  }

  return (
    <div className="bg-(--bg-candidate) border border-(--bg-border) rounded-md shadow-xl">
      <CardContent className="px-4 py-4 space-y-3">
        <div className="">
          <span className="text-white text-base font-medium">
            Professional Details
          </span>
        </div>
        <div className="bg-(--badge-color) p-2 px-3 rounded">
          <p className="text-base font-medium mb-1">
            {profession.professional_title}
          </p>
          <p className="text-sm ">
            Current Salary/month : {profession.current_salary}
          </p>
        </div>
        <div className="">
          <span className="text-white text-md font-medium mb-1.5">Summary</span>
          <p className="text-xs font-normal">
            {profession.professional_summary}
          </p>
        </div>
        <div className="">
          <span className="text-white text-base font-medium mb-1.5">
            Proffered Job Location
          </span>
          <p className="text-xs mt-1 font-normal">{profession.nationality}</p>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            External Profile Links
          </span>
          <div className="rounded border border-(--badge-color) inline-block max-w-full">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className="w-2/3">Platform</TableHead>

                  <TableHead className="w-1/3">URL Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-transparent">
                {profession.external_profile_links?.map((product, i) => (
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
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            Skills
          </span>
          <div className="rounded border border-(--badge-color) inline-block max-w-full">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className=" w-1/3">Name</TableHead>
                  <TableHead className=" w-1/3">Experience (Months)</TableHead>

                  <TableHead className="">Reference (Link)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-transparent">
                {profession.skills_table?.map((skill, i) => (
                  <TableRow key={i} className="odd:bg-muted/50">
                    <TableCell className="">{skill.key_skills}</TableCell>
                    <TableCell className="">{skill.experience}</TableCell>
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
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="">
          <span className="text-white text-base font-medium">Projects</span>
          <div className="bg-(--badge-color) p-3 mt-1.5 rounded space-y-3">
            {profession.projects_table?.map((project, i) => {
              const startDate = project?.start_date || "";
              const endDate = project?.end_date || "";

              return (
                <div key={i} className="flex flex-col gap-1 pb-2 mb-2 border-b">
                  <p className="text-md font-medium">{project.title}</p>
                  <p className="text-xs">
                    {startDate} {endDate ? `- ${endDate}` : ""}
                  </p>
                  <p className="text-xs">
                    <span className="font-bold">Description:</span>{" "}
                    {project.description}
                  </p>
                  <p className="text-xs">
                    <span className="font-bold">Roles & Responsibilities:</span>{" "}
                    {project.roles_responsibilities}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            Certifications
          </span>
          <div className="rounded border border-(--badge-color) inline-block max-w-full">
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
              <TableBody className="bg-transparent ">
                {profession.certification_table?.map((certi, i) => {
                  const issuedDate = certi.issued_date || "";
                  const expDate = certi.exp_date || "";

                  return (
                    <TableRow key={i} className="odd:bg-muted/50">
                      <TableCell
                        className="max-w-[300px] truncate cursor-default"
                        title={certi.name}
                      >
                        {certi.name}
                      </TableCell>
                      <TableCell>{certi.organization}</TableCell>
                      <TableCell>{certi.certificate}</TableCell>
                      <TableCell>
                        {issuedDate} - {expDate}
                      </TableCell>
                      <TableCell>
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
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mb-2 py-2 flex flex-col">
          <span className="text-white text-base font-medium mb-1.5">
            Education
          </span>
          <div className="rounded border border-(--badge-color) inline-block max-w-full">
            <Table>
              <TableHeader className="bg-(--badge-color)">
                <TableRow>
                  <TableHead className="">Title</TableHead>
                  <TableHead className="">Institution</TableHead>
                  <TableHead className="">Graduation Year</TableHead>
                  <TableHead className="">Specialization</TableHead>
                  <TableHead className="">Score</TableHead>fff
                </TableRow>
              </TableHeader>
              <TableBody className="bg-transparent">
                {profession.education_qualifications?.map((education, i) => (
                  <TableRow key={i} className="odd:bg-muted/50">
                    <TableCell
                      className="max-w-[300px] truncate cursor-default"
                      title={education.title}
                    >
                      {education.title}
                    </TableCell>
                    <TableCell className=" ">{education.institution}</TableCell>
                    <TableCell className=" ">
                      {education.graduation_year}
                    </TableCell>
                    <TableCell className=" ">
                      {education.specialization}
                    </TableCell>
                    <TableCell className=" ">{education.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
