import React from 'react';
import { DemographicQuestion } from '@/domain/types';
import { Button, Card, CardDescription, CardTitle } from '@/components/ui';

interface Props {
  questions: DemographicQuestion[];
  answers: Array<{ question: number; option: number }>;
  onSelect: (questionId: number, optionId: number) => void;
  onNext: () => void;
  canNext: boolean;
}

export function AllDemographicQuestions({ 
  questions, 
  answers, 
  onSelect, 
  onNext, 
  canNext 
}: Props) {
  const getSelectedOption = (questionId: number) => {
    return answers.find(a => a.question === questionId)?.option;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Información General</CardTitle>
        <CardDescription>
          Por favor, completa la siguiente información sobre tu empresa. 
          Puedes responder las preguntas en cualquier orden.
        </CardDescription>
      </Card>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {questions.map((question, index) => {
          const selectedOption = getSelectedOption(question.question);
          
          return (
            <Card key={question.question} className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {index + 1}. {question.text}
              </h3>
              
              <div className="space-y-3">
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
                        onChange={() => onSelect(question.question, option.option)}
                        className="w-4 h-4 text-[var(--brand-blue)] bg-gray-100 border-gray-300 focus:ring-[var(--brand-blue)] focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {option.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button 
          variant="secondary" 
          disabled={!canNext} 
          onClick={onNext} 
          className="w-full sm:w-auto"
        >
          Continuar al Cuestionario de Marketing
        </Button>
      </div>
    </div>
  );
}
