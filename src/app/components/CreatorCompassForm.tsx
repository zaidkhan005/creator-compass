'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Plus } from "lucide-react";
import LoadingIndicator from "./LoadingIndicator";
import ReportViewer from './ReportViewer';

// Define a type for our report structure for TypeScript
type TrendItem = { title?: string; description?: string; longevityScore?: number };
type TrendAnalysisData = { trends?: TrendItem[] };
type StrategicPositionData = { contentGap?: string; trendNicheFusion?: string };
type AudiencePersonaData = { name?: string; ageRange?: string; demographics?: string; interests?: string[]; painPoints?: string[]; goals?: string[]; summary?: string };
type VideoBlueprint = {
  title?: string;
  titleOptions?: string[];
  hook?: string;
  outline?: string[];
  creativeDirection?: { style?: string; brollIdeas?: string[]; colorPalette?: string; pacing?: string; callToAction?: string };
  seo?: { description?: string; tags?: string[]; hashtags?: string[] };
};
type PromotionPost = { platform?: string; content?: string; timing?: string };
type PromotionPlanData = { socialPosts?: PromotionPost[] };
type ReportData = {
  report?: {
    marketTrendAnalysis?: TrendAnalysisData;
    strategicPosition?: StrategicPositionData;
    targetAudiencePersona?: AudiencePersonaData;
    videoBlueprints?: VideoBlueprint[];
    promotionPlan?: PromotionPlanData;
  };
};

export default function CreatorCompassForm() {
  const [niche, setNiche] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([""]);
  const [region, setRegion] = useState("Worldwide");
  const [promoVisible, setPromoVisible] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  function handleCompetitorChange(index: number, value: string) {
    setCompetitors((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  function addCompetitorField() {
    setCompetitors((prev) => [...prev, ""]);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niche: niche,
          competitors: competitors.filter((c) => c.trim() !== ''),
          region: region,
          promoCode: promoCode,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setReport(data.report);
        // Log the complete report for developer visibility
        // eslint-disable-next-line no-console
        console.log('Report:', data.report);
      } else {
        setError(data.message || 'An unknown error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setLoading(false);
    setReport(null);
  };

  if (loading) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-display text-white mb-4">Crafting Your Report...</h2>
        <p className="text-secondary-text">This can take up to 30 seconds. The AI is working its magic!</p>
        <div className="mt-8 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  if (report) {
    return <ReportViewer report={report.report} niche={niche} />;
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-2xl text-red-400">Something Went Wrong</h2>
        <p className="text-secondary-text mt-2">{error}</p>
        <button
          onClick={resetState}
          className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-primary-text hover:bg-white/10 active:scale-95 transition"
          aria-label="Try again after an error"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="text-left"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Niche */}
        <div className="space-y-2">
          <label htmlFor="niche" className="block text-secondary-text text-sm">Niche</label>
          <textarea
            id="niche"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., A cinematic travel guide to the winter festivals of Jammu & Kashmir"
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-primary-text placeholder:text-secondary-text outline-none focus:ring-2 focus:ring-accent-end transition"
          />
        </div>

        {/* Competitor Channels */}
        <div className="space-y-2">
          <label className="block text-secondary-text text-sm">Competitor Channels</label>
          <div className="space-y-3">
            {competitors.map((competitor, index) => (
              <input
                key={index}
                id={`competitor-${index}`}
                value={competitor}
                onChange={(e) => handleCompetitorChange(index, e.target.value)}
                placeholder={`Competitor #${index + 1}`}
                className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-primary-text placeholder:text-secondary-text outline-none focus:ring-2 focus:ring-accent-end transition"
              />
            ))}
            <button
              type="button"
              onClick={addCompetitorField}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-primary-text hover:bg-white/10 active:scale-95 transition"
              aria-label="Add another competitor channel"
            >
              <Plus size={16} /> Add competitor
            </button>
          </div>
        </div>

        {/* Target Region */}
        <div className="space-y-2">
          <label htmlFor="region" className="block text-secondary-text text-sm">Target Region</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-primary-text outline-none focus:ring-2 focus:ring-accent-end transition"
          >
            <option>Worldwide</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
        </div>

        {/* Promo code toggle */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setPromoVisible((v) => !v)}
            className="text-sm text-secondary-text hover:text-primary-text transition"
            aria-label={promoVisible ? "Hide promo code input" : "Show promo code input"}
          >
            {promoVisible ? "Hide Promo Code" : "Have a Promo Code?"}
          </button>
          <AnimatePresence initial={false}>
            {promoVisible && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <input
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-primary-text placeholder:text-secondary-text outline-none focus:ring-2 focus:ring-accent-end transition"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-accent-start to-accent-end px-6 py-4 text-base font-medium text-white hover:opacity-90 active:scale-95 transition-all duration-200"
            aria-label="Generate my report"
          >
            Generate My Report
            <Compass className="inline-block ml-2" size={18} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}


