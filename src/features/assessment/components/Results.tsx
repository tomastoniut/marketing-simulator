import React from 'react';
import { dimensions } from '@/domain/questions';
import { AssessmentResult } from '@/domain/types';
import { Button, Card, CardDescription, CardTitle, ProgressBar } from '@/components/ui';

interface Props {
  result: AssessmentResult;
  onRestart: () => void;
}

export function Results({ result, onRestart }: Props) {
  return (
    <Card>
      <CardTitle>Resultado General</CardTitle>
      <CardDescription>
        Total Global: <span className="font-semibold">{result.globalTotal}</span> / {result.globalMax} · {result.globalCategory}
      </CardDescription>
      <div className="mt-4 space-y-4">
        {result.dimensionScores.map(ds => {
      const dim = dimensions.find(d => d.dimension === ds.dimension)!;
          const pct = (ds.total / ds.max) * 100;
          return (
            <div key={ds.dimension}>
              <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{dim.name}</span>
        <span>{ds.total}/{ds.max} · {ds.category}</span>
              </div>
              <ProgressBar current={pct} total={100} />
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">Recomendaciones:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {result.recommendations.map((r,i)=>(<li key={i}>{r}</li>))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onRestart}>Reiniciar</Button>
      </div>
    </Card>
  );
}
