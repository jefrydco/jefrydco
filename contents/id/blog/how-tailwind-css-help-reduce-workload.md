---
title: Bagaimana Tailwind CSS Dapat Membantu Meringankan Beban Pekerjaan Kita?
description: Tailwind CSS sangat membantu meringankan beban pekerjaan kita
summary: Hampir semua permasalahan mengenai cara mempercepat pengembangan suatu fitur dapat diselesaikan menggunakan Tailwind CSS.
img: /cover/2019/12/how-tailwind-css-help-reduce-workload-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2019-12-25T05:05:00.000Z
updatedDate: 2019-12-25T05:05:00.000Z
slug: how-tailwind-css-help-reduce-workload
---

Bayangkan kita adalah seorang _principal engineer_ di suatu perusahaan teknologi terkenal di Indonesia, katakanlah perusahaan A. Seluruh _engineer_ perusahaan ini murni dari Indonesia.

Lain halnya dengan perusahaan kompetitornya, perusahaan B. Hampir seluruh _engineer_-nya impor dari luar negeri. Setiap minggu perusahaan kompetitor mampu merilis fitur baru yang tak pernah terbayangkan ada sebelumnya.

Suatu hari di perusahaan A saat _Townhall_ berlangsung, "Kalau terus-terusan merilis fitur baru, kita bisa kalah saing nih dengan perusahaan kompetitor", pikir CEO perusahaan A. Kemudian ia _ngomong_ ke semua anak buahnya bahwa fokus perusahaan tahun ini adalah mengalahkan perusahaan B.

Setelah _Townhall_ usai, semua divisi berusaha dengan keras menerjemahkan keinginan CEO ke dalam _action item_ yang tepat agar target perusahaan tahun ini bisa tercapai.

Sebagai seorang _principal engineer_, setelah mendengar target perusahaan tahun ini dari CEO. Ia langsung menangkap bahwa salah satu target atau KPI (_Key Performance Indicator_) yang harus kita capai di tahun ini adalah **mempercepat pengembangan suatu fitur**.

Lantas ia memikirkan selama ini hal-hal apa saja yang dapat menghambat pengembangan suatu fitur, dan menemukan beberapa hal berikut:

## Daftar Isi

## Contoh Studi Kasus

_Principal engineer_ yang kesehariannya memikirkan dan membuat _tool_ untuk mempercepat pengembangan suatu fitur menyadari hal ini.

Beberapa hari yang lalu, ia baru saja diminta untuk menambahkan fitur notifikasi. Ia berpikir notifikasi yang ia buat harusnya dapat digunakan lagi oleh _engineer_ lain kedepannya. Selain itu, notifikasi tersebut juga seharusnya memiliki berbagai macam status, seperti sukses dan gagal.

Awalnya ia membuat notifikasi tersebut seperti ini,

<app-notification></app-notification>

dengan kode seperti ini,

