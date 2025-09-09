import React from 'react'
import HistoryList from './_components/HistoryList'
import DoctorAgentList from './_components/DoctorAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4'>
                <div>
                    <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent'>My Dashboard</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">Manage your medical consultations and health records</p>
                </div>
                <AddNewSessionDialog/>
            </div>
            <HistoryList />
            <DoctorAgentList />
        </div>
    )
}

export default Dashboard