'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { AIDoctor } from '@/shared/list'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, MessageCircle } from 'lucide-react'

const HistoryList = () => {
    const [historyList, setHistoryList] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            fetchSessions()
        }
    }, [user])

    const fetchSessions = async () => {
        try {
            const response = await axios.get('/api/session-chat')
            setHistoryList(response.data)
        } catch (error) {
            console.error('Error fetching sessions:', error)
        } finally {
            setLoading(false)
        }
    }

    const getDoctorInfo = (doctorId: number) => {
        return AIDoctor.find(doctor => doctor.id === doctorId)
    }

    if (loading) {
        return <div className="mt-10 text-center">Loading sessions...</div>
    }

    return (
        <div className='mt-10'>
            {historyList.length == 0 ?
                <div className='flex items-center justify-between flex-col p-7 border-dashed rounded-2xl border-2'>
                    <Image src={'/medical-assistance.png'} alt='mediko' width={150} height={150}/>
                    <h2 className='font-bold text-xl'>No Recent Consultations</h2>
                    <p>It looks like you haven't consulted any doctors yet.</p>
                    <AddNewSessionDialog/>
                </div>
                : 
                <div>
                    <h2 className='font-bold text-xl mb-5'>Recent Consultations</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {historyList.map((session: any, index) => {
                            const doctor = getDoctorInfo(session.selectedDoctor)
                            return (
                                <div key={index} className='bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        {doctor && (
                                            <Image 
                                                src={doctor.image} 
                                                alt={doctor.specialist}
                                                width={40}
                                                height={40}
                                                className='rounded-full object-cover'
                                            />
                                        )}
                                        <div>
                                            <h3 className='font-semibold text-sm'>
                                                {doctor?.specialist || 'General Consultation'}
                                            </h3>
                                            <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                <Calendar className='w-3 h-3' />
                                                {new Date(session.createdOn).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                                        {session.notes}
                                    </p>
                                    
                                    <Link href={`/dashboard/medical-agent/${session.sessionId}`}>
                                        <Button size="sm" className='w-full flex items-center gap-2'>
                                            <MessageCircle className='w-4 h-4' />
                                            Continue Session
                                        </Button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default HistoryList