"use client";

import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative mx-auto mb-10 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-green-200/50 via-green-400/80 to-green-200/50 dark:from-green-800/50 dark:via-green-600/80 dark:to-green-800/50">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-green-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-green-200/50 via-green-400/80 to-green-200/50 dark:from-green-800/50 dark:via-green-600/80 dark:to-green-800/50">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-green-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-green-200/50 via-green-400/80 to-green-200/50 dark:from-green-800/50 dark:via-green-600/80 dark:to-green-800/50">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      </div>
      <div className="px-4 py-8 md:py-16 lg:py-20 max-w-7xl mx-auto">
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-3xl font-bold text-slate-800 md:text-5xl lg:text-6xl xl:text-7xl dark:text-slate-100 capitalize leading-tight">
          {
            "Transform healthcare with Ai voice mediko agent"
              .split(" ")
              .map((word, index) =>
                word.toLowerCase() === "mediko" ? (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block bg-gradient-to-r from-green-500 via-green-600 to-green-800 bg-clip-text text-transparent relative"
                  >
                    {word}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-700 rounded-full"></div>
                  </motion.span>
                ) : (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                )
              )
          }
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-2xl py-6 text-center text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed"
        >
          Provide 24/7 intelligent support using conversational AI. Triage Symptoms, Book appointments, and deliver empathetic care with Voice First Automation Mediko.
        </motion.p>
        <Link href={'/sign-in'}>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-full sm:w-64 md:w-72 transform rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:from-green-700 hover:to-green-800 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-lg">
              Get Started
            </button>
          </motion.div>
        </Link>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-16 md:mt-20 rounded-3xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm p-4 md:p-6 shadow-2xl dark:border-neutral-700/50 dark:bg-neutral-800/80"
        >
          <div className="w-full overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-600/50 shadow-lg">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
      <FeatureBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser()
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200/50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 px-4 md:px-8 py-4 md:py-6 dark:border-neutral-700/50 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="size-8 md:size-10 rounded-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-lg flex items-center justify-center">
          <div className="size-4 md:size-5 rounded-full bg-white/90"></div>
        </div>
        <h1 className="text-xl font-bold md:text-3xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Mediko</h1>
      </div>
      {!user ?
        <Link href={'/sign-in'}>
          <button className="w-20 md:w-32 transform rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 md:px-6 py-2 md:py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:from-green-700 hover:to-green-800 text-sm md:text-base">
            Login
          </button>
        </Link> :
        <div className="flex items-center gap-3 md:gap-5">
          <Link href={'/dashboard'}>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-sm md:text-base px-4 md:px-6">Dashboard</Button>
          </Link>
          <div className="flex items-center justify-center rounded-full border-2 border-green-400 p-1 shadow-lg transition-transform hover:scale-105 bg-white dark:bg-gray-800" style={{ width: 44, height: 44 }}>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
          </div>
        </div>
      }
    </nav>
  );
};