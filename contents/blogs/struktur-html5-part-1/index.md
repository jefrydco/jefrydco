---
title: Struktur HTML5 yang Baik - Bagian 1
description: Struktur HTML5 yang baik dapat membuat dokumen HTML lebih mudah dipahami baik oleh manusia maupun oleh mesin pencari.
summary: Halo teman-teman, kali ini saya mulai bahas satu per satu seri optimasi website, dimulai dari struktur HTML5 yang baik. Mengapa sih kita perlu memperhatikan struktur HTML5? Ada apakah dengan struktur HTML5 yang biasa kita gunakan? Apa dampaknya menggunakan struktur HTML5 yang baik itu bagi website kita?
img: /cover/2017/08/struktur-html5-image-by-sai-kiran-anagani.jpg
imgCreator: _imkiran
postedDate: 2017-08-27T11:00:00.000Z
updatedDate: 2017-08-27T11:00:00.000Z
slug: struktur-html5-part-1
id: struktur-html5-part-1
---

> Baca bagian kedua di sini, <nuxt-link to="/blog/struktur-html5-part-2">Struktur HTML5 yang Baik - Bagian 2</nuxt-link>

Halo teman-teman, kali ini saya mulai bahas satu per satu seri optimasi _website_, dimulai dari struktur HTML5 yang baik. Mengapa sih kita perlu memperhatikan struktur HTML5? Ada apakah dengan struktur HTML5 yang biasa kita gunakan? Apa sih dampaknya menggunakan struktur HTML5 yang baik itu bagi _website_ kita?

## Apa?

Sebenarnya jawaban dari ketiga pertanyaan tersebut saling berhubungan. Sebelumnya mari kita mendefinisikan terlebih dahulu apa itu HTML5.

> HTML5 adalah sebuah bahasa markah yang digunakan untuk penataan struktur dan penyajian konten pada World Wide Web.

Nah, sudah jelaskan definisinya, HTML5 digunakan untuk penataan struktur dan penyajian konten. Selain itu salah satu tujuan dibuatnya HTML5 juga agar WWW lebih bermakna dan mudah dimengerti, baik oleh manusia maupun mesin pencari. Oleh karena itu ditambahkanlah beberapa tag baru yang lebih bermakna sesuai dengan fungsinya masing-masing.

## Mengapa?

Menjawab pertanyaan mengapa kita perlu memperhatikan struktur HTML5? Ya agar lebih bermakna sesuai dengan tujuan dibuatnya HTML5. Ada apakah dengan struktur HTML5 yang biasa kita gunakan? Walaupun kita telah mendefinisikan HTML5 pada _website_ yang kita buat, seringnya kita lalai tidak menggunakan tag sesuai dengan fungsinya. Apa dampaknya menggunakan struktur HTML5 yang baik bagi _website_ kita? _Website_ kita akan lebih mudah dipahami strukturnya baik oleh manusia maupun oleh mesin pencari sehingga search engine optimization (SEO) pun juga menjadi lebih baik.

## Bagimana?

Oh ya struktur HTML5 yang saya bahas di sini adalah struktur HTML5 yang baik menurut pemahaman saya dari membaca beberapa literatur mengenai HTML5 ya. Kalau ada yang kurang tepat, dimohon dengan sangat teman-teman dapat memberi kritik dan sarannya. Lanjut ke pembahasan, lalu bagaimakah struktur HTML5 yang baik itu? Mari kita kupas per bagian struktur tersebut.

```html
<!DOCTYPE html>
```

Tag di atas digunakan untuk mendefinisikan bahwa suatu dokumen HTML adalah HTML5.

```html
<html lang="id" prefix="og: http://ogp.me/ns#">
```

Tag di atas merupakan tag yang akan membungkus semua tag HTML lainnya. Di dalam tag tersebut terdapat atribut `lang="id"` yang berarti bahwa dokumen HTML5 yang kita buat berbahasa Indonesia. Selain itu terdapat juga atribut `prefix="og:http://ogp.me/ns#"`, atribut ini merupakan deklarasi namespace dari Facebook untuk penggunaan open graph.

