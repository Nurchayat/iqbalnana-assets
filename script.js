/* File JavaScript Gabungan untuk iqbalnana.com
  Gabungkan semua skrip ini ke dalam satu file (misal: scripts.js) 
  dan host di GitHub untuk dipanggil melalui jsDelivr.
*/

// ===== Related Posts Script =====
var relatedpoststitle = "Related Posts";
var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();

function related_results_labels(c) {
    for (var b = 0; b < c.feed.entry.length; b++) {
        var d = c.feed.entry[b];
        relatedTitles[relatedTitlesNum] = d.title.$t;
        for (var a = 0; a < d.link.length; a++) {
            if (d.link[a].rel == "alternate") {
                relatedUrls[relatedTitlesNum] = d.link[a].href;
                relatedTitlesNum++;
                break
            }
        }
    }
}

function removeRelatedDuplicates() {
    var b = new Array(0);
    var c = new Array(0);
    for (var a = 0; a < relatedUrls.length; a++) {
        if (!contains(b, relatedUrls[a])) {
            b.length += 1;
            b[b.length - 1] = relatedUrls[a];
            c.length += 1;
            c[c.length - 1] = relatedTitles[a]
        }
    }
    relatedTitles = c;
    relatedUrls = b
}

function contains(b, d) {
    for (var c = 0; c < b.length; c++) {
        if (b[c] == d) {
            return true
        }
    }
    return false
}

function printRelatedLabels(a) {
    for (var b = 0; b < relatedUrls.length; b++) {
        if (relatedUrls[b] == a) {
            relatedUrls.splice(b, 1);
            relatedTitles.splice(b, 1)
        }
    }
    var c = Math.floor((relatedTitles.length - 1) * Math.random());
    var b = 0;
    if (relatedTitles.length > 1) {
        document.write("<h3>" + relatedpoststitle + "</h3>")
    }
    document.write("<ul>");
    while (b < relatedTitles.length && b < 20 && b < maxresults) {
        document.write('<li><a href="' + relatedUrls[c] + '">' + relatedTitles[c] + "</a></li>");
        if (c < relatedTitles.length - 1) {
            c++
        } else {
            c = 0
        }
        b++
    }
    document.write("</ul>");
    relatedUrls.splice(0, relatedUrls.length);
    relatedTitles.splice(0, relatedTitles.length)
};