```html
<div class="notification">
  <div class="notification__logo-wrapper">
    <img class="notification__logo" src="/img/logo.svg" alt="Logo Pesan Baru">
  </div>
  <div class="notification__content">
    <h4 class="notification__title">Pesan Baru dari Bos</h4>
    <p class="notification__message">Selamat, gaji kamu bulan ini naik!</p>
  </div>
</div>

<style>
  .notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .notification--success,
  .notification--error {
    color: #fff;
  }
  .notification--success {
    background-color: #48BB78;
  }
  .notification--error {
    background-color: #F56565;
  }
  .notification__logo-wrapper {
    flex-shrink: 0;
  }
  .notification__logo {
    height: 3rem;
    width: 3rem;
  }
  .notification__content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .notification__title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .notification__message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

## _Mikirin_ Nama 🤔 

Namun dia _merasa_ tiap kali ia membuat API atau fitur yang nantinya akan digunakan oleh _engineer-engineer_ lainnya, ia harus memikirkan nama yang intuitif. Ia bisa menghabiskan waktu berjam-jam hanya untuk memikirkan nama. Ia berpendapat bahwa memikirkan nama itu berat, _engineer_ lain _ngga_ akan kuat, cukup ia saja.

Penamaan _class_ untuk fitur notifikasi di atas pun demikian. Ia sempat bingung mana yang lebih baik memberi nama _class_ `notification` yang panjang atau `notif` yang lebih pendek.

Untuk bagian konten perlu ditambahkan _class_ `notification__content` atau tidak. Di bagian judul, nama _class_ yang baik `notification__title` atau `notification__heading`. Bagian isi notifikasi, `notification__message` atau `notification__text`.

Untuk status sukses dan gagal, apa perlu ditambahkan nama _class_ baru `notification--succes` dan `notification--error` atau hanya `--success` dan `--error` saja. Tetapi ia berpikir kalau menggunakan opsi kedua, sepertinya akan lebih baik jika membuat _class_ tersebut sebagai _global modifier_ sehingga jika ditambahkan di class manapun statusnya bisa berubah.

Banyak sekali pertimbangan yang harus ia pikirkan secara matang. Lain halnya jika menggunakan Tailwind CSS. Tailwind CSS sudah menyediakan banyak sekali nama _class_ yang sangat intuitif dan mudah digunakan.

Bahkan jika kita menggunakan Visual Studio Code, sudah ada _extension_ yang bernama [Tailwind CSS InteliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) untuk menambahkan fitur _autocomplete_ nama _class_ yang terdapat pada Tailwind CSS.

Oh ya, tahukah teman-teman bahwa _mikirin_ nama adalah salah satu dari [3 hal tersulit dalam ilmu komputer](https://twitter.com/codinghorror/status/506010907021828096)? Hah _mikirin_ nama, nama apaan? Iya nama, nama apapun yang akan kita gunakan di ilmu komputer.

<app-img src="/content/2019/12/jeff-atwood-two-hard-things-computer-science-by-jefrydco.jpg" alt="Jeff Atwood Two Hard Things in Computer Science"></app-img>

Omong-omong, sepertinya Om [Jeff Atwood](https://twitter.com/codinghorror) _typo_ tuh, seharusnya Ia menulis _three hard things_ tetapi malah menulis _two hard things_. 😅 

## CSS Gendut

Ia sangat puas dengan hasil karyanya, namun sejenak ia berpikir. Kalau setiap ada fitur baru, ia harus menambah deklarasi CSS baru juga. Maka _lama-kelamaan_ ukuran CSS bisa menjadi semakin _membludak_.

Hal tersebut tidak akan terjadi jika menggunakan Tailwind CSS. Semua _class_ yang disediakan bisa digunakan kembali.

Kalau kata Om [Andy Hunt](https://en.wikipedia.org/wiki/Andy_Hunt_(author)) dan Om [Dave Thomas](https://en.wikipedia.org/wiki/Dave_Thomas_(author)) dalam bukunya yang berjudul [The Pragmatic Programmer](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer),

> Setiap butir pengetahuan harus bersifat unik, tidak membingungkan, dan mempunyai tugas yang jelas di dalam suatu sistem.

atau yang lebih kita kenal dengan istilah **prinsip DRY (_Don't Repeat Yourself_)**.

Maksud dari penerapan prinsip DRY di sini adalah karena semua _class_ untuk membuat gaya telah disediakan oleh Tailwind CSS, kita tidak perlu menambahkan deklarasi CSS baru. Kita hanya perlu menggunakan kembali _class_ yang disediakan Tailwind CSS sesuai dengan gaya yang kita mau.

## Perubahan yang Menakutkan 😨 

Apalagi jika ada CSS yang digunakan di banyak tempat dan ternyata CSS tersebut tidak sesuai dengan keadaan saat ini. _Mau ngga mau_ kita harus me-_override_-nya, atau yang lebih ekstrim menyesuaikannya dengan keadaan.

Iya kalau yang menulis deklarasi CSS tersebut kita sendiri, kalau orang lain? Bahkan walaupun yang menulis kita sendiri pun, seringnya kita tidak mengingatnya.

Om [Joshua Clayton](https://www.quora.com/profile/Joshua-Clayton-4) pernah menjawab suatu pertanyaan serupa di Quora, [Apakah pemrogram komputer ketika melihat kode yang pernah mereka tulis berpikir, "Bagaimana aku menulisnya saat itu?"](https://www.quora.com/Do-some-programmers-look-at-the-code-they-wrote-and-think-How-did-I-write-that#wJBq1yPm1).

Karena pertanyaan dan jawaban aslinya ditulis dalam Bahasa Inggris, maka jika diterjemahkan dalam Bahasa Indonesia kira-kira seperti berikut,

> Selalu tulis kode yang dapat dimengerti oleh orang berikutnya yang akan mengerjakannya, karena seringnya orang berikutnya adalah dirimu sendiri.

Apalagi jika fitur tersebut sudah cukup besar, perubahan sedikit pun dapat merusak banyak hal. Sungguh sangat menakutkan bukan?

---

Setelah si _principal engineer_ mer-_refactor_ kodenya menggunakan Tailwind CSS, kode di atas akan menjadi seperti ini,

```html
<div class="max-w-lg mx-auto flex p-6 bg-white rounded-lg shadow-lg mb-10">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="Logo Pesan Baru">
  </div>
  <div class="ml-6 pt-1">
    <h4 class="text-xl text-gray-900 leading-tight mt-0 mb-1">Pesan Baru dari Bos</h4>
    <p class="text-base text-gray-600 leading-normal m-0">Selamat, gaji kamu bulan ini naik!</p>
  </div>
