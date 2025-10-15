"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import GlowingSpotlightCard from "../ui/glowing-spotlight-card";
import type { ProductCardSize, AnimationIntensity } from "@/types/product";

// Animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

// Size configurations (matching ProductCard)
const sizeConfig = {
  sm: {
    card: "p-2",
    image: "h-32",
    title: "h-4",
    price: "h-3 w-16",
    badge: "h-5 w-12",
    description: "h-3",
    button: "h-8",
  },
  md: {
    card: "p-4",
    image: "h-40",
    title: "h-5",
    price: "h-4 w-20",
    badge: "h-6 w-16",
    description: "h-4",
    button: "h-10",
  },
  lg: {
    card: "p-6",
    image: "h-48",
    title: "h-6",
    price: "h-5 w-24",
    badge: "h-7 w-20",
    description: "h-5",
    button: "h-12",
  },
  xl: {
    card: "p-8",
    image: "h-56",
    title: "h-7",
    price: "h-6 w-28",
    badge: "h-8 w-24",
    description: "h-6",
    button: "h-14",
  },
};

interface ProductCardSkeletonProps {
  size?: ProductCardSize;
  showBadge?: boolean;
  showPrice?: boolean;
  showBuyButton?: boolean;
  enableGlow?: boolean;
  animationIntensity?: AnimationIntensity;
  className?: string;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = React.memo(({
  size = "md",
  showBadge = true,
  showPrice = true,
  showBuyButton = true,
  enableGlow = true,
  animationIntensity = "medium",
  className = "",
}) => {
  const config = sizeConfig[size];
  const isAnimated = animationIntensity !== "none";

  const cardContent = (
    <Card
      className={`relative overflow-hidden bg-transparent border-none shadow-none ${config.card} ${className}`}
    >
      <CardHeader className="pb-3">
        <div className={`w-full rounded-lg overflow-hidden ${config.image}`}>
          <Skeleton className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50" />
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex justify-between items-center mb-3">
          {showBadge && (
            <div className="flex flex-wrap gap-1">
              <Skeleton 
                className={`${config.badge} bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full`} 
              />
            </div>
          )}
          {showPrice && (
            <Skeleton 
              className={`${config.price} bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded`} 
            />
          )}
        </div>
        
        <Skeleton 
          className={`${config.title} w-3/4 bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded mb-2`} 
        />
        
        <div className="space-y-1">
          <Skeleton 
            className={`${config.description} w-full bg-gradient-to-r from-gray-700/40 to-gray-800/40 rounded`} 
          />
          <Skeleton 
            className={`${config.description} w-2/3 bg-gradient-to-r from-gray-700/40 to-gray-800/40 rounded`} 
          />
        </div>
      </CardContent>

      {showBuyButton && (
        <CardFooter>
          <Skeleton 
            className={`${config.button} w-full bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-lg`} 
          />
        </CardFooter>
      )}
    </Card>
  );

  if (enableGlow) {
    return (
      <motion.div
        variants={isAnimated ? cardVariants : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlowingSpotlightCard
          className="transition-all duration-300"
          spotlightColor="rgba(0, 125, 252, 0.2)"
          glowColor="rgba(0, 125, 252, 0.1)"
          intensity={animationIntensity === "none" ? "low" : animationIntensity}
          enableParticles={false}
          enableGlow={enableGlow}
        >
          {cardContent}
        </GlowingSpotlightCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={isAnimated ? cardVariants : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {cardContent}
    </motion.div>
  );
});

ProductCardSkeleton.displayName = 'ProductCardSkeleton';

export default ProductCardSkeleton;
