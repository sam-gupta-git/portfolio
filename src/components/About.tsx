'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'Framer Motion', level: 80 },
]

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'AWS', 'Vercel', 'Tailwind CSS',
  'Framer Motion', 'Git', 'Jest', 'Cypress'
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="about" className="py-20 bg-[#0a0e27] border-t border-[#00ff41]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-[#00ff41] mb-6 font-mono"
          >
            <span className="text-glow">$ cat about.md</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-32 h-[2px] bg-[#00ff41] mx-auto mb-8 opacity-50"
          />
        </motion.div>

        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center mb-12"
          >
            <h3 className="text-2xl font-semibold text-[#00ffff] mb-4 font-mono">
              <span className="text-[#00ff41]">{"# "}</span>Passionate Developer & Problem Solver
            </h3>
            <p className="text-[#00ff41] text-lg leading-relaxed opacity-80 font-mono">
              <span className="text-[#00ffff]">{"/* "}</span>
              I'm a full-stack developer with over 3 years of experience building modern web applications. 
              I love turning complex problems into simple, beautiful, and intuitive solutions.
              <span className="text-[#00ffff]">{" */"}</span>
            </p>
            <p className="text-[#00ff41] text-lg leading-relaxed opacity-80 font-mono">
              <span className="text-[#00ffff]">{"// "}</span>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community.
            </p>
            <div className="pt-6">
              <h4 className="text-lg font-semibold text-[#00ffff] mb-4 font-mono">
                <span className="text-[#00ff41]">const</span> technologies = [
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="terminal-box px-3 py-1 text-sm text-[#00ff41] font-mono hover:bg-[#00ff41]/10 transition-colors"
                  >
                    '{tech}',
                  </motion.span>
                ))}
              </div>
              <p className="text-[#00ffff] font-mono mt-2">];</p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 w-full max-w-2xl terminal-box p-6"
          >
            <h3 className="text-2xl font-semibold text-[#00ffff] mb-6 font-mono">
              <span className="text-[#00ff41]">function</span> getSkills() {"{"}
            </h3>
            <div className="space-y-4 pl-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#00ff41] font-medium font-mono text-sm">
                      <span className="text-[#00ffff]">return</span> {skill.name}:
                    </span>
                    <span className="text-[#00ffff] text-sm font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-[#0a0e27] border border-[#00ff41]/30 h-2">
                    <motion.div
                      className="bg-[#00ff41] h-full shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-[#00ffff] font-mono">{"}"}</p>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 w-full max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-[#00ffff] mb-8 text-center font-mono">
            <span className="text-[#00ff41]">ls -l</span> experience/
          </h3>
          <div className="space-y-8">
            {[
              {
                title: 'Senior Full Stack Developer',
                company: 'Tech Company Inc.',
                period: '2022 - Present',
                description: 'Led development of scalable web applications using React, Node.js, and cloud technologies.',
              },
              {
                title: 'Frontend Developer',
                company: 'Digital Agency',
                period: '2021 - 2022',
                description: 'Built responsive web applications and collaborated with design teams to create exceptional user experiences.',
              },
              {
                title: 'Junior Developer',
                company: 'StartupXYZ',
                period: '2020 - 2021',
                description: 'Developed features for web applications and learned modern development practices.',
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="terminal-box p-6 border-l-2 border-[#00ff41] hover:border-[#00ffff] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h4 className="text-lg font-semibold text-[#00ff41] font-mono">
                    <span className="text-[#00ffff]">&gt;</span> {job.title}
                  </h4>
                  <span className="text-[#00ffff] font-medium font-mono text-sm">[{job.period}]</span>
                </div>
                <p className="text-[#00ff41] font-medium mb-2 font-mono text-sm opacity-70">
                  @ {job.company}
                </p>
                <p className="text-[#00ff41] font-mono text-sm opacity-60">
                  <span className="text-[#00ffff]">{"// "}</span>{job.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
