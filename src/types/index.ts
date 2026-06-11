// Types for Nagari Silongo Website

export interface HeroData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  slogan: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfilData {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface VisiMisiData {
  id: string;
  visi: string;
  misi: string;
  created_at: string;
  updated_at: string;
}

export interface StatistikData {
  id: string;
  label: string;
  value: string;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export interface PemerintahanData {
  id: string;
  nama: string;
  jabatan: string;
  deskripsi: string | null;
  foto_url: string | null;
  urutan: number;
  status_aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface WisataData {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface BeritaData {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  category: string | null;
  is_featured: boolean;
  author: string | null;
  created_at: string;
  updated_at: string;
}

export interface GaleriData {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface KontakData {
  id: string;
  alamat: string;
  kode_pos: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  maps_embed: string | null;
  jam_layanan: string | null;
  created_at: string;
  updated_at: string;
}

export interface FooterData {
  id: string;
  description: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
