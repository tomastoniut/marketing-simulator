import React from 'react';
import { useCompleteAssessment } from '../hooks/useCompleteAssessment';
import { AllDemographicQuestions } from './AllDemographicQuestions';
import { QuestionStep } from './QuestionStep';
import { CompleteResults } from './CompleteResults';
import { ProgressBar } from '@/components/ui';

export function CompleteAssessmentFlow() {
  const {
    phase,
    currentIndex,
    canNext,
    canPrev,
    next,
    prev,
    reset,
    demographicQuestions,
    demographicAnswers,
    setDemographicAnswer,
    questions,
    answers,
    setAnswer,
    result,
  } = useCompleteAssessment();

  // Calculate overall progress
  const totalSteps = 1 + questions.length; // 1 step for all demographic questions + individual assessment questions
  const currentStep = phase === 'demographic' 
    ? 1 
    : phase === 'assessment' 
    ? 1 + currentIndex + 1
    : totalSteps;
  const progressPercent = phase === 'results' ? 100 : (currentStep / totalSteps) * 100;

  if (phase === 'results' && result) {
    return <CompleteResults result={result} onRestart={reset} />;
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">
            {phase === 'demographic' && 'Información General'}
            {phase === 'assessment' && 'Cuestionario de Marketing'}
          </span>
          <span>{currentStep} de {totalSteps}</span>
        </div>
        <ProgressBar current={progressPercent} total={100} />
      </div>

      {/* Current Step Content */}
      {phase === 'demographic' && (
        <AllDemographicQuestions
          questions={demographicQuestions}
          answers={demographicAnswers}
          onSelect={setDemographicAnswer}
          onNext={next}
          canNext={canNext}
        />
      )}

      {phase === 'assessment' && (
        <QuestionStep
          index={currentIndex}
          total={questions.length}
          value={answers.find(a => a.question === questions[currentIndex].question)?.value}
          onSelect={(value) => setAnswer(questions[currentIndex].question, value)}
          onNext={next}
          onPrev={prev}
          canNext={canNext}
          canPrev={canPrev}
        />
      )}
    </div>
  );
}
