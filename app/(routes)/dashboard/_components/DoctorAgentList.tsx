"use client";

import { AIDoctor } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";

const DoctorAgentList = () => {
  return (
    <section className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-neutral-200/50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            AI Specialist Doctors
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Choose from our expert AI medical specialists for personalized consultations
          </p>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {AIDoctor.map((doctor, index) => (
          <div
            key={doctor.id}
            className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <DoctorAgentCard doctorAgent={doctor} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorAgentList;