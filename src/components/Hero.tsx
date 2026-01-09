"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TypeWriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      {showCursor && <span className="cursor-blink">▊</span>}
    </span>
  );
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--background-secondary)] opacity-50" />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--background-secondary)] border border-[var(--border)] rounded font-mono text-sm text-[var(--foreground-muted)]">
            <span className="w-2 h-2 bg-[var(--accent-secondary)]" />
            <span>Available for opportunities</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-mono text-[var(--accent)] text-lg mb-4">
            <TypeWriter text="$ whoami" delay={500} />
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-[var(--foreground)]">Sam</span>{" "}
          <span className="text-[var(--accent)]">Gupta</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          <span className="text-2xl md:text-3xl text-[var(--foreground)]">
            Software Developer
          </span>
          <span className="text-[var(--foreground-muted)]">•</span>
          <span className="text-xl text-[var(--foreground-muted)]">
            Austin, TX
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-3xl mb-12 leading-relaxed"
        >
          Entry-level Software Developer with a B.S. in Computer Science from{" "}
          <span className="text-[var(--accent)]">UT Austin</span>. Building full-stack 
          web applications with{" "}
          <span className="text-[var(--accent-secondary)]">Java</span>,{" "}
          <span className="text-[var(--accent-secondary)]">React</span>,{" "}
          <span className="text-[var(--accent-secondary)]">Spring Boot</span>, and{" "}
          <span className="text-[var(--accent-secondary)]">AWS</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-[var(--accent)] text-[var(--background)] font-semibold rounded hover:bg-[var(--accent)]/90 transition-all"
          >
            <span className="font-mono text-[var(--background)]/70">→</span>
            View Projects
          </a>
          <a
            href="https://github.com/sam-gupta-git"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-semibold rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-[var(--foreground-muted)]"
          >
            <span className="font-mono text-sm">scroll</span>
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