// ===== Theia Sticky Sidebar =====
/*! Theia Sticky Sidebar | v1.7.0 - https://github.com/WeCodePixels/theia-sticky-sidebar */
(function($) {
    $.fn.theiaStickySidebar = function(options) {
        var defaults = {
            'containerSelector': '',
            'additionalMarginTop': 0,
            'additionalMarginBottom': 0,
            'updateSidebarHeight': true,
            'minWidth': 0,
            'disableOnResponsiveLayouts': true,
            'sidebarBehavior': 'modern',
            'defaultPosition': 'relative',
            'namespace': 'TSS'
        };
        options = $.extend(defaults, options);
        options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
        options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;
        tryInitOrHookIntoEvents(options, this);

        function tryInitOrHookIntoEvents(options, $that) {
            var success = tryInit(options, $that);
            if (!success) {
                console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');
                $(document).on('scroll.' + options.namespace, function(options, $that) {
                    return function(evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt)
                        }
                    }
                }(options, $that));
                $(window).on('resize.' + options.namespace, function(options, $that) {
                    return function(evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt)
                        }
                    }
                }(options, $that))
            }
        }

        function tryInit(options, $that) {
            if (options.initialized === true) {
                return true
            }
            if ($('body').width() < options.minWidth) {
                return false
            }
            init(options, $that);
            return true
        }

        function init(options, $that) {
            options.initialized = true;
            var existingStylesheet = $('#theia-sticky-sidebar-stylesheet-' + options.namespace);
            if (existingStylesheet.length === 0) {
                $('head').append($('<style id="theia-sticky-sidebar-stylesheet-' + options.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))
            }
            $that.each(function() {
                var o = {};
                o.sidebar = $(this);
                o.options = options || {};
                o.container = $(o.options.containerSelector);
                if (o.container.length == 0) {
                    o.container = o.sidebar.parent()
                }
                o.sidebar.parents().css('-webkit-transform', 'none');
                o.sidebar.css({
                    'position': o.options.defaultPosition,
                    'overflow': 'visible',
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });
                o.stickySidebar = o.sidebar.find('.theiaStickySidebar');
                if (o.stickySidebar.length == 0) {
                    var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                    o.sidebar.find('script').filter(function(index, script) {
                        return script.type.length === 0 || script.type.match(javaScriptMIMETypes)
                    }).remove();
                    o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());
                    o.sidebar.append(o.stickySidebar)
                }
                o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
                o.paddingTop = parseInt(o.sidebar.css('padding-top'));
                o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));
                var collapsedTopHeight = o.stickySidebar.offset().top;
                var collapsedBottomHeight = o.stickySidebar.outerHeight();
                o.stickySidebar.css('padding-top', 1);
                o.stickySidebar.css('padding-bottom', 1);
                collapsedTopHeight -= o.stickySidebar.offset().top;
                collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                if (collapsedTopHeight == 0) {
                    o.stickySidebar.css('padding-top', 0);
                    o.stickySidebarPaddingTop = 0
                } else {
                    o.stickySidebarPaddingTop = 1
                }
                if (collapsedBottomHeight == 0) {
                    o.stickySidebar.css('padding-bottom', 0);
                    o.stickySidebarPaddingBottom = 0
                } else {
                    o.stickySidebarPaddingBottom = 1
                }
                o.previousScrollTop = null;
                o.fixedScrollTop = 0;
                resetSidebar();
                o.onScroll = function(o) {
                    if (!o.stickySidebar.is(":visible")) {
                        return
                    }
                    if ($('body').width() < o.options.minWidth) {
                        resetSidebar();
                        return
                    }
                    if (o.options.disableOnResponsiveLayouts) {
                        var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');
                        if (sidebarWidth + 50 > o.container.width()) {
                            resetSidebar();
                            return
                        }
                    }
                    var scrollTop = $(document).scrollTop();
                    var position = 'static';
                    if (scrollTop >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
                        var offsetTop = o.paddingTop + options.additionalMarginTop;
                        var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;
                        var containerTop = o.sidebar.offset().top;
                        var containerBottom = o.sidebar.offset().top + getClearedHeight(o.container);
                        var windowOffsetTop = 0 + options.additionalMarginTop;
                        var windowOffsetBottom;
                        var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop + offsetBottom) < $(window).height();
                        if (sidebarSmallerThanWindow) {
                            windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight()
                        } else {
                            windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom
                        }
                        var staticLimitTop = containerTop - scrollTop + o.paddingTop;
                        var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;
                        var top = o.stickySidebar.offset().top - scrollTop;
                        var scrollTopDiff = o.previousScrollTop - scrollTop;
                        if (o.stickySidebar.css('position') == 'fixed') {
                            if (o.options.sidebarBehavior == 'modern') {
                                top += scrollTopDiff
                            }
                        }
                        if (o.options.sidebarBehavior == 'stick-to-top') {
                            top = options.additionalMarginTop
                        }
                        if (o.options.sidebarBehavior == 'stick-to-bottom') {
                            top = windowOffsetBottom - o.stickySidebar.outerHeight()
                        }
                        if (scrollTopDiff > 0) {
                            top = Math.min(top, windowOffsetTop)
                        } else {
                            top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight())
                        }
                        top = Math.max(top, staticLimitTop);
                        top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());
                        var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();
                        if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                            position = 'fixed'
                        } else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                            position = 'fixed'
                        } else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                            position = 'static'
                        } else {
                            position = 'absolute'
                        }
                    }
                    if (position == 'fixed') {
                        var scrollLeft = $(document).scrollLeft();
                        o.stickySidebar.css({
                            'position': 'fixed',
                            'width': getWidthForObject(o.stickySidebar) + 'px',
                            'transform': 'translateY(' + top + 'px)',
                            'left': (o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left')) - scrollLeft) + 'px',
                            'top': '0px'
                        })
                    } else if (position == 'absolute') {
                        var css = {};
                        if (o.stickySidebar.css('position') != 'absolute') {
                            css.position = 'absolute';
                            css.transform = 'translateY(' + (scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + 'px)';
                            css.top = '0px'
                        }
                        css.width = getWidthForObject(o.stickySidebar) + 'px';
                        css.left = '';
                        o.stickySidebar.css(css)
                    } else if (position == 'static') {
                        resetSidebar()
                    }
                    if (position != 'static') {
                        if (o.options.updateSidebarHeight == true) {
                            o.sidebar.css({
                                'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                            })
                        }
                    }
                    o.previousScrollTop = scrollTop
                };
                o.onScroll(o);
                $(document).on('scroll.' + o.options.namespace, function(o) {
                    return function() {
                        o.onScroll(o)
                    }
                }(o));
                $(window).on('resize.' + o.options.namespace, function(o) {
                    return function() {
                        o.stickySidebar.css({
                            'position': 'static'
                        });
                        o.onScroll(o)
                    }
                }(o));
                if (typeof ResizeSensor !== 'undefined') {
                    new ResizeSensor(o.stickySidebar[0], function(o) {
                        return function() {
                            o.onScroll(o)
                        }
                    }(o))
                }

                function resetSidebar() {
                    o.fixedScrollTop = 0;
                    o.sidebar.css({
                        'min-height': '1px'
                    });
                    o.stickySidebar.css({
                        'position': 'static',
                        'width': '',
                        'transform': 'none'
                    })
                }

                function getClearedHeight(e) {
                    var height = e.height();
                    e.children().each(function() {
                        height = Math.max(height, $(this).height())
                    });
                    return height
                }
            })
        }

        function getWidthForObject(object) {
            var width;
            try {
                width = object[0].getBoundingClientRect().width
            } catch (err) {}
            if (typeof width === "undefined") {
                width = object.width()
            }
            return width
        }
        return this
    }
})(jQuery);

