"use client";

import { SingleRecordEditor } from "@/components/admin/SingleRecordEditor";

export default function AdminHeroPage() {
  return (
    <SingleRecordEditor
      table="hero"
      title="Kelola Hero"
      description="Edit badge, judul, subtitle, slogan, CTA, dan background hero utama website resmi Nagari Silongo."
      uploadFolder="hero"
      defaultValues={{
        badge: "Website Resmi Pemerintahan Nagari",
        title: "NAGARI SILONGO",
        subtitle: "Kecamatan Lubuk Tarok • Kabupaten Sijunjung • Sumatera Barat",
        slogan: "Di Mana Bumi Dipijak, Di Situ Langit Dijunjung",
        primary_cta_label: "Jelajahi Nagari",
        primary_cta_href: "#profil",
        secondary_cta_label: "Informasi Publik",
        secondary_cta_href: "#berita",
        background_image_url: "",
      }}
      fields={[
        { name: "badge", label: "Badge", type: "text" },
        { name: "title", label: "Judul", type: "text" },
        { name: "subtitle", label: "Subtitle", type: "text" },
        { name: "slogan", label: "Slogan", type: "textarea", rows: 4 },
        { name: "primary_cta_label", label: "Label CTA Utama", type: "text" },
        { name: "primary_cta_href", label: "Link CTA Utama", type: "text" },
        { name: "secondary_cta_label", label: "Label CTA Kedua", type: "text" },
        { name: "secondary_cta_href", label: "Link CTA Kedua", type: "text" },
        { name: "background_image_url", label: "Background Hero", type: "image" },
      ]}
    />
  );
}
