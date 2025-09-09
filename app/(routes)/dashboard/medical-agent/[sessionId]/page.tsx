"use client"

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Loader2, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { vapi } from '@/lib/vapi.sdk';
import { toast } from 'sonner';

export type SessionDetail = {
  id: number,
  note: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string,
}

type Messages = {
  role: string,
  text: string,
}

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetail>()
  const [callStarted, setCallStarted] = useState(false)
  const [currentRole, setCurrentRole] = useState<string | null>()
  const [liveTranscript, setLiveTranscript] = useState<string>()
  const [messages, setmessages] = useState<Messages[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId])

  const GetSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
    console.log(result.data);
    setSessionDetails(result.data)
  }

  const StartCall = () => {
    setLoading(true);

    // Set up event listeners before starting the call
    console.log('Starting call...');
    vapi.on('call-start', () => {
      console.log('Call started')
      setCallStarted(true);
      setLoading(false);
    });

    vapi.on('call-end', () => {
      console.log('Call ended')
      setCallStarted(false);
      setCurrentRole(null);
      setLiveTranscript('');
    });

    vapi.on('message', (message) => {
      const { role, transcriptType, transcript } = message;
      if (message.type === 'transcript') {
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType == 'partial') {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType == 'final') {
          // Final transcript
          setmessages((prev: any) => [...prev, { role: role, text: transcript }])
          setLiveTranscript('')
          setCurrentRole(null);
        }
      }
    });

    vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole('assistant');
    });

    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user');
    });

    const VapiAgentConfig = {
      name: 'AI Medical Voice Agent',
      firstMessage: "Hello! I am your AI Medical Voice Agent. How can I assist you today?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "vapi",
        voiceId: sessionDetails?.selectedDoctor?.voiceId,
        speed: 0.9,
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: sessionDetails?.selectedDoctor?.agentPrompt,
          }
        ]
      },
    }

    // Start the call
    //@ts-ignore
    vapi.start(VapiAgentConfig);
  }

  const endCall = async () => {
    console.log('Ending call...');
    setLoading(true);

    // Stop the call
    vapi.stop();

    // Reset state
    setCallStarted(false);
    const result = await GenerateReport();

    setLoading(false);
    setCurrentRole(null);
    setLiveTranscript('');

    // Redirect to dashboard after call ends and report is generated
    toast.success('Report generated successfully!');
    router.replace('/dashboard');
  };

  const GenerateReport = async () => {
    // Function to generate and save the report after the call ends

    const result = await axios.post('/api/medical-report', {
      messages: messages,
      sessionDetails: sessionDetails,
      sessionId: sessionId,
    })
    console.log(result.data);
    return result.data;
  }

  // Cleanup event listeners on component unmount
  useEffect(() => {
    return () => {
      if (callStarted) {
        vapi.stop();
      }
    };
  }, [callStarted]);

  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center p-3 border-b'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className={`size-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />{callStarted ? 'Connected...' : 'Not Connected'}</h2>
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

          <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:52 xl:px-72'>
            {messages && messages.slice(-3).map((msg: Messages, i) => (
              <h2 className='text-gray-400 p-1 capitalize' key={i}>{msg.role}: {msg.text}</h2>
            ))}
            {liveTranscript && liveTranscript?.length > 0 && <h2 className='text-lg capitalize'>{currentRole}: {liveTranscript}</h2>}
          </div>
          
          {!callStarted ?
            <Button className='mt-20' onClick={StartCall} disabled={loading}>
              {loading ? <Loader2 className='animate-spin' /> : <PhoneCall />}
              Start Call
            </Button> :
            <Button variant='destructive' className='mt-20' onClick={endCall} disabled={loading}>
              {loading ? <Loader2 className='animate-spin' /> : <PhoneOff />} End Call
            </Button>}
        </div>
      }
    </div>
  )
}

export default MedicalVoiceAgent