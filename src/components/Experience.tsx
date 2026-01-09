"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Desktop Support Technician",
    company: "Amazon",
    agency: "Apex Systems",
    location: "Austin, TX",
    period: "Aug. 2025 – Present",
    description: [
      "Supported engineering teams at Amazon within multiple departments by configuring and deploying dozens of Windows/macOS machines",
      "Resolved 10–15 daily support tickets for desktops and laptops via SIM-T ticketing system, consistently meeting SLA response time targets",
      "Performed hardware, software, and networking troubleshooting, achieving first-contact resolution on most issues",
      "Assisted with IT asset lifecycle tracking, maintaining accurate records across multiple departments",
      "Delivered end-user training sessions on IT best practices, improving user self-sufficiency and reducing repeat issues",
    ],
    tech: ["Windows", "macOS", "SIM-T", "Hardware", "Networking"],
  },
  {
    title: "Full Stack Java Developer",
    company: "Revature",
    location: "Remote",
    period: "Oct. 2025 – Nov. 2025",
    description: [
      "Completed a 5-week, full-time software development training program focused on Java, Spring Boot, React, AWS, and AI fundamentals",
      "Deployed RESTful web applications using Spring Boot and MySQL, applying object-oriented programming (OOP) and MVC architecture",
      "Implemented and tested backend services with JUnit and Mockito, reinforcing understanding of Test-Driven Development (TDD)",
      "Gained hands-on experience with cloud computing, deploying applications to AWS EC2/S3",
      "Collaborated in Agile sprints and strengthened problem-solving and debugging skills through daily coding challenges",
    ],
    tech: ["Java", "Spring Boot", "React", "AWS", "MySQL", "JUnit"],
  },
];

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-[var(--accent)] transform -translate-x-1/2 z-10" />

      {/* Content card */}
      <div
        className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
          index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded p-6 hover:border-[var(--accent)]/50 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {experience.title}
              </h3>
              <p className="text-[var(--accent)] font-medium">
                {experience.company}
                {experience.agency && (
                  <span className="text-[var(--foreground-muted)]">
                    {" "}
                    via {experience.agency}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 text-sm text-[var(--foreground-muted)]">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {experience.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {experience.period}
            </span>
          </div>

          <ul className="space-y-2 mb-4">
            {experience.description.slice(0, 3).map((item, i) => (
              <li
                key={i}
                className="text-[var(--foreground-muted)] text-sm flex items-start gap-2"
              >
                <span className="text-[var(--accent-secondary)] mt-1">▹</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-[var(--background-tertiary)] text-[var(--accent)] text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-mono text-[var(--accent)] text-lg mb-4">
            $ cat experience.log
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
            Work Experience
          </h3>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)] transform -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.title}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
