---
title: Kisah Pembuatan Ulang Situs Pribadi Saya Menggunakan Nuxt.js dan Tailwind CSS
description: Saya sudah ngeblog sejak masih SMP, tetapi sampai sekarang tidak ada satu pun blog yang saya buat bertahan.
img: /cover/rebuild-personal-site-using-nuxtjs-tailwindcss.jpg
postedDate: 2019-04-17T07:15:21.689Z
updatedDate: 2019-04-17T07:15:21.689Z
slug: rebuild-personal-site-using-nuxtjs-tailwindcss
---

Saya sudah ngeblog sejak masih SMP, tetapi sampai sekarang tidak ada satu pun blog yang saya buat bertahan. Alasan utamanya adalah saya bosan. Pengalaman menulis juga tidak begitu baik. Saya hanya menulis beberapa artikel dan mulai bingung artikel apa yang harus saya tulis selanjutnya.

Meskipun setiap kali saya mulai blogging, saya selalu menghabiskan banyak waktu dalam membangun blog itu sendiri bukan ketika pembuatan konten.

Saya selalu mulai membangun blog dengan pertanyaan seperti; kerangka kerja dan pustaka JS dan CSS apa yang akan saya gunakan, bagaimana saya mengatur situs saya untuk mendapatkan pengalaman membaca terbaik, di mana saya harus meng-host situs saya, bagaimana saya mengkonfigurasi situs saya untuk beroperasi dengan baik, bagaimana saya mengoptimalkan situs saya agar secepat mungkin.

