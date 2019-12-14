---
title: Jalur Rendering Penting dan Link Preload
description: Jalur rendering penting dan link preload membuat pengguna melihat konten situs web jauh lebih cepat.
summary: Halo teman-teman, kali ini saya bakalan bahas mengenai jalur rendering penting. Mungkin teman-teman bertanya-tanya, istilah apaan sih itu, kok kedengarannya asing. Sabar teman-teman, pertanyaan itu akan terjawab pada penjelasan selanjutnya. Selain membahas mengenai jalur rendering penting, saya juga bahas mengenai link preload, yang sebenarnya kedua hal tersebut saling berhubungan satu sama lain.
img: /cover/2017/09/jalur-rendering-penting-link-preload-image-by-mike-wilson.jpg
imgCreator: mkwlsn
postedDate: 2017-08-30T11:00:00.000Z
updatedDate: 2017-08-30T11:00:00.000Z
slug: jalur-rendering-penting-link-preload
id: jalur-rendering-penting-link-preload
---

Halo teman-teman, kali ini saya bakalan bahas mengenai jalur _rendering_ penting. Mungkin teman-teman bertanya-tanya, istilah apaan sih itu, kok kedengarannya asing. Sabar teman-teman, pertanyaan itu akan terjawab pada penjelasan selanjutnya. Selain membahas mengenai jalur _rendering_ penting, saya juga bahas mengenai link preload, yang sebenarnya kedua hal tersebut saling berhubungan satu sama lain.

## Jalur _Rendering_ Penting

Untuk memahami apa itu critical _rendering_ path, saya mengutip tulisan Ilya Grigorik di halaman Google Developers: Web Fundamentals,

> A critical resource is a resource that could block initial rendering of the page. The fewer of these resources, the less work for the browser, the CPU, and other resources.

Untuk mendefinisikan jalur rendering penting, kita harus memahami dulu apa itu sumber daya penting atau critical resource. Sumber daya penting adalah sumber daya yang dapat menghalangi _rendering_ awal halaman. Sumber daya tersebut dapat berupa CSS, JavaScript atau font eksternal. Biasanya sumber daya penting tersebut terletak di dalam tag `<head></head>`.

Kemudian yang disebut jalur rendering penting adalah serangkaian even yang harus dilakukan oleh peramban untuk menampilkan tampilan awal sebuah situs web. Contoh even tersebut adalah mendapatkan html, mendapatkan aset (CSS, JavaScript, Gambar, Font), memparse data, menampilkan situs web.

Bayangkan jika ada situs web yang memiliki kode HTML5 seperti berikut,

