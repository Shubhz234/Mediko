"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  IconStethoscope,
  IconBrain,
  IconClock,
  IconUsers,
  IconShield,
  IconReportMedical,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Badge } from "@/components/ui/badge";

export function FeatureBentoGrid() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6"
        >
          Why Choose <span className="bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800 bg-clip-text text-transparent">Mediko AI</span>?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
        >
          Revolutionary AI-powered healthcare platform that brings medical expertise to your fingertips. 
          Experience personalized consultations with advanced voice technology and comprehensive health insights.
        </motion.p>
      </div>
      
      <BentoGrid className="md:auto-rows-[24rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const VoiceConsultationDemo = () => {
  const [currentMessage, setCurrentMessage] = React.useState(0);
  
  const messages = [
    { role: "ai", text: "Hello! I'm Dr. Sarah, your AI General Physician. How are you feeling today?" },
    { role: "user", text: "I've been having headaches for the past 3 days..." },
    { role: "ai", text: "I understand. Can you describe the intensity and location of the pain?" },
    { role: "user", text: "It's mostly on the right side, moderate pain, gets worse in the evening." }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-4 flex-col justify-center">
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-700">Live Consultation</span>
        </div>
        
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${messages[currentMessage].role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[80%] p-3 rounded-2xl ${
            messages[currentMessage].role === 'user' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-white dark:bg-neutral-800 border shadow-sm'
          }`}>
            <p className="text-sm">{messages[currentMessage].text}</p>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
            <IconStethoscope className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AIAnalysisDemo = () => {
  const symptoms = [
    { name: "Headache", severity: 85, color: "bg-red-500" },
    { name: "Fatigue", severity: 60, color: "bg-orange-500" },
    { name: "Nausea", severity: 30, color: "bg-yellow-500" },
  ];

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <IconBrain className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-700">AI Analysis Results</span>
        </div>
        
        <div className="space-y-3">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={symptom.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-neutral-800 rounded-lg p-3 border"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{symptom.name}</span>
                <Badge variant="outline" className="text-xs">
                  {symptom.severity}% match
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${symptom.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${symptom.severity}%` }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium">
            💡 Recommendation: Consider consulting a neurologist for persistent headaches
          </p>
        </div>
      </div>
    </div>
  );
};

const AvailabilityDemo = () => {
  const timeZones = [
    { city: "New York", time: "2:30 PM", available: true },
    { city: "London", time: "7:30 PM", available: true },
    { city: "Tokyo", time: "3:30 AM", available: true },
    { city: "Sydney", time: "5:30 AM", available: true },
  ];

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
      <div className="w-full">
        <div className="text-center mb-4">
          <IconClock className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-bold text-emerald-700">24/7 Global Coverage</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {timeZones.map((zone, index) => (
            <motion.div
              key={zone.city}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-lg p-2 border text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">{zone.city}</span>
              </div>
              <p className="text-xs text-gray-600">{zone.time}</p>
              <Badge variant="secondary" className="text-xs mt-1 bg-green-100 text-green-700">
                Available
              </Badge>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-emerald-600 font-medium">
            🌍 AI doctors never sleep - get help anytime, anywhere
          </p>
        </div>
      </div>
    </div>
  );
};

