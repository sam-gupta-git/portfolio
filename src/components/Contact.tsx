"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const socialLinks = [
  {
    name: "GITHUB",
    href: "https://github.com/sam-gupta-git",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: "sam-gupta-git",
    color: "var(--foreground)",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[var(--accent)] text-lg mb-4" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            $ ./connect.sh
          </h2>
          <h3 className="text-4xl md:text-5xl text-[var(--foreground)] mb-6 font-mono" style={{ fontWeight: 400 }}>
            Let&apos;s Connect
          </h3>
          <p className="text-xl text-[var(--foreground-muted)] mb-12 max-w-2xl mx-auto">
            I&apos;m actively seeking opportunities to contribute to innovative software development teams. 
            Feel free to reach out if you&apos;d like to collaborate or discuss potential opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded hover:border-[var(--accent)]/50 transition-all group"
            >
              <div
                className="p-3 transition-colors"
                style={{ backgroundColor: `color-mix(in srgb, ${link.color} 15%, transparent)` }}
              >
                <span style={{ color: link.color }}>{link.icon}</span>
              </div>
              <div className="text-left">
                <p className="text-sm text-[var(--foreground-muted)]">{link.name}</p>
                <p className="text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] transition-colors">
                  {link.label}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-[var(--border)]"
        >
          <p className="font-mono text-[var(--foreground-muted)] text-sm">
            <span className="text-[var(--accent-secondary)]">$</span> echo &quot;Built with Next.js, 
            TailwindCSS & Framer Motion&quot;
          </p>
          <p className="font-mono text-[var(--foreground-muted)] text-sm mt-2">
            © {new Date().getFullYear()} Sam Gupta. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
