/* ==========================================================
   GALAXY NOVA — script.js
   Semua interaksi website ada di file ini:
     1. Data produk (edit di sini untuk ganti produk/harga/gambar)
     2. Fungsi bantu
     3. Navbar
     4. Menu hamburger
     5. Notifikasi kecil (toast)
     6. Efek ripple pada tombol
     7. Transisi antar halaman
     8. Animasi muncul saat di-scroll
     9. Video hero
    10. Halaman Products (render, filter, detail)
    11. Validasi form kontak
   ========================================================== */

"use strict";

/* ---------- 1. DATA PRODUK ----------
   Ganti "image" dengan foto Anda, misalnya
   "assets/images/products/galaxy-s26-ultra.jpg".
   Ganti "price" dengan angka jika ingin menampilkan harga. */
const PRODUCTS = [
  {
    id: "galaxy-s26-ultra",
    name: "Galaxy S26 Ultra",
    image: "assets/images/products/galaxy-s26-ultra.jpg",
    categories: ["galaxys", "ultra"],
    description: "Flagship seri Ultra dengan deretan kamera, layar luas, dan S Pen.",
    price: "Check Price",
  },
  {
    id: "galaxy-s26",
    name: "Galaxy S26",
    image: "assets/images/products/galaxy-s26.jpg",
    categories: ["galaxys"],
    description: "Ponsel flagship ringkas dengan Galaxy AI untuk dipakai seharian.",
    price: "Check Price",
  },
  {
    id: "galaxy-z-fold8",
    name: "Galaxy Z Fold8 / Flip8",
    image: "assets/images/products/galaxy-z-fold8.jpg",
    categories: ["foldable"],
    description: "Seri lipat terbaru: Fold8, Fold8 Ultra, dan Flip8.",
    price: "Check Price",
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    image: "assets/images/products/galaxy-s25-ultra.jpg",
    categories: ["galaxys", "ultra"],
    description: "Seri Ultra generasi sebelumnya dengan bodi ramping dan S Pen.",
    price: "Check Price",
  },
  {
    id: "galaxy-s24",
    name: "Galaxy S24",
    image: "assets/images/products/galaxy-s24.jpg",
    categories: ["galaxys"],
    description: "Seri S yang memperkenalkan Galaxy AI untuk pemakaian sehari-hari.",
    price: "Check Price",
  },
];

const CATEGORY_LABELS = {
  galaxys: "Galaxy S",
  ultra: "Seri Ultra",
  foldable: "Lipat (Z Series)",
};


/* ---------- 2. FUNGSI BANTU ---------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// True jika pengguna meminta animasi dikurangi di perangkatnya
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ---------- 3. NAVBAR ----------
   Di halaman Home navbar transparan, lalu hitam solid setelah di-scroll.
   Di halaman lain navbar langsung hitam solid. */
const nav = $("#nav");
const isHomePage = document.body.classList.contains("is-home");

function updateNavbar() {
  const shouldBeSolid = !isHomePage || window.scrollY > 40;
  nav.classList.toggle("is-solid", shouldBeSolid);
}

updateNavbar();
addEventListener("scroll", updateNavbar, { passive: true });


/* ---------- 4. MENU HAMBURGER (HP) ---------- */
const burger = $("#burger");
const menu = $("#menu");

function setMenuOpen(isOpen) {
  burger.setAttribute("aria-expanded", isOpen);
  burger.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  menu.classList.toggle("open", isOpen);
  nav.classList.toggle("menu-open", isOpen);
}

burger.addEventListener("click", () => {
  const isOpen = burger.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

// Tekan Escape untuk menutup menu
addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});


/* ---------- 5. TOAST (NOTIFIKASI KECIL) ---------- */
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("on"), 2200);
}

// Tombol dengan atribut data-toast menampilkan pesannya saat diklik
$$("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});


/* ---------- 6. EFEK RIPPLE PADA TOMBOL ---------- */
document.addEventListener("click", (event) => {
  const button = event.target.closest(".btn");
  if (!button || prefersReducedMotion) return;

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");

  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

  button.append(ripple);
  setTimeout(() => ripple.remove(), 600);
});


/* ---------- 7. TRANSISI ANTAR HALAMAN ----------
   Halaman memudar dulu sebelum berpindah ke halaman berikutnya. */
$$("a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  const isInternalPage =
    href && !href.startsWith("#") && !/^(https?:|mailto:)/.test(href) && !link.target;
  if (!isInternalPage) return;

  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || prefersReducedMotion) return;
    event.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => (location.href = href), 300);
  });
});

// Saat pengguna menekan tombol Back, pastikan halaman terlihat lagi
addEventListener("pageshow", () => document.body.classList.remove("leaving"));


/* ---------- 8. ANIMASI MUNCUL SAAT DI-SCROLL ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

$$(".rv").forEach((element) => revealObserver.observe(element));


/* ---------- 9. VIDEO HERO ----------
   Jika file video belum ada, video dihapus dan gambar fallback tampil. */
