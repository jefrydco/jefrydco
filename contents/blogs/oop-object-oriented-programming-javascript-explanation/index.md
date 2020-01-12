---
title: Versi Paling Ribet Penjelasan Konsep Pemrograman Berorientasi Objek pada JavaScript
description: Konsep pemrograman berorientasi objek pada JavaScript dijelaskan secara mendetail
summary: Konsep pemrograman berorientasi objek pada JavaScript dimulai dari pembahasan objek, this, kelas dan prototipe.
img: /cover/2020/01/javascript-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2020-01-10T01:00:00.000Z
updatedDate: 2020-01-10T01:00:00.000Z
slug: oop-object-oriented-programming-javascript-explanation
id: oop-object-oriented-programming-javascript-explanation
contributors: ['edwardanthony']
---

Sebelum pembahasan mengenai versi ribet konsep pemrograman berorientasi objek pada JavaScript ini dimulai, perlu saya garis bawahi bahwa konsep yang akan di bahas pada artikel ini adalah **versi paling ribet**.

Jadi kalau teman-teman ingin mencari referensi yang mudah dimengerti, saya sarankan untuk mencari referensi yang lain saja. 😅 

Tetapi kalau teman-teman ingin tahu lebih lanjut dan memaksa untuk membaca pembahasan di bawah ini, saya salut dengan teman-teman, mengapa?

Karena menurut pendapat saya, kalau versi ribetnya ajah kita telah memahami apalagi versi _gampang_-nya, ibaratnya seperti sepotong kue (_piece of cake_, ungkapan dari Bahasa Inggris yang berarti muda/_gampang_) kan? 😎 

Oke langsung saja, pertama-tama untuk dapat memahami versi ribet konsep pemrograman berorientasi objek pada JavaScript, kita harus memahami terlebih dahulu beberapa konsep pendahulunya. Konsep tersebut adalah objek, _this_, kelas dan prototipe yang akan di bahas pada poin 1 - 4.

[toc]

Sedangkan pada poin 5 - 8 baru akan di bahas versi ribet konsep pemrograman berbasis objek pada JavaScript. Kalau teman-teman merasa telah memahami konsep dasar yang saya sebutkan di atas, teman-teman dapat langsung meloncati pembahasan tersebut dan langsung menuju ke pembahasan inti.

## Objek

Objek adalah suatu tipe data pada JavaScript yang terdiri dari kunci (_key_) dan nilai (_value_). Nilai tersebut dapat berupa semua tipe data lain pada JavaScript, seperti angka (_number_), huruf/alfabet/karakter (_string_), benar salah (_boolean_), _array_, fungsi atau bahkan berisi objek lain. Contoh objek seperti berikut:

```javascript {2}
var objek = {
  angka: 7,                   // angka (number)
  huruf: 'ini string',        // huruf/alfabet/karakter (string)
  benarSalah: true,           // benar salah (boolean)
  array: [1, 2, 3],           // array
  fungsi: function() {        // fungsi
    return 'ini fungsi'
  },
  objekLain: {                // objek lain
    angka: 3,                 // angka (number)
    huruf: 'ini string lain', // huruf/alfabet/karakter (string)
    benarSalah: false,        // benar salah (boolean)
    array: [9, 8, 7]          // array
  }
}
```

Kita ambil contoh pada baris yang di cetak terang, `angka` adalah kunci (_key_) dan `7` adalah nilai (_value_).

Untuk mengecek apakah suatu objek memiliki kunci tertentu atau tidak dapat menggunakan _method_ `hasOwnProperty`. _Method_ ini menerima satu parameter bertipe _string_ yakni nama kunci yang ingin kita cek. Contoh penggunaannya seperti berikut:

```javascript
objek.hasOwnProperty('angka')
// true

objek.hasOwnProperty('tidakBenar')
// false
```

Pada contoh kode di atas, _method_ `hasOwnProperty` mengembalikan nilai berupa _boolean_. Bernilai `true` jika objek yang kita maksud memang mempunyai kunci yang ingin kita cek, dan sebaliknya `false` jika tidak.

### Objek Global

Secara standar, JavaScript yang dijalankan pada peramban akan memiliki objek global. Objek global tersebut adalah `window`. Jika kita menulis `window` pada konsol peramban seperti berikut,

```javascript
window
```

kode tersebut akan menghasilkan,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/window-javascript-by-jefrydco.png" alt="window JavaScript"/>

Objek global tersebut berisi beberapa hal berikut:

1. Semua fungsi bawaan JavaScript yang dapat kita gunakan secara langsung, seperti `parseInt` dan `parseFloat`
2. Semua tipe data data objek JavaScript, seperti `Array` dan `JSON`
3. Variabel yang kita deklarasikan sendiri menggunakan kata kunci `var`
4. Fungsi yang kita deklarasikan sendiri

Ada 3 cara untuk mendeklarasikan variabel pada JavaScript, menggunakan kata kunci `var`, `let` atau `const`. Nah kalau kita mendeklarasikan sebuah variabel menggunakan kata kunci `var`, secara otomatis variabel tersebut akan dilekatkan pada objek global, contohnya sebagai berikut:

```javascript {3,6}
var nama = 'jefrydco'

window.nama
// 'jefrydco'

nama
// 'jefrydco'
```

katakanlah kita mendeklarasikan sebuah variabel bernama `nama` menggunakan kata kunci `var`. Kita dapat mengakses variabel tersebut menggunakan `window.nama` ataupun hanya `nama` saja. Hal tersebut tidak berlaku jika kita mendeklarasikan variabel menggunakan `let` dan `const`. Lebih lanjut mengenai `let` dan `const` akan dibahas dilain kesempatan. 😁 

Begitu pula jika kita mendeklarasikan sebuah fungsi, secara otomatis fungsi tersebut akan dilekatkan pada objek global,

```javascript {5,8}
function fungsi() {
  return 'ini fungsi'
}

window.fungsi()
// 'ini fungsi'

fungsi()
// 'ini fungsi'
```

sehingga kita dapat memanggilnya dengan cara `window.fungsi()` atau langsung `fungsi()` saja. Sama seperti cara mendeklarasikan variabel, pelekatan fungsi secara otomatis ke objek global tidak akan berlaku jika kita mendeklarasikan fungsi tersebut menggunakan kata kunci `let` dan `const` ya.

Jadi bisa kita anggap bahwa objek global `window` adalah sebuah **variabel bawaan yang telah dideklarasikan oleh peramban dan berisi semua hal yang kita perlukan untuk menggunakan JavaScript**.

## _this_

Menurut pendapat saya, konsep ini merupakan salah satu konsep yang cukup rumit untuk dimengerti di dunia JavaScript selain konsep pemrograman berorientasi objek yang akan dibahas di bawah ini.

Dari segi definisi kita bisa menganggap `this` adalah **sebuah konteks dimana suatu objek/kode dieksekusi**. Kata kunci `this` akan banyak digunakan pada konsep pemrograman berorientasi objek. Ada beberapa konteks `this` yang perlu kita pahami.

### _this_ Pada Konteks Global

Yang pertama adalah `this` pada konteks global. Secara standar `this` pada konteks global akan mengarah ke <a href="#objek-global">objek global</a> itu sendiri yakni `window`. Sehingga jika kita mengetik kode berikut pada konsol peramban:

```javascript
this
```