const SpecialistNetwork = () => {
  const specialists = [
    { name: "General Physician", patients: "10K+", rating: 4.9, color: "from-emerald-400 to-emerald-600", icon: "GP" },
    { name: "Cardiologist", patients: "5K+", rating: 4.8, color: "from-red-400 to-red-600", icon: "CD" },
    { name: "Dermatologist", patients: "8K+", rating: 4.9, color: "from-purple-400 to-purple-600", icon: "DR" },
    { name: "Pediatrician", patients: "12K+", rating: 5.0, color: "from-blue-400 to-blue-600", icon: "PD" },
    { name: "Psychologist", patients: "6K+", rating: 4.7, color: "from-pink-400 to-pink-600", icon: "PS" },
    { name: "Nutritionist", patients: "4K+", rating: 4.8, color: "from-orange-400 to-orange-600", icon: "NT" },
  ];

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
      <div className="w-full">
        <div className="text-center mb-4">
          <IconUsers className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <h3 className="font-bold text-indigo-700 text-sm">10+ Medical Specialties</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {specialists.slice(0, 4).map((specialist, index) => (
            <motion.div
              key={specialist.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-lg p-2 border hover:shadow-md transition-shadow"
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${specialist.color} flex items-center justify-center mx-auto mb-1`}>
                <span className="text-white text-xs font-bold">{specialist.icon}</span>
              </div>
              <p className="text-xs font-medium text-center mb-1">{specialist.name}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">{specialist.patients}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span>{specialist.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-3 text-center">
          <Badge variant="outline" className="text-xs">
            +6 more specialties available
          </Badge>
        </div>
      </div>
    </div>
  );
};

const SecurityDemo = () => {
  const securityFeatures = [
    { name: "HIPAA Compliant", icon: "🛡️", status: "Active" },
    { name: "End-to-End Encryption", icon: "🔒", status: "Secured" },
    { name: "Data Privacy", icon: "🔐", status: "Protected" },
    { name: "Secure Storage", icon: "💾", status: "Encrypted" },
  ];

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl p-4">
      <div className="w-full">
        <div className="text-center mb-4">
          <IconShield className="w-6 h-6 text-slate-600 mx-auto mb-2" />
          <h3 className="font-bold text-slate-700 text-sm">Enterprise-Grade Security</h3>
        </div>
        
        <div className="space-y-2">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white dark:bg-neutral-800 rounded-lg p-2 border"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{feature.icon}</span>
                <span className="text-xs font-medium">{feature.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                {feature.status}
              </Badge>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 text-center font-medium">
            🏥 Your health data is safer than traditional clinics
          </p>
        </div>
      </div>
    </div>
  );
};

const HealthReportsDemo = () => {
  const reportStats = [
    { label: "Reports Generated", value: "50K+", trend: "+12%" },
    { label: "Avg. Accuracy", value: "94.5%", trend: "+2.1%" },
    { label: "Response Time", value: "< 2min", trend: "-15%" },
  ];

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <IconReportMedical className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-teal-700 text-sm">Comprehensive Health Reports</h3>
        </div>
        
        <div className="space-y-3">
          {reportStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-neutral-800 rounded-lg p-3 border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-teal-700">{stat.value}</p>
                </div>
                <Badge variant="outline" className={`text-xs ${
                  stat.trend.startsWith('+') ? 'text-green-600 border-green-200' : 'text-blue-600 border-blue-200'
                }`}>
                  {stat.trend}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-3 p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200">
          <p className="text-xs text-teal-700 text-center font-medium">
            📊 Detailed insights with actionable recommendations
          </p>
        </div>
      </div>
    </div>
  );
};

const items = [
  {
    title: "Natural Voice Consultations",
    description: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Experience human-like conversations with AI doctors using advanced speech recognition and natural language processing.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">Voice-First</Badge>
          <Badge variant="secondary" className="text-xs">Multi-Language</Badge>
          <Badge variant="secondary" className="text-xs">Real-time</Badge>
        </div>
      </div>
    ),
    header: <VoiceConsultationDemo />,
    className: "md:col-span-1",
    icon: <IconStethoscope className="h-4 w-4 text-emerald-600" />,
  },
  {
    title: "AI-Powered Symptom Analysis",
    description: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Advanced machine learning algorithms analyze your symptoms and provide accurate health assessments with confidence scores.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">94.5% Accuracy</Badge>
          <Badge variant="secondary" className="text-xs">Instant Results</Badge>
        </div>
      </div>
    ),
    header: <AIAnalysisDemo />,
    className: "md:col-span-1",
    icon: <IconBrain className="h-4 w-4 text-emerald-600" />,
  },
  {
    title: "24/7 Global Availability",
    description: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Access medical consultations anytime, anywhere. Our AI doctors are available around the clock across all time zones.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">Always Online</Badge>
          <Badge variant="secondary" className="text-xs">Global Coverage</Badge>
        </div>
      </div>
    ),
    header: <AvailabilityDemo />,
    className: "md:col-span-1",
    icon: <IconClock className="h-4 w-4 text-emerald-600" />,
  },
  {
    title: "Expert Specialist Network",
    description: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Access 10+ medical specialties from general physicians to cardiologists, all powered by cutting-edge AI technology.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">10+ Specialties</Badge>
          <Badge variant="secondary" className="text-xs">50K+ Consultations</Badge>
          <Badge variant="secondary" className="text-xs">4.9★ Rating</Badge>
        </div>
      </div>
    ),
    header: <SpecialistNetwork />,
    className: "md:col-span-2",
    icon: <IconUsers className="h-4 w-4 text-emerald-600" />,
  },
  {
    title: "Enterprise Security & Privacy",
    description: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          HIPAA-compliant platform with end-to-end encryption ensuring your health data remains private and secure.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">HIPAA Compliant</Badge>
          <Badge variant="secondary" className="text-xs">Encrypted</Badge>
        </div>
      </div>
    ),
    header: <SecurityDemo />,
    className: "md:col-span-1",
    icon: <IconShield className="h-4 w-4 text-emerald-600" />,
  },
  {
    title: "Detailed Health Reports",
    description: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Comprehensive medical reports generated after each consultation with actionable insights and recommendations.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">Instant Reports</Badge>
          <Badge variant="secondary" className="text-xs">PDF Export</Badge>
        </div>
      </div>
    ),
    header: <HealthReportsDemo />,
    className: "md:col-span-1",
    icon: <IconReportMedical className="h-4 w-4 text-emerald-600" />,
  },
];