import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("space-y-5", align === "center" && "mx-auto max-w-3xl text-center")}>
      <div className={cn("inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[#f0c86e]") }>
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <div className="space-y-4">
        <h2 className="font-display text-4xl leading-none text-white md:text-5xl lg:text-6xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
      </div>
    </div>
  );
}
