import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ============================================
  // SINGLE-RECORD TABLES (upsert)
  // ============================================

  // --- Admin ---
  const hashedPassword = '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu6GK'; // "admin123"
  await prisma.admin.upsert({
    where: { id: 'seed-admin' },
    update: {},
    create: {
      id: 'seed-admin',
      email: 'admin@nagarisilongo.id',
      password: hashedPassword,
      name: 'Administrator Nagari Silongo',
      role: 'admin',
    },
  });
  console.log('✅ Admin seeded');

  // --- Hero ---
  await prisma.hero.upsert({
    where: { id: 'seed-hero' },
    update: {},
    create: {
      id: 'seed-hero',
      badge: 'Website Resmi Pemerintahan Nagari',
      title: 'NAGARI SILONGO',
      subtitle: 'Kecamatan Lubuk Tarok • Kabupaten Sijunjung • Sumatera Barat',
      slogan: 'Di Mana Bumi Dipijak, Di Situ Langit Dijunjung',
      image_url: null,
    },
  });
  console.log('✅ Hero seeded');

  // --- Sambutan ---
  await prisma.sambutan.upsert({
    where: { id: 'seed-sambutan' },
    update: {},
    create: {
      id: 'seed-sambutan',
      nama: 'Zulfi Amri',
      jabatan: 'Wali Nagari Silongo',
      isi_sambutan:
        'Assalamualaikum Warahmatullahi Wabarakatuh,\n\nSalam sejahtera bagi kita semua.\n\nPuji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas segala rahmat dan karunia-Nya, sehingga website resmi Pemerintahan Nagari Silongo dapat hadir sebagai media informasi dan transparansi pelayanan publik.\n\nWebsite ini hadir sebagai upaya kami untuk mendekatkan pelayanan pemerintahan kepada masyarakat Nagari Silongo. Melalui platform digital ini, masyarakat dapat mengakses berbagai informasi terkait program pembangunan, pelayanan administrasi, agenda kegiatan, serta berita-berita terbaru dari Nagari Silongo.\n\nKami berkomitmen penuh untuk membangun Nagari Silongo yang maju, mandiri, religius, dan berbudaya. Dengan semangat gotong royong dan kearifan lokal Minangkabau, kita bersama-sama mewujudkan Nagari Silongo sebagai nagari yang berdaya saing dan sejahtera.\n\nKritik, saran, dan masukan dari masyarakat sangat kami harapkan demi perbaikan pelayanan yang terus berkelanjutan.\n\nWassalamualaikum Warahmatullahi Wabarakatuh.',
      bio: 'Zulfi Amri merupakan pemimpin terpilih Nagari Silongo yang berkomitmen penuh dalam memajukan pelayanan publik, melestarikan budaya Minangkabau, dan mendorong pembangunan berkelanjutan untuk kesejahteraan seluruh masyarakat Nagari Silongo. Lahir dan besar di Nagari Silongo, beliau memahami betul kebutuhan dan aspirasi masyarakat setempat.',
      foto_url: null,
      masa_jabatan: '2024 - 2029',
      jml_jorong: '3',
    },
  });
  console.log('✅ Sambutan seeded');

  // --- Profil ---
  await prisma.profil.upsert({
    where: { id: 'seed-profil' },
    update: {},
    create: {
      id: 'seed-profil',
      title: 'Tentang Nagari Silongo',
      description:
        'Nagari Silongo adalah sebuah nagari yang terletak di Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Provinsi Sumatera Barat. Nagari ini memiliki wilayah seluas kurang lebih 13,40 km² yang terdiri dari 3 jorong yaitu Jorong Silongo, Jorong Koto VII, dan Jorong Padang Sibusuk.\n\nNagari Silongo dikelilingi oleh keindahan alam pegunungan dan lereng Bukit Barisan dengan hamparan sawah yang hijau dan sungai yang mengalir jernih. Masyarakat Nagari Silongo menjunjung tinggi adat dan budaya Minangkabau dalam kehidupan sehari-hari, dengan sistem matrilineal yang kuat dan nagari sebagai unit pemerintahan adat terendah.\n\nSebagian besar masyarakat bermata pencaharian sebagai petani, peternak, dan pedagang. Nagari Silongo juga memiliki potensi wisata alam dan budaya yang belum sepenuhnya dikembangkan. Pemerintah Nagari terus berupaya meningkatkan kualitas pelayanan publik, infrastruktur, dan kesejahteraan masyarakat melalui berbagai program pembangunan.',
      image_url: null,
    },
  });
  console.log('✅ Profil seeded');

  // --- VisiMisi ---
  await prisma.visiMisi.upsert({
    where: { id: 'seed-visi-misi' },
    update: {},
    create: {
      id: 'seed-visi-misi',
      visi: 'Mewujudkan Nagari Silongo yang maju, mandiri, religius, berbudaya, dan berbasis digital.',
      misi: JSON.stringify([
        'Meningkatkan kualitas pelayanan publik yang transparan, akuntabel, dan berbasis digital',
        'Memajukan pendidikan dan pengembangan sumber daya manusia yang unggul dan berkarakter',
        'Mengembangkan potensi ekonomi kerakyatan dan UMKM untuk kesejahteraan masyarakat',
        'Melestarikan dan mengembangkan budaya Minangkabau serta kearifan lokal nagari',
        'Membangun infrastruktur yang merata dan berkelanjutan di seluruh jorong',
        'Memperkuat kehidupan beragama dan membangun masyarakat yang religius dan toleran',
        'Meningkatkan keterlibatan masyarakat dalam perencanaan dan pembangunan nagari',
      ]),
    },
  });
  console.log('✅ VisiMisi seeded');

  // --- Kontak ---
  await prisma.kontak.upsert({
    where: { id: 'seed-kontak' },
    update: {},
    create: {
      id: 'seed-kontak',
      alamat: 'Jl. Raya Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat 27553',
      kode_pos: '27553',
      phone: '(0754) 123456',
      whatsapp: '6281234567890',
      email: 'nagarisilongo@gmail.com',
      maps_embed:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.472!2d101.05!3d-0.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzknMDAuMCJTIDEwMcKwMDMnMDAuMCJF!5e0!3m2!1sid!2sid!4v1700000000000" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
      jam_layanan: 'Senin - Jumat: 08.00 - 15.00 WIB\nSabtu: 08.00 - 12.00 WIB',
    },
  });
  console.log('✅ Kontak seeded');

  // --- FooterSettings ---
  await prisma.footerSettings.upsert({
    where: { id: 'seed-footer' },
    update: {},
    create: {
      id: 'seed-footer',
      description:
        'Website resmi Pemerintahan Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat. Melayani masyarakat dengan transparansi dan profesionalisme.',
      facebook: 'https://facebook.com/nagarisilongo',
      instagram: 'https://instagram.com/nagarisilongo',
      youtube: 'https://youtube.com/@nagarisilongo',
      tiktok: 'https://tiktok.com/@nagarisilongo',
    },
  });
  console.log('✅ FooterSettings seeded');

  // ============================================
  // MULTI-RECORD TABLES (createMany + skipDuplicates)
  // ============================================

  // --- Statistik ---
  await prisma.statistik.createMany({
    data: [
      {
        id: 'seed-stat-1',
        label: 'Penduduk',
        value: '839',
        icon: 'Users',
      },
      {
        id: 'seed-stat-2',
        label: 'Jorong',
        value: '3',
        icon: 'MapPin',
      },
      {
        id: 'seed-stat-3',
        label: 'Dusun',
        value: '12',
        icon: 'Home',
      },
      {
        id: 'seed-stat-4',
        label: 'Luas Wilayah',
        value: '13.40 km²',
        icon: 'Map',
      },
      {
        id: 'seed-stat-5',
        label: 'Kepala Keluarga',
        value: '245',
        icon: 'UserCheck',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Statistik seeded');

  // --- Pemerintahan ---
  await prisma.pemerintahan.createMany({
    data: [
      {
        id: 'seed-pem-1',
        nama: 'Zulfi Amri',
        jabatan: 'Wali Nagari',
        deskripsi:
          'Pemimpin tertinggi di Nagari Silongo yang bertanggung jawab atas penyelenggaraan pemerintahan, pembangunan, dan pemberdayaan masyarakat.',
        urutan: 1,
        status_aktif: true,
      },
      {
        id: 'seed-pem-2',
        nama: 'Yusri Dt. Bandaro',
        jabatan: 'Sekretaris Nagari',
        deskripsi:
          'Mengelola administrasi pemerintahan nagari dan mendukung kinerja Wali Nagari dalam menjalankan program kerja.',
        urutan: 2,
        status_aktif: true,
      },
      {
        id: 'seed-pem-3',
        nama: 'Rizal Efendi',
        jabatan: 'Kepala Jorong Silongo',
        deskripsi: 'Memimpin dan mengkoordinasikan kegiatan pemerintahan di Jorong Silongo.',
        urutan: 3,
        status_aktif: true,
      },
      {
        id: 'seed-pem-4',
        nama: 'Hendra Saputra',
        jabatan: 'Kepala Jorong Koto VII',
        deskripsi: 'Memimpin dan mengkoordinasikan kegiatan pemerintahan di Jorong Koto VII.',
        urutan: 4,
        status_aktif: true,
      },
      {
        id: 'seed-pem-5',
        nama: 'Desri Yondri',
        jabatan: 'Kepala Jorong Padang Sibusuk',
        deskripsi: 'Memimpin dan mengkoordinasikan kegiatan pemerintahan di Jorong Padang Sibusuk.',
        urutan: 5,
        status_aktif: true,
      },
      {
        id: 'seed-pem-6',
        nama: 'Nita Suryani',
        jabatan: 'Bendahara Nagari',
        deskripsi: 'Mengelola keuangan nagari secara transparan dan akuntabel sesuai peraturan yang berlaku.',
        urutan: 6,
        status_aktif: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Pemerintahan seeded');

  // --- Layanan ---
  await prisma.layanan.createMany({
    data: [
      {
        id: 'seed-lay-1',
        nama: 'Surat Keterangan Domisili',
        deskripsi: 'Penerbitan surat keterangan domisili untuk keperluan administrasi kependudukan.',
        icon: 'FileText',
        tag: 'Populer',
        urutan: 1,
        aktif: true,
      },
      {
        id: 'seed-lay-2',
        nama: 'Surat Keterangan Usaha',
        deskripsi: 'Penerbitan surat keterangan usaha bagi pelaku UMKM di Nagari Silongo.',
        icon: 'Briefcase',
        tag: 'UMKM',
        urutan: 2,
        aktif: true,
      },
      {
        id: 'seed-lay-3',
        nama: 'Pengurusan KTP',
        deskripsi: 'Fasilitasi pengurusan pembuatan dan perpanjangan Kartu Tanda Penduduk elektronik.',
        icon: 'CreditCard',
        tag: 'Cepat',
        urutan: 3,
        aktif: true,
      },
      {
        id: 'seed-lay-4',
        nama: 'Pengurusan KK',
        deskripsi: 'Fasilitasi pengurusan pembuatan dan perubahan Kartu Keluarga.',
        icon: 'Users',
        tag: 'Populer',
        urutan: 4,
        aktif: true,
      },
      {
        id: 'seed-lay-5',
        nama: 'Surat Keterangan Tidak Mampu',
        deskripsi: 'Penerbitan SKTM untuk masyarakat yang membutuhkan keringanan biaya pendidikan dan kesehatan.',
        icon: 'Heart',
        tag: 'Sosial',
        urutan: 5,
        aktif: true,
      },
      {
        id: 'seed-lay-6',
        nama: 'Legalisir Dokumen',
        deskripsi: 'Layanan pengesahan dan legalisir dokumen penting yang diterbitkan oleh pemerintah nagari.',
        icon: 'Stamp',
        tag: null,
        urutan: 6,
        aktif: true,
      },
      {
        id: 'seed-lay-7',
        nama: 'Pendaftaran Penduduk',
        deskripsi: 'Layanan pendaftaran penduduk baru, perpindahan, dan perubahan data kependudukan.',
        icon: 'ClipboardList',
        tag: null,
        urutan: 7,
        aktif: true,
      },
      {
        id: 'seed-lay-8',
        nama: 'Mediasi Permasalahan',
        deskripsi: 'Layanan mediasi dan penyelesaian permasalahan antar warga di tingkat nagari.',
        icon: 'Scale',
        tag: 'Sosial',
        urutan: 8,
        aktif: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Layanan seeded');

  // --- FAQ ---
  await prisma.fAQ.createMany({
    data: [
      {
        id: 'seed-faq-1',
        pertanyaan: 'Bagaimana cara mengurus Surat Keterangan Domisili?',
        jawaban:
          'Silakan datang ke kantor Nagari Silongo pada jam layanan (Senin-Jumat 08.00-15.00 WIB) dengan membawa KTP asli, fotokopi KK, dan surat pengantar RT/RW. Proses penerbitan membutuhkan waktu 1-3 hari kerja.',
        urutan: 1,
        aktif: true,
      },
      {
        id: 'seed-faq-2',
        pertanyaan: 'Apa saja syarat untuk pembuatan KTP Elektronik?',
        jawaban:
          'Syarat pembuatan KTP-el: Surat pengantar dari Nagari, KTP lama (jika perpanjangan), fotokopi Kartu Keluarga, surat keterangan pindah (jika dari daerah lain), dan pas foto 3x4 (2 lembar). Proses dilakukan di Disdukcapil Kabupaten Sijunjung.',
        urutan: 2,
        aktif: true,
      },
      {
        id: 'seed-faq-3',
        pertanyaan: 'Bagaimana cara mengajukan pengaduan masyarakat?',
        jawaban:
          'Pengaduan dapat disampaikan melalui: (1) Langsung datang ke kantor Nagari, (2) Menghubungi nomor WhatsApp 0812-3456-7890, (3) Melalui formulir pengaduan di website ini. Setiap pengaduan akan ditindaklanjuti dalam waktu maksimal 7 hari kerja.',
        urutan: 3,
        aktif: true,
      },
      {
        id: 'seed-faq-4',
        pertanyaan: 'Kapan jadwal musyawarah Nagari (MUNAG)?',
        jawaban:
          'Musyawarah Nagari rutin diadakan setiap bulan pada minggu kedua. Jadwal dan agenda akan diumumkan melalui website, papan pengumuman kantor Nagari, dan grup WhatsApp perwakilan jorong.',
        urutan: 4,
        aktif: true,
      },
      {
        id: 'seed-faq-5',
        pertanyaan: 'Bagaimana cara mendaftar untuk mendapatkan bantuan sosial?',
        jawaban:
          'Pendaftaran bantuan sosial dilakukan melalui pendataan oleh ketua jorong/rw/rt. Pastikan data kependudukan Anda sudah tercatat di Nagari. Untuk informasi lebih lanjut, silakan hubungi kantor Nagari atau datang langsung dengan membawa KTP dan KK.',
        urutan: 5,
        aktif: true,
      },
      {
        id: 'seed-faq-6',
        pertanyaan: 'Di mana saya bisa melihat laporan keuangan Nagari?',
        jawaban:
          'Laporan keuangan Nagari Silongo dipublikasikan secara transparan melalui website ini dan dipajang di papan informasi kantor Nagari. Masyarakat juga dapat meminta salinan laporan keuangan secara langsung di kantor Nagari.',
        urutan: 6,
        aktif: true,
      },
      {
        id: 'seed-faq-7',
        pertanyaan: 'Apakah Nagari Silongo memiliki potensi wisata?',
        jawaban:
          'Ya, Nagari Silongo memiliki beberapa potensi wisata alam dan budaya yang menarik, antara lain pemandangan alam pegunungan, sawah terasering, dan tradisi budaya Minangkabau. Informasi lebih lanjut dapat dilihat di halaman Wisata website ini.',
        urutan: 7,
        aktif: true,
      },
      {
        id: 'seed-faq-8',
        pertanyaan: 'Bagaimana cara berpartisipasi dalam kegiatan Nagari?',
        jawaban:
          'Masyarakat dapat berpartisipasi dengan menghadiri musyawarah nagari, bergabung dalam kelompok kerja nagari, menjadi relawan di kegiatan sosial, atau menyampaikan aspirasi melalui perwakilan jorong. Informasi kegiatan terbaru dapat dilihat di halaman Agenda website ini.',
        urutan: 8,
        aktif: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ FAQ seeded');

  // --- Wisata ---
  await prisma.wisata.createMany({
    data: [
      {
        id: 'seed-wis-1',
        title: 'Pemandangan Bukit Silongo',
        description:
          'Spot wisata alam dengan pemandangan pegunungan Bukit Barisan yang memukau. Dari puncak bukit, pengunjung dapat menikmati panorama alam Nagari Silongo dan sekitarnya yang hijau dan asri. Cocok untuk hiking ringan dan fotografi landscape.',
        category: 'Wisata Alam',
      },
      {
        id: 'seed-wis-2',
        title: 'Sawah Terasering Nagari',
        description:
          'Hamparan sawah terasering yang menjadi ikon pertanian Nagari Silongo. Pemandangan ini menawarkan keindahan alam pedesaan khas Minangkabau dengan latar belakang pegunungan. Terbaik dikunjungi saat musim tanam atau menjelang panen.',
        category: 'Wisata Alam',
      },
      {
        id: 'seed-wis-3',
        title: 'Surau Tuah Sakato',
        description:
          'Bangunan bersejarah yang merupakan pusat kegiatan keagamaan dan pendidikan informal masyarakat. Surau ini menjadi saksi bisu sejarah panjang Nagari Silongo dan masih aktif digunakan untuk kegiatan keagamaan dan pembelajaran Al-Quran.',
        category: 'Budaya',
      },
      {
        id: 'seed-wis-4',
        title: 'Rumah Gadang Silongo',
        description:
          'Rumah Gadang tradisional yang masih terpelihara dengan baik, menjadi simbol kearifan arsitektur Minangkabau. Rumah Gadang ini digunakan untuk acara adat, pesta pernikahan, dan pertemuan keluarga besar.',
        category: 'Budaya',
      },
      {
        id: 'seed-wis-5',
        title: 'Kuliner Randang Silongo',
        description:
          'Rumah makan yang menyajikan randang khas Minangkabau dengan resep turun-temurun. Selain randang, tersedia juga gulai, asam padeh, dan berbagai masakan Padang autentik lainnya yang menggunakan bahan-bahan lokal segar dari Nagari Silongo.',
        category: 'Kuliner',
      },
      {
        id: 'seed-wis-6',
        title: 'Air Terjun Batu Langkisau',
        description:
          'Air terjun tersembunyi di kawasan hutan Nagari Silongo dengan ketinggian sekitar 15 meter. Perjalanannya cukup menantang namun pemandangan air terjun yang jernih dan udara sejuk pegunungan membuat perjalanan ini sangat berharga.',
        category: 'Wisata Alam',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Wisata seeded');

  // --- Berita ---
  await prisma.berita.createMany({
    data: [
      {
        id: 'seed-ber-1',
        title: 'Nagari Silongo Raih Penghargaan Nagari Digital Terbaik 2024',
        slug: 'nagari-silongo-raih-penghargaan-nagari-digital-terbaik-2024',
        content:
          'Nagari Silongo berhasil meraih penghargaan sebagai Nagari Digital Terbaik tahun 2024 dari Pemerintah Provinsi Sumatera Barat. Penghargaan ini diberikan atas inovasi dalam pelayanan publik berbasis digital yang telah diimplementasikan melalui website resmi dan sistem informasi nagari.\n\nWali Nagari Silongo, Zulfi Amri, menyampaikan rasa syukur dan apresiasi atas penghargaan ini. "Ini adalah hasil kerja keras seluruh perangkat nagari dan partisipasi masyarakat dalam mendukung transformasi digital," ujarnya.\n\nPenghargaan ini diharapkan dapat memotivasi nagari-nagari lain untuk mengadopsi teknologi digital dalam pelayanan publik.',
        thumbnail: null,
        category: 'Penghargaan',
        is_featured: true,
        author: 'Admin Nagari',
      },
      {
        id: 'seed-ber-2',
        title: 'Musyawarah Nagari Bahas Program Pembangunan 2025',
        slug: 'musyawarah-nagari-bahas-program-pembangunan-2025',
        content:
          'Pemerintah Nagari Silongo menggelar Musyawarah Nagari (MUNAG) yang dihadiri oleh seluruh perangkat nagari, ketua jorong, tokoh masyarakat, dan perwakilan warga. Musyawarah ini membahas program pembangunan tahun 2025 yang mencakup peningkatan infrastruktur jalan, pembangunan taman nagari, dan program pemberdayaan UMKM.\n\nBeberapa program prioritas yang disetujui meliputi perbaikan jalan penghubung antar jorong, pembangunan pos keamanan, dan peluncuran program digitalisasi pelayanan administrasi kependudukan.',
        thumbnail: null,
        category: 'Pemerintahan',
        is_featured: false,
        author: 'Admin Nagari',
      },
      {
        id: 'seed-ber-3',
        title: 'Festival Budaya Minangkabau di Nagari Silongo Sukses Digelar',
        slug: 'festival-budaya-minangkabau-di-nagari-silongo-sukses-digelar',
        content:
          'Nagari Silongo sukses menyelenggarakan Festival Budaya Minangkabau yang menampilkan berbagai pertunjukan seni dan budaya tradisional. Festival ini diikuti oleh ratusan peserta dari seluruh jorong dan dimeriahkan dengan penampilan tari pagar nusan, saluang dendang, dan pertunjukan silat.\n\nSelain pertunjukan seni, festival ini juga menyediakan bazar UMKM yang memamerkan produk-produk lokal Nagari Silongo seperti kerajinan tangan, makanan khas, dan produk pertanian.\n\nKegiatan ini bertujuan untuk melestarikan budaya Minangkabau sekaligus mempromosikan potensi wisata Nagari Silongo.',
        thumbnail: null,
        category: 'Budaya',
        is_featured: false,
        author: 'Admin Nagari',
      },
      {
        id: 'seed-ber-4',
        title: 'Program Pemberdayaan UMKM Nagari Silongo Resmi Diluncurkan',
        slug: 'program-pemberdayaan-umkm-nagari-silongo-resmi-diluncurkan',
        content:
          'Pemerintah Nagari Silongo meluncurkan program pemberdayaan UMKM yang bertujuan meningkatkan kapasitas dan daya saing pelaku usaha kecil di nagari. Program ini mencakup pelatihan manajemen usaha, bantuan modal usaha, serta fasilitasi pemasaran produk melalui platform digital.\n\n"UMKM adalah tulang punggung perekonomian nagari. Kita harus memberikan dukungan penuh agar UMKM di Nagari Silongo dapat berkembang dan bersaing," kata Zulfi Amri, Wali Nagari Silongo.',
        thumbnail: null,
        category: 'Ekonomi',
        is_featured: false,
        author: 'Admin Nagari',
      },
      {
        id: 'seed-ber-5',
        title: 'Perbaikan Jalan Penghubung Jorong Silongo-Padang Sibusuk Tuntas',
        slug: 'perbaikan-jalan-penghubung-jorong-silongo-padang-sibusuk-tuntas',
        content:
          'Pemerintah Nagari Silongo menyelesaikan proyek perbaikan jalan penghubung antara Jorong Silongo dan Jorong Padang Sibusuk. Proyek yang memakan waktu 3 bulan ini menggunakan dana APB Nagari dan dana bantuan dari Pemerintah Kabupaten Sijunjung.\n\nJalan sepanjang 2,5 kilometer ini kini sudah diaspal dan dilengkapi drainase. Dengan adanya perbaikan ini, akses transportasi antar jorong menjadi lebih mudah dan aman, terutama saat musim hujan.',
        thumbnail: null,
        category: 'Pembangunan',
        is_featured: false,
        author: 'Admin Nagari',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Berita seeded');

  // --- Galeri ---
  await prisma.galeri.createMany({
    data: [
      {
        id: 'seed-gal-1',
        title: 'Kantor Nagari Silongo',
        description: 'Gedung kantor pemerintahan Nagari Silongo yang baru direnovasi',
        image_url: '/placeholder-kantor-nagari.jpg',
        category: 'Infrastruktur',
      },
      {
        id: 'seed-gal-2',
        title: 'Pemandangan Alam Nagari',
        description: 'Panorama hijau pegunungan dan sawah di Nagari Silongo',
        image_url: '/placeholder-alam-nagari.jpg',
        category: 'Alam',
      },
      {
        id: 'seed-gal-3',
        title: 'Rumah Gadang Tradisional',
        description: 'Salah satu Rumah Gadang yang masih terpelihara di Nagari Silongo',
        image_url: '/placeholder-rumah-gadang.jpg',
        category: 'Budaya',
      },
      {
        id: 'seed-gal-4',
        title: 'Musyawarah Nagari',
        description: 'Suasana musyawarah nagari yang dihadiri seluruh perangkat dan warga',
        image_url: '/placeholder-musyawarah.jpg',
        category: 'Sosial',
      },
      {
        id: 'seed-gal-5',
        title: 'Sawah Terasering',
        description: 'Keindahan sawah terasering khas Nagari Silongo saat musim tanam',
        image_url: '/placeholder-sawah-terasering.jpg',
        category: 'Alam',
      },
      {
        id: 'seed-gal-6',
        title: 'Festival Budaya Minangkabau',
        description: 'Pertunjukan tari tradisional pada Festival Budaya Minangkabau di Nagari Silongo',
        image_url: '/placeholder-festival-budaya.jpg',
        category: 'Budaya',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Galeri seeded');

  // --- Agenda ---
  await prisma.agenda.createMany({
    data: [
      {
        id: 'seed-age-1',
        tanggal: '2025-02-15',
        judul: 'Musyawarah Nagari (MUNAG) Bulanan',
        lokasi: 'Aula Kantor Nagari Silongo',
        kategori: 'Pemerintahan',
        deskripsi:
          'Musyawarah nagari rutin bulanan untuk membahas perkembangan program kerja, laporan keuangan, dan perencanaan kegiatan bulan berikutnya. Dihadiri oleh seluruh perangkat nagari dan perwakilan jorong.',
      },
      {
        id: 'seed-age-2',
        tanggal: '2025-03-01',
        judul: 'Gotong Royong Bersih Nagari',
        lokasi: 'Seluruh wilayah Nagari Silongo',
        kategori: 'Sosial',
        deskripsi:
          'Kegiatan gotong royong membersihkan lingkungan nagari meliputi pembersihan jalan, drainase, dan area publik. Seluruh warga dimohon untuk berpartisipasi dengan membawa peralatan kebersihan.',
      },
      {
        id: 'seed-age-3',
        tanggal: '2025-03-17',
        judul: 'Pelatihan Digitalisasi UMKM',
        lokasi: 'Aula Kantor Nagari Silongo',
        kategori: 'Ekonomi',
        deskripsi:
          'Pelatihan pemanfaatan platform digital untuk pemasaran produk UMKM Nagari Silongo. Materi mencakup penggunaan media sosial bisnis, marketplace, dan pembuatan konten promosi.',
      },
      {
        id: 'seed-age-4',
        tanggal: '2025-04-05',
        judul: 'Peringatan Isra Miraj Nabi Muhammad SAW',
        lokasi: 'Mesjid Jami Nagari Silongo',
        kategori: 'Keagamaan',
        deskripsi:
          'Peringatan Isra Miraj Nabi Muhammad SAW 1446 H yang diisi dengan ceramah, sholawat bersama, dan pemberian santunan kepada anak yatim.',
      },
      {
        id: 'seed-age-5',
        tanggal: '2025-04-20',
        judul: 'Posyandu Balita & Lansia',
        lokasi: 'Puskesmas Pembantu Nagari Silongo',
        kategori: 'Kesehatan',
        deskripsi:
          'Kegiatan Posyandu rutin untuk pemeriksaan kesehatan balita, pemberian imunisasi, dan pemeriksaan kesehatan lansia. Warga dimohon membawa buku KIA dan kartu identitas.',
      },
      {
        id: 'seed-age-6',
        tanggal: '2025-05-10',
        judul: 'Festival Wisata Nagari Silongo',
        lokasi: 'Area Wisata Bukit Silongo',
        kategori: 'Pariwisata',
        deskripsi:
          'Festival wisata tahunan yang menampilkan potensi alam dan budaya Nagari Silongo. Acara meliputi trekking, bazar kuliner, pameran kerajinan, dan pertunjukan seni budaya.',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Agenda seeded');

  // --- BukuTamu ---
  await prisma.bukuTamu.createMany({
    data: [
      {
        id: 'seed-bt-1',
        nama: 'Ahmad Rizki',
        email: 'ahmad.rizki@email.com',
        pesan: 'Website nagari yang sangat informatif dan bagus. Semoga Nagari Silongo semakin maju dan berkembang!',
        is_visible: true,
      },
      {
        id: 'seed-bt-2',
        nama: 'Siti Nurhaliza',
        email: null,
        pesan: 'Terima kasih sudah menyediakan informasi yang lengkap. Sangat membantu untuk mengetahui perkembangan nagari.',
        is_visible: true,
      },
      {
        id: 'seed-bt-3',
        nama: 'Budi Santoso',
        email: 'budi.s@email.com',
        pesan: 'Saya yang merantau sangat senang bisa mengikuti perkembangan nagari melalui website ini. Salam dari Jakarta!',
        is_visible: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ BukuTamu seeded');

  // --- Pengaduan (sample entries) ---
  await prisma.pengaduan.createMany({
    data: [
      {
        id: 'seed-peng-1',
        nama: 'Warga Jorong Silongo',
        email: 'warga@email.com',
        telepon: '081234567890',
        kategori: 'Infrastruktur',
        judul: 'Jalan berlubang di Jorong Silongo',
        pesan:
          'Assalamualaikum. Kami ingin melaporkan kondisi jalan di Jorong Silongo yang mengalami kerusakan cukup parah, terutama di sekitar gang masuk ke pemukiman warga. Saat musim hujan, jalan ini menjadi sangat becek dan berbahaya. Mohon dapat ditindaklanjuti. Terima kasih.',
        status: 'Diproses',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Pengaduan seeded');

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });