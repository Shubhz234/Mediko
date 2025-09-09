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
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
      <Image src={"/logo.svg"} alt="Mediko Logo" width={180} height={50} />
      <div className='hidden md:flex gap-12 items-center'>
        {menuOptions.map((option, index) => (
          <Link key={index} href={option.href} className='hover:font-bold cursor-pointer transition-all'>
            <h2>{option.name}</h2>
          </Link>
        ))}
      </div>
      <UserButton />
    </div>
  )
}

export default AppHeader