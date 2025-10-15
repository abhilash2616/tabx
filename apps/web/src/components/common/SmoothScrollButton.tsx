"use client";

import { Button } from "../ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface SmoothScrollButtonProps {
    targetId?: string;
    direction?: "up" | "down";
    className?: string;
    children?: React.ReactNode;
}

const SmoothScrollButton: React.FC<SmoothScrollButtonProps> = ({
    targetId,
    direction = "up",
    className = "",
    children,
}) => {
    const { scrollTo, scrollToTop, scrollY } = useSmoothScroll();

    const handleClick = () => {
        if (targetId) {
            scrollTo(targetId, 80); // 80px offset for header
        } else if (direction === "up") {
            scrollToTop();
        } else {
            // Scroll down by viewport height
            window.scrollTo({
                top: scrollY + window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    const getIcon = () => {
        if (children) return null;
        return direction === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
    };

    return (
        <Button
            onClick={handleClick}
            className={`transition-all duration-300 hover:scale-105 ${className}`}
            variant="outline"
            size="icon"
        >
            {children || getIcon()}
        </Button>
    );
};

export default SmoothScrollButton;
