"use client";

import { useTheme } from "next-themes";
import { Sun, Monitor, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ModeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch by only rendering after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Don't render until mounted to prevent hydration mismatch
	if (!mounted) {
		return (
			<div className="flex items-center p-[3px] border border-solid border-zinc-500 dark:border-zinc-400 rounded-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden w-[42px] h-[42px]">
				<div className="w-[36px] h-[36px] flex items-center justify-center">
					<Monitor className="w-4 h-4 text-zinc-500" />
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className="flex items-center p-[3px] border border-solid border-zinc-500 dark:border-zinc-400 rounded-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{
				opacity: 1,
				scale: 1,
				width: isExpanded ? 126 : 42
			}}
			transition={{
				width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
				opacity: { duration: 0.3, ease: "easeOut" },
				scale: { duration: 0.3, ease: "easeOut" }
			}}
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
		>
			<code className="sr-only hidden tracking-wide select-none pointer-events-none">⌘+J</code>

			{/* Light Mode Button */}
			<AnimatePresence>
				{isExpanded && (
					<motion.button
						onClick={() => setTheme("light")}
						className={`inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:36px] p-0.5 rounded-full cursor-pointer ${theme === "light"
							? "bg-zinc-600/30 text-black dark:text-white"
							: "text-zinc-500 hover:text-black dark:hover:text-white"
							}`}
						aria-label="light"
						type="button"
						initial={{ x: -30, opacity: 0, scale: 0.7 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: -30, opacity: 0, scale: 0.7 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
							delay: 0.1
						}}
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={theme === "light" ? "active" : "inactive"}
								initial={{ rotate: 0, scale: 0.8 }}
								animate={{ rotate: theme === "light" ? 360 : 0, scale: 1 }}
								exit={{ rotate: -180, scale: 0.8 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								<Sun className="w-4 h-4" />
							</motion.div>
						</AnimatePresence>
					</motion.button>
				)}
			</AnimatePresence>

			{/* System Mode Button - Center (Always Visible) */}
			<motion.button
				onClick={() => setTheme("system")}
				className={`inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:36px] p-0.5 rounded-full cursor-pointer ${theme === "system"
					? "bg-zinc-600/30 text-black dark:text-white"
					: "text-zinc-500 hover:text-black dark:hover:text-white"
					}`}
				aria-label="system"
				type="button"
				initial={{ opacity: 1, scale: 1 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={theme === "system" ? "active" : "inactive"}
						initial={{ scale: 0.8, opacity: 0.7 }}
						animate={{ scale: theme === "system" ? 1.1 : 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0.7 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<Monitor className="w-4 h-4" />
					</motion.div>
				</AnimatePresence>
			</motion.button>

			{/* Dark Mode Button */}
			<AnimatePresence>
				{isExpanded && (
					<motion.button
						onClick={() => setTheme("dark")}
						className={`inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:36px] p-0.5 rounded-full cursor-pointer ${theme === "dark"
							? "bg-zinc-600/30 text-black dark:text-white"
							: "text-zinc-500 hover:text-black dark:hover:text-white"
							}`}
						aria-label="dark"
						type="button"
						initial={{ x: 30, opacity: 0, scale: 0.7 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: 30, opacity: 0, scale: 0.7 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
							delay: 0.2
						}}
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={theme === "dark" ? "active" : "inactive"}
								initial={{ rotate: 0, scale: 0.8 }}
								animate={{ rotate: theme === "dark" ? -360 : 0, scale: 1 }}
								exit={{ rotate: 180, scale: 0.8 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								<Moon className="w-4 h-4" />
							</motion.div>
						</AnimatePresence>
					</motion.button>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default ModeToggle;
