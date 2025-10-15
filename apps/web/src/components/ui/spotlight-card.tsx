import React, { useRef, useState } from 'react';

interface Position {
    x: number;
    y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
    className?: string;
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = '',
    spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState<number>(0.1);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
        if (!divRef.current || isFocused) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(0.6);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(0.8);
    };

    const handleMouseLeave = () => {
        setOpacity(0.2);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-out hover:scale-[1.02] ${className}`}
        >

            {/* Spotlight background effect - positioned behind content with proper clipping */}
            <div
                className="pointer-events-none absolute inset-0 transition-all duration-500 ease-in-out z-0 rounded-xl"
                style={{
                    opacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
                    transform: `scale(${opacity > 0.5 ? 1.1 : 1})`,
                    filter: `blur(${opacity > 0.5 ? '2px' : '0px'})`
                }}
            />

            {/* Floating particles effect on hover */}
            {opacity > 0.5 && (
                <>
                    <div
                        className="absolute w-1 h-1 rounded-full transition-all duration-1000 ease-out"
                        style={{
                            left: `${position.x + 20}px`,
                            top: `${position.y - 10}px`,
                            backgroundColor: spotlightColor.replace('0.25', '0.6'),
                            opacity: opacity * 0.8,
                            transform: `translateY(${opacity * 20}px) scale(${opacity})`
                        }}
                    />
                    <div
                        className="absolute w-0.5 h-0.5 rounded-full transition-all duration-1200 ease-out"
                        style={{
                            left: `${position.x - 15}px`,
                            top: `${position.y + 15}px`,
                            backgroundColor: spotlightColor.replace('0.25', '0.4'),
                            opacity: opacity * 0.6,
                            transform: `translateY(${opacity * -15}px) scale(${opacity * 1.2})`
                        }}
                    />
                    <div
                        className="absolute w-1.5 h-1.5 rounded-full transition-all duration-800 ease-out"
                        style={{
                            left: `${position.x + 5}px`,
                            top: `${position.y + 25}px`,
                            backgroundColor: spotlightColor.replace('0.25', '0.3'),
                            opacity: opacity * 0.4,
                            transform: `translateY(${opacity * 10}px) scale(${opacity * 0.8})`
                        }}
                    />
                </>
            )}

            {/* Card content positioned above the spotlight effect */}
            <div className="relative z-10 transition-transform duration-300 ease-out hover:translate-y-[-2px]">
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;
