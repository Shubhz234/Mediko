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
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { AIDoctor } from '@/shared/list'
import Image from 'next/image'
import { Crown, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Props = {
    isOpen: boolean
    onClose: () => void
    notes: string
}

const SelectDoctorDialog = ({ isOpen, onClose, notes }: Props) => {
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDoctorSelect = (doctorId: number) => {
        setSelectedDoctor(doctorId)
    }

    const handleStartConsultation = async () => {
        if (!selectedDoctor) return

        setLoading(true)
        try {
            const response = await axios.post('/api/session-chat', {
                notes,
                selectedDoctor
            })

            if (response.data.success) {
                router.push(`/dashboard/medical-agent/${response.data.sessionId}`)
                onClose()
            }
        } catch (error) {
            console.error('Error creating session:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Select a Doctor</DialogTitle>
                    <DialogDescription>
                        Choose a specialist doctor for your consultation
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                    {AIDoctor.map((doctor) => (
                        <div
                            key={doctor.id}
                            onClick={() => handleDoctorSelect(doctor.id)}
                            className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                                selectedDoctor === doctor.id
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="relative">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.specialist}
                                    width={200}
                                    height={150}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-md ${
                                    doctor.subscriptionRequired 
                                        ? 'bg-amber-100 text-amber-600 flex items-center gap-1' 
                                        : 'bg-green-100 text-green-600'
                                }`}>
                                    {doctor.subscriptionRequired ? (
                                        <>
                                            <Crown className="w-3 h-3" />
                                            Premium
                                        </>
                                    ) : 'Free'}
                                </span>
                            </div>
                            <h3 className="font-semibold text-sm mt-3">{doctor.specialist}</h3>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{doctor.description}</p>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                        onClick={handleStartConsultation}
                        disabled={!selectedDoctor || loading}
                        className="flex items-center gap-2"
                    >
                        {loading ? 'Starting...' : 'Start Consultation'}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SelectDoctorDialog