// ===== Pagination Script =====
(function() {
    var K;
    var m;
    var l;
    var w;
    var s = location.href;
    var y = "/";
    pageCurrentBlogger();

    function startPagination(a) {
        var b = '';
        var J = parseInt(numOfPages / 2);
        if (J == numOfPages - J) {
            numOfPages = J * 2 + 1
        }
        var D = l - J;
        if (D < 1) D = 1;
        var lastPageNo = parseInt(a / postResults) + 1;
        if (lastPageNo - 1 == a / postResults) lastPageNo = lastPageNo - 1;
        var E = D + numOfPages - 1;
        if (E > lastPageNo) E = lastPageNo;
        b += '<span class="page-of">' + pageOf[0] + ' ' + l + ' ' + pageOf[1] + ' ' + lastPageNo + '</span>';
        var c = parseInt(l) - 1;
        if (l > 1) {
            if (l == 2) {
                if (m == 'home') {
                    b += '<a class="page-prev num" href="' + y + '"></a>'
                } else {
                    b += '<a class="page-prev num" href="/search/label/' + w + '?&max-results=' + postResults + '"></a>'
                }
            } else {
                if (m == 'home') {
                    b += '<a class="page-prev num" href="#" onclick="getPage(' + c + ');return false"></a>'
                } else {
                    b += '<a class="page-prev num" href="#" onclick="getLabelPage(' + c + ');return false"></a>'
                }
            }
        }
        if (D > 1) {
            if (m == "home") {
                b += '<a class="num" href="' + y + '">1</a>'
            } else {
                b += '<a class="num" href="/search/label/' + w + '?&max-results=' + postResults + '">1</a>'
            }
        }
        if (D > 2) {
            b += '<span class="num dots">...</span>'
        }
        for (var d = D; d <= E; d++) {
            if (l == d) {
                b += '<span class="num active">' + d + '</span>'
            } else if (d == 1) {
                if (m == 'home') {
                    b += '<a class="num" href="' + y + '">1</a>'
                } else {
                    b += '<a class="num" href="/search/label/' + w + '?&max-results=' + postResults + '">1</a>'
                }
            } else {
                if (m == 'home') {
                    b += '<a class="num" href="#" onclick="getPage(' + d + ');return false">' + d + '</a>'
                } else {
                    b += '<a class="num" href="#" onclick="getLabelPage(' + d + ');return false">' + d + '</a>'
                }
            }
        }
        if (E < lastPageNo - 1) {
            b += '<span class="num dots">...</span>'
        }
        if (E < lastPageNo) {
            if (m == "home") {
                b += '<a class="num" href="#" onclick="getPage(' + lastPageNo + ');return false">' + lastPageNo + '</a>'
            } else {
                b += '<a class="num" href="#" onclick="getLabelPage(' + lastPageNo + ');return false">' + lastPageNo + '</a>'
            }
        }
        var e = parseInt(l) + 1;
        if (l < lastPageNo) {
            if (m == 'home') {
                b += '<a class="page-next num" href="#" onclick="getPage(' + e + ');return false"></a>'
            } else {
                b += '<a class="page-next num" href="#" onclick="getLabelPage(' + e + ');return false"></a>'
            }
        }
        b += '';
        var f = document.getElementsByName('pageArea');
        var g = document.getElementById('blog-pager');
        for (var p = 0; p < f.length; p++) {
            f[p].innerHTML = b
        }
        if (f && f.length > 0) {
            b = ''
        }
        if (g) {
            g.innerHTML = b
        }
    }

    function dataFeed(a) {
        var b = a.feed;
        var c = parseInt(b.openSearch$totalResults.$t, 10);
        startPagination(c)
    }

    function pageCurrentBlogger() {
        var a = s;
        if (a.indexOf('/search/label/') != -1) {
            if (a.indexOf('?updated-max') != -1) {
                w = a.substring(a.indexOf('/search/label/') + 14, a.indexOf('?updated-max'))
            } else {
                w = a.substring(a.indexOf('/search/label/') + 14, a.indexOf('?&max'))
            }
        }
        if (a.indexOf('?q=') == -1 && a.indexOf('.html') == -1) {
            if (a.indexOf('/search/label/') == -1) {
                m = 'home';
                if (s.indexOf('#PageNo=') != -1) {
                    l = s.substring(s.indexOf('#PageNo=') + 8, s.length)
                } else {
                    l = 1
                }
                document.write('<script src="' + y + 'feeds/posts/summary?start-index=1&max-results=1&alt=json-in-script&callback=dataFeed"><\/script>')
            } else {
                m = 'label';
                if (a.indexOf('&max-results=') == -1) {
                    postResults = 20
                }
                if (s.indexOf('#PageNo=') != -1) {
                    l = s.substring(s.indexOf('#PageNo=') + 8, s.length)
                } else {
                    l = 1
                }
                document.write('<script src="' + y + 'feeds/posts/summary/-/' + w + '?alt=json-in-script&callback=dataFeed&max-results=1" ><\/script>')
            }
        }
    }

    window.getPage = function(a) {
        var pageStart = (a - 1) * postResults;
        K = a;
        var b = document.getElementsByTagName('head')[0];
        var c = document.createElement('script');
        c.type = 'text/javascript';
        c.setAttribute('src', y + 'feeds/posts/summary?start-index=' + pageStart + '&max-results=1&alt=json-in-script&callback=findPostDate');
        b.appendChild(c)
    }

    window.getLabelPage = function(a) {
        var pageStart = (a - 1) * postResults;
        K = a;
        var b = document.getElementsByTagName('head')[0];
        var c = document.createElement('script');
        c.type = 'text/javascript';
        c.setAttribute('src', y + 'feeds/posts/summary/-/' + w + '?start-index=' + pageStart + '&max-results=1&alt=json-in-script&callback=findPostDate');
        b.appendChild(c)
    }

    window.findPostDate = function(a) {
        var post = a.feed.entry[0];
        var b = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
        var c = encodeURIComponent(b);
        if (m == 'home') {
            var d = '/search?updated-max=' + c + '&max-results=' + postResults + '#PageNo=' + K
        } else {
            var d = '/search/label/' + w + '?updated-max=' + c + '&max-results=' + postResults + '#PageNo=' + K
        }
        location.href = d
    }
})();


