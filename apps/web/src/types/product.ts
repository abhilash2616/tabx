// Product data interface
export interface Product {
  id: number | string;
  name: string;
  price: number;
  currency: string;
  image: string;
  badge?: string | string[];
  href: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  glowColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
}

// Product card layout options
export type ProductCardLayout = "grid" | "list" | "carousel";

// Animation intensity options
export type AnimationIntensity = "low" | "medium" | "high" | "none";

// Product card size options
export type ProductCardSize = "sm" | "md" | "lg" | "xl";
