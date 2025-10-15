"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const hero = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div 
      ref={ref}
      className="glass dark:glass-dark w-full h-[600px] relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div 
        className="absolute inset-0 shimmer-slow"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
          variants={titleVariants}
        >
          Welcome to TabX
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-8"
          variants={itemVariants}
        >
          Discover the future of browsing with our premium game store and productivity tools
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          <motion.button
            className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default hero