</div>
```

Dari contoh di atas mungkin teman-teman bertanya-tanya. Kalau hanya menambahkan _class_ pada suatu elemen, lantas apa bedanya dengan menggunakan gaya sebaris (_inline style_) seperti ini,

```html
<div style="max-width: 32rem; margin-left: auto; margin-right: auto; display: flex; padding: 1.6rem; background-color: #fff; border-radius: .5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); margin-bottom: 2.5rem">
  <div style="flex-shrink: 0">
    <img style="width: 3rem; height: 3rem" src="/img/logo.svg" alt="Logo Pesan Baru">
  </div>
  <div style="margin-left: 1.6rem; padding-top: .25rem">
    <h4 style="font-size: 1.25rem; color: #1a202c; line-height: 1.25; margin-top: 0; margin-bottom: .25rem">Pesan Baru dari Bos</h4>
    <p style="font-size: 1rem; color: #718096; line-height: 1.5; margin: 0">Selamat, gaji kamu bulan ini naik!</p>
  </div>
</div>
```

Walaupun keduanya menghasilkan hasil yang sama, ada beberapa keuntungan menggunakan utilitas _class_ dibandingkan dengan gaya sebaris.

### Kaidah Desain

Keuntungan pertama menggunakan utilitas _class_ dibandingkan gaya sebaris adalah semua _class_ Tailwind CSS telah dipikirkan secara mendalam dan dibuat sedemikian rupa agar ketika dikomposisikan menghasilkan gaya yang berkualitas dan konsisten.

Dengan kata lain, kita tidak perlu lagi memikirkan mengenai desain sistem. Apalagi setiap penamaan _class_ yang dibuat sangat intuitif dan mudah diingat.

Lain halnya jika kita menggunakan gaya sebaris, _masa_ iya kita mengingat-ingat semua kemungkinan nilai yang dapat digunakan dalam suatu desain sistem. Katakanlah properti `margin` memiliki beberapa kemungkinan nilai, .25rem, .5rem, .75rem, 1rem, ..., 12rem, 14rem, 16rem. Cukup banyak kemungkinan nilai yang harus kita ingat-ingat.

Menurut pendapat saya, lebih mudah mengingat huruf daripada angka. Otak kita dapat lebih mudah mencerna informasi jika informasi tersebut berkorelasi kuat satu sama lain. Sama hal nya dengan huruf, kita dapat dengan mudah menghubungkan antara huruf tersebut menjadi suatu kata, kata tersebut dapat dihubungkan lagi menjadi suatu kalimat.

Penamaan _class_ pada Tailwind CSS juga demikian, walaupun ada beberapa nama _class_ yang disingkat seperti `p` dan `m`. Otak kita akan secara otomatis mengasosiasikan kedua singkatan tersebut dengan `padding` dan `margin`.

Singkatan yang digunakan oleh Tailwind CSS juga telah umum digunakan, seperti `t`, `r`, `b`, dan `l` yang berarti `top`, `right`, `bottom` dan `left`. `sm`, `md`, `lg`, dan `xl` berarti `small`, `medium`, `large` dan `extra large`.

Cukup intuitif dan mudah dimengerti bukan?

Oh ya kalau misal perusahaan kita telah memiliki desain sistem sendiri, _gimana_ dong? Tenang ajah, gaya desain sistem Tailwind CSS dapat diubah-ubah sesuai kebutuhan kok. Yang perlu kita lakukan hanyalah mengubah konfigurasi tema-nya _saja_. Kita juga dapat melihat [konfigurasi standar tema](https://tailwindcss.com/docs/theme) yang digunakan oleh Tailwind CSS.

### Desain Responsif

Oke, masuk akal. Penggunaan utilitas _class_ memang ide yang bagus. Lantas _gimana_ cara menerapkannya ke desain responsif? Pasti _gamungkin_, iya kan?

_Eits_, tunggu dulu, Tailwind CSS juga dilengkapi dengan [utilitas desain responsif](https://tailwindcss.com/docs/responsive-design). Sehingga kita dapat dengan mudah membuat kondisi penerapan _class_ spesifik untuk ukuran layar tertentu, sesuai dengan kaidah desain responsif.

Yang perlu kita lakukan untuk menerapkan desain responsif adalah dengan menambahkan awalan di depan nama _class_ yang dimaksud. Katakanlah di ukuran layar _desktop_, suatu paragraf memiliki rata kiri. Sedangkan ketika berada di ukuran layar _mobile_, paragraf tersebut memiliki rata kanan dan kiri.

Sehingga deklarasi nama _class_ yang cocok untuk kasus tersebut adalah `text-left sm:text-justify`. Awalan `sm:` berarti _class_ `text-justify` hanya akan diterapkan ketika halaman dibuka pada layar ukuran `small` atau yang memiliki lebar layar kurang dari 640px. Lebih lengkap, kita dapat mempelajari lebih lanjut pada halaman [desain responsif](https://tailwindcss.com/docs/responsive-design).

### _Class_ Semu

Sekarang mungkin teman-teman juga bertanya-tanya, _gimana_ caranya _nerapin_ gaya untuk _class_ semu (_pseudo-class_) seperti `:hover` dan `:active`?

Untungnya Tailwind CSS juga dilengkapi dengan [varian _class_ semu](https://tailwindcss.com/docs/pseudo-class-variants), sehingga kita bisa menambahkan _class_ spesifik ketika keadaan _class_ semu terpenuhi. Untuk demonya, kita dapat mencoba mengarahkan kursor ke 3 jenis notifikasi <a href="#notification">di atas</a>. Tiga jenis notifikasi di atas murni dibuat menggunakan utilitas _class_ dari Tailwind CSS.

Jika kita perhatikan, ketika kursor mengarah ke notifikasi akan terdapat perubahan _box shadow_. Efek tersebut mungkin tidak seberapa terlihat jika mode gelap diaktifkan, jadi kita dapat mencobanya dengan mode terang.

Cara menambahkan gaya untuk _class_ semu juga cukup mudah. Caranya sama seperti menambahkan kondisional untuk desain responsif, yakni dengan menambahkan awalan. Untuk kasus notifikasi di atas, _class_ yang perlu ditambahkan adalah `shadow-lg hover:shadow-2xl`. Awalan `hover:` berarti _class_ `shadow-2xl` akan aktif ketika kursor diarahkan ke notifikasi.

## Maintenis itu Susah 😫 

Bagaimana jika kita ingin menggunakan utilitas _class_ tersebut pada hal-hal yang umum misalkan tombol, apa kita juga perlu menghafalkan lagi nama-nama _class_ yang harus digunakan?

Tailwind CSS tidak akan memaksa kita untuk menghafalkan satu nama _class_ apapun. Semua nama _class_ tersebut akan dengan sendirinya teringat dengan baik jika kita sering menggunakannya.

Sehingga agar lebih memudahkan penggunaan _class_ pada hal-hal yang umum seperti tombol, kita dapat membuat nama _class_ baru menggunakan utilitas _class_ yang disediakan Tailwind CSS.

Katakanlah kita ingin membuat tombol seperti ini,

<app-button></app-button>

kita dapat membuat nama _class_ baru dan menggunakan `@apply` untuk menerapkan utilitas _class_ yang telah disediakan Tailwind CSS. Hasilnya seperti berikut,

```html
<button class="btn btn--orange">
  Button
