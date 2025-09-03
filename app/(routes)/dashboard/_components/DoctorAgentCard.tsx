import { Button } from '@/components/ui/button'
import { ArrowRight, Crown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type doctorAgent = {
    id: number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId: string,
    subscriptionRequired: boolean
}

type Props = {
    doctorAgent: doctorAgent
}


const DoctorAgentCard = ({ doctorAgent }: Props) => {
    return (
        <article className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden">
            <div className="relative">
                <Image
                    src={doctorAgent.image}
                    alt={doctorAgent.specialist}
                    width={400}
                    height={300}
                    className='w-full h-44 sm:h-56 object-cover'
                />
                {/* subtle gradient overlay so text/badges are readable */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* subscription badge */}
                <span className={`absolute top-3 left-3 text-[11px] font-medium px-2 py-1 rounded-md ${doctorAgent.subscriptionRequired ? 'rounded-full bg-white text-amber-500' : 'bg-green-600 text-white'}`}>
                    {doctorAgent.subscriptionRequired ? <Crown className='size-4'/> : 'Free'}
                </span>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-sm sm:text-base">{doctorAgent.specialist}</h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 line-clamp-3">{doctorAgent.description}</p>

                <div className="mt-4 flex items-center gap-3">
                    <Button className="flex-1 flex items-center justify-center gap-2">
                        Consultation <ArrowRight size={16} />
                    </Button>
                </div>
            </div>
        </article>
    )
}

export default DoctorAgentCard