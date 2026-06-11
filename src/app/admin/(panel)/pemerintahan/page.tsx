"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function AdminPemerintahanPage() {
  return (
    <CollectionManager
      table="pemerintahan"
      title="Kelola Pemerintahan"
      description="Modern table untuk perangkat nagari dengan pencarian, filter jabatan, pagination, upload foto, modal tambah/edit, dan pengaturan status aktif."
      orderBy="urutan"
      uploadFolder="pemerintahan"
      searchKeys={["nama", "jabatan", "deskripsi"]}
      filterKey="jabatan"
      defaultValues={{ nama: "", jabatan: "Wali Nagari", deskripsi: "", foto_url: "", urutan: 0, status_aktif: true }}
      columns={[
        { key: "foto_url", label: "Foto", type: "image" },
        { key: "nama", label: "Nama" },
        { key: "jabatan", label: "Jabatan" },
        { key: "urutan", label: "Urutan" },
        { key: "status_aktif", label: "Status", type: "boolean" },
      ]}
      fields={[
        { name: "nama", label: "Nama", type: "text" },
        { name: "jabatan", label: "Jabatan", type: "select", options: [
          { label: "Wali Nagari", value: "Wali Nagari" },
          { label: "Sekretaris Nagari", value: "Sekretaris Nagari" },
          { label: "Perangkat Nagari", value: "Perangkat Nagari" },
          { label: "Kepala Urusan", value: "Kepala Urusan" },
        ] },
        { name: "deskripsi", label: "Deskripsi", type: "textarea", rows: 6 },
        { name: "foto_url", label: "Foto Perangkat", type: "image" },
        { name: "urutan", label: "Urutan", type: "number" },
        { name: "status_aktif", label: "Status Aktif", type: "boolean" },
      ]}
      transformBeforeSave={(draft) => ({ ...draft, urutan: Number(draft.urutan ?? 0) })}
    />
  );
}
