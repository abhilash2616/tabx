// Simple Black & Blue Color Configuration
export const colors = {
  // Primary colors (Black)
  primary: {
    main: "#000000", // Pure black
    light: "#333333", // Dark gray
    dark: "#000000", // Pure black
    contrast: "#ffffff", // White text on black
  },

  // Secondary colors (Blue)
  secondary: {
    main: "#007dfc", // Bright blue
    light: "#4da6ff", // Light blue
    dark: "#0056b3", // Dark blue
    contrast: "#ffffff", // White text on blue
  },

  // Background gradients
  background: {
    light:
      "linear-gradient(135deg, rgba(0, 125, 252, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)",
    dark: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 125, 252, 0.1) 100%)",
  },

  // Glassmorphism colors
  glass: {
    light: "rgba(0, 125, 252, 0.1)", // Light blue glass
    dark: "rgba(0, 0, 0, 0.3)", // Dark glass
  },

  // Shimmer colors
  shimmer: {
    light:
      "linear-gradient(90deg, transparent, rgba(0, 125, 252, 0.3), transparent)",
    dark: "linear-gradient(90deg, transparent, rgba(0, 125, 252, 0.2), transparent)",
  },
};

// Apply colors to CSS variables
export const applyColors = (): void => {
  const root = document.documentElement;

  // Set CSS variables
  root.style.setProperty("--color-primary", colors.primary.main);
  root.style.setProperty("--color-secondary", colors.secondary.main);
  root.style.setProperty("--color-bg-light", colors.background.light);
  root.style.setProperty("--color-bg-dark", colors.background.dark);
  root.style.setProperty("--color-glass-light", colors.glass.light);
  root.style.setProperty("--color-glass-dark", colors.glass.dark);
  root.style.setProperty("--color-shimmer-light", colors.shimmer.light);
  root.style.setProperty("--color-shimmer-dark", colors.shimmer.dark);

  // Update body background
  const isDark = document.documentElement.classList.contains("dark");
  document.body.style.background = isDark
    ? colors.background.dark
    : colors.background.light;
};
