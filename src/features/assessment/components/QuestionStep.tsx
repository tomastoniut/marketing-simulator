import React from 'react';
import { questions, dimensions } from '@/domain/questions';
import { LikertValue } from '@/domain/types';
import { Button, Card, CardDescription, CardTitle } from '@/components/ui';

interface Props {
  index: number;
  total: number;
  value?: LikertValue;
  onSelect: (v: LikertValue) => void;
  onNext: () => void;
  onPrev: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const scale: { value: LikertValue; label: string }[] = [
  { value: 1, label: 'No estoy de acuerdo' },
  { value: 2, label: 'Parcialmente de acuerdo' },
  { value: 3, label: 'Totalmente de acuerdo' }
];

export function QuestionStep({ index, total, value, onSelect, onNext, onPrev, canPrev, canNext }: Props) {
  const q = questions[index];
  const dim = dimensions.find(d => d.dimension === q.dimension);
  return (
    <Card>
        <CardTitle>{dim ? dim.name : `Dimensión ${q.dimension}`}</CardTitle>
        <CardDescription>{q.text}</CardDescription>
        <div className="flex flex-col gap-3 my-4 sm:flex-row sm:gap-2">
        {scale.map(option => {
            const active = value === option.value;
            return (
            <button
                key={option.value}
                onClick={() => onSelect(option.value)}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex-1 text-center
                ${active ? 'bg-gray-500 text-white border-gray-500' : 'bg-white text-[var(--brand-blue)] border-[var(--brand-blue)] hover:bg-[var(--progress-track)]'}`}
                aria-pressed={active}
            >{option.label}</button>
            );
        })}
        </div>
        <div className="flex gap-3 justify-between mt-6 pt-4 border-t border-gray-200">
        <Button 
          disabled={!canPrev} 
          onClick={onPrev} 
          className="px-6 py-2 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
        >
          Anterior
        </Button>
        <Button 
          variant="secondary" 
          disabled={!canNext} 
          onClick={onNext} 
          className="px-6 py-2 text-white border border-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {index === total -1 ? 'Finalizar' : 'Siguiente'}
        </Button>
        </div>
    </Card>
  );
}
