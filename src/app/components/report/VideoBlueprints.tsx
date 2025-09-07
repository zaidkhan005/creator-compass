'use client';

import VideoBlueprintCard from './VideoBlueprintCard';
import type { VideoBlueprint } from './VideoBlueprintCard';

export default function VideoBlueprints({ data }: { data: VideoBlueprint[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;
  return (
    <div className="grid gap-6">
      {data.map((bp: VideoBlueprint, idx: number) => (
        <VideoBlueprintCard key={idx} blueprint={bp} />
      ))}
    </div>
  );
}


