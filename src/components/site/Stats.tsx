"use client";

import { Building2, Landmark, Map, Sparkles, Store, Users } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { StatistikItem } from "@/types/site";
import { useCounter } from "@/hooks/use-counter";

const icons = { Users, Landmark, Map, Sparkles, Building2, Store };

function StatCard({ item, index }: { item: StatistikItem; index: number }) {
  const Icon = icons[(item.icon as keyof typeof icons) ?? "Sparkles"] ?? Sparkles;
  const numeric = Number.parseFloat(item.value);
  const value = Number.isFinite(numeric) ? useCounter(Math.round(numeric)) : item.value;

  return (
    <Reveal delay={index * 0.05}>
      <div className="glass-panel card-hover gold-ring rounded-[30px] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
            <div className="mt-4 flex items-end gap-2">
              <p className="text-4xl font-extrabold text-white">{value}</p>
              {item.suffix ? <span className="pb-1 text-sm text-slate-300">{item.suffix}</span> : null}
            </div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#67a8ff]">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function StatisticsSection({ statistik }: { statistik: StatistikItem[] }) {
  return (
    <section id="statistik" className="section-spacing">
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Statistik Nagari"
            title="Data penting yang dirancang informatif, elegan, dan mudah dipahami"
            description="Portal resmi ini menampilkan statistik utama Nagari Silongo secara visual untuk mendukung transparansi data, komunikasi publik, dan citra pemerintahan yang tertata." 
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statistik.filter((item) => item.status_aktif).map((item, index) => (
            <StatCard key={`${item.label}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
