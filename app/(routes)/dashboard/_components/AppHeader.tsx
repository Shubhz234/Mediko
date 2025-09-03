import { UserButton } from '@clerk/nextjs';
import { div } from 'motion/react-client';
import Image from 'next/image'
import React from 'react'

const menuOptions = [
  { id:1, name: "Home", href: "/home" },
  { id:2, name: "History", href: "/history" },
  { id:3, name: "Pricing", href: "/pricing" },
  { id:4, name: "Profile", href: "/profile" },
];

const AppHeader = () => {
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
      <Image src={"/logo.svg"} alt="Mediko Logo" width={190} height={50} />
      <div className='hidden md:flex gap-12 items-center'>
        {menuOptions.map((option,index) => (
          <div key={index}>
            <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
          </div>
        ))}
      </div>
      <UserButton/>
    </div>
  )
}

export default AppHeader