```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="URL CSS eksternal 1">
  <link rel="stylesheet" href="URL CSS eksternal 2">
  <link rel="stylesheet" href="URL CSS eksternal 3">
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

Di dalam tag `<head></head>` terdapat banyak sekali sumber daya eksternal, belum lagi JavaScript eksternal yang terletak sebelum tag penutup `</body>`. Ada banyak sumber daya eksternal yang harus dimuat terlebih dahulu sehingga pengguna tidak dapat melihat tampilan awal secara langsung.

## Tampilan Awal
Tampilan awal yang dimaksud di sini adalah tampilan yang dilihat pengguna tanpa harus menggulung layar terlebih dahulu. Tampilan awal ini lebih dikenal dengan istilah di atas lipatan atau _[above the fold](https://www.optimizely.com/optimization-glossary/above-the-fold/)_. Sedangkan tampilan di bawahnya disebut di bawah lipatan atau _below the fold_. Untuk lebih memahami istilah di atas lipatan, teman-teman dapat melihat gambar di bawah ini,

<app-img src="/content/2017/09/above-the-fold-blog-amp-image-by-jefrydco.jpg" alt="Above the fold" />

Ketika membuka situs web, pengguna seharusnya sudah dapat melihat tampilan awal secara langsung. Tampilan awal tersebut sesuai dengan _viewport_. Misal pengguna membuka situs web tersebut menggunakan desktop dengan resolusi 1920x1200, maka tampilan awal yang harus dilihat pengguna secara langsung adalah sebesar 1920x1200.

Sedangkan jika pengguna membuka situs web menggunakan ponsel beresolusi 768x1024, maka tampilan awal yang harus dilihat pengguna secara langsung adalah sebesar 768x1024. Sebenarnya _nggak_ pas 1920x1200 atau 768x1024 juga sih, karena kan kepotong sama toolbar peramban. _Tapi_, untuk lebih mudahnya, anggap saja ukurannya sesuai dengan resolusi layar.

Jika teman-teman mengecek halaman yang belum teroptimasi dengan baik menggunakan ]Google PageSpeed Insight](https://developers.google.com/speed/pagespeed/insights/?hl=en), maka teman-teman akan mendapat hasil seperti pada gambar berikut,

<app-img src="/content/2017/09/unoptimized-google-pagespeed-insight-result-image-by-jefrydco.jpg" alt="Unoptimized Google Page Speed Insight result" />

<app-img src="/content/2017/09/render-blocking-content-image-by-jefrydco.jpg" alt="Render blocking content" />

Salah satu peringatan yang dapat dioptimasi adalah menghilangkan pemuatan JavaScript dan CSS yang dapat menghalangi pe-_render_-an konten. Sesuai dengan permasalahan yang saya uraikan di atas, pos kali ini juga bakalan menghilangkan peringatan tersebut dan membuat skor Google PageSpeed situs web teman-teman menjadi lebih baik.

## Solusi
Kita harus membuat tampilan awal dapat dilihat pengguna secara langsung terlebih dahulu, walaupun bagian bawahnya masih belum termuat sempurna. Solusinya adalah dengan menggunakan metode pemisahan CSS. CSS yang digunakan untuk menampilkan tampilan awal dipisah dan diletakkan di dalam tag `<style></style>` secara internal. Kemudian sisanya diletakkan berkas lain dan dimuat menggunakan link preload.

### Pemisahan CSS
Ada beberapa hal yang harus dipersiapkan sebelum pemisahan CSS dilakukan.

### Menggabungkan Semua CSS Eksternal
Pastikan teman-teman telah menggabungkan semua CSS eksternal menjadi satu. Yang perlu diperhatikan ketika menggabungkannya menjadi satu adalah urutan peletakkannya. CSS _framework_ diletakkan paling atas kemudian diikuti CSS lainnya yang bergantung pada CSS _framework_ tersebut.

Contohnya misal situs web teman-teman menggunakan bootstrap dan CSS kustom buatan teman-teman sendiri, urutan ketika digabungkan adalah bootstrap terlebih dahulu kemudian CSS kustom. Mengapa urutan penggabungan CSS sangat penting? Karena ketika CSS dibaca oleh peramban jika terdapat aturan yang sama, maka yang digunakan oleh peramban adalah aturan terakhir.

```css
#selector {
  background-color: blue; // Properti ini akan ditimpa
}
/* CSS lainnya */
#selector {
  background-color: #2196f3; // Properti ini yang digunakan peramban
}
```

### Minify
Jika CSS yang teman-teman gunakan dalam keadaan unminify seperti contoh sebelumnya, silahkan _minify_ terlebih dahulu. Tujuannya agar ukuran CSS menjadi lebih kecil. Teman-teman dapat menggunakan tool berikut untuk melakukan _minify_,

- [CSS Optimizer](https://css.github.io/csso/csso.html)
- [Code Beauty: CSS Beautify and Minify](https://codebeautify.org/css-beautify-minify)

### Pemisahan
Untuk memisahkan CSS antara yang digunakan untuk menampilkan tampilan awal dengan yang tidak, teman-teman dapat menggunakan tool berikut, [Critical Path CSS Generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/) untuk versi gratis dan tool berikut, [Critical CSS](https://criticalcss.com/) untuk versi berbayar.

Silahkan teman-teman mem-_paste_-kan semua CSS yang telah digabungkan dan di-_minify_ tadi ke form di sebelah kiri. _Paste_-kan juga tautan halaman yang ingin dipisahkan CSS-nya. Kemudian silahkan klik tombol Create Critical Path CSS. Setelah proses selesai, akan muncul form baru di sebelah kanan berisi CSS yang digunakan untuk menampilkan tampilan awal. _Copy_ CSS tersebut dan letakkan di dalam tag `<style></style>` secara internal.

**Sebelum Pemisahan**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="URL CSS eksternal 1">
  <link rel="stylesheet" href="URL CSS eksternal 2">
  <link rel="stylesheet" href="URL CSS eksternal 3">
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

**Sesudah Pemisahan**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <style>
    /* Letakkan CSS hasil generate di sini */
  </style>
  <link rel="stylesheet" href="URL CSS eksternal yang telah digabung dan diminify">
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

## Link Preload
Setelah teman-teman berhasil memisahkan CSS antara yang digunakan untuk menampilkan tampilan awal dan yang tidak dan menaruhnya di dalam tag `<style></style>` secara internal. Hal tersebut tidak akan berdampak banyak kalau tidak digabung dengan link preload.

Link preload digunakan untuk memprioritaskan pemuatan suatu sumber daya sebelum peramban selesai memparse dokumen HTML5 seluruhnya. Cara kerjanya adalah ketika peramban menemukan tag link dengan atribut `rel="preload"`, peramban secara langsung memuat sumber daya tersebut namun tidak dieksekusi terlebih dahulu. Setelah selesai memproses dokumen secara keseluruhan, baru memproses sumber daya yang dimuat menggunakan atribut `rel="preload"`.

Untuk menggunakan fitur ini, silahkan teman teman mengubah atribut `rel="stylesheet"` yang ada pada tag link menjadi `rel="preload"`.

*Sebelum Atribut Dirubah*
```html
  <link rel="stylesheet" href="URL CSS eksternal yang telah digabung dan diminify">
