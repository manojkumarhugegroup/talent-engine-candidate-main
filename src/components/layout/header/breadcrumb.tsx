// import Link from "next/link"

// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"

// export function BreadcrumbCSeparator() {
//     return (
//         <Breadcrumb>
//             <BreadcrumbList>
//                 <BreadcrumbItem>
//                     <BreadcrumbLink asChild>
//                         <Link href="/">Home</Link>
//                     </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                     <BreadcrumbLink asChild>
//                         <Link href="/components">Components</Link>
//                     </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                     <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
//                 </BreadcrumbItem>
//             </BreadcrumbList>
//         </Breadcrumb>
//     )
// }
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbCSeparator() {
    const pathname = usePathname(); // e.g., '/resource-requirement/jobs'
    const segments = pathname.split("/").filter(Boolean); // removes empty segments

    function getLabel(slug: string) {
        return slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {segments.map((segment, idx) => {
                    const url = "/" + segments.slice(0, idx + 1).join("/");
                    const isLast = idx === segments.length - 1;
                    return (
                        <span key={url} style={{ display: "inline-flex", alignItems: "center" }}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{getLabel(segment)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={url}>{getLabel(segment)}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </span>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
