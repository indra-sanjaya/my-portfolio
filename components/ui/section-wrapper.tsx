"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function SectionWrapper({ children, className = "", id, delay = 0 }: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // ease-out curve
      }}
    >
      {children}
    </motion.section>
  )
}
