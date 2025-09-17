"use client";

"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MedikoLogo from "@/context/MedikoLogo";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if the website is unlocked
    const unlocked = localStorage.getItem("mediko_unlocked");
    if (!unlocked) {
      router.push("/lock");
    } else {
      setIsUnlocked(true);
    }
  }, [router]);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 w-full px-6 py-16 md:py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 text-3xl md:text-5xl lg:text-7xl leading-tight"
        >
          Transform Healthcare with{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            AI Voice Mediko Agent
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
        >
          Provide 24/7 intelligent support using conversational AI. Triage
          symptoms, book appointments, and deliver empathetic care with
          voice-first automation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link href="/sign-in">
            <Button className="w-40 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-md hover:shadow-xl hover:scale-[1.05] transition-all duration-300 font-semibold">
              Get Started
            </Button>
          </Link>
          <Link href="/learn-more">
            <Button
              variant="outline"
              className="w-40 rounded-xl border-2 border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50 hover:scale-[1.05] transition-all duration-300 font-semibold dark:border-emerald-500 dark:bg-neutral-900 dark:text-emerald-400 dark:hover:bg-emerald-950"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-24 mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 shadow-xl dark:border-neutral-800"
        >
          <img
            src="https://assets.aceternity.com/pro/aceternity-landing.webp"
            alt="Platform preview"
            className="aspect-[16/9] w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-6 mt-32">
        <FeatureBentoGrid />
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/70 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <MedikoLogo />
        </Link>

        {/* Right side */}
        {!user ? (
          <Link href="/sign-in">
            <Button className="rounded-lg bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-white font-semibold">
              Login
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="default" className="rounded-lg bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-white font-semibold">
                Dashboard
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: 36, height: 36 },
                },
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
