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
import ViewReportDialog from './ViewReportDialog'

type Props = {
    HistoryList: SessionDetail[]
}

const HistoryTable = ({ HistoryList }: Props) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">AI Mediko Specialist</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">Description</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {HistoryList.map((record: SessionDetail, index: number) => (
                        <TableRow key={index} className="hover:bg-green-50/50 dark:hover:bg-gray-700/50 transition-colors">
                            <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    {record.selectedDoctor?.specialist}
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400 hidden md:table-cell max-w-xs truncate">{record.note}</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{moment(new Date(record.createdOn)).fromNow()}</TableCell>
                            <TableCell className="text-right"><ViewReportDialog record={record}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default HistoryTable