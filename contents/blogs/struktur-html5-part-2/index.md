---
title: Struktur HTML5 yang Baik - Bagian 2
description: Struktur HTML5 yang baik dapat membuat dokumen HTML lebih mudah dipahami baik oleh manusia maupun oleh mesin pencari.
summary: Halo teman-teman, kali ini saya lanjutin pembahasan kemarin mengenai struktur HTML5 yang baik. Setelah kemarin mengulas mengenai struktur HTML5 mulai bagian deklarasi tipe HTML hingga tag penutup </head>, sekarang pembahasannya dimulai dari tag pembuka <body> hingga tag penutup HTML </html>.
img: /cover/2017/08/struktur-html5-image-by-sai-kiran-anagani.jpg
imgCreator: _imkiran
postedDate: 2017-08-30T11:00:00.000Z
updatedDate: 2017-08-30T11:00:00.000Z
slug: struktur-html5-part-2
id: struktur-html5-part-2
---

> Baca bagian pertama di sini, [Struktur HTML5 yang Baik - Bagian 1](/blog/struktur-html5-part-1)

Halo teman-teman, kali ini saya lanjutkan pembahasan kemarin mengenai struktur HTML5 yang baik. Setelah kemarin mengulas mengenai struktur HTML5 mulai bagian deklarasi tipe HTML hingga tag penutup `</head>`, sekarang pembahasannya dimulai dari tag pembuka `<body>` hingga tag penutup HTML `</html>`.

Sebelumnya saya ingin mengingatkan sekali lagi bahwa tujuan dibuatnya HTML5 adalah agar WWW lebih bermakna dan mudah dimengerti, baik oleh manusia maupun mesin pencari. Karena itulah, terdapat beberapa tag baru yang mendefinisikan sesuatu spesifik sesuai dengan fungsinya.