```

*Sesudah Atribut Dirubah*
```html
  <link rel="preload" href="URL CSS eksternal yang telah digabung dan diminify">
```

Namun sayangnya fitur atribut `rel="preload"` belum sepenuhnya didukung. Kalaupun didukung, hanya beberapa peramban saja dan itupun versi yang paling mutakhir.

<app-img src="/content/2017/09/can-i-use-rel-preload-image-by-jefrydco.jpg" alt="Can I use rel preload" />

Untuk mengatasinya, kita perlu menggunakan plugin JavaScript bernama [loadCSS](https://github.com/filamentgroup/loadCSS) yang dibuat oleh [Fillament Group](https://filamentgroup.com/). Plugin ini berfungsi untuk memuat CSS eksternal secara asinkron. Maksud dari asinkron di sini, CSS eksternal akan dimuat tidak secara bersamaan dengan pemuatan sumber daya eksternal lainnya.

Dalam hal ini, CSS eksternal akan diprioritaskan sehingga akan dimuat terlebih dahulu. Dengan kata lain, plugin loadCSS ini berfungsi seperti atribut `rel="preload"` untuk peramban yang belum mendukun fitur tersebut. Untuk memasang plugin ini silahkan teman-teman menambahkan tag `<script></script>` baru di bawah tag link preload.

```html
  <link rel="preload" href="URL CSS eksternal yang telah digabung dan diminify">
  <script></script>
