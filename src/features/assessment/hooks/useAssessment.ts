import { useCallback, useMemo, useState } from 'react';
import { Answer, AssessmentResult, LikertValue } from '@/domain/types';
import { questions, dimensions } from '@/domain/questions';
import { runAssessment } from '@/lib/assessment/engine';

interface UseAssessmentReturn {
  dimensions: typeof dimensions;
  questions: typeof questions;
  currentIndex: number;
  total: number;
  answers: Answer[];
  setAnswer: (questionId: number, value: LikertValue) => void;
  next: () => void;
  prev: () => void;
  canNext: boolean;
  canPrev: boolean;
  finished: boolean;
  result?: AssessmentResult;
  reset: () => void;
}

export function useAssessment(): UseAssessmentReturn {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | undefined>();

  const total = questions.length;
  const finished = currentIndex >= total;

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
    if (currentIndex < total - 1) {
      setCurrentIndex(i => i + 1);
    } else if (currentIndex === total - 1) {
      // Ejecutar evaluación
      try {
        const r = runAssessment({ answers });
        setResult(r);
        setCurrentIndex(i => i + 1); // marca finished
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  }, [currentIndex, total, answers]);

  const prev = useCallback(() => {
    setCurrentIndex(i => Math.max(0, i - 1));
  }, []);

  const canNext = useMemo(() => {
    if (finished) return false;
  const q = questions[currentIndex];
  return answers.some(a => a.question === q.question);
  }, [answers, currentIndex, finished]);

  const canPrev = currentIndex > 0 && !finished;

  const reset = useCallback(() => {
    setAnswers([]);
    setResult(undefined);
    setCurrentIndex(0);
  }, []);

  return {
    dimensions,
    questions,
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
  };
}
