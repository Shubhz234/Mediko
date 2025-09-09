"use client";

import { AIDoctor } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";

const DoctorAgentList = () => {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
          AI Specialist Doctors
        </h2>
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {AIDoctor.map((doctor) => (
          <DoctorAgentCard key={doctor.id} doctorAgent={doctor} />
        ))}
      </div>
    </section>
  );
};

export default DoctorAgentList;
