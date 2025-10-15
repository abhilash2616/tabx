/**
 * Smooth scroll utilities for enhanced user experience
 */

/**
 * Smoothly scroll to a specific element by ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 0)
 */
export const scrollToElement = (
  elementId: string,
  offset: number = 0
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

/**
 * Smoothly scroll to the top of the page
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Smoothly scroll to a specific Y position
 * @param yPosition - The Y position to scroll to
 */
export const scrollToPosition = (yPosition: number): void => {
  window.scrollTo({
    top: yPosition,
    behavior: "smooth",
  });
};

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Smoothly scroll with respect to user's motion preferences
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 0)
 */
export const accessibleScrollTo = (
  elementId: string,
  offset: number = 0
): void => {
  if (prefersReducedMotion()) {
    // Instant scroll for users who prefer reduced motion
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "auto" });
    }
  } else {
    // Smooth scroll for users who don't mind motion
    scrollToElement(elementId, offset);
  }
};

/**
 * Get current scroll position
 * @returns Current scroll Y position
 */
export const getCurrentScrollPosition = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

/**
 * Check if element is in viewport
 * @param element - The element to check
 * @param threshold - Percentage of element that needs to be visible (0-1)
 * @returns boolean indicating if element is in viewport
 */
export const isElementInViewport = (
  element: HTMLElement,
  threshold: number = 0.1
): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
};
