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
        <div className='mt-8 md:mt-12'>
            {HistoryList.length == 0 ?
                <div className='flex items-center justify-center flex-col p-8 md:p-12 border-dashed rounded-3xl border-2 border-green-300/50 bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-700/50 dark:border-green-600/30'>
                    <Image src={'/medical-assistance.png'} alt='mediko' width={150} height={150} className="mb-6" />
                    <h2 className='font-bold text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-2'>No Recent Consultations</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">It looks like you haven't consulted any doctors yet. Start your first consultation now!</p>
                    <AddNewSessionDialog />
                </div> :
                <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">Recent Consultations</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">View your medical consultation history</p>
                    </div>
                    <HistoryTable HistoryList={HistoryList}/>
                </div>}
        </div>
    )
}

export default HistoryList