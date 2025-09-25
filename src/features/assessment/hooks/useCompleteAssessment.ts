import { useCallback, useMemo, useState } from 'react';
import { Answer, AssessmentResult, LikertValue, DemographicAnswer, DemographicData, CompleteAssessmentResult } from '@/domain/types';
import { questions, dimensions, demographicQuestions } from '@/domain/questions';
import { runAssessment } from '@/lib/assessment/engine';

type Phase = 'demographic' | 'assessment' | 'results';

interface UseCompleteAssessmentReturn {
  // General flow
  phase: Phase;
  currentIndex: number;
  canNext: boolean;
  canPrev: boolean;
  next: () => void;
  prev: () => void;
  reset: () => void;
  
  // Demographic phase
  demographicQuestions: typeof demographicQuestions;
  demographicAnswers: DemographicAnswer[];
  setDemographicAnswer: (questionId: number, optionId: number) => void;
  
  // Assessment phase
  dimensions: typeof dimensions;
  questions: typeof questions;
  answers: Answer[];
  setAnswer: (questionId: number, value: LikertValue) => void;
  
  // Results
  result?: CompleteAssessmentResult;
}

export function useCompleteAssessment(): UseCompleteAssessmentReturn {
  const [phase, setPhase] = useState<Phase>('demographic');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Demographic data
  const [demographicAnswers, setDemographicAnswers] = useState<DemographicAnswer[]>([]);
  
  // Assessment data
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<CompleteAssessmentResult | undefined>();

  const setDemographicAnswer = useCallback((questionId: number, optionId: number) => {
    setDemographicAnswers(prev => {
      const existing = prev.find(a => a.question === questionId);
      if (existing) {
        return prev.map(a => a.question === questionId ? { ...a, option: optionId } : a);
      }
      return [...prev, { question: questionId, option: optionId }];
    });
  }, []);

  const setAnswer = useCallback((questionId: number, value: LikertValue) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.question === questionId);
      if (existing) {
        return prev.map(a => a.question === questionId ? { ...a, value } : a);
      }
      return [...prev, { question: questionId, value }];
    });
  }, []);

  const next = useCallback(() => {
    if (phase === 'demographic') {
      if (currentIndex < demographicQuestions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        // Move to assessment phase
        setPhase('assessment');
        setCurrentIndex(0);
      }
    } else if (phase === 'assessment') {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        // Run assessment and move to results
        try {
          const assessmentResult = runAssessment({ answers });
          const demographicData: DemographicData = { answers: demographicAnswers };
          const completeResult: CompleteAssessmentResult = {
            demographicData,
            assessmentResult
          };
          setResult(completeResult);
          setPhase('results');
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    }
  }, [phase, currentIndex, answers, demographicAnswers]);

  const prev = useCallback(() => {
    if (phase === 'assessment' && currentIndex === 0) {
      // Go back to last demographic question
      setPhase('demographic');
      setCurrentIndex(demographicQuestions.length - 1);
    } else if (phase === 'demographic' || phase === 'assessment') {
      setCurrentIndex(i => Math.max(0, i - 1));
    }
  }, [phase, currentIndex]);

  const canNext = useMemo(() => {
    if (phase === 'results') return false;
    
    if (phase === 'demographic') {
      const currentQuestion = demographicQuestions[currentIndex];
      return demographicAnswers.some(a => a.question === currentQuestion.question);
    }
    
    if (phase === 'assessment') {
      const currentQuestion = questions[currentIndex];
      return answers.some(a => a.question === currentQuestion.question);
    }
    
    return false;
  }, [phase, currentIndex, demographicAnswers, answers]);

  const canPrev = useMemo(() => {
    if (phase === 'results') return false;
    if (phase === 'demographic') return currentIndex > 0;
    if (phase === 'assessment') return true; // Can always go back from assessment
    return false;
  }, [phase, currentIndex]);

  const reset = useCallback(() => {
    setPhase('demographic');
    setCurrentIndex(0);
    setDemographicAnswers([]);
    setAnswers([]);
    setResult(undefined);
  }, []);

  return {
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
    dimensions,
    questions,
    answers,
    setAnswer,
    result,
  };
}
