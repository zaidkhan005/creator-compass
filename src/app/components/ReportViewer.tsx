'use client';

import { motion } from 'framer-motion';
import TrendAnalysis from './report/TrendAnalysis';
import StrategicPosition from './report/StrategicPosition';
import AudiencePersona from './report/AudiencePersona';
import VideoBlueprints from './report/VideoBlueprints';
import PromotionPlan from './report/PromotionPlan';
import DownloadButton from './DownloadButton';

export interface TrendItem { title?: string; description?: string; longevityScore?: number }
export interface TrendAnalysisData { trends?: TrendItem[] }
export interface StrategicPositionData { contentGap?: string; trendNicheFusion?: string }
export interface AudiencePersonaData { name?: string; ageRange?: string; demographics?: string; interests?: string[]; painPoints?: string[]; goals?: string[]; summary?: string }
export interface VideoBlueprint {
  title?: string;
  titleOptions?: string[];
  hook?: string;
  outline?: string[];
  creativeDirection?: { style?: string; brollIdeas?: string[]; colorPalette?: string; pacing?: string; callToAction?: string };
  seo?: { description?: string; tags?: string[]; hashtags?: string[] };
}
export interface PromotionPost { platform?: string; content?: string; timing?: string }
export interface PromotionPlanData { socialPosts?: PromotionPost[] }

type ReportData = {
  marketTrendAnalysis?: TrendAnalysisData;
  strategicPosition?: StrategicPositionData;
  targetAudiencePersona?: AudiencePersonaData;
  videoBlueprints?: VideoBlueprint[];
  promotionPlan?: PromotionPlanData;
};

interface ReportViewerProps {
  report: ReportData;
  niche: string;
}

export default function ReportViewer({ report, niche }: ReportViewerProps) {
  if (!report) return null;

  const fileName = `Creator-Compass-Report-${niche.replace(/\s+/g, '-')}`;

  return (
    <>
      <div id="report-content" className="bg-background" aria-label="Creator Compass report content">
        <motion.div
          className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-white text-center mb-2">
            Your YouTube Strategy for: <span className="text-accent-start">{niche}</span>
          </h1>
          <p className="text-center text-secondary-text mb-8 sm:mb-12">
            Generated on Sunday, September 7, 2025
          </p>

          <h2 className="text-2xl md:text-3xl font-display text-white mb-4">Market Trend Analysis</h2>
          <div className="grid gap-4 mb-10">
            {report?.marketTrendAnalysis && (
              <TrendAnalysis data={report.marketTrendAnalysis} />
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-display text-white mb-4">Strategic Position</h2>
          <div className="grid gap-4 mb-10">
            {report?.strategicPosition && (
              <StrategicPosition data={report.strategicPosition} />
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-display text-white mb-4">Audience Persona</h2>
          <div className="grid gap-4 mb-10">
            {report?.targetAudiencePersona && (
              <AudiencePersona data={report.targetAudiencePersona} />
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-display text-white mb-4">Video Blueprints</h2>
          <div className="grid gap-4 mb-10">
            {report?.videoBlueprints && (
              <VideoBlueprints data={report.videoBlueprints} />
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-display text-white mb-4">Promotion Plan</h2>
          <div className="grid gap-4">
            {report?.promotionPlan && (
              <PromotionPlan data={report.promotionPlan} />
            )}
          </div>
        </motion.div>
      </div>
      <DownloadButton reportId="report-content" fileName={fileName} />
    </>
  );
}


