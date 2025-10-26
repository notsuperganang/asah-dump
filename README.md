# asah-dump

Kumpulan proyek latihan (dump) selama mengikuti Program ASAH yang dipimpin oleh Dicoding bekerja sama dengan Accenture.

> ASAH (Accenture x Dicoding) adalah program Studi Independen Bersertifikat — Kampus Berdampak Mandiri untuk mencetak tech talent masa depan. Batch ini berlangsung pada semester ganjil (Juli–Desember 2025) dengan total 2.000 peserta pada tiga paket pelatihan.

Repo ini berisi artefak belajar, eksperimen, dan submission saya pada learning path:

- React + Backend with AI

## Isi Repo (ringkas)

- `belajar-backend-pemula-dengan-javaScript/` — Bookshelf API (Express). Fokus pada dasar HTTP server, routing, validasi sederhana, dan in-memory data.
- `belajar-fundamental-backend-dengan-javaScript/` — OpenMusic API (Express + PostgreSQL). Fokus pada arsitektur service/handler, migrasi DB (node-pg-migrate), validasi, error handling, dan query pencarian.
- `belajar-membuat-aplikasi-web-dengan-react/` — Catatan/Notes App (React) dan praktik komponen, state, dan interaksi dasar.
- `belajar-fundamental-aplikasi-web-dengan-react/` — Submission dengan React + Vite, struktur komponen, hooks, dan utilitas.
- `belajar-membuat-frontend-web-untuk-pemula/` — Proyek frontend dasar (HTML/CSS/JS) untuk penguatan fundamental.
- `dasar-javascript-submission/` — Latihan dasar JavaScript (style, test, OOP, recursion, coverage, dsb.).
- `capstone/` — Catatan ide dan dokumen awal capstone (jika ada).

> Catatan: Struktur bisa bertambah/berkurang seiring progres pembelajaran.

## Quick Start

Kebutuhan umum:
- Node.js LTS (18+ disarankan)
- npm
- (Opsional) PostgreSQL untuk proyek backend yang membutuhkan DB

### 1) Bookshelf API (Pemula Backend)

Folder: `belajar-backend-pemula-dengan-javaScript/`

Langkah singkat:

```bash
cd belajar-backend-pemula-dengan-javaScript
npm install
npm run start
# atau development
npm run start-dev
```

Default: berjalan di `http://localhost:9000`.

Fitur ringkas:
- CRUD buku (in-memory)
- Query filter: `?name=`, `?reading=0|1`, `?finished=0|1`

### 2) OpenMusic API (Fundamental Backend)

Folder: `belajar-fundamental-backend-dengan-javaScript/`

Kebutuhan tambahan:
- PostgreSQL aktif dan kredensial tersedia

Langkah singkat:

```bash
cd belajar-fundamental-backend-dengan-javaScript
cp .env.example .env  # perbarui sesuai kredensial Anda
npm install
npm run migrate up     # menjalankan migrasi tabel
npm run start          # atau npm run start-dev
```

Default: berjalan di `http://localhost:5000`.

Fitur ringkas:
- Albums API: POST/GET(by id)/PUT/DELETE
- Songs API: POST/GET/GET(by id)/PUT/DELETE
- Detail album menampilkan daftar lagu
- Query pencarian lagu: `?title=...&performer=...`
- Validasi payload dan penanganan error (400/404/500)

## Standar Kode

- ESLint dengan Airbnb Base di setiap proyek JS/TS yang relevan
- Upaya menjaga kode bersih: hapus import/kode tak terpakai, pisah handler/service, dan gunakan utilitas terpisah untuk koneksi DB

## Tujuan Pembelajaran (High-level)

- Backend
  - HTTP server dengan Express
  - Arsitektur handler/service/routes
  - Validasi data dan error handling
  - Persistence dengan PostgreSQL + migrasi (node-pg-migrate)
- Frontend (React)
  - Komponen, state management ringan, hooks
  - Struktur proyek dengan Vite
- AI (sepanjang path)
  - Eksperimen integrasi/automasi ringan (mis. tooling, linting, testing asistif)

## Timeline Program

- Periode: Juli – Desember 2025 (Semester Ganjil)
- Provider: Dicoding x Accenture
- Skema: Studi Independen Bersertifikat — Kampus Berdampak Mandiri

## Catatan & Tips

- Untuk proyek DB, jalankan migrasi sebelum menjalankan server (`npm run migrate up`).
- Simpan kredensial pada `.env` (jangan commit `.env`). Gunakan `.env.example` sebagai referensi.
- Jika terjadi error hak akses saat migrasi, pastikan user DB punya privilege pada schema `public` atau gunakan user yang sesuai.

## Lisensi

Proyek pada repo ini ditujukan untuk keperluan pembelajaran. Hak cipta materi pihak ketiga mengikuti ketentuan masing-masing.
