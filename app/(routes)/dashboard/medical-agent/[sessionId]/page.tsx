"use client"

import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type SessionDetail = {
  id: number,
  note: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string,
}

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetail>()

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId])

  const GetSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
    console.log(result.data);
    setSessionDetails(result.data)
  }

  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center p-3 border-b'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className='size-4' /> Not Connected</h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>

      {sessionDetails &&
        <div className='flex items-center flex-col mt-10'>
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor?.specialist}
            width={120}
            height={120}
            priority={true}
            className='w-[100px] h-[100px] rounded-full object-cover'
          />
          <h2 className='font-bold text-lg mt-2'>{sessionDetails?.selectedDoctor?.specialist}</h2>
          <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

          <div className='mt-32'>
            <h2 className='text-gray-400'>Assistant Msg</h2>
            <h2 className='text-lg'>User Msg</h2>
          </div>

          <Button className='mt-20'>
            <PhoneCall/> Start Call
          </Button>
        </div>
      }
    </div>
  )
}

export default MedicalVoiceAgent