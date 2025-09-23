import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full h-2 rounded overflow-hidden border" style={{ background: '#ffffff', borderColor: 'var(--brand-blue)' }}>
      <div
        className="h-full transition-all"
        style={{ width: `${pct}%`, background: 'var(--brand-blue)' }}
      />
    </div>
  );
}
