import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,168,255,0.15),transparent_24%),radial-gradient(circle_at_85%_10%,rgba(240,200,110,0.12),transparent_18%)]" />
      <div className="container-shell relative section-spacing">
        <Reveal className="max-w-4xl space-y-6">
          <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f0c86e]">
            {eyebrow}
          </span>
          <h1 className="font-display text-5xl leading-none text-white md:text-6xl lg:text-7xl">{title}</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{description}</p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f0c86e]/30 hover:bg-white/12"
          >
            Login Admin
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