</button>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn--orange {
    @apply bg-yellow-400 text-white;
  }
  .btn--orange:hover {
    @apply bg-orange-600;
  }
</style>
```

Jadi yang perlu kita ingat adalah nama _class_ dasar `btn` dan nama _class_ _modifier_-nya yakni `btn--orange`.

## Ikhtisar

Hampir semua permasalahan yang dialami oleh si _principal engineer_ mengenai bagaimana ia dapat mempercepat pengembangan suatu fitur dapat diselesaikan menggunakan Tailwind CSS. Itu hanyalah salah satu cara yang dapat kita lakukan, masih banyak hal lain yang perlu ditingkatkan lagi.

Kita sebagai _engineer_ dari Indonesia tidak boleh kalah dengan _engineer-engineer_ lain dari luar. Kompetisi boleh dilakukan tetapi kita juga harus banyak belajar dan berkolaborasi lagi dengan mereka untuk menghasilkan setuatu yang lebih baik lagi.

Jika teman-teman merupakan salah satu dari _principal engineer_ yang saya ceritakan di atas, mungkin hal pertama yang harus teman-teman lakukan untuk dapat mengadopsi Tailwind CSS adalah meyakinkan bos teman-teman. 🤭 

Dan jika teman-teman menjadi salah seorang pengambil keputusan, mungkin teman-teman dapat mencoba menggunakan Tailwind CSS dan mohon beritahu saya bagaimana hasilnya!

Akhir kata, terima kasih telah membaca dan semoga bermanfaat! 🙌 
