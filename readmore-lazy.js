document.addEventListener("DOMContentLoaded", function () {
  const konten = document.querySelector(".post-body");
  if (!konten) return;

  const teks = konten.innerHTML;
  const batas = 800; // jumlah karakter awal yang ditampilkan

  if (teks.length > batas) {
    const potong = teks.substring(0, batas);
    const sisanya = teks.substring(batas);

    konten.innerHTML = `
      <div class="konten-awal">${potong}</div>
      <div class="konten-lanjutan" style="display:none;">${sisanya}</div>
      <div id="kontrol-baca" style="text-align:center;margin-top:20px;">
        <div class="loading-baca" style="color:#999;padding:5px;">📖 Memuat lanjutan...</div>
        <button id="btnSelengkapnya" style="display:none;padding:8px 16px;font-size:14px;background:#0055aa;color:#fff;border:none;border-radius:4px;cursor:pointer;">Baca Selengkapnya</button>
      </div>
    `;

    let sudah = false;

    // Auto tampil saat scroll
    window.addEventListener("scroll", function () {
      const posisi = konten.getBoundingClientRect().bottom - window.innerHeight;
      if (posisi < 100 && !sudah) {
        tampilkanLanjutan();
      }
    });

    // Tombol fallback
    setTimeout(() => {
      if (!sudah) {
        document.querySelector(".loading-baca").style.display = "none";
        document.getElementById("btnSelengkapnya").style.display = "inline-block";
      }
    }, 3000);

    document.getElementById("btnSelengkapnya").addEventListener("click", function () {
      tampilkanLanjutan();
    });

    function tampilkanLanjutan() {
      document.querySelector(".konten-lanjutan").style.display = "inline";
      document.getElementById("kontrol-baca").style.display = "none";
      sudah = true;
    }
  }
});
