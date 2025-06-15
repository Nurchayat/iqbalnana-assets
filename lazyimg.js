document.addEventListener("DOMContentLoaded", function() {
  const isiPost = document.querySelector('.post-body');
  if (!isiPost) return;

  const hasImage = isiPost.querySelectorAll('img').length > 0;
  if (hasImage) return;

  const images = [
    "https://nurchayat.github.io/iqna/random%20(1).webp",
    "https://nurchayat.github.io/iqna/random%20(2).webp",
    "https://nurchayat.github.io/iqna/random%20(3).webp",
"https://nurchayat.github.io/iqna/random%20(4).webp",
    "https://nurchayat.github.io/iqna/random%20(5).webp",
    "https://nurchayat.github.io/iqna/random%20(6).webp",
"https://nurchayat.github.io/iqna/random%20(7).webp",
    "https://nurchayat.github.io/iqna/random%20(8).webp",
    "https://nurchayat.github.io/iqna/random%20(9).webp",
"https://nurchayat.github.io/iqna/random%20(10).webp",
    "https://nurchayat.github.io/iqna/random%20(11).webp",
    "https://nurchayat.github.io/iqna/random%20(12).webp",
"https://nurchayat.github.io/iqna/random%20(13).webp",
    "https://nurchayat.github.io/iqna/random%20(14).webp",
    "https://nurchayat.github.io/iqna/random%20(15).webp",
"https://nurchayat.github.io/iqna/random%20(16).webp",
    "https://nurchayat.github.io/iqna/random%20(17).webp",
    "https://nurchayat.github.io/iqna/random%20(18).webp",
"https://nurchayat.github.io/iqna/random%20(19).webp",
    "https://nurchayat.github.io/iqna/random%20(20).webp",
    "https://nurchayat.github.io/iqna/random%20(21).webp",
"https://nurchayat.github.io/iqna/random%20(22).webp",
    "https://nurchayat.github.io/iqna/random%20(23).webp",
    "https://nurchayat.github.io/iqna/random%20(24).webp",
"https://nurchayat.github.io/iqna/random%20(25).webp",
    "https://nurchayat.github.io/iqna/random%20(26).webp",
    "https://nurchayat.github.io/iqna/random%20(27).webp",
"https://nurchayat.github.io/iqna/random%20(28).webp",
    "https://nurchayat.github.io/iqna/random%20(29).webp",
    "https://nurchayat.github.io/iqna/random%20(30).webp",
"https://nurchayat.github.io/iqna/random%20(31).webp"
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  const imgEl = document.createElement('img');
  imgEl.src = randomImage;
  imgEl.alt = "Ilustrasi otomatis";
  imgEl.loading = "lazy";
  imgEl.style.maxWidth = "100%";
  imgEl.style.display = "block";
  imgEl.style.marginBottom = "1rem";

  isiPost.insertBefore(imgEl, isiPost.firstChild);
});