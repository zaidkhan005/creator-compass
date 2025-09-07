'use client';

import { Share2 } from 'lucide-react';

export interface PromotionPost { platform?: string; content?: string; timing?: string }
export interface PromotionPlanData { socialPosts?: PromotionPost[] }

export default function PromotionPlan({ data }: { data: PromotionPlanData }) {
  if (!data) return null;
  const { socialPosts } = data;

  return (
    <div className="grid gap-4">
      {Array.isArray(socialPosts) && socialPosts.map((post: PromotionPost, i: number) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Share2 size={16} className="text-accent-start" />
            <h4 className="text-base font-display text-white">{post.platform || 'Post'}</h4>
          </div>
          {post.content && <p className="text-secondary-text whitespace-pre-wrap">{post.content}</p>}
          {post.timing && <p className="mt-2 text-xs text-secondary-text">Timing: {post.timing}</p>}
        </div>
      ))}
    </div>
  );
}


