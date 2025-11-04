import { Profession, Profile } from "@/types/profile";


export const profileData: Profile = {
    name: "Sarah",
    location: "Houston, South, US",
    email: "sarah@gmail.com",
    phone: "(832) 555-1209",
    completionPercentage: 75,
    date_birth: "Dec23 ,1994",
    loc: "Houston, TX, US",
    gender: "Female",
    nationality: "United States",
    keywords: [
        "Fuel Logistics",
        "Supply Chain",
        "Fleet Management",
        "Fuel Monitoring",
        "Route Optimization",
        "Inventory Control",
        "Logistics Coordination",
        "ERP Systems",
        "Compliance Management",
    ],
    avatar: "/assets/icons/placeholder.svg",
    version_no: "V2.5",
    percent_completion: 75,
    passport_number: "NBTU9078798"
}


export const professionData: Profession = {
    title: "Senior Fuel Operations Manager ",
    experience: "(5 Years 2 Months)",
    current_salary: "$2000",
    summary: "Experienced Logistics & Supply Chain professional contributing to the National Fuel Distribution Project — a strategic initiative focused on enhancing the efficiency, reliability, and sustainability of fuel distribution across the country. Skilled in optimizing logistics operations, improving inventory visibility, and coordinating deliveries across regional hubs. Proven ability to streamline supply routes, reduce operational delays, and support data-driven distribution strategies in high-impact national projects.",
    location: "United States - Brooklyn, Queens, The Bronx, Staten Island, Harlem",
    links: [
        { name: "LinkedIn", url: "linkedin.com/in/Sarah" },
    ],
    skills: [
        { name: "Fuel Logistics", exp: 8 },
        { name: "Fleet Management", exp: 2 },
    ],
    project: [
        {
            project_name: "Fuel Cell Efficiency Study - EnergyTrans Logistics Inc.", date: "Apr 23, 2025 - Jun 23, 2025", description: " Researched and modeled fuel cell performance under various load scenarios.", roles: [
                "Conducted performance analysis and efficiency testing of fuel cells, identifying key factors impacting energy output and durability. ",
                " Applied data modeling and optimization techniques to improve system performance and fuel utilization efficiency.",
                "Collaborated with cross-functional teams to deliver research insights, prepare technical reports, and recommend efficiency improvement strategies."
            ], working_period: {
                from: new Date("2025-04-23"),
                to: new Date("2025-06-23"),
            },
        }
    ],
    certification: [
        {
            title: "Certified Fuel Handler", institute: "American Petroleum Institute", cert_no: "CFH-11245", exp_date: "Apr 23,2025 - Jun 23,2025", date_range: {
                from: new Date("2025-04-23"),
                to: new Date("2025-06-23"),
            },

        },
        {
            title: "HAZMAT Awareness", institute: "OSHA", cert_no: "ETY-11246", exp_date: "Apr 23,2025 - Jun 23,2025",date_range: {
                from: new Date("2025-05-23"),
                to: new Date("2025-07-23"),
            },

        },

    ],
    education: [
        {
            title: "B.Sc. in Mechanical Engineering", institute: "B.Sc. in Mechanical Engineering", year: 2024, dept: "	Energy Systems", score: "85%"
        }
    ]
}


