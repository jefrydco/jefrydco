---
title: Pembuatan Ulang Blog Saya dengan Nuxt.js dan Tailwind CSS - Bagian 1
description: Pembuatan ulang blog saya dengan Nuxt.js dan Tailwind CSS membuat proses pengembangan lebih cepat.
summary: Saya sudah ngeblog sejak masih SMP, tetapi sampai sekarang tidak ada satu pun blog yang saya buat bertahan. Alasan utamanya adalah saya bosan. Pengalaman menulis juga tidak begitu baik. Saya hanya menulis beberapa artikel dan mulai bingung artikel apa yang harus saya tulis selanjutnya.
img: /cover/2019/04/rebuild-blog-with-nuxtjs-tailwindcss-image-by-markus-spiske.jpg
imgCreator: markusspiske
postedDate: 2019-04-17T07:15:21.689Z
updatedDate: 2019-04-17T07:15:21.689Z
slug: rebuild-blog-with-nuxtjs-tailwindcss-part-1
id: rebuild-blog-with-nuxtjs-tailwindcss-part-1
---

> Baca bagian kedua di sini, <nuxt-link to="/blog/rebuild-blog-with-nuxtjs-tailwindcss-part-2">Pembuatan Ulang Blog Saya dengan Nuxt.js dan Tailwind CSS - Bagian 2</nuxt-link>

Saya sudah ngeblog sejak masih SMP, tetapi sampai sekarang tidak ada satu pun blog yang saya buat bertahan. Alasan utamanya adalah saya bosan. Pengalaman menulis juga tidak begitu baik. Saya hanya menulis beberapa artikel dan mulai bingung artikel apa yang harus saya tulis selanjutnya.

Meskipun setiap kali saya mulai blogging, saya selalu menghabiskan banyak waktu dalam membangun blog itu sendiri bukan ketika pembuatan konten.

Saya selalu mulai membangun blog dengan pertanyaan seperti; kerangka kerja dan pustaka JS dan CSS apa yang akan saya gunakan, bagaimana saya mengatur situs saya untuk mendapatkan pengalaman membaca terbaik, di mana saya harus meng-host situs saya, bagaimana saya mengkonfigurasi situs saya untuk beroperasi dengan baik, bagaimana saya mengoptimalkan situs saya agar secepat mungkin.

