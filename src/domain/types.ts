// Tipos de dominio para la evaluación de Orientación al Marketing (escala 1-3)

export type LikertValue = 1 | 2 | 3;

export interface Dimension {
  /** PK */
  dimension: number; // 1..4
  name: string;
  description: string;
  max: number; // maximum score (questionsCount * 3)
}

export interface Question {
  /** PK */
  question: number;
  /** FK -> Dimension.dimension */
  dimension: number;
  text: string;
}

// ViewModel enriquecido para capa de presentación
export interface QuestionFull extends Question {
  dimensionObj: Dimension;
}

export interface Answer {
  /** FK -> Question.question */
  question: number;
  value: LikertValue;
}

export interface DimensionScore {
  /** FK -> Dimension.dimension */
  dimension: number;
  total: number;
  max: number;
  category: string;
}

export interface AssessmentResult {
  dimensionScores: DimensionScore[];
  globalTotal: number;
  globalMax: number;
  globalCategory: string;
  recommendations: string[];
}

// Demographic questions types - following same pattern as Assessment questions
export interface DemographicOption {
  option: number; // numeric ID like question field
  text: string;   // display text
}

export interface DemographicQuestion {
  question: number;     // numeric ID like assessment questions
  text: string;         // display text
  options: DemographicOption[];
}

export interface DemographicAnswer {
  question: number;     // FK -> DemographicQuestion.question
  option: number;       // FK -> DemographicOption.option
}

export interface DemographicData {
  answers: DemographicAnswer[];
}

export interface CompleteAssessmentResult {
  demographicData: DemographicData;
  assessmentResult: AssessmentResult;
}
