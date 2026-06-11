"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function AdminStatistikPage() {
  return (
    <CollectionManager
      table="statistik"
      title="Kelola Statistik"
      description="Tambah, edit, hapus, dan atur urutan statistik yang tampil di halaman publik."
      orderBy="urutan"
      uploadFolder="statistik"
      searchKeys={["label", "value", "suffix", "icon"]}
      defaultValues={{ label: "", value: "", suffix: "", icon: "Sparkles", urutan: 0, status_aktif: true }}
      columns={[
        { key: "label", label: "Label" },
        { key: "value", label: "Nilai" },
        { key: "suffix", label: "Suffix" },
        { key: "urutan", label: "Urutan" },
        { key: "status_aktif", label: "Status", type: "boolean" },
      ]}
      fields={[
        { name: "label", label: "Label", type: "text" },
        { name: "value", label: "Nilai", type: "text" },
        { name: "suffix", label: "Suffix", type: "text" },
        { name: "icon", label: "Nama Icon Lucide", type: "text", placeholder: "Users, Map, Store" },
        { name: "urutan", label: "Urutan", type: "number" },
        { name: "status_aktif", label: "Status Aktif", type: "boolean" },
      ]}
      transformBeforeSave={(draft) => ({ ...draft, urutan: Number(draft.urutan ?? 0) })}
    />
  );
}
