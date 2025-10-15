"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import HeaderText from "@/components/common/HeaderText";
import GlowingBackground, {
  HeaderGlow,
} from "@/components/common/GlowingBackground";
import Faq from "@/components/home/Faq";
import Review from "@/components/home/Review";
import Subscription from "@/components/home/Subscription";
import Statics from "@/components/home/Statics";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.section variants={sectionVariants}>
        <Hero />
      </motion.section>
      <motion.div variants={sectionVariants}>
        <GlowingBackground
          className="py-10 overflow-visible"
          variant="subtle"
          colorScheme="blue-black"
          animated={true}
          glowCount={3}
        >
          <div className="container mx-auto px-4 overflow-visible">
            <HeaderGlow
              className="mb-5"
              variant="subtle"
              colorScheme="blue-black"
              animated={true}
            >
              <HeaderText heading="Featured Products" />
              <p className="text-center font-light text-white">
                Browse our complete catalog
              </p>
            </HeaderGlow>
            <FeaturedProduct isLoading={isLoading} />
          </div>
        </GlowingBackground>
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <GlowingBackground
          className="py-10"
          variant="minimal"
          colorScheme="black-only"
          animated={true}
          glowCount={3}
        >
          <div className="container mx-auto px-4">
            <HeaderText heading="Our Store in statistics" />
          </div>
          <div>
            <Statics />
          </div>
        </GlowingBackground>
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <GlowingBackground
          className="py-10"
          variant="minimal"
          colorScheme="black-only"
          animated={true}
          glowCount={3}
        >
          <div className="container mx-auto px-4">
            <HeaderText heading="What Our Customers Say" />
            <p className="text-[16px] text-center text-muted-foreground max-w-2xl mb-4 mx-auto">
              Don't just take our word for it. Here's what our satisfied customers
              have to say about their experience with us.
            </p>
            <div className="">
              <Review />
            </div>
          </div>
        </GlowingBackground>
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <GlowingBackground
          className="py-10"
          variant="subtle"
          colorScheme="blue-black"
          animated={true}
          glowCount={3}
        >
          <div className="container mx-auto px-4">
            <HeaderGlow
              className="mb-5"
              variant="subtle"
              colorScheme="blue-black"
              animated={true}
            >
              <HeaderText heading="Choose Your Plan" />
              <p className="text-center font-light text-white">
                Flexible pricing for every need
              </p>
            </HeaderGlow>
            <Subscription />
          </div>
        </GlowingBackground>
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <GlowingBackground
          className="py-10"
          variant="minimal"
          colorScheme="black-only"
          animated={true}
          glowCount={3}
        >
          <div className="container mx-auto px-4">
            <HeaderText heading="Frequently Asked Questions" />
            <p className="text-[16px] text-center text-muted-foreground max-w-2xl mb-4 mx-auto">
              Everything you need to know about TabX. Can't find the answer you're
              looking for?
              <span className="text-primary font-medium">
                {" "}
                Contact our support team
              </span>
              .
            </p>
            <div className="">
              <Faq />
            </div>
          </div>
        </GlowingBackground>
      </motion.div>
    </motion.div>
  );
};

export default page;
