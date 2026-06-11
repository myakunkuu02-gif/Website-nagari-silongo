'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Lightweight replacement for framer-motion's useInView.
 * Uses Intersection Observer API — zero external dependencies.
 */
export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options?: { once?: boolean; margin?: string }
): boolean {
  const [inView, setInView] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        if (options?.once) {
          if (isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            setInView(true);
          }
        } else {
          setInView(isIntersecting);
        }
      },
      {
        rootMargin: options?.margin || '-50px',
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.margin]);

  return inView;
}

/**
 * Animated counter using requestAnimationFrame — replaces framer-motion's useMotionValue/useTransform/animate.
 */
export function useAnimatedCounter(
  target: number,
  duration: number = 2000,
  startOnMount: boolean = true
): string {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const hasStarted = useRef(false);

  const start = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (startOnMount) start();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, startOnMount]);

  return target >= 1000
    ? (value / 100).toFixed(2)
    : value.toLocaleString('id-ID');
}