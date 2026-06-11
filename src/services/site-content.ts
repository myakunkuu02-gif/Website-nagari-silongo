import "server-only";

import {
  BeritaItem,
  FooterSettings,
  GaleriItem,
  HeroContent,
  HomeData,
  KontakContent,
  PemerintahanItem,
  ProfilContent,
  StatistikItem,
  VisiMisiContent,
  WisataItem,
} from "@/types/site";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { excerpt } from "@/utils/format";

const buildImage = (prompt: string, size = "landscape_16_9") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

const fallbackHero: HeroContent = {
  badge: "Website Resmi Pemerintahan Nagari",
  title: "NAGARI SILONGO",
  subtitle: "Kecamatan Lubuk Tarok • Kabupaten Sijunjung • Sumatera Barat",
  slogan: "Di Mana Bumi Dipijak, Di Situ Langit Dijunjung",
  primary_cta_label: "Jelajahi Nagari",
  primary_cta_href: "#profil",
  secondary_cta_label: "Informasi Publik",
  secondary_cta_href: "#berita",
  background_image_url: buildImage("cinematic modern Rumah Gadang at sunrise, premium government website hero, Minangkabau architecture, elegant blue gold green palette, ultra realistic, soft mist, Sumatera Barat landscape", "landscape_16_9"),
};

const fallbackProfil: ProfilContent = {
  title: "Tentang Nagari Silongo",
  description:
    "Nagari Silongo merupakan salah satu nagari di Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat. Nagari ini memiliki luas wilayah sekitar 13,40 km² dan terdiri dari tiga jorong yaitu Koto Ranah, Pekolongan, dan Ranah Laweh. Nagari Silongo memiliki suasana alam khas Sumatera Barat dengan kehidupan masyarakat yang masih menjunjung tinggi adat Minangkabau, nilai gotong royong, dan budaya lokal. Wilayah nagari dilalui oleh Batang Longo dan Sungai Sariek yang menjadi bagian penting kehidupan masyarakat setempat.",
  wilayah: "13,40 km²",
  jumlah_penduduk: "839",
  jumlah_jorong: "3",
  daftar_jorong_json: ["Koto Ranah", "Pekolongan", "Ranah Laweh"],
  sungai_json: ["Batang Longo", "Sungai Sariek"],
  fasilitas_json: {
    agama: ["1 Masjid", "7 Mushala"],
    pendidikan: ["SD Negeri 08 Silongo"],
    jarak: ["13 km ke ibu kota kecamatan", "30 km ke ibu kota kabupaten", "150 km ke ibu kota provinsi"],
  },
  image_primary_url: buildImage("premium aerial view of West Sumatra rural village with rice fields, rivers and elegant Minangkabau atmosphere, realistic photography", "portrait_4_3"),
  image_secondary_url: buildImage("modern cultural portrait of Minangkabau community activity near Rumah Gadang, warm natural light, realistic photography", "portrait_4_3"),
};

const fallbackVisiMisi: VisiMisiContent = {
  visi: "Mewujudkan Nagari Silongo yang maju, mandiri, religius, berbudaya, dan berbasis digital.",
  misi: [
    "Meningkatkan kualitas pelayanan masyarakat secara cepat, ramah, dan transparan.",
    "Mendukung pembangunan nagari yang merata dan berkelanjutan.",
    "Melestarikan budaya Minangkabau, Rumah Gadang, dan adat istiadat lokal.",
    "Mendorong pertumbuhan ekonomi masyarakat melalui UMKM dan potensi lokal.",
    "Memanfaatkan teknologi digital untuk tata kelola pemerintahan yang modern.",
  ],
};

