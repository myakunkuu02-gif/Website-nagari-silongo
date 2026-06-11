"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";
import { slugify } from "@/utils/slug";

export default function AdminWisataPage() {
  return (
    <CollectionManager
      table="wisata"
      title="Kelola Wisata dan Budaya"
      description="Tambah konten wisata budaya, upload gambar, atur kategori, slug, dan status tampil."
      orderBy="created_at"
      uploadFolder="wisata"
      searchKeys={["title", "category", "description"]}
      filterKey="category"
      defaultValues={{ title: "", slug: "", description: "", image_url: "", category: "Budaya", status_aktif: true }}
      columns={[
        { key: "image_url", label: "Gambar", type: "image" },
        { key: "title", label: "Judul" },
        { key: "category", label: "Kategori" },
        { key: "status_aktif", label: "Status", type: "boolean" },
      ]}
      fields={[
        { name: "title", label: "Judul", type: "text" },
        { name: "slug", label: "Slug", type: "text" },
        { name: "description", label: "Deskripsi", type: "textarea", rows: 8 },
        { name: "image_url", label: "Gambar Wisata", type: "image" },
        { name: "category", label: "Kategori", type: "select", options: [
          { label: "Budaya", value: "Budaya" },
          { label: "Seni Tradisi", value: "Seni Tradisi" },
          { label: "Wisata Alam", value: "Wisata Alam" },
          { label: "Kuliner", value: "Kuliner" },
        ] },
        { name: "status_aktif", label: "Status Aktif", type: "boolean" },
      ]}
      transformBeforeSave={(draft) => ({ ...draft, slug: draft.slug ? slugify(String(draft.slug)) : slugify(String(draft.title)) })}
    />
  );
}
