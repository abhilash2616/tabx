"use client";

import { useCallback, useEffect, useState } from "react";
import {
  scrollToElement,
  scrollToTop,
  scrollToPosition,
  accessibleScrollTo,
  getCurrentScrollPosition,
  isElementInViewport,
} from "@/lib/scroll-utils";

/**
 * Custom hook for smooth scrolling functionality
 */
export const useSmoothScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = getCurrentScrollPosition();
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll functions
  const scrollTo = useCallback((elementId: string, offset: number = 0) => {
    accessibleScrollTo(elementId, offset);
  }, []);

  const scrollToTopSmooth = useCallback(() => {
    scrollToTop();
  }, []);

  const scrollToPositionSmooth = useCallback((yPosition: number) => {
    scrollToPosition(yPosition);
  }, []);

  return {
    scrollY,
    isScrolled,
    scrollTo,
    scrollToTop: scrollToTopSmooth,
    scrollToPosition: scrollToPositionSmooth,
  };
};

/**
 * Hook to check if an element is in viewport
 */
export const useInViewport = (
  elementRef: React.RefObject<HTMLElement>,
  threshold: number = 0.1
) => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const checkInViewport = () => {
      if (elementRef.current) {
        setIsInViewport(isElementInViewport(elementRef.current, threshold));
      }
    };

    // Initial check
    checkInViewport();

    // Listen for scroll events
    window.addEventListener("scroll", checkInViewport, { passive: true });
    window.addEventListener("resize", checkInViewport, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkInViewport);
      window.removeEventListener("resize", checkInViewport);
    };
  }, [elementRef, threshold]);

  return isInViewport;
};