Bagaimana saya membuat situs saya lulus [Google Web Speed](https://web.dev/measure) tes, bagaimana saya mendapatkan situs saya se SEO mungkin. Ada banyak pertanyaan di benak saya untuk mulai menulis blog.

Saya melihat teman-teman saya di kampus mulai menulis artikel di [Medium](https://medium.com). Saya ingin melakukan itu juga. Dan skema di atas mulai lagi dari sekarang.

Omong-omong, saya tidak menyediakan bagian TLDR karena saya pikir setiap bagian pada posting ini tidak terlalu panjang untuk dibaca. Tetapi jika Kamu berpikir artikel ini cukup panjang untuk Kamu. Kamu dapat melompat ke bagian yang ingin Kamu baca dengan menggunakan tautan ini di bawah:

[toc]

Kembali ke topik. Dalam beberapa saat kemudian saya berpikir, kadang-kadang saya hanya ingin menulis kalimat pendek untuk mengekspresikan perasaan saya, dapatkah saya melakukannya di Medium? Mungkin, tapi saya pikir Medium bukan tempat untuk melakukan itu.

Medium telah memiliki banyak pengguna. Pengalaman menulis di sana sangat bagus. Medium berfokus pada konten, banyak penulis hebat menulis di media.

Namun menurut saya, blog saya bukan hanya konten yang saya tulis, tetapi juga blog itu sendiri. Apakah itu mencerminkan kepribadian saya, dapatkah saya menyesuaikannya seperti yang saya inginkan, dapatkah saya menambahkan lebih banyak konten selain artikel Semua hal itu tidak dapat saya lakukan dalam medium (ketika artikel ini ditulis).

Setelah pertimbangan panjang, saya memutuskan untuk membangun kembali blog saya sendiri. Saya berkomitmen membuat situs saya lebih pribadi, menulis di sana lebih sering dan menyebarkannya ke dunia lebih sering. Inilah pertanyaan-pertanyaan yang saya sebutkan di atas lagi.

## **Apa kerangka CSS yang akan saya gunakan?**
Ada tiga pilihan bagi saya mengenai kerangka kerja JS, yaitu jQuery, React dan Vue.

### jQuery
Sejak blog pertama saya, saya mulai menggunakan jQuery sebagai perpustakaan JS utama saya. Satu-satunya hal yang saya lakukan untuk mulai menggunakan perpustakaan ini adalah mengimpor file JavaScript ke HTML secara langsung. Popularitas dan kesederhanaannya daripada vanilla JS telah terbukti.

Selain itu, ada banyak plugin jQuery yang bisa saya pilih. Tapi sayangnya, popularitas jQuery mulai menurun dari waktu ke waktu, dengan munculnya Angular, React, dan Vue.

### React
Pilihan kedua adalah React. Saya sudah mulai belajar React tetapi selalu mengalami kesulitan. Karena sifat React yang membiarkan komunitas membangun semuanya di atas React, hal tersebut membuat saya sulit untuk memilih plugin mana yang cocok untuk proyek saya.

Jika tidak sulit, saya butuh waktu lama untuk memilih di antara banyak add-on yang tersedia. Dan saya setuju bahwa komunitas di balik React sangat besar. React didukung oleh Facebook, dengan sumber daya tak terbatas.

Saya tidak bisa dengan mudah mengimpor file React library ke file HTML. Jika saya ingin membuat aplikasi React, saya harus menggunakan alat pembuatnya. Selain itu, sintaks HTML dalam React sedikit berbeda dengan HTML biasa. Bahkan memiliki nama yang berbeda, yang disebut [JSX](https://reactjs.org/docs/introducing-jsx.html).

```jsx
const element = <h1>Hello, world!</h1>;
```

Itu ditulis langsung di dalam file JS. JS dan JSX juga dapat digabungkan satu sama lain seperti; looping di dalam JSX atau menyatakan variabel JS yang berisi JSX.

### Vue
Pilihan terakhir adalah Vue. Teman saya, [Naufal Rabbani](https://github.com/bosnaufal) memperkenalkan saya untuk belajar Vue sekitar dua tahun lalu ketika saya masih di tahun pertama kuliah. Dia berkata bahwa jika saya ingin menjadi produktif dengan cepat, saya harus menggunakan Vue karena pembelajarannya mudah.

Saya baru tahu jQuery saat itu. Seperti halnya jQuery, untuk mulai menggunakan Vue, saya hanya perlu mengimpor file JS-nya ke dalam HTML.

Saya mencoba untuk memahami konsep di balik Vue, tetapi saya masih bingung karena sangat berbeda dari jQuery. Ada banyak istilah dan konsep baru yang harus saya pahami seperti; pengikatan data, _computed property_, komponen, _lifecycle hooks_ dan banyak lagi yang lainnya.

Apa-apaan itu semua? Saya menyerah pada awalnya. Meskipun banyak pengembang _frontend_ mengatakan bahwa dokumentasi Vue cukup mudah dimengerti, saya tidak mengerti sama sekali.

Dalam kebingungan saya, saya menemukan Udemy. **Udemy adalah kursus online yang sering menjual kontennya dengan diskon sangat tinggi**. Saya mencari kursus Vue di sana, dan saya menemukan kursus berjudul [Vue JS 2 - Panduan Lengkap (termasuk Vue Router & Vuex)](https://www.udemy.com/vuejs-2-the-complete-guide) oleh [Maximilian Schwarzmüller](https://twitter.com/maxedapps). Dia mengajarkan setiap konsep Vue dengan sangat rinci dan berurutan, membuat saya cepat mengerti.

Max juga mengajarkan tentang Vue Router dan Vuex juga. Pada titik tertentu, memasukkan pustaka Vue JavaScript ke HTML tidak cukup. Saya harus menggunakan alat pembuat Vue untuk membuat aplikasi yang lebih kompleks, misalnya dashboard analytics.

Dasbor Analytics harus dapat memuat dan menampilkan banyak data. Mungkin juga memiliki banyak halaman untuk dinavigasi. Jadi harus ada semacam mekanisme untuk memuat data secara tidak sinkron.

Vue Router membantu menyelesaikan masalah itu dengan memisahkan kode javascript antar halaman. Jadi halaman tersebut hanya memuat kode javascript yang diperlukan.

Vuex adalah sistem manajemen variabel. Dengan menggunakan Vue, saya dapat memisahkan kode saya menjadi beberapa komponen. Vuex membantu saya, jika saya memiliki banyak komponen dan mereka harus berkomunikasi satu sama lain.

Sementara itu, saya diterima magang di perusahaan startup berbasis sehat bernama [Reblood](https://reblood.com). Proyek pertama yang saya dapatkan di sana adalah membangun kembali situs web resmi mereka. Pada awalnya, CEO, Leonika Sari mengatakan kepada saya untuk menggunakan [Polymer](https://www.polymer-project.org) oleh Google.

Saya bertanya mengapa saya harus menggunakan Polymer? Dia menjawab bahwa Polymer mudah digunakan. Ok, karena saya tidak pernah menggunakan framework itu, saya akan coba.

Setelah beberapa upaya, saya menyadari bahwa Polymer tidak cocok untuk saya. Saya mengusulkan kepada CEO saya untuk menggunakan Vue sebagai gantinya. Dia mengatakan bahwa ok lakukan saja, **apa pun alat yang Kamu gunakan, pilih yang lebih mudah bagi Kamu karena itu akan membuat Kamu lebih produktif**.

Membangun kembali situs web Reblood menggunakan Vue meningkatkan pemahaman saya lebih dalam, meskipun struktur proyek saya dan kode masih berantakan.

Kembali ke topik, kesulitan yang saya rasakan mengenai hal yang berantakan membawa saya ke [Nuxt.js](https://nuxtjs.org/). Seperti yang dinyatakan di situs resminya,

> Nuxt.js mengatur semua konfigurasi yang diperlukan untuk membuat pengembangan aplikasi Vue.js Kamu menyenangkan.

Seperti ketika saya mempelajari Vue untuk pertama kalinya, saya harus memahami konsep di balik Nuxt.js dan saya juga harus memahami beberapa istilah baru seperti; _server-side rendering_, aplikasi universal, modul, plugin, dan sebagainya. Meskipun konsepnya tidak sebanyak Vue, ada baiknya untuk diketahui.

Lalu saya pergi dengan kursus Max lain, [Nuxt.js - Vue.js on Steroid](https://www.udemy.com/nuxtjs-vuejs-on-steroids). Max juga menjelaskan konsep Nuxt.js dengan sangat baik.

Kemudian saya belajar dari kursus Max lain, [Nuxt.js - Vue.js tentang Steroid](https://www.udemy.com/nuxtjs-vuejs-on-steroids). Max juga menjelaskan konsep Nuxt.js dengan sangat baik.

Jadi ya, Nuxt.js memang membuat saya lebih cepat untuk mengembangkan aplikasi Vue. Ditingkatkan dengan fitur _server-side rendering_ membantu saya mengurangi pemuatan awal aplikasi lebih cepat dan [waktu untuk berinteraksi](https://calibreapp.com/blog/time-to-interactive/) lebih pendek.

Blog ini juga didukung oleh Nuxt, Kamu dapat memeriksa kode sumber di repositori Github saya di sini, [jefrydco](https://github.com/jefrydco/jefrydco).

## Kerangka kerja/pustaka CSS apa yang akan saya gunakan?
Untuk kerangka CSS, saya juga memiliki beberapa opsi untuk dipilih. Mereka adalah Bootstrap, Bulma, Vuetify, dan Tailwind.

### Bootstrap
Saya sangat suka [Bootstrap](https://getbootstrap.com) sejak saya memulai blog pertama saya, ia memiliki banyak komponen yang dapat digunakan di situs saya. Saya tidak harus mencari banyak perpustakaan lain untuk kebutuhan ini dan itu.

Lalu saya mulai berpikir, meskipun Bootstrap adalah paket lengkap untuk pengembangan frontend, Bootstrap akan berlebihan jika saya hanya perlu menggunakannya di situs saya.

Memodifikasi gaya Bootstrap agar sesuai dengan gaya saya membutuhkan banyak usaha. Saya harus menimpa banyak gaya Bootstrap untuk melakukan itu.

Hal lain yang saya sesali jika saya menggunakan Bootstrap adalah ia bergantung pada jQuery, bagaimana jika saya tidak ingin menggunakan jQuery. Sebenarnya, masalah ini telah diselesaikan dengan porting Bootstrap ke kerangka JavaScript lainnya.

Namun masalah utama belum terpecahkan, Bootstrap dan kerangka JavaScript-nya memberi saya apa pun yang tidak saya butuhkan.

### Bulma
[Bulma](https://bulma.io) mirip dengan Bootstrap tanpa fungsi JavaScript, pembuatnya menyatakan bahwa Bulma adalah _**environment agnostic**_. Hal tersebut berarti bahwa Bulma dapat berada di atas kerangka/pustaka JavaScript apa pun.

Kerangka kerja CSS saya sebelumnya untuk blog ini menggunakan Bulma, dan untuk fitur interaktif, saya hanya menggunakan JavaScript biasa.

### Vuetify
[Vuetify](https://vuetifyjs.com) juga cukup mirip dengan Bootstrap. Tapi khusus untuk Vue. Itu menggunakan [Desain Material](https://material.io/design) oleh Google.

Vuetify telah menjadi kerangka CSS utama saya sejak saya belajar Vue. Saya juga menggunakannya untuk membangun situs web resmi Reblood dan proyek sederhana lainnya juga. Vuetify memecahkan masalah yang dimiliki Bootstrap dengan memecah kode komponennya pada masing-masing file.

Saya sangat puas dengan Vuetify tetapi satu hal yang tidak saya sukai adalah gaya desain materialnya.

Desain material yang saat ini digunakan oleh Vuetify adalah versi 1. Ini sangat Google-ly. Maksud saya aplikasi saya akan terlihat identik dengan aplikasi Google.

Sekarang desain Material telah berubah, versi 2 hadir dengan sistem desain yang lebih fleksibel dan dapat disesuaikan. Pengembang dapat dengan mudah mengintegrasikannya tanpa khawatir aplikasi mereka akan mirip dengan Google.

Saat ini, Vuetify juga mengembangkan versi 2. Dan akan menggunakan sistem desain material terbaru.

### Tailwind
Masalah yang saya miliki ketika saya menggunakan kerangka CSS adalah bahwa kerangka itu sendiri terlalu berlebihan untuk kebutuhan saya. Masalah kedua adalah tentang gaya. Saya hanya tidak ingin situs saya identik atau mirip dengan situs lain.

[Tailwind](https://tailwindcss.com) dapat mengatasinya. Mereka memecahkan kedua masalah yang saya miliki. Tailwind tidak memiliki tema default, tidak ada komponen UI bawaan, tidak memiliki pilihan tentang situs yang saya bangun akan terlihat seperti apa. Jadi, bagaimana mungkin Tailwind melakukannya?

Tailwind lebih seperti alat prototyping daripada kerangka CSS. Saya dapat menerapkan desain khusus dengan identitas saya sendiri. Tailwind memberikan kelas CSS tingkat rendah yang sangat komposabel. Hal tersebut membuatnya mudah untuk membangun antarmuka pengguna yang rumit **tanpa mendorong dua situs untuk terlihat sama**.

Bahkan jika ada sesuatu yang tidak tercakup oleh Tailwind. Fungsionalitas Tailwind dapat ditambah dengan menggunakan plugin.

Saya memilih Tailwind daripada beberapa opsi di atas. Tailwind memang memberikan cara agar saya dapat dengan mudah mengembangkan situs ini secara bebas.

## Bagaimana cara saya menata situs saya untuk mendapatkan pengalaman membaca yang terbaik?
Saya tidak menampik bahwa Medium memiliki pengalaman membaca terbaik di antara situs-situs lain yang saya kenal. Jika saya membuka halaman Konten, saya hanya akan melihat tampilan yang sangat bersih dan artikel yang terpusat. Tidak ada gangguan di sana. Ukuran fontnya cukup besar dan mudah dibaca.

Dan karena itu, banyak situs meminjam gaya Medium untuk mendapatkan pengalaman membaca setingkat Medium. Saya juga mulai mendesain halaman konten dengan pengalaman seperti itu.

Mulai dari jenis font, saya memilih [Merriweather Sans](https://fonts.google.com/specimen/Merriweather/) untuk teks biasa dan [Bitter](https://fonts.google.com/specimen/Bitter/ ) untuk judul.

Google Fonts menyoroti Merriweather Sans sebagai [Superfamilies](https://fonts.google.com/featured/Superfamilies) dan Bitter sebagai [Headline-Worthy Serifs](https://fonts.google.com/featured/Headline-Worthy+Serif).

Berbicara tentang ukuran font, saya menggunakan 1,125rem (18px) untuk teks biasa dan untuk judul bervariasi dari 0,75rem (12px) hingga 1,5rem (24px). Untuk informasi, tailwind gunakan [rem](https://medium.com/code-better/css-units-for-font-size-px-em-rem-79f7e592bb97) dengan basis 16px untuk unitnya.

Untuk tinggi garis, saya memilih 1,5 untuk nilainya. Setiap paragraf memiliki jarak tepi bawah dengan nilai 2rem. Jarak tepi bawah akan memberi ruang pembaca untuk membaca setiap paragraf dengan mudah.

Lebih lanjut, Kamu dapat membaca kode yang saya buat untuk halaman konten di sini, [jefrydco/_slug.vue at master](https://github.com/jefrydco/jefrydco/blob/master/pages/blog/_slug.vue#L240).

Untuk halaman lain situs ini, saya buat sesederhana mungkin. Beranda hanya berisi bagian profil saya. Kemudian di halaman daftar blog, bagian profil ditambahkan dengan daftar blog itu sendiri. Dan pada halaman item blog, bagian profil dipindahkan di bawah artikel.

Saya juga memberikan opsi pembaca untuk memilih apakah mereka ingin membaca dalam mode terang atau mode gelap. Kamu dapat mengganti tombol di kanan atas setiap halaman.

## Penutup
Pada bagian ini, saya telah menjawab 3 dari 8 pertanyaan tentang siklus membangun kembali blog saya.

Saya menggunakan Nuxt.js sebagai alat utama, alasan utamanya adalah fitur rendering sisi servernya. Itu benar-benar membantu membuat blog saya lebih ringan dan SEO friendly.

Untuk antarmuka, saya menggunakan CSS Tailwind. Tailwind CSS memang membantu saya untuk membuat segala jenis komponen untuk Vue.js lebih cepat.

Mengenai gaya blog ini, itu sangat dipengaruhi oleh Medium. Dengan hanya fokus pada konten dan memberikan opsi kepada pengguna untuk memilih tema gelap atau terang, saya ingin membuat pembaca saya tinggal lebih lama di sini.

Saya pikir itu sudah cukup untuk bagian 1. Di bagian selanjutnya, saya akan membahas pertanyaan-pertanyaan ini; di mana saya harus meng-host situs saya, bagaimana saya mengkonfigurasi situs saya untuk bangun dan berjalan dengan baik, bagaimana saya mengoptimalkan situs saya secepat mungkin, bagaimana saya membuat situs saya lulus tes Google Web Speed, bagaimana saya mendapatkan situs saya seo mungkin, dan kode stabilo mana yang akan saya gunakan, prism.js atau highlight.js.