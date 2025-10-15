"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { TrendingUp, MessageCircle, Calendar } from "lucide-react"

const Statics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      number: 20000,
      suffix: "+",
      label: "Successful Sales",
      icon: TrendingUp
    },
    {
      number: 2500,
      suffix: "+",
      label: "Reviews on Discord",
      icon: MessageCircle
    },
    {
      number: 1202,
      suffix: "",
      label: "Days Serving You",
      icon: Calendar
    }
  ]

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2000, isInView: boolean) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isInView) return

      let startTime: number
      const startValue = 0
      const endValue = end

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
        
        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, [end, duration, isInView])

    return count
  }

  return (
    <section ref={ref} className="py-4 px-4">
      <div className="container mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const count = useCounter(stat.number, 2000, isInView)
            const IconComponent = stat.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl glass dark:glass-dark border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <motion.div
                  initial={{ scale: 0.5, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.5, rotate: -180 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  className="mb-4 flex justify-center"
                >
                  <IconComponent className="w-12 h-12 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-primary mb-2"
                >
                  {count.toLocaleString()}{stat.suffix}
                </motion.div>
                <p className="text-lg font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Statics