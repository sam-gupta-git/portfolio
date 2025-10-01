'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'your.email@example.com',
    link: 'mailto:your.email@example.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'San Francisco, CA',
    link: '#',
  },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/samirdotdev', label: 'Twitter' },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

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
    <section id="contact" className="py-20 bg-[#0a0e27] border-t border-[#00ff41]/20">
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
            <span className="text-glow">$ ./contact.sh</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-32 h-[2px] bg-[#00ff41] mx-auto mb-8 opacity-50"
          />
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#00ffff] max-w-3xl mx-auto font-mono opacity-80"
          >
            <span className="text-[#00ff41]">{"// "}</span>
            Always interested in new opportunities and exciting projects
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 w-full lg:w-1/2"
          >
            <div>
              <h3 className="text-2xl font-semibold text-[#00ffff] mb-6 font-mono">
                <span className="text-[#00ff41]">const</span> contact = {"{"}
              </h3>
              <p className="text-[#00ff41] text-lg leading-relaxed mb-8 font-mono opacity-70">
                <span className="text-[#00ffff]">{"// "}</span>Open to discussing new projects and opportunities
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, title, value, link }, index) => (
                <motion.a
                  key={title}
                  href={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center p-4 terminal-box hover:border-[#00ffff] transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00ff41]/10 border border-[#00ff41]/30 flex items-center justify-center">
                    <Icon className="text-[#00ff41]" size={20} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-[#00ffff] font-mono">{title}:</h4>
                    <p className="text-[#00ff41] font-semibold font-mono text-sm">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
              className="pt-6"
            >
              <h4 className="text-lg font-semibold text-[#00ffff] mb-4 font-mono">socials[]:</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-transparent border border-[#00ff41] text-[#00ff41] flex items-center justify-center hover:bg-[#00ff41] hover:text-[#0a0e27] transition-colors"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
              <p className="text-[#00ffff] font-mono mt-4">{"};"}</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="terminal-box p-8 w-full lg:w-1/2"
          >
            <h3 className="text-2xl font-semibold text-[#00ffff] mb-6 font-mono">
              <span className="text-[#00ff41]">function</span> sendMessage() {"{"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-[#00ffff] mb-2 font-mono">
                    name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#00ff41]/30 bg-[#0a0e27] text-[#00ff41] font-mono focus:ring-2 focus:ring-[#00ff41] focus:border-[#00ff41] transition-colors placeholder-[#00ff41]/30"
                    placeholder="Enter your name"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-[#00ffff] mb-2 font-mono">
                    email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#00ff41]/30 bg-[#0a0e27] text-[#00ff41] font-mono focus:ring-2 focus:ring-[#00ff41] focus:border-[#00ff41] transition-colors placeholder-[#00ff41]/30"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-[#00ffff] mb-2 font-mono">
                  subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#00ff41]/30 bg-[#0a0e27] text-[#00ff41] font-mono focus:ring-2 focus:ring-[#00ff41] focus:border-[#00ff41] transition-colors placeholder-[#00ff41]/30"
                  placeholder="Topic..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.9 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-[#00ffff] mb-2 font-mono">
                  message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#00ff41]/30 bg-[#0a0e27] text-[#00ff41] font-mono focus:ring-2 focus:ring-[#00ff41] focus:border-[#00ff41] transition-colors resize-none placeholder-[#00ff41]/30"
                  placeholder="Your message here..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.0 }}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center px-6 py-3 font-semibold transition-all duration-300 font-mono ${
                    isSubmitting
                      ? 'bg-[#00ff41]/20 cursor-not-allowed border border-[#00ff41]/50'
                      : 'hacker-btn'
                  } text-[#00ff41]`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#00ff41] mr-2"></div>
                      sending...
                    </>
                  ) : (
                    <>
                      submit()
                      <Send className="ml-2" size={18} />
                    </>
                  )}
                </motion.button>
                <p className="text-[#00ffff] font-mono text-center mt-4">{"}"};</p>
              </motion.div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#00ff41]/10 border border-[#00ff41] text-[#00ff41] font-mono text-sm"
                >
                  <span className="text-[#00ffff]">{"// "}</span>Success! Message sent.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