// ===== Multi Related Post Script =====
(function() {
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
        if (post[f].nodeName == 'P') {
            post[f].parentNode.insertBefore(g, post[f])
        } else {
            post[f].parentNode.insertBefore(g, post[f].nextSibling)
        }
    }
})();
(function arldzgnMultiRelated() {
    var text = 'Baca juga.. :';
    let r = Math.floor((relatedTitles.length - 1) * Math.random());
    let i = 0;
    let jumlah = document.querySelectorAll('.arldzgnMultiRelated');
    while (i < relatedTitles.length && i < jumlah.length) {
        for (let a = 0; a < jumlah.length; a++) {
            jumlah[a].innerHTML = '<span class="content"><span class="text">' + text + '</span><a href="' + relatedUrls[r] + '" title="' + relatedTitles[r] + '">' + relatedTitles[r] + '</a></span><span class="icon"></span>';
            if (r < relatedTitles.length - 1) {
                r++
            } else {
                r = 0
            };
            i++
        }
    }
})();

// ===== Coloring Widget Script =====
(function() {
    const container = document.getElementById('coloring-widget-grid');
    if (!container) return; // Exit if widget not on page
    
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
})();

// ===== Font Size Controller (di Footer) =====
(function() {
    const targetSelector = ".post-body";
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
})();

