import { UserButton } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const menuOptions = [
  { id: 1, name: "Home", href: "/dashboard" },
  { id: 2, name: "History", href: "/dashboard/history" },
  { id: 3, name: "Pricing", href: "/dashboard/pricing" },
  { id: 4, name: "Profile", href: "/dashboard/profile" },
];

const AppHeader = () => {
  return (
    <div className='flex items-center justify-between p-4 md:p-6 shadow-lg bg-white/95 backdrop-blur-md dark:bg-gray-900/95 px-4 md:px-10 lg:px-20 xl:px-40 sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50'>
      <div className="flex items-center gap-3">
        <div className="size-10 md:size-12 rounded-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-lg flex items-center justify-center">
          <div className="size-5 md:size-6 rounded-full bg-white/90"></div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Mediko</h1>
      </div>
      <div className='hidden lg:flex gap-8 xl:gap-12 items-center'>
        {menuOptions.map((option, index) => (
          <Link key={index} href={option.href} className='hover:text-green-600 cursor-pointer transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 hover:scale-105'>
            <h2 className="text-sm md:text-base">{option.name}</h2>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-green-400 p-1 shadow-lg transition-transform hover:scale-105 bg-white dark:bg-gray-800">
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: 40,
                height: 40,
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default AppHeader