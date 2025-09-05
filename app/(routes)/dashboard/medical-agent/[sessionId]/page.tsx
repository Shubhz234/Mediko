"use client"

import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId])

  const GetSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
    console.log(result.data);
  }

  return (
    <div>{sessionId}</div>
  )
}

export default MedicalVoiceAgent