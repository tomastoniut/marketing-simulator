import React, { useState } from 'react';
import { CompleteAssessmentResult } from '@/domain/types';
import { Button, Card, CardDescription, CardTitle } from '@/components/ui';
import { sendResultsByEmail } from '@/lib/email/emailService';

interface Props {
  result: CompleteAssessmentResult;
}

export function EmailResults({ result }: Props) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Llamada real a EmailJS
      const response = await sendResultsByEmail({ email, result });
      
      if (response.success) {
        setIsSent(true);
      } else {
        setError(response.message || 'Error al enviar el email');
      }
    } catch (err) {
      setError('Error al enviar el email. Por favor intenta nuevamente.');
      console.error('Error sending email:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (isSent) {
    return (
      <Card>
        <CardTitle>✅ Resultados Enviados</CardTitle>
        <CardDescription>
          Los resultados han sido enviados exitosamente a <strong>{email}</strong>
        </CardDescription>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            Revisa tu bandeja de entrada y carpeta de spam. Los resultados incluyen tu análisis completo y recomendaciones personalizadas.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle>📧 Enviar Resultados por Email</CardTitle>
      <CardDescription>
        Recibe una copia completa de tus resultados en tu correo electrónico
      </CardDescription>
      
      <form onSubmit={handleSendEmail} className="mt-4 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Dirección de Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-[var(--brand-blue)] outline-none transition-colors"
            disabled={isLoading}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              'Enviar Resultados'
            )}
          </Button>
        </div>
      </form>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Qué incluye el email:</strong> Análisis completo por dimensiones, clasificación global, recomendaciones personalizadas y datos demográficos.
        </p>
      </div>
    </Card>
  );
}