akan menghasilkan,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/this-javascript-by-jefrydco.png" alt="this JavaScript"/>

Kita juga dapat mengecek apakah `this` pada konteks global apakah memang benar mengarah ke objek global `window` atau tidak menggunakan kode berikut:

```javascript
this === window
// true
```

kode tersebut akan menghasilkan nilai `true`.

### _this_ Pada Konteks Objek

Yang kedua adalah `this` pada konteks objek. Secara singkat, `this` pada **konteks objek akan mengarah ke objek sebelum tanda titik "."**.

Contohnya sebagai berikut:

```javascript {5}
var murid = {
  nama: "Budi",
  umur: 12,
  ucapkanSalam: function() {
    console.log(this.nama)
  }
}

murid.ucapkanSalam()
// Budi
```

Sebenarnya, kita juga bisa melakukan hal yang sama tanpa menggunakan `this` dengan mereferensikan langsung ke variable penampungnya:

```javascript {6}
var murid = {
  nama: "Budi",
  umur: 12,
  ucapkanSalam: function() {
    // ganti "this" dengan "murid"
    console.log(murid.nama)
  }
}

murid.ucapkanSalam()
// Budi
```

Namun kode seperti ini dinilai tidak baik karena dapat menghasilkan bug seperti pada kasus dibawah:

```javascript {6}
var murid = {
  nama: "Budi",
  umur: 12,
  ucapkanSalam: function() {
    console.log(murid.nama)
  }
}

var guru = murid
murid = null

guru.ucapkanSalam()
```

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/this-object-null-raise-error-javascript-by-jefrydco.png" alt="this Object Null Raise Error JavaScript"/>

Karena itu, jika kita menggunakan `this`, maka bug tersebut dapat dihindari.

Tidak seperti bahasa pemograman lain dimana nilai dari `this` ditentukan pada waktu kompilasi, nilai dari `this` di Javascript ditentukan pada saat kode dijalankan dan tergantung pada objek sebelum tanda titik ".".

```javascript {12,13}
var guru = {
  nama: "Deni"
}
var murid = {
  nama: "Budi"
}

function ucapkanSalam() {
  console.log(this.nama)
}

guru.func = ucapkanSalam
murid.func = ucapkanSalam

guru.func()
// Deni
murid.func()
// Budi
```

Pada contoh kode di atas, kita mendeklarasikan dua objek bernama `guru` dan `murid` yang masing-masing memiliki properti `nama`.

Kita juga mendeklarasikan sebuah fungsi yang bernama `ucapkanSalam`. Di dalam fungsi ini, kita ingin mengetahui nilai dari properti `nama`, meskipun kita tidak mendeklarasikan properti tersebut. Selanjutnya fungsi tersebut di lekatkan ke kedua objek yang sebelumnya kita buat dengan nama `func`.

Kemudian kita mengesekusi fungsi `func` tersebut dengan cara `guru.func()` dan `murid.func()`. Masing-masing fungsi tersebut akan memberikan nilai properti `nama` yang dimiliki masing-masing objek.

Berhati-hatilah karena pada beberapa kasus, isi dari `this` dapat menghilang, seperti pada contoh dibawah ini:

```javascript {5,8}
var jam = 13

var murid = {
  ucapkanSelamatPagi: function() {
    console.log(this.nama)
  },
  ucapkanSelamatSiang: function() {
    console.log(this.nama)
  }
}

(jam >= 12 ? murid.ucapkanSelamatSiang : murid.ucapkanSelamatPagi)()
```

Kode di atas jika dieksekusi akan menghasilkan seperti gambar berikut,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/this-missing-iife-javascript-by-jefrydco.png" alt="this Missing Immediately Invoked Function Expression JavaScript"/>

Untuk memahami kenapa ini terjadi, kita harus paham bagaimana sebuah fungsi dijalankan.

