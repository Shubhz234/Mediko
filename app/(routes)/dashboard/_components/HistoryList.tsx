'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'
import axios from 'axios'
import HistoryTable from './HistoryTable'
import { SessionDetail } from '../medical-agent/[sessionId]/page'

const HistoryList = () => {
    const [HistoryList, setHistoryList] = useState<SessionDetail[]>([])

    useEffect(() => {
        GetHistoryList()
    }, [])

    const GetHistoryList = async () => {
        const result = await axios.get('/api/session-chat?sessionId=all');
        console.log(result.data);
        setHistoryList(result.data)
    }

    return (
        <div className="lg:col-span-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Recent History
                </h3>
                <div className='mt-10'>
                    {HistoryList.length == 0 ?
                        <div className='flex items-center justify-between flex-col p-7 border-dashed rounded-2xl border-2'>
                            <Image src={'/medical-assistance.png'} alt='mediko' width={150} height={150} />
                            <h2 className='font-bold text-xl'>No Recent Consultantions</h2>
                            <p>Its looks likke you haven't consult any doctors yet.</p>
                            <AddNewSessionDialog />
                        </div> :
                        <div>
                            <HistoryTable HistoryList={HistoryList} />
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default HistoryList