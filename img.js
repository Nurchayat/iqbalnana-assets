document.addEventListener("DOMContentLoaded", function () {
  const postTitle = document.title;
  document.querySelectorAll(".post-body img").forEach(function (img, i) {
    // Tambah alt
    if (!img.hasAttribute("alt") || img.alt.trim() === "") {
      img.alt = postTitle + " - Gambar " + (i + 1);
    }
    // Kompresi ukuran
    if (img.src.includes('1.bp.blogspot.com') || img.src.includes('blogspot.com')) {
      img.src = img.src.replace(/s[0-9]+(-c)?/, 's480');
    }
    // Lazyload
    img.loading = "lazy";
  });
});