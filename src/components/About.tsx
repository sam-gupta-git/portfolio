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
    <section id="about" className="py-20 bg-gray-50">
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
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Passionate Developer & Problem Solver
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              I'm a full-stack developer with over 3 years of experience building modern web applications. 
              I love turning complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date 
              with the latest industry trends.
            </p>
            <div className="pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies I Work With:</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm border"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Core Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Experience
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
                className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                  <span className="text-blue-600 font-medium">{job.period}</span>
                </div>
                <p className="text-gray-600 font-medium mb-2">{job.company}</p>
                <p className="text-gray-600">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
