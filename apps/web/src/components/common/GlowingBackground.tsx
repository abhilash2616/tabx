"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowingBackgroundProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "subtle" | "intense" | "minimal";
    colorScheme?: "blue-black" | "blue-only" | "black-only";
    animated?: boolean;
    glowCount?: 3 | 5 | 7;
}

const GlowingBackground: React.FC<GlowingBackgroundProps> = ({
    children,
    className,
    variant = "default",
    colorScheme = "blue-black",
    animated = true,
    glowCount = 2, // Reduced from 3 to 2 for better performance
}) => {

    // Color configurations based on theme - reduced opacity for subtlety
    const colorConfigs = {
        "blue-black": {
            primary: "bg-blue-500",
            secondary: "bg-black",
            gradient: "from-black/5 via-blue-500/5 to-black/5",
            headerGradient: "from-blue-500/20 via-black/15 to-blue-500/20",
        },
        "blue-only": {
            primary: "bg-blue-500",
            secondary: "bg-blue-400",
            gradient: "from-blue-500/3 via-blue-500/8 to-blue-500/3",
            headerGradient: "from-blue-500/15 via-blue-500/25 to-blue-500/15",
        },
        "black-only": {
            primary: "bg-black",
            secondary: "bg-gray-800",
            gradient: "from-black/3 via-gray-800/5 to-black/3",
            headerGradient: "from-black/10 via-gray-800/15 to-black/10",
        },
    };

    // Variant configurations - reduced opacity and smoother effects
    const variantConfigs = {
        default: {
            opacity: {
                primary: "/8",
                secondary: "/8",
                center: "/6",
                background: "/5",
                header: "/20",
            },
            blur: "blur-3xl",
            headerBlur: "blur-xl",
            animation: "animate-pulse",
        },
        subtle: {
            opacity: {
                primary: "/5",
                secondary: "/5",
                center: "/4",
                background: "/3",
                header: "/12",
            },
            blur: "blur-2xl",
            headerBlur: "blur-lg",
            animation: "animate-pulse",
        },
        intense: {
            opacity: {
                primary: "/12",
                secondary: "/12",
                center: "/10",
                background: "/8",
                header: "/25",
            },
            blur: "blur-3xl",
            headerBlur: "blur-2xl",
            animation: "animate-pulse",
        },
        minimal: {
            opacity: {
                primary: "/3",
                secondary: "/3",
                center: "/2",
                background: "/2",
                header: "/8",
            },
            blur: "blur-xl",
            headerBlur: "blur-md",
            animation: "animate-pulse",
        },
    };

    const colors = colorConfigs[colorScheme];
    const variantStyle = variantConfigs[variant];


    // Optimized glow orbs generation with memoization
    const generateGlowOrbs = React.useMemo(() => {
        const orbs = [];
        // Reduced positions array for better performance
        const positions = [
            { top: "top-1/4", left: "left-1/4", size: "w-80 h-80", delay: "" },
            { top: "bottom-1/4", left: "right-1/4", size: "w-64 h-64", delay: "delay-1000" },
            { top: "top-1/2", left: "left-1/2", size: "w-56 h-56", delay: "delay-500" },
        ];

        for (let i = 0; i < Math.min(glowCount, 3); i++) { // Limit to max 3 orbs
            const position = positions[i];
            const isPrimary = i % 2 === 0;
            const colorClass = isPrimary ? colors.primary : colors.secondary;
            const opacity = isPrimary ? variantStyle.opacity.primary : variantStyle.opacity.secondary;

            orbs.push(
                <div
                    key={i}
                    className={cn(
                        "absolute",
                        position.top,
                        position.left,
                        position.size,
                        colorClass + opacity,
                        "rounded-full",
                        variantStyle.blur,
                        animated && variantStyle.animation,
                        position.delay
                    )}
                />
            );
        }

        return orbs;
    }, [glowCount, colors.primary, colors.secondary, variantStyle.opacity.primary, variantStyle.opacity.secondary, variantStyle.blur, variantStyle.animation, animated]);


    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Animated gradient background */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    colors.gradient,
                    animated && "animate-pulse"
                )}
            />

            {/* Glow orbs */}
            {generateGlowOrbs}

            {/* Content with proper z-index */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

// Header glow component for titles
interface HeaderGlowProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "subtle" | "intense" | "minimal";
    colorScheme?: "blue-black" | "blue-only" | "black-only";
    animated?: boolean;
    width?: string;
    height?: string;
}

export const HeaderGlow: React.FC<HeaderGlowProps> = ({
    children,
    className,
    variant = "default",
    colorScheme = "blue-black",
    animated = true,
    width = "w-[300px]",
    height = "h-20",
}) => {
    const colorConfigs = {
        "blue-black": {
            gradient: "from-blue-500/15 via-black/10 to-blue-500/8",
        },
        "blue-only": {
            gradient: "from-blue-500/15 via-blue-500/25 to-blue-500/15",
        },
        "black-only": {
            gradient: "from-black/10 via-gray-800/15 to-black/10",
        },
    };

    const variantConfigs = {
        default: { headerBlur: "blur-xl", headerOpacity: "/20" },
        subtle: { headerBlur: "blur-lg", headerOpacity: "/12" },
        intense: { headerBlur: "blur-2xl", headerOpacity: "/25" },
        minimal: { headerBlur: "blur-md", headerOpacity: "/8" },
    };

    const colors = colorConfigs[colorScheme];
    const variantStyle = variantConfigs[variant];

    return (
        <div className={cn("flex flex-col justify-center items-center relative", className)}>
            <div
                className={cn(
                    "bg-gradient-to-r",
                    colors.gradient,
                    variantStyle.headerBlur,
                    width,
                    height,
                    "absolute top-0 left-[50%] -translate-x-1/2 z-1",
                    animated && "animate-pulse"
                )}
            />
            {children}
        </div>
    );
};

export default GlowingBackground;
