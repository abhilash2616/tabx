"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product, ProductCardLayout, ProductCardSize, AnimationIntensity } from "@/types/product";

// Animation variants
const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

// Layout configurations
const layoutConfig = {
    grid: {
        container: "flex flex-wrap gap-4 justify-between items-center",
        item: "w-full md:w-1/3 lg:w-[23%]",
    },
    list: {
        container: "flex flex-col gap-4",
        item: "w-full",
    },
    carousel: {
        container: "flex gap-4 overflow-x-auto pb-4",
        item: "flex-shrink-0 w-64",
    },
};

interface ProductGridProps {
    products: Product[];
    layout?: ProductCardLayout;
    cardSize?: ProductCardSize;
    showBadge?: boolean;
    showPrice?: boolean;
    showBuyButton?: boolean;
    enableGlow?: boolean;
    enableParticles?: boolean;
    animationIntensity?: AnimationIntensity;
    className?: string;
    onProductClick?: (product: Product) => void;
    enableAnimations?: boolean;
    staggerDelay?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    layout = "grid",
    cardSize = "md",
    showBadge = true,
    showPrice = true,
    showBuyButton = true,
    enableGlow = true,
    enableParticles = true,
    animationIntensity = "medium",
    className = "",
    onProductClick,
    enableAnimations = true,
    staggerDelay = 0.15,
}) => {
    const config = layoutConfig[layout];
    const isAnimated = enableAnimations && animationIntensity !== "none";

    return (
        <motion.div
            className={`${config.container} ${className}`}
            initial={isAnimated ? "hidden" : undefined}
            whileInView={isAnimated ? "visible" : undefined}
            viewport={{ once: false, margin: "-50px" }}
            variants={isAnimated ? containerVariants : undefined}
            transition={
                isAnimated
                    ? {
                        duration: 0.6,
                        ease: "easeInOut",
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1,
                    }
                    : undefined
            }
        >
            {products.map((product: Product) => (
                <div key={product.id} className={config.item}>
                    <ProductCard
                        product={product}
                        size={cardSize}
                        showBadge={showBadge}
                        showPrice={showPrice}
                        showBuyButton={showBuyButton}
                        enableGlow={enableGlow}
                        enableParticles={enableParticles}
                        animationIntensity={animationIntensity}
                        onProductClick={onProductClick}
                    />
                </div>
            ))}
        </motion.div>
    );
};

export default ProductGrid;
