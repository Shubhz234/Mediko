"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  CreditCard, 
  Settings, 
  Shield,
  Activity,
  Clock,
  Award
} from "lucide-react";
import { motion } from "motion/react";

const ProfilePage = () => {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);
  const [activeTab, setActiveTab] = useState("overview");

  const profileStats = [
    {
      icon: Activity,
      label: "Total Sessions",
      value: "12",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Clock,
      label: "Hours Consulted",
      value: "8.5",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Award,
      label: "Health Score",
      value: "85%",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: CreditCard,
      label: "Credits Left",
      value: userDetail?.credits || "0",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentActivity = [
    {
      date: "2024-01-15",
      action: "Consulted with General Physician",
      status: "Completed"
    },
    {
      date: "2024-01-12",
      action: "Consulted with Dermatologist",
      status: "Completed"
    },
    {
      date: "2024-01-08",
      action: "Consulted with Cardiologist",
      status: "Completed"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            My Profile
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage your account settings and view your health journey
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                <AvatarFallback className="text-2xl font-bold bg-emerald-600 text-white">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {user?.fullName || "Anonymous User"}
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.primaryEmailAddress?.emailAddress}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified Account
                  </Badge>
                  <Badge variant="outline">
                    Free Plan
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {profileStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Content Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest consultations and health activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {activity.action}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Account Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Full Name
                </label>
                <p className="text-slate-800 dark:text-slate-100 font-medium">
                  {user?.fullName || "Not provided"}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Email Address
                </label>
                <p className="text-slate-800 dark:text-slate-100 font-medium">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Account Type
                </label>
                <p className="text-slate-800 dark:text-slate-100 font-medium">
                  Free Plan
                </p>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Credits Remaining
                </label>
                <p className="text-slate-800 dark:text-slate-100 font-medium">
                  {userDetail?.credits || 0} credits
                </p>
              </div>

              <Button className="w-full mt-4" variant="outline">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;