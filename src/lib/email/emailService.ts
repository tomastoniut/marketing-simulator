import emailjs from '@emailjs/browser';
import { CompleteAssessmentResult } from '@/domain/types';
import { dimensions, demographicQuestions } from '@/domain/questions';

// EmailJS Configuration - Lee desde variables de entorno
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',  
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

export interface EmailRequest {
  email: string;
  result: CompleteAssessmentResult;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

// Envío directo desde frontend con EmailJS
export async function sendResultsByEmail({ email, result }: EmailRequest): Promise<EmailResponse> {
  try {
    // Generar contenido legible
    const emailContent = generateEmailContent(result);
    
    // Parámetros para el template de EmailJS
    const templateParams = {
      to_email: email,
      to_name: 'Usuario', // Podrías extraer nombre de datos demográficos
      subject: 'Resultados de Evaluación de Orientación al Marketing',
      message: emailContent,
      global_score: `${result.assessmentResult.globalTotal}/${result.assessmentResult.globalMax}`,
      global_category: result.assessmentResult.globalCategory,
    };

    // Enviar email
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Email enviado exitosamente'
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Error al enviar el email'
    };
  }
}

// Función helper para generar contenido legible del email
export function generateEmailContent(result: CompleteAssessmentResult): string {
  const { demographicData, assessmentResult } = result;
  
  // Datos demográficos legibles
  const demographicInfo = demographicData.answers.map(answer => {
    const question = demographicQuestions.find(q => q.question === answer.question);
    const option = question?.options.find(opt => opt.option === answer.option);
    return question && option ? `${question.text}: ${option.text}` : '';
  }).filter(Boolean).join('\n');

  // Resultados por dimensión
  const dimensionResults = assessmentResult.dimensionScores.map(score => {
    const dim = dimensions.find(d => d.dimension === score.dimension);
    return `${dim?.name || 'Dimensión ' + score.dimension}: ${score.total}/${score.max} - ${score.category}`;
  }).join('\n');

  // Recomendaciones
  const recommendations = assessmentResult.recommendations.map(rec => `• ${rec}`).join('\n');

  const content = `
=== RESULTADOS DE EVALUACIÓN DE ORIENTACIÓN AL MARKETING ===

📊 RESULTADO GLOBAL:
Total: ${assessmentResult.globalTotal}/${assessmentResult.globalMax}
Categoría: ${assessmentResult.globalCategory}

👤 INFORMACIÓN DEL PARTICIPANTE:
${demographicInfo}

📈 RESULTADOS POR DIMENSIÓN:
${dimensionResults}

💡 RECOMENDACIONES:
${recommendations}

---
Evaluación generada por el Simulador de Marketing - Universidad FASTA
  `;
  
  return content;
}
