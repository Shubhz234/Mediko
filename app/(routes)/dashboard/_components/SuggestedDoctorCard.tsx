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
            className={`flex flex-col items-center border rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                 ${selectedDoctor?.id === doctorAgent?.id 
                    ? 'border-emerald-500 bg-emerald-50 shadow-emerald-200' 
                    : 'border-neutral-200 hover:border-emerald-300 bg-white'}`}
            onClick={() => setSelectedDoctor(doctorAgent)}
        >
            <Image
                src={doctorAgent?.image}
                alt={doctorAgent?.specialist}
                width={70}
                height={70}
                priority={true}
                className='w-[60px] h-[60px] rounded-full object-cover mb-3 border-2 border-white shadow-md'
            />
            <h2 className='font-bold text-sm text-center text-slate-800 mb-2'>{doctorAgent?.specialist}</h2>
            <p className='text-xs text-center line-clamp-2 text-neutral-600 leading-relaxed'>{doctorAgent?.description}</p>
        </div>
    )
}
