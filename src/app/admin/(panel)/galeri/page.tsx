"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function AdminGaleriPage() {
  return (
    <CollectionManager
      table="galeri"
      title="Kelola Galeri"
      description="Upload foto galeri, atur kategori, deskripsi, dan urutan tampil pada halaman publik."
      orderBy="urutan"
      uploadFolder="galeri"
      searchKeys={["title", "category", "description"]}
      filterKey="category"
      defaultValues={{ title: "", description: "", image_url: "", category: "Budaya", urutan: 0, status_aktif: true }}
      columns={[
        { key: "image_url", label: "Foto", type: "image" },
        { key: "title", label: "Judul" },
        { key: "category", label: "Kategori" },
        { key: "urutan", label: "Urutan" },
        { key: "status_aktif", label: "Status", type: "boolean" },
      ]}
      fields={[
        { name: "title", label: "Judul", type: "text" },
        { name: "description", label: "Deskripsi", type: "textarea", rows: 5 },
        { name: "image_url", label: "Foto Galeri", type: "image" },
        { name: "category", label: "Kategori", type: "select", options: [
          { label: "Budaya", value: "Budaya" },
          { label: "Alam", value: "Alam" },
          { label: "Masyarakat", value: "Masyarakat" },
          { label: "Pemerintahan", value: "Pemerintahan" },
        ] },
        { name: "urutan", label: "Urutan", type: "number" },
        { name: "status_aktif", label: "Status Aktif", type: "boolean" },
      ]}
      transformBeforeSave={(draft) => ({ ...draft, urutan: Number(draft.urutan ?? 0) })}
    />
  );
}
