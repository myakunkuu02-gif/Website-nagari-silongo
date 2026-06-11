'use client';

import { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [text, setText] = useState('0');
  const rafRef = useRef<number>(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);
      setText(current.toLocaleString('id-ID'));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return <span className="tabular-nums">{text}</span>;
}

export default function VisitorCounter() {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/visitors')
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.total);
        setToday(data.today);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="inline-flex items-center gap-4 rounded-full border border-white/[0.12] bg-white/[0.07] px-5 py-2.5 backdrop-blur-xl">
        <Eye className="h-4 w-4 text-[var(--gold)]" />
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-primary-foreground/60">Total Pengunjung:</span>
          <span className="font-bold text-primary-foreground">
            {loaded ? <AnimatedNumber value={total} duration={2.5} /> : '...'}
          </span>
        </div>
        <div className="h-4 w-px bg-white/15" />
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-primary-foreground/50">Hari Ini:</span>
          <span className="font-semibold text-[var(--gold)]">
            {loaded ? <AnimatedNumber value={today} duration={1.5} /> : '...'}
          </span>
        </div>
      </div>
    </div>
  );
}