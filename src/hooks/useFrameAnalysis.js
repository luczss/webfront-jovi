import { useEffect, useRef, useState } from "react";

import { analyzeSample, sampleGray } from "../utils/imageAnalysis";

/**
 * Analisa o vídeo a cada `intervalMs` (padrão 500 ms) e devolve o último
 * resultado: foco, luz, estabilidade, composição, cena e sugestão.
 */
export function useFrameAnalysis({
  videoRef,
  enabled,
  intervalMs = 500,
  mirror = true
}) {
  const [analysis, setAnalysis] = useState(null);
  const previousGrayRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      previousGrayRef.current = null;
      return undefined;
    }

    const timer = setInterval(() => {
      const video = videoRef.current;

      if (!video || video.readyState < 2) {
        return;
      }

      const sample = sampleGray(video, { mirror });

      if (!sample) {
        return;
      }

      setAnalysis(analyzeSample(sample, previousGrayRef.current));
      previousGrayRef.current = sample.gray;
    }, intervalMs);

    return () => {
      clearInterval(timer);
      previousGrayRef.current = null;
    };
  }, [enabled, intervalMs, mirror, videoRef]);

  return enabled ? analysis : null;
}