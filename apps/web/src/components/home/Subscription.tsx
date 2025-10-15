"use client"

import React from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: string[]
  popular?: boolean
  icon: React.ReactNode
  color: string
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for individuals getting started",
    price: {
      monthly: 9,
      yearly: 90
    },
    features: [
      "Up to 5 projects",
      "Basic templates",
      "Email support",
      "1GB storage",
      "Standard analytics"
    ],
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for growing businesses and teams",
    price: {
      monthly: 29,
      yearly: 290
    },
    features: [
      "Unlimited projects",
      "Premium templates",
      "Priority support",
      "10GB storage",
      "Advanced analytics",
      "Team collaboration",
      "Custom branding"
    ],
    popular: true,
    icon: <Star className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    buttonText: "Start Pro Trial",
    buttonVariant: "default"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: {
      monthly: 99,
      yearly: 990
    },
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 phone support",
      "Custom integrations",
      "Advanced security",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label solution"
    ],
    icon: <Crown className="w-6 h-6" />,
    color: "from-amber-500 to-amber-600",
    buttonText: "Contact Sales",
    buttonVariant: "secondary"
  }
]

const Subscription = () => {
  const [isYearly, setIsYearly] = React.useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div 
      ref={ref}
      className="w-full max-w-7xl mx-auto px-4 py-12"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          variants={itemVariants}
        >
          <span className={cn("text-sm font-medium transition-colors", !isYearly ? "text-foreground" : "text-muted-foreground")}>
            Monthly
          </span>
          <motion.button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/20 transition-colors focus:outline-none focus:ring-none focus:ring-primary focus:ring-offset-none focus:ring-offset-none cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-primary transition-transform",
                isYearly ? "translate-x-6" : "translate-x-1"
              )}
              animate={{ x: isYearly ? 24 : 4 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.button>
          <span className={cn("text-sm font-medium transition-colors", isYearly ? "text-foreground" : "text-muted-foreground")}>
            Yearly
          </span>
          <div className="w-20 h-6 flex items-center justify-center">
            <motion.div
              animate={{ 
                opacity: isYearly ? 1 : 0, 
                scale: isYearly ? 1 : 0.95 
              }}
              transition={{ duration: 0.3 }}
            >
              <Badge 
                variant="secondary" 
                className="bg-green-500/20 text-green-600 border-green-500/30"
              >
                Save 20%
              </Badge>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {subscriptionPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-2xl",
                plan.popular && "ring-2 ring-primary/50 shadow-xl scale-105"
              )}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute top-0 right-0 z-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  Most Popular
                </motion.div>
              )}

              <div className={cn("absolute inset-0 z-0 bg-gradient-to-br opacity-5", plan.color)} />
              
              <CardHeader className="text-center pb-4 relative z-10">
                <motion.div 
                  className={cn("w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r flex items-center justify-center text-white", plan.color)}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  {plan.icon}
                </motion.div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-6 px-4 h-[350px] relative z-10">
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-baseline justify-center">
                    <motion.span 
                      className="text-4xl font-bold"
                      key={isYearly ? plan.price.yearly : plan.price.monthly}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </motion.span>
                    <span className="text-muted-foreground ml-1">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {isYearly && (
                    <motion.p 
                      className="text-sm text-muted-foreground mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ${Math.round(plan.price.yearly / 12)}/month billed yearly
                    </motion.p>
                  )}
                </motion.div>

                <motion.ul 
                  className="space-y-3 text-left"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.5 + index * 0.1,
                      },
                    },
                  }}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center gap-3"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>

              <CardFooter className="pt-0 px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Button
                    variant={plan.buttonVariant}
                    className={cn(
                      "w-full h-12 text-base text-white font-medium transition-all duration-300 cursor-pointer",
                      plan.popular && "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center mt-12"
        variants={itemVariants}
      >
        <p className="text-sm text-muted-foreground mb-4">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <motion.div 
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.8,
              },
            },
          }}
        >
          {[
            "Cancel anytime",
            "24/7 support", 
            "Money-back guarantee"
          ].map((text, index) => (
            <motion.span 
              key={index}
              className="flex items-center gap-2"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Check className="w-4 h-4 text-green-500" />
              {text}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Subscription