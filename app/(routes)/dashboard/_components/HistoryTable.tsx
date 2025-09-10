import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'
import ViewReportDialog from './ViewReportDialog'

type Props = {
    HistoryList: SessionDetail[],
    sliceSize?: number
}

const HistoryTable = ({ HistoryList, sliceSize  }: Props) => {
    const displayList = sliceSize ? HistoryList.slice(0, sliceSize) : HistoryList

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>AI Medkio Specilist</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayList.map((record: SessionDetail, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{record.selectedDoctor?.specialist}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{record.note}</TableCell>
                            <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
                            <TableCell className="text-center"><ViewReportDialog record={record} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default HistoryTable