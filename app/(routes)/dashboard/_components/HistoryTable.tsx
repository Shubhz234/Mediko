import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import ViewReportDialog from './ViewReportDialog'

type Props = {
    HistoryList: SessionDetail[]
}

const HistoryTable = ({ HistoryList }: Props) => {
    return (
        <div>
            <Table>
                <TableCaption>Previous Consultation Report</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>AI Medkio Specilist</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {HistoryList.map((record: SessionDetail, index: number) => (
                        <TableRow>
                            <TableCell className="font-medium">{record.selectedDoctor?.specialist}</TableCell>
                            <TableCell>{record.note}</TableCell>
                            <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
                            <TableCell className="text-right"><ViewReportDialog record={record}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default HistoryTable