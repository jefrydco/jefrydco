---
title: Pembuatan Ulang Blog Saya dengan Nuxt.js dan Tailwind CSS - Bagian 2
description: Pembuatan ulang blog saya dengan Nuxt.js dan Tailwind CSS membuat proses pengembangan lebih cepat.
summary: Saya telah mendapat jawaban tentang kerangka JavaScript mana yang menjadi alat utama, kerangka kerja CSS yang saya gunakan dan memiliki pemikiran tentang gaya JavaScript. Selanjutnya saya akan menjawab 5 pertanyaan berikutnya.
img: /cover/2019/04/rebuild-blog-with-nuxtjs-tailwindcss-image-by-markus-spiske.jpg
imgCreator: markusspiske
postedDate: 2019-04-25T15:49:14.624Z
updatedDate: 2019-04-25T15:49:14.624Z
slug: rebuild-blog-with-nuxtjs-tailwindcss-part-2
id: rebuild-blog-with-nuxtjs-tailwindcss-part-2
---

> Baca bagian pertama di sini, [Pembuatan Ulang Blog Saya dengan Nuxt.js dan Tailwind CSS - Bagian 1](/blog/rebuild-blog-with-nuxtjs-tailwindcss-part-1)

Saya telah mendapat jawaban tentang kerangka JavaScript mana yang menjadi alat utama, kerangka kerja CSS yang saya gunakan dan memiliki pemikiran tentang gaya JavaScript. Selanjutnya saya akan menjawab 5 pertanyaan berikutnya.

[toc]

## Di mana saya harus meng-host blog saya?
Saya memiliki dilema ketika saya memilih di mana saya harus meng-host blog saya. Karena blog saya dirancang untuk _server-side rendering_.

Saya harus menjalankannya di lingkungan node.js. Masalahnya adalah mana yang terbaik. Bukan yang terbaik sebagai fitur saja tetapi juga yang paling pas di dompet saya juga.

Ada beberapa pilihan yang saya temukan, saya dapat meng-host-nya di Google Cloud Platform di App Engine atau Compute Engine, di Amazon Web Service di EC2 atau Elastic Bean, dan yang terakhir di Heroku.

### Google App Engine atau Compute Engine
Saya telah mencoba untuk men-_deploy_ aplikasi sederhana di GCP baik di App Engine dan Compute Engine. Mereka semua hebat dalam menjalankan aplikasi.

Compute Engine memiliki kontrol lebih karena pada dasarnya VPS sehingga saya dapat mengaksesnya menggunakan SSH. Permasalahan dengan Compute Engine adalah saya harus mengurusi konfigurasi lingkungan docker, nginx dan sebagainya.

Saya suka bereksperimen dengan hal-hal tersebut, tetapi demi kesederhanaan dan keamanan blog saya, saya tidak ingin melakukan itu.

App Engine kurang memiliki kendali. App Engine  adalah platform sebagai layanan, hal tersebut berarti saya bisa fokus pada pengkodean dan Google mengurus server. App Engine lebih mudah daripada Compute Engine dalam hal pengoperasian. Satu-satunya hal yang harus saya lakukan adalah membangun blog saya kemudian men-_deploy_-nya.