Struktur HTML5 kali ini baik digunakan untuk _website_ berupa blog. Sedangkan untuk _website_ lainnya, silahkan teman-teman berkreasi sendiri dengan tetap memperhatikan kaidah-kaidah yang dibuat oleh [W3 Consortium](https://www.w3.org/consortium/).

```html
<body>
  <section>
```

Tag body digunakan untuk mendefinisikan konten dari suatu dokumen HTML5, konten tersebut dapat berupa teks, tautan, gambar, video, musik, _macem-macem_ deh pokoknya. Secara _default_, semua yang ada di dalam tag body dapat kita lihat secara langsung hasilnya melalui peramban.

Kemudian tag section digunakan untuk menandai bagian tertentu pada dokumen HTML5, bagian di sini dapat berupa bab, header, footer atau bagian lain dalam satu dokumen.

```html
    <header>
      <nav>
        <!-- Navigasi Halaman -->
      </nav>
      <h1>
        <!-- Judul Halaman -->
      </h1>
    </header>
```

Tag header digunakan untuk mendefinisikan bagian awal konten, dapat juga berupa tautan navigasi, judul halaman, dan logo _website_. kita dapat menggunakan tag header berkali-kali dalam satu dokumen HTML5. Namun terdapat pengecualian untuk peletakan tag ini, kita tidak diperbolehkan menggunakan tag header di dalam tag footer dan di dalam tag header lainnya.

Sedangkan tag nav dalam konteks ini dapat digunakan untuk mendefinisikan tautan navigasi ke halaman lain, misal ke halaman blog, tentang dan sebagainya.

```html
    <main>
```

Tag main digunakan untuk mendefinisikan bagian utama dari suatu dokumen HTML5. Terdapat pengecualian untuk peletakan tag ini, kita tidak diperbolehkan menggunakan tag main di dalam tag article, aside, footer, header dan nav.

```html
      <article>
        <h2>
          <!-- Judul Artikel -->
        </h2>
      </article>
      <article>
        <h2>
          <!-- Judul Artikel Lain -->
        </h2>
      </article>
```

Tag article digunakan untuk mendefinisikan konten berupa artikel. Sedangkan tag h2 dapat kita gunakan sebagai judul artikel.

```html
      <nav>
        <!-- Navigasi Halaman -->
      </nav>
    </main>
```

Tag nav di atas dapat digunakan untuk mendefinisikan navigasi. Navigasi dalam konteks ini dapat berupa tautan ke artikel selanjutnya maupun sebelumnya.

```html
    <aside>
      <!-- Sidebar -->
    </aside>
```

Tag aside digunakan untuk mendefinisikan konten selain konten utama. Konten tersebut dapat berupa _sidebar_ yang berisi menu navigasi maupun informasi lainnya yang perlu kita cantumkan.

```html
    <footer>
      <!-- Informasi penulis, hak cipta, tanggal terbit, dll -->
    </footer>
```

Tag footer digunakan untuk mendefinisikan akhir dari sebuah dokumen HTML5. Tag ini dapat berisi informasi mengenai penulis, hak cipta, tanggal terbit dan informasi lainnya yang masih berhubungan dengan konten.

```html
  <script src="URL JS External"></script>
```

Tag script src digunakan untuk memanggil JavaScript eksternal. Yang perlu diperhatikan adalah _usahakan_ tidak mencantumkan banyak JavaScript eksternal karena dapat menambah waktu pemuatan halaman. Jika memang membutuhkan banyak plugin JavaScript, sebaiknya script tersebut di jadikan satu.

Cara menjadikan satunya pun tidak boleh sembarangan, sebaiknya jangan langsung menjadikan satu dengan mengopi paste isi script, karena terkadang ada beberapa script yang ketika dijadikan satu malah membuat eror. Cara yang lebih aman menjadikan satu beberapa plugin JavaScript untuk meminimalisir terjadinya eror akan dibahas pada pos lain.

```html
  <script>
      // JS Internal
  </script>
```

Tag script digunakan untuk mendefinisikan script, pada umumnya berupa JavaScript. Yang perlu diperhatikan adalah sebaiknya plugin JavaScript yang besar diletakkan secara eksternal. Sedangkan tag script tersebut dapat diisi dengan script konfigurasi dari layanan pihak ketiga, seperti [Google Analytics](https://analytics.google.com/) dan [Disqus](https://disqus.com/).

```html
  <script type="application/ld+json">
      // JSON
  </script>
</body>
```

Nah untuk tag script yang ini memiliki fungsi yang sedikit berbeda. Jika tag script pada umumnya digunakan untuk meletakkan script yang memanipulasi HTML, tag script yang satu ini digunakan untuk memperkaya informasi halaman website kita ketika diakses oleh [robot perayap Google](https://support.google.com/webmasters/answer/182072?hl=en). Informasi yang dicantumkan di dalam tag ini berupa _[JavaScript Object Notation for Linking Data](https://json-ld.org/)_ dengan memperhatikan kaidah-kaidah dari [schema.org](https://schema.org/). Contoh kode ld+json tersebut seperti berikut,

```json
{
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "Jefry Dewangga",
    "jobTitle": "Student",
    "url": "https://jefrydco.id"
}
```

Dari informasi tersebut, Google dapat menampilkan hasil pencarian yang lebih menarik perhatian. Contohnya seperti gambar berikut,

<app-img src="/content/2017/08/sitelink-image-by-jefrydco.jpg" alt="Sitelink" />

Gambar di atas merupakan hasil pencarian blog lama saya. Google menampilkan beberapa tautan yang memungkinkan pengguna menelusuri _website_ kita lebih cepat tepat di bawah hasil pencarian utama. Tampilan hasil pencarian seperti itu biasa disebut dengan _[sitelinks](https://support.google.com/webmasters/answer/47334?hl=en)_.

Pada gambar di atas teman-teman bisa membandingkan cara Google dalam menampilkan informasi URL. URL salah satu pos blog ini ditampilkan sesuai dengan informasi navigasi yang saya cantumkan di dalam script type application/ld+json. Contoh kode yang saya letakkan di dalam tag tersebut seperti berikut,

<app-img src="/content/2017/08/breadcrumb-indexed-image-by-jefrydco.jpg" alt="Breadcrumb indexed" />

```json
{
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "item": {
                "@id": "https://jefrydco.id/blog",
                "name": "Blog"
            }
        },
        {
            "@type": "ListItem",
            "position": 2,
            "item": {
                "@id": "https://jefrydco.id/blog/category/tutorial",
                "name": "Tutorial"
            }
        },
        {
            "@type": "ListItem",
            "position": 3,
            "item": {
                "@id": "https://jefrydco.id/blog/struktur-html5-part-2",
                "name": "Struktur HTML5 yang Baik Part 2"
            }
        }
    ]
}
```

Selain itu, jika teman-teman telah dianggap sebagai orang yang berpengaruh bagi dunia, Google akan menampilkan informasi data diri teman-teman secara lengkap mulai dari kutipan riwayat hidup dari wikipedia hingga tautan sosial media ketika orang lain menggunakan nama teman-teman sebagai kata kunci. Contohnya seperti gambar berikut,

<app-img src="/content/2017/08/elon-musk-search-result-image-by-jefrydco.jpg" alt="Elon musk search result" />

Lebih lanjut mengenai informasi apa ajah yang dapat kita cantumkan di dalam tag ini akan dibahas pada pos lain. 

Sehingga jika semua kode di atas digabungkan akan menjadi seperti berikut,

```html
<body>
  <section>
    <header>
      <nav>
        <!-- Navigasi Halaman -->
      </nav>
      <h1>
        <!-- Judul Halaman -->
      </h1>
    </header>
    <main>
      <article>
        <h2>
          <!-- Judul Artikel -->
        </h2>
      </article>
      <article>
        <h2>
          <!-- Judul Artikel Lain -->
        </h2>
      </article>
      <nav>
        <!-- Navigasi Halaman -->
      </nav>
    </main>
    <aside>
      <!-- Sidebar -->
    </aside>
    <footer>
      <!-- Penulis, hak cipta, tanggal terbit, dll -->
    </footer>
  </section>
  <script src="URL JS External"></script>
  <script>
      // JS Internal
  </script>
  <script type="application/ld+json">
      // JSON
  </script>
</body>
```

Yang perlu diperhatikan adalah struktur di atas tidak secara mutlak harus teman-teman ikuti, teman-teman dapat menyesuaikannya dengan kebutuhan dengan tetap memperhatikan kaidah-kaidah yang dibuat oleh [W3 Consortium](https://www.w3.org/consortium/). Kaidah-kaidah tersebut dapat teman-teman pelajari sendiri melalui website yang saya cantumin di bagian referensi.

Walaupun terlihat remeh, menggunakan tag HTML5 sesuai dengan fungsinya dan menambahkan informasi ld+json adalah salah satu usaha kita untuk menjadikan WWW lebih bermakna dan mudah dimengerti, baik oleh manusia maupun mesin pencari. Oke cukup sekian pembahasan mengenai struktur HTML5 yang baik kali ini. Semoga bermanfaat dan tetap semangat untuk terus belajar.

## Referensi
1. [JSON for Linking Data](https://json-ld.org/)
2. [Mozilla Developers Network: HTML Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
3. [Schema.org](https://schema.org/)
4. [Search Console Help: Sitelinks](https://support.google.com/webmasters/answer/47334)
5. [W3Schools: HTML Element Reference](https://www.w3schools.com/tags/default.asp)
