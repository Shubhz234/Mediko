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

        // Filter out sessions where note or report is missing/null
        const filteredData = result.data.filter(
            (session: SessionDetail) => session.conversation?.length && session.report
        );

        setHistoryList(filteredData)
    }

    return (
        <div className="w-full">
            <div className="rounded-3xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900/80">
                <h3 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
                    Recent History
                </h3>
                <div className='mt-8'>
                    {HistoryList.length == 0 ?
                        <div className='flex items-center justify-center flex-col p-12 border-dashed rounded-3xl border-2 border-neutral-300 bg-gradient-to-br from-neutral-50 to-emerald-50/30'>
                            <Image src={'/medical-assistance.png'} alt='mediko' width={180} height={180} className="mb-6" />
                            <h2 className='font-bold text-2xl text-slate-800 mb-2'>No Recent Consultations</h2>
                            <p className="text-neutral-600 mb-6 text-center max-w-md">It looks like you haven't consulted any doctors yet. Start your first consultation to get personalized medical advice.</p>
                            <AddNewSessionDialog />
                        </div> :
                        <div>
                            <HistoryTable HistoryList={HistoryList} sliceSize={4} />
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default HistoryList