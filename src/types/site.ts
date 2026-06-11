export type HeroContent = {
  id?: string;
  badge: string;
  title: string;
  subtitle: string;
  slogan: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
  background_image_url: string | null;
  updated_at?: string;
};

export type ProfilContent = {
  id?: string;
  title: string;
  description: string;
  wilayah: string;
  jumlah_penduduk: string;
  jumlah_jorong: string;
  daftar_jorong_json: string[];
  sungai_json: string[];
  fasilitas_json: {
    agama: string[];
    pendidikan: string[];
    jarak: string[];
  };
  image_primary_url: string | null;
  image_secondary_url: string | null;
  updated_at?: string;
};

export type VisiMisiContent = {
  id?: string;
  visi: string;
  misi: string[];
  updated_at?: string;
};

export type StatistikItem = {
  id?: string;
  label: string;
  value: string;
  suffix: string | null;
  icon: string | null;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
};

export type PemerintahanItem = {
  id?: string;
  nama: string;
  jabatan: string;
  deskripsi: string | null;
  foto_url: string | null;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
};

export type WisataItem = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  category: string | null;
  status_aktif: boolean;
  created_at?: string;
};

export type BeritaItem = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  category: string | null;
  is_featured: boolean;
  published_at: string;
  created_at?: string;
};

export type GaleriItem = {
  id?: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string | null;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
};

export type KontakContent = {
  id?: string;
  alamat: string;
  kode_pos: string;
  whatsapp: string | null;
  email: string | null;
  maps_embed: string | null;
  jam_layanan: string | null;
  updated_at?: string;
};

export type FooterSettings = {
  id?: string;
  footer_description: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  updated_at?: string;
};

export type HomeData = {
  hero: HeroContent;
  profil: ProfilContent;
  visiMisi: VisiMisiContent;
  statistik: StatistikItem[];
  pemerintahan: PemerintahanItem[];
  wisata: WisataItem[];
  berita: BeritaItem[];
  galeri: GaleriItem[];
  kontak: KontakContent;
  footer: FooterSettings;
};

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "date" | "image" | "select";
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  rows?: number;
  description?: string;
};

export type ColumnConfig = {
  key: string;
  label: string;
  type?: "text" | "badge" | "boolean" | "image" | "date" | "number";
};