const fallbackStatistik: StatistikItem[] = [
  { label: "Total Penduduk", value: "839", suffix: "jiwa", icon: "Users", urutan: 1, status_aktif: true },
  { label: "Jumlah Jorong", value: "3", suffix: "jorong", icon: "Landmark", urutan: 2, status_aktif: true },
  { label: "Luas Wilayah", value: "13.40", suffix: "km²", icon: "Map", urutan: 3, status_aktif: true },
  { label: "Jumlah Mushala", value: "7", suffix: "unit", icon: "Sparkles", urutan: 4, status_aktif: true },
  { label: "Jumlah Masjid", value: "1", suffix: "unit", icon: "Building2", urutan: 5, status_aktif: true },
  { label: "UMKM", value: "25", suffix: "+", icon: "Store", urutan: 6, status_aktif: true },
];

const fallbackPemerintahan: PemerintahanItem[] = [
  {
    nama: "Zulfi Amri",
    jabatan: "Wali Nagari",
    deskripsi: "Memimpin pemerintahan nagari, pengembangan pelayanan publik, dan arah transformasi digital Nagari Silongo.",
    foto_url: buildImage("professional Indonesian government portrait, male village leader, premium official attire, elegant studio lighting", "portrait_4_3"),
    urutan: 1,
    status_aktif: true,
  },
  {
    nama: "Rina Putri",
    jabatan: "Sekretaris Nagari",
    deskripsi: "Mengelola administrasi pemerintahan, surat menyurat, dan sinkronisasi program antar perangkat nagari.",
    foto_url: buildImage("professional Indonesian government portrait, female secretary, smart modest formal wear, premium studio lighting", "portrait_4_3"),
    urutan: 2,
    status_aktif: true,
  },
  {
    nama: "Fajar Ramadhan",
    jabatan: "Perangkat Nagari",
    deskripsi: "Mendukung pelayanan masyarakat, data nagari, serta pelaksanaan program pembangunan dan pemberdayaan.",
    foto_url: buildImage("professional Indonesian civil servant portrait, modern government style, respectful smile, studio photography", "portrait_4_3"),
    urutan: 3,
    status_aktif: true,
  },
];

const fallbackWisata: WisataItem[] = [
  {
    title: "Rumah Gadang dan Identitas Nagari",
    slug: "rumah-gadang-dan-identitas-nagari",
    description: "Warisan arsitektur Minangkabau menjadi wajah budaya Nagari Silongo dengan nilai adat, kekerabatan, dan filosofi hidup yang kuat.",
    image_url: buildImage("luxury cinematic Rumah Gadang in West Sumatra, golden hour, premium tourism editorial photography", "landscape_4_3"),
    category: "Budaya",
    status_aktif: true,
  },
  {
    title: "Tari Tanduok dan Ekspresi Budaya",
    slug: "tari-tanduok-dan-ekspresi-budaya",
    description: "Tari Tanduok menghadirkan semangat tradisi Minangkabau yang dinamis, anggun, dan sarat makna kebersamaan.",
    image_url: buildImage("Minangkabau traditional dance performance, elegant costume, cultural stage, cinematic lighting, realistic photo", "landscape_4_3"),
    category: "Seni Tradisi",
    status_aktif: true,
  },
  {
    title: "Potensi Alam Batang Longo",
    slug: "potensi-alam-batang-longo",
    description: "Koridor alam Batang Longo dan Sungai Sariek menghadirkan lanskap yang tenang, subur, dan potensial untuk wisata berbasis alam.",
    image_url: buildImage("lush West Sumatra river landscape with tropical greenery, cinematic tourism photo, soft morning haze", "landscape_4_3"),
    category: "Wisata Alam",
    status_aktif: true,
  },
];

