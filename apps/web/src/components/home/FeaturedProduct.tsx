"use client";

import React from "react";
// @ts-ignore - Splide types issue
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import ProductCard from "../common/ProductCard";
import { featuredProducts } from "@/data/products";
import type { Product } from "@/types/product";

interface FeaturedProductProps {
  products?: Product[];
  title?: string;
  className?: string;
  onProductClick?: (product: Product) => void;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  products = featuredProducts,
  title = "Featured Products",
  className = "",
  onProductClick,
}) => {
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

  return (
    <div className={`${className} overflow-visible`}>
      <Splide 
        options={splideOptions} 
        className="w-full h-full overflow-visible"
      >
        {products.map((product) => (
          <SplideSlide key={product.id}>
            <div className="px-1 sm:px-2 overflow-visible">
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
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default FeaturedProduct;
