/* File JavaScript Gabungan untuk iqbalnana.com
  Versi ini berisi perbaikan untuk tombol Google Translate dan Post Tools.
*/

// ===== Logika untuk Post Tools Panel (Font, TTS, Translate) =====
function initializePostTools() {
    // Inisialisasi Ikon Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const articleContent = document.getElementById('article-content');
    if (!articleContent) return; // Keluar jika tidak di halaman postingan

    // --- FUNGSI PENGATUR FONT ---
    function adjustFontSize(action) {
        const content = document.querySelector('.post-body.entry-content');
        if (!content) return;
        let currentSize = parseFloat(window.getComputedStyle(content, null).getPropertyValue('font-size'));
        switch (action) {
            case 'increase':
                content.style.fontSize = (currentSize + 1) + 'px';
                break;
            case 'decrease':
                content.style.fontSize = (currentSize - 1) + 'px';
                break;
            case 'reset':
                content.style.fontSize = ''; // Kembali ke default CSS
                break;
        }
    }

    // Menambahkan event listener ke tombol font
    const fontControls = document.querySelector('.font-controls');
    if (fontControls) {
        fontControls.addEventListener('click', function(event) {
            const target = event.target.closest('.tool-button');
            if (!target) return;
            
            const title = target.getAttribute('title');
            if (title.includes('Perbesar')) {
                adjustFontSize('increase');
            } else if (title.includes('Perkecil')) {
                adjustFontSize('decrease');
            } else if (title.includes('Normal')) {
                adjustFontSize('reset');
            }
        });
    }

    // --- LOGIKA TOMBOL TRANSLATE KUSTOM (RELIABLE) ---
    const customTranslateButton = document.getElementById('custom-translate-btn');
    const googleTranslateContainer = document.getElementById('google_translate_element');

    if (customTranslateButton && googleTranslateContainer) {
        const observer = new MutationObserver((mutationsList, obs) => {
            const langSelector = googleTranslateContainer.querySelector('.goog-te-combo');
            if (langSelector) {
                customTranslateButton.addEventListener('click', () => {
                    // Mensimulasikan klik mouse untuk membuka dropdown
                    const event = new MouseEvent('mousedown', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    langSelector.dispatchEvent(event);
                });
                console.log('SUCCESS: Google Translate button listener attached.');
                obs.disconnect(); // Hentikan pemantauan setelah berhasil
            }
        });

        // Mulai memantau perubahan pada container Google Translate
        observer.observe(googleTranslateContainer, {
            childList: true,
            subtree: true
        });
    }

    // --- LOGIKA TEXT-TO-SPEECH (TTS) ---
    if (!('speechSynthesis' in window)) {
        console.log('Browser tidak mendukung Text-to-Speech.');
        const player = document.querySelector('.tts-player-container');
        if (player) player.style.display = 'none';
        return;
    }

    const playPauseBtn = document.getElementById('play-pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    if (!playPauseBtn || !stopBtn) return;

    const readableElements = Array.from(articleContent.querySelectorAll('h1, h2, h3, h4, p, li'));
    let isSpeaking = false, isPaused = false, currentElementIndex = 0, highlightedElement = null;

    function play() { if (isPaused) { window.speechSynthesis.resume(); isPaused = false; updateButtonState('speaking'); } else { speakNextElement(); } }
    function pause() { window.speechSynthesis.pause(); isPaused = true; updateButtonState('paused'); }
    function stop() { window.speechSynthesis.cancel(); resetPlayer(); }

    function speakNextElement() {
        if (currentElementIndex >= readableElements.length) { resetPlayer(); return; }
        const element = readableElements[currentElementIndex];
        const textToSpeak = element.textContent;
        if (!textToSpeak.trim()) { currentElementIndex++; speakNextElement(); return; }
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        utterance.onstart = () => { isSpeaking = true; isPaused = false; updateButtonState('speaking'); if (highlightedElement) { highlightedElement.classList.remove('tts-highlight'); } element.classList.add('tts-highlight'); highlightedElement = element; };
        utterance.onend = () => { currentElementIndex++; speakNextElement(); };
        utterance.onerror = (event) => { console.error(event); resetPlayer(); };
        window.speechSynthesis.speak(utterance);
    }

    function resetPlayer() { isSpeaking = false; isPaused = false; currentElementIndex = 0; if (highlightedElement) { highlightedElement.classList.remove('tts-highlight'); highlightedElement = null; } updateButtonState('stopped'); }

    function updateButtonState(state) {
        const playPauseIcon = playPauseBtn.querySelector('i');
        const playPauseText = playPauseBtn.querySelector('span');
        if (!playPauseIcon || !playPauseText) return;

        if (state === 'speaking') {
            playPauseIcon.setAttribute('data-lucide', 'pause');
            playPauseText.textContent = 'Jeda';
            stopBtn.style.display = 'inline-flex';
        } else if (state === 'paused') {
            playPauseIcon.setAttribute('data-lucide', 'play');
            playPauseText.textContent = 'Lanjutkan';
            stopBtn.style.display = 'inline-flex';
        } else { // stopped
            playPauseIcon.setAttribute('data-lucide', 'play');
            playPauseText.textContent = 'Dengarkan';
            stopBtn.style.display = 'none';
        }
        lucide.createIcons();
    }

    playPauseBtn.addEventListener('click', () => { if (isSpeaking && !isPaused) { pause(); } else { play(); } });
    stopBtn.addEventListener('click', () => { stop(); });
    window.speechSynthesis.onvoiceschanged = () => {};
    window.addEventListener('beforeunload', () => { stop(); });
}

// ===== Related Posts Script =====
var relatedpoststitle = "Related Posts";
var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
function related_results_labels(c) { for (var b = 0; b < c.feed.entry.length; b++) { var d = c.feed.entry[b]; relatedTitles[relatedTitlesNum] = d.title.$t; for (var a = 0; a < d.link.length; a++) { if (d.link[a].rel == "alternate") { relatedUrls[relatedTitlesNum] = d.link[a].href; relatedTitlesNum++; break } } } }
function removeRelatedDuplicates() { var b = new Array(0); var c = new Array(0); for (var a = 0; a < relatedUrls.length; a++) { if (!contains(b, relatedUrls[a])) { b.length += 1; b[b.length - 1] = relatedUrls[a]; c.length += 1; c[c.length - 1] = relatedTitles[a] } } relatedTitles = c; relatedUrls = b }
function contains(b, d) { for (var c = 0; c < b.length; c++) { if (b[c] == d) { return true } } return false }
function printRelatedLabels(a) { for (var b = 0; b < relatedUrls.length; b++) { if (relatedUrls[b] == a) { relatedUrls.splice(b, 1); relatedTitles.splice(b, 1) } } var c = Math.floor((relatedTitles.length - 1) * Math.random()); var b = 0; if (relatedTitles.length > 1) { document.write("<h3>" + relatedpoststitle + "</h3>") } document.write("<ul>"); while (b < relatedTitles.length && b < 20 && b < maxresults) { document.write('<li><a href="' + relatedUrls[c] + '">' + relatedTitles[c] + "</a></li>"); if (c < relatedTitles.length - 1) { c++ } else { c = 0 } b++ } document.write("</ul>"); relatedUrls.splice(0, relatedUrls.length); relatedTitles.splice(0, relatedTitles.length) };

// ===== Multi Related Post Script =====
function initializeMultiRelated() {
    if (document.querySelector('.arldzgnMultiRelated')) return;
    var jumlah = 2;
    let post = document.querySelectorAll('.post-body br, .post-body p'),
        a = jumlah + 1,
        b = post.length / a;
    c = Array.from({
        length: jumlah
    }, (redfx, blufx) => blufx + 1);
    for (let d = 0; d < c.length; d++) {
        let e = c[d],
            f = parseInt((b * e)),
            g = document.createElement('div');
        g.className = 'arldzgnMultiRelated';
        if (post[f] && post[f].nodeName == 'P') {
            post[f].parentNode.insertBefore(g, post[f])
        } else if(post[f]) {
            post[f].parentNode.insertBefore(g, post[f].nextSibling)
        }
    }
    
    var text = 'Baca juga.. :';
    let r = Math.floor((relatedTitles.length - 1) * Math.random());
    let i = 0;
    let jumlahDivs = document.querySelectorAll('.arldzgnMultiRelated');
    while (i < relatedTitles.length && i < jumlahDivs.length) {
        for (let a = 0; a < jumlahDivs.length; a++) {
            if (relatedUrls[r] && relatedTitles[r]) {
                jumlahDivs[a].innerHTML = '<span class="content"><span class="text">' + text + '</span><a href="' + relatedUrls[r] + '" title="' + relatedTitles[r] + '">' + relatedTitles[r] + '</a></span><span class="icon"></span>';
            }
            if (r < relatedTitles.length - 1) {
                r++
            } else {
                r = 0
            };
            i++
        }
    }
}

// ===== Coloring Widget Script =====
function initializeColoringWidget() {
    const container = document.getElementById('coloring-widget-grid');
    if (!container) return;
    const dataSourceUrl = 'https://amp.iqbalnana.com/mewarnai/search-index.json';
    const coloringSiteBaseUrl = 'https://amp.iqbalnana.com';
    fetch(dataSourceUrl).then(response => { if (!response.ok) { throw new Error('Gagal mengambil data. Status: ' + response.status); } return response.json(); }).then(data => { if (!data || !Array.isArray(data) || data.length === 0) { container.innerHTML = '<p>Tidak ada gambar untuk ditampilkan.</p>'; return; } const latestImages = data.slice(0, 4); container.innerHTML = ''; latestImages.forEach(image => { const fullUrl = coloringSiteBaseUrl + image.url; const fullThumbnailUrl = coloringSiteBaseUrl + image.thumbnail; const card = document.createElement('a'); card.href = fullUrl; card.className = 'coloring-widget-card'; card.target = '_blank'; card.rel = 'noopener noreferrer'; card.title = image.title; card.innerHTML = `<img src="${fullThumbnailUrl}" alt="${image.title}" loading="lazy" /><div class="coloring-widget-card-title">${image.title}</div>`; container.appendChild(card); }); }).catch(error => { console.error('Error memuat widget gambar mewarnai:', error); container.innerHTML = '<p>Gagal memuat gambar. Silakan coba lagi nanti.</p>'; });
}

// ===== Theme Main Logic =====
document.addEventListener('DOMContentLoaded', function() {
    // Jalankan semua fungsi inisialisasi
    initializePostTools();
    initializeMultiRelated();
    initializeColoringWidget();
    
    // Logika menu mobile, back-to-top, dll.
    var mobMenu = function() {
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
    };

    var searchNav = function() {
        $('.show-search').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('search-active');
            $('#nav-search').fadeToggle('fast');
        });
    };

    var backTop = function() {
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
    };
    
    mobMenu();
    searchNav();
    backTop();
});
