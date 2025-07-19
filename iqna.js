/**
 * ==================================================================================
 * Skrip Gabungan untuk Tema Blogger Iqbalnana (v6 - Implementasi Prioritas Kategori)
 * ==================================================================================
 * Berkas ini berisi gabungan dari berbagai skrip fungsional yang telah dioptimalkan
 * untuk menghindari konflik dan meningkatkan performa.
 *
 * Perubahan v6:
 * - [FITUR BARU] Menambahkan daftar `preferredLabels` pada sistem Artikel Terkait.
 * - Skrip sekarang akan mencari label prioritas terlebih dahulu untuk menampilkan 
 * artikel terkait yang lebih relevan. Jika tidak ditemukan, akan kembali
 * menggunakan label pertama.
 *
 * Daftar Isi:
 * 1. Sistem Artikel Terkait (Reliable Related Posts)
 * 2. Widget Gambar Mewarnai
 * 3. Fungsi Pengatur Ukuran Font
 * 4. Fungsi Text-to-Speech (TTS)
 * 5. Fungsi UI Tema (Menu, Search, Back to Top)
 * 6. Inisialisasi Utama
 * ==================================================================================
 */

// 1. ===============================================================================
//    Sistem Artikel Terkait (Reliable Related Posts)
// ==================================================================================
const reliableRelatedPosts = {
    // --- KONFIGURASI ---
    maxPosts: 6,
    containerId: 'iqna-related-posts',
    noImage: "https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/s1600/nth.png",
    title: "<h3>Anda Mungkin Juga Suka</h3>",
    // [BARU] Tentukan daftar kategori prioritas Anda di sini, dari yang paling penting.
    preferredLabels: ["Dongeng Anak", "Cerpen Anak", "Mewarnai Gambar", "Dongeng", "Cerita Fiksi"],

    display: function(posts) {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        const postsToDisplay = posts.slice(0, this.maxPosts);
        if (postsToDisplay.length === 0) {
            container.style.display = 'none';
            return;
        }
        let html = this.title;
        html += '<div class="related-posts-grid">';
        postsToDisplay.forEach(post => {
            const image = post.image ? post.image.replace(/\/s\d+(-c)?\//, '/s320-c/') : this.noImage;
            html += `
                <a class="related-post-item" href="${post.url}" title="${post.title}">
                    <div class="related-post-thumb-container">
                        <img class="related-post-thumb" src="${image}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='${this.noImage}';"/>
                    </div>
                    <h4 class="related-post-title">${post.title}</h4>
                </a>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
        container.style.display = 'block';
    },

    init: function() {
        if (!document.body.classList.contains('item')) {
            return;
        }

        const container = document.getElementById(this.containerId);
        if (!container) return;

        const allLabelEls = document.querySelectorAll('.post-labels a');
        if (allLabelEls.length === 0) {
            console.log('Related Posts: Tidak ada label ditemukan.');
            container.style.display = 'none';
            return;
        }

        let chosenLabel = null;

        // [LOGIKA BARU] Cari label prioritas
        const postLabels = Array.from(allLabelEls).map(el => el.innerText);
        for (const preferred of this.preferredLabels) {
            if (postLabels.includes(preferred)) {
                chosenLabel = preferred;
                break;
            }
        }

        // Jika tidak ada label prioritas yang cocok, gunakan label pertama sebagai fallback
        if (!chosenLabel) {
            chosenLabel = allLabelEls[0].innerText;
        }
        
        const currentUrlEl = document.querySelector('link[rel="canonical"]');
        if (!currentUrlEl) {
            console.log('Related Posts: URL kanonis tidak ditemukan.');
            container.style.display = 'none';
            return;
        }
        const currentUrl = currentUrlEl.href;
        const feedUrl = `/feeds/posts/default/-/${encodeURIComponent(chosenLabel)}?alt=json-in-script&max-results=10`;

        const callbackName = 'iqnaRelatedCallback';
        window[callbackName] = (json) => {
            if (!json.feed || !json.feed.entry || json.feed.entry.length === 0) {
                container.style.display = 'none';
                return;
            }
            let allPosts = json.feed.entry
                .map(entry => ({
                    url: (entry.link.find(l => l.rel === 'alternate') || {}).href,
                    title: entry.title.$t,
                    image: ('media$thumbnail' in entry) ? entry.media$thumbnail.url : null
                }))
                .filter(post => post.url && post.url !== currentUrl);

            allPosts.sort(() => Math.random() - 0.5);
            this.display(allPosts);

            delete window[callbackName];
            const scriptTag = document.getElementById('related-posts-script');
            if (scriptTag) {
                scriptTag.parentNode.removeChild(scriptTag);
            }
        };

        const script = document.createElement('script');
        script.id = 'related-posts-script';
        script.src = `${feedUrl}&callback=${callbackName}`;
        document.head.appendChild(script);
    }
};


// 2. ===============================================================================
//    Widget Gambar Mewarnai
// ==================================================================================
function initializeColoringWidget() {
    if (!document.body.classList.contains('item')) {
        return;
    }
    const container = document.getElementById('coloring-widget-grid');
    if (!container) return;

    const dataSourceUrl = 'https://amp.iqbalnana.com/mewarnai/search-index.json';
    const coloringSiteBaseUrl = 'https://amp.iqbalnana.com';

    fetch(dataSourceUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil data. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !Array.isArray(data) || data.length === 0) {
                container.innerHTML = '<p>Tidak ada gambar untuk ditampilkan.</p>';
                return;
            }
            const latestImages = data.slice(0, 4);
            container.innerHTML = '';
            latestImages.forEach(image => {
                const fullUrl = coloringSiteBaseUrl + image.url;
                const fullThumbnailUrl = coloringSiteBaseUrl + image.thumbnail;
                const card = document.createElement('a');
                card.href = fullUrl;
                card.className = 'coloring-widget-card';
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
                card.title = image.title;
                card.innerHTML = `
          <img src="${fullThumbnailUrl}" alt="${image.title}" loading="lazy" />
          <div class="coloring-widget-card-title">${image.title}</div>
        `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error memuat widget gambar mewarnai:', error);
            container.innerHTML = '<p>Gagal memuat gambar. Silakan coba lagi nanti.</p>';
        });
}


// 3. ===============================================================================
//    Fungsi Pengatur Ukuran Font
// ==================================================================================
function initializeFontSizeControls() {
    const targetSelector = ".post-body.entry-content";
    const defaultSize = 100;
    let currentSize = defaultSize;

    window.adjustFontSize = function(action) {
        const container = document.querySelector(targetSelector);
        if (!container) return;

        if (action === "increase") {
            currentSize += 10;
        } else if (action === "decrease") {
            currentSize -= 10;
        } else {
            currentSize = defaultSize;
        }
        container.style.fontSize = currentSize + "%";
    };
}


// 4. ===============================================================================
//    Fungsi Text-to-Speech (TTS)
// ==================================================================================
function initializeTTSSystem() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    if (!('speechSynthesis' in window)) {
        const ttsControls = document.querySelector('.tts-controls');
        if (ttsControls) ttsControls.style.display = 'none';
        return;
    }
    const playStopBtn = document.getElementById('play-stop-btn');
    const articleContent = document.getElementById('article-content');
    if (!playStopBtn || !articleContent) {
        const ttsControls = document.querySelector('.tts-controls');
        if (ttsControls) ttsControls.style.display = 'none';
        return;
    }
    const readableElements = Array.from(articleContent.querySelectorAll('h1, h2, h3, h4, p, li'));
    let currentElementIndex = 0;
    let highlightedElement = null;
    window.speechSynthesis.cancel();

    function play() {
        window.speechSynthesis.cancel();
        currentElementIndex = 0;
        updateButtonState('speaking');
        speakNextElement();
    }

    function stop() {
        window.speechSynthesis.cancel();
        resetPlayer();
    }

    function speakNextElement() {
        if (currentElementIndex >= readableElements.length) {
            resetPlayer();
            return;
        }
        const element = readableElements[currentElementIndex];
        const textToSpeak = element.textContent;
        if (!textToSpeak.trim()) {
            currentElementIndex++;
            speakNextElement();
            return;
        }
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        utterance.onstart = () => {
            if (highlightedElement) highlightedElement.classList.remove('tts-highlight');
            element.classList.add('tts-highlight');
            highlightedElement = element;
        };
        utterance.onend = () => {
            currentElementIndex++;
            speakNextElement();
        };
        utterance.onerror = (event) => {
            console.error("TTS Error:", event);
            resetPlayer();
        };
        window.speechSynthesis.speak(utterance);
    }

    function resetPlayer() {
        currentElementIndex = 0;
        if (highlightedElement) {
            highlightedElement.classList.remove('tts-highlight');
            highlightedElement = null;
        }
        updateButtonState('stopped');
    }

    function updateButtonState(state) {
        if (state === 'speaking') {
            playStopBtn.innerHTML = "<i data-lucide='stop-circle'></i><span>Hentikan</span>";
        } else {
            playStopBtn.innerHTML = "<i data-lucide='play'></i><span>Dengarkan</span>";
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    playStopBtn.addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
            stop();
        } else {
            play();
        }
    });
    window.addEventListener('beforeunload', stop);
}

// 5. ===============================================================================
//    Fungsi UI Tema (Menu, Search, Back to Top)
// ==================================================================================
function initializeThemeUI() {
    // Mobile Menu
    $('.mobile-menu-toggle').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('nav-active');
        $('.overlay').fadeToggle('fast');
    });

    $('.overlay').on('click', function() {
        $('body').removeClass('nav-active');
        $(this).fadeOut('fast');
    });

    $('.mobile-menu .m-sub').hide();
    $('.mobile-menu .has-sub > a').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).next('.m-sub').slideToggle('fast');
    });

    // Search Toggle
    $('.show-search').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('search-active');
        $('#nav-search').fadeToggle('fast');
    });

    // Back to Top
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.back-top').fadeIn('fast');
        } else {
            $('.back-top').fadeOut('fast');
        }
    });
    $('.back-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
}


// 6. ===============================================================================
//    Inisialisasi Utama
// ==================================================================================
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeUI();
    initializeFontSizeControls();
    initializeTTSSystem();
    reliableRelatedPosts.init();
    initializeColoringWidget();

    // Inisialisasi Sticky Sidebar jika jQuery tersedia
    if (typeof jQuery !== 'undefined' && typeof fixedSidebar !== 'undefined' && fixedSidebar === true && window.innerWidth > 991) {
        if (typeof jQuery.fn.theiaStickySidebar !== 'undefined') {
             jQuery('#sidebar-wrapper').theiaStickySidebar({
                additionalMarginTop: 20,
                additionalMarginBottom: 20
            });
        }
    }
});
