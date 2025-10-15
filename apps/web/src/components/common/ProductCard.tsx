"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import GlowingSpotlightCard from "../ui/glowing-spotlight-card";
import Buynow from "./BuyNow";
import type { Product, ProductCardSize, AnimationIntensity } from "@/types/product";

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

const imageVariants = {
    hover: {
        scale: 1.0,
    },
};

const badgeVariants = {
    hover: {
        scale: 1.1,
        rotate: 2,
        transition: {
            duration: 0.2,
        },
    },
};

const buttonVariants = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
        },
    },
    tap: {
        scale: 0.95,
    },
};

// Size configurations
const sizeConfig = {
    sm: {
        card: "p-2",
        image: "h-32",
        title: "text-sm",
        price: "text-xs",
        badge: "text-xs",
    },
    md: {
        card: "p-4",
        image: "h-40",
        title: "text-lg",
        price: "text-sm",
        badge: "text-[12px]",
    },
    lg: {
        card: "p-6",
        image: "h-48",
        title: "text-xl",
        price: "text-base",
        badge: "text-base",
    },
    xl: {
        card: "p-8",
        image: "h-56",
        title: "text-2xl",
        price: "text-lg",
        badge: "text-lg",
    },
};

interface ProductCardProps {
    product: Product;
    size?: ProductCardSize;
    showBadge?: boolean;
    showPrice?: boolean;
    showBuyButton?: boolean;
    enableGlow?: boolean;
    enableParticles?: boolean;
    animationIntensity?: AnimationIntensity;
    className?: string;
    onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({
    product,
    size = "md",
    showBadge = true,
    showPrice = true,
    showBuyButton = true,
    enableGlow = true,
    enableParticles = false, // Disabled by default for performance
    animationIntensity = "medium",
    className = "",
    onProductClick,
}) => {
    const config = sizeConfig[size];
    const isAnimated = animationIntensity !== "none";

    const handleCardClick = React.useCallback(() => {
        if (onProductClick) {
            onProductClick(product);
        }
    }, [onProductClick, product]);

    const cardContent = (
        <Card
            className={`relative overflow-hidden bg-transparent border-none shadow-none ${config.card} ${className}`}
            onClick={handleCardClick}
        >
            <CardHeader className="pb-3">
                <motion.div
                    className={`w-full rounded-lg overflow-hidden ${config.image}`}
                    variants={isAnimated ? imageVariants : undefined}
                    whileHover={isAnimated ? "hover" : undefined}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </CardHeader>

            <CardContent className="pb-3">
                <div className="flex justify-between items-center mb-3">
                    {showBadge && product.badge && (
                        <div className="flex flex-wrap gap-1">
                            {(Array.isArray(product.badge) ? product.badge : [product.badge]).map((badgeText, index) => (
                                <motion.div
                                    key={index}
                                    variants={isAnimated ? badgeVariants : undefined}
                                    whileHover={isAnimated ? "hover" : undefined}
                                >
                                    <Badge variant="outline" className={config.badge}>
                                        {badgeText}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    )}
                    {showPrice && (
                        <motion.p
                            className={`text-gray-200 ${config.price}`}
                            initial={isAnimated ? { opacity: 1 } : undefined}
                            whileHover={isAnimated ? { opacity: 1 } : undefined}
                            transition={{ duration: 0.2 }}
                        >
                            {product.price.toFixed(2)} {product.currency}
                        </motion.p>
                    )}
                </div>
                <motion.h2
                    className={`font-semibold capitalize ${config.title}`}
                    initial={isAnimated ? { opacity: 0.9 } : undefined}
                    whileHover={isAnimated ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.2 }}
                >
                    {product.name}
                </motion.h2>
                {product.description && (
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                        {product.description}
                    </p>
                )}
            </CardContent>

            {showBuyButton && (
                <CardFooter>
                    <motion.div
                        variants={isAnimated ? buttonVariants : undefined}
                        whileHover={isAnimated ? "hover" : undefined}
                        whileTap={isAnimated ? "tap" : undefined}
                    >
                        <Buynow href={product.href} text="Buy Now" />
                    </motion.div>
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
                    spotlightColor={product.spotlightColor || "rgba(0, 125, 252, 0.3)"}
                    glowColor={product.glowColor || "rgba(0, 125, 252, 0.2)"}
                    intensity={animationIntensity === "none" ? "low" : animationIntensity}
                    enableParticles={enableParticles}
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

ProductCard.displayName = 'ProductCard';

export default ProductCard;
