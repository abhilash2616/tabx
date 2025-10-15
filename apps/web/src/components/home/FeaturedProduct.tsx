"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
// @ts-ignore - Splide types issue
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import ProductCard from "../common/ProductCard";
import ProductCardSkeleton from "../common/ProductCardSkeleton";
import { featuredProducts } from "@/data/products";
import type { Product } from "@/types/product";


interface FeaturedProductProps {
  products?: Product[];
  title?: string;
  className?: string;
  onProductClick?: (product: Product) => void;
  isLoading?: boolean;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  products = featuredProducts,
  title = "Featured Products",
  className = "",
  onProductClick,
  isLoading = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [forceRender, setForceRender] = React.useState(0);

  // Force re-render when loading state changes
  React.useEffect(() => {
    if (!isLoading) {
      setForceRender(prev => prev + 1);
    }
  }, [isLoading, products]);

  // Splide options for responsive carousel
  const splideOptions = {
    type: "loop",
    perPage: 4,
    perMove: 1,
    gap: "1rem",
    padding: "1rem",
    breakpoints: {
      1024: {
        perPage: 3,
        gap: "0.75rem",
        padding: "0.75rem",
      },
      768: {
        perPage: 2,
        gap: "0.5rem",
        padding: "0.5rem",
      },
      640: {
        perPage: 1,
        gap: "0.25rem",
        padding: "0.25rem",
      },
    },
    pagination: true,
    arrows: false,
    drag: true,
    keyboard: true,
    autoplay: true,
    interval: 1000,
    pauseOnHover: true,
    resetProgress: false,
    height: "auto",
    focus: "center",
    trimSpace: false,
    classes: {
      pagination: 'splide__pagination splide__pagination--custom',
      page: 'splide__pagination__page splide__pagination__page--custom',
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const slideVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Simple conditional rendering approach
  if (isLoading) {
    return (
      <motion.div 
        key="featured-products-skeleton"
        ref={ref}
        className={`${className} overflow-visible`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          variants={slideVariants}
          className="w-full h-full overflow-visible"
        >
          <Splide 
            options={splideOptions} 
            className="w-full h-full overflow-visible"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <SplideSlide key={`skeleton-${index}`}>
                <motion.div 
                  className="px-1 sm:px-2 overflow-visible"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCardSkeleton
                    size="md"
                    showBadge={true}
                    showPrice={true}
                    showBuyButton={true}
                    enableGlow={true}
                    animationIntensity="low"
                    className="w-full h-full"
                  />
                </motion.div>
              </SplideSlide>
            ))}
          </Splide>
        </motion.div>
      </motion.div>
    );
  }

  // Render actual products
  return (
    <motion.div 
      key={`featured-products-${forceRender}`}
      ref={ref}
      className={`${className} overflow-visible`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        variants={slideVariants}
        className="w-full h-full overflow-visible"
        key={`products-${forceRender}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Splide 
          options={splideOptions} 
          className="w-full h-full overflow-visible"
        >
          {(products && products.length > 0 ? products : featuredProducts).map((product, index) => (
            <SplideSlide key={product.id}>
              <motion.div 
                className="px-1 sm:px-2 overflow-visible"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <ProductCard
                  product={product}
                  size="md"
                  showBadge={true}
                  showPrice={true}
                  showBuyButton={true}
                  enableGlow={true}
                  enableParticles={false}
                  animationIntensity="low"
                  onProductClick={onProductClick}
                  className="w-full h-full"
                />
              </motion.div>
            </SplideSlide>
          ))}
        </Splide>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedProduct;
