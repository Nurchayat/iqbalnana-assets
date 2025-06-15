document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    if (!a.hasAttribute("rel")) {
      a.setAttribute("rel", "noopener noreferrer");
    } else {
      // Tambahkan jika belum ada
      const relVal = a.getAttribute("rel");
      if (!relVal.includes("noopener")) {
        a.setAttribute("rel", relVal + " noopener");
      }
      if (!relVal.includes("noreferrer")) {
        a.setAttribute("rel", relVal + " noreferrer");
      }
    }
  });
});
