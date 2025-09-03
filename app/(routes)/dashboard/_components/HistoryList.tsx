'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'

const HistoryList = () => {
    const [HistoryList, setHistoryList] = useState([])
    return (
        <div className='mt-10'>
            {HistoryList.length == 0 ?
                <div className='flex items-center justify-between flex-col p-7 border-dashed rounded-2xl border-2'>
                    <Image src={'/medical-assistance.png'} alt='mediko' width={150} height={150}/>
                    <h2 className='font-bold text-xl'>No Recent Consultantions</h2>
                    <p>Its looks likke you haven't consult any doctors yet.</p>
                    <AddNewSessionDialog/>
                </div>
                : <div>List</div>}
        </div>
    )
}

export default HistoryList