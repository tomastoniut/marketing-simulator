import { Answer, AssessmentResult, DimensionScore } from '@/domain/types';
import { dimensions, questions } from '@/domain/questions';

export interface RunAssessmentOptions { answers: Answer[] }

// Rangos por dimensión según tabla (inclusive):
// Cliente: Alto 18-15, Medio 14-10, Bajo 9-6
// Competencia: Alto 12-10, Medio 9-7, Bajo 6-4
// Interno: Alto 9-8, Medio 7-5, Bajo 4-3
// Entorno: Alto 12-10, Medio 9-7, Bajo 6-4
// Global: Alto 51-43, Medio 42-29, Bajo 28-17

export function runAssessment({ answers }: RunAssessmentOptions): AssessmentResult {
  const answerMap = new Map(answers.map(a => [a.question, a.value]));
  if (questions.some(q => !answerMap.has(q.question))) {
    throw new Error('Faltan respuestas. Debe contestar todas las preguntas.');
  }

  const dimensionScores: DimensionScore[] = dimensions.map(dim => {
    const dimQuestions = questions.filter(q => q.dimension === dim.dimension);
    const total = dimQuestions.reduce((acc, q) => acc + (answerMap.get(q.question) as number), 0);
    const category = categorizeDimension(dim.dimension, total);
    return { dimension: dim.dimension, total, max: dim.max, category };
  });

  const globalTotal = dimensionScores.reduce((a, d) => a + d.total, 0);
  const globalMax = dimensionScores.reduce((a, d) => a + d.max, 0);
  const globalCategory = categorizeGlobal(globalTotal);
  const recommendations = buildRecommendations(dimensionScores);

  return { dimensionScores, globalTotal, globalMax, globalCategory, recommendations };
}

function inRange(value: number, min: number, max: number) { return value >= min && value <= max; }

function categorizeDimension(id: number, total: number): string {
  switch (id) {
    case 1: // cliente
      if (inRange(total, 15, 18)) return 'Alto enfoque';
      if (inRange(total, 10, 14)) return 'Enfoque medio';
      return 'Enfoque bajo o nulo';
    case 2: // competencia
      if (inRange(total, 10, 12)) return 'Alto enfoque';
      if (inRange(total, 7, 9)) return 'Enfoque medio';
      return 'Enfoque bajo o nulo';
    case 3: // interno
      if (inRange(total, 8, 9)) return 'Alto enfoque';
      if (inRange(total, 5, 7)) return 'Enfoque medio';
      return 'Enfoque bajo o nulo';
    case 4: // entorno
      if (inRange(total, 10, 12)) return 'Alto enfoque';
      if (inRange(total, 7, 9)) return 'Enfoque medio';
      return 'Enfoque bajo o nulo';
    default:
      return 'Enfoque medio';
  }
}

function categorizeGlobal(total: number): string {
  if (inRange(total, 43, 51)) return 'Alto enfoque';
  if (inRange(total, 29, 42)) return 'Enfoque medio';
  return 'Enfoque bajo o nulo';
}

function buildRecommendations(dimensionScores: DimensionScore[]): string[] {
  const recs: string[] = [];
  for (const ds of dimensionScores) {
  if (ds.category === 'Enfoque bajo o nulo') {
      switch (ds.dimension) {
        case 1: recs.push('Priorizar procesos de escucha y métricas de satisfacción.'); break;
        case 2: recs.push('Implementar monitoreo competitivo estructurado.'); break;
        case 3: recs.push('Mejorar coordinación interfuncional y rituales de alineación.'); break;
        case 4: recs.push('Establecer vigilancia sistemática del macroentorno.'); break;
      }
    }
  }
  if (!recs.length) recs.push('Consolidar prácticas y buscar optimización continua.');
  return recs;
}
