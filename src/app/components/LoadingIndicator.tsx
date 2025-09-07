'use client';

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Analyzing channel trends...",
  "Collecting competitor insights...",
  "Mapping audience preferences...",
  "Synthesizing with AI...",
  "Crafting your tailored strategy...",
];

export default function LoadingIndicator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
      <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" aria-label="Loading" />
      <p className="text-secondary-text text-sm sm:text-base">{LOADING_MESSAGES[index]}</p>
    </div>
  );
}


