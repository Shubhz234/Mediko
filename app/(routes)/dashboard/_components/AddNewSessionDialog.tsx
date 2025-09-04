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
import { ArrowRight } from 'lucide-react'
import SelectDoctorDialog from './SelectDoctorDialog'

const AddNewSessionDialog = () => {
    const [note, setNote] = useState<string>('')
    const [showDoctorDialog, setShowDoctorDialog] = useState(false)
    const [showInitialDialog, setShowInitialDialog] = useState(false)

    const handleNext = () => {
        setShowInitialDialog(false)
        setShowDoctorDialog(true)
    }

    const handleCloseDoctorDialog = () => {
        setShowDoctorDialog(false)
        setNote('')
    }

    return (
        <>
        <Dialog open={showInitialDialog} onOpenChange={setShowInitialDialog}>
            <DialogTrigger>
                <Button className='mt-3' onClick={() => setShowInitialDialog(true)}>+ Start a Consultation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <h2>Add Symptoms or Any Other Details</h2>
                            <Textarea
                                placeholder='Add Details Here...'
                                className='h-[200px] mt-1'
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'} className='cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button 
                        disabled={!note.trim()} 
                        className='cursor-pointer'
                        onClick={handleNext}
                    > 
                        Next <ArrowRight /> 
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        <SelectDoctorDialog 
            isOpen={showDoctorDialog}
            onClose={handleCloseDoctorDialog}
            notes={note}
        />
        </>

    )
}

export default AddNewSessionDialog