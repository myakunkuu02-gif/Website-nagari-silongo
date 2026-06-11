'use client';
import { useInView } from '@/lib/animations';

import { useRef, useState, useEffect } from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [items, setItems] = useState<Array<{ id: string; pertanyaan: string; jawaban: string; urutan: number; aktif: boolean }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/faq', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const active = data
          .filter((item: { aktif: boolean }) => item.aktif === true)
          .sort((a: { urutan: number }, b: { urutan: number }) => a.urutan - b.urutan);
        setItems(active);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="faq"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Subtle dot pattern background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="faq-dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="oklch(0.78 0.15 85)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-dots)" />
        </svg>
      </div>

      <div className="section-divider mb-16" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="h-8 w-8 text-[var(--gold)]" />
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-shimmer-gold">Pertanyaan Umum</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Informasi yang sering ditanyakan oleh masyarakat
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="glass-card rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-8 rounded" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                  <div className="ml-11">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="glass-card rounded-xl p-10 text-center">
              <HelpCircle className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-muted-foreground">Belum ada pertanyaan umum yang tersedia.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-2">
              {items.map((item, i) => (
                <div key={item.id}>
                  <AccordionItem
                    value={`faq-${item.id}`}
                    className="glass-card group rounded-xl px-1 border-0 transition-all duration-300 hover:border-l-4 hover:border-l-[var(--gold)] data-[state=open]:border-l-4 data-[state=open]:border-l-[var(--gold)] data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline [&[data-state=open]>svg]:text-[var(--gold)]">
                      <div className="flex items-center gap-3 text-left">
                        <Badge className="shrink-0 bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20 text-xs font-bold">
                          {String(i + 1).padStart(2, '0')}
                        </Badge>
                        <span className="text-sm font-medium text-foreground sm:text-base">
                          {item.pertanyaan}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 pt-0">
                      <div className="ml-0 sm:ml-10 flex gap-3">
                        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[var(--gold)]/60" />
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.jawaban}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
}