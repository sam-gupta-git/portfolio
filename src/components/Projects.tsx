"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "E-commerce App",
    description:
      "Platform designed to provide users with a seamless online shopping experience. Enables customers to browse products, register as a user, add items to a cart and checkout, add items to a wishlist, view past orders, and list their own items for sale.",
    tech: [
      "Java",
      "SQL",
      "Git",
      "HTML",
      "TypeScript",
      "React",
      "Spring",
      "Spring Boot",
      "Spring MVC",
      "Spring Data",
    ],
    link: "#",
    featured: true,
  },
  {
    title: "API-First Data Playground",
    description:
      "Built a web app enabling real-time API exploration and SQL querying for faster data analysis. Allows users to explore and visualize public APIs (REST, GraphQL) by pasting endpoints. Implemented multi-format views: JSON explorer, auto-generated tables, and interactive charts with filtering and one-click export to CSV/Excel.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "ShadCN UI",
      "Recharts",
      "Convex",
      "Prisma",
      "Vercel",
    ],
    link: "#",
    featured: true,
  },
  {
    title: "LiterateTX",
    description:
      "Built a website and relational database intended to raise awareness regarding low rates of literacy in Texas counties. Applied a customer-first strategy to designing and building features; consulted with potential users and gathered feedback via GitHub issue tracker with a 100% issue resolution rate.",
    tech: ["React", "Bootstrap", "Postman", "Selenium", "Docker", "AWS"],
    link: "#",
    featured: true,
  },
  {
    title: "Canvas Board Collaboration App",
    description:
      "Developed a collaborative whiteboard web app where multiple users can create and edit sticky notes and drawings in real time. Implemented drag-and-drop notes, freehand drawing with Konva.js, and synchronized updates across clients using Convex.",
    tech: ["Next.js", "TailwindCSS", "ShadCN UI", "Konva.js", "Convex", "Vercel"],
    link: "#",
    featured: false,
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="h-full bg-[var(--background-secondary)] border border-[var(--border)] rounded p-6 hover:border-[var(--accent)]/50 transition-all duration-300">
        {/* Terminal header */}
        <div className="mb-4 pb-4 border-b border-[var(--border)]">
          <span className="font-mono text-xs text-[var(--foreground-muted)]">
            ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </div>

        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <a
            href={project.link}
            className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        <p className="text-[var(--foreground-muted)] text-sm mb-6 leading-relaxed line-clamp-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-[var(--background-tertiary)] text-[var(--accent-secondary)] text-xs font-mono"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 6 && (
            <span className="px-2 py-1 text-[var(--foreground-muted)] text-xs font-mono">
              +{project.tech.length - 6} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative bg-[var(--background-secondary)]/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-mono text-[var(--accent)] text-lg mb-4">
            $ ls -la ./projects
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
            Featured Projects
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
