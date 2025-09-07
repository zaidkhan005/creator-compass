'use client';

import { ListOrdered, Sparkles } from 'lucide-react';
import CreativeDirection from './CreativeDirection';
import SEOPack from './SEOPack';

export default function VideoBlueprintCard({ blueprint }: { blueprint: any }) {
  if (!blueprint) return null;
  const { titleOptions, hook, outline, creativeDirection, seo } = blueprint;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-accent-start" />
        <h3 className="text-xl font-display text-white">{blueprint.title || 'Video Idea'}</h3>
      </div>

      {Array.isArray(titleOptions) && titleOptions.length > 0 && (
        <div>
          <h4 className="text-base font-display text-white mb-2">Title Options</h4>
          <ul className="list-disc pl-5 text-secondary-text space-y-1">
            {titleOptions.map((t: string, i: number) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      {hook && (
        <div>
          <h4 className="text-base font-display text-white mb-1">Hook</h4>
          <p className="text-secondary-text">{hook}</p>
        </div>
      )}

      {Array.isArray(outline) && outline.length > 0 && (
        <div>
          <h4 className="text-base font-display text-white mb-2 inline-flex items-center gap-2"><ListOrdered size={14}/> Outline</h4>
          <ol className="list-decimal pl-5 text-secondary-text space-y-1">
            {outline.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <CreativeDirection data={creativeDirection} />
      <SEOPack data={seo} />
    </div>
  );
}


