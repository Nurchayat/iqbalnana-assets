document.addEventListener("DOMContentLoaded", function () {
  const postTitle = document.title;
  document.querySelectorAll(".post-body img").forEach(function (img, i) {
    // ALT otomatis
    if (!img.hasAttribute("alt") || img.alt.trim() === "") {
      img.alt = postTitle + " - Gambar " + (i + 1);
    }

    // Kompres gambar Blogger
    if (img.src.includes('1.bp.blogspot.com') || img.src.includes('blogspot.com')) {
      img.src = img.src.replace(/s[0-9]+(-c)?/, 's480');
    }

    // Lazyload
    img.loading = "lazy";

    // Tambah width & height otomatis jika belum ada
    if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
      const tempImg = new Image();
      tempImg.src = img.src;
      tempImg.onload = function () {
        img.width = this.naturalWidth;
        img.height = this.naturalHeight;
      };
    }
  });
});
