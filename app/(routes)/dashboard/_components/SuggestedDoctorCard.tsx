import React from 'react'
import type { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'

type Props = {
    doctorAgent: doctorAgent,
    setSelectedDoctor: (d: doctorAgent) => void
    selectedDoctor?: doctorAgent | null
}

export const SuggestedDoctorCard = ({ doctorAgent, setSelectedDoctor, selectedDoctor }: Props) => {
    return (
        <div
            className={`flex flex-col items-center border rounded-2xl shadow-lg p-4 md:p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90
                 hover:border-green-500 dark:hover:border-green-400
                 ${selectedDoctor?.id === doctorAgent?.id ? 'border-green-500 dark:border-green-400 bg-green-50/50 dark:bg-green-900/20 shadow-xl' : 'border-gray-200 dark:border-gray-600'}`}
            onClick={() => setSelectedDoctor(doctorAgent)}
        >
            <Image
                src={doctorAgent?.image}
                alt={doctorAgent?.specialist}
                width={70}
                height={70}
                priority={true}
                className='w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-md'
            />
            <h2 className='font-bold text-sm md:text-base text-center mt-3 text-gray-800 dark:text-gray-200'>{doctorAgent?.specialist}</h2>
            <p className='text-xs md:text-sm text-center line-clamp-2 text-gray-600 dark:text-gray-400 mt-1'>{doctorAgent?.description}</p>
            {selectedDoctor?.id === doctorAgent?.id && (
                <div className="mt-2 w-2 h-2 bg-green-500 rounded-full"></div>
            )}
        </div>
    )
}
