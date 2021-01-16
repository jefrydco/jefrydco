---
title: Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana - Bagian 1
description: Menguak rahasia sistem reaktivitas yang dimiliki oleh Vue.js dengan membuat ulang versi sederhananya bagian pertama
summary: Pernahkah teman-teman terpikirkan bagaimana Vue.js membuat suatu variabel menjadi reaktif? Menuliskan sesuatu di teks input dan melihat hasilnya di tempat lain secara instan. Apa rahasia dibalik sistem reaktivitas tersebut? Mari kita kupas bersama-sama rahasianya.
img: /cover/2020/01/vuejs-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2020-01-20T01:00:00.000Z
updatedDate: 2020-01-20T01:00:00.000Z
slug: create-reactivity-system-vuejs-javascript-part-1
id: create-reactivity-system-vuejs-javascript-part-1
extraComponents: ['AppDemo1Id', 'AppDemo2Id', 'AppDemo3Id', 'AppDemo4Id', 'AppDemo5Id', 'AppDemo6Id', 'AppDemo7Id', 'AppDemo8Id', 'AppDemo9Id', 'AppDemo10Id']
---

> Baca bagian kedua di sini, <a :href="localePath({ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } })">Membuat Sistem Reaktivitas Vue.js Versi Sederhana - Bagian 2</a>

Pernahkah teman-teman terpikirkan bagaimana Vue.js membuat suatu variabel menjadi reaktif? Menuliskan sesuatu di teks input dan melihat hasilnya di tempat lain secara instan.

Apa rahasia dibalik sistem reaktivitas tersebut? Mari kita kupas bersama-sama rahasianya.

## Daftar Isi

## Reaktivitas

Sebelum memulai membuat sistem reaktivitas kita sendiri, mari kita sejenak memikirkan apa yang disebut reaktif itu dan bagaimana ia bekerja.

Sebuah sistem dikatakan reaktif jika ia dapat bereaksi terhadap suatu perubahan. Contoh sederhananya ketika kita menggunakan Microsoft Excel atau Google Spreadsheet.

Katakanlah kita memiliki data umur karyawan suatu perusahaan. Kemudian kita ingin menghitung rata-rata data tersebut. Kita dapat memasukkan rumus pada kolom manapun dan rata-ratanya secara otomatis terkalkulasi.

<app-video src="/videos/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/spreadsheet-average-reactivity-by-jefrydco.webm"></app-video>

Kemudian jika terdapat perubahan terhadap data, maka nilai rata-ratanya juga akan dikalkulasi ulang secara otomatis.

## Sistem Reaktivitas Vue.js

