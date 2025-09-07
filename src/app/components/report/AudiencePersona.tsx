'use client';

import { User } from 'lucide-react';

type AudiencePersonaProps = {
  data: any;
};

export default function AudiencePersona({ data }: AudiencePersonaProps) {
  if (!data) return null;

  const { name, ageRange, demographics, interests, painPoints, goals, summary } = data;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-xl bg-accent-start/20 p-2 text-accent-start">
          <User size={18} />
        </div>
        <h3 className="text-lg font-display text-white">Audience Persona</h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-secondary-text"><span className="text-white font-medium">Name:</span> {name}</p>
          {ageRange && <p className="text-secondary-text"><span className="text-white font-medium">Age:</span> {ageRange}</p>}
          {demographics && <p className="text-secondary-text"><span className="text-white font-medium">Demographics:</span> {demographics}</p>}
          {interests && Array.isArray(interests) && (
            <p className="text-secondary-text"><span className="text-white font-medium">Interests:</span> {interests.join(', ')}</p>
          )}
        </div>
        <div>
          {painPoints && Array.isArray(painPoints) && (
            <p className="text-secondary-text"><span className="text-white font-medium">Pain Points:</span> {painPoints.join(', ')}</p>
          )}
          {goals && Array.isArray(goals) && (
            <p className="text-secondary-text"><span className="text-white font-medium">Goals:</span> {goals.join(', ')}</p>
          )}
        </div>
      </div>
      {summary && <p className="mt-4 text-secondary-text">{summary}</p>}
    </div>
  );
}