```html
<head>
    <meta charset="utf-8"
```

Tag meta di atas mendefinisikan bahwa dokumen HTML5 yang kita buat menggunakan pengodean karakter [UTF-8](https://en.wikipedia.org/wiki/UTF-8).

```html
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
```

Tag meta [X-UA-Compatible](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do) digunakan untuk mendefiniskan dokumen HTML agar ditampilkan pada Internet Explorer versi berapa. Untuk tag meta X-UA-Compatible di atas, nilai atribut `content="IE=edge"` menginstruksikan agar dokumen HTML yang kita buat ditampilkan pada Internet Explorer versi terbaru.

```html
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
```

Tag [meta viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport?hl=en) digunakan untuk mengontrol bagaimana dokumen HTML ditampilkan pada perangkat mobile. Untuk tag meta viewport di atas, terdapat beberapa nilai atribut `content`:

- `width=device-width`, digunakan untuk menampilkan lebar dokumen HTML mengikuti lebar layar perangkatnya.
- `initial-scale=1`, digunakan untuk mengatur tingkat pembesaran (_zooming_) awal, nilai 1 berarti 1 piksel CSS sama dengan 1 piksel _viewport_.
- `minimum-scale=1`, digunakan untuk mengatur tingkat pembesaran (_zooming_) minimum, nilai 1 berarti pengguna tidak akan bisa melakukan pembesaran (_zooming_).
- `maximum-scale=1`, digunakan untuk mengatur tingkat pembesaran (_zooming_) maksimum, nilai 1 berarti pengguna tidak akan bisa melakukan pembesaran (_zooming_).

Nilai atribut `minimum-scale=1` dan `maximum-scale=1` dapat menjadi opsional jika teman-teman membolehkan pengguna untuk melakukan pembesaran (_zooming_) pada _website_ ketika dibuka pada peramban mobile.

```html
    <link rel="dns-prefetch" href="DNS yang ingin di prefetch">
```

Tag link [dns-prefetch](https://varvy.com/rel/dns-prefetch.html) digunakan untuk menghubungi suatu domain sebelum ia secara eksplisit digunakan. Contoh penggunaannya adalah jika kita menyimpan gambar, CSS dan JavaScript di domain yang berbeda. Katakanlah _website_ kita berada pada domain jefrydco.id dan berkas aset pada domain static.jefrydco.id, maka kita menginstruksikan peramban untuk menghubungi static.jefrydco.id sebelum digunakan untuk mengambil gambar, CSS dan JavaScript tersebut. Link dns-prefetch sangat berguna untuk mengurangi [waktu pencarian DNS](https://varvy.com/performance/dns-lookup-time.html).

```html
    <title>Judul Halaman - Nama Situs</title>
```

Tag di atas digunakan untuk mendefinisikan judul suatu dokumen HTML. Yang perlu diperhatikan adalah konten yang ada di dalam tag tersebut menggunakan struktur Judul Halaman - Nama Situs. Struktur seperti itu digunakan pada _website_ besar seperti Wikipedia, Youtube, Stackoverflow dan _website_ besar lainnya untuk mengoptimalkan _search engine optimization_ (SEO).

Jika kita ingin mencari informasi yang spesifik pada suatu _website_ menggunakan Google, kita biasanya juga menggunakan kata kunci dengan pola seperti itu bukan? Misalnya, "Meja belajar bukalapak", "Berita korupsi terbaru kompas", "Aku ingin setia Youtube". Walaupun _website_-nya sendiri (bukalapak, kompas dan youtube) telah menyediakan _form_ pencarian, tetap saja kita menggunakan Google untuk mencari informasi yang terdapat pada situs tersebut.

Pada umumnya alur seseorang ketika mencari informasi yang spesifik pada suatu _website_ adalah mencari menggunakan kata kunci dengan pola seperti di atas, baru kemudian menggunakan _form_ pencarian yang disediakan oleh _website_-nya.

```html
    <style></style>
```

Tag di atas digunakan untuk mendefinisikan _style_. Namun dalam konteks ini, tidak sembarang _style_ yang dapat dicantumkan pada tag tersebut, hanya _style_ yang digunakan untuk [jalur _rendering_ penting](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/) yang dapat dicantumkan. Lebih lanjut mengenai jalur _rendering_ penting akan dibahas pada pos selanjutnya.

```html
    <link rel="stylesheet" href="URL CSS Eksternal">
```

Tag link _stylesheet_ digunakan untuk mendefinisikan CSS eksternal. Sebenarnya tag link _stylesheet_ ini kurang baik digunakan untuk mengoptimalkan pengiriman CSS. Lebih lanjut akan dibahas pada pos selanjutnya.

```html
    <meta name="keywords" content="Kata kunci halaman saat ini">
    <meta name="description" content="Deskripsi halaman saat ini">
```

Tag meta _keywords_ digunakan untuk mendefinisikan kata kunci yang berhubungan dengan konten pada dokumen HTML5. Sedangkan meta description digunakan untuk memberi deskripsi singkat mengenai konten pada dokumen HTML5. Oh ya, meta _keywords_ dapat menjadi opsional karena Google dari tahun 2009 tidak menggunakannya lagi.

Tapi teman-teman dapat mencantumkannya karena kemungkinan mesin pencari lain masih menggunakan meta _keywords_ sebagai faktor penentu. Sedangkan meta description masih digunakan Google sebagai potongan deskripsi pada halaman hasil pencarian. Lebih lanjut pembahasan mengenai kedua tag tersebut, teman-teman dapat melihat dua video berikut; [Google does not use the keywords meta tag in web ranking](https://youtu.be/jK7IPbnmvVU) and [How much time should I spend on meta tags, and which ones matter?](https://youtu.be/RBTBEfd7z_Y)

```html
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Nama situs">
    <meta property="og:url" content="URL halaman">
    <meta property="og:title" content="Judul halaman">
    <meta property="og:description" content="Deskripsi halaman">
    <meta property="og:image" content="Gambar yang merepresentasikan halaman">
    <meta property="og:image:secure_url" content="Gambar yang merepresentasikan halaman">
    <meta property="og:image:type" content="Ekstensi gambar">
    <meta property="og:image:width" content="Ukuran lebar gambar">
    <meta property="og:image:height" content="Ukuran tinggi gambar">
    <meta property="og:image:alt" content="Judul gambar">
```

Tag meta open graph digunakan untuk memperkaya informasi halaman _website_ kita ketika diakses oleh [robot perayap Facebook](https://developers.facebook.com/docs/sharing/webmasters/crawler). Lebih lanjut mengenai meta open graph akan di bahas pada pos lain.

```html
    <meta property="fb:admins" content="ID Facebook kita sebagai admin">
    <meta property="fb:app_id" content="ID Aplikasi yang terhubung dengan website kita">
    <meta property="fb:pages" content="ID Facebook Page">
```

Tag meta facebook digunakan untuk mendefinisikan akun facebook mana yang terhubung dengan _website_ kita, baik sebagai admin, fanpage maupun aplikasi.

```html
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="URL halaman">
    <meta name="twitter:title" content="Judul halaman">
    <meta name="twitter:description" content="Deskripsi halaman">
    <meta name="twitter:image" content="Gambar yang merepresentasikan halaman">
    <meta name="twitter:creator" content="ID Twitter kita sebagai admin">
```

Tag meta twitter digunakan untuk memperkaya informasi halaman website kita ketika diakses oleh [robot perayap Twitter](https://dev.twitter.com/cards/getting-started#crawling). Lebih lanjut mengenai meta twitter akan dibahas pada pos lain.

```html
    <meta name="theme-color" content="Kode warna">
```

Tag meta [theme-color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) digunakan untuk mempercantik tampilan peramban Chrome mobile sehingga toolbar akan memiliki warna sesuai dengan nilai pada atribut `content` ketika sedang mengakses halaman _website_ kita. Contohnya seperti gambar berikut,

<app-img src="/content/2017/08/theme-color-image-by-jefrydco.jpg" alt="Theme color" />

```html
    <link rel="icon" sizes="192x192" href="URL ikon website">
</head>
```

Tag link icon digunakan untuk menampilkan gambar resolusi tinggi sebagai ikon pada Chrome mobile. Atribut `sizes` memiliki beberapa opsi nilai, 192x192, 96x96, 32x32, dan 16x16. Teman-teman dapat mencantumkan semua ukuran tersebut dengan menambahkan beberapa tag link icon yang mempunyai atribut `sizes` yang berbeda. Sebaiknya diurutkan dari tag link icon yang mempunyai nilai atribut `sizes` yang terbesar terlebih dahulu hingga terkecil.

Sehingga jika semua kode di atas digabungkan akan menjadi seperti berikut,

```html
<!DOCTYPE html>
<html lang="id" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
    <link rel="dns-prefetch" href="DNS yang ingin di prefetch">
    <title>Judul Halaman - Nama Situs</title>
    <style></style>
    <link rel="stylesheet" href="URL CSS Eksternal">
    <meta name="keywords" content="Kata kunci halaman saat ini">
    <meta name="description" content="Deskripsi halaman saat ini">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Nama situs">
    <meta property="og:url" content="URL halaman">
    <meta property="og:title" content="Judul halaman">
    <meta property="og:description" content="Deksripsi halaman">
    <meta property="og:image" content="Gambar yang merepresentasikan halaman">
    <meta property="og:image:secure_url" content="Gambar yang merepresentasikan halaman">
    <meta property="og:image:type" content="Ekstensi gambar">
    <meta property="og:image:width" content="Ukuran lebar gambar">
    <meta property="og:image:height" content="Ukuran tinggi gambar">
    <meta property="og:image:alt" content="Judul gambar">
    <meta property="fb:admins" content="ID Facebook kita sebagai admin">
    <meta property="fb:app_id" content="ID Aplikasi yang terhubung dengan website kita">
    <meta property="fb:pages" content="ID Facebook Page">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="URL halaman">
    <meta name="twitter:title" content="Judul halaman">
    <meta name="twitter:description" content="Deskripsi halaman">
    <meta name="twitter:image" content="Gambar yang merepresentasikan halaman">
    <meta name="twitter:creator" content="ID Twitter kita sebagai admin">
    <meta name="theme-color" content="Kode warna">
    <link rel="icon" sizes="192x192" href="URL ikon website">
</head>
```

Oke cukup sekian pembahasan mengenai struktur HTML5 yang baik kali ini hanya sampai pada tag penutup `</head>`. Di pos selanjutnya saya akan bahas lanjutan struktur HTML5 yang baik ini sampai tuntas. Semoga bermanfaat dan tetap semangat untuk terus belajar.

## Referensi
1. [Facebook for Developers: The Facebook Crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler)
2. [Google Developers: Configure the Viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport)
3. [Google Developers: Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
4. [Stackoverflow: What does <meta http-equiv=“X-UA-Compatible” content=“IE=edge”> do?](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do)
5. [The Open Graph Protocol](http://ogp.me/)
6. [Twitter Developers: URL Crawling & Caching](https://dev.twitter.com/cards/getting-started#crawling)
7. [Varvy: What is DNS Lookup Time?](https://varvy.com/performance/dns-lookup-time.html)
8. [Varvy: What is rel=dns-prefetch?](https://varvy.com/rel/dns-prefetch.html)
9. [Wikipedia: HTML5](https://en.wikipedia.org/wiki/HTML5)
10. [Wikipedia: UTF-8](https://en.wikipedia.org/wiki/UTF-8)
11. [W3Schools: HTML5 Introduction](https://www.w3schools.com/html/html5_intro.asp)
