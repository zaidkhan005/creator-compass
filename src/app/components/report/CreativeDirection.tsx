'use client';

import { Clapperboard } from 'lucide-react';

export default function CreativeDirection({ data }: { data: any }) {
  if (!data) return null;
  const { style, brollIdeas, colorPalette, pacing, callToAction } = data;
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Clapperboard size={16} className="text-accent-start" />
        <h4 className="text-base font-display text-white">Creative Direction</h4>
      </div>
      {style && <p className="text-secondary-text"><span className="text-white font-medium">Style:</span> {style}</p>}
      {pacing && <p className="text-secondary-text"><span className="text-white font-medium">Pacing:</span> {pacing}</p>}
      {colorPalette && <p className="text-secondary-text"><span className="text-white font-medium">Colors:</span> {colorPalette}</p>}
      {brollIdeas && Array.isArray(brollIdeas) && (
        <p className="text-secondary-text"><span className="text-white font-medium">B‑roll:</span> {brollIdeas.join(', ')}</p>
      )}
      {callToAction && <p className="text-secondary-text"><span className="text-white font-medium">CTA:</span> {callToAction}</p>}
    </div>
  );
}


