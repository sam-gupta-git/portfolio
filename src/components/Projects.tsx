'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS3'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media metrics with data visualization, reporting, and trend analysis.',
    image: '/api/placeholder/600/400',
    technologies: ['Vue.js', 'D3.js', 'Express', 'MySQL', 'Redis'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Blog CMS',
    description: 'Content management system for blogs with rich text editor, media management, and SEO optimization.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Sanity CMS', 'Vercel', 'Tailwind CSS'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Personal portfolio website with smooth animations, responsive design, and contact form integration.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
]

const categories = ['All', 'Featured', 'Frontend', 'Backend', 'Full Stack']

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'All') return true
    if (activeCategory === 'Featured') return project.featured
    // Add more category logic as needed
    return true
  })

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
    <section id="projects" className="py-20 bg-[#0a0e27] border-t border-[#00ff41]/20">
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
            <span className="text-glow">$ ls projects/</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-32 h-[2px] bg-[#00ff41] mx-auto mb-8 opacity-50"
          />
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#00ffff] max-w-3xl mx-auto font-mono opacity-80"
          >
            <span className="text-[#00ff41]">{"// "}</span>Recent projects showcasing my skills in web development
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 font-medium transition-all duration-300 font-mono text-sm ${
                activeCategory === category
                  ? 'bg-[#00ff41] text-[#0a0e27] shadow-[0_0_20px_rgba(0,255,65,0.5)] border border-[#00ff41]'
                  : 'bg-transparent text-[#00ff41] hover:bg-[#00ff41]/10 border border-[#00ff41]/50'
              }`}
            >
              [{category}]
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="terminal-box overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-[#00ff41]/10 to-[#00ffff]/10 flex items-center justify-center border-b border-[#00ff41]/30">
                  <span className="text-[#00ff41] text-sm font-mono opacity-50">project_preview.png</span>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-[#00ffff] text-[#0a0e27] px-2 py-1 text-xs font-semibold font-mono">
                    [FEATURED]
                  </div>
                )}
                
                {/* Overlay with links */}
                <div className="absolute inset-0 bg-[#0a0e27] bg-opacity-0 hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-transparent border border-[#00ff41] text-[#00ff41] p-3 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-colors"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-transparent border border-[#00ffff] text-[#00ffff] p-3 hover:bg-[#00ffff] hover:text-[#0a0e27] transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#00ff41] mb-2 font-mono">
                  <span className="text-[#00ffff]">&gt;</span> {project.title}
                </h3>
                <p className="text-[#00ff41] mb-4 text-sm leading-relaxed opacity-70 font-mono">
                  <span className="text-[#00ffff]">{"// "}</span>{project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#00ff41]/10 text-[#00ff41] px-2 py-1 border border-[#00ff41]/30 text-xs font-medium font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-transparent border border-[#00ff41] text-[#00ff41] text-center py-2 px-4 hover:bg-[#00ff41] hover:text-[#0a0e27] transition-colors text-sm font-medium font-mono"
                  >
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-transparent border border-[#00ffff] text-[#00ffff] text-center py-2 px-4 hover:bg-[#00ffff] hover:text-[#0a0e27] transition-colors text-sm font-medium font-mono"
                  >
                    Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center hacker-btn font-mono"
          >
            git clone all_projects
            <Github className="ml-2" size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
