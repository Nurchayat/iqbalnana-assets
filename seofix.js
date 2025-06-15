document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a").forEach(function (a, i) {
    // Tambahkan title hanya jika target kosong
    if (!a.title || a.title.trim() === "") {
      if (a.textContent.trim() !== "") {
        a.title = "Link ke: " + a.textContent.trim();
      } else if (a.href) {
        a.title = "Buka tautan: " + a.href;
      }
    }
  });
});
