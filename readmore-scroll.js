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

