'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Loader2, Plus, PlusIcon } from 'lucide-react'
import axios from 'axios'
import { doctorAgent } from './DoctorAgentCard'
import { SuggestedDoctorCard } from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'

const AddNewSessionDialog = () => {
    const [note, setNote] = useState<string>()
    const [Loading, setLoading] = useState(false)
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>()
    const [SelectedDoctor, setSelectedDoctor] = useState<doctorAgent>()
    const router = useRouter();

    const onClickNext = async () => {
        setLoading(true)
        const result = await axios.post('/api/suggest-doctor', {
            notes: note
        });

        console.log(result.data)
        setSuggestedDoctors(result.data)
        setLoading(false)
    }

    const onStartConsultation = async () => {
        //save all info to db
        setLoading(true)
        const result = await axios.post('/api/session-chat', {
            notes: note,
            selectedDoctor: SelectedDoctor
        });

        console.log(result.data)
        if (result.data?.sessionId) {
            console.log(result.data.sessionId)
            // routes to conversation screen
            router.push('/dashboard/medical-agent/' + result.data.sessionId)
        }

        setLoading(false)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className='bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base'>
                    <PlusIcon className="mr-2 size-4 md:size-5" />
                    Start a Consultation
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50">
                <DialogHeader>
                    <DialogTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        {!suggestedDoctors
                            ? <div className="space-y-4">
                                <h2 className="text-gray-700 dark:text-gray-300 font-medium">Describe your symptoms or health concerns</h2>
                                <Textarea
                                    placeholder='Please describe your symptoms, concerns, or any other relevant details...'
                                    className='h-[200px] mt-2 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 rounded-xl'
                                    onChange={(e) => setNote(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400">This information helps us recommend the most suitable specialist for your consultation.</p>
                            </div> :
                            <div className="space-y-4">
                                <h2 className="text-gray-700 dark:text-gray-300 font-medium">Select the recommended specialist</h2>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                    {suggestedDoctors.map((doctor, index) => (
                                        <SuggestedDoctorCard
                                            doctorAgent={doctor}
                                            setSelectedDoctor={() => setSelectedDoctor(doctor)}
                                            //@ts-ignore
                                            selectedDoctor={SelectedDoctor}
                                            key={index} />
                                    ))}
                                </div>
                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-3">
                    <DialogClose>
                        <Button variant={'outline'} className='cursor-pointer border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'>Cancel</Button>
                    </DialogClose>
                    {!suggestedDoctors ? 
                        <Button 
                            disabled={!note || Loading} 
                            className='cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-xl' 
                            onClick={() => onClickNext()}
                        >
                            Next {Loading ? <Loader2 className='animate-spin ml-2 size-4' /> : <ArrowRight className="ml-2 size-4" />}
                        </Button>
                        : 
                        <Button 
                            disabled={Loading || !SelectedDoctor} 
                            className='cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-xl' 
                            onClick={() => onStartConsultation()}
                        >
                            Start Consultation
                            {Loading ? <Loader2 className='animate-spin ml-2 size-4' /> : <ArrowRight className="ml-2 size-4" />}
                        </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddNewSessionDialog