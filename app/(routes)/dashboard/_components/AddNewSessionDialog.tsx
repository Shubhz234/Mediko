'use client'

import React, { useState } from 'react'
import {

    const handleNext = () => {
        if (note.trim()) {
            setShowInitialDialog(false)
            setShowDoctorDialog(true)
        }
    }

    const handleCloseDoctorDialog = () => {
        setShowDoctorDialog(false)
        setNote('')
    }

    const handleCloseInitialDialog = () => {
        setShowInitialDialog(false)
        setNote('')
    }

    return (
        <>
            <Dialog open={showInitialDialog} onOpenChange={handleCloseInitialDialog}>
                <DialogTrigger asChild>
                    <Button className='mt-3' onClick={() => setShowInitialDialog(true)}>
                        + Start a Consultation
                    </Button>
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
                        <DialogClose asChild>
                            <Button variant={'outline'} className='cursor-pointer'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button 
                            disabled={!note.trim()} 
                            className='cursor-pointer'
                            onClick={handleNext}
                        > 
                            Next <ArrowRight className="w-4 h-4 ml-1" /> 
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