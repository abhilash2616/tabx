"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const accordionItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Faq = () => {
  const faqData = [
    {
      question: "What is TabX and how does it work?",
      answer: "TabX is a revolutionary browser extension that enhances your browsing experience by providing intelligent tab management, productivity features, and seamless integration with your workflow. It automatically organizes your tabs, provides quick access to frequently visited sites, and helps you stay focused and productive."
    },
    {
      question: "Is TabX free to use?",
      answer: "Yes! TabX offers a free tier with essential features including basic tab management, bookmark organization, and productivity tools. We also offer premium plans with advanced features like AI-powered suggestions, unlimited sync across devices, and priority support."
    },
    {
      question: "How do I install TabX?",
      answer: "Installing TabX is simple! Just visit our download page, click the 'Add to Browser' button, and follow the installation prompts. TabX is available for Chrome, Firefox, Safari, and Edge browsers. The entire process takes less than 2 minutes."
    },
    {
      question: "Does TabX work across different devices?",
      answer: "Absolutely! TabX syncs seamlessly across all your devices. Whether you're using your laptop, desktop, tablet, or phone, your tabs, bookmarks, and settings will be synchronized in real-time. Just sign in with your account on any device to access your data."
    },
    {
      question: "Is my data secure with TabX?",
      answer: "Security is our top priority. TabX uses end-to-end encryption to protect your data. We never store your browsing history or personal information on our servers. All data is encrypted locally on your device and only synced securely between your authorized devices."
    },
    {
      question: "Can I customize TabX to match my workflow?",
      answer: "Yes! TabX is highly customizable. You can create custom tab groups, set up automated rules for tab organization, choose from various themes, and configure shortcuts that work best for your specific workflow. Our settings panel gives you complete control over your experience."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide comprehensive support through multiple channels. Free users get access to our knowledge base and community forum. Premium users receive priority email support, live chat assistance, and direct access to our development team for feature requests and bug reports."
    },
    {
      question: "Can I use TabX with my existing bookmarks?",
      answer: "Definitely! TabX seamlessly integrates with your existing bookmarks. You can import all your current bookmarks, organize them with our enhanced categorization system, and even convert frequently used bookmarks into quick-access tabs. The transition is smooth and preserves all your existing data."
    }
  ]

  return (
    <motion.section 
      className="py-4 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="w-[90%] mx-auto">

        {/* FAQ Accordion */}
        <motion.div 
          className=""
          variants={itemVariants}
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                variants={accordionItemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border border-primary/10 rounded-lg px-6 py-2 glass-card dark:glass-card-dark"
                >
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-2 hover:cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Faq