Mengacu pada dokumentasi resmi Vue.js mengenai [reaktivitas secara mendalam](https://vuejs.org/v2/guide/reactivity.html). Pada bagian [Bagaimana Perubahan Dilacak](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked), terdapat diagram seperti berikut:

<app-img src="/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/vuejs-reactivity-system-explained.jpg" :caption="{ en: { aviaB: 'Vue.js Reactivity System Diagram' }, id: { aviaB: 'Diagram Sistem Reaktivitas Vue.js' } }" source="Vue.js: Reactivity in Depth" source-link="https://vuejs.org/v2/guide/reactivity.html" alt="Vue.js Reactivity System Diagram by Evan You"></app-img>

Untuk memahami diagram tersebut, mari kita lihat contoh kode paling sederhana untuk membuat suatu aplikasi Vue.js

```html {2-3,10}
<div id="app">
  <h2>{ teks }</h1>
  <input v-model="teks" />
</div>

<script>
new Vue({
  el: '#app',
  data: {
    teks: 'Halo Dunia!'
  }
})
</script>
```

> Seharusnya sintaks interpolasi Vue.js pada baris ke dua di atas ditulis seperti berikut `{{ text }}`. Tetapi saya tidak bisa menulisnya seperti demikian karena entah kenapa ia diterjemahkan sebagai interpolasi sebenarnya.

Di balik layar, Vue.js akan mengubah semua data yang telah kita deklarasikan pada properti `data` menjadi pengambil dan pengatur (_getter and setter_).

Pengambil dan pengatur tersebut bertipe fungsi. Ketika suatu variabel diakses, maka fungsi pengambil akan dieksekusi. Dan ketika suatu variabel diubah nilainya, fungsi pengatur akan memberitahukan pengintai untuk menjalankan pekerjaannya.

1. Di dalam fungsi pengambil telah dideklarasikan suatu **mekanisme untuk menyimpan suatu pekerjaan sebagai dependensi**.
2. Sedangkan di dalam fungsi pengatur dideklarasikan suatu **mekanisme untuk memberitahukan semua dependensi bahwa variabel tersebut telah berubah nilainya**. Sehingga pekerjaan yang telah disimpan sebagai dependensi dapat dijalankan.

Ketika kode di atas ditampilkan pada layar peramban, terdapat variabel `teks` yang diakses. Varibel tersebut diakses sebanyak 2x, yang pertama di dalam tag `h1` dan yang kedua di dalam atribut `v-model` pada tag `input`.

Ketika Vue.js menyuruh peramban menampilkan tag `h1`, Vue.js akan menyimpan **pekerjan menampilkan tag `h1` sebagai dependensi**.

Begitu juga ketika Vue.js menyuruh peramban untuk menampilkan tag `input`, Vue.js akan menyimpan **pekerjaan menampilkan tag `input` sebagai dependensi**.

Ketika pengguna mengubah nilai variabel `teks` melalui tag `input`, Vue.js akan mengecek pekerjaan apa saja yang harus dilakukan ketika nilai variabel `teks` berubah.

Pekerjaan pertama adalah menampilkan ulang tag `h1` dan pekerjaan kedua adalah menampilkan tag `input`. 

Itulah yang menyebabkan ketika pengguna mengubah nilai variabel `teks` melalui tag `input`, secara otomatis nilai variabel `teks` pada tag `h1` akan ikut berubah.

## Sistem Reaktivitas Buatan Sendiri

Sebagai contoh kasus, kita akan membuat kalkulator sederhana. Katakanlah kalkulator tersebut terdiri dari 2 buah input teks, operator dan hasil.

### Struktur HTML

```html
<pre class="keadaan"></pre>

<input type="number" class="input1" min="0" />
<select class="operator">
  <option value="+">+</option>
  <option value="-">−</option>
  <option value="*">×</option>
  <option value="/">÷</option>
</select>
<input type="number" class="input2" min="0" />

<h2 class="hasil"></h1>

<script></script>
```

<app-demo-1-id />

Pertama-tama kita mendeklarasikan sebuah tag `pre` yang memiliki atribut kelas bernama `keadaan`. Tag tersebut yang akan kita gunakan untuk menampilkan keadaan nyata dari variabel yang kita deklarasikan.

Selanjutnya 2 buah tag `input` yang masing-masing memiliki kelas bernama `input1` dan `input2`. Masing-masing tag `input` ini memiliki atribut `type` yang bernilai `number` dan atribut `min` yang bernilai `0`.

Hal tersebut bertujuan agar pengguna hanya dapat memasukkan nilai berupa angka dengan minimal nilai `0`.

Di antara kedua tag `input` tersebut, kita mendeklarasikan tag `select` yang memiliki atribut kelas bernama `operator`. Di dalam tag tersebut, kita memiliki 4 tag `option` yang masing-masing merepresentasikan operator yang dapat kita gunakan untuk melakukan operasi matematika.

Selanjutnya kita juga mendeklarasikan tag `h1` yang memiliki atribut kelas bernama `hasil`. Tag `h1` ini berguna untuk menampilkan hasil dari operasi matematika yang kita lakukan.

Selain itu kita juga mendeklarasikan tag `script`, di dalam tag ini kita akan mendeklarasikan semua JavaScript yang kita butuhkan.

### Keadaan Kalkulator

Yang kita butuhkan selanjutnya adalah variabel yang dapat menampung nilai dari kedua input, operator dan hasil.

```javascript
const keadaan = {
  hasil: 0,
  operator: '+',
  input1: 0,
  input2: 0
}
```

Kita mendeklarasikan variabel tersebut dengan nama `keadaan`. Variabel tersebut berbentuk objek yang memiliki properti bernama `hasil`, `input1`, dan `input2` yang bernilai `0` serta properti `operator` yang bernilai `+`.

Properti `operator` memiliki beberapa kemungkinan nilai, oleh karena itu akan lebih baik jika kita mendeklarasikan suatu objek konstan yang menampung semua kemungkinan tersebut.

```javascript
const OPERATOR = {
  TAMBAH: '+',
  KURANG: '-',
  KALI: '*',
  BAGI: '/'
}
```

Setelah itu kita dapat mengubah nilai dari properti `operator` tersebut dengan menggunakan nilai dari objek konstant yang telah kita deklarasikan sebelumnya.

```javascript
const keadaan = {
  hasil: 0,
  operator: OPERATOR.TAMBAH,
  input1: 0,
  input2: 0
}
```

Selanjutnya kita perlu mendeklarasikan sebuah fungsi untuk menjalankan semua kode JavaScript yang akan kita tulis nantinya. Fungsi ini dapat kita beri nama `mulai`.

```js{3}
function mulai() {
  const tampilanKeadaan = document.querySelector('.keadaan')
  tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)
}
```

Di dalam fungsi `mulai` tersebut kita mengambil tag `pre` menggunakan fungsi `document.querySelector` dan menyimpannya ke dalam variabel bernama `tampilanKeadaan`. Fungsi tersebut menerima 1 parameter berupa nama selektor CSS.

Pada contoh kode sebelumnya kita telah mendeklarasikan tag `pre` yang memiliki kelas bernama `keadaan`. Sehingga kita dapat mengambil tag tersebut menggunakan selektor `.keadaan`.

Setelah itu kita dapat mengatur teks di dalam tag `pre` tersebut menggunakan properti `innerText` yang dimiliki oleh variabel `tampilanKeadaan`.

Teks yang akan kita tampilkan sesuai dengan bentuk objek `keadaan` yang telah kita deklarasikan sebelumnya.

Untuk dapat melakukan hal tersebut, kita dapat menggunakan fungsi `JSON.stringify`.

Fungsi tersebut menerima 3 parameter, parameter pertama adalah objek yang ingin kita jadikan `string`. Parameter kedua adalah fungsi pengganti, kita dapat memasukkan `null` karena pada kasus ini kita tidak membutuhkannya.

Parameter ketiga adalah jumlah spasi. Secara standar, jumlah spasi untuk proyek berbasis HTML, CSS dan JavaScript adalah 2 spasi.

Untuk dapat memanggil fungsi `mulai` tersebut, yang perlu kita lakukan adalah menggunakannya sebagai parameter kedua pada fungsi berikut:

```javascript
document.addEventListener('DOMContentLoaded', mulai)
```

Fungsi tersebut bertujuan untuk memanggil fungsi `mulai` pada saat Model Objek Dokumen ([Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)) telah termuat.

<app-demo-2-id />

Setelah berhasil menampilkan keadaan ke dalam tag `pre`, kita perlu juga menampilkan nilai properti `hasil` ke dalam tag `h1`.

```js{4}
function mulai() {
  // ... Kode sebelumnya
  const tampilanHasil = document.querySelector('.hasil')
  tampilanHasil.innerText = keadaan.hasil.toString()
}
```

Caranya hampir sama seperti menampilkan keadaan ke dalam tag `pre`. Perbedaannya hanya nilai properti `innerText` di dapatkan dari properti `hasil` pada objek `keadaan`.

Namun karena nilai dari properti tersebut bertipe `number`, kita harus memanggil fungsi `toString` untuk mengubahnya menjadi `string`.

<app-demo-3-id />

Selain itu kita juga perlu menampilkan nilai dari properti `input1` dan `input2` pada kedua tag `input`.

```js{6-7}
function mulai() {
  // ... Kode sebelumnya
  const tampilanInput1 = document.querySelector('.input1')
  const tampilanInput2 = document.querySelector('.input2')

  tampilanInput1.value = keadaan.input1.toString()
  tampilanInput2.value = keadaan.input2.toString()
}
```

Kita masih menggunakan cara yang sama untuk menampilkan nilai dari objek keadaan, perbedaannya hanya pada properti tag yang kita set.

Jika sebelumnya kita mengeset properti `innerText`, untuk tag `input` yang kita set adalah properti `value`.

<app-demo-4-id />

Setelah kita menerapkan kode di atas, kedua input teks akan menampilkan angka `0` karena kita juga mengeset nilai properti `input1` dan `input2` pada objek `keadaan` bernilai `0`.

Selanjutnya kita juga perlu menampilkan nilai dari properti `operator` pada tag `select`.

```js{4}
function mulai() {
  // ... Kode sebelumnya
  const tampilanOperator = document.querySelector('.operator')
  tampilanOperator.value = keadaan.operator
}
```

Setelah menambahkan kode di atas hasilnya tidak akan berbeda jauh dengan demo sebelumnya karena secara standar tag `select` akan menampilkan opsi pertama.

<app-demo-5-id />

Sebelum melanjutkan ke tahap selanjutnya, mari kita lakukan sedikit refaktor pada kode yang telah kita tulis sebelumnya.

Jika teman-teman lihat pada beberapa contoh kode sebelumnya, saya memberi cetak terang pada satu atau dua baris kode.

Kode tersebut mempunyai fungsi untuk menampilkan nilai dari setiap properti yang dimiliki objek `keadaan` agar dapat di tampilkan ke tampilan peramban.

Kita dapat mengekstrak semua kode yang telah saya beri cetak terang ke dalam suatu fungsi sendiri, kita dapat memberi nama fungsi tersebut sesuai dengan fungsinya, `mutakhirkanTampilan`.

```js{13}
function mulai() {
  // ... Kode sebelumnya
  function mutakhirkanTampilan() {
    tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)
    tampilanHasil.innerText = keadaan.hasil.toString()

    tampilanInput1.value = keadaan.input1.toString()
    tampilanInput2.value = keadaan.input2.toString()

    tampilanOperator.value = keadaan.operator
  }

  mutakhirkanTampilan()
}
```

Seperti pada contoh kode di atas, kita membuat fungsi `mutakhirkanTampilan` di dalam fungsi `mulai`. Untuk menjalankan kode yang ada di dalam fungsi tersebut, kita perlu melakukan pemanggilan terhadap fungsi tersebut.

### Pendengar Peristiwa

Selanjutnya yang kita perlu lakukan adalah memikirkan bagaimana caranya agar ketika pengguna melakukan perubahan baik di kedua input maupun di operator, secara otomatis nilai dari keadaan akan termutakhirkan secara otomatis.

Untuk melakukan hal tersebut, kita dapat menambahkan pendengar peristiwa (_event listener_) pada kedua tag `input` dan tag `select`.

```js{4-5,8-9}
function mulai() {
  // ... Kode sebelumnya
  tampilanInput1.addEventListener('input', (peristiwa) => {
    const targetInput1 = peristiwa.target
    keadaan.input1 = parseInt(targetInput1.value)
  })
  tampilanInput2.addEventListener('input', (peristiwa) => {
    const targetInput2 = peristiwa.target
    keadaan.input2 = parseInt(targetInput2.value)
  })
}
```

Untuk menambahkan pendengar peristiwa (_event listener_), yang perlu kita lakukan adalah memanggil _method_ `addEventListener` yang dimiliki oleh masing-masing tag `input` dan tag `select`.

_Method_ tersebut menerima 2 parameter, parameter pertama adalah peristiwa yang ingin kita dengarkan. Pada tag `input`, peristiwa yang dapat kita dengarkan ketika terjadi perubahan input bernama `input`.

Sedangkan pada tag `select`, peristiwa yang dapat kita dengarkan ketika terjadi perubahan input bernama `change`.

Parameter kedua adalah sebuah fungsi yang akan dipanggil ketika peristiwa yang kita dengarkan terjadi. Fungsi ini menerima 1 parameter bernama `peristiwa` atau `event`.

Parameter tersebut juga memiliki properti bernama `target`. Properti ini mengarah ke nilai yang sama seperti variabel yang kita gunakan untuk menyimpan tag `input` dan `select`.

Untuk mendapatkan nilai dari `input`, kita dapat menggunakan properti `value` yang dimiliki oleh variabel `targetInput1` dan `targetInput2`.

Nilai tersebut berbentuk `string`, sehingga kita perlu mengubahnya ke bentuk `number` menggunakan fungsi `parseInt`.

Setelah nilai kita dapatkan, kita dapat mengatur properti `input1` dan `input2` pada objek `keadaan` agar memiliki nilai tersebut.

```js{4-8}
function mulai() {
  // ... Kode sebelumnya
  tampilanOperator.addEventListener('change', (peristiwa) => {
    const targetOperator = peristiwa.target
    const selectedOperator = targetOperator
      .selectedOptions[0]
      .value
    keadaan.operator = selectedOperator
  })
}
```

Sedangkan untuk mendapatkan nilai pada tag `select` caranya agak sedikit berbeda. Peristiwa yang ingin kita dengarkan pun namanya berbeda, peristiwa tersebut bernama `change`.

Kemudian untuk mendapatkan nilainya juga agak sedikit lebih rumit. Karena nilai tersebut terletak pada properti `selectedOptions` yang berupa _array_ dari objek.

Setiap objek di dalam daftar tersebut memiliki properti `value`. Sehingga kita dapat mendapatkan nilai dengan cara mengakses indeks pertama pada daftar tersebut kemudian mengakses properti `value` menggunakan notasi titik.

Setelah nilai dapat kita dapatkan, kita dapat mengatur properti `operator` pada objek `keadaan` dengan nilai tersebut.

<app-demo-6-id />

Menambahkan pendengar peristiwa berfungsi untuk mengatur nilai properti `input1`, `input2` dan `operator` ketika terjadi perubahan pada kedua tag `input` dan tag `select`.

> Setiap demo pada halaman ini mempunyai nilai keadaannya masing-masing, nama variabelnya berformat `keadaan<urutan-demo>`, contohnya `keadaan1`, `keadaan2`, dan seterusnya.

Kita dapat mengeceknya dengan cara membuka konsol peramban pada halaman ini dan mengetikkan nama variabel tersebut.

<app-video src="/videos/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/add-event-listener-effect-by-jefrydco-id.webm"></app-video>

Pada contoh animasi di atas, pertama-tama kita mengecek nilai awal dari `keadaan6`. Nilai dari properti `input1` dan `input2` adalah `0` dan nilai dari properti `operator` adalah `+`.

Kita melakukan perubahan nilai pada kedua `input` dan `select`. Setelah itu kita cek lagi nilai dari `keadaan6`. Sekarang nilai dari properti `input1` dan `input2` masing-masing `1` dan `2`. Dan nilai dari properti `operator` adalah `*`.

### Reaktivitas Semu

Sebelum melanjutkan, mari kita merefleksi terlebih dahulu apa yang sudah kita lakukan. Yang pertama adalah kita telah membuat struktur HTML dengan 2 buah tag `input` untuk memasukkan nilai.

Sebuah tag `select` yang memiliki beberapa `option` yang kita gunakan untuk menampilkan opsi operator matematika. Dan sebuah tag `h1` untuk menampilkan hasil dari kalkulasi.

Selain itu terdapat juga tag `pre` yang kita gunakan untuk menampilkan struktur objek `keadaan`.

Kita juga telah berhasil melakukan perubahan terhadap properti objek `keadaan` ketika kita melakukan perubahan terhadap kedua `input` dan `select`.

Namun untuk mengecek perubahan tersebut kita perlu membuka konsol peramban. Akan lebih baik jika kita dapat melihat perubahan tersebut pada tampilan struktur objek `keadaan` secara langsung.

Kita juga masih belum melakukan kalkulasi secara langsung ketika terjadi perubahan terhadap kedua `input` dan `select`.

Mari kita selesaikan terlebih dahulu permasalahan kalkulasi secara langsung tersebut. Untuk menyelesaikan permasalahan itu, kita memerlukan fungsi kalkulasi berdasarkan operator yang kita pilih melalui tag `select`.

```js{5-6,8-9,11-12,14-15}
function mulai() {
  // ... Kode sebelumnya
  function kalkulasiHasil() {
    switch (keadaan.operator) {
      case OPERATOR.TAMBAH:
        keadaan.hasil = keadaan.input1 + keadaan.input2
        break
      case OPERATOR.KURANG:
        keadaan.hasil = keadaan.input1 - keadaan.input2
        break
      case OPERATOR.KALI:
        keadaan.hasil = keadaan.input1 * keadaan.input2
        break
      case OPERATOR.BAGI:
        keadaan.hasil = keadaan.input1 / keadaan.input2
        break
      default:
        break;
    }
  }
}
```

Fungsi tersebut kita beri nama `kalkulasiHasil`. Fungsi `kalkulasiHasil` berfungsi untuk mengkalkulasi nilai `input1` dan `input2` sesuai dengan keadaan `operator`. Hasil dari kalkulasi tersebut akan disimpan pada properti `hasil`.

```js{5,9,13}
function mulai() {
  // ... Kode sebelumnya
  tampilanInput1.addEventListener('input', (peristiwa) => {
    // ... Kode sebelumnya
    kalkulasiHasil()
  })
  tampilanInput2.addEventListener('input', (peristiwa) => {
    // ... Kode sebelumnya
    kalkulasiHasil()
  })
  tampilanOperator.addEventListener('change', (peristiwa) => {
    // ... Kode sebelumnya
    kalkulasiHasil()
  })
  // ... Kode setelahnya
}
```

Kita dapat memanggil fungsi tersebut pada pendengar peristiwa. Sehingga setiap kali terjadi perubahan pada kedua input dan operator, secara otomatis nilai properti `hasil` akan dikalkulasi ulang.

<app-demo-7-id />

Kita dapat mengeceknya dengan cara membuka konsol peramban pada halaman ini dan mengetikkan nama variabel untuk demo 7 yakni `keadaan7`.

<app-video src="/videos/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/reactivity-recalculation-automatically-by-jefrydco-id.webm"></app-video>

Pada contoh animasi di atas, pertama-tama kita mengecek nilai awal dari `keadaan7`. Nilai dari properti `input1` dan `input2` adalah `0` dan nilai dari properti `operator` adalah `+`.

Kita melakukan perubahan nilai pada kedua `input` dan `select`. Nilai properti `hasil` akan secara otomatis berubah dan terkalkulasi ulang sesuai dengan operator yang sedang aktif.

Namun sekali lagi, sayangnya untuk melihat perubahan dan hasil kalkulasi tersebut kita perlu membuka konsol peramban.

Mari kita pikirkan sejenak apa yang dapat kita lakukan untuk dapat melihat perubahan tersebut secara langsung.

Pada bagian sebelumnya kita menampilkan nilai dari setiap properti pada objek `keadaan` dengan mengatur properti `innerText` dan `value`.

Kita juga telah merefaktor kode tersebut ke dalam sebuah fungsi bernama `mutakhirkanTampilan`. Kita memanggil fungsi tersebut untuk menampilkan nilai setiap properti objek `keadaan` ke tampilan peramban.

Seharusnya kita juga dapat menggunakan fungsi `mutakhirkanTampilan` tersebut untuk menampilkan ulang nilai properti objek `keadaan` ke tampilan peramban setelah proses kalkulasi terjadi.

```js{6,11,16}
function mulai() {
  // ... Kode sebelumnya
  tampilanInput1.addEventListener('input', (peristiwa) => {
    // ... Kode sebelumnya
    kalkulasiHasil()
    mutakhirkanTampilan()
  })
  tampilanInput2.addEventListener('input', (peristiwa) => {
    // ... Kode sebelumnya
    kalkulasiHasil()
    mutakhirkanTampilan()
  })
  tampilanOperator.addEventListener('change', (peristiwa) => {
    // ... Kode sebelumnya
    kalkulasiHasil()
    mutakhirkanTampilan()
  })
  // ... Kode setelahnya
}
```

Yang perlu kita lakukan sama seperti pada fungsi `kalkulasiHasil`, memanggil fungsi tersebut di dalam pendengar peristiwa. Namun yang harus diperhatikan adalah urutan pemanggilannya.

Kita harus memanggil fungsi `kalkulasiHasil` terlebih dahulu kemudian fungsi `mutakhirkanTampilan`. Sehingga nilai yang ditampilkan sesuai dengan hasil kalkulasi.

<app-demo-8-id />

Pada demo di atas, kita telah berhasil membuat sistem reaktivitas sendiri, ketika terjadi perubahan nilai pada kedua input maupun pilihan operator. Hasilnya akan secara otomatis ditampilkan perubahannya di layar peramban.

Namun sistem reaktivitas yang telah kita buat di atas belum sepenuhnya mencerminkan bagaimana sistem reaktivitas yang dimiliki oleh Vue.js.

Bahkan sebenarnya belum bisa disebut sistem reaktivitas juga. Karena perubahan tersebut terjadi karena kita memasang pendengar peristiwa.

Sehingga ketika pengguna berinteraksi dengan input tersebut, kita memanggil fungsi untuk mengkalkulasi ulang dan menampilkan hasilnya ke layar peramban.

Namun jika variabel di ubah tanpa adanya interaksi melalui input, misal melalui konsol peramban, tidak akan terjadi kalkulasi ulang dan hasilnya juga tidak akan ditampilkan ke layar peramban.

<app-video src="/videos/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/change-via-console-does-not-affect-reactivity-by-jefrydco-id.webm"></app-video>

Lain halnya pada sistem reaktivitas Vue.js, bagaimanapun caranya kita mengubah variabel. Entah melalui pendengar peristiwa maupun melalui konsol peramban secara langsung.

Perubahan tersebut akan secara otomatis dikalkulasi ulang dan ditampilkan pada layar peramban. Oleh karena itulah, saya memberi judul reaktivitas semu pada bagian ini.

### Reaktivitas Nyata

Sekarang mari kita coba ubah sistem reaktivitas semu yang telah kita buat menjadi sistem reaktivitas nyata.

Karena kita mempunyai target untuk membuat sistem reaktivitas Vue.js versi sederhana, maka pertama-tama kita harus memperhatikan komponen-komponen apa saja yang dimiliki Vue.js untuk membuat suatu variabel menjadi reaktif.

Menurut pendapat saya untuk membuat sistem reaktivitas Vue.js versi sederhana, kita memerlukan beberapa komponen:

1. Pembuat Reaktif, yang bertugas untuk mengubah data menjadi **pengambil reaktif dan pengatur reaktif**.
2. Pengintai, yang bertugas untuk **mengawasi dan memberitahu pelaksana jika terjadi perubahan**.
3. Pelaksana, yang bertugas untuk **melaksanakan tugas jika telah diberitahu pengintai**.

### Pembuat Reaktif

Sebelum memulai mendiskusikan mengenai pembuat reaktif, jika teman-teman masih bingung mengenai fungsi pengambil reaktif dan pengatur reaktif, teman-teman dapat membaca kembali bagian <a href="#sistem-reaktivitas-vue-js">sistem reaktivitas Vue.js</a> di atas.

Oke mari kita lanjutkan pembahasannya. Kita dapat mengubah suatu objek agar memiliki pengambil reaktif dan pengatur reaktif dengan menggunakan _method_ `defineProperty` yang dimiliki oleh kelas `Object`.

_Method_ tersebut menerima 3 parameter, parameter pertama adalah objek yang ingin kita ubah, parameter kedua adalah nama properti yang ingin kita ubah, dan parameter ketiga adalah konfigurasinya.

Pada parameter ketiga itulah kita dapat meletakkan fungsi pengambil reaktif dan pengatur reaktif.

```javascript
const manusia = {
  nama: 'jefrydco'
}
```

Misalkan kita memiliki objek bernama `manusia` seperti di atas. Objek tersebut memiliki properti `nama` dan memiliki nilai `jefrydco`.

Kita ingin membuat ketika kita mengakses properti `nama`, kita mencetak info bahwa properti tersebut telah diakses. Dan ketika kita mengubah nilainya, kita juga mencetak info bahwa properti telah diubah.

```js{2,8-9,12-13}

let nama = manusia['nama']

Object.defineProperty(manusia, 'nama', {
  enumerable: true,
  configurable: true,
  get: function pengambilReaktif() {
    console.log('Properti telah diakses')
    return nama
  },
  set: function pengaturReaktif(nilaiBaru) {
    nama = nilaiBaru
    console.log('Properti telah diubah')
  }
})
```

Sebelumnya kita mendefinisikan terlebih dahulu variabel bantuan bernama `nama` dan memiliki nilai sesuai dengan properti `nama`. Kita mengakses nilai properti `nama` menggunakan metode indeks, `manusia['nama']`.

Kita memanggil _method_ `defineProperty` dengan objek `manusia` sebagai parameter pertama, _string_ `nama` sebagai parameter kedua dan objek konfigurasi sebagai parameter ketiga.

Objek konfigurasi tersebut memiliki properti `enumerable` dengan nilai `true`. Maksud dari properti konfigurasi ini adalah **mengatur properti `nama` agar dapat diiterasi menggunakan sintaks pengulangan `for...in`** atau **agar kita dapat mendapatkan nama properti tersebut menggunakan `Object.keys`**.

Properti kedua adalah `configurable` dengan nilai `true`. Maksud dari properti konfigurasi ini adalah **agar properti `nama` dapat dikonfigurasi ulang menggunakan fungsi `defineProperty`**.

Properti ketiga adalah `get` dengan nilai sebuah fungsi bernama `pengambilReaktif`. Di dalam fungsi inilah kita dapat mencetak info bahwa properti telah diakses.

Yang perlu kita perhatikan adalah properti fungsi `pengambilReaktif` ini haruslah mengembalikan sebuah nilai. Karena ketika kita mengakses properti `nama`, kita mengharapkan mendapatkan nilai dari properti tersebut bukan? Oleh karena itu kita juga harus mengembalikan nilai dari properti `nama` pada fungsi `pengambilReaktif`.

Properti keempat adalah `set` dengan nilai fungsi bernama `pengaturReaktif`. Di dalam fungsi inilah kita dapat mencetak info bahwa properti telah diubah.

Fungsi `pengaturReaktif` secara otomatis **menerima 2 parameter**. Parameter pertama adalah **nilai baru yang akan diset pada properti tersebut** dan parameter kedua adalah **nilai lama yang dimiliki properti tersebut**.

Hal lain yang perlu diperhatikan adalah, di dalam fungsi `pengambilReaktif` tersebut kita **tidak bisa mengembalikan nilai properti `nama` menggunakan notasi titik** `manusia.nama` atau pada fungsi `pengaturReaktif` kita juga **tidak bisa mengatur nilai properti `nama` menggunakan notasi titik** `manusia.nama`.

Karena hal tersebut dapat **mengakibatkan pengulangan tak terhingga** (_infinite loop_). Dan oleh karena itu juga kita membutuhkan variabel bantuan.

```javascript
manusia.nama
// Properti telah diakses
// 'jefrydco'

manusia.nama = 'jefry'
// Properti telah diubah
// 'jefry'
```

Setelah mendefinisikan kode di atas, ketika kita mengakses properti `nama` ataupun mengubah nilainya, kita akan mendapatkan info sesuai dengan apa yang kita lakukan.

Mari kita menggunakan cara di atas pada properti yang memiliki nilai berupa angka, kemudian kita coba melakukan operasi matematika terhadap nilai tersebut.

```javascript
const keadaan = {
  input1: 0
}
let input1 = keadaan['input1']

Object.defineProperty(keadaan, 'input1', {
  enumerable: true,
  configurable: true,
  get: function pengambilReaktif() {
    console.log('Properti telah diakses')
    return input1
  },
  set: function pengaturReaktif(nilaiBaru) {
    input1 = nilaiBaru
    console.log('Properti telah diubah')
  }
})
```

Pada contoh kode di atas kita mendeklarasikan objek bernama `keadaan` yang memiliki properti `input1`. Kita juga mendeklarasikan variabel bantuan menggunakan kata kunci `let` bernama `input1` yang memiliki nilai sama seperti properti `input1`.

Seperti pada contoh kode sebelumnya, variabel bantuan ini akan berfungsi untuk menampung nilai dari properti `input1` pada objek `keadaan`.

Dan jika kita langsung mengakses propertinya langsung tanpa menggunakan variabel bantuan, fungsi `pengambilReaktif` dan `pengaturReaktif` akan dieksekusi secara berulang hingga tak terhingga.

```javascript
keadaan.input1 = keadaan.input1 + 7
// Properti telah diakses
// Properti telah diubah
// 7
```

Pada contoh kode di atas kita melakukan operasi penambahan antara nilai properti `input1` sekarang dengan angka 7. Pada konsol peramban akan muncul info properti telah diakses kemudian properti telah diubah secara berurutan.

Info properti telah diakses muncul ketika properti `input1` di akses pada bagian kanan tanda sama dengan `=`. Sedangkan info properti telah diubah muncul ketika nilai properti `input1` telah ditambahkan dengan angka 7 dan di simpan ulang.

Dengan menggunakan cara tersebut kita sudah dapat membuat sistem reaktivitas sendiri. Mari kita coba refaktor kode pada <a href="#AppDemo8Id">Demo 8</a> di atas agar menggunakan `defineProperty` sebagai sistem reaktivitasnya.

```js{9,13-14}
function mulai() {
  // ... Kode sebelumnya
  let input1 = keadaan['input1']

  Object.defineProperty(keadaan, 'input1', {
    enumerable: true,
    configurable: true,
    get: function pengambilReaktif() {
      return input1
    },
    set: function pengaturReaktif(nilaiBaru) {
      input1 = nilaiBaru
      kalkulasiHasil()
      mutakhirkanTampilan()
    }
  })
}
```

Pada contoh kode di atas kita memindahkan pemanggilan fungsi `kalkulasiHasil` dan `mutakhirkanTampilan` dari dalam fungsi pendengar peristiwa ke dalam fungsi `pengaturReaktif`.

Hal tersebut bertujuan ketika properti `input1` diubah nilainya, akan dilakukan kalkulasi hasil dan pemutakhiran tampilan secara otomatis.

<app-demo-9-id />

Tetapi pada contoh di atas kita hanya membuat sistem reaktivitas berjalan pada properti `input1` saja, padahal yang kita perlukan dapat berjalan di semua properti.

Untuk mengatasi permasalahan tersebut, kita dapat menggunakan _method_ `keys` yang terdapat pada kelas `Object`.

```js{3,5,6,8,15-17}
function mulai() {
  // ... Kode sebelumnya
  const daftarKunci = Object.keys(keadaan)

  daftarKunci.forEach(kunci => {
    let nilai = keadaan[kunci]

    Object.defineProperty(keadaan, kunci, {
      enumerable: true,
      configurable: true,
      get: function pengambilReaktif() {
        return nilai
      },
      set: function pengaturReaktif(nilaiBaru) {
        if (nilai === nilaiBaru) {
          return;
        }
        nilai = nilaiBaru
        kalkulasiHasil()
        mutakhirkanTampilan()
      }
    })
  })
}
```

_Method_ `keys` menerima parameter berupa objek. _Method_ ini berfungsi untuk mendapatkan semua nama properti yang dimiliki oleh objek yang digunakan sebagai parameternya. Nilainya kemudian disimpan ke dalam variabel `daftarKunci`.

Karena variabel `daftarKunci` memiliki nilai berupa _array_ dengan item berupa string, kita dapat menggunakan pengulangan untuk mendapatkan setiap nilai properti yang dimiliki oleh objek `keadaan`.

Setelah itu kita dapat mengubah setiap properti tersebut agar memiliki fungsi `pengambilReaktif` dan `pengaturReaktif`.

Kita juga perlu melakukan pengecekan di dalam fungsi `pengaturReaktif` apakah nilai yang akan disimpan ke dalam properti tersebut merupakan nilai yang sama atau tidak.

Jika nilai tersebut sama, maka fungsi `pengaturReaktif` tidak akan dilanjutkan. Hal tersebut bertujuan untuk mencegah fungsi `pengaturReaktif` dieksekusi secara berulang hingga tak hingga.

<app-demo-10-id />

Dengan menggunakan cara tersebut semua properti yang dimiliki oleh objek `keadaan` akan menjadi reaktif.

Sekarang kita telah berhasil menyelesaikan permasalahan sistem reaktivitas yang hanya menggunakan pendengar peristiwa saja.

Selain nilai akan dikalkulasi dan ditampilkan secara otomatis jika terdapat interaksi pengguna melalui input. Nilai tersebut juga akan dikalkulasi dan ditampilkan secara otomatis jika kita mengubahnya melalui konsol peramban.

<app-video src="/videos/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/change-via-console-affect-reactivity-by-jefrydco-id.webm"></app-video>

## Ikhtisar

Kita telah berhasil membuat sistem reaktivitas sendiri dan menerapkannya pada aplikasi kalkulator sederhana. Pertama-tama kita mencoba membuat sistem reaktivitas menggunakan pendengar peristiwa (_event listener_).

Namun cara tersebut kurang bisa dikatakan sebagai sistem reaktivitas karena proses kalkulasi dan menampilkan ke layar peramban hanya dapat terjadi jika pengguna berinteraksi dengan aplikasi.

Kemudian kita melakukan refaktor kode sehingga kita dapat melakukan perubahan tanpa melakukan interaksi dengan aplikasi melainkan dengan langsung mengubah nilai keadaan menggunakan konsol peramban.

Cara tersebut menerapkan konsep yang sama seperti sistem reaktivitas pada Vue.js yakni menggunakan pengambil dan pengatur (_getter & setter_). Pengambil dan pengatur tersebut berbentuk fungsi.

Setiap properti yang dimiliki oleh objek keadaan kita ubah agar memiliki pengambil dan pengatur. Di dalam fungsi pengatur itulah kita dapat mengatur apa yang seharusnya dilakukan ketika terjadi perubahan nilai.

Namun sekali lagi, sistem tersebut masih memiliki kekurangan yakni hanya dapat melakukan satu pekerjaan saja dalam satu waktu. Pada bagian selanjutnya kita akan menyelesaikan permasalahan tersebut.

Terima kasih dan semoga bermanfaat!

## Referensi

1. [Medium JS Dojo: Memahami Reaktivitas Vue Selangkah demi Selangkah](https://medium.com/js-dojo/understand-vue-reactivity-implementation-step-by-step-599c3d51cd6c)
2. [Vue.js: Reaktivitas Secara Mendalam](https://vuejs.org/v2/guide/reactivity.html)

<script>
if (!window.english) {
  window.english = document.querySelector('.blog__translations__link')
  if(english) {
    english.addEventListener('click', function(event) {
      event.preventDefault()
      location.href = event.target.href
    })
  }
}
</script>
