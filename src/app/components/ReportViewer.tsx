'use client';

import { motion } from 'framer-motion';
import TrendAnalysis from './report/TrendAnalysis';
import StrategicPosition from './report/StrategicPosition';
import AudiencePersona from './report/AudiencePersona';
import VideoBlueprints from './report/VideoBlueprints';
import PromotionPlan from './report/PromotionPlan';
import DownloadButton from './DownloadButton';

type ReportData = any;

interface ReportViewerProps {
  report: ReportData;
  niche: string;
}

export default function ReportViewer({ report, niche }: ReportViewerProps) {
  if (!report) return null;

  const fileName = `Creator-Compass-Report-${niche.replace(/\s+/g, '-')}`;

  return (
    <>
      <div id="report-content" className="bg-background">
        <motion.div
          className="w-full max-w-4xl mx-auto p-4 sm:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-display text-white text-center mb-2">
            Your YouTube Strategy for: <span className="text-accent-start">{niche}</span>
          </h1>
          <p className="text-center text-secondary-text mb-12">
            Generated on Sunday, September 7, 2025
          </p>

          <h2 className="text-2xl font-display text-white mb-4">Market Trend Analysis</h2>
          <div className="grid gap-4 mb-10">
            <TrendAnalysis data={report?.marketTrendAnalysis} />
          </div>

          <h2 className="text-2xl font-display text-white mb-4">Strategic Position</h2>
          <div className="grid gap-4 mb-10">
            <StrategicPosition data={report?.strategicPosition} />
          </div>

          <h2 className="text-2xl font-display text-white mb-4">Audience Persona</h2>
          <div className="grid gap-4 mb-10">
            <AudiencePersona data={report?.targetAudiencePersona} />
          </div>

          <h2 className="text-2xl font-display text-white mb-4">Video Blueprints</h2>
          <div className="grid gap-4 mb-10">
            <VideoBlueprints data={report?.videoBlueprints} />
          </div>

          <h2 className="text-2xl font-display text-white mb-4">Promotion Plan</h2>
          <div className="grid gap-4">
            <PromotionPlan data={report?.promotionPlan} />
          </div>
        </motion.div>
      </div>
      <DownloadButton reportId="report-content" fileName={fileName} />
    </>
  );
}


