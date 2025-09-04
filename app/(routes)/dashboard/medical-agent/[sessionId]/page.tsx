"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AIDoctor } from '@/shared/list'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, ArrowLeft, Crown } from 'lucide-react'
import Link from 'next/link'

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [doctor, setDoctor] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      getSessionDetails()
    }
  }, [sessionId])

  const getSessionDetails = async () => {
    try {
      const response = await axios.get(`/api/session-chat?sessionId=${sessionId}`)
      setSession(response.data)
      
      // Find doctor info
      const doctorInfo = AIDoctor.find(doc => doc.id === response.data.selectedDoctor)
      setDoctor(doctorInfo)
    } catch (error) {
      console.error('Error fetching session:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading session details...</p>
        </div>
      </div>
    )
  }

  if (!session || !doctor) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold mb-4">Session not found</h2>
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Medical Consultation</h1>
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={doctor.image}
            alt={doctor.specialist}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">{doctor.specialist}</h2>
              {doctor.subscriptionRequired && (
                <span className="bg-amber-100 text-amber-600 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Premium
                </span>
              )}
            </div>
            <p className="text-gray-600">{doctor.description}</p>
          </div>
        </div>
        
        {/* Session Notes */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-sm mb-2">Your Notes:</h3>
          <p className="text-sm text-gray-700">{session.notes}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Phone className="w-4 h-4" />
            Start Voice Call
          </Button>
          <Button variant="outline" className="flex-1 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Start Chat
          </Button>
        </div>
      </div>

      {/* Session Info */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-lg mb-4">Session Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Session ID:</span>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">{session.sessionId}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Created:</span>
            <p>{new Date(session.createdOn).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicalVoiceAgent