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

const scale: LikertValue[] = [1,2,3];

export function QuestionStep({ index, total, value, onSelect, onNext, onPrev, canPrev, canNext }: Props) {
  const q = questions[index];
  const dim = dimensions.find(d => d.dimension === q.dimension);
  return (
    <Card>
        <CardTitle>{dim ? dim.name : `Dimensión ${q.dimension}`}</CardTitle>
        <CardDescription>{q.text}</CardDescription>
        <div className="flex gap-2 my-4 items-center">
        {scale.map(s => {
            const active = value === s;
            return (
            <button
                key={s}
                onClick={() => onSelect(s)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium transition-colors
                ${active ? 'bg-[var(--brand-blue)] text-white border-[var(--brand-blue)]' : 'bg-white text-[var(--brand-blue)] border-[var(--brand-blue)] hover:bg-[var(--progress-track)]'}`}
                aria-pressed={active}
            >{s}</button>
            );
        })}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex flex-col gap-0.5">
        <span>1 = No estoy de acuerdo</span>
        <span>2 = Parcialmente de acuerdo</span>
        <span>3 = Totalmente de acuerdo</span>
        </div>
        <div className="flex gap-2 justify-end">
        <Button disabled={!canPrev} onClick={onPrev}>Anterior</Button>
        <Button variant="secondary" disabled={!canNext} onClick={onNext}>{index === total -1 ? 'Finalizar' : 'Siguiente'}</Button>
        </div>
    </Card>
  );
}
