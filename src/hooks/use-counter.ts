"use client";

import { useEffect, useState } from "react";

export function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frame = 0;

    const tick = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.round(progress * target));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, target]);

  return count;
}
