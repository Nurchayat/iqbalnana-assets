<script type='text/javascript'>
//<![CDATA[
/**
 * ==================================================================================
 * Skrip Final Gabungan untuk Tema Blogger Iqbalnana (v3)
 * ==================================================================================
 * Berkas ini berisi semua fungsionalitas JavaScript yang diperlukan, termasuk:
 * - Logika Homepage Kustom untuk label "Dongeng Anak".
 * - Fungsi UI Tema (Menu, Pencarian, Back-to-Top).
 * - Utilitas SEO & Gambar.
 *
 * Ini adalah satu-satunya file skrip utama yang perlu Anda muat.
 * ==================================================================================
 */

// Fungsi pembantu untuk memastikan jQuery dimuat sebelum fungsi lain dijalankan
function runWhenJQueryIsReady(callback) {
    if (window.jQuery) {
        callback(window.jQuery);
    } else {
        setTimeout(function() {
            runWhenJQueryIsReady(callback);
        }, 100);
    }
}

// 1. ===============================================================================
//    Logika Homepage Kustom untuk Label "Dongeng Anak"
// ==================================================================================
function initializeHomepageDongeng() {
    // Hanya jalankan skrip ini di halaman utama
    if (document.body.classList.contains('home')) {
        
        const config = {
            label: "Dongeng Anak",
            postsPerPage: 6, // Anda bisa mengubah jumlah postingan per halaman di sini
            containerId: "dongeng-homepage-container",
            noImage: "https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/s1600/nth.png",
            summaryLength: 150, // Panjang ringkasan
            pagerText: {
                newer: '‹ Halaman Baru',
                older: 'Halaman Lama ›'
            }
        };

        const container = document.getElementById(config.containerId);
        if (!container) {
            console.error(`Error: Container dengan ID #${config.containerId} tidak ditemukan.`);
            return;
        }

        function getPageParam() {
            const urlParams = new URLSearchParams(window.location.search);
            return parseInt(urlParams.get('page') || '1', 10);
        }

        function renderPagination(totalPosts, currentPage) {
            const totalPages = Math.ceil(totalPosts / config.postsPerPage);
            if (totalPages <= 1) return '';

            let paginationHtml = '<div class="blog-pager" id="blog-pager">';
            if (currentPage > 1) {
                const prevPageUrl = (currentPage === 2) ? '/' : `/?page=${currentPage - 1}`;
                paginationHtml += `<a class="blog-pager-newer-link" href="${prevPageUrl}">${config.pagerText.newer}</a>`;
            }
            if (currentPage < totalPages) {
                paginationHtml += `<a class="blog-pager-older-link" href="/?page=${currentPage + 1}">${config.pagerText.older}</a>`;
            }
            paginationHtml += '</div>';
            return paginationHtml;
        }

        function renderPosts(json) {
            if (!json.feed || !json.feed.entry || json.feed.entry.length === 0) {
                container.innerHTML = "<p style='text-align:center;'>Tidak ada dongeng untuk ditampilkan.</p>";
                return;
            }

            const totalPosts = parseInt(json.feed.openSearch$totalResults.$t, 10);
            const currentPage = getPageParam();
            
            let postsHtml = '<div class="index-post-wrap">';
            
            json.feed.entry.forEach(entry => {
                const post = {
                    title: entry.title.$t,
                    url: (entry.link.find(link => link.rel === 'alternate') || {}).href,
                    snippet: ('summary' in entry) ? entry.summary.$t.substring(0, config.summaryLength).replace(/<br ?\/?>/g, " ") + '...' : '',
                    image: ('media$thumbnail' in entry) ? entry.media$thumbnail.url.replace(/\/s\d+(-c)?\//, '/s320-c/') : config.noImage
                };

                postsHtml += `
                    <div class="index-post">
                        <div class="post-image-wrap">
                            <a class="post-image-link" href="${post.url}" title="${post.title}">
                                <img class="post-thumb" src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='${config.noImage}';"/>
                            </a>
                            <h2 class="post-title">
                                <a href="${post.url}">${post.title}</a>
                            </h2>
                        </div>
                    </div>
                `;
            });
            
            postsHtml += '</div>';
            const paginationHtml = renderPagination(totalPosts, currentPage);
            container.innerHTML = postsHtml + paginationHtml;
        }

        function loadDongengPosts() {
            const page = getPageParam();
            const startIndex = (page - 1) * config.postsPerPage + 1;
            const feedUrl = `/feeds/posts/default/-/${encodeURIComponent(config.label)}?alt=json-in-script&start-index=${startIndex}&max-results=${config.postsPerPage}&callback=dongengCallback`;
            
            window.dongengCallback = function(json) {
                renderPosts(json);
                const scriptTag = document.getElementById('dongeng-feed-script');
                if (scriptTag) scriptTag.parentNode.removeChild(scriptTag);
                delete window.dongengCallback;
            };

            const script = document.createElement('script');
            script.id = 'dongeng-feed-script';
            script.src = feedUrl;
            document.head.appendChild(script);
        }

        loadDongengPosts();
    }
}

// 2. ===============================================================================
//    Fungsi UI Tema (Menu, Pencarian, Back to Top)
// ==================================================================================
function initializeThemeUI($) {
    // Menu Mobile
    $('.mobile-menu-toggle').on('click', function(e) { e.preventDefault(); $('body').toggleClass('nav-active'); $('.overlay').fadeToggle('fast'); });
    $('.overlay').on('click', function() { $('body').removeClass('nav-active'); $(this).fadeOut('fast'); });
    $('.mobile-menu .m-sub').hide();
    $('.mobile-menu .has-sub > a').on('click', function(e) { e.preventDefault(); $(this).parent().toggleClass('show'); $(this).next('.m-sub').slideToggle('fast'); });
    
    // Navigasi Pencarian
    $('.show-search').on('click', function(e) { e.preventDefault(); $('body').toggleClass('search-active'); $('#nav-search').fadeToggle('fast'); });
    
    // Tombol Back to Top
    $(window).on('scroll', function() { if ($(this).scrollTop() > 100) { $('.back-top').fadeIn('fast'); } else { $('.back-top').fadeOut('fast'); } });
    $('.back-top').on('click', function() { $('html, body').animate({ scrollTop: 0 }, 800); return false; });
}

// 3. ===============================================================================
//    Skrip Utilitas SEO & Gambar
// ==================================================================================
function initializeUtilities() {
    // SEO: Tambahkan title ke link
    document.querySelectorAll("a").forEach(function (a) {
        if (!a.title || a.title.trim() === "") {
            if (a.textContent.trim() !== "") { a.title = "Link ke: " + a.textContent.trim(); } 
            else if (a.href) { a.title = "Buka tautan: " + a.href; }
        }
    });

    // SEO: Tambahkan noopener noreferrer ke link target _blank
    document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
        let relVal = a.getAttribute("rel") || "";
        if (!relVal.includes("noopener")) { relVal += " noopener"; }
        if (!relVal.includes("noreferrer")) { relVal += " noreferrer"; }
        a.setAttribute("rel", relVal.trim());
    });

    // Optimasi Gambar: Alt, kompresi, lazyload, dimensi
    const postTitle = document.title;
    document.querySelectorAll(".post-body img").forEach(function (img, i) {
        if (!img.hasAttribute("alt") || img.alt.trim() === "") {
            img.alt = postTitle + " - Gambar " + (i + 1);
        }
        if (img.src.includes('1.bp.blogspot.com') || img.src.includes('blogspot.com')) {
            img.src = img.src.replace(/s[0-9]+(-c)?/, 's480');
        }
        img.loading = "lazy";
        if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
            const tempImg = new Image();
            tempImg.src = img.src;
            tempImg.onload = function () {
                if (!img.hasAttribute("width")) img.width = this.naturalWidth;
                if (!img.hasAttribute("height")) img.height = this.naturalHeight;
            };
        }
    });

    // Gambar Random untuk postingan tanpa gambar
    const isiPost = document.querySelector('.post-body');
    if (isiPost && isiPost.querySelectorAll('img').length === 0) {
        const images = ["https://nurchayat.github.io/iqna/random%20(1).webp","https://nurchayat.github.io/iqna/random%20(2).webp","https://nurchayat.github.io/iqna/random%20(3).webp","https://nurchayat.github.io/iqna/random%20(4).webp","https://nurchayat.github.io/iqna/random%20(5).webp","https://nurchayat.github.io/iqna/random%20(6).webp","https://nurchayat.github.io/iqna/random%20(7).webp","https://nurchayat.github.io/iqna/random%20(8).webp","https://nurchayat.github.io/iqna/random%20(9).webp","https://nurchayat.github.io/iqna/random%20(10).webp","https://nurchayat.github.io/iqna/random%20(11).webp","https://nurchayat.github.io/iqna/random%20(12).webp","https://nurchayat.github.io/iqna/random%20(13).webp","https://nurchayat.github.io/iqna/random%20(14).webp","https://nurchayat.github.io/iqna/random%20(15).webp","https://nurchayat.github.io/iqna/random%20(16).webp","https://nurchayat.github.io/iqna/random%20(17).webp","https://nurchayat.github.io/iqna/random%20(18).webp","https://nurchayat.github.io/iqna/random%20(19).webp","https://nurchayat.github.io/iqna/random%20(20).webp","https://nurchayat.github.io/iqna/random%20(21).webp","https://nurchayat.github.io/iqna/random%20(22).webp","https://nurchayat.github.io/iqna/random%20(23).webp","https://nurchayat.github.io/iqna/random%20(24).webp","https://nurchayat.github.io/iqna/random%20(25).webp","https://nurchayat.github.io/iqna/random%20(26).webp","https://nurchayat.github.io/iqna/random%20(27).webp","https://nurchayat.github.io/iqna/random%20(28).webp","https://nurchayat.github.io/iqna/random%20(29).webp","https://nurchayat.github.io/iqna/random%20(30).webp","https://nurchayat.github.io/iqna/random%20(31).webp"];
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex];
        const imgEl = document.createElement('img');
        imgEl.src = randomImage;
        imgEl.alt = "Ilustrasi random";
        imgEl.loading = "lazy";
        imgEl.style.cssText = "max-width:100%; display:block; margin-bottom:1rem;";
        isiPost.insertBefore(imgEl, isiPost.firstChild);
    }
}

// 4. ===============================================================================
//    Inisialisasi Utama
// ==================================================================================
document.addEventListener("DOMContentLoaded", function () {
    // Jalankan skrip yang tidak butuh jQuery
    initializeHomepageDongeng();
    initializeUtilities();
    
    // Jalankan skrip yang butuh jQuery setelah jQuery siap
    runWhenJQueryIsReady(function($) {
        initializeThemeUI($);
    });
});
//]]>
</script>
