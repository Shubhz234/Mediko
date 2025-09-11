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
        <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-neutral-200/50 dark:border-neutral-700">
            <div className="relative">
                <Image
                    src={doctorAgent.image}
                    alt={doctorAgent.specialist}
                    width={400}
                    height={300}
                    className='w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105'
                />
                {/* subtle gradient overlay so text/badges are readable */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* subscription badge */}
                <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg ${doctorAgent.subscriptionRequired ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white flex items-center gap-1' : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'}`}>
                    {doctorAgent.subscriptionRequired ? (
                        <>
                            <Crown className='size-3'/>
                            Pro
                        </>
                    ) : 'Free'}
                </span>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100 mb-2">{doctorAgent.specialist}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed flex-grow">{doctorAgent.description}</p>

                <div className="mt-6 flex items-center gap-3">
                    <Button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        Consult Now <ArrowRight size={16} />
                    </Button>
                </div>
            </div>
        </article>
    )
}

export default DoctorAgentCard