Lebih mudah digunakan tidak berarti saya tidak memiliki masalah dengan blog saya. blog saya memiliki kondisi khusus karena saya menggunakan _markdown_ untuk menulis artikel. Modul [@nuxt/feed](https://github.com/nuxt-community/feed-module) perlu memuat file _markdown_ ketika blog saya beroperasi.

File _markdown_ tidak dapat dimuat melalui [Webpack Loader](https://webpack.js.org/loaders/), jadi saya harus membuatnya dimuat melalui node.js `fs.readFile ()` fungsi.

Saya tahu _feed_ bukan merupakan prioritas, tapi saya suka blog saya memiliki fitur lengkap untuk pembaca saya, jadi mengapa tidak?

### Amazon Web Service EC2 atau Elastic Beanstalk
Seperti yang saya lakukan di App Engine dan Compute Engine. Saya telah mencoba untuk men-_deploy_ aplikasi sederhana di EC2 dan Elastic Beanstalk juga.

Apa yang saya alami ketika saya mencoba melakukan hal yang sama pada AWS lebih buruk dari yang saya alami di GCP, terutama di Elastic Beanstalk. Tetapi pengalaman dengan EC2 sama dengan di Compute Engine.

Seperti yang harus dilakukan App Engine, Elastic Beanstalk dimaksudkan untuk membuat pengembangan aplikasi lebih mudah. Membuat pengembang lebih fokus pada kode daripada sisi penerapan.

Sebenarnya, saya hanya bisa men-_deploy_ ke Elastic Beanstalk dengan mengunggah proyek dalam file zip. Karena Amazon Web Service juga memiliki fitur yang disebut Code Build dan Code Pipeline, saya ingin mengimplementasikannya juga.

Idenya adalah setiap kali saya mengunggah perubahan ke dalam repositori Github, Code Build terpicu untuk membangun blog tersebut dan Code Pipeline menyalurkan hasilnya ke Elastic Beanstalk.

Pada awalnya, saya dapat mengkonfigurasi Code Build dengan sukses tetapi untuk Code Pipeline, saya tidak tahu mengapa hasil pembuatannya tidak dapat dilewatkan melalui Elastic Beanstalk.

Saya mencari melalui di forum pengembang dan merka menyarankan saya untuk mengkonfigurasi pada halaman IAM. Tapi seperti yang saya duga, konfigurasi tersebut sangat membingungkan. Ada banyak aturan untuk banyak hal. Saya tidak bisa memahami semuanya. Jadi saya menyerah dengan Amazon Web Service.

### Heroku
Opsi terakhir adalah [Heroku](https://www.heroku.com). Layanan Heroku mirip dengan App Engine di GCP atau Elastic Beanstalk di AWS tetapi lebih sederhana.

Heroku juga menyediakan [CI/CD](https://medium.com/@nirespire/what-is-cicd-concepts-in-continuous-integration-and-deployment-4fe3f6625007). Artinya, pengembang seharusnya hanya fokus pada pengkodean.

Ketika mereka mendorong perubahan ke repositori mereka, Heroku terpicu untuk menjalankan proses pembuatan lalu secara otomatis itu akan di-_deploy_.

Selain itu, **Heroku juga menyediakan SSL gratis untuk domain khusus saya**. Saat ini, SSL adalah hal wajib di web.

Semua kenyamanan yang disediakan Heroku memiliki pengorbanan. Biaya penggunaannya cukup mahal di antara layanan lain yang saya sebutkan di atas.

Saya sangat suka bagaimana CI / CD itu bekerja. Saya bahkan tidak berpikir lagi tentang rasa sakit mengerahkan sesuatu. Jadi harga mahal sepadan dengan layanan Heroku.

Untuk saat ini, saya akan menggunakan Heroku untuk meng-host blog ini. Mungkin pada titik tertentu, saya akan mempertimbangkan kembali alternatif Heroku jika harganya naik.

## Bagaimana cara mengonfigurasi blog saya untuk berfungsi dengan baik?
Saya membeli domain ini dari [Dewaweb](https://www.dewaweb.com) dan saya telah meng-host blog ini di penyedia hosting tersebut selama sekitar 2 tahun. Saya puas dengan layanannya. Masalahnya adalah, saya menggunakan _shared hosting_ yang hanya dapat menjalankan PHP.

Masalah kedua adalah Heroku tidak dapat menyediakan cara untuk menghubungkan domain _root_ seperti `jefrydco.id` ke layanan mereka. Heroku hanya dapat menerima subdomain, `www.jefrydco.id` misalnya. Tapi saya tidak ingin blog saya dimulai dengan www. Jadi saya mencari cara untuk menghapusnya.

### Pencarian penyedia DNS yang sesuai
Saya menemukan solusi dengan mengarahkan domain _root_ ke subdomain lain. Sedihnya, Dewaweb tidak bisa melakukan itu. Jadi saya memutuskan untuk mencari penyedia DNS lain. Dan saya menemukan [Cloudflare](https://www.cloudflare.com).

**Cloudflare menyediakan cara untuk menghapus www dari domain khusus di Heroku**. Hal tersebut diberi nama [CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-Understand-and-configure-CNAME-Flattening).

Cloudflare pada dasarnya adalah penyedia CDN tetapi memiliki konfigurasi DNS juga. **CDN adalah jaringan atau server proxy yang didistribusikan secara geografis yang dapat melayani blog dalam latensi rendah**.

Untuk mendapatkan pemahaman yang lebih baik tentang bagaimana CDN bekerja. Sebagai contoh, server saya berlokasi di Indonesia. Dua orang membuka blog saya, satu berlokasi di Singapura dan yang lain di Amerika Serikat.

Jika saya tidak menggunakan CDN, keduanya akan mengambil data blog saya dari Indonesia. Orang-orang di Singapura akan membuka blog saya lebih cepat daripada yang ada di AS karena jarak geolokasi.

Dengan menggunakan CDN, **Cloudflare akan melakukan _cache_ dan mereplikasi blog ini ke server yang berbeda di lokasi yang berbeda**. Jika seseorang mengakses blog saya, Cloudflare akan melihat server terdekat mereka ke lokasi seseorang tersebut apakah blog saya telah di-_cache_ atau belum.

Jika belum, Cloudflare akan meminta data blog saya dari server saya dan menyimpannya. Setelah itu, permintaan diteruskan ke browser seseorang tersebut. Jika telah di-_cache_, Cloudflare secara otomatis meneruskan _cache_ ke browser seseorang tersebut.

Dengan adanya _cache_, tidak perlu lagi mengambil data dari server saya. CDN sangat membantu untuk mengurangi penggunaan bandwidth server.

### Menyiapkan Heroku untuk pen-_deploy_-an otomatis dari Github
Sebenarnya, Heroku memiliki 2 opsi untuk pen-_deploy_-an, yaitu CI/CD dan Integrasi Github. Perbedaan di antara mereka adalah **CI/CD memerlukan beberapa _test case_ untuk dilewati** sebelum Heroku melepaskan komit saya ke produksi.

Dibandingkan dengan CI/CD, **Integrasi Github tidak memerlukan _test case_**, Heroku hanya menunggu repo saya jika ada komit baru. Komit tersebut memicu proses pembangunan. Jika proses pembangunan berhasil, maka secara otomatis akan dilepaskan ke produksi.

Saya lebih suka menggunakan Integrasi Github karena lebih sederhana. Tidak memerlukan test case.

Selanjutnya, Integrasi Github di Heroku telah didokumentasikan di sini, [Integrasi GitHub (Heroku GitHub Deploys)](https://devcenter.heroku.com/articles/github-integration).

## Bagaimana saya mengoptimalkan blog saya secepat mungkin?
Optimasi halaman untuk blog ini dibagi menjadi 2 hal. Yang pertama dilakukan oleh Cloudflare dan yang kedua saya lakukan sendiri.

### Optimasi Halaman oleh Cloudflare
Cloudflare memiliki beberapa layanan yang dapat digunakan untuk mengoptimalkan blog saya. Yang pertama disebut _auto-minification_, idenya adalah bahwa setiap HTML, CSS, dan JavaScript blog saya diperkecil oleh server Cloudflare.

Yang kedua adalah mengaktifkan kompresi HTTP menggunakan algoritma [Brotli](https://brotli.org/).

Yang berikutnya adalah [Rocket Loader](https://support.cloudflare.com/hc/en-us/articles/200168056-What-does-Rocket-Loader-do-). _Rocket Loader_ akan memprioritaskan konten blog (teks, gambar, font, dll) dengan menunda pemuatan semua JavaScript hingga setelah rendering.

Sebenarnya, masih ada layanan Cloudflare lainnya untuk mempercepat blog saya. Tetapi mereka semua berbayar.

### Optimasi halaman oleh saya sendiri
Saya menggunakan beberapa modul Nuxt.js untuk mempercepat blog ini.

Memuat font terkadang membuat perenderan halaman tertunda. Untuk mengatasi masalah itu, modul Nuxt.js pertama yang saya gunakan adalah [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader). Webfontloader adalah pustaka JavaScript untuk memuat font secara tidak sinkron dari Google Font.

Yang kedua adalah [nuxt-purgecss](https://github.com/Developmint/nuxt-purgecss), modul ini menghapus CSS yang tidak perlu yang tidak saya gunakan pada setiap halaman. Purge CSS bekerja sangat baik dengan Tailwind.

Dua modul di atas dibuat oleh [Alexander Lichter](https://twitter.com/TheAlexLichter). Dia adalah salah satu tim inti dari Nuxt.js. Dia sering menulis artikel tentang tips Vue.js dan Nuxt.js di blog-nya. Kamu dapat melihat blognya di sini, [blog.Lichter.io](https://blog.lichter.io/).

Yang berikutnya adalah [@reallifedigital/nuxt-image-loader-module](https://github.com/reallifedigital/nuxt-image-loader-module). Modul ini akan memanipulasi gambar dengan menggunakan [Graphicsmagick](http://www.graphicsmagick.org). Modul ini akan memotong dan mengubah ukuran gambar sesuai permintaan.

Bersama dengan modul ini, saya menggunakan tag `<picture>` yang dikombinasikan dengan atribut `srcset` dalam tag` <img> `. Hal semacam ini disebut **gambar responsif**. Cuplikan kode di bawah ini digunakan untuk menampilkan gambar header di halaman ini:

```html
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

## Bagaimana saya membuat blog saya lulus tes Google Web Speed?
Hal yang baik ketika menggunakan Nuxt.js adalah blognya akan lebih cepat karena mode aplikasi universal. Mode aplikasi universal menggabungkan _server-side rendering_ dan _single page application_.

_Server-side rendering_ berarti HTML dan CSS dihasilkan di sisi server. Setelah halaman dikirim ke browser, HTML dan CSS tersebut akan bertindak sebagai _single page application_.

Sisi negatif menggunakan _single page application_ saja adalah bundel JavaScript mungkin terlalu besar. Terkadang SPA tidak cocok untuk koneksi jaringan yang lambat.

Biasanya, ketika bundel JavaScript sedang dimuat, bilah pemuatan ditampilkan kepada pengguna. Jika bundel JavaScript cukup besar, itu akan meningkatkan beberapa nilai metrik seperti waktu untuk interaktif.

_Time to interactive_ mengukur seberapa baik blog untuk berinteraksi dengan pengguna untuk pertama kalinya.

_Server-side rendering_ dapat mengatasi masalah itu dengan mengirim HTML dan CSS terlebih dahulu. Pengguna akan segera melihat konten halaman.

Selain mendapatkan manfaat dari Nuxt.js, Cloudflare juga banyak membantu untuk mendapatkan skor yang lebih baik dalam tes Google Web Speed.

## Bagaimana saya membuat blog saya se SEO mungkin?
SEO adalah sebuah misteri. Tidak ada yang tahu apa pendapat Google tentang blog kami. Namun untuk saat ini, Google selalu mendorong untuk membuat konten yang baik, membuat blog secepat mungkin, dan meningkatkan aksesibilitas pengguna. Selanjutnya biarkan Google yang melakukan sisanya.

Selain melakukan itu, saya juga mencoba menggunakan data struktur yang baik untuk blog saya. Saya menggunakan [JSON-LD](https://json-ld.org/) untuk membantu Google mengetahui blog saya dengan lebih baik.

Data terstruktur adalah format standar untuk memberikan informasi tentang halaman dan mengklasifikasikan konten halaman.

## Penutup
Saya akhirnya memilih Heroku untuk meng-_host_ blog ini. Tapi Heroku hanya menerima subdomain. Saya harus menemukan penyedia DNS yang dapat memetakan domain root menggunakan catatan CNAME yang disediakan Heroku. Saya menemukan Cloudflare untuk melakukan fungsi itu.

Cloudflare juga membantu saya mengoptimalkan blog ini dengan sangat baik. Itu dapat mengompres respons HTTP sebagai gzip atau brotli.

Cloudflare membuat cache blog ini di server mereka sendiri. Setelah pengguna meminta blog ini untuk pertama kalinya, itu tidak akan menyentuh server saya secara langsung lagi.

Selain itu, saya juga menggunakan modul PWA untuk Nuxt.js. Ini membantu blog ini di-cache di sisi klien.

Dengan menggunakan mekanisme caching itu, blog ini akan mendapatkan skor yang baik dalam tes Google Web Speed. Ini juga membantu meningkatkan SEO. Selain itu, saya juga menggunakan data terstruktur juga.

Woah, untuk pertama kalinya saya menulis artikel yang sangat panjang dalam Bahasa Inggris dan Bahasa Indonesia secara bersamaan.

And for the reader that has completed read all of the words above. I'm very grateful to you.

Hal terakhir yang ingin saya katakan tentang topik ini adalah membuat blog menggunakan Nuxt.js dan semua teknologi yang saya sebutkan di atas adalah pengalaman yang sangat menarik.

Saya punya rencana untuk menulis artikel yang lebih detail tentang setiap bagian pada posting ini. Jadi tunggu saja!

Jika Kamu memiliki hal-hal hebat yang harus saya terapkan untuk blog ini. Cukup kirim pesan di akun twitter saya, [@jefrydco](https://twitter.com/jefrydco).
