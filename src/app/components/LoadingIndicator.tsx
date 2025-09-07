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
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      <p className="text-secondary-text text-sm">{LOADING_MESSAGES[index]}</p>
    </div>
  );
}


