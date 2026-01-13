"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "C++", "SQL"],
  },
  {
    title: "Frameworks & Tools",
    skills: ["Spring Boot", "React", "Next.js", "Node.js", "Docker"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (EC2, S3)", "Jenkins", "GitHub Actions", "Kubernetes", "Vercel"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Practices",
    skills: ["Agile/Scrum", "TDD", "Git", "RESTful APIs", "API Testing"],
  },
  {
    title: "Operating Systems",
    skills: ["Windows", "Linux/UNIX", "macOS"],
  },
];

const SkillCard = ({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[var(--background-secondary)] border border-[var(--border)] rounded p-6 hover:border-[var(--accent)]/50 transition-all group"
    >
      <h4 className="text-sm font-mono text-[var(--accent)] mb-4 uppercase tracking-wider">
        {category.title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
            className="px-3 py-1.5 bg-[var(--background-tertiary)] text-[var(--foreground-muted)] text-sm font-mono hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-[var(--accent)] text-lg mb-4" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            $ cat skills.json
          </h2>
          <h3 className="text-4xl md:text-5xl text-[var(--foreground)] font-mono" style={{ fontWeight: 400 }}>
            Skills & Technologies
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-[var(--accent)] text-lg mb-4" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            $ cat education.txt
          </h2>
          <h3 className="text-4xl md:text-5xl text-[var(--foreground)] mb-8 font-mono" style={{ fontWeight: 400 }}>
            Education
          </h3>

          <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-2xl text-[var(--foreground)] mb-2" style={{ fontWeight: 400 }}>
                  University of Texas at Austin
                </h4>
                <p className="text-[var(--accent)] text-lg font-medium">
                  Bachelor of Science in Computer Science
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] font-mono">
                  May 2024
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border)]">
              <p className="text-[var(--foreground-muted)] mb-4">
                <span className="text-[var(--foreground)]">Relevant Coursework:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Structures",
                  "Algorithms and Complexity",
                  "Neural Networks",
                  "Cloud Computing",
                ].map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1.5 bg-[var(--background-tertiary)] text-[var(--foreground-muted)] text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
