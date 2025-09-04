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
import axios from 'axios'

const AddNewSessionDialog = () => {
    const [note, setNote] = useState<string>()
    const [Loading, setLoading] = useState(false)
    const onClickNext = async () => {
        setLoading(true)
        const result = await axios.post('/api/suggest-doctors', {
            notes: note
        });

        console.log(result.data)
        setLoading(false)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className='mt-3'>+ Start a Consultantion</Button>
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
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'} className='cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button disabled={!note} className='cursor-pointer' onClick={() => onClickNext()}> Next <ArrowRight /> </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddNewSessionDialog