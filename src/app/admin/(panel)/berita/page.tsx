"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";
import { slugify } from "@/utils/slug";

export default function AdminBeritaPage() {
  return (
    <CollectionManager
      table="berita"
      title="Kelola Berita"
      description="Buat featured news, edit berita terbaru, atur kategori, slug, thumbnail, dan tanggal publikasi secara dinamis."
      orderBy="published_at"
      uploadFolder="berita"
      searchKeys={["title", "category", "excerpt", "content"]}
      filterKey="category"
      defaultValues={{ title: "", slug: "", excerpt: "", content: "", thumbnail_url: "", category: "Pemerintahan", is_featured: false, published_at: new Date().toISOString().slice(0, 10) }}
      columns={[
        { key: "thumbnail_url", label: "Thumbnail", type: "image" },
        { key: "title", label: "Judul" },
        { key: "category", label: "Kategori" },
        { key: "published_at", label: "Tanggal", type: "date" },
        { key: "is_featured", label: "Featured", type: "boolean" },
      ]}
      fields={[
        { name: "title", label: "Judul Berita", type: "text" },
        { name: "slug", label: "Slug", type: "text", description: "Boleh dikosongkan, sistem akan membuat otomatis dari judul." },
        { name: "excerpt", label: "Excerpt", type: "textarea", rows: 4 },
        { name: "content", label: "Konten Berita", type: "textarea", rows: 10 },
        { name: "thumbnail_url", label: "Thumbnail Berita", type: "image" },
        { name: "category", label: "Kategori", type: "select", options: [
          { label: "Pemerintahan", value: "Pemerintahan" },
          { label: "Budaya", value: "Budaya" },
          { label: "Ekonomi", value: "Ekonomi" },
          { label: "Pembangunan", value: "Pembangunan" },
        ] },
        { name: "published_at", label: "Tanggal Publikasi", type: "date" },
        { name: "is_featured", label: "Jadikan Featured", type: "boolean" },
      ]}
      transformBeforeSave={(draft) => ({
        ...draft,
        slug: draft.slug ? slugify(String(draft.slug)) : slugify(String(draft.title)),
        published_at: draft.published_at ? new Date(draft.published_at).toISOString() : new Date().toISOString(),
      })}
    />
  );
}
