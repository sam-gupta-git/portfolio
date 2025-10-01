'use client'

import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
]

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0a0e27] text-[#00ff41] border-t border-[#00ff41]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Brand Section */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 font-mono text-glow">
                <span className="text-[#00ffff]">&gt;</span> Your Name
              </h3>
              <p className="text-[#00ff41] mb-6 max-w-md font-mono text-sm opacity-70">
                <span className="text-[#00ffff]">{"// "}</span>
                Full Stack Developer passionate about creating minimalistic, functional code
              </p>
              <div className="flex space-x-4 justify-center">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-transparent border border-[#00ff41] flex items-center justify-center hover:bg-[#00ff41] hover:text-[#0a0e27] transition-colors"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 font-mono text-[#00ffff]">links[]:</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#00ff41] hover:text-[#00ffff] transition-colors font-mono text-sm opacity-80 hover:opacity-100"
                    >
                      <span className="text-[#00ffff]">&gt;</span> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 font-mono text-[#00ffff]">contact{}:</h4>
              <div className="space-y-2 text-[#00ff41]">
                <p className="font-mono text-sm opacity-70">email: your.email@example.com</p>
                <p className="font-mono text-sm opacity-70">phone: +1 (555) 123-4567</p>
                <p className="font-mono text-sm opacity-70">location: San Francisco, CA</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-[#00ff41]/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-[#00ff41] text-sm mb-4 md:mb-0 font-mono opacity-70">
            <span className="text-[#00ffff]">{"// "}</span>
            © 2024 Your Name. Built with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block text-[#00ffff]"
            >
              <Heart size={14} />
            </motion.span>{' '}
            using Next.js & Tailwind
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-[#00ff41] hover:text-[#00ffff] transition-colors font-mono text-sm border border-[#00ff41]/30 px-3 py-1 hover:border-[#00ffff]"
          >
            <span>cd ~</span>
            <ArrowUp size={16} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
