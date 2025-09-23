"use client";
import React from 'react';
import { useAssessment, QuestionStep, Results } from '@/features/assessment';
import { ProgressBar } from '@/components/ui';

export default function SimuladorPage() {
  const {
    currentIndex,
    total,
    answers,
    setAnswer,
    next,
    prev,
    canNext,
    canPrev,
    finished,
    result,
    reset,
  } = useAssessment();

  const currentQuestion = !finished ? currentIndex + 1 : undefined;
  const currentAnswer = answers.find(a => a.question === currentQuestion);

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Evaluación de Orientación al Marketing</h1>
      {!finished && (
        <ProgressBar current={currentIndex} total={total} />
      )}
      {!finished && (
        <QuestionStep
          index={currentIndex}
          total={total}
          value={currentAnswer?.value}
          onSelect={(v)=> currentQuestion && setAnswer(currentQuestion, v)}
          onNext={next}
          onPrev={prev}
          canPrev={canPrev}
          canNext={canNext}
        />
      )}
      {finished && result && (
        <Results result={result} onRestart={reset} />
      )}
    </div>
  );
}
