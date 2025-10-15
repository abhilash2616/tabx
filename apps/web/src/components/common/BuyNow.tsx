"use client"

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BuyNowButtonProps {
    text?: string;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

const BuyNowButton = ({
    text = "Buy Now",
    variant = "outline",
    size = "default",
    className,
    onClick,
    disabled = false,
    type = "button",
    href,
    target = "_self",
}: BuyNowButtonProps) => {
    const buttonContent = (
        <>
            {/* Cart Icon Container with expanding background */}
            <div className="absolute left-0 top-0 ml-1 bg-primary/10 p-[0.35rem] bottom-1 group-hover:w-[calc(100%-0.5rem)] transition-all rounded-full duration-300 h-12 w-12">
                <ShoppingCart className="h-full w-full text-primary" />
            </div>

            {/* Text */}
            <span className="relative z-10">{text}</span>
        </>
    );

    if (href) {
        return (
            <Link href={href as any} target={target} className="inline-block">
                <Button
                    variant={variant}
                    size={size}
                    className={cn(
                        "group relative overflow-hidden gap-3 px-6 py-3 font-medium transition-all duration-300 pl-[3rem] cursor-pointer",
                        "glass dark:glass-dark hover:scale-105 hover:shadow-lg",
                        className
                    )}
                    disabled={disabled}
                    type={type}
                >
                    {buttonContent}
                </Button>
            </Link>
        );
    }

    return (
        <Button
            variant={variant}
            size={size}
            className={cn(
                "group relative overflow-hidden gap-3 px-6 py-3 font-medium transition-all duration-300 pl-[5rem]",
                "glass dark:glass-dark hover:scale-105 hover:shadow-lg",
                className
            )}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {buttonContent}
        </Button>
    );
};

export default BuyNowButton;
