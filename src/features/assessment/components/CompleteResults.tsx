import React from 'react';
import { dimensions, demographicQuestions } from '@/domain/questions';
import { CompleteAssessmentResult } from '@/domain/types';
import { Button, Card, CardDescription, CardTitle, ProgressBar } from '@/components/ui';

interface Props {
  result: CompleteAssessmentResult;
  onRestart: () => void;
}

export function CompleteResults({ result, onRestart }: Props) {
  const { demographicData, assessmentResult } = result;

  return (
    <div className="space-y-6">
      {/* Demographic Information Summary */}
      <Card>
        <CardTitle>Información del Participante</CardTitle>
        <CardDescription>Datos recopilados para análisis</CardDescription>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {demographicData.answers.map(answer => {
            const question = demographicQuestions.find(q => q.question === answer.question);
            const option = question?.options.find(opt => opt.option === answer.option);
            if (!question || !option) return null;
            
            return (
              <div key={answer.question} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  {question.text}
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {option.text}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Assessment Results */}
      <Card>
        <CardTitle>Resultado del Assessment</CardTitle>
        <CardDescription>
          Total Global: <span className="font-semibold">{assessmentResult.globalTotal}</span> / {assessmentResult.globalMax} · {assessmentResult.globalCategory}
        </CardDescription>
        <div className="mt-4 space-y-4">
          {assessmentResult.dimensionScores.map(ds => {
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
            {assessmentResult.recommendations.map((r,i) => (<li key={i}>{r}</li>))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onRestart}>Reiniciar</Button>
        </div>
      </Card>
    </div>
  );
}
