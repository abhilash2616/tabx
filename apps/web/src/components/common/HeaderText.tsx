"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface HeaderTextProps {
  textalign?: string;
  heading: string;
  textcolor?: string;
  className?: string;
}

const HeaderText = ({
  textalign = "text-center",
  heading,
  textcolor,
  className = "",
}: HeaderTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={textVariants}
      className={`
      text-xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-2
      ${textalign} 
      ${className}
    `}
    >
      {heading}
    </motion.h2>
  );
};

export default HeaderText;
