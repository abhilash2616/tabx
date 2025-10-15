"use client";
import Link from "next/link";
import { Gamepad2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const socialIconVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const linkVariants = {
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
    },
  },
};

// Data arrays for better maintainability
const socialLinks = [
  { icon: Facebook, href: "#" as const, label: "Facebook" },
  { icon: Twitter, href: "#" as const, label: "Twitter" },
  { icon: Instagram, href: "#" as const, label: "Instagram" },
  { icon: Youtube, href: "#" as const, label: "YouTube" },
];

const quickLinks = [
  { href: "/" as const, label: "Home" },
  { href: "/products" as const, label: "Products" },
  { href: "/bundles" as const, label: "Bundles" },
  { href: "/subscriptions" as const, label: "Subscriptions" },
  { href: "/gifts" as const, label: "Gifts" },
];

const supportLinks = [
  { href: "/contact" as const, label: "Contact Us" },
  { href: "#" as const, label: "Help Center" },
  { href: "#" as const, label: "System Requirements" },
  { href: "#" as const, label: "Refund Policy" },
  { href: "#" as const, label: "Terms of Service" },
];

const contactInfo = [
  { icon: Mail, text: "support@tabx.com" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: MapPin, text: "San Francisco, CA" },
];

export default function Footer() {
  return (
    <motion.footer
      className="glass-nav dark:glass-nav-dark border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          variants={containerVariants}
        >
          {/* Company Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">TabX</span>
            </motion.div>
            <motion.p
              className="text-muted-foreground text-sm leading-relaxed"
              variants={itemVariants}
            >
              Your premium destination for the best games. Discover, download, and enjoy
              curated collections of exclusive titles across all platforms.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              variants={containerVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    asChild
                  >
                    <Link href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold"
              variants={itemVariants}
            >
              Quick Links
            </motion.h3>
            <motion.ul
              className="space-y-2"
              variants={containerVariants}
            >
              {quickLinks.map((link, index) => (
                <motion.li key={link.label} variants={itemVariants}>
                  <motion.div
                    whileHover="hover"
                    variants={linkVariants}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Support */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold"
              variants={itemVariants}
            >
              Support
            </motion.h3>
            <motion.ul
              className="space-y-2"
              variants={containerVariants}
            >
              {supportLinks.map((link, index) => (
                <motion.li key={link.label} variants={itemVariants}>
                  <motion.div
                    whileHover="hover"
                    variants={linkVariants}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold"
              variants={itemVariants}
            >
              Stay Updated
            </motion.h3>
            <motion.p
              className="text-muted-foreground text-sm"
              variants={itemVariants}
            >
              Subscribe to get the latest game releases and exclusive offers.
            </motion.p>
            <motion.div
              className="space-y-2"
              variants={itemVariants}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-9"
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="sm" type="submit" className="w-full text-white cursor-pointer">
                  Subscribe
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-2 pt-4"
              variants={containerVariants}
            >
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.text}
                  className="flex items-center space-x-2 text-sm text-muted-foreground"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <contact.icon className="h-4 w-4" />
                  <span>{contact.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t pt-8"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            variants={containerVariants}
          >
            <motion.div
              className="text-sm text-muted-foreground"
              variants={itemVariants}
            >
              © 2024 TabX. All rights reserved. |
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={"#"} className="hover:text-foreground transition-colors ml-1">
                  Privacy Policy
                </Link>
              </motion.span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4 text-sm text-muted-foreground"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span>Powered by</span>
              <div className="flex items-center space-x-1">
                <Github className="h-4 w-4" />
                <span>Next.js</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}