Ketika kita memanggil `murid.ucapkanSelamatSiang()`, dibalik layar sebenarnya Javascript menggunakan tanda titik untuk mereturn sebuah tipe data internal, yaitu [Reference Type](https://tc39.es/ecma262/#sec-reference-specification-type).

Isi dari Reference Type yaitu:

- base (ini adalah objek sebelum tanda titik)
- name (ini adalah nama dari fungsi setelah tanda titik)
- strict (isinya berupa true atau false tergantung digunakan atau tidaknya "use strict")

Hasil dari `murid.ucapkanSelamatSiang` bukanlah sebuah fungsi, melainkan sebuah `ReferenceType` yang memiliki nilai seperti dibawah:

```javascript
(murid, "ucapkanSelamatSiang", false)
```

Ketika kurung `()` dipanggil pada `ReferenceType`, nilai dari `this` di fungsi yang dipanggil akan diisi sesuai dengan nilai dari `base` di `ReferenceType` yang dalam kasus ini adalah `murid`.

Operasi seperti assignment `=` dapat menghilangkan `ReferenceType` ini. Karena itu nilai `this` menghilang pada contoh diatas.

Berikut contoh yang lebih sederhana:

```javascript {9}
var murid = {
  nama: "Budi",
  ucapkanSalam: function() {
    console.log(this.nama)
  }
}

// Operasi assignment akan menghilangkan ReferenceType
var ucapkanSalam = murid.ucapkanSalam

ucapkanSalam()
```

Fungsi `ucapkanSalam` memiliki `ReferenceType` sebagai berikut:

```javascript
(murid, 'ucapkanSalam', false)
```

Di dalam fungsi tersebut kita ingin mengetahui nilai dari properti `nama`. Kemudian kita melekatkan fungsi tersebut ke sebuah variabel bernama sama. Selanjutnya kita panggil variabel tersebut sebagai sebuah fungsi.

Kode tersebut jika dieksekusi akan menghasilkan seperti gambar berikut,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/this-missing-reassignment-javascript-by-jefrydco.png" alt="this Missing Re-assignment JavaScript"/>

Walaupun di dalam fungsi `ucapkanSalam` pada objek `murid` kita menggunakan fungsi log konsol untuk mengetahui nilai properti `nama`, ketika ia di lekatkan dengan variabel lain, fungsi tersebut tidak akan mengetahui nilai dari properti `nama`. Karena nilai dari `ReferenceType` nya menjadi:

```javascript
(window, 'ucapkanSalam', false)
```

Objek global `window` tidak memiliki nilai properti `nama`, maka ketika fungsi `ucapkanSalam` dieksekusi tidak akan mencetak nilai apapun.

### _this_ Pada Konteks Fungsi

Yang terakhir adalah `this` pada konteks fungsi. Sesuai dengan konsep <a href="#objek-global">objek global</a> bahwa fungsi yang kita deklarasikan secara otomatis dilekatkan pada objek global `window` asalkan tidak dideklarasikan menggunakan kata kunci `let` dan `const`.

Dan pada konsep <a href="#this-pada-konteks-objek">_this_ pada konteks objek</a> juga disebutkan jika terdapat fungsi di dalam suatu objek, nilai `this` di dalam fungsi tersebut akan mengarah ke objek sebelum tanda titik ".".

Oleh karena itu, jika kita menggunakan `this` pada suatu fungsi, `this` tersebut juga akan **mengarah ke objek sebelum tanda titik "."** dan objek tersebut adalah **objek global** yakni `window`.

Sehingga jika kita mendeklarasikan fungsi seperti berikut:

```javascript {2}
function fungsi() {
  return this
}

fungsi()
```

akan menghasilkan,

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/this-function-javascript-by-jefrydco.png" alt="this Function JavaScript"/>

Kita juga dapat mengecek apakah nilai `this` pada fungsi tersebut memang mengarah ke global objek `window` atau tidak menggunakan kode berikut,

```javascript
fungsi() === window
// true
```

kode tersebut akan menghasilkan nilai `true`.

---

Kita dapat menggunakan operator `===` (perbandingan ketat) untuk mengecek apakah suatu variabel mengarah ke nilai yang sama atau tidak. Cara ini telah kita gunakan untuk mengecek nilai `this` pada bagian sebelumnya.

Omong-omong blog ini menggunakan fon dengan fungsi ligatur pada bagian blok kodenya, sehingga jika menuliskan operator tertentu yang terdiri dari 2 karakter atau lebih akan ditampilkan secara berbeda.

Contohnya seperti operator `===` (perbandingan ketat), operator `>=` (lebih besar atau sama dengan) dan operator `<=` (lebih kecil atau sama dengan). Nama fon tersebut adalah [Fira Code](https://fonts.google.com/specimen/Fira+Code).

## Kelas

Kelas adalah **cetak biru dari sebuah objek**. Teman-teman dapat memperhatikan gambar di bawah ini. Sebelah kiri adalah gambar spesifikasi teknis sebuah pesawat terbang dan yang disebelah kanan adalah pesawat terbang hasil implementasi sepesifikasi tersebut.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/avia-b-534-by-mlwatts-and-airliners-net.jpg" :caption="{ en: { aviaB: 'Avia B-534 Airline' }, id: { aviaB: 'Pesawat terbang Avia B-534' } }" source="Wikipedia: Avia B-534" source-link="https://en.wikipedia.org/wiki/Avia_B-534" alt="Avia B 534 by MLWatts and Airliners.net"/>

Kita dapat mengibaratkan kelas seperti spesifikasi teknis tersebut. Ia mendeskripsikan secara detail setiap komponen yang dimiliki oleh pesawat terbang. Dari spesifikasi teknis tersebut, kita mempunyai aturan yang jelas bagaimana bentuk dan hasil pesawat terbang yang akan terimplementasi nantinya.

Sama halnya dengan kelas. Kelas mendeskripsikan sebuah objek dengan detail dan sesuai konteks.

Katakanlah kita ingin membuat sebuah aplikasi untuk mencatat jadwal keberangkatan pesawat di bandara. Dari kasus tersebut kita membutuhkan kelas untuk menyimpan data pesawat, kita tidak mungkin mendeskripsikan semua detail dari pesawat tersebut. Mungkin komponen yang kita butuhkan hanyalah kode, nama, dan tahun pembuatan pesawat.

Lain halnya jika kita ingin membuat aplikasi untuk mendesain pesawat. Kita perlu mendeskripsikan pesawat tersebut dengan detail. Bahkan mungkin hingga bagian terkecil pun harus dideskripsikan juga.

Itulah yang dimaksud dengan sesuai konteks, kita mendeskripsikan suatu objek sesuai dengan kebutuhan.

Jika teman-teman telah mempelajari kelas pada bahasa pemrograman lain, pasti teman-teman akan familiar dengan kode berikut:

```javascript
class Kucing {
  kenyang = false

  makan() {
    console.log('Kucing makan...')
    this.kenyang = true
  }
}
```

Tapi sayangnya di artikel kali ini kita tidak akan mempelajari kelas pada JavaScript yang menggunakan sintaks seperti itu. Sintaks tersebut merupakan kelas pada EcmaScript versi 6 atau yang lebih dikenal dengan ES6. ES6 adalah versi lanjutan dari JavaScript.

Dan yang akan kita pelajari di sini adalah kelas pada EcmaScript versi 5, versi JavaScript yang kita kenal pada umumnya.

Kita akan membuat kelas pada JavaScript menggunakan fungsi. Teman-teman dapat memperhatikan contoh kode berikut:

```javascript
function Kucing() {}
```

Ada beberapa hal yang perlu diperhatikan untuk membuat kelas menggunakan fungsi pada JavaScript,

**Yang pertama**, kelas dibuat menggunakan kata kunci `function` dan diikuti dengan nama kelas yang dimaksud. Pada contoh di atas, nama kelasnya adalah `Kucing`.

**Yang kedua**, ada sebuah aturan yang tidak tertulis ketika kita membuat sebuah kelas menggunakan fungsi pada JavaScript. Aturan tersebut menyarankan kita untuk menggunakan _camel case_ untuk penulisan nama kelas.

_Camel case_ adalah aturan penulisan yang setiap katanya diawali dengan huruf kapital. Contohnya penulisannya seperti berikut, `Kucing`, `PesawatTerbang`, dan `KapalSelam`.

Seperti yang telah dijelaskan di atas bahwa kelas adalah cetak biru dari sebuah objek. Dari kelas tersebut kita dapat membuat objek sebenarnya. Cara untuk membuat objek sebenarnya dari contoh kelas di atas seperti berikut:

```javascript
var kucing = new Kucing()
```

Objek dibuat menggunakan kata kunci `new` diikuti dengan nama kelas yang dimaksud dan kurung pembuka dan penutup, layaknya saat kita memanggil sebuah fungsi.

### Properti Kelas

Untuk mendeskripsikan properti yang dimiliki kelas, kita dapat mendeskripsikannya dengan menggunakan kata kunci `this.` (ada karakter titik setelah kata _this_) diikuti dengan nama propertinya.

```javascript
function Kucing() {
  this.kenyang = false
}
```

Pada contoh di atas, kelas kucing memiliki properti kenyang.

```javascript
var kucing = new Kucing()

kucing.kenyang
// false
```

Kita dapat memanggil properti yang dimiliki kelas menggunakan notasi titik (_dot notation_). Pada contoh di atas, properti yang dipanggil adalah kenyang, jadi cara memanggilnya adalah `kucing.kenyang`.

### _Method_ Kelas

Kita juga dapat membuat sebuah _method_ di dalam kelas. _Method_ adalah sebuah fungsi yang dapat digunakan untuk mengubah nilai properti yang dimiliki kelas. Cara mendeklarasikannya sama seperti ketika mendeklarasikan properti. Hanya saja nilainya berupa fungsi. Contohnya seperti berikut:

```javascript
function Kucing() {
  this.kenyang = false

  this.makan = function() {
    console.log('Kucing makan...')
    this.kenyang = true
  }
}
```

Pada contoh di atas, kelas kucing memiliki _method_ makan. Di dalam _method_ makan tersebut, nilai properti `kenyang` dirubah dari yang asalnya bernilai `false` menjadi `true`.

```javascript
var kucing = new Kucing()

kucing.kenyang
// false

kucing.makan()
// Kucing makan...

kucing.kenyang
// true
```

Kita juga dapat memanggil _method_ yang dimiliki kelas menggunakan cara yang sama untuk memanggil properti yakni menggunakan notasi titik. Hanya saja diikuti dengan kurung pembuka dan penutup seperti berikut, `kucing.makan()`.

Mendefinisikan _method_ dengan cara yang di atas memiliki kekurangan. Setiap kali kita membuat objek sebenarnya dari sebuah kelas, JavaScript akan ikut membuat _method_ baru di dalam memori.

Bayangkan jika kita membuat beberapa objek kucing dari kelas `Kucing` di atas. Katakanlah kucing A, kucing B dan kucing C. Walaupun mereka bertiga sama-sama kucing, sama-sama memiliki properti `kenyang` dan _method_ `makan`, mereka pasti memiliki kepribadian yang berbeda-beda.

Kucing A mungkin kucing yang rakus, hampir satu jam sekali makan. Kucing B mungkin tidak terlalu banyak makan, tetapi ia banyak tidur. Kucing C juga demikian, kucing yang jarang sekali makan tetapi yang paling gendut.

Oleh karena itu hal yang perlu dibedakan dari ketiga kucing tersebut adalah properti `kenyang` yang mereka miliki. Tiap kucing memiliki waktu kenyangnya masing-masing. Karena kucing A sering makan, properti `kenyang` yang dimilikinya cepat berubah. Sedangkan properti `kenyang` kucing B jarang berubah karena ia juga jarang makan. Dan properti `kenyang` kucing C paling jarang berubah.

Sedangkan _method_ atau cara mereka `makan` tersebut tidak perlu dibedakan karena mereka menggunakan _method_ `makan` yang sama.

Kita juga dapat mengecek apakah _method_ tersebut berbeda satu sama lain ataukah sama menggunakan kode berikut:

```javascript
var kucingA = new Kucing()
var kucingB = new Kucing()
var kucingC = new Kucing()

kucingA.makan === kucingB.makan
// false

kucingA.makan === kucingC.makan
// false

kucingB.makan === kucingC.makan
// false
```

_Method_ makan pada ketiga kucing tersebut merupakan **_method_ yang berbeda satu sama lain** karena ketika dibandingkan bernilai `false`.

Oleh karena itu JavaScript menyediakan cara khusus untuk membuat _method_ pada kelas menggunakan prototipe. Tujuannya agar berapapun objek sebenarnya yang kita buat dari suatu kelas, kita tetap menggunakan _method_ yang sama.

Cara khusus tersebut akan di bahas pada bagian <a href="#prototipe">prototipe</a>.

### Manfaat Kelas

Katakanlah kita mempunyai kelas berikut:

```javascript
function Kucing() {
  this.kenyang = false
}
```

Untuk menjadikannya objek sebenarnya kita perlu memanggilnya menggunakan kata kunci `new` seperti berikut:

```javascript
var kucing = new Kucing()
kucing
// Kucing {kenyang: false}
```

Jika kita lihat hasilnya nilai kucing adalah sebuah objek yang mempunyai properti `kenyang` dan bernilai `false`. Kita juga dapat membuat objek sebenarnya secara langsung tanpa harus menggunakan kata kunci `new` dan mendeklarasikan kelas. Contohnya seperti berikut:

```javascript
var kucing = {
  kenyang: false
}
kucing
// {kenyang: false}
```

Secara sekilas memang mendapatkan hasil yang serupa. Tetapi jika kita melihatnya lebih jeli, konsol peramban akan menambahkan informasi nama kelas di depan bentuk objeknya jika kita membuat objek sebenarnya menggunakan kelas, seperti berikut `Kucing {kenyang: false}`. Sedangkan jika membuat objek secara langsung, tidak terdapat informasi nama kelas, `{kenyang: false}`.

**Kelas mempermudah kita untuk membuat objek sebenarnya tanpa harus mendeklarasikannya berulang-ulang**. Katakanlah kita harus membuat suatu objek yang memiliki banyak properti, anggaplah objek tersebut adalah manusia.

Manusia memiliki nama, tanggal lahir, tempat lahir, jenis kelamin, tempat tinggal dan masih banyak properti lainnya yang dimilikinya. Kita juga diharuskan untuk membuat banyak objek manusia.

Jika kita langsung mendeklarasikan semua properti itu menggunakan objek sebenarnya seperti contoh kode berikut:

```javascript
var manusia1 = {
  // Banyak properti manusia
}

var manusia2 = {
  // Banyak properti manusia
}

var manusia3 = {
  // Banyak properti manusia
}
```

Pasti akan sangat membosankan dan terjadi banyak perulangan yang dapat menghabiskan waktu kita bukan? Walaupun kita juga dapat menggunakan teknik kopi dan tempel, tetapi tetap saja hal tersebut tidaklah efisien.

Kita dapat menghemat banyak waktu dengan mendeklarasikan kelas `Manusia` dan ketika kita ingin membuat objek sebenarnya dari manusia kita tinggal membuatnya menggunakan kata kunci `new`.

Bahkan karena kelas dalam JavaScript adalah sebuah fungsi, kita dapat menambahkan parameter ke dalam fungsi tersebut. Contohnya seperti berikut:

```javascript
function Manusia(nama, tanggalLahir, tempatLahir, jenisKelamin, tempatTinggal) {
  this.nama = nama
  this.tanggalLahir = tanggalLahir
  this.tempatLahir = tempatLahir
  this.jenisKelamin = jenisKelamin
  this.tempatTinggal = tempatTinggal
}
```

Dengan cara seperti itu, kita tetap dapat membuat objek manusia yang memiliki karakteristik yang berbeda-beda dengan menggunakan kelas yang sama.

```javascript
var manusia1 = new Manusia('Barata', '01 Januari 1995', 'Yogyakarta', 'Laki-laki', 'Lampung')
var manusia2 = new Manusia('Apasari', '31 Desember 1994', 'Bandung', 'Perempuan', 'Bali')
var manusia3 = new Manusia('Prabu', '15 Juli 1996', 'Bali', 'Laki-laki', 'Aceh')

manusia1
// Manusia {nama: "Barata", tanggalLahir: "01 Januari 1995", tempatLahir: "Yogyakarta", jenisKelamin: "Laki-laki", tempatTinggal: "Lampung"}
manusia2
// Manusia {nama: "Apasari", tanggalLahir: "31 Desember 1994", tempatLahir: "Bandung", jenisKelamin: "Perempuan", tempatTinggal: "Bali"}
manusia3
// Manusia {nama: "Prabu", tanggalLahir: "15 Juli 1996", tempatLahir: "Bali", jenisKelamin: "Laki-laki", tempatTinggal: "Aceh"}
```

Namun jika kita telah terlanjur mendeklarasikan objek `manusia` secara langsung tanpa menggunakan kelas, kita dapat mengubahnya agar memiliki properti yang sama seperti kelas `Manusia` menggunakan _method_ `Object.setPrototypeOf`.

_Method_ tersebut akan mengatur objek yang sebelumnya kita buat agar memiliki properti `__proto__` yang mengarah ke properti `prototype` kelas `Manusia`.

_Method_ tersebut memiliki 2 parameter, parameter yang pertama adalah objek yang ingin dirubah tipenya dan parameter kedua adalah properti `prototype` kelas yang dimaksud. Contohnya seperti berikut:

```javascript
var manusia4 = {
  nama: "Atun",
  tanggalLahir: "17 Agustus 1993",
  tempatLahir: "Jakarta",
  jenisKelamin: "Perempuan",
  tempatTinggal: "Surabaya"
}
manusia4
// {nama: "Atun", tanggalLahir: "17 Agustus 1993", tempatLahir: "Jakarta", jenisKelamin: "Perempuan", tempatTinggal: "Surabaya"}

Object.setPrototypeOf(manusia4, Manusia.prototype)
manusia4
// Manusia {nama: "Atun", tanggalLahir: "17 Agustus 1993", tempatLahir: "Jakarta", jenisKelamin: "Perempuan", tempatTinggal: "Surabaya"}
```

Selain menggunakan _method_ `Object.setPrototypeOf` kita juga dapat mengatur langsung properti `__proto__` agar mengarah ke properti `prototype` kelas `Manusia`. Contohnya seperti berikut:

```javascript
var manusia5 = {
  nama: "Danum",
  tanggalLahir: "29 Februari 1997",
  tempatLahir: "Dayak",
  jenisKelamin: "Perempuan",
  tempatTinggal: "Sumba"
}
manusia5
// {nama: "Danum", tanggalLahir: "29 Februari 1997", tempatLahir: "Dayak", jenisKelamin: "Perempuan", tempatTinggal: "Sumba"}

manusia5.__proto__ = Manusia.prototype
manusia5
// Manusia {nama: "Danum", tanggalLahir: "29 Februari 1997", tempatLahir: "Dayak", jenisKelamin: "Perempuan", tempatTinggal: "Sumba"}
```

Menggunakan _method_ `Object.setPrototypeOf` atau mengatur langsung properti `__proto__` menghasilkan hasil yang sama.

Pada beberapa bagian selanjutnya kita akan lebih sering lagi bereksperimen menggunakan properti `__proto__` dan `prototype` serta hubungan antara keduanya.

## Prototipe

Ketika kita mendeklarasikan sebuah fungsi, secara otomatis JavaScript akan menambahkan properti bernama `prototype` ke dalam objek fungsi tersebut.

```javascript
function Kucing() {}

Kucing.prototype
// {constructor: f}
```

Properti `prototype` tersebut berbentuk objek yang di dalamnya memiliki 1 kunci bernama `constructor` dan memiliki nilai berupa fungsi lain.

**Kunci `constructor` itulah yang dieksekusi ketika kita menjalankan fungsi `Kucing`**.

Kita bisa mengecek apakah fungsi `constructor` tersebut merupakan fungsi `Kucing` yang telah kita deklarasikan sebelumnya atau bukan menggunakan kode berikut:

```javascript
Kucing.prototype.constructor === Kucing
// true
```

Selain 1 kunci bernama `constructor`, properti `prototype` juga memiliki kunci lain bernama `__proto__`. Kunci `__proto__` ini tidak dapat di cek menggunakan _method_ `hasOwnProperty` karena merupakan properti internal.

Kunci tersebut memiliki nilai berupa objek lain. Objek lain tersebut adalah properti `prototype` dari kelas `Object` yang dimiliki JavaScript.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/prototype-javascript-by-jefrydco.png" alt="prototype JavaScript"/>

Kita juga bisa mengecek apakah nilai `__proto__` ini merupakan properti `prototype` dari kelas `Object` atau tidak menggunakan kode berikut:

```javascript
Kucing.prototype.__proto__ === Object.prototype
// true
```

Sehingga kita bisa mengambil kesimpulan bahwa **setiap fungsi yang kita deklarasikan secara otomatis mewarisi sifat dari kelas `Object`**. Pewarisan sifat antara objek yang kita buat dengan kelas `Object` terhubung melalui objek `__proto__` yang terdapat pada properti `prototype`.

Atau jika digambarkan dalam bentuk diagram sederhana hubungan keduanya akan seperti berikut, `Kucing -> Object`. Kelas `Kucing` mewarisi sifat dari kelas `Object`.

Kita dapat menggunakan properti `prototype` untuk mengatasi permasalahan pembuatan <a href="#method-kelas">_method_ di dalam kelas</a> pada bagian sebelumnya. Hal ini bertujuan agar setiap kali kita membuat objek sebenarnya dari sebuah kelas, _method_ yang kita deklarasikan tidak ikut dibuat ulang juga.

```javascript
function Kucing() {}

Kucing.prototype.makan = function() {
  console.log('Kucing makan...')
}

var kucing = new Kucing()
kucing.makan()
// Kucing makan...
```

Kita juga dapat mengecek apakah _method_ `makan` tersebut tidak ikut dibuat ulang ketika kita membuat beberapa objek sebenarnya dari kelas `Kucing` menggunakan kode berikut:

```javascript
var kucingA = new Kucing()
var kucingB = new Kucing()
var kucingC = new Kucing()

kucingA.makan = kucingB.makan
// true

kucingA.makan = kucingC.makan
// true

kucingB.makan = kucingC.makan
// true
```

_Method_ makan pada ketiga kucing tersebut adalah **_method_ yang sama** karena ketika dibandingkan satu sama lain bernilai `true`.

Pada contoh kode sebelumnya, kita mendeklarasikan _method_ bernama `makan` pada properti `prototype`. _Method_ makan tersebut secara otomatis akan tersedia pada objek `kucing`. Padahal jika kita melihat nilai dari objek `kucing` itu sendiri hanyalah objek kosong.

```javascript
kucing
// Kucing {}
```

Tetapi jika kita melihatnya lebih detail, ternyata objek `kucing` tersebut memiliki objek lain bernama `__proto__`. Dan di dalam proto tersebut terdapat 3 objek lain, yang pertama adalah _method_ `makan`, yang kedua adalah properti `constructor` dan yang ketiga adalah objek `__proto__` yang mengarah ke kelas `Object`.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/proto-javascript-by-jefrydco.png" alt="__proto__ JavaScript"/>

Walaupun _method_ `makan` tersebut terletak di dalam objek `__proto__`, kita dapat mengaksesnya secara langsung dengan cara `kucing.makan()`.

Hal tersebut dikarenakan ketika kita mengakses _method_ `makan` tersebut, JavaScript akan mengecek apakah objek `kucing` memiliki properti berupa _method_ `makan` atau tidak.

Jika tidak, JavaScript akan melanjutkan pengecekan ke properti `__proto__`, ternyata properti `__proto__` tersebut memiliki _method_ `makan`, sehingga JavaScript menghentikan pencarian dan mengeksekusi _method_ tersebut.

Lain halnya jika kita mencoba mengeksekusi _method_ yang tidak kita deklarasikan, katakanlah _method_ minum. JavaScript akan melakukan pengecekan pada objek `kucing`, ternyata objek `kucing` tidak memiliki _method_ minum. Pengecekan dilanjutkan pada properti `__proto__`, ternyata properti `__proto__` juga tidak memilikinya.

Pengecekan dilanjutkan lagi ke properti `__proto__` yang terletak di dalam properti `__proto__` sebelumnya. Ternyata properti `__proto__` ini juga tidak memilikinya.

Properti `__proto__` terakhir yang dicek oleh JavaScript mengarah ke kelas `Object`. Setelah properti `__proto__` terakhir tersebut, JavaScript akan menampilkan kesalahan (_error_) bahwa _method_ minum tidak terdefinisi.

Sehingga kita dapat menggambarkan hubungan pengecekan sebuah _method_ tersebut ke dalam bentuk diagram sederhana seperti berikut, `kucing -> __proto__ (Kucing) -> __proto__ (Object)`.

Properti `__proto__` pertama mengarah ke kelas `Kucing` dan properti `__proto__` kedua mengarah ke kelas `Objek`.

Omong-omong property `__proto__` yang dimiliki oleh objek `kucing` sebenarnya mengarah ke properti `prototype` yang dimiliki oleh kelas `Kucing`. Kita dapat mengeceknya menggunakan kode berikut:

```javascript
kucing.__proto__ === Kucing.prototype
// true
```

Hubungan objek `__proto__` dengan objek `__proto__` yang lain dan properti `prototype` dengan properti `prototype` yang lain disebut **rantai prototipe** (_prototype chaining_). Kita dapat menggunakan rantai prototipe untuk melakukan pewarisan sifat pada JavaScript.

## Pewarisan Sifat

Pada bagian sebelumnya sedikit banyak telah digambarkan bagaimana proses pewarisan sifat pada JavaScript. Pewarisan pada JavaScript menggunakan objek `__proto__` dan properti `prototype`. Pada bagian ini kita akan membahas lebih lanjut konsep tersebut.

Pewarisan pada JavaScript akan dibagi menjadi 2 bagian, pewarisan sifat untuk objek dan pewarisan untuk kelas.

### Pewarisan Sifat Pada Objek

Katakanlah kita memiliki objek `kucing` dan `burung` seperti pada kode berikut:

```javascript {2-4, 8-10}
var kucing = {
  kenyang: false,
  makan: function() {
    console.log('Kucing makan...')
    this.kenyang = true
  },
  meow: function() {
    console.log('Kucing meow...')
  }
}

var burung = {
  kenyang: false,
  makan: function() {
    console.log('Burung makan...')
    this.kenyang = true
  },
  terbang: function() {
    console.log('Burung terbang...')
  }
}
```

Objek `kucing` memiliki properti `kenyang`, _method_ `makan` dan `meow`, sedangkan objek `burung` memiliki properti `kenyang`, _method_ `makan` dan `terbang`.

Kedua objek tersebut sama-sama meiliki properti `kenyang` dan _method_ `makan`, kita dapat menerapkan konsep pewarisan sifat untuk menyingkat deklarasi properti dan _method_ tersebut.

Kita dapat menggabungkan kemampuan makan kedua objek ke dalam satu objek lain, katakanlah objek tersebut adalah `binatang`.

```javascript {8,15}
var binatang = {
  kenyang: false,
  makan: function() {
    console.log('Binatang makan...')
    this.kenyang = true
  }
}

var kucing = {
  __proto__: binatang,
  meow: function() {
    console.log('Kucing meow...')
  }
}

var burung = {
  __proto__: binatang,
  terbang: function() {
    console.log('Burung terbang...')
  }
}
```

Pada contoh kode di atas, kita mendeklarasikan terlebih dahulu objek binatang yang memiliki properti `makan`. Kemudian kita secara langsung mendeklarasikan properti `__proto__` di dalam objek `kucing` dan `burung` dan mengarahkannya ke objek `binatang`.

Menggunakan cara tersebut, secara otomatis objek `kucing` dan `burung` akan memiliki kemampuan makan juga, kita dapat mengeceknya dengan memanggil _method_ `makan` pada objek `kucing` dan `burung` seperti berikut:

```javascript
kucing.makan()
// Binatang makan...

burung.makan()
// Binatang makan...
```

Ketika kita mengeceknya pada objek `kucing` dan `burung`, keduanya tidak memiliki properti `kenyang`. Properti tersebut terletak di dalam objek `__proto__`.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/property-inheritance-javascript-by-jefrydco.png" alt="Property Inheritance JavaScript"/>

Namun ketika kita memanggil _method_ `makan`. Kedua objek tersebut akan secara otomatis memiliki properti `kenyang`. Seperti yang telah dibahas pada bagian <a href="#this-pada-konteks-objek">_this_ pada konteks objek</a>, _this_ akan mengarah ke objek itu sendiri.

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/this-in-property-inheritance-javascript-by-jefrydco.png" alt="this in Property Inheritance JavaScript"/>

Sesuai dengan konsep rantai prototipe, baik burung dan kucing memiliki kemampuan makan yang mereka dapatkan melalui properti `__proto__` yang mengarah ke objek `binatang`. JavaScript akan mencari secara berurutan apakah objek `kucing` dan `burung` memiliki _method_ `makan` atau tidak.

Ternyata mereka tidak memilikinya. JavaScript melanjutkan pencarian ke properti `__proto__` yang mereka miliki. Properti tersebut mengarah ke objek `binatang`, JavaScript menemukan _method_ `makan` pada objek `binatang` dan akhirnya JavaScript memanggil _method_ tersebut.

Berdasarkan kasus tersebut, kita dapat mengambil kesimpulan bahwa **pewarisan sifat pada objek dapat dilakukan melalui properti `__proto__` yang mengarah ke objek lain**.

### Pewarisan Sifat Pada Kelas

Berdasarkan kasus yang sama, mari kita _ubah_ kode pada bagian sebelumnya menjadi berbentuk kelas. Kita langsung membuat 3 jenis kelas, kelas untuk `Binatang`, `Kucing` dan `Burung`. Hasilnya kurang lebih akan seperti kode berikut:

```javascript
function Binatang() {
  this.kenyang = false
}
Binatang.prototype.makan = function() {
  console.log('Binatang makan...')
  this.kenyang = true
}

function Kucing() {}
Kucing.prototype.meow = function() {
  console.log('Kucing meow...')
}

function Burung() {}
Burung.prototype.terbang = function() {
  console.log('Burung terbang...')
}
```

Tetapi menurut pendapat saya mendeklarasikan _method_ menggunakan properti `prototype` terlihat sedikit kurang teratur, mungkin karena _method_ pada properti `prototype` tersebut dideklarasikan setelah fungsi dideklarasikan. Sehingga _method_ tersebut nampak seperti di luar cakupan fungsi. Oleh karena itu mari kita ubah kode di atas menjadi sedikit lebih teratur.

Sebelum kita mengubah kode di atas menjadi lebih teratur, ada baiknya kita memahami dulu apa itu ekspresi fungsi yang segera dipanggil/EFSD (_immediately invoked function expression_/IIFE).

Jika kita mendeklarasikan sebuah fungsi, pada umumnya kita harus memanggilnya terlebih dahulu agar kode di dalam fungsi tersebut tereksekusi.

```javascript {5}
function fungsi() {
  console.log('Ini fungsi...')
}

fungsi()
// Ini fungsi...
```

Sedangkan ekspresi fungsi yang segera dipanggil (_immediately invoked function expression_) adalah fungsi yang ketika di deklarasikan secara otomatis akan langsung terpanggil, sehingga kode di dalam fungsi tersebut juga langsung tereksekusi.

Cara mendeklarasikan ekspresi fungsi yang segera dipanggil diawali dengan menuliskan 2 buah kurung pembuka dan penutup, `()()`. Kemudian di dalam kurung pembuka dan kurung penutup pertama, kita deklarasikan fungsi yang ingin dipanggil sendiri tanpa mendeklarasikan nama fungsinya, `(function() {})()`.

```javascript
(function() {
  console.log('Di dalam ekspresi fungsi yang segera dipanggil...')
})()
// Di dalam ekspresi fungsi yang segera dipanggil...
```

Ketika kode di atas di jalankan, fungsi yang di dalam kurung pembuka dan kurung penutup pertama akan dieksekusi secara otomatis.

Pada umumnya tujuan mendeklarasikan ekspresi fungsi yang segera dipanggil adalah untuk menghindari variabel atau fungsi yang kita deklarasikan dilekatkan secara otomatis ke <a href="#objek-global">objek global</a>.

---

Oke setelah memahami apa itu ekspresi fungsi yang segera dipanggil, mari kita coba mengubah deklarasi kelas di atas agar terlihat sedikit rapi dengan menggunakan metode tersebut,

```javascript {2-8,13-16,21-24}
var Binatang = (function() {
  function Binatang() {
    this.kenyang = false
  }
  Binatang.prototype.makan = function() {
    console.log('Binatang makan...')
    this.kenyang = true
  }
  return Binatang
})()

var Kucing = (function() {
  function Kucing() {}
  Kucing.prototype.meow = function() {
    console.log('Kucing meow...')
  }
  return Kucing
})()

var Burung = (function() {
  function Burung() {}
  Burung.prototype.terbang = function() {
    console.log('Burung terbang...')
  }
  return Burung
})()
```

Wah mengapa kode di atas malah terlihat lebih rumit daripada kode sebelumnya? 🤦‍♂️ 

Secara sekilas kode di atas memang terlihat lebih rumit. Tetapi kalau kita telah memahami ekspresi fungsi yang segera dipanggil, kita bisa memahami bahwa sebenarnya deklarasi kelas beserta deklarasi _method_ yang dimilikinya dipindahkan ke dalam ekspresi fungsi yang segera dipanggil. Ekspresi fungsi yang segera dipanggil tersebut mengembalikan nilai kelas yang kita deklarasikan di dalamnya.

Teman-teman dapat melihat deklarasi kelas beserta _method_ yang dimilikinya pada bagian yang di cetak terang.

Ohya untuk memudahkan kita memahami pewarisan sifat, kita bisa menganggap kelas yang mewarisi sifat sebagai kelas anak (_child class_) dan kelas yang diwarisi sebagai kelas induk (_parent class_).

Suatu kelas anak (_child class_) JavaScript dikatakan mewarisi sifat jika:

1. Memiliki **properti `prototype` yang mengarah ke kelas induk (_parent class_)**.
2. Properti `prototype` yang dimilikinya memiliki **properti `constructor` yang mengarah ke dirinya sendiri**.
3. Ketika membuat objek sebenarnya dari kelas anak menggunakan kata kunci `new` secara otomatis **semua properti dan _method_ dari kelas induk harus tersedia pada kelas anak**.

Dari 3 aturan tersebut kita dapat membuat suatu fungsi pembantu untuk membuat kelas dapat mewarisi sifat kelas lain. Berikut kode untuk fungsi pembantu tersebut:

```javascript {2,5,7}
function __extends(ChildClass, ParentClass) {
  Object.setPrototypeOf(ChildClass, ParentClass)

  function CombinedClass() {
    this.constructor = ChildClass
  }
  CombinedClass.prototype = ParentClass.prototype

  ChildClass.prototype = new CombinedClass()
}
```

Fungsi pembantu pada contoh kode di atas diberi nama `__extends` karena sesuai dengan kaidah pemrograman berorientasi objek pada bahasa pemrograman lain, untuk mendeklarasikan pewarisan sifat antar kelas menggunakan kata kunci `extends`.

Sedangkan awalan `__` (2x garis bawah/_underscore_) merupakan salah satu aturan tidak tertulis pada JavaScript yang mengindikasikan bahwa suatu variabel, objek atau fungsi hanya digunakan untuk keperluan internal saja.

Fungsi bantuan tersebut memiliki 2 parameter yakni `ChildClass` dan `ParentClass`.

Kita dapat memperhatikan pada bagian kode yang di cetak terang, `Object.setPrototypeOf` akan mengatur properti `prototype` yang dimiliki kelas anak agar mengarah ke kelas induk sesuai dengan aturan pertama.

Namun untuk membuat aturan kedua, kita memerlukan kelas bantuan yang akan mengatur agar properti `constructor` yang dimiliki oleh properti `prototype` kelas anak mengarah ke dirinya sendiri. Setelah mendeklarasikan kelas bantuan tersebut, kita juga harus mengeset properti `prototype` yang dimilikinya agar mengarah ke kelas induk.

Untuk mengecek aturan ketiga, mari kita ubah terlebih dahulu kelas `Kucing` dan `Burung` di atas agar mewarisi sifat dari kelas `Binatang`.

```javascript {2,3,5,11}

var Kucing = (function(_super) {
  __extends(Kucing, _super)
  function Kucing() {
    return _super.apply(this, arguments)
  }
  Kucing.prototype.meow = function() {
    console.log('Kucing meow...')
  }
  return Kucing
})(Binatang)
```

Asumsikan kita telah mendeklarasikan fungsi bantuan `__extends` dan kelas induk `Binatang`. Pada contoh kode di atas, kita menambahkan parameter bernama `_super` yang memiliki nilai berupa kelas `Binatang` pada ekspresi fungsi yang segera dipanggil.

Fungsi bantuan `__extends` dipanggil dengan kelas `Kucing` sebagai parameter pertama dan `_super` sebagai parameter kedua.

Di dalam deklarasi kelas `Kucing`, kita mengembalikan nilai berupa pemanggilan fungsi `apply` yang terdapat pada objek `_super`. Fungsi tersebut menerima 2 parameter, parameter pertama adalah konteks `this` dan parameter kedua adalah kata kunci `arguments`.

Kata kunci `arguments` merupakan sebuah variabel yang menampung semua parameter yang dimasukkan ke dalam sebuah fungsi, dalam hal ini fungsi tersebut adalah kelas `Kucing`.

Setelah itu mari kita coba membuat objek kucing sebenarnya dari kelas `Kucing` yang telah kita deklarasikan.

```javascript
var kucing = new Kucing()

kucing
// Kucing {kenyang: false}
```

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/id/prototype-inheritance-javascript-by-jefrydco.png" alt="Prototype Inheritance JavaScript"/>

Sesuai dengan aturan ketiga, objek `kucing` tersebut memiliki tipe kelas `Kucing` dengan properti `kenyang` bernilai `false`. Properti `kenyang` tersebut berasal dari kelas induknya, kelas `Binatang`.

Objek `kucing` tersebut juga mewarisi _method_ `makan` yang dimiliki oleh kelas induknya. Sehingga kita dapat memanggilnya secara langsung melalui objek `kucing` tersebut.

```javascript
kucing.makan()
// Binatang makan...

kucing
// Kucing {kenyang: true}
```

Setelah memanggil _method_ `makan`, nilai properti `kenyang` yang terdapat pada objek `kucing` akan bernilai `true`.

Properti `__proto__` yang dimiliki objek `kucing` tersebut mengarah ke kelas `Binatang`, sesuai dengan aturan yang pertama. Properti `constructor` yang terdapat di dalam properti `__proto__` juga mengarah ke dirinya sendiri sesuai dengan aturan kedua.

## Polimorfis

**Polimorfis adalah kemampuan suatu objek untuk dikenali sebagai banyak kelas**. Mari kita kembali ke contoh kelas `Kucing`, `Burung` dan `Binatang` di atas. Kita dapat mengenali `Kucing` sebagai `Kucing` dan sebagai `Binatang`.

Untuk mengeceknya kita dapat menggunakan kata kunci `instanceof`. Kata kunci ini mengecek apakah suatu objek sebenarnya dibuat menggunakan kelas yang ingin kita cek atau tidak.

```javascript
var kucing = new Kucing()

kucing instanceof Kucing
// true

kucing instanceof Binatang
// true
```

Pada contoh kode di atas, karena kita membuat objek `kucing` dari kelas `Kucing` maka hasil pengecekan menggunakan kata kunci `instanceof` bernilai `true`. Begitu juga ketika kita mengeceknya dengan kelas `Binatang`, karena kelas `Kucing` juga mewarisi sifat dari kelas `Binatang`, maka hasil pengecekannya juga bernilai `true`.

Bahkan jika kita mengeceknya dengan kelas `Object`, hasilnya juga bernilai `true`. Karena semua <a href="#prototipe">rantai prototipe</a> pada JavaScript akan berakhir pada kelas `Object`.

```javascript
kucing instanceof Object
// true
```

Dari kasus tersebut, kita bisa menganggap **semua hal di dalam JavaScript adalah `Object` kecuali tipe data `number`, `string` dan tipe data primitif lainnya**.

## Enkapsulasi

Untuk lebih memudahkan kita memahami apa itu enkapsulasi, bayangkan kita mengonsumsi obat berbentuk kapsul seperti pada gambar berikut:

<app-img src="/content/2020/01/oop-object-oriented-programming-javascript-explanation/capsule-by-secretdisc-from-wikipedia.jpg" :caption="{ en: { medicineCapsule: 'Medicine capsule' }, id: { medicineCapsule: 'Kapsul obat' } }" source="Wikipedia: Capsule (pharmacy)" source-link="https://en.wikipedia.org/wiki/Capsule_(pharmacy)" alt="Capsule"/>

Kapsul tersebut sangat memudahkan kita untuk mengonsumsi obat. Kita yang seharusnya mengonsumsi banyak obat, dengan adanya kapsul, kita hanya perlu mengonsumsi satu buah item, yakni kapsul tersebut saja. Begitulah kiranya perumpamaan konsep enkapsulasi.

Dari perumpamaan tersebut kita bisa mengambil kesimpulan, enkapsulasi adalah sebuah **mekanisme untuk menyembunyikan data agar kita dapat berinteraksi dengan suatu hal sebagai satu unit kesatuan**.

Namun sayangnya karena semua properti dan _method_ yang dimiliki oleh objek pada JavaScript secara standar dapat diakses dimanapun, saat artikel ini ditulis JavaScript belum mampu untuk membuat enkapsulasi secara penuh.

Walaupun terdapat juga beberapa solusi untuk menerapkan enkapsulasi, namun solusi tersebut bukan merupakan solusi resmi dari JavaScript. Teman-teman dapat membaca lebih lanjut mengenai enkapsulasi pada artikel yang ditulis oleh Om [Eric Elliot](https://twitter.com/_ericelliott), [Encapsulation in JavaScript](https://medium.com/javascript-scene/encapsulation-in-javascript-26be60e325b4).

Selain itu, pada versi lanjutan dari JavaScript (ESNext) juga terdapat [sintaks untuk menerapkan enkapsulasi](https://github.com/tc39/proposal-class-fields#private-fields). Saat artikel ini ditulis, sintaks tersebut masih dalam [tahap ke-3](https://tc39.es/process-document/) untuk distandarisasi.

## Abstraksi

Untuk lebih memudahkan kita memahami apa itu abstraksi, mari kita menggunakan <a href="#enkapsulasi">analogi kapsul</a> pada bagian sebelumnya. Kapsul tersebut terdiri dari berbagai macam obat yang bermanfaat untuk menyembuhkan kita dari suatu penyakit tertentu.

Tetapi kita tidak pernah tahu bagaimana mekanisme setiap obat tersebut dalam membunuh kuman, virus dan penyakit yang bersarang di dalam tubuh kita. Yang kita tahu hanyalah kapsul tersebut mempunyai manfaat untu menyembuhkan penyakit.

Analogi lain yang dapat kita gunakan adalah analogi pesawat pada penjelasan kelas di atas. Ketika pilot ingin menerbangkan pesawat terbang, ia mungkin hanya perlu menekan satu atau dua tombol untuk membuatnya menyala dan menarik kemudi untuk membuatnya terbang.

Tetapi ia tidak pernah tahu, bagaimana mekanisme setiap detail mesin yang berperan untuk menyalakan dan menerbangkan pesawat tersebut.

Dari 2 analogi tersebut, kita dapat menganggap bahwa **abstraksi adalah proses identifikasi suatu masalah secara umum tanpa memperhatikan detailnya**. Pada bahasa pemrograman lain, konsep abstraksi dapat diterapkan menggunakan kelas antarmuka (_interface class_) dan kelas abstrak (_abstract class_).

Sayangnya lagi, ketika artikel ini ditulis, JavaScript belum mampu menerapkan konsep abstraksi secara maksimal. Walaupun ada beberapa solusi untuk mengatasinya, namun solusi tersebut bukan berasal dari JavaScript secara resmi.

Beberapa solusi untuk teman-teman yang ingin menerapkan abstraksi, teman-teman dapat menggunakan TypeScript. TypeScript memiliki fitur [kelas abstrak](http://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes).

Kita dapat menganggap TypeScript adalah JavaScript yang diperkaya dengan lebih banyak fitur. Walaupun pada akhirnya TypeScript nanti akan diubah menjadi JavaScript, TypeScript sangat membantu dalam penulisan kode.

## Ikhtisar

Fyuh, sungguh penjelasan yang cukup panjang ya. 😅 Kita telah membahas secara panjang lebar semua konsep yang berkaitan dengan pemrograman berorientasi objek pada JavaScript.

Pembahasan tersebut dimulai dari memahami apa itu objek, konsep _this_ yang cukup membingungkan, kelas yang merupakan cetak biru dari sebuah objek dan prototipe yang menjadi dasar semua konsep pemrograman berorientasi objek.

Selain itu kita juga telah membahas penerapan 4 konsep pemrograman berorientasi objek pada JavaScript itu sendiri. Konsep itu meliputi pewarisan sifat, polimorfis, enkapsulasi dan abstraksi.

Walaupun pada saat artikel ini ditulis konsep enkapsulasi dan abstraksi masih belum bisa diterapkan secara maksimal menggunakan JavaScript. Tetapi ada juga beberapa solusi yang dapat diterapkan.

_Oya_, kalau teman-teman merasa penjelasan di atas terlalu panjang dan membingungkan, teman-teman dapat membaca penjelasan yang lebih singkat dan interaktif oleh Mbak [Lydia Hallie](https://twitter.com/lydiahallie), [JavaScript Visualized: Prototypal Inheritance](https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co).

Akhir kata, terima kasih telah membaca dan semoga bermanfaat! 🙌 

## Referensi

1. [CSS Tricks: Understanding JavaScript Constructors](https://css-tricks.com/understanding-javascript-constructors/)
2. [ECMAScript® 2020 Language Specification: The Reference Specification Type](https://tc39.es/ecma262/#sec-reference-specification-type)
3. [Geeks for Geeks: Prototype in JavaScript](https://www.geeksforgeeks.org/prototype-in-javascript/)
4. [Mozilla Developer Network: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
5. [Mozilla Developer Network: Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
6. [Mozilla Developer Network: Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
7. [Viktor Kukurba Medium: Object-oriented programming in JavaScript #1. Abstraction](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-1-abstraction-c47307c469d1)
8. [Wikipedia: Object-oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming)
9. [Wikipedia: Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression)
