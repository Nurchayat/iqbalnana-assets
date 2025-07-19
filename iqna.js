/**
 * ==================================================================================
 * Skrip Gabungan untuk Tema Blogger Iqbalnana (v3 - Perbaikan Inisialisasi)
 * ==================================================================================
 * Berkas ini berisi gabungan dari berbagai skrip fungsional yang telah dioptimalkan
 * untuk menghindari konflik dan meningkatkan performa.
 *
 * Perubahan v3:
 * - Memperbaiki logika inisialisasi untuk Related Posts dan Widget Mewarnai.
 * - Memastikan setiap modul berjalan secara independen dan hanya saat diperlukan.
 *
 * Daftar Isi:
 * 1. Widget Gambar Mewarnai
 * 2. Fungsi Pengatur Ukuran Font
 * 3. Theia Sticky Sidebar v1.7.0 (Plugin jQuery)
 * 4. Skrip Paginasi
 * 5. Fungsi Text-to-Speech (TTS)
 * 6. Sistem Artikel Terkait (Reliable Related Posts)
 * 7. Skrip Utilitas SEO & Gambar
 * 8. Fungsi UI Tema
 * 9. Inisialisasi Skrip Utama (Diperbaiki)
 * ==================================================================================
 */

// 1. ===============================================================================
//    Widget Gambar Mewarnai
// ==================================================================================
function initializeColoringWidget() {
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
//    Skrip Paginasi
// ==================================================================================
var postResults = 20;
var numOfPages = 5;
var pageOf = ["Hal", "dari"];
var home_page = "/";
var noPage, currentPage, currentPageNo, postLabel;
var locationUrl = location.href;

function pageCurrentBlogger(){function a(a){var b=document.createElement("script");b.src=a,document.head.appendChild(b)}var b=locationUrl;-1!=b.indexOf("/search/label/")&&(postLabel=-1!=b.indexOf("?updated-max")?b.substring(b.indexOf("/search/label/")+14,b.indexOf("?updated-max")):b.substring(b.indexOf("/search/label/")+14,b.indexOf("?&max"))),-1==b.indexOf("?q=")&&-1==b.indexOf(".html")&&(-1==b.indexOf("/search/label/")?(currentPage="page",currentPageNo=-1!=locationUrl.indexOf("#PageNo=")?locationUrl.substring(locationUrl.indexOf("#PageNo=")+8,locationUrl.length):1,a(home_page+"feeds/posts/summary?max-results=1&alt=json-in-script&callback=dataFeed")):(currentPage="label",-1==b.indexOf("&max-results=")&&(postResults=20),currentPageNo=-1!=locationUrl.indexOf("#PageNo=")?locationUrl.substring(locationUrl.indexOf("#PageNo=")+8,locationUrl.length):1,a(home_page+"feeds/posts/summary/-/"+postLabel+"?alt=json-in-script&callback=dataFeed&max-results=1")))}function dataFeed(a){var b=a.feed,c=parseInt(b.openSearch$totalResults.$t,10);startPagination(c)}function startPagination(a){var b,c,d,e,f,g,h="";pageNumber=parseInt(numOfPages/2),pageNumber==numOfPages-pageNumber&&(numOfPages=2*pageNumber+1),pageStart=currentPageNo-pageNumber,pageStart<1&&(pageStart=1),lastPageNo=parseInt(a/postResults)+1,lastPageNo-1==a/postResults&&(lastPageNo-=1),pageEnd=pageStart+numOfPages-1,pageEnd>lastPageNo&&(pageEnd=lastPageNo),h+='<span class="page-of">'+pageOf[0]+" "+currentPageNo+" "+pageOf[1]+" "+lastPageNo+"</span>",c=parseInt(currentPageNo)-1,currentPageNo>1&&(h+=2==currentPageNo?"page"==currentPage?'<a class="page-num page-prev" href="'+home_page+'"></a>':'<a class="page-num page-prev" href="/search/label/'+postLabel+"?&max-results="+postResults+'"></a>':"page"==currentPage?'<a class="page-num page-prev" href="#" onclick="getPage('+c+');return false"></a>':'<a class="page-num page-prev" href="#" onclick="getLabelPage('+c+');return false"></a>'),pageStart>1&&(h+="page"==currentPage?'<a class="page-num" href="'+home_page+'">1</a>':'<a class="page-num" href="/search/label/'+postLabel+"?&max-results="+postResults+'">1</a>'),pageStart>2&&(h+='<span class="page-num page-dots">...</span>');for(d=pageStart;d<=pageEnd;d++)h+=currentPageNo==d?'<span class="page-num page-active">'+d+"</span>":1==d?"page"==currentPage?'<a class="page-num" href="'+home_page+'">1</a>':'<a class="page-num" href="/search/label/'+postLabel+"?&max-results="+postResults+'">1</a>':"page"==currentPage?'<a class="page-num" href="#" onclick="getPage('+d+');return false">'+d+"</a>":'<a class="page-num" href="#" onclick="getLabelPage('+d+');return false">'+d+"</a>";pageEnd<lastPageNo-1&&(h+='<span class="page-num page-dots">...</span>'),pageEnd<lastPageNo&&(h+="page"==currentPage?'<a class="page-num" href="#" onclick="getPage('+lastPageNo+');return false">'+lastPageNo+"</a>":'<a class="page-num" href="#" onclick="getLabelPage('+lastPageNo+');return false">'+lastPageNo+"</a>"),e=parseInt(currentPageNo)+1,currentPageNo<lastPageNo&&(h+="page"==currentPage?'<a class="page-num page-next" href="#" onclick="getPage('+e+');return false"></a>':'<a class="page-num page-next" href="#" onclick="getLabelPage('+e+');return false"></a>'),f=document.getElementsByName("pageArea"),g=document.getElementById("blog-pager");for(p=0;p<f.length;p++)f[p].innerHTML=h;f&&f.length>0&&(h=""),g&&(g.innerHTML=h)}function getPage(a){jsonstart=postResults*(a-1),noPage=a;var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.setAttribute("src",home_page+"feeds/posts/summary?start-index="+jsonstart+"&max-results=1&alt=json-in-script&callback=findPostDate"),b.appendChild(c)}function getLabelPage(a){jsonstart=postResults*(a-1),noPage=a;var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.setAttribute("src",home_page+"feeds/posts/summary/-/"+postLabel+"?start-index="+jsonstart+"&max-results=1&alt=json-in-script&callback=findPostDate"),b.appendChild(c)}function findPostDate(a){post=a.feed.entry[0];var b=post.published.$t.substring(0,19)+post.published.$t.substring(23,29),c=encodeURIComponent(b),d="page"==currentPage?"/search?updated-max="+c+"&max-results="+postResults+"#PageNo="+noPage:"/search/label/"+postLabel+"?updated-max="+c+"&max-results="+postResults+"#PageNo="+noPage;location.href=d}pageCurrentBlogger();


// 5. ===============================================================================
//    Fungsi Text-to-Speech (TTS)
// ==================================================================================
function initializeTTSSystem() {
    if (typeof lucide !== 'undefined') { lucide.createIcons(); }
    if (!('speechSynthesis' in window)) { const ttsControls = document.querySelector('.tts-controls'); if(ttsControls) ttsControls.style.display = 'none'; return; }
    const playStopBtn = document.getElementById('play-stop-btn');
    const articleContent = document.getElementById('article-content');
    if (!playStopBtn || !articleContent) { const ttsControls = document.querySelector('.tts-controls'); if(ttsControls) ttsControls.style.display = 'none'; return; }
    const readableElements = Array.from(articleContent.querySelectorAll('h1, h2, h3, h4, p, li'));
    let currentElementIndex = 0;
    let highlightedElement = null;
    window.speechSynthesis.cancel();
    function play() { window.speechSynthesis.cancel(); currentElementIndex = 0; updateButtonState('speaking'); speakNextElement(); }
    function stop() { window.speechSynthesis.cancel(); resetPlayer(); }
    function speakNextElement() { if (currentElementIndex >= readableElements.length) { resetPlayer(); return; } const element = readableElements[currentElementIndex]; const textToSpeak = element.textContent; if (!textToSpeak.trim()) { currentElementIndex++; speakNextElement(); return; } const utterance = new SpeechSynthesisUtterance(textToSpeak); utterance.lang = 'id-ID'; utterance.rate = 0.9; utterance.onstart = () => { if (highlightedElement) highlightedElement.classList.remove('tts-highlight'); element.classList.add('tts-highlight'); highlightedElement = element; }; utterance.onend = () => { currentElementIndex++; speakNextElement(); }; utterance.onerror = (event) => { console.error("TTS Error:", event); resetPlayer(); }; window.speechSynthesis.speak(utterance); }
    function resetPlayer() { currentElementIndex = 0; if (highlightedElement) { highlightedElement.classList.remove('tts-highlight'); highlightedElement = null; } updateButtonState('stopped'); }
    function updateButtonState(state) { if (state === 'speaking') { playStopBtn.innerHTML = "<i data-lucide='stop-circle'></i><span>Hentikan</span>"; } else { playStopBtn.innerHTML = "<i data-lucide='play'></i><span>Dengarkan</span>"; } if (typeof lucide !== 'undefined') { lucide.createIcons(); } }
    playStopBtn.addEventListener('click', () => { if (window.speechSynthesis.speaking) { stop(); } else { play(); } });
    window.addEventListener('beforeunload', stop);
}

// 6. ===============================================================================
//    Sistem Artikel Terkait (Reliable Related Posts)
// ==================================================================================
const reliableRelatedPosts = {
    maxPosts: 6,
    containerId: 'iqna-related-posts',
    noImage: "https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/s1600/nth.png",
    title: "<h3>Anda Mungkin Juga Suka</h3>",
    display: function(posts) {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        const postsToDisplay = posts.slice(0, this.maxPosts);
        if (postsToDisplay.length === 0) { container.style.display = 'none'; return; }
        let html = this.title;
        html += '<div class="related-posts-grid">';
        postsToDisplay.forEach(post => {
            const image = post.image ? post.image.replace(/\/s\d+(-c)?\//, '/s1600-c/') : this.noImage;
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
        const container = document.getElementById(this.containerId);
        if (!container) return;
        const firstLabelEl = document.querySelector('.post-labels a');
        if (!firstLabelEl) { console.log('Related Posts: No labels found.'); container.style.display = 'none'; return; }
        const firstLabel = firstLabelEl.innerText;
        const currentUrlEl = document.querySelector('link[rel="canonical"]');
        if (!currentUrlEl) { console.log('Related Posts: Canonical URL not found.'); container.style.display = 'none'; return; }
        const currentUrl = currentUrlEl.href;
        const feedUrl = `/feeds/posts/default/-/${encodeURIComponent(firstLabel)}?alt=json-in-script&max-results=10`;
        const callbackName = 'iqnaRelatedCallback';
        window[callbackName] = (json) => {
            if (!json.feed || !json.feed.entry || json.feed.entry.length === 0) { container.style.display = 'none'; return; }
            let allPosts = json.feed.entry
                .map(entry => ({ url: (entry.link.find(l => l.rel === 'alternate') || {}).href, title: entry.title.$t, image: ('media$thumbnail' in entry) ? entry.media$thumbnail.url : null }))
                .filter(post => post.url && post.url !== currentUrl);
            allPosts.sort(() => Math.random() - 0.5);
            this.display(allPosts);
            delete window[callbackName];
            const scriptTag = document.getElementById('related-posts-script');
            if (scriptTag) { scriptTag.parentNode.removeChild(scriptTag); }
        };
        const script = document.createElement('script');
        script.id = 'related-posts-script';
        script.src = `${feedUrl}&callback=${callbackName}`;
        document.head.appendChild(script);
    }
};


// 7. ===============================================================================
//    Skrip Utilitas SEO & Gambar
// ==================================================================================
function initializeUtilities() {
    // --- SEOFIX.JS ---
    document.querySelectorAll("a
