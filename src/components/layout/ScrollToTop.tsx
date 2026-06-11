'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShow(scrollTop > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 z-[100] h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Back to top button */}
      
        {show && (
          <div


            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="h-12 w-12 rounded-full bg-[var(--gold)] text-navy shadow-lg shadow-[var(--gold)]/25 hover:bg-[var(--gold-light)] hover:shadow-xl hover:shadow-[var(--gold)]/30 transition-all duration-300 cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        )}
      
    </>
  );
}
