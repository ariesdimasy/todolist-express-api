import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todos = [
  {
    title: "Buat laporan bulanan",
    desc: "Menyusun laporan kinerja tim untuk bulan ini dan mengirimkannya ke manajer.",
    done: true,
  },
  {
    title: "Review kode pull request",
    desc: "Melakukan code review terhadap PR dari anggota tim untuk fitur autentikasi.",
    done: false,
  },
  {
    title: "Update dokumentasi API",
    desc: "Memperbarui dokumentasi Swagger/OpenAPI untuk endpoint yang baru ditambahkan.",
    done: false,
  },
  {
    title: "Setup lingkungan development",
    desc: "Instalasi Docker dan konfigurasi environment variables untuk proyek baru.",
    done: true,
  },
  {
    title: "Meeting dengan klien",
    desc: "Presentasi progress proyek dan diskusi kebutuhan fitur tambahan bersama klien.",
    done: true,
  },
  {
    title: "Perbaiki bug login",
    desc: "Investigasi dan memperbaiki bug yang menyebabkan token JWT kadaluarsa terlalu cepat.",
    done: false,
  },
  {
    title: "Implementasi fitur notifikasi",
    desc: "Membuat sistem notifikasi real-time menggunakan WebSocket untuk dashboard admin.",
    done: false,
  },
  {
    title: "Optimasi query database",
    desc: "Menganalisis dan mengoptimalkan query yang lambat menggunakan indexing yang tepat.",
    done: false,
  },
  {
    title: "Deploy ke staging server",
    desc: "Melakukan deployment versi terbaru aplikasi ke environment staging untuk QA testing.",
    done: true,
  },
  {
    title: "Tulis unit test",
    desc: "Membuat unit test untuk service layer dengan coverage minimal 80%.",
    done: false,
  },
  {
    title: "Rapat perencanaan sprint",
    desc: "Memimpin sprint planning meeting dan mendistribusikan task kepada anggota tim.",
    done: true,
  },
  {
    title: "Upgrade versi Node.js",
    desc: "Memperbarui versi Node.js dari v18 ke v20 LTS pada semua environment.",
    done: false,
  },
  {
    title: "Desain skema database baru",
    desc: "Merancang schema untuk modul manajemen inventaris dengan relasi yang proper.",
    done: false,
  },
  {
    title: "Setup CI/CD pipeline",
    desc: "Konfigurasi GitHub Actions untuk otomatisasi build, test, dan deployment.",
    done: true,
  },
  {
    title: "Refactor kode autentikasi",
    desc: "Memisahkan logic autentikasi ke dalam service tersendiri agar lebih modular.",
    done: false,
  },
  {
    title: "Buat endpoint export CSV",
    desc: "Menambahkan endpoint untuk mengekspor data laporan dalam format CSV dan Excel.",
    done: false,
  },
  {
    title: "Audit keamanan aplikasi",
    desc: "Melakukan security audit untuk mengidentifikasi potensi celah keamanan pada API.",
    done: false,
  },
  {
    title: "Integrasi payment gateway",
    desc: "Mengintegrasikan Midtrans payment gateway untuk fitur transaksi di aplikasi.",
    done: false,
  },
  {
    title: "Bersihkan data produksi lama",
    desc: "Menghapus data log dan cache yang sudah lebih dari 90 hari dari database produksi.",
    done: true,
  },
  {
    title: "Buat halaman landing page",
    desc: "Merancang dan mengembangkan landing page produk dengan animasi dan desain modern.",
    done: false,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.todo.deleteMany();
  console.log("🗑️  Cleared existing todos");

  // Seed todos
  const result = await prisma.todo.createMany({
    data: todos,
  });

  console.log(`✅ Successfully seeded ${result.count} todos`);
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
