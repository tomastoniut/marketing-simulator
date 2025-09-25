import { Dimension, Question, QuestionFull, DemographicQuestion } from './types';

// Demographic Questions - following same numeric structure as assessment questions
export const demographicQuestions: DemographicQuestion[] = [
  {
    question: 1,
    text: 'Rol',
    options: [
      { option: 1, text: 'Propietario' },
      { option: 2, text: 'No Propietario' }
    ]
  },
  {
    question: 2,
    text: 'Edad',
    options: [
      { option: 1, text: 'Menor o igual a 30 años' },
      { option: 2, text: 'Mayor de 30 años' }
    ]
  },
  {
    question: 3,
    text: 'Rubro',
    options: [
      { option: 1, text: 'Comercial' },
      { option: 2, text: 'Servicios' },
      { option: 3, text: 'Productiva' }
    ]
  },
  {
    question: 4,
    text: 'Cantidad de empleados',
    options: [
      { option: 1, text: '0-3' },
      { option: 2, text: '4-10' },
      { option: 3, text: 'Mas de 10 empleados' }
    ]
  },
  {
    question: 5,
    text: 'Forma jurídica',
    options: [
      { option: 1, text: 'Unipersonal' },
      { option: 2, text: 'Sociedad' }
    ]
  },
  {
    question: 6,

    text: 'Cuenta con Sucursales',
    options: [
      { option: 1, text: 'Si' },
      { option: 2, text: 'No' }
    ]
  },
  {
    question: 7,
    text: 'Ubicación',
    options: [
      { option: 1, text: 'Mar del Plata' },
      { option: 2, text: 'No Mar del Plata' }
    ]
  }
];

// Según tabla oficial: 4 dimensiones. Ajustaremos número de preguntas para que los máximos coincidan con la tabla.
// Tabla esperada (rangos Alto enfoque): Cliente 18-15, Competencia 12-10, Interno 9-8, Entorno 12-10.
// Para obtener esos máximos con escala 1-3: nPreguntas * 3 = max.
// => Cliente: 6 preguntas (6*3=18)
// => Competencia: 4 preguntas (4*3=12)
// => Interno: 3 preguntas (3*3=9)
// => Entorno: 4 preguntas (4*3=12)

export const dimensions: Dimension[] = [
  { dimension: 1, name: 'Orientación al Cliente', description: 'Procesos centrados en entender y satisfacer al cliente.', max: 18 },
  { dimension: 2, name: 'Orientación a la Competencia', description: 'Monitoreo sistemático y respuesta estratégica.', max: 12 },
  { dimension: 3, name: 'Enfoque Interno / Coordinación', description: 'Integración y coordinación interfuncional.', max: 9 },
  { dimension: 4, name: 'Orientación al Entorno', description: 'Vigilancia del macroentorno y adaptación.', max: 12 },
];

// Preguntas placeholder alineadas a cada dimensión (pueden reemplazarse por las oficiales exactas luego)
export const questions: Question[] = [
  // Cliente (6)
  { question: 1, dimension: 1, text: 'Escuchamos de forma activa al cliente para brindar luego un mejor servicio.' },
  { question: 2, dimension: 1, text: 'Las estrategias de la empresa se orientan en crear valor para el cliente.' },
  { question: 3, dimension: 1, text: 'Comprender las necesidades de los clientes nos permite obtener ventajas competitivas.' },
  { question: 4, dimension: 1, text: 'Nuestros objetivos empresariales se basan en el nivel de satisfacción de los clientes.' },
  { question: 5, dimension: 1, text: 'Nos preocupa no poder cumplir con las expectativas de los clientes.' },
  { question: 6, dimension: 1, text: 'Estamos pendientes de las quejas de los clientes.' },
  // Competencia (4) - versión oficial
  { question: 7, dimension: 2, text: 'Internamente se debate cuando obtenemos información estratégica de nuestros competidores.' },
  { question: 8, dimension: 2, text: 'Respondemos rápidamente ante las acciones de nuestros competidores, que pueden generar una amenaza actual o futura.' },
  { question: 9, dimension: 2, text: 'Se discuten las fortalezas y debilidades de nuestros competidores.' },
  { question: 10, dimension: 2, text: 'Contamos con un sistema de información de nuestros competidores usado para la toma de decisiones.' },
  // Interno (3) - versión oficial
  { question: 11, dimension: 3, text: 'Todas las áreas de nuestra organización funcionan en forma coordinada en base a generar valor para el cliente.' },
  { question: 12, dimension: 3, text: 'Compartimos nuestra experiencia (éxito o fracaso) con todo el personal de la empresa.' },
  { question: 13, dimension: 3, text: 'La información se comparte internamente para la mejora en la relación con el cliente.' },
  // Entorno (4) - versión oficial
  { question: 14, dimension: 4, text: 'Nos preocupa el sostenimiento del entorno natural, social y cultural, por tal razón fomentamos conductas compatibles con esta filosofía.' },
  { question: 15, dimension: 4, text: 'Fomentamos en la organización las prácticas que no generen impacto ambiental negativo.' },
  { question: 16, dimension: 4, text: 'En nuestra organización le damos un tratamiento responsable a los residuos.' },
  { question: 17, dimension: 4, text: 'Tenemos sensibilidad social y obramos en consecuencia.' },
];

// Helper para obtener preguntas enriquecidas con el objeto dimension
export function getQuestionsFull(): QuestionFull[] {
  const dimMap = new Map(dimensions.map(d => [d.dimension, d]));
  return questions.map(q => ({ ...q, dimensionObj: dimMap.get(q.dimension)! }));
}
