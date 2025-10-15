import React, { useRef, useState, useCallback, useMemo } from 'react';

interface Position {
    x: number;
    y: number;
}

interface GlowingSpotlightCardProps extends React.PropsWithChildren {
    className?: string;
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
    glowColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
    intensity?: 'low' | 'medium' | 'high';
    enableParticles?: boolean;
    enableGlow?: boolean;
}

const GlowingSpotlightCard: React.FC<GlowingSpotlightCardProps> = ({
    children,
    className = '',
    spotlightColor = 'rgba(0, 125, 252, 0.3)',
    glowColor = 'rgba(0, 125, 252, 0.2)',
    intensity = 'medium',
    enableParticles = false, // Disabled by default for performance
    enableGlow = true
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [spotlightOpacity, setSpotlightOpacity] = useState<number>(0.1);
    const [glowOpacity, setGlowOpacity] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Memoized intensity configurations
    const intensityConfig = useMemo(() => ({
        low: { spotlight: 0.3, glow: 0.4, particles: 0.6 },
        medium: { spotlight: 0.6, glow: 0.7, particles: 0.8 },
        high: { spotlight: 0.9, glow: 1.0, particles: 1.0 }
    }), []);

    const config = intensityConfig[intensity];

    // Optimized mouse move handler with throttling
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, [isFocused]);

    // Optimized event handlers with useCallback
    const handleFocus = useCallback(() => {
        setIsFocused(true);
        setSpotlightOpacity(config.spotlight);
        setGlowOpacity(config.glow * 1.1);
    }, [config.spotlight, config.glow]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        setSpotlightOpacity(0);
        setGlowOpacity(0);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        setSpotlightOpacity(config.spotlight);
        setGlowOpacity(config.glow * 1.2);
    }, [config.spotlight, config.glow]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setSpotlightOpacity(0.1);
        setGlowOpacity(0);
    }, []);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-visible rounded-xl transition-all duration-500 ease-out ${className}`}
        >
            {/* Glow effect - outer ring */}
            {enableGlow && (
                <div
                    className="pointer-events-none absolute -inset-2 transition-all duration-700 ease-in-out z-0 rounded-xl"
                    style={{
                        opacity: glowOpacity,
                        background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
                        filter: `blur(${glowOpacity > 0.5 ? '8px' : '4px'})`,
                        transform: `scale(${glowOpacity > 0.5 ? 1.05 : 1})`
                    }}
                />
            )}

            {/* Spotlight background effect */}
            <div
                className="pointer-events-none absolute inset-0 transition-all duration-500 ease-in-out z-0 rounded-xl"
                style={{
                    opacity: spotlightOpacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
                    transform: `scale(${spotlightOpacity > 0.5 ? 1.1 : 1})`,
                    filter: `blur(${spotlightOpacity > 0.5 ? '2px' : '0px'})`
                }}
            />

            {/* Simplified particles effect - only 2 particles for performance */}
            {enableParticles && (spotlightOpacity > 0.5 || glowOpacity > 0.5) && (
                <>
                    {/* Primary particle */}
                    <div
                        className="absolute w-1 h-1 rounded-full transition-all duration-1000 ease-out"
                        style={{
                            left: `${position.x + 20}px`,
                            top: `${position.y - 10}px`,
                            backgroundColor: spotlightColor.replace(/[\d.]+\)$/, `${config.particles})`),
                            opacity: (spotlightOpacity + glowOpacity) * 0.6,
                            transform: `translateY(${(spotlightOpacity + glowOpacity) * 15}px) scale(${spotlightOpacity + glowOpacity})`,
                        }}
                    />
                    {/* Secondary particle */}
                    <div
                        className="absolute w-0.5 h-0.5 rounded-full transition-all duration-1200 ease-out"
                        style={{
                            left: `${position.x - 15}px`,
                            top: `${position.y + 15}px`,
                            backgroundColor: glowColor.replace(/[\d.]+\)$/, `${config.particles * 0.7})`),
                            opacity: (spotlightOpacity + glowOpacity) * 0.4,
                            transform: `translateY(${(spotlightOpacity + glowOpacity) * -10}px) scale(${(spotlightOpacity + glowOpacity) * 1.1})`,
                        }}
                    />
                </>
            )}

            {/* Card content positioned above all effects */}
            <div className="relative z-10 transition-transform duration-300 ease-out">
                {children}
            </div>

            {/* Simplified border glow - single border for performance */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl border transition-all duration-500"
                style={{
                    borderColor: glowColor.replace(/[\d.]+\)$/, `${Math.max(glowOpacity, spotlightOpacity) * 0.6})`),
                    opacity: Math.max(glowOpacity, spotlightOpacity) * 0.6,
                }}
            />
        </div>
    );
};

export default GlowingSpotlightCard;
