"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ModeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);


	// Prevent hydration mismatch by only rendering after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Don't render until mounted to prevent hydration mismatch
	if (!mounted) {
		return (
			<div className="flex items-center p-[3px] border border-solid rounded-full overflow-hidden w-[42px] h-[42px]">
				<div className="w-[36px] h-[36px] flex items-center justify-center">
					<Sun className="w-4 h-4" />
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className="flex items-center p-[3px] border border-solid rounded-full overflow-hidden w-[42px] h-[42px]"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{
				opacity: 1,
				scale: 1
			}}
			transition={{
				opacity: { duration: 0.3, ease: "easeOut" },
				scale: { duration: 0.3, ease: "easeOut" }
			}}
		>
			<code className="sr-only hidden tracking-wide select-none pointer-events-none">⌘+J</code>


			{/* Current Theme Button - Center (Always Visible) */}
			<motion.button
				onClick={() => {
					// Cycle through themes: light -> dark -> light
					if (theme === "light") setTheme("dark");
					else setTheme("light");
				}}
				className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:36px] p-0.5 rounded-full cursor-pointer"
				aria-label={theme === "light" ? "light" : "dark"}
				type="button"
				initial={{ opacity: 1, scale: 1 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={theme}
						initial={{ scale: 0.8, opacity: 0.7 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0.7 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						{theme === "light" ? (
							<Sun className="w-4 h-4" />
						) : (
							<Moon className="w-4 h-4" />
						)}
					</motion.div>
				</AnimatePresence>
			</motion.button>

		</motion.div>
	);
}

export default ModeToggle;
