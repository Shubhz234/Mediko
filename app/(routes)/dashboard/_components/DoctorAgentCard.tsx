import { Button } from '@/components/ui/button'
import { ArrowRight, Crown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export type doctorAgent = {
    id: number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId?: string,
    subscriptionRequired: boolean
}

type Props = {
    doctorAgent: doctorAgent
}


const DoctorAgentCard = ({ doctorAgent }: Props) => {
    return (
        <article className="bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group">
            <div className="relative">
                <Image
                    src={doctorAgent.image}
                    alt={doctorAgent.specialist}
                    width={400}
                    height={300}
                    className='w-full h-40 sm:h-48 md:h-52 object-cover transition-transform duration-300 group-hover:scale-105'
                />
                {/* subtle gradient overlay so text/badges are readable */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* subscription badge */}
                <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm ${doctorAgent.subscriptionRequired ? 'bg-amber-100/90 text-amber-700 border border-amber-200' : 'bg-green-100/90 text-green-700 border border-green-200'}`}>
                    {doctorAgent.subscriptionRequired ? (
                        <div className="flex items-center gap-1">
                            <Crown className='size-3'/>
                            <span>Pro</span>
                        </div>
                    ) : 'Free'}
                </span>
            </div>

            <div className="p-4 md:p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm md:text-base lg:text-lg text-gray-800 dark:text-gray-200 mb-2">{doctorAgent.specialist}</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">{doctorAgent.description}</p>

                <div className="mt-4 md:mt-5 flex items-center gap-3">
                    <Button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 md:py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg text-xs md:text-sm">
                        Consultation <ArrowRight size={14} className="md:size-4" />
                    </Button>
                </div>
            </div>
        </article>
    )
}

export default DoctorAgentCard