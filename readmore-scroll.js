document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".post-body");
  if (!container) return;

  const fullHTML = container.innerHTML;
  const limit = 700; // jumlah karakter awal yang ditampilkan

  if (fullHTML.length > limit) {
    const awal = fullHTML.slice(0, limit);
    const lanjut = fullHTML.slice(limit);

    container.innerHTML = `
      <div id="artikelAwal">${awal}</div>
      <div id="artikelLanjut" style="display:none;">${lanjut}</div>
      <div id="loadingScroll" style="text-align:center;padding:10px;color:#777;">Memuat konten...</div>
    `;

    let sudahMuncul = false;
    window.addEventListener("scroll", function () {
      const pos = container.getBoundingClientRect().bottom - window.innerHeight;
      if (pos < 50 && !sudahMuncul) {
        document.getElementById("loadingScroll").innerText = "Menampilkan selengkapnya...";
        setTimeout(() => {
          document.getElementById("artikelLanjut").style.display = "inline";
          document.getElementById("loadingScroll").style.display = "none";
        }, 1000);
        sudahMuncul = true;
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const konten = document.querySelector(".post-body");
  if (!konten) return;

  const teks = konten.innerHTML;
  const batas = 800; // Jumlah karakter awal ditampilkan

  // Jika isi cukup panjang, pisahkan
  if (teks.length > batas) {
    const potong = teks.substring(0, batas);
    const sisanya = teks.substring(batas);

    konten.innerHTML = `
      <div class="konten-awal">${potong}</div>
      <div class="konten-lanjutan" style="display:none;">${sisanya}</div>
      <div class="loading-baca" style="text-align:center;color:#999;padding:10px;">📖 Menampilkan konten...</div>
    `;

    let sudah = false;
    window.addEventListener("scroll", function () {
      const posisi = konten.getBoundingClientRect().bottom - window.innerHeight;
      if (posisi < 100 && !sudah) {
        document.querySelector(".konten-lanjutan").style.display = "inline";
        document.querySelector(".loading-baca").style.display = "none";
        sudah = true;
      }
    });
  }
});