// ===== TTS & Font/Translate Tools in Post Body =====
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Fungsi Pengatur Font (dari panel dalam postingan)
    function adjustPostFontSize(action) {
        const content = document.querySelector('.post-content');
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
                content.style.fontSize = '';
                break;
        }
    }
    // Event listener untuk tombol font di dalam postingan
    document.querySelectorAll('.font-controls .tool-button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.title.includes('Perbesar') ? 'increase' : this.title.includes('Perkecil') ? 'decrease' : 'reset';
            adjustPostFontSize(action);
        });
    });

    // Logika Tombol Translate Kustom
    const customTranslateButton = document.getElementById('custom-translate-btn');
    if (customTranslateButton) {
        customTranslateButton.addEventListener('click', function() {
            const langSelector = document.querySelector('.goog-te-combo');
            if (langSelector) {
                langSelector.focus();
                langSelector.click();
            }
        });
    }

    // Logika TTS
    if (!('speechSynthesis' in window)) {
        console.log('Browser tidak mendukung Text-to-Speech.');
        const player = document.querySelector('.tts-player-container');
        if (player) player.style.display = 'none';
        return;
    }

    const playPauseBtn = document.getElementById('play-pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const articleContent = document.getElementById('article-content');

    if (!playPauseBtn || !stopBtn) return;
    if (!articleContent) {
        const ttsContainer = document.querySelector('.tts-player-container');
        if (ttsContainer) ttsContainer.parentElement.style.display = 'none';
        return;
    }

    const readableElements = Array.from(articleContent.querySelectorAll('h1, h2, h3, h4, p, li'));
    let isSpeaking = false,
        isPaused = false,
        currentElementIndex = 0,
        highlightedElement = null;

    function play() {
        if (isPaused) {
            window.speechSynthesis.resume();
            isPaused = false;
            updateButtonState('speaking');
        } else {
            speakNextElement();
        }
    }

    function pause() {
        window.speechSynthesis.pause();
        isPaused = true;
        updateButtonState('paused');
    }

    function stop() {
        window.speechSynthesis.cancel();
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
            isSpeaking = true;
            isPaused = false;
            updateButtonState('speaking');
            if (highlightedElement) {
                highlightedElement.classList.remove('tts-highlight');
            }
            element.classList.add('tts-highlight');
            highlightedElement = element;
        };
        utterance.onend = () => {
            currentElementIndex++;
            speakNextElement();
        };
        utterance.onerror = (event) => {
            console.error(event);
            resetPlayer();
        };
        window.speechSynthesis.speak(utterance);
    }

    function resetPlayer() {
        isSpeaking = false;
        isPaused = false;
        currentElementIndex = 0;
        if (highlightedElement) {
            highlightedElement.classList.remove('tts-highlight');
            highlightedElement = null;
        }
        updateButtonState('stopped');
    }

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
            playPauseText.textContent = 'Baca Sambil Dengarkan';
            stopBtn.style.display = 'none';
        }
        lucide.createIcons();
    }

    playPauseBtn.addEventListener('click', () => {
        if (isSpeaking && !isPaused) {
            pause();
        } else {
            play();
        }
    });
    stopBtn.addEventListener('click', () => {
        stop();
    });
    window.addEventListener('beforeunload', () => {
        stop();
    });
});
