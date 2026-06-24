# Portofolio Elektronika

Website portofolio personal — vanilla HTML, CSS, dan JavaScript. Konten (nama, skill, proyek, pendidikan) diatur lewat satu file `data.json` agar mudah diedit tanpa menyentuh kode.

## Struktur Folder

```
portfolio/
├── index.html          ← halaman utama
├── data.json           ← SEMUA isi teks/konten ada di sini
├── css/
│   └── style.css       ← semua styling
├── js/
│   └── main.js          ← logic render data + interaksi (navbar, scroll reveal, skill bar)
├── images/
│   ├── profile-placeholder.svg
│   ├── project-1-placeholder.svg
│   ├── project-2-placeholder.svg
│   └── project-3-placeholder.svg
└── documents/
    └── CV-placeholder.pdf
```

## Cara Edit Konten (Tanpa Coding)

Buka `data.json`, lalu ubah bagian yang kamu mau:

- **profile** → nama, jabatan, tagline, deskripsi "tentang saya", email, telepon, lokasi, link sosial media, dan path foto/CV.
- **skills** → daftar skill. `level` adalah persentase (0–100), `category` bisa `hardware`, `software`, atau `concept` (menentukan warna bar).
- **projects** → daftar proyek. `image` mengarah ke file di folder `images/`.
- **education** → riwayat pendidikan.
- **certificates** → daftar sertifikat.

Setelah disimpan, refresh browser — semua otomatis berubah karena dibaca lewat JavaScript.

## Cara Ganti Foto Profil & Gambar Proyek

1. Simpan foto kamu ke folder `images/` (format `.jpg`, `.png`, atau `.webp`).
2. Buka `data.json`, ubah nilai `"photo"` di bagian `profile` dan `"image"` di setiap project agar menunjuk ke nama file barumu.

Contoh:
```json
"photo": "images/foto-saya.jpg"
```

## Cara Ganti CV

1. Simpan file CV asli (PDF) ke folder `documents/`, misal `documents/CV-Nama-Kamu.pdf`.
2. Di `data.json`, ubah `"cv"` di bagian `profile`:
```json
"cv": "documents/CV-Nama-Kamu.pdf"
```

## Cara Menjalankan di Komputer

Karena halaman ini memuat `data.json` lewat `fetch()`, kamu **tidak bisa** sekadar membuka `index.html` langsung dengan double-click (akan kena error CORS di beberapa browser). Jalankan lewat server lokal sederhana:

**Opsi 1 — Python** (sudah terinstall di kebanyakan sistem):
```bash
cd portfolio
python3 -m http.server 8000
```
Lalu buka `http://localhost:8000` di browser.

**Opsi 2 — VS Code Live Server**
Install extension "Live Server", klik kanan pada `index.html` → "Open with Live Server".

## Cara Deploy (Online, Gratis)

Paling mudah pakai **GitHub Pages** atau **Netlify**:

1. **GitHub Pages**: upload semua file ke repo GitHub → Settings → Pages → pilih branch `main` → situs aktif di `https://username.github.io/nama-repo`.
2. **Netlify**: buka netlify.com → drag & drop folder `portfolio` ke halaman deploy → langsung online.

## Kustomisasi Warna

Semua warna diatur lewat CSS variables di awal `css/style.css` (bagian `:root`). Ubah nilai hex di sana untuk mengganti tema warna secara keseluruhan.

```css
--circuit-blue: #5B6FE8;   /* warna utama / aksen biru */
--led-pink: #FF8FA3;       /* aksen pink */
--led-green: #4FD89B;      /* aksen hijau / status */
```

## Menambah Bagian Baru

Untuk menambah section baru (misalnya "Testimoni"), salin pola yang sama dengan section lain di `index.html`: buat elemen `<section id="...">`, tambahkan styling di `style.css`, dan jika datanya dinamis, tambahkan array baru di `data.json` lalu fungsi render baru di `main.js`.
