import auroraImage from "@/assets/project-aurora.jpg";
import niloyImage from "@/assets/project-niloy.jpg";

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: string;
  status: string;
  summary: string;
  description: string;
  image_key: string;
  image_url: string | null;
  amenities: string[];
  facts: Record<string, string>;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  biography: string;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
};

export const projectImages: Record<string, string> = {
  aurora: auroraImage,
  niloy: niloyImage,
};

export const getProjectImage = (project: Pick<Project, "image_key" | "image_url">) =>
  project.image_url || projectImages[project.image_key] || auroraImage;

export const demoProjects: Project[] = [
  { id: "aurora", title: "HBL Aurora", slug: "hbl-aurora", location: "Dhanmondi, Dhaka", status: "Ongoing", summary: "A calm, contemporary address shaped around light, greenery, and privacy.", description: "HBL Aurora is a boutique urban residence with generous balconies, carefully planned circulation, and warm shared spaces for modern family life.", image_key: "aurora", image_url: null, amenities: ["Rooftop garden", "Residents lounge", "24/7 security", "Generator backup", "Two elevators"], facts: { apartments: "28", floors: "G + 9", size: "1,850–2,150 sft", handover: "December 2027" }, is_featured: true, is_published: true, sort_order: 1 },
  { id: "niloy", title: "HBL Niloy", slug: "hbl-niloy", location: "Uttara, Dhaka", status: "Upcoming", summary: "Refined city living with open views and efficient, elegant floor plans.", description: "HBL Niloy pairs a crisp architectural profile with comfortable family apartments, secure parking, and a landscaped arrival court.", image_key: "niloy", image_url: null, amenities: ["Landscaped court", "Prayer space", "Children’s play area", "Fire safety system", "Visitor parking"], facts: { apartments: "36", floors: "G + 10", size: "1,650–1,950 sft", handover: "June 2028" }, is_featured: true, is_published: true, sort_order: 2 },
  { id: "neer", title: "HBL Neer", slug: "hbl-neer", location: "Bashundhara R/A, Dhaka", status: "Completed", summary: "A peaceful residential retreat with contemporary detail and lasting materials.", description: "Completed with an emphasis on natural ventilation, practical layouts, and enduring finishes, HBL Neer offers composed urban living.", image_key: "aurora", image_url: null, amenities: ["Community hall", "CCTV coverage", "Water treatment", "Rooftop seating"], facts: { apartments: "24", floors: "G + 8", size: "1,700–2,000 sft", handover: "Completed 2025" }, is_featured: true, is_published: true, sort_order: 3 },
  { id: "shurjo", title: "HBL Shurjo", slug: "hbl-shurjo", location: "Mirpur DOHS, Dhaka", status: "Ongoing", summary: "Bright, family-focused apartments in a connected neighborhood.", description: "HBL Shurjo brings together efficient planning, generous daylight, and dependable building systems for effortless daily living.", image_key: "niloy", image_url: null, amenities: ["Fitness room", "Rooftop garden", "Secure lobby", "Generator backup"], facts: { apartments: "32", floors: "G + 9", size: "1,550–1,850 sft", handover: "March 2027" }, is_featured: false, is_published: true, sort_order: 4 },
];

export const demoTeam: TeamMember[] = [
  { id: "1", name: "Ahsanul Haque", role: "Managing Director", biography: "Guides HBL with a commitment to responsible growth, transparent partnerships, and homes that create long-term value.", image_url: null, is_published: true, sort_order: 1 },
  { id: "2", name: "Farzana Rahman", role: "Director, Design & Planning", biography: "Leads the design process with a focus on thoughtful layouts, enduring materials, and the everyday needs of residents.", image_url: null, is_published: true, sort_order: 2 },
  { id: "3", name: "Mahmudul Hasan", role: "Head of Engineering", biography: "Oversees construction quality, safety, and delivery through disciplined project controls and experienced site teams.", image_url: null, is_published: true, sort_order: 3 },
  { id: "4", name: "Nusrat Jahan", role: "Head of Customer Experience", biography: "Ensures every buyer receives clear guidance, timely communication, and dependable support from enquiry to handover.", image_url: null, is_published: true, sort_order: 4 },
];