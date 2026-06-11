"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { BeritaItem } from "@/types/site";
import { formatDate } from "@/utils/format";

export function NewsSearch({ items }: { items: BeritaItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = useMemo(() => ["Semua", ...Array.from(new Set(items.map((item) => item.category).filter(Boolean) as string[]))], [items]);
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = !query || `${item.title} ${item.excerpt ?? ""} ${item.content}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "Semua" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, items, query]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="glass-panel flex items-center gap-3 rounded-full px-5 py-4 text-sm text-slate-300">
          <Search className="h-4 w-4 text-[#67a8ff]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari berita resmi, agenda, atau topik publik"
            className="w-full bg-transparent outline-none placeholder:text-slate-500"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-[#f0c86e] text-slate-950" : "border border-white/10 bg-white/6 text-slate-100"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.slug} className="glass-soft card-hover overflow-hidden rounded-[30px]">
            <div className="relative h-56 overflow-hidden">
              <Image src={item.thumbnail_url ?? "/images/hero-bg.jpg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="space-y-4 p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">{item.category} • {formatDate(item.published_at)}</p>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="line-clamp-3 text-sm leading-7 text-slate-300">{item.excerpt}</p>
              <Link href={`/berita/${item.slug}`} className="text-sm font-semibold text-[#67a8ff]">Baca detail</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
