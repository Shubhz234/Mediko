"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Clock,
  Users,
  Headphones,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for trying out our AI medical consultations",
      price: {
        monthly: 0,
        yearly: 0
      },
      credits: 10,
      features: [
        "10 AI consultations per month",
        "Basic health reports",
        "General Physician AI access",
        "Email support",
        "Basic symptom checker"
      ],
      limitations: [
        "Limited to General Physician only",
        "Basic report generation",
        "Standard response time"
      ],
      popular: false,
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      icon: Shield,
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    },
    {
      name: "Pro",
      description: "Ideal for regular health monitoring and consultations",
      price: {
        monthly: 29,
        yearly: 290
      },
      credits: 100,
      features: [
        "100 AI consultations per month",
        "Access to all specialist doctors",
        "Detailed health reports with insights",
        "Priority support",
        "Advanced symptom analysis",
        "Health trend tracking",
        "Prescription management",
        "24/7 AI availability"
      ],
      limitations: [],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      name: "Premium",
      description: "Complete healthcare solution for families and businesses",
      price: {
        monthly: 79,
        yearly: 790
      },
      credits: 300,
      features: [
        "300 AI consultations per month",
        "All specialist doctors + premium voices",
        "Comprehensive health analytics",
        "Dedicated account manager",
        "Custom health plans",
        "Family account management (up to 5 members)",
        "Integration with wearable devices",
        "Telemedicine referrals",
        "Advanced AI diagnostics",
        "White-label options"
      ],
      limitations: [],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access AI medical consultations anytime, anywhere"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your health data is secure and private"
    },
    {
      icon: Users,
      title: "Multi-Specialist Access",
      description: "Consult with various AI medical specialists"
    },
    {
      icon: Headphones,
      title: "Voice-First Experience",
      description: "Natural conversations with AI doctors"
    }
  ];

  const faqs = [
    {
      question: "How do AI medical consultations work?",
      answer: "Our AI medical agents use advanced natural language processing to conduct voice-based consultations, analyze symptoms, and provide medical guidance based on established medical protocols."
    },
    {
      question: "Are the AI consultations a replacement for real doctors?",
      answer: "No, our AI consultations are designed to complement traditional healthcare. They provide initial assessment, health guidance, and can help determine when you should see a human doctor."
    },
    {
      question: "How secure is my health information?",
      answer: "We are HIPAA compliant and use enterprise-grade encryption to protect your health data. Your information is never shared without your explicit consent."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100"
        >
          Choose Your <span className="bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800 bg-clip-text text-transparent">Health Plan</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          Get access to AI-powered medical consultations with flexible pricing plans designed for individuals and families.
        </motion.p>
      </div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <div className="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-neutral-700 text-slate-800 dark:text-slate-100 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === "yearly"
                ? "bg-white dark:bg-neutral-700 text-slate-800 dark:text-slate-100 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400"
            }`}
          >
            Yearly
            <Badge className="ml-2 bg-emerald-100 text-emerald-700 text-xs">Save 17%</Badge>
          </button>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {pricingPlans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`relative overflow-hidden transition-all hover:shadow-xl ${
              plan.popular
                ? "border-2 border-emerald-500 shadow-lg scale-105"
                : "hover:scale-105"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-center py-2 text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}>
              <div className={`w-16 h-16 mx-auto rounded-full ${plan.bgColor} flex items-center justify-center mb-4`}>
                <plan.icon className={`w-8 h-8 ${plan.color}`} />
              </div>
              
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
              
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">
                  ${plan.price[billingCycle]}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              
              <div className="mt-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {plan.credits} credits included
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">
                  What's included:
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                    : ""
                }`}
                variant={plan.buttonVariant}
              >
                {plan.buttonText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Additional Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Why Choose Mediko AI?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Advanced features that make healthcare accessible and convenient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Get answers to common questions about our AI medical consultations
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                  {faq.question}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-2">
          Ready to Transform Your Healthcare Experience?
        </h2>
        <p className="mb-6 opacity-90">
          Join thousands of users who trust Mediko AI for their health consultations
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-neutral-100">
          Start Your Free Trial
          <Zap className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PricingPage;