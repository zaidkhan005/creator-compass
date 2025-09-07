'use client';

import { Flame } from 'lucide-react';

type TrendAnalysisProps = {
  data: any;
};

export default function TrendAnalysis({ data }: TrendAnalysisProps) {
  if (!data || !Array.isArray(data.trends)) return null;

  return (
    <div className="grid gap-4">
      {data.trends.map((trend: any, index: number) => (
        <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-accent-start/20 p-2 text-accent-start">
                <Flame size={18} />
              </div>
              <h3 className="text-lg font-display text-white">{trend.title}</h3>
            </div>
            {typeof trend.longevityScore === 'number' && (
              <span className="text-sm text-secondary-text">Longevity: <span className="text-white font-medium">{trend.longevityScore}/10</span></span>
            )}
          </div>
          {trend.description && (
            <p className="mt-3 text-secondary-text">{trend.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}


