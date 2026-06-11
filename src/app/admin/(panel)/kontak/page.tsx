"use client";

import { SingleRecordEditor } from "@/components/admin/SingleRecordEditor";

export default function AdminKontakPage() {
  return (
    <SingleRecordEditor
      table="kontak"
      title="Kelola Kontak"
      description="Perbarui alamat resmi, WhatsApp, email, jam pelayanan, dan embed Google Maps."
      uploadFolder="kontak"
      defaultValues={{ alamat: "Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat", kode_pos: "27553", whatsapp: "", email: "", maps_embed: "https://www.google.com/maps?q=-0.8180,101.0537&z=13&output=embed", jam_layanan: "Senin - Jumat, 08.00 - 16.00 WIB" }}
      fields={[
        { name: "alamat", label: "Alamat", type: "textarea", rows: 5 },
        { name: "kode_pos", label: "Kode Pos", type: "text" },
        { name: "whatsapp", label: "WhatsApp", type: "text" },
        { name: "email", label: "Email", type: "text" },
        { name: "maps_embed", label: "Google Maps Embed URL", type: "textarea", rows: 4 },
        { name: "jam_layanan", label: "Jam Pelayanan", type: "text" },
      ]}
    />
  );
}
