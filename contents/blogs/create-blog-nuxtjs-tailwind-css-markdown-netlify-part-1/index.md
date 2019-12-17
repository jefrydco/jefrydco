---
title: Mengapa Kamu Harus Membuat Blog dengan Nuxt.js, Tailwind CSS, Markdown dan Netlify?
description: Membuat blog menggunakan Nuxt.js dan Tailwind CSS dapat mengasah kreatifitas kita
summary: Bagian ini membahas latar belakang mengapa kita harus menulis konten blog menggunakan Markdown, menggunakan Nuxt.js sebagai platform blog, mendesain halaman blog menggunakan Tailwind CSS, dan menghosting blog kita menggunakan Netlify.
img: /cover/2019/12/create-blog-nuxtjs-tailwind-css-markdown-netlify-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2019-12-17T02:48:54.928Z
updatedDate: 2019-12-17T02:48:54.928Z
slug: create-blog-nuxtjs-tailwind-css-markdown-netlify-part-1
id: create-blog-nuxtjs-tailwind-css-markdown-netlify-part-1
---

Bagian ini membahas alasan mengapa kita harus _capek-capek_ menulis konten blog menggunakan Markdown padahal ada platform blog lain yang menyediakan teks editor bersifat WYSIWYG (_What you see is what you get_). Menggunakan Nuxt.js sebagai platform blog padahal platform blog lain menyediakan banyak pilihan _template_ dan plugin yang sangat membantu kita melakukan banyak hal lebih mudah.

Susah-susah mendesain halaman blog menggunakan Tailwind CSS padahal banyak _framework_ CSS lain yang menyediakan banyak komponen yang dapat langsung kita gunakan. Menghosting blog menggunakan Netlify padahal platform blog lain seperti Blogspot dan Wordpress telah menyediakan layanan tanpa harus memikirkan masalah hosting.

[toc]

## Tentang _Blogging_ 👨‍💻

Blog merupakan salah satu metode yang banyak digunakan untuk meningkatkan _personal branding_ di Internet. Saya ingat betul ketika pertama kali berkenalan dengan blog. Saat itu platform blog yang sangat terkenal adalah Blogspot dan Wordpress. Keduanya selalu menjadi pilihan utama ketika ada yang ingin membuat blog.

Walaupun terkenal, kedua platform blog tersebut memiliki kelebihan dan kekurangan masing-masing. Sampai-sampai saya merasakan sendiri timbulnya _stereotype_ akan keduanya. Beberapa diantaranya seperti, menggunakan Wordpress pasti blognya akan lebih SEO daripada menggunakan blogspot, blogspot cukup susah untuk dikostum 😫.

Namun nampaknya sekarang Blogspot mulai pudar ketenarannya, baik secara komunitas maupun secara platform. Sudah jarang sekali saya menemukan hasil pencarian Google yang mengarah ke situs berplatform blogspot. Sedangkan untuk Wordpress sendiri, nampaknya masih banyak penggunanya bahkan di tempat domisili saya sekarang masih sering diadakan _meetup_ komunitas Wordpress.

Platform blog lain yang saat ini sedang naik daun adalah Medium. Saya termasuk orang yang sangat menyukai platform tersebut. Selain karena kesederhanaan platformnya, konten-konten yang ditulis juga sangat berbobot. Ketika artikel ini ditulis, Medium banyak digunakan oleh perusahaan-perusahaan teknologi untuk mempublikasikan studi kasus dan hal-hal teknis mengenai perusahaan mereka.

Ketiga platform tersebut sangat cocok digunakan untuk orang yang hanya ingin fokus menulis. Mereka tidak perlu dipusingkan lagi oleh hal-hal teknis. Wordpress dan Blogspot memiliki banyak opsi tema/template yang dapat dengan mudah dibongkar pasang. Bahkan Wordpress juga memiliki plugin yang dapat menambahkan banyak fitur. Medium memiliki konten yang sangat berbobot sehingga kita dapat dengan mudah mendapatkan _exposure_.

## _Blogging_ dengan Markdown

Saat ini mulai banyak pengembang perangkat lunak yang memanfaatkan Markdown sebagai sarana untuk menulis blog. Bagi teman-teman yang belum tahu mengenai Markdown, Markdown merupakan suatu bahasa markah yang memiliki sintaks sederhana dan ditulis dalam format teks.

