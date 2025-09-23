import { describe, it, expect } from 'vitest';
import { runAssessment } from '@/lib/assessment/engine';
import { questions, dimensions } from '@/domain/questions';

function buildAnswers(value: 1|2|3) {
  return questions.map(q => ({ question: q.question, value }));
}

describe('runAssessment', () => {
  it('calcula totales máximos con todas 3', () => {
    const result = runAssessment({ answers: buildAnswers(3) });
    const expectedMax = dimensions.reduce((a,d)=> a + d.max, 0);
    expect(result.globalTotal).toBe(expectedMax);
  expect(result.globalCategory).toBe('Alto enfoque');
  });

  it('lanza error si faltan respuestas', () => {
  expect(() => runAssessment({ answers: buildAnswers(3).slice(0, 5) })).toThrow();
  });

  it('categoria baja si todas 1', () => {
    const result = runAssessment({ answers: buildAnswers(1) });
  expect(result.globalCategory).toBe('Enfoque bajo o nulo');
  });
});