const fallbackBerita: BeritaItem[] = [
  {
    title: "Digitalisasi Layanan Publik Nagari Silongo",
    slug: "digitalisasi-layanan-publik-nagari-silongo",
    excerpt: "Nagari Silongo memperkuat tata kelola informasi publik melalui portal digital yang lebih modern dan responsif.",
    content: "Nagari Silongo terus memperkuat kualitas layanan publik dengan menghadirkan portal resmi yang modern, informatif, dan mudah diakses oleh masyarakat. Langkah ini menjadi bagian dari upaya mendorong pemerintahan yang transparan, profesional, dan adaptif terhadap kebutuhan era digital.",
    thumbnail_url: buildImage("premium government meeting in Indonesian village office, digital transformation theme, realistic photography", "landscape_16_9"),
    category: "Pemerintahan",
    is_featured: true,
    published_at: new Date().toISOString(),
  },
  {
    title: "Pelestarian Adat dan Budaya Minangkabau di Silongo",
    slug: "pelestarian-adat-dan-budaya-minangkabau-di-silongo",
    excerpt: "Masyarakat Silongo terus menjaga nilai adat, gotong royong, dan identitas budaya yang menjadi kekuatan sosial nagari.",
    content: "Berbagai kegiatan budaya, musyawarah adat, dan penguatan identitas lokal terus dijalankan agar generasi muda tetap mengenal akar budayanya. Semangat gotong royong dan pepatah adat menjadi fondasi hidup masyarakat Nagari Silongo.",
    thumbnail_url: buildImage("Minangkabau cultural community event, premium editorial documentary photography, warm natural tones", "landscape_16_9"),
    category: "Budaya",
    is_featured: false,
    published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    title: "Potensi UMKM Lokal Semakin Tumbuh",
    slug: "potensi-umkm-lokal-semakin-tumbuh",
    excerpt: "Pelaku usaha lokal mulai memanfaatkan ruang promosi digital untuk memperluas jangkauan produk unggulan nagari.",
    content: "UMKM di Nagari Silongo menjadi salah satu pilar ekonomi masyarakat. Dengan dukungan promosi, pembinaan, dan teknologi digital, produk lokal diharapkan mampu menjangkau pasar yang lebih luas dan meningkatkan kesejahteraan warga.",
    thumbnail_url: buildImage("Indonesian local UMKM products display, artisanal snacks and crafts, premium business photography", "landscape_16_9"),
    category: "Ekonomi",
    is_featured: false,
    published_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

const fallbackGaleri: GaleriItem[] = [
  {
    title: "Panorama Nagari",
    description: "Lanskap alami dan atmosfer khas Silongo.",
    image_url: buildImage("premium panoramic landscape of West Sumatra rural valley, cinematic, soft glow, realistic photography", "portrait_16_9"),
    category: "Alam",
    urutan: 1,
    status_aktif: true,
  },
  {
    title: "Rumah Gadang",
    description: "Arsitektur adat Minangkabau yang menjadi identitas visual nagari.",
    image_url: buildImage("close up premium Rumah Gadang architecture details, ornate wood carving, elegant daylight", "portrait_4_3"),
    category: "Budaya",
    urutan: 2,
    status_aktif: true,
  },
  {
    title: "Kehidupan Masyarakat",
    description: "Nuansa gotong royong dan kebersamaan masyarakat setempat.",
    image_url: buildImage("Indonesian rural community togetherness, warm documentary style, respectful realistic photography", "portrait_4_3"),
    category: "Masyarakat",
    urutan: 3,
    status_aktif: true,
  },
  {
    title: "Sungai dan Alam",
    description: "Bentang sungai dan vegetasi yang memperkuat karakter alam Silongo.",
    image_url: buildImage("West Sumatra river and tropical forest, premium tourism editorial shot, cinematic green palette", "portrait_16_9"),
    category: "Alam",
    urutan: 4,
    status_aktif: true,
  },
];

const fallbackKontak: KontakContent = {
  alamat: "Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat",
  kode_pos: "27553",
  whatsapp: "6281234567890",
  email: "silongo.digital@example.com",
  maps_embed: "https://www.google.com/maps?q=-0.8180,101.0537&z=13&output=embed",
  jam_layanan: "Senin - Jumat, 08.00 - 16.00 WIB",
};

const fallbackFooter: FooterSettings = {
  footer_description: "Portal resmi pemerintahan Nagari Silongo untuk informasi publik, promosi potensi nagari, dan transformasi layanan digital yang profesional.",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  tiktok: "https://tiktok.com",
};

function mapRows<T>(rows: T[] | null | undefined, fallback: T[]) {
  return rows && rows.length > 0 ? rows : fallback;
}

async function selectSingle<T>(table: string, fallback: T): Promise<T> {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return fallback;
  }

  const { data } = await supabase.from(table).select("*").limit(1).maybeSingle();
  return (data as T | null) ?? fallback;
}

async function selectMany<T>(table: string, orderColumn: string, fallback: T[], activeOnly = true): Promise<T[]> {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return fallback;
  }

  let query = supabase.from(table).select("*").order(orderColumn, { ascending: true });
  if (activeOnly) {
    query = query.eq("status_aktif", true);
  }

  const { data } = await query;
  return mapRows(data as T[] | null, fallback);
}

