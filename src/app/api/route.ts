import { db } from "@/lib/db";
import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tables = [
      `CREATE TABLE IF NOT EXISTS "Admin" ("id" TEXT PRIMARY KEY, "email" TEXT NOT NULL UNIQUE, "password" TEXT NOT NULL, "name" TEXT NOT NULL, "role" TEXT NOT NULL DEFAULT 'admin', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Hero" ("id" TEXT PRIMARY KEY, "badge" TEXT NOT NULL DEFAULT 'Website Resmi', "title" TEXT NOT NULL DEFAULT 'NAGARI SILONGO', "subtitle" TEXT NOT NULL DEFAULT '', "slogan" TEXT NOT NULL DEFAULT '', "image_url" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Profil" ("id" TEXT PRIMARY KEY, "title" TEXT NOT NULL DEFAULT '', "description" TEXT NOT NULL DEFAULT '', "image_url" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "VisiMisi" ("id" TEXT PRIMARY KEY, "visi" TEXT NOT NULL DEFAULT '', "misi" TEXT NOT NULL DEFAULT '[]', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Statistik" ("id" TEXT PRIMARY KEY, "label" TEXT NOT NULL, "value" TEXT NOT NULL, "icon" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Pemerintahan" ("id" TEXT PRIMARY KEY, "nama" TEXT NOT NULL, "jabatan" TEXT NOT NULL, "deskripsi" TEXT, "foto_url" TEXT, "urutan" INTEGER DEFAULT 0, "status_aktif" BOOLEAN DEFAULT true, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Wisata" ("id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "description" TEXT, "image_url" TEXT, "category" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Berita" ("id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "slug" TEXT NOT NULL UNIQUE, "content" TEXT NOT NULL DEFAULT '', "thumbnail" TEXT, "category" TEXT, "is_featured" BOOLEAN DEFAULT false, "author" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Galeri" ("id" TEXT PRIMARY KEY, "title" TEXT, "description" TEXT, "image_url" TEXT NOT NULL, "category" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Kontak" ("id" TEXT PRIMARY KEY, "alamat" TEXT NOT NULL DEFAULT '', "kode_pos" TEXT NOT NULL DEFAULT '', "phone" TEXT, "whatsapp" TEXT, "email" TEXT, "maps_embed" TEXT, "jam_layanan" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "FooterSettings" ("id" TEXT PRIMARY KEY, "description" TEXT, "facebook" TEXT, "instagram" TEXT, "youtube" TEXT, "tiktok" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "BukuTamu" ("id" TEXT PRIMARY KEY, "nama" TEXT NOT NULL, "email" TEXT, "pesan" TEXT NOT NULL, "is_visible" BOOLEAN DEFAULT true, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Sambutan" ("id" TEXT PRIMARY KEY, "nama" TEXT NOT NULL DEFAULT '', "jabatan" TEXT NOT NULL DEFAULT '', "isi_sambutan" TEXT NOT NULL DEFAULT '', "bio" TEXT NOT NULL DEFAULT '', "foto_url" TEXT, "masa_jabatan" TEXT NOT NULL DEFAULT '', "jml_jorong" TEXT NOT NULL DEFAULT '', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Layanan" ("id" TEXT PRIMARY KEY, "nama" TEXT NOT NULL, "deskripsi" TEXT NOT NULL, "icon" TEXT NOT NULL DEFAULT 'FileText', "tag" TEXT, "urutan" INTEGER DEFAULT 0, "aktif" BOOLEAN DEFAULT true, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Agenda" ("id" TEXT PRIMARY KEY, "tanggal" TEXT NOT NULL, "judul" TEXT NOT NULL, "lokasi" TEXT NOT NULL, "kategori" TEXT NOT NULL, "deskripsi" TEXT, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "FAQ" ("id" TEXT PRIMARY KEY, "pertanyaan" TEXT NOT NULL, "jawaban" TEXT NOT NULL, "urutan" INTEGER DEFAULT 0, "aktif" BOOLEAN DEFAULT true, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`,
      `CREATE TABLE IF NOT EXISTS "Pengaduan" ("id" TEXT PRIMARY KEY, "nama" TEXT NOT NULL, "email" TEXT, "telepon" TEXT, "kategori" TEXT NOT NULL DEFAULT 'Umum', "judul" TEXT NOT NULL, "pesan" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'Diterima', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now())`
    ];
    for (const sql of tables) await db.$executeRawUnsafe(sql);

    const hp = hashSync("admin123", 10);
    await db.$executeRawUnsafe(`INSERT INTO "Admin" ("id","email","password","name","role") VALUES ($1,$2,$3,$4,$5) ON CONFLICT ("id") DO UPDATE SET "password"=$3`, "seed-admin", "admin@nagarisilongo.id", hp, "Administrator Nagari Silongo", "admin");

    await db.$executeRawUnsafe(`INSERT INTO "Hero" ("id","badge","title","subtitle","slogan") VALUES ($1,$2,$3,$4,$5) ON CONFLICT ("id") DO NOTHING`, "seed-hero","Website Resmi Pemerintahan Nagari","NAGARI SILONGO","Kecamatan Lubuk Tarok - Kabupaten Sijunjung - Sumatera Barat","Di Mana Bumi Dipijak, Di Situ Langit Dijunjung");

    await db.$executeRawUnsafe(`INSERT INTO "Sambutan" ("id","nama","jabatan","isi_sambutan","bio","masa_jabatan","jml_jorong") VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT ("id") DO NOTHING`, "seed-sambutan","Zulfi Amri","Wali Nagari Silongo","Assalamualaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi Pemerintahan Nagari Silongo.","Pemimpin terpilih Nagari Silongo.","2024 - 2029","3");

    await db.$executeRawUnsafe(`INSERT INTO "Profil" ("id","title","description") VALUES ($1,$2,$3) ON CONFLICT ("id") DO NOTHING`, "seed-profil","Tentang Nagari Silongo","Nagari Silongo terletak di Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat dengan 3 jorong.");

    await db.$executeRawUnsafe(`INSERT INTO "VisiMisi" ("id","visi","misi") VALUES ($1,$2,$3) ON CONFLICT ("id") DO NOTHING`, "seed-visi-misi","Mewujudkan Nagari Silongo yang maju, mandiri, religius, berbudaya, dan berbasis digital.", '["Meningkatkan pelayanan publik","Memajukan pendidikan","Mengembangkan ekonomi","Melestarikan budaya","Membangun infrastruktur","Memperkuat keagamaan","Meningkatkan partisipasi masyarakat"]');

    await db.$executeRawUnsafe(`INSERT INTO "Kontak" ("id","alamat","kode_pos","phone","whatsapp","email","jam_layanan") VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT ("id") DO NOTHING`, "seed-kontak","Jl. Raya Nagari Silongo, Kec. Lubuk Tarok, Kab. Sijunjung","27553","(0754) 123456","6281234567890","nagarisilongo@gmail.com","Senin-Jumat: 08.00-15.00 WIB");

    await db.$executeRawUnsafe(`INSERT INTO "FooterSettings" ("id","description","facebook","instagram","youtube","tiktok") VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT ("id") DO NOTHING`, "seed-footer","Website resmi Pemerintahan Nagari Silongo.","https://facebook.com/nagarisilongo","https://instagram.com/nagarisilongo","https://youtube.com/@nagarisilongo","https://tiktok.com/@nagarisilongo");

    const st=[["seed-stat-1","Penduduk","839","Users"],["seed-stat-2","Jorong","3","MapPin"],["seed-stat-3","Dusun","12","Home"],["seed-stat-4","Luas Wilayah","13.40 km2","Map"],["seed-stat-5","Kepala Keluarga","245","UserCheck"]];
    for(const s of st)await db.$executeRawUnsafe(`INSERT INTO "Statistik"("id","label","value","icon")VALUES($1,$2,$3,$4)ON CONFLICT("id")DO NOTHING`,s[0],s[1],s[2],s[3]);

    const pm=[["seed-pem-1","Zulfi Amri","Wali Nagari","Pemimpin tertinggi.",1],["seed-pem-2","Yusri Dt. Bandaro","Sekretaris Nagari","Mengelola administrasi.",2],["seed-pem-3","Rizal Efendi","Kepala Jorong Silongo","",3],["seed-pem-4","Hendra Saputra","Kepala Jorong Koto VII","",4],["seed-pem-5","Desri Yondri","Kepala Jorong Padang Sibusuk","",5],["seed-pem-6","Nita Suryani","Bendahara Nagari","",6]];
    for(const p of pm)await db.$executeRawUnsafe(`INSERT INTO "Pemerintahan"("id","nama","jabatan","deskripsi","urutan","status_aktif")VALUES($1,$2,$3,$4,$5,true)ON CONFLICT("id")DO NOTHING`,p[0],p[1],p[2],p[3],p[4]);

    const ly=[["seed-lay-1","Surat Keterangan Domisili","Penerbitan SK Domisili.","FileText","Populer",1],["seed-lay-2","Surat Keterangan Usaha","SK Usaha UMKM.","Briefcase","UMKM",2],["seed-lay-3","Pengurusan KTP","KTP elektronik.","CreditCard","Cepat",3],["seed-lay-4","Pengurusan KK","Kartu Keluarga.","Users","Populer",4],["seed-lay-5","SK Tidak Mampu","SKTM.","Heart","Sosial",5],["seed-lay-6","Legalisir Dokumen","Pengesahan dokumen.","Stamp",null,6],["seed-lay-7","Pendaftaran Penduduk","Pendataan penduduk.","ClipboardList",null,7],["seed-lay-8","Mediasi Permasalahan","Mediasi warga.","Scale","Sosial",8]];
    for(const l of ly)await db.$executeRawUnsafe(`INSERT INTO "Layanan"("id","nama","deskripsi","icon","tag","urutan","aktif")VALUES($1,$2,$3,$4,$5,$6,true)ON CONFLICT("id")DO NOTHING`,l[0],l[1],l[2],l[3],l[4],l[5]);

    const fq=[["Bagaimana cara mengurus SK Domisili?","Datang ke kantor Nagari dengan KTP dan KK.",1],["Syarat pembuatan KTP?","Surat pengantar, KTP lama, KK, pas foto.",2],["Cara mengajukan pengaduan?","Datang ke kantor, WhatsApp, atau website.",3],["Jadwal Musyawarah Nagari?","Setiap bulan minggu kedua.",4],["Cara daftar bantuan sosial?","Melalui ketua jorong.",5],["Lihat laporan keuangan?","Di website dan papan informasi kantor.",6],["Potensi wisata?","Alam, sawah terasering, budaya.",7],["Ikut kegiatan Nagari?","Musyawarah, kelompok kerja, relawan.",8]];
    for(let i=0;i<fq.length;i++)await db.$executeRawUnsafe(`INSERT INTO "FAQ"("id","pertanyaan","jawaban","urutan","aktif")VALUES($1,$2,$3,$4,true)ON CONFLICT("id")DO NOTHING`,`seed-faq-${i+1}`,fq[i][0],fq[i][1],fq[i][2]);

    const ws=[["Pemandangan Bukit Silongo","Pegunungan Bukit Barisan.","Wisata Alam"],["Sawah Terasering","Ikon pertanian Nagari.","Wisata Alam"],["Surau Tuah Sakato","Pusat kegiatan keagamaan.","Budaya"],["Rumah Gadang","Arsitektur Minangkabau.","Budaya"],["Kuliner Randang","Randang resep turun-temurun.","Kuliner"],["Air Terjun Batu Langkisau","Air terjun 15 meter.","Wisata Alam"]];
    for(let i=0;i<ws.length;i++)await db.$executeRawUnsafe(`INSERT INTO "Wisata"("id","title","description","category")VALUES($1,$2,$3,$4)ON CONFLICT("id")DO NOTHING`,`seed-wis-${i+1}`,ws[i][0],ws[i][1],ws[i][2]);

    const br=[["Nagari Silongo Raih Penghargaan Digital 2024","nagari-penghargaan","Meraih Nagari Digital Terbaik 2024.","Penghargaan",true],["Musyawarah Nagari 2025","musnah-2025","Program pembangunan 2025.","Pemerintahan",false],["Festival Budaya Minangkabau","festival-budaya","Diikuti ratusan peserta.","Budaya",false],["Program UMKM","program-umkm","Pemberdayaan UMKM.","Ekonomi",false],["Jalan Tuntas","jalan-tuntas","Jalan 2,5 km diaspal.","Pembangunan",false]];
    for(let i=0;i<br.length;i++)await db.$executeRawUnsafe(`INSERT INTO "Berita"("id","title","slug","content","category","is_featured","author")VALUES($1,$2,$3,$4,$5,$6,$7)ON CONFLICT("id")DO NOTHING`,`seed-ber-${i+1}`,br[i][0],br[i][1],br[i][2],br[i][3],br[i][4],"Admin");

    const gl=[["Kantor Nagari","Gedung kantor pemerintahan.","/placeholder-kantor.jpg","Infrastruktur"],["Pemandangan Alam","Panorama pegunungan.","/placeholder-alam.jpg","Alam"],["Rumah Gadang","Rumah Gadang tradisional.","/placeholder-gadang.jpg","Budaya"]];
    for(let i=0;i<gl.length;i++)await db.$executeRawUnsafe(`INSERT INTO "Galeri"("id","title","description","image_url","category")VALUES($1,$2,$3,$4,$5)ON CONFLICT("id")DO NOTHING`,`seed-gal-${i+1}`,gl[i][0],gl[i][1],gl[i][2],gl[i][3]);

    const ag=[["2025-02-15","Musyawarah Nagari Bulanan","Aula Kantor","Pemerintahan"],["2025-03-01","Gotong Royong","Seluruh wilayah","Sosial"],["2025-03-17","Pelatihan UMKM","Aula Kantor","Ekonomi"],["2025-04-05","Isra Miraj","Mesjid Jami","Keagamaan"]];
    for(let i=0;i<ag.length;i++)await db.$executeRawUnsafe(`INSERT INTO "Agenda"("id","tanggal","judul","lokasi","kategori")VALUES($1,$2,$3,$4,$5)ON CONFLICT("id")DO NOTHING`,`seed-age-${i+1}`,ag[i][0],ag[i][1],ag[i][2],ag[i][3]);

    return NextResponse.json({ success: true, message: "Database berhasil di-setup!", login: { email: "admin@nagarisilongo.id", password: "admin123" } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
