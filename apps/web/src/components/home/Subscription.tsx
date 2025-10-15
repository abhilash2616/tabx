"use client"

import React from "react"
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={cn("text-sm font-medium transition-colors", !isYearly ? "text-foreground" : "text-muted-foreground")}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/20 transition-colors focus:outline-none focus:ring-none focus:ring-primary focus:ring-offset-none focus:ring-offset-none cursor-pointer"
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-primary transition-transform",
                isYearly ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span className={cn("text-sm font-medium transition-colors", isYearly ? "text-foreground" : "text-muted-foreground")}>
            Yearly
          </span>
          <div className="w-20 h-6 flex items-center justify-center">
            <Badge 
              variant="secondary" 
              className={cn(
                "bg-green-500/20 text-green-600 border-green-500/30 transition-all duration-300",
                isYearly ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}
            >
              Save 20%
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl",
              plan.popular && "ring-2 ring-primary/50 shadow-xl scale-105"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 z-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
                Most Popular
              </div>
            )}

            <div className={cn("absolute inset-0 z-0 bg-gradient-to-br opacity-5", plan.color)} />
            
            <CardHeader className="text-center pb-4 relative z-10">
              <div className={cn("w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r flex items-center justify-center text-white", plan.color)}>
                {plan.icon}
              </div>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-6 px-4 h-[350px] relative z-10">
              <div className="mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-muted-foreground ml-1">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ${Math.round(plan.price.yearly / 12)}/month billed yearly
                  </p>
                )}
              </div>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-0 px-4 relative z-10">
              <Button
                variant={plan.buttonVariant}
                className={cn(
                  "w-full h-12 text-base text-white font-medium transition-all duration-300 cursor-pointer",
                  plan.popular && "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                )}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground mb-4">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            24/7 support
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Money-back guarantee
          </span>
        </div>
      </div>
    </div>
  )
}

export default Subscription