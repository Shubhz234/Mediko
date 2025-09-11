"use client";

import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MedikoLogo from "@/context/MedikoLogo";
import { Stethoscope, Shield, Clock, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 w-full px-6 py-20 md:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 text-4xl md:text-6xl lg:text-8xl leading-tight"
        >
          Transform Healthcare with{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 bg-clip-text text-transparent drop-shadow-sm">
            AI Voice Mediko Agent
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-3xl text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium"
        >
          Experience the future of healthcare with our AI-powered voice assistant. 
          Get instant medical consultations, symptom analysis, and personalized care 
          recommendations available 24/7.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <Link href="/sign-in">
            <Button className="px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 border-0">
              Get Started
            </Button>
          </Link>
          <Link href="/learn-more">
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-emerald-200 bg-white/80 backdrop-blur-sm text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-[1.05] transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Stethoscope className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">10+</div>
            <div className="text-sm text-neutral-600">AI Specialists</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-teal-100 rounded-full">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">24/7</div>
            <div className="text-sm text-neutral-600">Available</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">100%</div>
            <div className="text-sm text-neutral-600">Secure</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">1000+</div>
            <div className="text-sm text-neutral-600">Users Helped</div>
          </div>
        </motion.div>
        {/* Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-24 mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 shadow-2xl dark:border-neutral-800 bg-white/50 backdrop-blur-sm p-2"
        >
          <img
            src="https://assets.aceternity.com/pro/aceternity-landing.webp"
            alt="Platform preview"
            className="aspect-[16/9] w-full object-cover rounded-2xl"
          />
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-6 py-16 w-full">
        <FeatureBentoGrid />
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/">
          <MedikoLogo />
        </Link>

        {/* Right side */}
        {!user ? (
          <Link href="/sign-in">
            <Button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Login
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="default" className="px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Dashboard
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: 40, height: 40 },
                },
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
