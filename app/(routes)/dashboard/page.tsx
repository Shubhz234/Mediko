"use client";

import React from "react";
import HistoryList from "./_components/HistoryList";
import DoctorAgentList from "./_components/DoctorAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

const Dashboard = () => {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
                        My Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
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