const heroVideo = $(".hero__video");

if (heroVideo) {
  const removeVideo = () => heroVideo.remove();

  heroVideo.addEventListener("error", removeVideo, true);
  $$("source", heroVideo).forEach((source) => {
    source.addEventListener("error", () => {
      if (!heroVideo.currentSrc) removeVideo();
    });
  });

  if (heroVideo.play) heroVideo.play().catch(() => {});
}


/* ---------- 10. HALAMAN PRODUCTS ---------- */
const cardGrid = $("#cards");

if (cardGrid) {
  const detailDialog = $("#dlg");

  // 10a. Buat kartu produk dari data PRODUCTS
  cardGrid.innerHTML = PRODUCTS.map(
    (product) => `
      <article class="card" data-cats="${product.categories.join(" ")}">
        <div class="card__im">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="card__b">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <span class="price">${product.price}</span>
          <button class="btn btn--red" data-id="${product.id}">View Details</button>
        </div>
      </article>`
  ).join("");

  // 10b. Filter kategori
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      let visibleCount = 0;

      $$(".chip").forEach((other) => other.classList.toggle("is-on", other === chip));

      $$(".card").forEach((card) => {
        const matches =
          chip.dataset.f === "all" || card.dataset.cats.split(" ").includes(chip.dataset.f);
        card.classList.toggle("out", !matches);
        if (matches) visibleCount++;
      });

      $("#empty").hidden = visibleCount > 0;
    });
  });

  // 10c. Detail produk (jendela pop-up)
  cardGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-id]");
    if (!button) return;

    const product = PRODUCTS.find((item) => item.id === button.dataset.id);
    const categoryList = product.categories
      .map((category) => `<li>${CATEGORY_LABELS[category]}</li>`)
      .join("");

    $("#dlgc").innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <ul>${categoryList}</ul>
        <p>Harga: ${product.price}. Spesifikasi lengkap dan harga terbaru: cek di situs resmi Samsung.</p>
      </div>`;

    detailDialog.showModal();
  });

  $("#dlgx").addEventListener("click", () => detailDialog.close());

  // Klik area gelap di luar kotak juga menutup jendela
  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) detailDialog.close();
  });
}


/* ---------- 11. VALIDASI FORM KONTAK ----------
   Catatan: belum ada backend, jadi pesan TIDAK dikirim ke server. */
const contactForm = $("#form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = contactForm.elements;
    let isValid = true;

    // Tampilkan atau hapus pesan error di bawah sebuah field
    function setError(field, message) {
      field.closest("label").classList.toggle("bad", Boolean(message));
      field.nextElementSibling.textContent = message || "";
      if (message) isValid = false;
    }

    setError(
      fields.name,
      fields.name.value.trim().length < 2 ? "Isi nama minimal 2 karakter." : ""
    );
    setError(
      fields.email,
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.value)
        ? ""
        : "Masukkan email yang valid, contoh: nama@email.com."
    );
    setError(
      fields.msg,
      fields.msg.value.trim().length < 10 ? "Tulis pesan minimal 10 karakter." : ""
    );

    $("#ok").hidden = !isValid;
    if (isValid) contactForm.reset();
  });
}



/* FAIRY WAND CURSOR */
(() => {
  if (document.getElementById("fairyCursor")) return;

  const cursor = document.createElement("div");
  cursor.id = "fairyCursor";
  cursor.className = "fairy-cursor";
  document.body.appendChild(cursor);

  let lastTime = 0;
  let lastX = null;
  let lastY = null;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";


if (lastX !== null && lastY !== null) {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const distance = Math.hypot(dx, dy);

  if (distance > 3) {
    const line = document.createElement("div");
    line.className = "fairy-line";

    line.style.left = lastX + "px";
    line.style.top = lastY + "px";
    line.style.width = Math.min(distance, 45) + "px";
    line.style.transform =
      `translateY(-50%) rotate(${Math.atan2(dy, dx)}rad)`;

    document.body.appendChild(line);
    setTimeout(() => line.remove(), 450);
  }
}

lastX = e.clientX;
lastY = e.clientY;


    const now = Date.now();
    if (now - lastTime < 45) return;
    lastTime = now;

    const sparkle = document.createElement("span");
    sparkle.className = "fairy-sparkle";
    sparkle.textContent =
      Math.random() > 0.5 ? "✦" : "✧";

    sparkle.style.left =
      (e.clientX + (Math.random() - 0.5) * 20) + "px";
    sparkle.style.top =
      (e.clientY + (Math.random() - 0.5) * 20) + "px";

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 700);
  });
})();


(() => {
  const intro = document.getElementById("novaIntro");
  const enterButton = document.getElementById("enterGalaxy");

  if (!intro || !enterButton) return;

  enterButton.addEventListener("click", () => {
    intro.classList.add("is-hidden");
  });
})();


