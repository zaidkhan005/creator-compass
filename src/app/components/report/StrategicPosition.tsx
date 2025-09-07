'use client';

import { Lightbulb, Target } from 'lucide-react';

export interface StrategicPositionData {
  contentGap?: string;
  trendNicheFusion?: string;
}

type StrategicPositionProps = {
  data: StrategicPositionData;
};

export default function StrategicPosition({ data }: StrategicPositionProps) {
  if (!data) return null;

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-yellow-400/20 p-2 text-yellow-300">
            <Lightbulb size={18} />
          </div>
          <div>
            <h3 className="text-lg font-display text-white">Content Gap</h3>
            <p className="mt-2 text-secondary-text">{data.contentGap}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-green-400/20 bg-green-400/5 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-green-400/20 p-2 text-green-300">
            <Target size={18} />
          </div>
          <div>
            <h3 className="text-lg font-display text-white">Trend–Niche Fusion</h3>
            <p className="mt-2 text-secondary-text">{data.trendNicheFusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


