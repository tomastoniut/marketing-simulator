"use client";
import React from 'react';
import { CompleteAssessmentFlow } from '@/features/assessment/components/CompleteAssessmentFlow';

export default function SimuladorPage() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4 sm:px-6 space-y-6">
      <h1 className="text-2xl font-bold">Evaluación de Orientación al Marketing</h1>
      <CompleteAssessmentFlow />
    </div>
  );
}
