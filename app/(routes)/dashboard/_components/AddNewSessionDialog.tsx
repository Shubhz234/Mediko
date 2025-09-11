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
                <Button className='px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                    <PlusIcon className="mr-2" />
                    Start a Consultation
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-800">Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        {!suggestedDoctors
                            ? <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-slate-700">Describe your symptoms or health concerns</h2>
                                <Textarea
                                    placeholder='Please describe your symptoms, concerns, or any other relevant details here...'
                                    className='h-[200px] mt-2 rounded-xl border-neutral-300 focus:border-emerald-500 focus:ring-emerald-500'
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div> :
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-slate-700">Select the most suitable specialist</h2>
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
                        <Button variant={'outline'} className='cursor-pointer px-6 py-2.5 rounded-xl'>Cancel</Button>
                    </DialogClose>
                    {!suggestedDoctors ? 
                        <Button 
                            disabled={!note || Loading} 
                            className='cursor-pointer px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl font-semibold' 
                            onClick={() => onClickNext()}
                        >
                            {Loading ? <Loader2 className='animate-spin mr-2' /> : <ArrowRight className="mr-2" />}
                            Next
                        </Button>
                        : 
                        <Button 
                            disabled={Loading || !SelectedDoctor} 
                            className='cursor-pointer px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl font-semibold' 
                            onClick={() => onStartConsultation()}
                        >
                            {Loading ? <Loader2 className='animate-spin mr-2' /> : <ArrowRight className="mr-2" />}
                            Start Consultation
                        </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddNewSessionDialog