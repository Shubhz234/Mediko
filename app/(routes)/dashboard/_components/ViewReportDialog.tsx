import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

type Props = {
    record: SessionDetail
}

const ViewReportDialog = ({ record }: Props) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant={"link"}>View Report</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle asChild>
                            <h2 className='text-center text-4xl'>AI Mediko Report</h2>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div className='space-y-4 mt-4'>
                                <h2 className='font-bold text-blue-500 text-lg'>Video Info:</h2>

                                <div className='grid grid-cols-2'>
                                    <h2><span className='font-bold'>Doctor Specialization: </span> {record.selectedDoctor?.specialist}</h2>
                                    <h2>Consultant Date: {moment(new Date(record.createdOn)).fromNow()}</h2>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ViewReportDialog