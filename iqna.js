/**
 * ==================================================================================
 * Skrip Gabungan untuk Tema Blogger Iqbalnana (v8 - Perbaikan Sticky & Paginasi)
 * ==================================================================================
 * Berkas ini berisi gabungan dari berbagai skrip fungsional yang telah dioptimalkan
 * untuk menghindari konflik dan meningkatkan performa.
 *
 * Perubahan v8:
 * - [PERBAIKAN] Mengembalikan skrip Theia Sticky Sidebar yang hilang.
 * - [PERBAIKAN] Mengembalikan skrip Paginasi kustom yang hilang.
 * - Penomoran ulang dan penataan ulang komentar untuk kejelasan.
 *
 * Daftar Isi:
 * 1. Sistem Artikel Terkait (Reliable Related Posts)
 * 2. Widget Gambar Mewarnai
 * 3. Theia Sticky Sidebar v1.7.0
 * 4. Skrip Paginasi Kustom
 * 5. Fungsi Pengatur Ukuran Font
 * 6. Fungsi Text-to-Speech (TTS)
 * 7. Fungsi UI Tema (Menu, Search, Back to Top)
 * 8. Inisialisasi Utama
 * ==================================================================================
 */

// 1. ===============================================================================
//    Sistem Artikel Terkait (Reliable Related Posts)
// ==================================================================================
const reliableRelatedPosts = {
    // --- KONFIGURASI ---
    maxPosts: 6,
    containerId: 'iqna-related-posts',
    title: "<h3>Anda Mungkin Juga Suka</h3>",
    preferredLabels: ["Kesehatan dan Kebugaran", "Marga Satwa", "Novel Mini", "Cerita Misteri", "Cerita Rakyat", "Fantasi", "Fabel", "Cerpen Anak", "Dongeng Anak", "Cerita Pendek", "Dongeng", "Cerita Fiksi", "Teknologi", "Gaya Hidup", "Kiat dan edukasi", "Kreatifitas", "Pengembangan Diri", "Fakta Menarik", "Hiburan", "Fashion", "Ekonomi dan Keuangan", "Sosial Politik"],

    // Peta gambar default berdasarkan kategori untuk artikel terkait
    categoryImages: {
        "Background": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0DFyD45mRWSfI0K3CnCTsoQr2LnC_jaf-aYIqqmTx1oqPCmJgjxGfy8CBwZGmaERRJj4rInDCr-YqULxt_NGkUHMXdPmd0HCRO6xKTSxx4wnv2OEczY0-_udqYvOsU567OpBes41KhpxPDlc6N4_6UXfNDnx4ufWL3wmobpXparqdYXXF2PHaUSrEy-I/s320-c/Background.webp",
        "Cerita Fiksi": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxlzFZJpJ6AvqhFIcUVjsvghSdaTiltGUWsudfDQCjB_Oboa9g8c8x1FlfaROuzWSqqOr3ohtLrZZguwSkqYiilYbLOGmPM9ZaVWuBZa4Ibt2J-TaR0-A1GXnrKT9wHioc7xZGOIMNvVh09QU43bm7LrUoLksiS19y5pwdP3fIkSi4Rv1f0RXTCrbonE/s320-c/Cerita%20Pendek%20dongeng%20anak%20fantasy.webp",
        "Dongeng": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxlzFZJpJ6AvqhFIcUVjsvghSdaTiltGUWsudfDQCjB_Oboa9g8c8x1FlfaROuzWSqqOr3ohtLrZZguwSkqYiilYbLOGmPM9ZaVWuBZa4Ibt2J-TaR0-A1GXnrKT9wHioc7xZGOIMNvVh09QU43bm7LrUoLksiS19y5pwdP3fIkSi4Rv1f0RXTCrbonE/s320-c/Cerita%20Pendek%20dongeng%20anak%20fantasy.webp",
        "Dongeng Anak": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxlzFZJpJ6AvqhFIcUVjsvghSdaTiltGUWsudfDQCjB_Oboa9g8c8x1FlfaROuzWSqqOr3ohtLrZZguwSkqYiilYbLOGmPM9ZaVWuBZa4Ibt2J-TaR0-A1GXnrKT9wHioc7xZGOIMNvVh09QU43bm7LrUoLksiS19y5pwdP3fIkSi4Rv1f0RXTCrbonE/s320-c/Cerita%20Pendek%20dongeng%20anak%20fantasy.webp",
        "Cerita Pendek": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxlzFZJpJ6AvqhFIcUVjsvghSdaTiltGUWsudfDQCjB_Oboa9g8c8x1FlfaROuzWSqqOr3ohtLrZZguwSkqYiilYbLOGmPM9ZaVWuBZa4Ibt2J-TaR0-A1GXnrKT9wHioc7xZGOIMNvVh09QU43bm7LrUoLksiS19y5pwdP3fIkSi4Rv1f0RXTCrbonE/s320-c/Cerita%20Pendek%20dongeng%20anak%20fantasy.webp",
        "Cerpen Anak": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxlzFZJpJ6AvqhFIcUVjsvghSdaTiltGUWsudfDQCjB_Oboa9g8c8x1FlfaROuzWSqqOr3ohtLrZZguwSkqYiilYbLOGmPM9ZaVWuBZa4Ibt2J-TaR0-A1GXnrKT9wHioc7xZGOIMNvVh09QU43bm7LrUoLksiS19y5pwdP3fIkSi4Rv1f0RXTCrbonE/s320-c/Cerita%20Pendek%20dongeng%20anak%20fantasy.webp",
        "Fantasi": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxlzFZJpJ6AvqhFIcUVjsvghSdaTiltGUWsudfDQCjB_Oboa9g8c8x1FlfaROuzWSqqOr3ohtLrZZguwSkqYiilYbLOGmPM9ZaVWuBZa4Ibt2J-TaR0-A1GXnrKT9wHioc7xZGOIMNvVh09QU43bm7LrUoLksiS19y5pwdP3fIkSi4Rv1f0RXTCrbonE/s320-c/Cerita%20Pendek%20dongeng%20anak%20fantasy.webp",
        "Cerita Rakyat": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjPA6AdWt1lAP0B5duz2BBJ8_XsksrPhcAawa0Weph3HTSaZMbrdyV8DKhZ2urI3zZWDGV3P-69vNc95J6iDmZkDFTJduv65tz9SzqDlXNmZuWBCUZ92tLouWtDNp0BzDr9PPHij3f4l0QW8Jg6km7eI54xZVx3TTE7YOLBg6cMhvBG-eWRM_L0NoK4Kj8/s320-c/Cerita%20Rakyat.webp",
        "Cerpen Misteri": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiH5_N028g8GC9roORnPiNzSHWqSImSaPHEORxc_34a0EgY5poDKpRbo0Y1TswsuhQ3T5Mcy2WxQWSTx2hdpWxq4pZ3CydscyroaM7wPbk_8SW4Z93BnNj74f0a_7c73p9T3XMgw463GAukqEICq8FASB7xUe8NbQhvqWfADdPfosjt4csi9RsGIcK8BNg/s320-c/Cerpen%20Misteri.webp",
        "Ekonomi dan Keuangan": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJjiXlyDkdHdOAA4tNzwmUnLx5cajU0PrUkIXz0ke78T52EqcTgTzpk2tXhiym6IOnRQmUetnxhR7FQqJx4eQTVfrKmdA-I1f-weMGujXQZaklwOrFySS8AXJTyhdA8akRad6cGBupfA7MzVpIDwPIqmn8_AjQvbJFNakV8i3RmKGginKX8vTj_ovIwxc/s320-c/Ekonomi%20dan%20Keuangan.webp",
        "Fabel": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgl9_7aGHiDLMFGOQXzGAnd4nd-ivt76DbQeguoeesnShrGnkwsGnOaj_mELRdIV7-77XGx9tJ7Lfy0DFcyxeCjUJ4i2VHO1Gxv_9ZumdsOcyNY3_EtKbEgKBRgUlL3EelK5IWG4gzzqp9WksfxIkFxd7dlOl6qj59KcLDPtqttDAjJ6nLMjSE9C-5E2Rg/s320-c/fabel%20margasatwa.webp",
        "Fakta Menarik": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5ys4JeEOLxRg4dCKLkfUi4fzhfS5NEh_pPj6z6aCvKH6mHympHDosO49dM9mJDwCiZXEaheiMvoflXA2A0dzZzcC12k6pD0cU487E2QsiX37Ahj0dXtwzizwdajwWhasxu3SC_8hWC9zt4mF7p_kPkuSfHQic2TrMXyVsXQASDEt_K8d0ZaaMnROvHI8/s320-c/Fakta%20Menarik.webp",
        "Fashion": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxEMURvSo1KsErAIx7z1qiZC_YfXRhqeZJpjB7l4lOgo6ekhzxShl85625-Bhf4vut9ObmYxkCSSDMWBWU2a1TASJTiqonImitZ6YX_rjOaupNxx0qPj5QcQYjHEoMEN0y-mJCCMFS-hSOVavIgQeEAeF4kovZnDU1JZyJ0xE5K3sSySykj9J4ENJgnCo/s320-c/Fashion.webp",
        "Game": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRmbkdJ1kkeoyvYt7amOum3fJR-SuTfkVU_NbmhghBomxO_HaQLualR-5pDMate7eOK6HMKjNSJT0y-4QUxxbfl6WDCBqhKINKSpK7ka_zRijecGtG7kJ5xYPCf_XArlGlRM3yAYRmZhYBeiXv5iGlbcKO1gyEuHjip54rOnl4xwG6vITBoEFmD_mIjL4/s320-c/Game.webp",
        "Gaya Hidup": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-xs7H4itXQDmrAWvx69Y1bQtJ1NK2SfvYpOvdlxYR20iYCD389_W4GfNnDqUUKMVNhchkgv0bqf2HqFkZGxIJpYv0DMmkixDsdd7ujc_ucfHHKqjyboOft92LHG2B6cv5500Ll7DaIZrTes7I_6UYfOjWl_aKH7BH3AM4svXZZXT6yFm9zrCWE2uKPdo/s320-c/Gaya%20Hidup%20Kesehatan.webp",
        "Kesehatan dan Kebugaran": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-xs7H4itXQDmrAWvx69Y1bQtJ1NK2SfvYpOvdlxYR20iYCD389_W4GfNnDqUUKMVNhchkgv0bqf2HqFkZGxIJpYv0DMmkixDsdd7ujc_ucfHHKqjyboOft92LHG2B6cv5500Ll7DaIZrTes7I_6UYfOjWl_aKH7BH3AM4svXZZXT6yFm9zrCWE2uKPdo/s320-c/Gaya%20Hidup%20Kesehatan.webp",
        "Handphone": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtEH4Iuj23XiyEj1MwQ32nrwofRWSvurEynGlDJKZ7lUSVbzLffxSbHy-4GSOMEfc2s6VkULZKS4gPts4KWBfOESr2YacN6SFfCfhWGX9H8quTxU9kMzvMRKLM1AMGxMfIwquJ7k0q1ughHdgWi4_LYVj-FIjIjnx6mYEurZvWxtgWHsxagvbnfDeZmVA/s320-c/Handphone-%20Ponsel.webp",
        "Ponsel": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtEH4Iuj23XiyEj1MwQ32nrwofRWSvurEynGlDJKZ7lUSVbzLffxSbHy-4GSOMEfc2s6VkULZKS4gPts4KWBfOESr2YacN6SFfCfhWGX9H8quTxU9kMzvMRKLM1AMGxMfIwquJ7k0q1ughHdgWi4_LYVj-FIjIjnx6mYEurZvWxtgWHsxagvbnfDeZmVA/s320-c/Handphone-%20Ponsel.webp",
        "Hiburan": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRPSyOfVikC4ikaEFOFni4fMdAGfa0Qt2MrPQG9OaniBZm83XdcWc_ridbIi58kx0ygkPjnsUuMrasVMDQnuc4-30ORwEDw7t48rns5AJ4zLERGDB3hi682nm4FhHl-UOsembLg5q989bTbzl_7UbnDuzooXfInV5S-yN-Ai8S6SPR0_JJiNmNtNEldaE/s320-c/Hiburan.webp",
        "Kiat dan Edukasi": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnqBYvq9mErIXBGtPJ1hCTuexYk1AB-Xwm6hGuCrzGmQyWcRkPfuyUTSxaxsmytpoU51fB6ngqVguagQ6zqlu1IsKl61jaRXCO0iiZdURoKyCRIf96bHhGEwDU8kfQp_s-m6Wo3q2tbn3TmL0aBeZ7E5MqZzMYc0TTWHbpkxap32hMnfpZ-9hptooixw8/s320-c/Kiat%20Edukasi.webp",
        "Kisah dan Inspirasi": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5Z8nrCm6bqDglioXzM2L-VLt_3tIKehc07nWOpmIfIhc3YLbudSzW8ul6z1HkhxuNivMsdWbzcsa8Euv12IdUjUt3iz4TbHqpDD-TZvb0yQE4ULpVeux2xc4wkMy0enVKXyulPm5mdFzXqyXipXwxmrVpPAG5iSStyJW-8SEmGgTUUkBIrmh3DZ7hNTQ/s320-c/Kisah%20dan%20Inspirasi.webp",
        "Kreatifitas": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcL7V6gifi-CiPmgi_xKydcIzsDEqCjI91SaOFNSuEqPklPtgsTVpBnqVD6GyF73AsgwhkCnrVP0QWcy5sOyaCnswZVv9jN1XxvthQ_PlcvBvnxGhnDWcDZWlrY-_8Lq37Xf8uhEO1usvCTDrioy1fJWBK1XEG_shdpvmakUo05tQxTLU24SPEGGJbeIA/s320-c/Kreatifitas.webp",
        "Marga Satwa": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2zTH38DCW5sLXpkeU4QFsm-XZM3gz1Tf1vv9iguhyphenhyphenA86Hd-bYrFTPAkW1ZBFq9ZwpxVPMkvZWZXixm1PeosI4k4tdKl9rgMnfxp7v3HSS9EIGNNgLXWqXAYaUuQ3hbuUdHwhnSO1wRY6j6R40PbRi8WIDIbxejQqg9wUS_ioPu0RFA8w8H4asS8CiXms/s320-c/marga%20satwa.webp",
        "Mewarnai Gambar": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEZoffF7cbDNRX5TLy5qc7TIvTak_gIZYO0v1gdiMq4pZ0v7Oczlig_jtVpiRemhlXfIh7wO0cA_TQRocDtp8zZYyMxlt-eP2pvx7jNqWj_2sByxH6XxilAXw59vLOAWOpGMSpIjPnSwkHVDGwF9CkJ10vMBamQeeMXhVkIkhsKMTEBuuveYDMHf3CnLK0/s320-c/1000436943.png",
        "Novel Mini": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjz97FLjvUaEsnpUOlAP16rEus60J3bCImxeLsF10muPoLR2E45e0HLJVwYQm-JogsXjSP2zcdbjERN1JX8GnxYqFg1Qqaf54XNJPb06gBSBV-XeV3xPH2VR4waW_qUdtPQ5x7mx4opax9ORU-UyfwoIa2gSitQD9W9xwWa7tAMSngPhyv3_rVYP12TLsU/s320-c/Novel%20Mini.webp",
        "Opini": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlfiSD_Hgh1TyYnP9_dOwi-9FkIRKr6eUISjdSvV1f5v4vMYMfspAEyFm-_Gfj1Vjog5Cu99z1-WorGltISbyqnrHo4mEoTrTHQllEyUnBz8d2xYwLfz_dmV2s8HymixJyzzjbIhrBe7-kB1aTvE8QWqxZt03rEKC9op_u1Y71JyQWtKsJ9GpLVUT-D1w/s320-c/Opini.webp",
        "PC": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1ERoaNDKgEspqox7RuPFQzVbaEZYttXKYAzSQnytRdejgb_leEDPQV4MI_Y91lSDHz38ggjdlt8uNf2mMvnFux2wi704UW6ZS-f0QTDy-_VhqxIcpJPUVyeI-6_Rny2T7ASpyod94qAbRFq-9axZhKW_qhWti-SdAmiN-fcDRvQ3xk-D9RqZCu9wtKxQ/s320-c/PC.webp",
        "Pengembangan Diri": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixKbdGnN9QbskTNUNwYjgpC53mouf_PZVpnRsqEVObLhiCvvIrpSLduZAMRbWhDQ-TfisIpou_DOCzJ5SjImkMzqu5w55J7IsMmyNGjHiNhViTIXKJgreqo4mJxk5jXa3DEvMcqpoTvwxaQYO8MSMxvzzfOUER-9UdJl3SckWZeBIm45IxyZIEZkxpJ_c/s320-c/Pengembangan%20Diri.webp",
        "Sains dan Alam": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvNp6sRQeMZBnM_Aegsrye-u0w4SMcRAk7DLa88JiZaaXxKoTKm-gmvQ7ZNFwlsXSFVXaMnOELpsiZmyV80jTJd2ht_67bxMFgqybuI4UplrEEdOKMzSreyINKjqGa6WmBpYu4Bf21shP2uSM4tZ2GaFnSj1weFihMga6tYCNYo9IcAYiX6danHOO6Pdg/s320-c/Sains%20dan%20Alam.webp",
        "Sinopsis Film": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkSBuMEcOY-_gTEYITxJyOEp96gh9dbk3cLFWSMwF8wER1gbZ6S_UhipQ0Iay16oDW0Mz6DyXhzXL84GfCbtQtx3t04qIUXMxySJD2BvoEcEbn1NMifUxcPhz-gSEOsGgg8L0e74nYTabLSvAh35Uo0MHjqH78khlo5VtgR0FplPdgUsb8UiY__BMDCLM/s320-c/Sinopsis%20Film.webp",
        "Sosial Politik": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcPJIvOycCkeLMgZ7nwiUDKaCJPalA8NM33efJDC7Aa0_Rfd-fynZgXTasFBxywP7shhgZhSrix-QOxlhyphenhyphenIvu3Zp68OIy5TJH8QWN97FwkdoX2_f6WDq6-KdCg6PoPso5GYcqMEl10qlzl0OamSoXCIw_NCYbPUITERczgODglTRW7MG7eo_SvwWCzgrw/s320-c/Sosial%20Politik.webp",
        "Teknologi": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3iy5_ERRG5WkLPsrzXUcmHKnsWFnKco8JGUrVK9gTARJZJZRK1AcaBK4w8TlspwCYXavzSFMU20kN1dAkBdeObRsd09Rb5dWF4o03mFUR7BK28Lv9HhjlQjva0yRLarAOara0YEFufLAnXQn_p6KTSOJetqNuUMXetO4Kufk0ByiNppoyKDR2GRh3K7U/s320-c/Teknologi.webp",
        "default": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjZDYLebIHbNbI5eWkxHlk-5sxfNbJ_eWwuDzkrE23uw8400UHNlavzf2Jwlfdd_MUkn5h5XBBUonTes9gLaMtgX2Jl8aHFcphnQtpDAGOT9SB1sPx-EdPwUTYE1dzTh1f8ZjtkcmUfvT_8T7__G9LZ7In87yu6luqKnbzIfjoWQ6OEU526ikMZRrvB2pp/s320-c/surat-online.jpg"
    },

    display: function(posts, chosenLabel) {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        const postsToDisplay = posts.slice(0, this.maxPosts);
        if (postsToDisplay.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        const fallbackImage = this.categoryImages[chosenLabel] || this.categoryImages.default;

        let html = this.title;
        html += '<div class="related-posts-grid">';
        postsToDisplay.forEach(post => {
            const image = post.image ? post.image.replace(/\/s\d+(-c)?\//, '/s320-c/') : fallbackImage;
            html += `
                <a class="related-post-item" href="${post.url}" title="${post.title}">
                    <div class="related-post-thumb-container">
                        <img class="related-post-thumb" src="${image}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='${this.categoryImages.default}';"/>
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

        const postLabels = Array.from(allLabelEls).map(el => el.innerText);
        for (const preferred of this.preferredLabels) {
            if (postLabels.includes(preferred)) {
                chosenLabel = preferred;
                break;
            }
        }

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
            this.display(allPosts, chosenLabel);

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
//    Theia Sticky Sidebar v1.7.0
// ==================================================================================
(function($){$.fn.theiaStickySidebar=function(options){var defaults={'containerSelector':'','additionalMarginTop':0,'additionalMarginBottom':0,'updateSidebarHeight':true,'minWidth':0,'disableOnResponsiveLayouts':true,'sidebarBehavior':'modern','defaultPosition':'relative','namespace':'TSS'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');$(document).on('scroll.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).on('resize.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;var existingStylesheet=$('#theia-sticky-sidebar-stylesheet-'+options.namespace);if(existingStylesheet.length===0){$('head').append($('<style id="theia-sticky-sidebar-stylesheet-'+options.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))}$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({'position':o.options.defaultPosition,'overflow':'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.theiaStickySidebar');if(o.stickySidebar.length==0){var javaScriptMIMETypes=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find('script').filter(function(index,script){return script.type.length===0||script.type.match(javaScriptMIMETypes)}).remove();o.stickySidebar=$('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.sidebar.offset().top;var containerBottom=o.sidebar.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=(o.stickySidebar.outerHeight()+offsetTop+offsetBottom)<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){var scrollLeft=$(document).scrollLeft();o.stickySidebar.css({'position':'fixed','width':getWidthForObject(o.stickySidebar)+'px','transform':'translateY('+top+'px)','left':(o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))-scrollLeft)+'px','top':'0px'})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.transform='translateY('+(scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+'px)';css.top='0px'}css.width=getWidthForObject(o.stickySidebar)+'px';css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).on('scroll.'+o.options.namespace,function(o){return function(){o.onScroll(o)}}(o));$(window).on('resize.'+o.options.namespace,function(o){return function(){o.stickySidebar.css({'position':'static'});o.onScroll(o)}}(o));if(typeof ResizeSensor!=='undefined'){new ResizeSensor(o.stickySidebar[0],function(o){return function(){o.onScroll(o)}}(o))}function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({'position':'static','width':'','transform':'none'})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}function getWidthForObject(object){var width;try{width=object[0].getBoundingClientRect().width}catch(err){}if(typeof width==="undefined"){width=object.width()}return width}return this}})(jQuery);

// 4. ===============================================================================
//    Skrip Paginasi Kustom
// ==================================================================================
var postResults=postPerPage;var numOfPages=2;var pageOf=["Page","of"];eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 K;5 m;5 l;5 w;5 s=1p.9;5 y="/";1d();G 1b(a){5 b=\'\';J=M(W/2);4(J==W-J){W=J*2+1}D=l-J;4(D<1)D=1;j=M(a/n)+1;4(j-1==a/n)j=j-1;E=D+W-1;4(E>j)E=j;b+=\'<C 6="3-1u">\'+17[0]+\' \'+l+\' \'+17[1]+\' \'+j+\'</C>\';5 c=M(l)-1;4(l>1){4(l==2){4(m==\'3\'){b+=\'<a 6="3-7 3-U" 9="\'+y+\'"></a>\'}h{b+=\'<a 6="3-7 3-U" 9="/v/u/\'+w+\'?&i-o=\'+n+\'"></a>\'}}h{4(m==\'3\'){b+=\'<a 6="3-7 3-U" 9="#" z="L(\'+c+\');B x"></a>\'}h{b+=\'<a 6="3-7 3-U" 9="#" z="I(\'+c+\');B x"></a>\'}}}4(D>1){4(m=="3"){b+=\'<a 6="3-7" 9="\'+y+\'">1</a>\'}h{b+=\'<a 6="3-7" 9="/v/u/\'+w+\'?&i-o=\'+n+\'">1</a>\'}}4(D>2){b+=\'<C 6="3-7 3-16">...</C>\'}1a(5 d=D;d<=E;d++){4(l==d){b+=\'<C 6="3-7 3-1v">\'+d+\'</C>\'}h 4(d==1){4(m==\'3\'){b+=\'<a 6="3-7" 9="\'+y+\'">1</a>\'}h{b+=\'<a 6="3-7" 9="/v/u/\'+w+\'?&i-o=\'+n+\'">1</a>\'}}h{4(m==\'3\'){b+=\'<a 6="3-7" 9="#" z="L(\'+d+\');B x">\'+d+\'</a>\'}h{b+=\'<a 6="3-7" 9="#" z="I(\'+d+\');B x">\'+d+\'</a>\'}}}4(E<j-1){b+=\'<C 6="3-7 3-16">...</C>\'}4(E<j){4(m=="3"){b+=\'<a 6="3-7" 9="#" z="L(\'+j+\');B x">\'+j+\'</a>\'}h{b+=\'<a 6="3-7" 9="#" z="I(\'+j+\');B x">\'+j+\'</a>\'}}5 e=M(l)+1;4(l<j){4(m==\'3\'){b+=\'<a 6="3-7 3-15" 9="#" z="L(\'+e+\');B x"></a>\'}h{b+=\'<a 6="3-7 3-15" 9="#" z="I(\'+e+\');B x"></a>\'}}b+=\'\';5 f=A.1s(\'1t\');5 g=A.1r(\'1A-1D\');1a(5 p=0;p<f.O;p++){f[p].1c=b}4(f&&f.O>0){b=\'\'}4(g){g.1c=b}}G 12(a){5 b=a.1f;5 c=M(b.1E$1B.$t,10);1b(c)}G 1d(){5 a=s;4(a.k(\'/v/u/\')!=-1){4(a.k(\'?T-i\')!=-1){w=a.H(a.k(\'/v/u/\')+14,a.k(\'?T-i\'))}h{w=a.H(a.k(\'/v/u/\')+14,a.k(\'?&i\'))}}4(a.k(\'?q=\')==-1&&a.k(\'.1C\')==-1){4(a.k(\'/v/u/\')==-1){m=\'3\';4(s.k(\'#F=\')!=-1){l=s.H(s.k(\'#F=\')+8,s.O)}h{l=1}A.18(\'<r Q=\\\'\'+y+\'P/R/N?i-o=1&X=Y-S-r&V=12\\\'><\\/r>\')}h{m=\'u\';4(a.k(\'&i-o=\')==-1){n=1F}4(s.k(\'#F=\')!=-1){l=s.H(s.k(\'#F=\')+8,s.O)}h{l=1}A.18(\'<r Q="\'+y+\'P/R/N/-/\'+w+\'?X=Y-S-r&V=12&i-o=1" ><\\/r>\')}}}G L(a){Z=(a-1)*n;K=a;5 b=A.1h(\'1q\')[0];5 c=A.1o(\'r\');c.1e=\'1m/1n\';c.1i(\'Q\',y+\'P/R/N?1j-1k=\'+Z+\'&i-o=1&X=Y-S-r&V=13\');b.1l(c)}G I(a){Z=(a-1)*n;K=a;5 b=A.1h(\'1q\')[0];5 c=A.1o(\'r\');c.1e=\'1m/1n\';c.1i(\'Q\',y+\'P/R/N/-/\'+w+\'?1j-1k=\'+Z+\'&i-o=1&X=Y-S-r&V=13\');b.1l(c)}G 13(a){11=a.1f.1x[0];5 b=11.1g.$t.H(0,19)+11.1g.$t.H(1z,1w);5 c=1y(b);4(m==\'3\'){5 d=\'/v?T-i=\'+c+\'&i-o=\'+n+\'#F=\'+K}h{5 d=\'/v/u/\'+w+\'?T-i=\'+c+\'&i-o=\'+n+\'#F=\'+K}1p.9=d}',62,104,'|||page|if|var|class|num||href||||||||else|max|lastPageNo|indexOf|currentPageNo|currentPage|postResults|results|||script|locationUrl||label|search|postLabel|false|home_page|onclick|document|return|span|pageStart|pageEnd|PageNo|function|substring|getLabelPage|pageNumber|noPage|getPage|parseInt|summary|length|feeds|src|posts|in|updated|prev|callback|numOfPages|alt|json|jsonstart||post|dataFeed|findPostDate||next|dots|pageOf|write||for|startPagination|innerHTML|pageCurrentBlogger|type|feed|published|getElementsByTagName|setAttribute|start|index|appendChild|text|javascript|createElement|location|head|getElementById|getElementsByName|pageArea|of|active|29|entry|encodeURIComponent|23|blog|totalResults|html|pager|openSearch|20'.split('|'),0,{}));

// 5. ===============================================================================
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


// 6. ===============================================================================
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

// 7. ===============================================================================
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


// 8. ===============================================================================
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