export async function getHomeData(): Promise<HomeData> {
  const [hero, profil, visiMisi, statistik, pemerintahan, wisata, berita, galeri, kontak, footer] = await Promise.all([
    selectSingle<HeroContent>("hero", fallbackHero),
    selectSingle<ProfilContent>("profil", fallbackProfil),
    selectSingle<VisiMisiContent>("visi_misi", fallbackVisiMisi),
    selectMany<StatistikItem>("statistik", "urutan", fallbackStatistik),
    selectMany<PemerintahanItem>("pemerintahan", "urutan", fallbackPemerintahan),
    selectMany<WisataItem>("wisata", "created_at", fallbackWisata),
    selectMany<BeritaItem>("berita", "published_at", fallbackBerita, false),
    selectMany<GaleriItem>("galeri", "urutan", fallbackGaleri),
    selectSingle<KontakContent>("kontak", fallbackKontak),
    selectSingle<FooterSettings>("admin_settings", fallbackFooter),
  ]);

  return {
    hero,
    profil: {
      ...fallbackProfil,
      ...profil,
      daftar_jorong_json: Array.isArray(profil.daftar_jorong_json) ? profil.daftar_jorong_json : fallbackProfil.daftar_jorong_json,
      sungai_json: Array.isArray(profil.sungai_json) ? profil.sungai_json : fallbackProfil.sungai_json,
      fasilitas_json: profil.fasilitas_json ?? fallbackProfil.fasilitas_json,
    },
    visiMisi: {
      ...fallbackVisiMisi,
      ...visiMisi,
      misi: Array.isArray(visiMisi.misi) ? visiMisi.misi : fallbackVisiMisi.misi,
    },
    statistik,
    pemerintahan,
    wisata,
    berita: berita
      .slice()
      .sort((a, b) => Number(new Date(b.published_at)) - Number(new Date(a.published_at)))
      .map((item) => ({ ...item, excerpt: item.excerpt ?? excerpt(item.content, 120) })),
    galeri,
    kontak,
    footer,
  };
}

export async function getBeritaList() {
  const { berita } = await getHomeData();
  return berita;
}

export async function getBeritaBySlug(slug: string) {
  const supabase = createServiceRoleClient();
  if (supabase) {
    const { data } = await supabase.from("berita").select("*").eq("slug", slug).maybeSingle();
    if (data) {
      const row = data as BeritaItem;
      return { ...row, excerpt: row.excerpt ?? excerpt(row.content, 140) };
    }
  }

  const items = await getBeritaList();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getWisataList() {
  const { wisata } = await getHomeData();
  return wisata;
}

export async function getWisataBySlug(slug: string) {
  const supabase = createServiceRoleClient();
  if (supabase) {
    const { data } = await supabase.from("wisata").select("*").eq("slug", slug).maybeSingle();
    if (data) {
      return data as WisataItem;
    }
  }

  const items = await getWisataList();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getGalleryList() {
  const { galeri } = await getHomeData();
  return galeri;
}

export async function getPublicNavigationData() {
  const home = await getHomeData();
  return {
    hero: home.hero,
    footer: home.footer,
    kontak: home.kontak,
  };
}
