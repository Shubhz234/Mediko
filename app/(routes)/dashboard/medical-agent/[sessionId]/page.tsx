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
    <div className='min-h-screen bg-gradient-to-br from-green-50/50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='max-w-4xl mx-auto p-4 md:p-6'>
        <div className='bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden'>
          <div className='flex flex-col sm:flex-row justify-between items-center p-4 md:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-700/50'>
            <div className='flex items-center gap-3 mb-3 sm:mb-0'>
              <div className={`p-2 rounded-full ${callStarted ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                <Circle className={`size-4 ${callStarted ? 'text-green-600 fill-green-600' : 'text-red-600 fill-red-600'}`} />
              </div>
              <div>
                <h2 className='font-semibold text-gray-800 dark:text-gray-200'>{callStarted ? 'Connected' : 'Not Connected'}</h2>
                <p className='text-sm text-gray-600 dark:text-gray-400'>Voice consultation status</p>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='font-bold text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-mono'>00:00</h2>
              <p className='text-xs text-gray-500 dark:text-gray-500'>Duration</p>
            </div>
          </div>

          {sessionDetails &&
            <div className='flex items-center flex-col p-6 md:p-10'>
              <div className='relative mb-6'>
                <div className={`absolute inset-0 rounded-full ${callStarted ? 'bg-green-400/20 animate-pulse' : 'bg-gray-300/20'} blur-xl`}></div>
                <Image
                  src={sessionDetails?.selectedDoctor?.image}
                  alt={sessionDetails?.selectedDoctor?.specialist}
                  width={120}
                  height={120}
                  priority={true}
                  className='relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700'
                />
              </div>
              
              <div className='text-center mb-8'>
              <div className='w-full max-w-2xl bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl p-4 md:p-6 mb-8 min-h-[200px] max-h-[300px] overflow-y-auto'>
                <h3 className='font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center'>Conversation</h3>
                <div className='space-y-3'>
                  {messages && messages.slice(-3).map((msg: Messages, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-green-500 text-white rounded-br-sm' 
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-bl-sm'
                      }`}>
                        <p className='text-sm md:text-base'>{msg.text}</p>
                        <p className='text-xs opacity-70 mt-1 capitalize'>{msg.role}</p>
                      </div>
                    </div>
                  ))}
                  {liveTranscript && liveTranscript?.length > 0 && (
                    <div className={`flex ${currentRole === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        currentRole === 'user' 
                          ? 'bg-green-400/70 text-white rounded-br-sm' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                      } animate-pulse`}>
                        <p className='text-sm md:text-base'>{liveTranscript}</p>
                        <p className='text-xs opacity-70 mt-1 capitalize'>{currentRole} (typing...)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {!callStarted ?
                <Button 
                  className='bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg' 
                  onClick={StartCall} 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? <Loader2 className='animate-spin mr-2' /> : <PhoneCall className="mr-2" />}
                  Start Call
                </Button> :
                <Button 
                  variant='destructive' 
                  className='bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg' 
                  onClick={endCall} 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? <Loader2 className='animate-spin mr-2' /> : <PhoneOff className="mr-2" />} 
                  End Call
                </Button>}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MedicalVoiceAgent