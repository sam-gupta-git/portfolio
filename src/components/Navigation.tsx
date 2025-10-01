'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Scanline effect */}
      <div className="scanline" />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0e27]/90 backdrop-blur-md border-b border-[#00ff41]/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-[#00ff41]"
            >
              <a href="#home" className="hover:text-[#00ffff] transition-colors text-glow flex items-center">
                <span className="mr-2">&gt;</span>
                <span className="font-mono">./portfolio</span>
                <span className="terminal-cursor ml-1">_</span>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 ml-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#00ff41] hover:text-[#00ffff] transition-colors font-medium relative group"
                >
                  <span className="font-mono text-sm">[{item.name}]</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00ffff] group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden absolute right-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#00ff41] hover:text-[#00ffff] transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden terminal-box mt-2 overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-[#00ff41] hover:text-[#00ffff] hover:bg-[#00ff41]/10 transition-colors font-mono text-sm"
                    >
                      &gt; {item.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  )
}
