"use client";

        import { SingleRecordEditor } from "@/components/admin/SingleRecordEditor";

        export default function AdminVisiMisiPage() {
          return (
            <SingleRecordEditor
              table="visi_misi"
              title="Kelola Visi Misi"
              description="Perbarui rumusan visi dan daftar misi resmi Nagari Silongo."
              uploadFolder="visi-misi"
              defaultValues={{
                visi: "Mewujudkan Nagari Silongo yang maju, mandiri, religius, berbudaya, dan berbasis digital.",
                misi_text: "Meningkatkan pelayanan masyarakat
Mendukung pembangunan nagari
Melestarikan budaya Minangkabau
Meningkatkan ekonomi masyarakat
Memanfaatkan teknologi digital",
              }}
              prepareInitial={(record) => ({
                ...record,
                misi_text: Array.isArray(record.misi) ? record.misi.join("
") : "",
              })}
              transformBeforeSave={(draft) => ({
                visi: draft.visi,
                misi: String(draft.misi_text ?? "").split("
").map((item) => item.trim()).filter(Boolean),
              })}
              fields={[
                { name: "visi", label: "Visi", type: "textarea", rows: 5 },
                { name: "misi_text", label: "Daftar Misi", type: "textarea", rows: 8, description: "Satu misi per baris." },
              ]}
            />
          );
        }
