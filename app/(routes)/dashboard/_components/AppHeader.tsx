"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MedikoLogo from "@/context/MedikoLogo";

const menuOptions = [
	{ id: 1, name: "Home", href: "/dashboard" },
	{ id: 2, name: "History", href: "/dashboard/history" },
	{ id: 3, name: "Pricing", href: "/dashboard/pricing" },
	{ id: 4, name: "Profile", href: "/dashboard/profile" },
];

const AppHeader = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12 lg:px-20">
				{/* Logo */}
				<Link href="/dashboard" className="flex items-center gap-2">
					<MedikoLogo />
				</Link>

				{/* Desktop Menu */}
				<nav className="hidden md:flex items-center gap-10">
					{menuOptions.map((option) => (
						<Link
							key={option.id}
							href={option.href}
							className="relative text-[15px] font-semibold text-slate-700 transition-all duration-300 hover:text-emerald-600 hover:scale-105"
						>
							{option.name}
						</Link>
					))}
				</nav>

				{/* Right Side */}
				<div className="flex items-center gap-4">
					{/* User Button (Desktop) */}
					<div className="hidden md:block">
						<UserButton
							appearance={{
								elements: {
									avatarBox: { width: 40, height: 40 },
								},
							}}
						/>
					</div>

					{/* Mobile Menu Toggle */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors duration-200"
					>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>
			</div>

			{/* Mobile Dropdown */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
						animate={{ opacity: 1, y: 0, scaleY: 1 }}
						exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="md:hidden border-t border-neutral-200/50 bg-white/90 backdrop-blur-xl origin-top shadow-lg"
					>
						<nav className="flex flex-col space-y-5 px-6 py-8">
							{menuOptions.map((option) => (
								<Link
									key={option.id}
									href={option.href}
									onClick={() => setIsOpen(false)}
									className="text-base font-semibold text-slate-700 hover:text-emerald-600 transition-colors duration-200"
								>
									{option.name}
								</Link>
							))}
							{/* User Button (Mobile) */}
							<div className="pt-4 border-t border-neutral-200">
								<UserButton
									appearance={{
										elements: {
											avatarBox: { width: 40, height: 40 },
										},
									}}
								/>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default AppHeader;