Bagaimana saya membuat situs saya lulus [Google Web Speed](https://web.dev/measure) tes, bagaimana saya mendapatkan situs saya se SEO mungkin, _highlighter_ kode apa yang akan saya gunakan, [prism.js](https://prismjs.com) atau [highlight.js](https://highlightjs.org/). Ada banyak pertanyaan di benak saya untuk mulai menulis blog.

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

## Di mana saya harus meng-host situs saya?
Saya memiliki dilema ketika saya memilih di mana saya harus meng-host situs saya. Karena situs saya dirancang untuk _server-side rendering_.

Saya harus menjalankannya di lingkungan node.js. Masalahnya adalah mana yang terbaik. Bukan yang terbaik sebagai fitur saja tetapi juga yang paling pas di dompet saya juga.

Ada beberapa pilihan yang saya temukan, saya dapat meng-host-nya di Google Cloud Platform di App Engine atau Compute Engine, di Amazon Web Service di EC2 atau Elastic Bean, dan yang terakhir di Heroku.

### Google App Engine atau Compute Engine
Saya telah mencoba untuk men-_deploy_ aplikasi sederhana di GCP baik di App Engine dan Compute Engine. Mereka semua hebat dalam menjalankan aplikasi.

Compute Engine memiliki kontrol lebih karena pada dasarnya VPS sehingga saya dapat mengaksesnya menggunakan SSH. Permasalahan dengan Compute Engine adalah saya harus mengurusi konfigurasi lingkungan docker, nginx dan sebagainya.

Saya suka bereksperimen dengan hal-hal tersebut, tetapi demi kesederhanaan dan keamanan situs saya, saya tidak ingin melakukan itu.

App Engine kurang memiliki kendali. App Engine  adalah platform sebagai layanan, hal tersebut berarti saya bisa fokus pada pengkodean dan Google mengurus server. App Engine lebih mudah daripada Compute Engine dalam hal pengoperasian. Satu-satunya hal yang harus saya lakukan adalah membangun situs saya kemudian men-_deploy_-nya.

Lebih mudah digunakan tidak berarti saya tidak memiliki masalah dengan situs saya. Situs saya memiliki kondisi khusus karena saya menggunakan _markdown_ untuk menulis artikel. Modul [@nuxt/feed](https://github.com/nuxt-community/feed-module) perlu memuat file _markdown_ ketika situs saya beroperasi.

File _markdown_ tidak dapat dimuat melalui [Webpack Loader](https://webpack.js.org/loaders/), jadi saya harus membuatnya dimuat melalui node.js `fs.readFile ()` fungsi.

Saya tahu _feed_ bukan merupakan prioritas, tapi saya suka situs saya memiliki fitur lengkap untuk pembaca saya, jadi mengapa tidak?

### Amazon Web Service EC2 atau Elastic Beanstalk
Seperti yang saya lakukan di App Engine dan Compute Engine. Saya telah mencoba untuk men-_deploy_ aplikasi sederhana di EC2 dan Elastic Beanstalk juga.

Apa yang saya alami ketika saya mencoba melakukan hal yang sama pada AWS lebih buruk dari yang saya alami di GCP, terutama di Elastic Beanstalk. Tetapi pengalaman dengan EC2 sama dengan di Compute Engine.

Seperti yang harus dilakukan App Engine, Elastic Beanstalk dimaksudkan untuk membuat pengembangan aplikasi lebih mudah. Membuat pengembang lebih fokus pada kode daripada sisi penerapan.

Sebenarnya, saya hanya bisa men-_deploy_ ke Elastic Beanstalk dengan mengunggah proyek dalam file zip. Karena Amazon Web Service juga memiliki fitur yang disebut Code Build dan Code Pipeline, saya ingin mengimplementasikannya juga.

Idenya adalah setiap kali saya mengunggah perubahan ke dalam repositori Github, Code Build terpicu untuk membangun situs tersebut dan Code Pipeline menyalurkan hasilnya ke Elastic Beanstalk.

Pada awalnya, saya dapat mengkonfigurasi Code Build dengan sukses tetapi untuk Code Pipeline, saya tidak tahu mengapa hasil pembuatannya tidak dapat dilewatkan melalui Elastic Beanstalk.

Saya mencari melalui di forum pengembang dan merka menyarankan saya untuk mengkonfigurasi pada halaman IAM. Tapi seperti yang saya duga, konfigurasi tersebut sangat membingungkan. Ada banyak aturan untuk banyak hal. Saya tidak bisa memahami semuanya. Jadi saya menyerah dengan Amazon Web Service.

### Heroku
Opsi terakhir adalah [Heroku](https://www.heroku.com). Layanan Heroku mirip dengan App Engine di GCP atau Elastic Beanstalk di AWS tetapi lebih sederhana.

Heroku juga menyediakan [CI/CD](https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007). Artinya, pengembang seharusnya hanya fokus pada pengkodean.

Ketika mereka mendorong perubahan ke repositori mereka, Heroku terpicu untuk menjalankan proses pembuatan lalu secara otomatis itu akan di-_deploy_.

Selain itu, **Heroku juga menyediakan SSL gratis untuk domain khusus saya**. Saat ini, SSL adalah hal wajib di web.

Semua kenyamanan yang disediakan Heroku memiliki pengorbanan. Biaya penggunaannya cukup mahal di antara layanan lain yang saya sebutkan di atas.

Saya sangat suka bagaimana CI / CD itu bekerja. Saya bahkan tidak berpikir lagi tentang rasa sakit mengerahkan sesuatu. Jadi harga mahal sepadan dengan layanan Heroku.

Untuk saat ini, saya akan menggunakan Heroku untuk meng-host situs ini. Mungkin pada titik tertentu, saya akan mempertimbangkan kembali alternatif Heroku jika harganya naik.

## Bagaimana cara mengonfigurasi situs saya untuk berfungsi dengan baik?
Saya membeli domain ini dari [Dewaweb](https://www.dewaweb.com) dan saya telah meng-host situs ini di penyedia hosting tersebut selama sekitar 2 tahun. Saya puas dengan layanannya. Masalahnya adalah, saya menggunakan _shared hosting_ yang hanya dapat menjalankan PHP.

Masalah kedua adalah Heroku tidak dapat menyediakan cara untuk menghubungkan domain _root_ seperti `jefrydco.id` ke layanan mereka. Heroku hanya dapat menerima subdomain, `www.jefrydco.id` misalnya. Tapi saya tidak ingin situs saya dimulai dengan www. Jadi saya mencari cara untuk menghapusnya.

### Pencarian penyedia DNS yang sesuai
Saya menemukan solusi dengan mengarahkan domain _root_ ke subdomain lain. Sedihnya, Dewaweb tidak bisa melakukan itu. Jadi saya memutuskan untuk mencari penyedia DNS lain. Dan saya menemukan [Cloudflare](https://www.cloudflare.com).

**Cloudflare menyediakan cara untuk menghapus www dari domain khusus di Heroku**. Hal tersebut diberi nama [CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-Understand-and-configure-CNAME-Flattening).

Cloudflare pada dasarnya adalah penyedia CDN tetapi memiliki konfigurasi DNS juga. **CDN adalah jaringan atau server proxy yang didistribusikan secara geografis yang dapat melayani situs dalam latensi rendah**.

Untuk mendapatkan pemahaman yang lebih baik tentang bagaimana CDN bekerja. Sebagai contoh, server saya berlokasi di Indonesia. Dua orang membuka situs saya, satu berlokasi di Singapura dan yang lain di Amerika Serikat.

Jika saya tidak menggunakan CDN, keduanya akan mengambil data situs saya dari Indonesia. Orang-orang di Singapura akan membuka situs saya lebih cepat daripada yang ada di AS karena jarak geolokasi.

Dengan menggunakan CDN, **Cloudflare akan melakukan _cache_ dan mereplikasi situs ini ke server yang berbeda di lokasi yang berbeda**. Jika seseorang mengakses situs saya, Cloudflare akan melihat server terdekat mereka ke lokasi seseorang tersebut apakah situs saya telah di-_cache_ atau belum.

Jika belum, Cloudflare akan meminta data situs saya dari server saya dan menyimpannya. Setelah itu, permintaan diteruskan ke browser seseorang tersebut. Jika telah di-_cache_, Cloudflare secara otomatis meneruskan _cache_ ke browser seseorang tersebut.

Dengan adanya _cache_, tidak perlu lagi mengambil data dari server saya. CDN sangat membantu untuk mengurangi penggunaan bandwidth server.

### Menyiapkan Heroku untuk pen-_deploy_-an otomatis dari Github
Sebenarnya, Heroku memiliki 2 opsi untuk pen-_deploy_-an, yaitu CI/CD dan Integrasi Github. Perbedaan di antara mereka adalah **CI/CD memerlukan beberapa _test case_ untuk dilewati** sebelum Heroku melepaskan komit saya ke produksi.

Dibandingkan dengan CI/CD, **Integrasi Github tidak memerlukan _test case_**, Heroku hanya menunggu repo saya jika ada komit baru. Komit tersebut memicu proses pembangunan. Jika proses pembangunan berhasil, maka secara otomatis akan dilepaskan ke produksi.

Saya lebih suka menggunakan Integrasi Github karena lebih sederhana. Tidak memerlukan test case.

Selanjutnya, Integrasi Github di Heroku telah didokumentasikan di sini, [Integrasi GitHub (Heroku GitHub Deploys)](https://devcenter.heroku.com/articles/github-integration).

## Bagaimana saya mengoptimalkan situs saya secepat mungkin?
Optimasi halaman untuk situs ini dibagi menjadi 2 hal. Yang pertama dilakukan oleh Cloudflare dan yang kedua saya lakukan sendiri.

### Optimasi Halaman oleh Cloudflare
Cloudflare memiliki beberapa layanan yang dapat digunakan untuk mengoptimalkan situs saya. Yang pertama disebut _auto-minification_, idenya adalah bahwa setiap HTML, CSS, dan JavaScript situs saya diperkecil oleh server Cloudflare.

Yang kedua adalah mengaktifkan kompresi HTTP menggunakan algoritma [Brotli](https://brotli.org/).

Yang berikutnya adalah [Rocket Loader](https://support.cloudflare.com/hc/en-us/articles/200168056-What-does-Rocket-Loader-do-). _Rocket Loader_ akan memprioritaskan konten situs (teks, gambar, font, dll) dengan menunda pemuatan semua JavaScript hingga setelah rendering.

Sebenarnya, masih ada layanan Cloudflare lainnya untuk mempercepat situs saya. Tetapi mereka semua berbayar.

### Optimasi halaman oleh saya sendiri
Saya menggunakan beberapa modul Nuxt.js untuk mempercepat situs ini.

Memuat font terkadang membuat perenderan halaman tertunda. Untuk mengatasi masalah itu, modul Nuxt.js pertama yang saya gunakan adalah [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader). Webfontloader adalah pustaka JavaScript untuk memuat font secara tidak sinkron dari Google Font.

Yang kedua adalah [nuxt-purgecss](https://github.com/Developmint/nuxt-purgecss), modul ini menghapus CSS yang tidak perlu yang tidak saya gunakan pada setiap halaman. Purge CSS bekerja sangat baik dengan Tailwind.

Dua modul di atas dibuat oleh [Alexander Lichter](https://twitter.com/TheAlexLichter). Dia adalah salah satu tim inti dari Nuxt.js. Dia sering menulis artikel tentang tips Vue.js dan Nuxt.js di blog-nya. Kamu dapat melihat blognya di sini, [blog.Lichter.io](https://blog.lichter.io/).

Yang berikutnya adalah [@reallifedigital/nuxt-image-loader-module](https://github.com/reallifedigital/nuxt-image-loader-module). Modul ini akan memanipulasi gambar dengan menggunakan [Graphicsmagick](http://www.graphicsmagick.org). Modul ini akan memotong dan mengubah ukuran gambar sesuai permintaan.

Bersama dengan modul ini, saya menggunakan tag `<picture>` yang dikombinasikan dengan atribut `srcset` dalam tag` <img> `. Hal semacam ini disebut **gambar responsif**. Cuplikan kode di bawah ini digunakan untuk menampilkan gambar header di halaman ini:

```HTML
<picture>
  <source
    media="(max-width: 767px)"
    sizes="(max-width: 614px) 100vw, 614px"
    srcset="
      /cover/img.jpg?style=cover-1x1-1 200w,
      /cover/img.jpg?style=cover-1x1-2 333w
    ">
  <img
    src="/cover/img.jpg?style=cover"
    alt="How I Rebuild My Site Using Nuxt.js and Tailwind CSS"
    sizes="(max-width: 4800px) 40vw, 1920px"
    srcset="
      /cover/img.jpg?style=cover-1   480w,
      /cover/img.jpg?style=cover-2   766w
      "
    class="header__img"
    >
</picture>
```

Poin dari cuplikan kode itu adalah bahwa ada banyak URL gambar tetapi semuanya dalam titik akhir yang sama hanya berbeda dalam string kueri.

**String kueri digunakan untuk membedakan ukuran gambar yang berbeda.** Sebagai contoh, `/cover/img.jpg?style=cover-1` memiliki ukuran gambar 480x154 tetapi`/cover/img.jpg?style=cover-2` memiliki ukuran gambar 766x245.

Modul terakhir yang saya gunakan adalah [Nuxt PWA](https://pwa.nuxtjs.org/). **PWA akan meningkatkan kecepatan halaman dengan mengaktifkan cache di sisi browser**.

## Bagaimana saya membuat situs saya lulus tes Google Web Speed?
Hal yang baik ketika menggunakan Nuxt.js adalah situsnya akan lebih cepat karena mode aplikasi universal. Mode aplikasi universal menggabungkan _server-side rendering_ dan _single page application_.

_Server-side rendering_ berarti HTML dan CSS dihasilkan di sisi server. Setelah halaman dikirim ke browser, HTML dan CSS tersebut akan bertindak sebagai _single page application_.

Sisi negatif menggunakan _single page application_ saja adalah bundel JavaScript mungkin terlalu besar. Terkadang SPA tidak cocok untuk koneksi jaringan yang lambat.

Biasanya, ketika bundel JavaScript sedang dimuat, bilah pemuatan ditampilkan kepada pengguna. Jika bundel JavaScript cukup besar, itu akan meningkatkan beberapa nilai metrik seperti waktu untuk interaktif.

_Time to interactive_ mengukur seberapa baik situs untuk berinteraksi dengan pengguna untuk pertama kalinya.

_Server-side rendering_ dapat mengatasi masalah itu dengan mengirim HTML dan CSS terlebih dahulu. Pengguna akan segera melihat konten halaman.

Selain mendapatkan manfaat dari Nuxt.js, Cloudflare juga banyak membantu untuk mendapatkan skor yang lebih baik dalam tes Google Web Speed.

## Bagaimana saya membuat situs saya se SEO mungkin?
SEO adalah sebuah misteri. Tidak ada yang tahu apa pendapat Google tentang situs kami. Namun untuk saat ini, Google selalu mendorong untuk membuat konten yang baik, membuat situs secepat mungkin, dan meningkatkan aksesibilitas pengguna. Selanjutnya biarkan Google yang melakukan sisanya.

Selain melakukan itu, saya juga mencoba menggunakan data struktur yang baik untuk situs saya. Saya menggunakan [JSON-LD](https://json-ld.org/) untuk membantu Google mengetahui situs saya dengan lebih baik.

Data terstruktur adalah format standar untuk memberikan informasi tentang halaman dan mengklasifikasikan konten halaman.

## _Highlighter_ kode mana yang akan saya gunakan, prism.js atau highlight.js?
Saya memilih highlight.js. Pembuat highlight.js menyatakan:

> Salah satu prinsip desain yang menentukan highlight.js sejak awal adalah kesederhanaan. Bukan kesederhanaan secara kode (sebenarnya, ini cukup rumit) tetapi kesederhanaan penggunaan dan tampilan aktual cuplikan yang disorot di laman HTML.

Saya sangat suka kesederhanaan, prinsip desain dari highlight.js sangat cocok untuk saya.

Selain alasan itu, lebih mudah untuk menemukan tema highlight.js daripada tema prism.js.

## Penutup
Woah, untuk pertama kalinya saya menulis artikel yang sangat panjang dalam Bahasa Inggris dan Bahasa Indonesia secara bersamaan.

And for the reader that has completed read all of the words above. I'm very grateful to you.

Hal terakhir yang ingin saya katakan tentang topik ini adalah membuat situs menggunakan Nuxt.js dan semua teknologi yang saya sebutkan di atas adalah pengalaman yang sangat menarik.

Saya punya rencana untuk menulis artikel yang lebih detail tentang setiap bagian pada posting ini. Jadi tunggu saja!

Jika Kamu memiliki hal-hal hebat yang harus saya terapkan untuk situs ini. Cukup kirim pesan di akun twitter saya, [@jefrydco](https://twitter.com/jefrydco).
