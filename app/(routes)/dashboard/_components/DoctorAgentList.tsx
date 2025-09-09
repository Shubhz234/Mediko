import { AIDoctor } from '@/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'

const DoctorAgentList = () => {
  return (
    <div className='mt-12 md:mt-16'>
        <div className="mb-8">
            <h2 className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent'>AI Specialist Doctors</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">Choose from our expert AI medical specialists</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8'>
            {AIDoctor.map((doctor,index) => (
                <div key={index}>
                    <DoctorAgentCard doctorAgent={doctor}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoctorAgentList