"use client";

import React from "react";
import HistoryList from "./_components/HistoryList";
import DoctorAgentList from "./_components/DoctorAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

const Dashboard = () => {
    return (
        <div className="space-y-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-neutral-200/50">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
                        My Dashboard
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Manage your sessions, view history, and explore your AI doctor agents.
                    </p>
                </div>
                <AddNewSessionDialog />
            </div>

            <HistoryList />
            <DoctorAgentList />
        </div>
    );
};

export default Dashboard;
