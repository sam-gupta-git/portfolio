export const GITHUB_URL = "https://github.com/sam-gupta-git";

export type Job = {
  id: string;
  label: string;
  title: string;
  org: string;
  when: string;
  line: string;
  tags: string[];
};

export type Project = {
  id: string;
  label: string;
  line: string;
  tags: string[];
  link: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  list: string[];
};

export type Leaf = { id: string; label: string };

export type CatId = "projects" | "experience" | "skills" | "education" | "contact";

export type Cat = {
  id: CatId;
  label: string;
  geo: "box" | "ico" | "oct" | "cyl" | "tet";
  leaves: Leaf[];
  pos: [number, number, number];
};

export const JOBS: Job[] = [
  {
    id: "amazon",
    label: "Amazon",
    title: "Desktop Support Technician",
    org: "Amazon · via Apex Systems",
    when: "Sep 2025 – now",
    line: "Deploys and supports Windows and macOS machines for engineering teams. 10–15 tickets a day, within SLA.",
    tags: ["Windows", "macOS", "SIM-T", "Hardware", "Networking"],
  },
  {
    id: "revature",
    label: "Revature",
    title: "Full Stack Java Developer",
    org: "Revature · Remote",
    when: "Oct – Nov 2025",
    line: "Five-week program. Spring Boot and MySQL REST apps, JUnit and Mockito TDD, AWS EC2 and S3.",
    tags: ["Java", "Spring Boot", "React", "AWS", "MySQL", "JUnit"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "chargedrift",
    label: "ChargeDrift",
    line: "Finds your recurring charges through Plaid and flags when a merchant raises the price.",
    tags: ["Next.js", "TypeScript", "Supabase", "Plaid"],
    link: "https://chargedrift.vercel.app/",
  },
  {
    id: "ecom",
    label: "E-commerce App",
    line: "Full-stack store with cart, checkout, wishlist, order history and seller listings.",
    tags: ["Java", "Spring Boot", "React", "MySQL", "AWS"],
    link: "https://github.com/revature-sam/ecom-project",
  },
  {
    id: "playground",
    label: "Data Playground",
    line: "Paste a REST or GraphQL endpoint and explore it as JSON, tables or charts.",
    tags: ["Next.js", "Recharts", "ShadCN UI", "Vercel"],
    link: "https://dataplayground.vercel.app/",
  },
  {
    id: "literatetx",
    label: "LiterateTX",
    line: "Site and database tracking literacy rates across Texas counties.",
    tags: ["React", "Docker", "Selenium", "AWS"],
    link: "https://www.literatetx.me/",
  },
  {
    id: "canvas",
    label: "Canvas Board",
    line: "Real-time shared whiteboard with sticky notes and freehand drawing.",
    tags: ["SvelteKit", "Konva.js", "Convex", "Vercel"],
    link: "https://canvasboardapp.vercel.app/",
  },
];

export const SKILLS: SkillGroup[] = [
  { id: "lang", label: "Languages", list: ["Java", "JavaScript", "TypeScript", "Python", "C++", "SQL"] },
  { id: "fw", label: "Frameworks", list: ["Spring Boot", "React", "Next.js", "Node.js", "Docker"] },
  { id: "cloud", label: "Cloud & DevOps", list: ["AWS (EC2, S3)", "Jenkins", "GitHub Actions", "Kubernetes", "Vercel"] },
  { id: "db", label: "Databases", list: ["MySQL", "PostgreSQL"] },
  { id: "prac", label: "Practices", list: ["Agile/Scrum", "TDD", "Git", "RESTful APIs", "API Testing"] },
  { id: "os", label: "Systems", list: ["Windows", "Linux/UNIX", "macOS"] },
];

export const COURSES = ["Data Structures", "Algorithms", "Neural Networks", "Cloud Computing"];

// pos: where each section node sits around the helix core, in scene units
export const CATS: Cat[] = [
  { id: "projects", label: "Projects", geo: "ico", leaves: PROJECTS, pos: [4.6, 1.3, 1.2] },
  { id: "experience", label: "Experience", geo: "box", leaves: JOBS, pos: [-4.3, 1.9, 1.6] },
  { id: "skills", label: "Skills", geo: "oct", leaves: SKILLS, pos: [-3.4, -1.9, -2.6] },
  { id: "education", label: "Education", geo: "cyl", leaves: COURSES.map((c, i) => ({ id: `c${i}`, label: c })), pos: [2.6, -2.1, -3.4] },
  { id: "contact", label: "Contact", geo: "tet", leaves: [{ id: "github", label: "GitHub" }], pos: [0.4, 3.3, -3.6] },
];

export const isCatId = (s: string): s is CatId => CATS.some((c) => c.id === s);