Mungkin teman-teman bertanya-tanya mengapa Markdown banyak dimanfaatkan sebagai sarana menulis blog oleh para pengembang perangkat lunak?  Apa tidak lebih mudah menulis menggunakan editor yang memiliki fitur [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) (_What you see is what you get_) layaknya pada platform [Blogspot](https://www.blogger.com), [Wordpress](https://wordpress.com) dan [Medium](https://medium.com/)? 🤔 Jawaban singkatnya karena Markdown sederhana.

Analoginya, kenapa masih banyak orang yang masih menggunakan aplikasi _sticky note_ atau notepad yang sederhana daripada alat yang canggih seperti Google Docs atau Microsoft Word. Ya karena mereka sederhana, bukan? Terkadang hal-hal yang sederhana lebih berguna daripada yang canggih.

<app-img src="/content/2019/12/what-you-see-is-what-you-get-text-editor-by-jefrydco.jpg" alt="What You See is What You Get Text Editor" />

Jawaban panjangnya karena kita dapat menulis Markdown menggunakan media atau aplikasi apapun, entah itu teks editor yang sederhana seperti Vi, Vim, dan Emacs ataupun kode editor atau IDE (_Integrated Development Environment_) yang canggih seperti Visual Studio Code, Android Studio dan XCode.

```markdown
# Ini Judul
Paragraf yang memiliki teks berformat _miring_ dan **tebal**.
```

Bahkan kita dapat membagikannya dengan mudah melalui media apapun tanpa harus takut kehilangan format tulisan yang dihasilkan. Alasan lainnya adalah kita dapat terlihat lebih keren. 😎 Menulis blog menggunakan Markdown akan menjadikan teman-teman nampak seperti pada gambar berikut,

<app-video src="/content/2019/12/writing-markdown-code-by-giphy.webm" />

Markdown memiliki ekstensi `.md`. Berkas Markdown tidak dapat langsung dibuka melalui peramban (_browser_). Kalaupun kita memaksa membukanya, yang kita dapat hanyalah serangkaian teks yang tidak beraturan dan tidak berformat. Mungkin dapat kita sebut WYWINWYG (_What you write is not what you get_). 😁

Kita membutuhkan alat yang berguna untuk mengubah berkas Markdown tersebut menjadi berkas HTML sehingga dapat dibuka menggunakan peramban. Alat tersebut bernama _Bundler_. Beberapa _bundler_ yang terkenal seperti [Webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), dan [Rollup](https://rollupjs.org). Secara standar _bundler_ tersebut hanya menangani berkas berformat JavaScript. Namun kita dapat menambahkan plugin yang dapat menangani berkas berformat lain.

## _Blogging_ dengan Nuxt.js

Nuxt.js merupakan _framework_ yang dibangun di atas Vue.js. Untuk dapat memahami mengapa kita harus menggunakan Nuxt.js mungkin kita perlu memahami terlebih dahulu apa itu SPA, SSR dan Prerender.

### SPA (_Single Page Application_)

Pada dasarnya semua web yang dibangun menggunakan [Vue.js](https://vuejs.org), [React.js](https://reactjs.org), [Svelte](https://svelte.dev) atau [Angular](https://angular.io) akan bersifat SPA (_Single Page Application_). SPA berarti kita hanya memuat satu halaman saja. Interaksi di halaman tersebut akan memuat data yang diperlukan tanpa harus memuat ulang halaman. Sisi positif SPA dibandingkan MPA (_Multiple Page Application_) adalah kita tidak perlu menunggu halaman termuat ulang untuk dapat berinteraksi dan bernavigasi dengan aplikasi tersebut.

Sebagai gambaran katakanlah kita membuka halaman web [https://jefrydco.id/blog](https://jefrydco.id/blog). Setelah itu kita mengklik salah satu _postingan_ yang ada. Di bagian atas halaman akan terdapat _progress bar_ yang menandakan bahwa halaman sedang mengambil data untuk _postingan_ yang kita klik tadi tanpa harus memuat ulang halaman. Setelah data termuat, halaman akan berganti secara otomatis ke halaman _postingan_ yang kita maksud.

Menggunakan SPA akan meningkatkan pengalaman pengguna 🚀. Memuat data yang diperlukan saja akan terasa lebih cepat bagi pengguna daripada harus memuat halaman secara keseluruhan. Bahkan saat ini terdapat mekanisme yang membuat halaman web memuat data terlebih dahulu sebelum pengguna mengklik _postingan_. Sehingga ketika pengguna mengklik _postingan_, ia akan mendapatkan respons yang instan.

### SSR (_Server Side Rendering_)

Walaupun SPA sangat bermanfaat untuk meningkatkan pengalaman pengguna, namun ia masih memiliki sisi negatif. Sisi negatif tersebut timbul karena sifat SPA-nya sendiri.

Untuk mempermudah memahami sisi negatif SPA, coba teman-teman membuka halaman [Telegram Web](https://web.telegram.org). Halaman tersebut bersifat SPA. Jika teman-teman dalam keadaan belum login, akan disuguhkan halaman login Telegram Web. Perhatikan baik-baik tampilan tersebut.

<app-img src="/content/2019/12/telegram-web-by-jefrydco.jpg" alt="Telegram Web"/>

Sekarang coba lihat kode sumber halaman tersebut dengan cara mengklik kanan pada sembarang tempat di halaman tersebut. Kemudian pilih **lihat kode sumber** jika peramban yang teman-teman gunakan berbahasa Indonesia atau **view source code** jika berbahasa Inggris.

Perhatikan baik-baik kode sumber halaman Telegram Web tersebut, konten halaman login tadi tidak akan terlihat. Seharusnya konten tersebut terletak di dalam tag `body` bukan? Tapi ternyata tidak ada. Bahkan di dalam tag `body` tidak ada satupun teks, yang ada hanyalah beberapa tag `div` dan satu tag `script`.

```html
<body>
  <div class=page_wrap ng-view></div>
  <div id=notify_sound></div>
  <script src=js/app.js></script>
</body>
```

Lantas dimanakan letak konten halaman login tadi? Nah, hal tersebutlah yang menjadi sisi negatif dari SPA. Semua konten ditampilkan menggunakan JavaScript. Mungkin sekarang teman-teman bertanya-tanya,

Apa yang salah dengan konten yang ditampilkan menggunakan JavaScript, bukannya hal tersebut malah lebih bagus karena halaman menjadi lebih interaktif dan lebih cepat? 🤔

Yap, benar sekali. Halaman akan lebih interaktif dan lebih cepat dari prespektif pengguna. Namun dari prespektif mesin pencari tidak demikian. Walaupun saat ini Googlebot sudah memiliki kemampuan [menerjemahkan JavaScript ketika ia melakukan perayapan](https://developers.google.com/search/docs/guides/javascript-seo-basics). Sayangnya proses menerjemahkan JavaScript tersebut menambah waktu proses pengindeksan halaman web kita.

<app-img src="/content/2019/12/googlebot-crawl-render-index-by-google.jpg" alt="Googlebot Crawl Render Index" />

Secara sederhana tujuan Googlebot melakukan perayapan adalah ingin mengetahui konten yang ada di halaman web kita. Yang dilakukan [Googlebot](https://support.google.com/webmasters/answer/182072) ketika melakukan perayapan adalah mengakses URL web kita, kemudian memasukkannya ke dalam antrian untuk proses _crawling_. Proses _crawling_ ini akan mengunduh kode dari web kita. Jika web kita bersifat SPA, maka Googlebot harus memasukkannya lagi ke dalam antrian untuk proses _rendering_. Proses _rendering_ ini akan menerjemahkan berkas JavaScript untuk menampilkan konten web kita. Setelah proses _rendering selesai_ akan dilakukan proses pengindeksan.

Walaupun pada akhirnya halaman kita akan di indeks juga, namun waktu yang dibutuhkan untuk proses tersebut akan lebih lama. Itulah mengapa SSR (_Server Side Rendering_) bermanfaat, konten web kita telah di-_render_ di peladen (_server_). Sehingga mungkin Googlebot dapat me-_skip_ proses _rendering_ dan langsung ke proses pengindeksan.

Dan walaupun konten telah di-_render_ di peladen, kita masih mendapatkan manfaat dari SPA. Karena SSR hanya terjadi saat kita pertama kali mengakses halaman web saja, selanjutnya ketika kita bernavigasi ke halaman lainnya akan menggunakan metode SPA.

Kalau saya boleh bilang SPA itu layaknya Iron Man sedangkan SSR itu layaknya Iron Man dengan sarung tangan tak terbatas (_infinity gauntlet_). Mungkin terlihat berlebihan tapi kenyataannya demikian. SPA sendiri telah memiliki banyak kelebihan, dengan adanya SSR kelebihan tersebut dapat menjadi berlipat-lipat. `─=≡Σ(([ ⊐•̀⌂•́]⊐`

### Prerender

Serupa dengan SSR, hanya saja konten web di _render_ pada saat pembangunan (_build time_).

## Mendesain Tampilan dengan Tailwind CSS

Mungkin teman-teman lebih sering mendengar Bootstrap ketika berurusan dengan UI Framework. Hingga sekarang, Bootstrap masih menjadi primadona jika kita ingin membuat web dengan cepat. Bootstrap memang telah menyediakan berbagai macam komponen siap pakai. Seperti kata Fin dalam film Jumanji, "_My strength is my weakness_". Begitulah kiranya saya menggambarkan Bootstrap.

Banyak manfaat yang dapat kita rasakan ketika menggunakan Bootstrap, namun disitulah letak kelemahannya. Menurut pendapat saya, cukup susah mengkostum _style_ suatu komponen Bootstrap tanpa merusak _style_ komponen yang lain. Walaupun sebenarnya banyak cara _hack_ yang dapat kita gunakan.

Daripada banyak mengkostum, mengapa kita tidak menggunakan sesuatu yang memang dari awal dapat dengan mudah dikomposisikan. Disitulah Tailwind CSS berguna. Tailwind CSS tidak memiliki preset komponen apapun, melainkan ia hanya terdiri dari banyak _class_ css yang dapat kita gunakan untuk mengkomposisikan tampilan sesuai dengan kehendak kita.

<app-video src="/content/2019/12/tailwindcss-by-adam-wathan.webm" />

Dari animasi di atas kita dapat menarik suatu kesimpulan yakni satu-satunya hal yang membatasi kita untuk menggunakan Tailwind CSS hanyalah kreatifitas. 😎

## Meng-_hosting_ Blog ke Netlify

Setelah semua hal telah dipersiapkan dengan baik, langkah terakhir untuk membuat blog kita dapat diakses khalayak ramai adalah membuatnya _online_. Ada banyak pilihan penyedia layanan _hosting_ yang dapat kita gunakan. Mulai dari yang berbayar hingga yang gratis. Dan Netlify merupakan salah satu penyedia layanan _hosting_ yang gratis dengan ketentuan tertentu.

Lantas apa untungnya kita menggunakan Netlify? 🤔 

Sebelum menjawab pertanyaan tersebut, mungkin saya perlu menanyakan suatu hal. Teman-teman saya yang budiman pasti sudah mengetahui apa itu repositori bukan? Kalau belum, anggaplah repositori itu seperti tempat penyimpanan kode kita secara _online_ yang memiliki riwayat semua perubahan kode yang telah kita lakukan.

Penyimpanan secara _online_ tersebut bertujuan agar orang lain dapat ikut berkontribusi ke proyek blog kita, melihat riwayat perubahan kode dan yang pasti jika suatu saat kita tidak sengaja menghapus kode blog kita, kita masih mempunyai cadangannya di repositori. 😅

Nah, untuk menyimpan kode kita secara _online_ di repositori tersebut, kita perlu melakukan yang namanya `push`. Setiap kali kita melakukan `push`, Netlify akan secara otomatis melakukan proses _build_ untuk meng-_hosting_-kan versi terbaru dari blog kita. Sungguh sangat mudah bukan?

## Ikhtisar

Jadi apakah saya harus menggunakan Nuxt.js, Tailwind CSS dan Netlify untuk membuat blog?

Untuk dapat menjawab pertanyaan tersebut, teman-teman dapat menanyakan ke diri sendiri? Apa tujuan saya membuat blog? Apakah ingin fokus menulis, tidak mau berurusan dengan hal-hal teknis, menghasilkan tulisan yang bagus dan menghasilkan banyak kebahagiaan darinya? Jika demikian, mungkin kombinasi Nuxt.js, Tailwind CSS dan Netlify menjadi kurang cocok dengan teman-teman. Blogspot, Wordpress atau Medium lah pilihan yang lebih tepat.

Menurut saya kombinasi Nuxt.js, Tailwind CSS dan Netlify itu sangat cocok bagi teman-teman yang memiliki jiwa eksplorasi yang tinggi. Karena untuk dapat mewujudkan blog menggunakan ketiga _tool_ tersebut membutuhkan perjuangan yang tidak mudah. Akan banyak cobaan yang menghadang dan berusaha menjatuhkan teman-teman ke jurang kemalasan. Tapi memang begitulah hidup bukan? 😇

Pada akhirnya, semua _tool_ yang saya sebutkan di atas hanyalah sebuah _tool_ untuk membantu kita meraih tujuan. Jadi apapun _tool_ yang teman-teman gunakan asalkan itu dapat mengantarkan ke tujuan, ya silahkan teman-teman mempergunakan _tool_ tersebut dengan maksimal.

_Omong-omong_, terima kasih telah membaca, semoga bermanfaat! 🙌 

## Referensi
1. [Markdown](https://www.markdownguide.org/)
2. [Nuxt.js](https://nuxtjs.org)
3. [Tailwind CSS](https://tailwindcss.com)
4. [Netlify](https://netlify.com)
