'use client';

import { useState } from 'react';
import { FileText, Hash, Tag } from 'lucide-react';

export default function SEOPack({ data }: { data: any }) {
  const [tab, setTab] = useState<'description'|'tags'|'hashtags'>('description');
  if (!data) return null;
  const { description, tags, hashtags } = data;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => setTab('description')} className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-lg border ${tab==='description'?'border-accent-start text-white':'border-white/10 text-secondary-text'} bg-white/5`}> <FileText size={14}/> Description</button>
        <button onClick={() => setTab('tags')} className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-lg border ${tab==='tags'?'border-accent-start text-white':'border-white/10 text-secondary-text'} bg-white/5`}> <Tag size={14}/> Tags</button>
        <button onClick={() => setTab('hashtags')} className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-lg border ${tab==='hashtags'?'border-accent-start text-white':'border-white/10 text-secondary-text'} bg-white/5`}> <Hash size={14}/> Hashtags</button>
      </div>
      {tab === 'description' && description && (
        <p className="text-secondary-text whitespace-pre-wrap">{description}</p>
      )}
      {tab === 'tags' && Array.isArray(tags) && (
        <div className="flex flex-wrap gap-2">{tags.map((t: string, i: number) => (
          <span key={i} className="text-xs rounded-md border border-white/10 bg-white/5 px-2 py-1 text-secondary-text">{t}</span>
        ))}</div>
      )}
      {tab === 'hashtags' && Array.isArray(hashtags) && (
        <div className="flex flex-wrap gap-2">{hashtags.map((h: string, i: number) => (
          <span key={i} className="text-xs rounded-md border border-white/10 bg-white/5 px-2 py-1 text-secondary-text">{h}</span>
        ))}</div>
      )}
    </div>
  );
}


