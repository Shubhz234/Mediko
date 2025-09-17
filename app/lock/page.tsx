"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MedikoLogo from "@/context/MedikoLogo";

const LockPage = () => {
  const [secretKey, setSecretKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUnlock = () => {
    setIsLoading(true);
    
    // Check if the secret key matches
    if (secretKey === "7736") {
      // Store unlock status in localStorage
      localStorage.setItem("mediko_unlocked", "true");
      // Also set a cookie for server-side checking
      document.cookie = "mediko_unlocked=true; path=/; max-age=86400"; // 24 hours
      toast.success("Access granted! Welcome to Mediko AI");
      router.push("/");
    } else {
      toast.error("Invalid secret key. Please try again.");
      setSecretKey("");
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <div className="flex justify-center mb-4">
              <MedikoLogo />
            </div>
            
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
              Website Locked
            </CardTitle>
            <CardDescription className="text-base text-neutral-600">
              This website is temporarily locked. Please enter the secret key to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Secret Key
              </label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="Enter secret key..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12 h-12 text-center text-lg font-mono tracking-wider"
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleUnlock}
              disabled={!secretKey || isLoading}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Unlock Website
                </div>
              )}
            </Button>

            <div className="text-center pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500">
                🔒 Secure access required
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
        />
        
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 blur-xl"
        />
      </motion.div>
    </div>
  );
};

export default LockPage;