# GALAXY NOVA — Smartphone Experience

Website multi-halaman (HTML, CSS, JavaScript vanilla) bertema ponsel Samsung Galaxy dengan nuansa biru-ungu lembut.
Struktur kode dan tata letak sama dengan versi sebelumnya; yang berubah hanya teks, gambar, dan warna tema.

## Struktur folder
```
GALAXY-NOVA/
├── index.html          Home
├── products.html       Products
├── technology.html     Technology
├── about.html          About Galaxy
├── contact.html        Contact
├── style.css           Semua styling (variabel warna di bagian atas)
├── script.js           Semua interaksi + data produk
└── assets/
    ├── images/
    │   ├── products/   Foto produk (JPG)
    │   ├── hero/       Gambar hero
    │   ├── about/      Foto halaman About
    │   ├── technology/ Foto halaman Technology
    │   ├── gallery/    Foto galeri
    │   └── icons/      Favicon
    └── videos/         (opsional) hero.mp4 / hero.webm
```

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka folder di Visual Studio Code (File > Open Folder).
3. Pasang ekstensi **Live Server**, klik kanan `index.html` > **Open with Live Server**.

## Mengubah warna
Edit variabel di bagian atas `style.css` (`--red` = aksen ungu-biru, `--red2` = aksen biru muda, `--ink`/`--panel` = latar).

## Mengganti gambar produk
1. Salin foto ke `assets/images/products/`.
2. Di `script.js`, ubah `image` pada produk terkait.

## Mengganti video hero
Taruh video milik/berlisensi di `assets/videos/hero.mp4`. Tanpa video, hero memakai `assets/images/hero/hero-galaxy.jpg`.

## Catatan jujur
- Semua foto berasal dari file yang Anda unggah. Hak cipta ada pada Samsung/pemilik masing-masing. Pastikan Anda berhak memakainya sebelum situs dipublikasikan.
- Foto di halaman About (tangan memegang ponsel) beresolusi kecil aslinya, sehingga diperbesar dan bisa terlihat kurang tajam. Ganti dengan foto beresolusi lebih tinggi jika ada.
- Foto hero (tiga ponsel Galaxy S23) disesuaikan latarnya agar menyatu dengan warna tema.
- Spesifikasi sengaja tidak ditulis rinci; cek situs resmi Samsung untuk angka akurat.
- Proyek ini tidak berafiliasi dengan Samsung. Logo resmi Samsung tidak dipakai sebagai logo situs.
- Form kontak hanya validasi di browser, tidak mengirim ke server.
- Font memakai Google Fonts (perlu internet); offline akan memakai font sistem.
