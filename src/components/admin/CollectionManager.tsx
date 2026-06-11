"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AuthNotice } from "@/components/admin/AuthNotice";
import { createClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured, storageBucket } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";
import { ColumnConfig, FieldConfig } from "@/types/site";
import { formatDate } from "@/utils/format";

type RowData = Record<string, any>;

export function CollectionManager({
  table,
  title,
  description,
  columns,
  fields,
  defaultValues,
  searchKeys,
  orderBy,
  uploadFolder,
  filterKey,
  transformBeforeSave,
}: {
  table: string;
  title: string;
  description: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  defaultValues: RowData;
  searchKeys: string[];
  orderBy: string;
  uploadFolder: string;
  filterKey?: string;
  transformBeforeSave?: (draft: RowData) => RowData;
}) {
  const [items, setItems] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState<RowData>(defaultValues);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const enabled = useMemo(() => isSupabaseConfigured(), []);
  const pageSize = 8;

  const load = async () => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }

    setItems(data ?? []);
  };

  useEffect(() => {
    load();
  }, [table]);

  const filterOptions = useMemo(() => {
    if (!filterKey) {
      return ["Semua"];
    }
    return ["Semua", ...Array.from(new Set(items.map((item) => item[filterKey]).filter(Boolean)))];
  }, [filterKey, items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = !query || searchKeys.some((key) => `${item[key] ?? ""}`.toLowerCase().includes(query.toLowerCase()));
      const matchesFilter = !filterKey || filter === "Semua" || item[filterKey] === filter;
      return matchesQuery && matchesFilter;
    });
  }, [filter, filterKey, items, query, searchKeys]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const resetForm = () => {
    setOpen(false);
    setEditingId(null);
    setDraft(defaultValues);
    setFiles({});
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
      const payload = { ...draft };
      for (const field of fields.filter((item) => item.type === "image")) {
        payload[field.name] = await uploadIfNeeded(field.name, payload[field.name]);
      }
      const finalPayload = transformBeforeSave ? transformBeforeSave(payload) : payload;
      const { error } = editingId
        ? await supabase.from(table).update(finalPayload).eq("id", editingId)
        : await supabase.from(table).insert(finalPayload);

      if (error) {
        throw error;
      }

      toast.success("Data berhasil disimpan.");
      resetForm();
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase belum dikonfigurasi.");
      return;
    }

    const confirmed = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmed) {
      return;
    }

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Data berhasil dihapus.");
    load();
  };

  return (
    <section className="glass-panel rounded-[32px] p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h3 className="font-display text-4xl text-white">{title}</h3>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
        </div>
        <button type="button" onClick={() => { setDraft(defaultValues); setEditingId(null); setOpen(true); }} className="inline-flex items-center gap-2 rounded-full bg-[#f0c86e] px-5 py-3 text-sm font-extrabold text-slate-950">
          <Plus className="h-4 w-4" />
          Tambah Data
        </button>
      </div>
      <div className="mt-6 space-y-5">
        {!enabled ? <AuthNotice /> : null}
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="glass-soft flex items-center gap-3 rounded-full px-5 py-4 text-sm text-slate-300">
            <Search className="h-4 w-4 text-[#67a8ff]" />
            <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Cari data" className="w-full bg-transparent outline-none placeholder:text-slate-500" />
          </label>
          {filterKey ? (
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((item) => (
                <button key={item} type="button" onClick={() => { setFilter(item); setPage(1); }} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === item ? "bg-[#67a8ff] text-slate-950" : "border border-white/10 bg-white/6 text-slate-100"}`}>
                  {item}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        {loading ? (
          <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm text-slate-300"><Loader2 className="h-4 w-4 animate-spin" />Memuat data...</div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07111f]/72">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-[0.24em] text-slate-500">
                  <tr>
                    {columns.map((column) => <th key={column.key} className="px-4 py-4 font-medium">{column.label}</th>)}
                    <th className="px-4 py-4 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((item) => (
                    <tr key={item.id} className="border-b border-white/6 last:border-b-0">
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 py-4 align-top text-slate-200">
                          {column.type === "image" ? (
                            item[column.key] ? <div className="relative h-14 w-14 overflow-hidden rounded-2xl"><Image src={item[column.key]} alt={column.label} fill className="object-cover" /></div> : "-"
                          ) : column.type === "boolean" ? (
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item[column.key] ? "bg-emerald-400/15 text-emerald-200" : "bg-slate-400/15 text-slate-300"}`}>{item[column.key] ? "Aktif" : "Nonaktif"}</span>
                          ) : column.type === "date" ? (
                            formatDate(item[column.key])
                          ) : (
                            <span className={cn("line-clamp-2", column.key === "content" && "max-w-sm")}>{`${item[column.key] ?? "-"}`}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => { setEditingId(item.id); setDraft(item); setOpen(true); }} className="rounded-full border border-white/10 bg-white/6 p-2 text-slate-100"><Pencil className="h-4 w-4" /></button>
                          <button type="button" onClick={() => remove(item.id)} className="rounded-full border border-red-400/20 bg-red-400/10 p-2 text-red-200"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-4 text-xs text-slate-400">
              <span>{filtered.length} data ditemukan</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-full border border-white/10 px-3 py-2">Prev</button>
                <span>Hal {page} / {totalPages}</span>
                <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="rounded-full border border-white/10 px-3 py-2">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020817]/82 p-4 backdrop-blur-xl">
          <div className="glass-panel max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-display text-4xl text-white">{editingId ? "Edit Data" : "Tambah Data"}</h4>
                <p className="mt-2 text-sm text-slate-400">Isi formulir berikut untuk memperbarui konten.</p>
              </div>
              <button type="button" onClick={resetForm} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">Tutup</button>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field.name} className={cn("space-y-3", field.type === "textarea" && "md:col-span-2", field.type === "image" && "md:col-span-2") }>
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea rows={field.rows ?? 6} value={draft[field.name] ?? ""} onChange={(event) => setDraft((prev) => ({ ...prev, [field.name]: event.target.value }))} className="glass-soft min-h-[160px] w-full rounded-[24px] px-5 py-4 text-sm text-slate-100 outline-none" />
                  ) : null}
                  {field.type === "text" || field.type === "number" || field.type === "date" ? (
                    <input type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"} value={draft[field.name] ?? ""} onChange={(event) => setDraft((prev) => ({ ...prev, [field.name]: event.target.value }))} className="glass-soft w-full rounded-[24px] px-5 py-4 text-sm text-slate-100 outline-none" />
                  ) : null}
                  {field.type === "boolean" ? (
                    <button type="button" onClick={() => setDraft((prev) => ({ ...prev, [field.name]: !prev[field.name] }))} className={`glass-soft flex items-center justify-between rounded-[24px] px-5 py-4 text-sm ${draft[field.name] ? "text-[#7ad7b5]" : "text-slate-400"}`}>
                      <span>{draft[field.name] ? "Aktif" : "Nonaktif"}</span>
                      <span className={`h-3 w-3 rounded-full ${draft[field.name] ? "bg-[#7ad7b5]" : "bg-slate-500"}`} />
                    </button>
                  ) : null}
                  {field.type === "select" ? (
                    <select value={draft[field.name] ?? ""} onChange={(event) => setDraft((prev) => ({ ...prev, [field.name]: event.target.value }))} className="glass-soft w-full rounded-[24px] px-5 py-4 text-sm text-slate-100 outline-none">
                      <option value="">Pilih {field.label}</option>
                      {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  ) : null}
                  {field.type === "image" ? (
                    <div className="space-y-4">
                      <input type="file" accept="image/*" onChange={(event) => setFiles((prev) => ({ ...prev, [field.name]: event.target.files?.[0] ?? null }))} className="glass-soft w-full rounded-[24px] px-5 py-4 text-sm text-slate-300" />
                      {draft[field.name] ? <div className="relative h-56 overflow-hidden rounded-[24px] border border-white/10"><Image src={draft[field.name]} alt={field.label} fill className="object-cover" /></div> : null}
                    </div>
                  ) : null}
                </label>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={save} disabled={saving || !enabled} className="inline-flex items-center gap-2 rounded-full bg-[#f0c86e] px-6 py-3 text-sm font-extrabold text-slate-950 disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Simpan Data
              </button>
              <button type="button" onClick={resetForm} className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200">Batal</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
