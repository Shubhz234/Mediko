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

const AddNewSessionDialog = () => {
    const [note, setNote] = useState<string>()
    const [Loading, setLoading] = useState(false)
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>()
    const [SelectedDoctor, setSelectedDoctor] = useState<doctorAgent>()

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
        }

        setLoading(false)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className='mt-3'><PlusIcon />Start a Consultantion</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        {!suggestedDoctors
                            ? <div>
                                <h2>Add Symptoms or Any Other Details</h2>
                                <Textarea
                                    placeholder='Add Details Here...'
                                    className='h-[200px] mt-1'
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div> :
                            <div>
                                <h2>Select the Doctor</h2>
                                <div className='grid grid-cols-3 gap-5'>
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
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'} className='cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    {!suggestedDoctors ? <Button disabled={!note || Loading} className='cursor-pointer' onClick={() => onClickNext()}>
                        Next {Loading ? <Loader2 className='animate-spin' /> : <ArrowRight />} </Button>
                        : <Button disabled={Loading || !SelectedDoctor} className='cursor-pointer' onClick={() => onStartConsultation()}>Start Consultation
                            {Loading ? <Loader2 className='animate-spin' /> : <ArrowRight />}
                        </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddNewSessionDialog