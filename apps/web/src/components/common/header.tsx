"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ModeToggle from "../mode-toggle";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Gamepad2, User, ShoppingCart, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";

// Animated Search Component
function AnimatedSearch() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			console.log("Searching for:", searchQuery);
			// Add your search logic here
		}
	};

	const toggleSearch = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			// Focus the input when opening
			setTimeout(() => {
				const input = document.getElementById("search-input");
				input?.focus();
			}, 100);
		} else {
			setSearchQuery("");
		}
	};

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				setIsOpen(false);
				setSearchQuery("");
			}
			if (e.key === "/" && !isOpen && !e.ctrlKey && !e.metaKey) {
				e.preventDefault();
				setIsOpen(true);
				setTimeout(() => {
					const input = document.getElementById("search-input");
					input?.focus();
				}, 100);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	return (
		<div className="relative">
			{/* Search Button */}
			<Tooltip>
				<TooltipTrigger asChild>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleSearch}
							className="relative z-10"
						>
							<motion.div
								animate={{ rotate: isOpen ? 90 : 0 }}
								transition={{ duration: 0.2 }}
							>
								<Search className="h-5 w-5" />
							</motion.div>
						</Button>
					</motion.div>
				</TooltipTrigger>
				<TooltipContent side="bottom" sideOffset={5}>
					<p>Search games</p>
				</TooltipContent>
			</Tooltip>

			{/* Search Input */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, x: -20, width: 0 }}
						animate={{
							opacity: 1,
							x: 0,
							width: "280px"
						}}
						exit={{
							opacity: 0,
							x: -20,
							width: 0
						}}
						transition={{
							duration: 0.3,
							ease: "easeInOut"
						}}
						className="absolute right-0 top-0 z-20"
					>
						<form onSubmit={handleSearch} className="flex items-center">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.1 }}
								className="relative"
							>
								<Input
									id="search-input"
									type="text"
									placeholder="Search games... (Press / to focus)"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pr-8 h-9 glass dark:glass-dark border-border/50 focus:border-primary/50"
								/>
								<motion.button
									type="button"
									onClick={toggleSearch}
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<X className="h-3 w-3 text-muted-foreground" />
								</motion.button>
							</motion.div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	// Handle scroll effect with progressive blur
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setScrollY(scrollTop);
			setIsScrolled(scrollTop > 10);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Calculate blur intensity based on scroll distance
	const getBlurIntensity = () => {
		if (scrollY < 10) return "backdrop-blur-none";
		if (scrollY < 50) return "backdrop-blur-sm";
		if (scrollY < 100) return "backdrop-blur-md";
		return "backdrop-blur-lg";
	};

	// Calculate background opacity based on scroll distance
	const getBackgroundOpacity = () => {
		if (scrollY < 10) return "bg-transparent";
		if (scrollY < 50) return "bg-background/60 dark:bg-background/60";
		if (scrollY < 100) return "bg-background/80 dark:bg-background/80";
		return "bg-background/95 dark:bg-background/95";
	};

	return (
		<header
			className={`sticky top-0 z-50 w-full border-b glass-nav dark:glass-nav-dark transition-all duration-300 ${isScrolled
				? `${getBlurIntensity()} ${getBackgroundOpacity()} shadow-lg border-border/50`
				: "backdrop-blur-none bg-transparent"
				}`}
		>
			<div className="container mx-auto px-4 flex h-16 items-center justify-between">
				{/* Logo */}
				<motion.div
					className="flex items-center space-x-2"
					animate={{
						scale: isScrolled ? 0.95 : 1,
					}}
					transition={{ duration: 0.3, ease: "easeOut" }}
				>
					<Gamepad2 className="h-8 w-8 text-primary" />
					<Link href="/" className="text-2xl font-bold">
						TabX
					</Link>
				</motion.div>

				{/* Desktop Navigation */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>

						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md glass dark:glass-dark px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
									Home
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						{/* Bundles */}
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="/bundles" className="group inline-flex h-9 w-max items-center justify-center rounded-md glass dark:glass-dark px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
									Bundles
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						{/* Products */}
						<NavigationMenuItem>
							<NavigationMenuTrigger className="glass dark:glass-dark">Products</NavigationMenuTrigger>
							<NavigationMenuContent className="glass dark:glass-dark border-border/50">
								<div className="grid gap-3 p-4 md:w-[300px]">
									<NavigationMenuLink asChild>
										<Link href="/products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
											<div className="text-sm font-medium leading-none">All Products</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												Browse our complete catalog
											</p>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
											<div className="text-sm font-medium leading-none">New Releases</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												Latest games and updates
											</p>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
											<div className="text-sm font-medium leading-none">Top Rated</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												Highest rated games
											</p>
										</Link>
									</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						{/* Subscriptions */}
						<NavigationMenuItem>
							<NavigationMenuTrigger className="glass dark:glass-dark">Subscriptions</NavigationMenuTrigger>
							<NavigationMenuContent className="glass dark:glass-dark border-border/50">
								<div className="grid gap-3 p-4 md:w-[300px]">
									<NavigationMenuLink asChild>
										<Link href="/subscriptions" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
											<div className="text-sm font-medium leading-none">TabX Premium</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												Unlimited access to premium games
											</p>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
											<div className="text-sm font-medium leading-none">Family Plan</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												Share with up to 6 family members
											</p>
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
											<div className="text-sm font-medium leading-none">Student Plan</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												Special pricing for students
											</p>
										</Link>
									</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>

						{/* Gifts */}
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="/gifts" className="group inline-flex h-9 w-max items-center justify-center rounded-md glass dark:glass-dark px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
									Gifts
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						{/* Contact */}
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="/contact" className="group inline-flex h-9 w-max items-center justify-center rounded-md glass dark:glass-dark px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
									Contact
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right Side Actions */}
				<div className="flex items-center space-x-4">
					{/* Animated Search */}
					<AnimatedSearch />

					{/* Shopping Cart */}
					<Button variant="ghost" size="icon">
						<ShoppingCart className="h-5 w-5" />
					</Button>

					{/* User Account Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<User className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56 glass dark:glass-dark">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="#">Login</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Theme Toggle */}
					<ModeToggle />

					{/* Mobile Menu */}
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
