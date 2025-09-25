import React from 'react';
import { DemographicQuestion } from '@/domain/types';
import { Button, Card, CardDescription, CardTitle } from '@/components/ui';

interface Props {
  question: DemographicQuestion;
  index: number;
  total: number;
  selectedOption?: number;
  onSelect: (optionId: number) => void;
  onNext: () => void;
  onPrev: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function DemographicStep({ 
  question, 
  index, 
  total, 
  selectedOption, 
  onSelect, 
  onNext, 
  onPrev, 
  canPrev, 
  canNext 
}: Props) {
  return (
    <Card>
      <CardTitle>Información general - Pregunta {index + 1} de {total}</CardTitle>
      <CardDescription>{question.text}</CardDescription>
      
      <div className="space-y-3 my-6">
        {question.options.map(option => {
          const isSelected = selectedOption === option.option;
          return (
            <label 
              key={option.option} 
              className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name={`question-${question.question}`}
                value={option.option}
                checked={isSelected}
                onChange={() => onSelect(option.option)}
                className="w-4 h-4 text-[var(--brand-blue)] bg-gray-100 border-gray-300 focus:ring-[var(--brand-blue)] focus:ring-2"
              />
              <span className="text-sm font-medium text-gray-900">
                {option.text}
              </span>
            </label>
          );
        })}
      </div>

      <div className="flex gap-2 justify-end">
        <Button disabled={!canPrev} onClick={onPrev}>
          Anterior
        </Button>
        <Button variant="secondary" disabled={!canNext} onClick={onNext}>
          {index === total - 1 ? 'Continuar al Cuestionario' : 'Siguiente'}
        </Button>
      </div>
    </Card>
  );
}
