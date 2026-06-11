"use client";

        import { SingleRecordEditor } from "@/components/admin/SingleRecordEditor";

        export default function AdminProfilPage() {
          return (
            <SingleRecordEditor
              table="profil"
              title="Kelola Profil Nagari"
              description="Perbarui deskripsi, jorong, sungai, fasilitas, dan gambar profil untuk halaman identitas nagari."
              uploadFolder="profil"
              defaultValues={{
                title: "Tentang Nagari Silongo",
                description: "",
                wilayah: "13,40 km²",
                jumlah_penduduk: "839",
                jumlah_jorong: "3",
                daftar_jorong_text: "Koto Ranah
Pekolongan
Ranah Laweh",
                sungai_text: "Batang Longo
Sungai Sariek",
                agama_text: "1 Masjid
7 Mushala",
                pendidikan_text: "SD Negeri 08 Silongo",
                jarak_text: "13 km ke ibu kota kecamatan
30 km ke ibu kota kabupaten
150 km ke ibu kota provinsi",
                image_primary_url: "",
                image_secondary_url: "",
              }}
              prepareInitial={(record) => ({
                ...record,
                daftar_jorong_text: Array.isArray(record.daftar_jorong_json) ? record.daftar_jorong_json.join("
") : "",
                sungai_text: Array.isArray(record.sungai_json) ? record.sungai_json.join("
") : "",
                agama_text: Array.isArray(record.fasilitas_json?.agama) ? record.fasilitas_json.agama.join("
") : "",
                pendidikan_text: Array.isArray(record.fasilitas_json?.pendidikan) ? record.fasilitas_json.pendidikan.join("
") : "",
                jarak_text: Array.isArray(record.fasilitas_json?.jarak) ? record.fasilitas_json.jarak.join("
") : "",
              })}
              transformBeforeSave={(draft) => ({
                title: draft.title,
                description: draft.description,
                wilayah: draft.wilayah,
                jumlah_penduduk: draft.jumlah_penduduk,
                jumlah_jorong: draft.jumlah_jorong,
                daftar_jorong_json: String(draft.daftar_jorong_text ?? "").split("
").map((item) => item.trim()).filter(Boolean),
                sungai_json: String(draft.sungai_text ?? "").split("
").map((item) => item.trim()).filter(Boolean),
                fasilitas_json: {
                  agama: String(draft.agama_text ?? "").split("
").map((item) => item.trim()).filter(Boolean),
                  pendidikan: String(draft.pendidikan_text ?? "").split("
").map((item) => item.trim()).filter(Boolean),
                  jarak: String(draft.jarak_text ?? "").split("
").map((item) => item.trim()).filter(Boolean),
                },
                image_primary_url: draft.image_primary_url,
                image_secondary_url: draft.image_secondary_url,
              })}
              fields={[
                { name: "title", label: "Judul", type: "text" },
                { name: "description", label: "Deskripsi Profil", type: "textarea", rows: 8 },
                { name: "wilayah", label: "Luas Wilayah", type: "text" },
                { name: "jumlah_penduduk", label: "Jumlah Penduduk", type: "text" },
                { name: "jumlah_jorong", label: "Jumlah Jorong", type: "text" },
                { name: "daftar_jorong_text", label: "Daftar Jorong", type: "textarea", rows: 4, description: "Satu jorong per baris." },
                { name: "sungai_text", label: "Daftar Sungai", type: "textarea", rows: 4, description: "Satu sungai per baris." },
                { name: "agama_text", label: "Fasilitas Agama", type: "textarea", rows: 4 },
                { name: "pendidikan_text", label: "Fasilitas Pendidikan", type: "textarea", rows: 4 },
                { name: "jarak_text", label: "Jarak Strategis", type: "textarea", rows: 4 },
                { name: "image_primary_url", label: "Gambar Utama Profil", type: "image" },
                { name: "image_secondary_url", label: "Gambar Kedua Profil", type: "image" },
              ]}
            />
          );
        }