```

Kemudian _copy_ dan _paste_-kan kode di bawah ini ke dalam tag `<script></script>` yang baru teman-teman buat tadi,

```javascript
/*! Turn any rel=preload link into rel=stylesheet */
function e(){var e=Array.prototype.slice.call(document.querySelectorAll("link[rel=preload]"),0);e.length>0&&e.forEach(function(e){e.rel="stylesheet"})}
/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
!function(e){var t=function(t,r,n){function a(e){return o.body?e():void setTimeout(function(){a(e)})}function i(){c.addEventListener&&c.removeEventListener("load",i),c.media=n||"all"}var s,o=e.document,c=o.createElement("link");if(r)s=r;else{var l=(o.body||o.getElementsByTagName("head")[0]).childNodes;s=l[l.length-1]}var d=o.styleSheets;c.rel="stylesheet",c.href=t,c.media="only x",a(function(){s.parentNode.insertBefore(c,r?s:s.nextSibling)});var u=function(e){for(var t=c.href,r=d.length;r--;)if(d[r].href===t)return e();setTimeout(function(){u(e)})};return c.addEventListener&&c.addEventListener("load",i),c.onloadcssdefined=u,u(i),c};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),
/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
!function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(t){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),r=0;r<t.length;r++){var n=t[r];"preload"===n.rel&&"style"===n.getAttribute("as")&&(e.loadCSS(n.href,n,n.getAttribute("media")),n.rel=null)}},!t.support()){t.poly();var r=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){t.poly(),e.clearInterval(r)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(r)})}}}(this),window.addEventListener("load",e,!1)
```

Sehingga secara keseluruhan menjadi seperti berikut,

```html
<!DOCTYPE html>
<html>
<head>
  <title>Judul Halaman</title>
  <meta charset="utf-8">
  <style>
    /* Letakkan CSS hasil generate di sini */
  </style>
  <link rel="preload" href="URL CSS eksternal yang telah digabung dan diminify">
  <script>
  /*! Turn any rel=preload link into rel=stylesheet */
function e(){var e=Array.prototype.slice.call(document.querySelectorAll("link[rel=preload]"),0);e.length>0&&e.forEach(function(e){e.rel="stylesheet"})}
  /*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
!function(e){var t=function(t,r,n){function a(e){return o.body?e():void setTimeout(function(){a(e)})}function i(){c.addEventListener&&c.removeEventListener("load",i),c.media=n||"all"}var s,o=e.document,c=o.createElement("link");if(r)s=r;else{var l=(o.body||o.getElementsByTagName("head")[0]).childNodes;s=l[l.length-1]}var d=o.styleSheets;c.rel="stylesheet",c.href=t,c.media="only x",a(function(){s.parentNode.insertBefore(c,r?s:s.nextSibling)});var u=function(e){for(var t=c.href,r=d.length;r--;)if(d[r].href===t)return e();setTimeout(function(){u(e)})};return c.addEventListener&&c.addEventListener("load",i),c.onloadcssdefined=u,u(i),c};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),
  /*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
!function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(t){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),r=0;r<t.length;r++){var n=t[r];"preload"===n.rel&&"style"===n.getAttribute("as")&&(e.loadCSS(n.href,n,n.getAttribute("media")),n.rel=null)}},!t.support()){t.poly();var r=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){t.poly(),e.clearInterval(r)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(r)})}}}(this),window.addEventListener("load",e,!1)
  </script>
  <script src="URL JavaScript eksternal 1"></script>
  <script src="URL JavaScript eksternal 2"></script>
  <script src="URL JavaScript eksternal 3"></script>
</head>
<body>
  <!-- Konten -->
  <script src="URL JavaScript eksternal 4"></script>
  <script src="URL JavaScript eksternal 5"></script>
</body>
</html>
```

Oke cukup sekian pembahasan mengenai jalur _rendering_ penting dan link preload kali ini. Kode di atas masih belum teroptimasi dengan baik karena masih terdapat beberapa JavaScript eksternal. Pada pos selanjutnya saya akan bahas mengenai cara menggabungkan beberapa JavaScript eksternal tersebut dengan lebih aman. Semoga bermanfaat dan tetap semangat untuk terus belajar.

## Referensi
1. [Github Fillament Group: loadCSS](https://github.com/filamentgroup/loadCSS)
2. [Google Developers Web Fundamentals: Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
3. [Google Developers Web Fundamentals: Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path)
4. [Google Developers Web: Prioritizing Your Resources with link rel='preload'](https://developers.google.com/web/updates/2016/03/link-rel-preload)
5. [Medium: Understanding the critical rendering path, rendering pages in 1 second](https://medium.com/@luisvieira_gmr/understanding-the-critical-rendering-path-rendering-pages-in-1-second-735c6e45b47a)
6. [Mozilla Developers Network: Preloading content with rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)
7. [Optimizely: Above the Fold](https://www.optimizely.com/optimization-glossary/above-the-fold/)
8. [Varvy: Critical rendering path](https://varvy.com/pagespeed/critical-render-path.html)
