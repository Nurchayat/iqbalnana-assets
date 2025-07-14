

// 1. ===============================================================================
//    Widget Gambar Mewarnai
// ==================================================================================
(function() {
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
})();


// 2. ===============================================================================
//    Fungsi Pengatur Ukuran Font
// ==================================================================================
(function () {
  const targetSelector = ".post-body";
  const defaultSize = 100;
  let currentSize = defaultSize;

  window.adjustFontSize = function (action) {
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


// 3. ===============================================================================
//    Theia Sticky Sidebar v1.7.0
// ==================================================================================
(function($){$.fn.theiaStickySidebar=function(options){var defaults={'containerSelector':'','additionalMarginTop':0,'additionalMarginBottom':0,'updateSidebarHeight':true,'minWidth':0,'disableOnResponsiveLayouts':true,'sidebarBehavior':'modern','defaultPosition':'relative','namespace':'TSS'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');$(document).on('scroll.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).on('resize.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;var existingStylesheet=$('#theia-sticky-sidebar-stylesheet-'+options.namespace);if(existingStylesheet.length===0){$('head').append($('<style id="theia-sticky-sidebar-stylesheet-'+options.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))}$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({'position':o.options.defaultPosition,'overflow':'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.theiaStickySidebar');if(o.stickySidebar.length==0){var javaScriptMIMETypes=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find('script').filter(function(index,script){return script.type.length===0||script.type.match(javaScriptMIMETypes)}).remove();o.stickySidebar=$('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.sidebar.offset().top;var containerBottom=o.sidebar.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=(o.stickySidebar.outerHeight()+offsetTop+offsetBottom)<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){var scrollLeft=$(document).scrollLeft();o.stickySidebar.css({'position':'fixed','width':getWidthForObject(o.stickySidebar)+'px','transform':'translateY('+top+'px)','left':(o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))-scrollLeft)+'px','top':'0px'})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.transform='translateY('+(scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+'px)';css.top='0px'}css.width=getWidthForObject(o.stickySidebar)+'px';css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).on('scroll.'+o.options.namespace,function(o){return function(){o.onScroll(o)}}(o));$(window).on('resize.'+o.options.namespace,function(o){return function(){o.stickySidebar.css({'position':'static'});o.onScroll(o)}}(o));if(typeof ResizeSensor!=='undefined'){new ResizeSensor(o.stickySidebar[0],function(o){return function(){o.onScroll(o)}}(o))}function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({'position':'static','width':'','transform':'none'})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}function getWidthForObject(object){var width;try{width=object[0].getBoundingClientRect().width}catch(err){}if(typeof width==="undefined"){width=object.width()}return width}return this}})(jQuery);


// 4. ===============================================================================
//    Skrip Paginasi (Obfuscated)
// ==================================================================================
var postResults=postPerPage;
var numOfPages=2;
var pageOf=["Page", "of"];
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 K;5 m;5 l;5 w;5 s=1p.9;5 y="/";1d();G 1b(a){5 b=\'\';J=M(W/2);4(J==W-J){W=J*2+1}D=l-J;4(D<1)D=1;j=M(a/n)+1;4(j-1==a/n)j=j-1;E=D+W-1;4(E>j)E=j;b+=\'<C 6="3-1u">\'+17[0]+\' \'+l+\' \'+17[1]+\' \'+j+\'</C>\';5 c=M(l)-1;4(l>1){4(l==2){4(m==\'3\'){b+=\'<a 6="3-7 3-U" 9="\'+y+\'"></a>\'}h{b+=\'<a 6="3-7 3-U" 9="/v/u/\'+w+\'?&i-o=\'+n+\'"></a>\'}}h{4(m==\'3\'){b+=\'<a 6="3-7 3-U" 9="#" z="L(\'+c+\');B x"></a>\'}h{b+=\'<a 6="3-7 3-U" 9="#" z="I(\'+c+\');B x"></a>\'}}}4(D>1){4(m=="3"){b+=\'<a 6="3-7" 9="\'+y+\'">1</a>\'}h{b+=\'<a 6="3-7" 9="/v/u/\'+w+\'?&i-o=\'+n+\'">1</a>\'}}4(D>2){b+=\'<C 6="3-7 3-16">...</C>\'}1a(5 d=D;d<=E;d++){4(l==d){b+=\'<C 6="3-7 3-1v">\'+d+\'</C>\'}h 4(d==1){4(m==\'3\'){b+=\'<a 6="3-7" 9="\'+y+\'">1</a>\'}h{b+=\'<a 6="3-7" 9="/v/u/\'+w+\'?&i-o=\'+n+\'">1</a>\'}}h{4(m==\'3\'){b+=\'<a 6="3-7" 9="#" z="L(\'+d+\');B x">\'+d+\'</a>\'}h{b+=\'<a 6="3-7" 9="#" z="I(\'+d+\');B x">\'+d+\'</a>\'}}}4(E<j-1){b+=\'<C 6="3-7 3-16">...</C>\'}4(E<j){4(m=="3"){b+=\'<a 6="3-7" 9="#" z="L(\'+j+\');B x">\'+j+\'</a>\'}h{b+=\'<a 6="3-7" 9="#" z="I(\'+j+\');B x">\'+j+\'</a>\'}}5 e=M(l)+1;4(l<j){4(m==\'3\'){b+=\'<a 6="3-7 3-15" 9="#" z="L(\'+e+\');B x"></a>\'}h{b+=\'<a 6="3-7 3-15" 9="#" z="I(\'+e+\');B x"></a>\'}}b+=\'\';5 f=A.1s(\'1t\');5 g=A.1r(\'1A-1D\');1a(5 p=0;p<f.O;p++){f[p].1c=b}4(f&&f.O>0){b=\'\'}4(g){g.1c=b}}G 12(a){5 b=a.1f;5 c=M(b.1E$1B.$t,10);1b(c)}G 1d(){5 a=s;4(a.k(\'/v/u/\')!=-1){4(a.k(\'?T-i\')!=-1){w=a.H(a.k(\'/v/u/\')+14,a.k(\'?T-i\'))}h{w=a.H(a.k(\'/v/u/\')+14,a.k(\'?&i\'))}}4(a.k(\'?q=\')==-1&&a.k(\'.1C\')==-1){4(a.k(\'/v/u/\')==-1){m=\'3\';4(s.k(\'#F=\')!=-1){l=s.H(s.k(\'#F=\')+8,s.O)}h{l=1}A.18(\'<r Q=\\\'\'+y+\'P/R/N?i-o=1&X=Y-S-r&V=12\\\'><\\/r>\')}h{m=\'u\';4(a.k(\'&i-o=\')==-1){n=1F}4(s.k(\'#F=\')!=-1){l=s.H(s.k(\'#F=\')+8,s.O)}h{l=1}A.18(\'<r Q="\'+y+\'P/R/N/-/\'+w+\'?X=Y-S-r&V=12&i-o=1" ><\\/r>\')}}}G L(a){Z=(a-1)*n;K=a;5 b=A.1h(\'1q\')[0];5 c=A.1o(\'r\');c.1e=\'1m/1n\';c.1i(\'Q\',y+\'P/R/N?1j-1k=\'+Z+\'&i-o=1&X=Y-S-r&V=13\');b.1l(c)}G I(a){Z=(a-1)*n;K=a;5 b=A.1h(\'1q\')[0];5 c=A.1o(\'r\');c.1e=\'1m/1n\';c.1i(\'Q\',y+\'P/R/N/-/\'+w+\'?1j-1k=\'+Z+\'&i-o=1&X=Y-S-r&V=13\');b.1l(c)}G 13(a){11=a.1f.1x[0];5 b=11.1g.$t.H(0,19)+11.1g.$t.H(1z,1w);5 c=1y(b);4(m==\'3\'){5 d=\'/v?T-i=\'+c+\'&i-o=\'+n+\'#F=\'+K}h{5 d=\'/v/u/\'+w+\'?T-i=\'+c+\'&i-o=\'+n+\'#F=\'+K}1p.9=d}',62,104,'|||page|if|var|class|num||href||||||||else|max|lastPageNo|indexOf|currentPageNo|currentPage|postResults|results|||script|locationUrl||label|search|postLabel|false|home_page|onclick|document|return|span|pageStart|pageEnd|PageNo|function|substring|getLabelPage|pageNumber|noPage|getPage|parseInt|summary|length|feeds|src|posts|in|updated|prev|callback|numOfPages|alt|json|jsonstart||post|dataFeed|findPostDate||next|dots|pageOf|write||for|startPagination|innerHTML|pageCurrentBlogger|type|feed|published|getElementsByTagName|setAttribute|start|index|appendChild|text|javascript|createElement|location|head|getElementById|getElementsByName|pageArea|of|active|29|entry|encodeURIComponent|23|blog|totalResults|html|pager|openSearch|20'.split('|'),0,{}));


// 5. ===============================================================================
//    Fungsi Text-to-Speech (TTS) dan Kontrol Font
// ==================================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    if (!('speechSynthesis' in window)) {
        const ttsControls = document.querySelector('.tts-controls');
        if(ttsControls) ttsControls.style.display = 'none';
        return;
    }

    const playStopBtn = document.getElementById('play-stop-btn');
    const articleContent = document.getElementById('article-content');

    if (!playStopBtn || !articleContent) {
        const ttsControls = document.querySelector('.tts-controls');
        if(ttsControls) ttsControls.style.display = 'none';
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
        } else { // stopped
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
});

// 6. ===============================================================================
//    Sistem Artikel Terkait Canggih (Advanced Related Posts)
// ==================================================================================
const advancedRelatedPosts = {
    // --- Konfigurasi ---
    maxPosts: 8,
    containerId: 'iqna-related-posts',
    noImage: "https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/s1600/nth.png",
    title: "<h3>Anda Mungkin Juga Suka</h3>",

    // Fungsi untuk mengambil kata kunci dari judul
    getKeywords: function() {
        const postTitle = document.querySelector('h1.post-title') ? document.querySelector('h1.post-title').innerText.toLowerCase() : '';
        const stopwords = new Set(['di', 'dan', 'yang', 'untuk', 'pada', 'ke', 'dari', 'dengan', 'ini', 'itu', 'adalah', 'dalam', 'juga', 'bisa', 'karena', 'seperti', 'telah', 'akan', 'namun', 'saat', 'sebuah', 'atau', 'lalu', 'saja', 'jika', 'maka', 'sehingga', 'tidak', 'ada', 'memiliki', 'menjadi', 'sebagai', 'saya', 'dia', 'mereka', 'anda', 'kami']);
        const words = postTitle.match(/\b(\w+)\b/g) || [];
        return [...new Set(words.filter(word => word.length > 3 && !stopwords.has(word)))];
    },

    // Fungsi untuk menghitung skor relevansi
    calculateScore: function(post, keywords, currentLabels) {
        let score = 0;
        const postTitle = post.title.$t.toLowerCase();
        const postLabels = post.category ? post.category.map(cat => cat.term) : [];

        // Skor tinggi untuk label yang sama
        currentLabels.forEach(currentLabel => {
            if (postLabels.includes(currentLabel)) {
                score += 10;
            }
        });

        // Skor tambahan untuk kata kunci di judul
        keywords.forEach(keyword => {
            if (postTitle.includes(keyword)) {
                score += 2;
            }
        });
        return score;
    },

    // Fungsi untuk menampilkan hasil
    display: function(posts, keywords, currentLabels) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const currentUrl = document.querySelector('link[rel="canonical"]').href;
        let scoredPosts = [];

        posts.forEach(post => {
            const postUrl = post.link.find(l => l.rel === 'alternate').href;
            if (postUrl !== currentUrl) {
                const score = this.calculateScore(post, keywords, currentLabels);
                if (score > 0) {
                    const image = ('media$thumbnail' in post && post.media$thumbnail.url) ? post.media$thumbnail.url.replace(/\/s\d+(-c)?\//, '/s320-c/') : this.noImage;
                    scoredPosts.push({
                        url: postUrl,
                        title: post.title.$t,
                        image: image,
                        score: score
                    });
                }
            }
        });

        const uniquePosts = Array.from(new Map(scoredPosts.map(item => [item['url'], item])).values());
        uniquePosts.sort((a, b) => b.score - a.score);
        const postsToDisplay = uniquePosts.slice(0, this.maxPosts);

        if (postsToDisplay.length === 0) {
            container.style.display = 'none';
            return;
        }

        let html = this.title;
        html += '<div class="related-posts-grid">';
        postsToDisplay.forEach(post => {
            html += `
                <a class="related-post-item" href="${post.url}" title="${post.title}">
                    <div class="related-post-thumb-container">
                        <img class="related-post-thumb" src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='${this.noImage}';"/>
                    </div>
                    <h4 class="related-post-title">${post.title}</h4>
                </a>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
        container.style.display = 'block';
    },

    // Fungsi utama untuk memulai proses
    init: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const currentLabels = Array.from(document.querySelectorAll('.post-labels a')).map(a => a.innerText);
        if (currentLabels.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = '<p>Mencari artikel terkait...</p>';
        const keywords = this.getKeywords();
        const feedUrl = `/feeds/posts/default?alt=json&max-results=100`;

        fetch(feedUrl)
            .then(response => response.json())
            .then(json => {
                if (json.feed && json.feed.entry) {
                    this.display(json.feed.entry, keywords, currentLabels);
                } else {
                    throw new Error("Format feed tidak valid.");
                }
            })
            .catch(error => {
                console.error("Gagal memuat artikel terkait:", error);
                container.innerHTML = '<p>Gagal memuat artikel terkait.</p>';
            });
    }
};

// 7. ===============================================================================
//    Fungsi Utilitas (Throttle)
// ==================================================================================
/**
 * Mencegah sebuah fungsi dijalankan berulang kali dalam interval waktu tertentu.
 * @param {Function} func Fungsi yang akan di-throttle.
 * @param {number} limit Batas waktu dalam milidetik.
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// 8. ===============================================================================
//    Inisialisasi Skrip Utama
// ==================================================================================
jQuery(window).on('load', function() {

    // Inisialisasi Sticky Sidebar
    if (typeof fixedSidebar !== 'undefined' && fixedSidebar === true && window.innerWidth > 991) {
        jQuery('#sidebar-wrapper').theiaStickySidebar({
            additionalMarginTop: 20,
            additionalMarginBottom: 20
        });
    }

    // Inisialisasi Sistem Artikel Terkait Canggih dengan Throttling
    // Hanya berjalan di halaman postingan
    if (document.body.classList.contains('item-post-wrap')) {
        // Menerapkan throttle pada fungsi init untuk mencegah eksekusi berulang
        const throttledRelatedPosts = throttle(advancedRelatedPosts.init.bind(advancedRelatedPosts), 2000);
        throttledRelatedPosts();
    }
});
