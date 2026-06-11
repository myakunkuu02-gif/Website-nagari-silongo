import { CheckCircle2, Gem, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { VisiMisiContent } from "@/types/site";

const icons = [ShieldCheck, Workflow, Gem, Sparkles, CheckCircle2];

export function VisionSection({ visiMisi }: { visiMisi: VisiMisiContent }) {
  return (
    <section className="section-spacing relative overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
      <div className="container-shell relative space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Visi Dan Misi"
            title="Arah pembangunan nagari yang maju, mandiri, religius, dan berbasis digital"
            description="Visi dan misi Nagari Silongo menjadi kerangka kebijakan untuk memperkuat kualitas pelayanan, keberlanjutan pembangunan, dan pelestarian jati diri Minangkabau di era digital."
            align="center"
          />
        </Reveal>
        <Reveal className="glass-panel rounded-[36px] p-8 text-center md:p-12">
          <p className="text-xs uppercase tracking-[0.36em] text-[#67a8ff]">Visi</p>
          <p className="font-display mt-5 text-4xl leading-tight text-white md:text-5xl">{visiMisi.visi}</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {visiMisi.misi.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={item} delay={index * 0.06}>
                <div className="glass-soft card-hover h-full rounded-[28px] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#f0c86e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.26em] text-slate-500">Misi {index + 1}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{item}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
