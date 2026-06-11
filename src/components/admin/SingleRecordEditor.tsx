"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { AuthNotice } from "@/components/admin/AuthNotice";
import { createClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured, storageBucket } from "@/lib/supabase/config";
import { FieldConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type Draft = Record<string, any>;

export function SingleRecordEditor({
  table,
  title,
  description,
  fields,
  defaultValues,
  uploadFolder,
  prepareInitial,
  transformBeforeSave,
}: {
  table: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  defaultValues: Draft;
  uploadFolder: string;
  prepareInitial?: (record: Draft) => Draft;
  transformBeforeSave?: (draft: Draft) => Draft;
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(defaultValues);
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const enabled = useMemo(() => isSupabaseConfigured(), []);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from(table).select("*").limit(1).maybeSingle();
      if (error) {
        toast.error(error.message);
      }

      if (data) {
        setRecordId(data.id ?? null);
        setDraft(prepareInitial ? prepareInitial(data) : data);
      }
      setLoading(false);
    };

    load();
  }, [prepareInitial, table]);

  const handleChange = (name: string, value: any) => {
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const uploadIfNeeded = async (fieldName: string, value: any) => {
    const supabase = createClient();
    if (!supabase) {
      return value;
    }

    const file = files[fieldName];
    if (!file) {
      return value;
    }

    const ext = file.name.split('.').pop() ?? 'jpg';
    const filePath = `${uploadFolder}/${fieldName}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(storageBucket).upload(filePath, file, { upsert: true });
    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from(storageBucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const save = async () => {
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase belum dikonfigurasi.");
      return;
    }

    setSaving(true);
    try {
      const payload: Draft = { ...draft };
      for (const field of fields.filter((item) => item.type === "image")) {
        payload[field.name] = await uploadIfNeeded(field.name, payload[field.name]);
      }

      const finalPayload = transformBeforeSave ? transformBeforeSave(payload) : payload;
      const query = recordId
        ? supabase.from(table).update(finalPayload).eq("id", recordId)
        : supabase.from(table).insert(finalPayload).select().single();

      const { data, error } = await query;
      if (error) {
        throw error;
      }

      if (!recordId && data) {
        setRecordId((data as { id?: string }).id ?? null);
      }

      toast.success("Data berhasil disimpan.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal menyimpan data.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="glass-panel rounded-[32px] p-6 md:p-8">
      <div className="space-y-2">
        <h3 className="font-display text-4xl text-white">{title}</h3>
        <p className="max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
      </div>
      <div className="mt-6 space-y-5">
        {!enabled ? <AuthNotice /> : null}
        {loading ? (
          <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memuat data...
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={cn("space-y-3", field.type === "textarea" && "md:col-span-2", field.type === "image" && "md:col-span-2") }>
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    rows={field.rows ?? 6}
                    value={draft[field.name] ?? ""}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    className="glass-soft min-h-[160px] w-full rounded-[24px] px-5 py-4 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                ) : null}
                {field.type === "text" || field.type === "number" || field.type === "date" ? (
                  <input
                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                    value={draft[field.name] ?? ""}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    className="glass-soft w-full rounded-[24px] px-5 py-4 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                ) : null}
                {field.type === "boolean" ? (
                  <button
                    type="button"
                    onClick={() => handleChange(field.name, !draft[field.name])}
                    className={`glass-soft flex items-center justify-between rounded-[24px] px-5 py-4 text-sm ${draft[field.name] ? "text-[#7ad7b5]" : "text-slate-400"}`}
                  >
                    <span>{draft[field.name] ? "Aktif" : "Nonaktif"}</span>
                    <span className={`h-3 w-3 rounded-full ${draft[field.name] ? "bg-[#7ad7b5]" : "bg-slate-500"}`} />
                  </button>
                ) : null}
                {field.type === "select" ? (
                  <select
                    value={draft[field.name] ?? ""}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                    className="glass-soft w-full rounded-[24px] px-5 py-4 text-sm text-slate-100 outline-none"
                  >
                    <option value="">Pilih {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : null}
                {field.type === "image" ? (
                  <div className="space-y-4">
                    <input type="file" accept="image/*" onChange={(event) => setFiles((prev) => ({ ...prev, [field.name]: event.target.files?.[0] ?? null }))} className="glass-soft w-full rounded-[24px] px-5 py-4 text-sm text-slate-300" />
                    {draft[field.name] ? (
                      <div className="relative h-56 overflow-hidden rounded-[24px] border border-white/10">
                        <Image src={draft[field.name]} alt={field.label} fill className="object-cover" />
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {field.description ? <p className="text-xs leading-6 text-slate-500">{field.description}</p> : null}
              </label>
            ))}
          </div>
        )}
        <button type="button" onClick={save} disabled={saving || loading || !enabled} className="inline-flex items-center gap-2 rounded-full bg-[#f0c86e] px-6 py-3 text-sm font-extrabold text-slate-950 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Simpan Perubahan
        </button>
      </div>
    </section>
  );
}
