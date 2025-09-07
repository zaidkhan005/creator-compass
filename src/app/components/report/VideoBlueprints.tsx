'use client';

import VideoBlueprintCard from './VideoBlueprintCard';

export default function VideoBlueprints({ data }: { data: any[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;
  return (
    <div className="grid gap-6">
      {data.map((bp: any, idx: number) => (
        <VideoBlueprintCard key={idx} blueprint={bp} />
      ))}
    </div>
  );
}


