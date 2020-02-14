---
title: Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana - Bagian 2
description: Menguak rahasia sistem reaktivitas yang dimiliki oleh Vue.js dengan membuat ulang versi sederhananya bagian kedua
summary: Pada bagian sebelumnya kita telah berhasil membuat sistem reaktivitas sendiri. Namun sistem tersebut masih memiliki kekurangan yakni hanya dapat melakukan satu pekerjaan dalam satu waktu. Sekarang di bagian ini kita akan menyelesaikannya.
img: /cover/2020/01/vuejs-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2020-02-01T01:00:00.000Z
updatedDate: 2020-02-01T01:00:00.000Z
slug: create-reactivity-system-vuejs-javascript-part-2
id: create-reactivity-system-vuejs-javascript-part-2
extraComponents: ['AppDemo11Id', 'AppDemo12Id', 'AppDemo13Id', 'AppDemo14Id', 'AppDemo15Id']
---

> Baca bagian pertama di sini, <a :href="localePath({ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-1' } })">Membuat Sistem Reaktivitas Vue.js Versi Sederhana - Bagian 1</a>

Pada bagian sebelumnya kita telah berhasil membuat sistem reaktivitas sendiri. Namun sistem tersebut masih memiliki kekurangan yakni hanya dapat melakukan satu pekerjaan dalam satu waktu.

Sistem reaktivitas yang dimiliki Vue.js dapat melakukan banyak hal dalam satu waktu. Contohnya misal pada kolom pencarian dengan fitur pelengkap otomatis.

Sembari Vue.js menampilkan hasil pencarian, ia juga melakukan pengambilan data di balik layar. Kemudian data tersebut juga akan ditampilkan pada hasil pencarian.

[toc]

## Pembuat Reaktif untuk Banyak Pekerjaan

Tetapi kali ini kita tidak akan membuat aplikasi sekompleks itu, kita masih menggunakan kode dari demo terakhir pada bagian 1. Namun kita akan menambahkan aplikasi lain pada demo tersebut.

Kita akan menambahkan aplikasi penghitung detik (_stopwatch_). Mengapa penghitung detik? Karena aplikasi tersebut akan secara konstan menampilkan keadaan detik secara terus menerus.

Dengan demikian kita dapat mensimulasikan bahwa sistem reaktivitas yang kita buat dapat melakukan pekerjaan dalam satu waktu.

Pekerjaan pertama adalah melakukan kalkulasi dan menampilkan hasil beserta keadaannya dari aplikasi pertama dan pekerjaan kedua adalah secara konstan menampilkan keadaan detik dari aplikasi penghitung detik.

### Struktur HTML

Pertama-tama kita harus menambahkan struktur HTML untuk penghitung detik terlebih dahulu.

```html {4,6,8-12,14}
<!-- Kode sebelumnya -->
<h2 class="hasil"></h1>

<hr />

<pre class="keadaan-2"></pre>

<div class="tombol">
  <button class="mulai">Mulai</button>
  <button class="berhenti">Berhenti</button>
  <button class="reset">Reset</button>
</div>

<h2 class="detik"></h2>

<script>
  // Kode JavaScript sebelumnya
</script>
```

Pada contoh kode di atas kita menambahkan pemisah antara kalkulator dan penghitung detik menggunakan tag `hr`.

Selain itu kita juga memiliki tag `pre` yang akan kita gunakan untuk menampilkan keadaan nyata dari variabel yang kita deklarasikan.

Kemudian kita juga menambahkan 3 tombol yang memiliki nama sesuai fungsinya masing-masing. Tombol tersebut adalah tombol mulai, berhenti dan reset.

Kemudian kita juga menambahkan tag `h2` yang berfungsi untuk menampilkan detik.

<app-demo-11-id />

Pada demo di atas, aplikasi kalkulator yang sebelumnya kita buat juga masih dapat bekerja dengan baik.

### Keadaan Detik

Kemudian kita beralih ke bagian JavaScript. Yang perlu kita lakukan adalah mendeklarasikan terlebih dahulu variabel yang akan kita gunakan untuk menyimpan detik.

```javascript
function mulai() {
  // ... Kode sebelumnya
  const keadaanDetik = {
    detik: 0
  }
}
```

Pada contoh kode di atas kita mendeklarasikan objek `keadaanDetik` yang memiliki properti `detik`. Sesuai dengan namanya properti inilah yang akan kita gunakan untuk menampung nilai dari detik.

Setelah itu kita perlu mendapatkan semua tag HTML yang telah kita deklarasikan agar dapat diakses di dalam JavaScript.

```javascript
function mulai() {
  // ... Kode sebelumnya
  const tampilanKeadaan2 = document.querySelector('.keadaan-2')
  const tampilanTombolMulai = document.querySelector('.mulai')
  const tampilanTombolBerhenti = document.querySelector('.berhenti')
  const tampilanTombolReset = document.querySelector('.reset')
  const tampilanDetik = document.querySelector('.detik')
}
```

Pada contoh kode di atas, kita mendapatkan semua komponen HTML dan menyimpannya masing-masing ke dalam sebuah variabel.

### Fungsi Dasar

Kemudian yang perlu kita lakukan adalah membuat fungsi untuk menampilkan nilai sebenarnya dari variabel `keadaanDetik` dan menampilkan nilai dari properti `detik`.

```javascript
function mulai() {
  // ... Kode sebelumnya
  function mutakhirkanPenghitungDetik() {
    tampilanKeadaan2.innerText = JSON.stringify(keadaanDetik, null, 2)
    tampilanDetik.innerText = keadaanDetik.detik.toString()
  }
}
```

Pada contoh kode di atas kita mendeklarasikan fungsi bernama `mutakhirkanPenghitungDetik`. Cara tersebut merupakan cara yang sama seperti yang telah kita gunakan untuk menampilkan keadaan dan hasil pada aplikasi kalkulator.

Selanjutnya kita akan membuat beberapa fungsi yang akan dieksekusi ketika pengguna mengklik ketiga tombol yang telah kita buat sebelumnya.

```javascript
function mulai() {
  // ... Kode sebelumnya
  let idInterval = 0

  function mulai() {
    idInterval = setInterval(() => {
      keadaanDetik.detik = keadaanDetik.detik + 1
    }, 1000)
  }
}
```

Pada contoh kode di atas kita mendeklarasikan variabel bernama `idInterval` dengan nilai `0`. Variabel tersebut akan kita gunakan untuk menyimpan id dari fungsi `setInterval`.

Selain itu, kita juga mendeklarasikan fungsi bernama `mulai`. Di dalam fungsi tersebut kita memanggil fungsi `setInterval`. Fungsi ini berguna untuk mengesekusi suatu fungsi dalam tenggang waktu tertentu secara berulang-ulang.

Fungsi `setInterval` menerima 2 parameter, parameter pertama merupakan fungsi yang akan dieksekusi secara berulang-ulang. Parameter kedua merupakan seberapa lama tenggang waktunya dalam bentuk mili detik.

Karena kita akan membuat penghitung detik, maka kita akan mengesekusi fungsi pada parameter pertama dengan tenggang waktu 1 detik. Oleh karena itu kita akan memasukkan nilai `1000` pada parameter kedua.

Di dalam fungsi pada parameter pertama, kita menambahkan keadaan detik dengan nilai `1` karena setiap detik nilai dari keadaan detik tersebut juga akan bertambah `1`.

```javascript
function mulai() {
  // ... Kode sebelumnya
  function berhenti() {
    clearInterval(idInterval)
  }
}
```

Selanjutnya kita juga mendeklarasikan fungsi bernama `berhenti`. Sesuai dengan namanya, fungsi ini berguna untuk menghentikan penghitung detik.

Cara menghentikan penghitung detik adalah dengan memanggil fungsi `clearInterval`. Fungsi tersebut menerima satu parameter yakni id `setInterval` yang telah kita atur sebelumnya.

```javascript
function mulai() {
  // ... Kode sebelumnya
  function reset() {
    berhenti()
    keadaanDetik.detik = 0
  }
}
```

Kemudian kita juga mendeklarasikan fungsi bernama `reset`. Di dalam fungsi ini kita memanggil fungsi `berhenti` kemudian mengatur nilai properti `detik` menjadi `0`.

### Pendengar Peristiwa

Setelah semuanya dideklarasikan, yang perlu kita lakukan selanjutnya adalah memasang pendengar peristiwa pada ketiga tombol.

```javascript
function mulai() {
  // ... Kode sebelumnya
  tampilanTombolMulai.addEventListener('click', () => {
    mulai()
  })
  tampilanTombolBerhenti.addEventListener('click', () => {
    berhenti()
  })
  tampilanTombolReset.addEventListener('click', () => {
    reset()
  })
}
```

Pada contoh kode di atas, kita memasang pendengar peristiwa `click` pada ketiga tombol tersebut. Di dalam fungsi pada parameter kedua, kita tidak perlu menambahkan parameter `peristiwa` karena kita tidak membutuhkannya.

Yang perlu kita lakukan di dalam fungsi pada parameter kedua hanyalah memanggil fungsi-fungsi yang telah kita deklarasikan sebelumnya sesuai dengan fungsi tombolnya.

Tombol mulai memanggil fungsi `mulai`, tombol berhenti memanggil fungsi `berhenti` dan tombol reset memanggil fungsi `reset`.

```javascript
function mulai() {
  // ... Kode sebelumnya
  mutakhirkanPenghitungDetik()
}
```

Kita juga perlu memanggil fungsi `mutakhirkanPenghitungDetik` agar keadaan sebenarnya objek `keadaanDetik` ditampilkan di layar peramban.

<app-demo-12-id />

### Pembuat Reaktif

Sebelum melanjutkan pembahasan mari kita mengingat kembali bagaimana sistem reaktivitas yang telah kita buat bekerja di balik layar.

```javascript {3,5,6,8,19-20}
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

Contoh kode di atas adalah kode yang kita gunakan untuk membuat sistem reaktivitas buatan kita bekerja.

Kita mengubah setiap properti yang terdapat pada objek keadaan agar memiliki fungsi pengambil dan fungsi pengatur menggunakan _method_ `defineProperty` yang terdapat pada kelas `Object`.

Di dalam fungsi `pengambilReaktif` kita hanya mengembalikan nilai dari properti sedangkan di dalam fungsi `pengaturReaktif` kita memanggil fungsi `kalkulasiHasil` dan `mutakhirkanTampilan`.

Pemanggilan kedua fungsi itulah yang membuat aplikasi kita seolah-olah menjadi reaktif. Namun pemanggilan secara langsung di dalam fungsi `pengaturReaktif` membuat sistem reaktivitas yang kita buat hanya dapat mengerjakan satu pekerjaan dalam satu waktu saja.

Kita dapat menganggap **mengkalkulasi hasil dan memutakhirkan tampilan menjadi satu pekerjaan**. Karena keduanya dieksekusi ketika terjadi perubahan pada objek keadaan.

Namun sekarang kita akan menambahkan satu aplikasi lainnya, sehingga kita pun perlu memiliki objek keadaan lainnya. Kita juga telah mendeklarasikan fungsi untuk memutakhirkan tampilan untuk aplikasi penghitung waktu.

Sehingga bisa dikatakan terdapat 2 pekerjaan yang perlu dilakukan, pekerjaan pertama adalah mengkalkulasi dan memutakhirkan tampilan pada aplilasi kalkulator dan pekerjaan kedua memutakhirkan tampilan pada aplikasi penghitung waktu.

Oleh karena itu kita memerlukan sebuah mekanisme untuk membuat kode di atas dapat digunakan berulang kali.

Hal yang mungkin kita lakukan untuk membuat kode di atas dapat digunakan berulang kali adalah merefaktornya menjadi sebuah fungsi.

Namun hal tersebut belumlah cukup karena di dalam fungsi `pengaturReaktif` kita memanggil fungsi untuk mengkalkulasi dan memutakhirkan aplikasi kalkulator secara langsung.

Coba teman-teman pikirkan sejenak apa yang dapat kita lakukan untuk mengatas permasalahan tersebut. Kita ingin membuat kode sebelumnya dapat digunakan secara berulang kali namun kita juga tidak bisa meletakkan fungsi untuk memutakhirkan layar dan kalkulasi di dalam fungsi `pengaturReaktif`.

.

.

.

Bagaimana? Sudah menemukan solusinya? Mari kita bahas bersama-sama. Kita sudah mengetahui bahwa kita dapat membuat sebuah kode digunakan secara berulang kali dengan mengubahnya menjadi fungsi.

Namun permasalahan kedua masih belum terselesaikan. Dimanakah kita meletakkan fungsi untuk memutakhirkan layar dan mengkalkulasi?

Karena sumber inspirasi pembuatan sistem reaktivitas kita adalah Vue.js, mari kita perhatikan kembali diagram sistem reaktivitas Vue.js berikut:

<app-img src="/content/2020/01/create-reactivity-system-vuejs-javascript-part-1/vuejs-reactivity-system-explained.jpg" :caption="{ en: { aviaB: 'Vue.js Reactivity System Diagram' }, id: { aviaB: 'Diagram Sistem Reaktivitas Vue.js' } }" source="Vue.js: Reactivity in Depth" source-link="https://vuejs.org/v2/guide/reactivity.html" alt="Vue.js Reactivity System Diagram by Evan You"/>

Mari kita pikirkan apa yang telah kita punya sekarang dan apa yang belum kita punya agar sistem reaktivitas buatan kita sama seperti sistem reaktivitas Vue.js.

Kita telah mempunyai keadaan atau data pada diagram di atas. Kita juga telah mempunyai pengambil dan pengatur atau _getter & setter_ pada diagram di atas.

Berarti kita masih belum memiliki pengintai atau _watcher_ pada diagram di atas. Yap kita membutuhkan pengintai. **Pengintai bertugas untuk menyimpan pekerjaan dan menjalankannya jika terdapat perubahan pada keadaan**.

Istilah menyimpan pada diagram di atas adalah _collect as dependency_ dan menjalankan pekerjaan adalah _trigger re-render_.

Kita juga masih tetap menggunakan fungsi pengambil dan pengatur untuk membuatnya.

Pada bagian sebelumnya juga telah dibahas. Ketika suatu variabel diakses, maka fungsi pengambil akan dieksekusi. Fungsi tersebut akan menyimpan pekerjaan.

Kemudian ketika suatu variabel diubah nilainya, fungsi pengatur akan memberitahukan pengintai untuk menjalankan pekerjaan yang telah disimpan sebelumnya.

1. Di dalam fungsi pengambil telah dideklarasikan suatu **mekanisme untuk menyimpan suatu pekerjaan sebagai dependensi**.
2. Sedangkan di dalam fungsi pengatur dideklarasikan suatu **mekanisme untuk memberitahukan semua dependensi bahwa variabel tersebut telah berubah nilainya**. Sehingga pekerjaan yang telah disimpan sebagai dependensi dapat dijalankan.

Oke langsung saja kita ubah fungsi pengambil dan pengatur agar sesuai dengan pembahasan kita sebelumnya dan membuat sebuah pengintai untuk menyimpan pekerjaan.

Mari kita buat terlebih dahulu pengintai tersebut.

```javascript {5,8}
function mulai() {
  // ... Kode sebelumnya
  class Pengintai {
    constructor() {
      this.daftarPekerjaan = []
    }
  }
  Pengintai.pekerjaan = null
}
```

Pada contoh kode di atas kita membuat sebuah kelas bernama `Pengintai`. Di dalam kelas tersebut, kita juga mendeklarasikan sebuah konstruktor yang bertugas untuk membuat variabel `daftarPekerjaan` dan mengatur nilainya menjadi _array_ kosong. Variabel tersebut kita gunakan untuk **menyimpan daftar pekerjaan**.

Selain itu kita juga mengatur kelas `Pengintai` agar memiliki properti `pekerjaan`. Properti `pekerjaan` ini akan kita gunakan untuk **menyimpan pekerjaan yang akan disimpan ke dalam daftar pekerjaan**.

Properti `pekerjaan` sengaja kita letakkan pada kelas `Pengintai` secara langsung agar dalam satu waktu hanya satu pekerjaan yang disimpan ke dalam `daftarPekerjaan`. Selain itu untuk dapat mengubah nilainya kita tidak perlu menginisiasi kelas `Pengintai` menggunakan kata kunci `new` terlebih dahulu.

Selain variabel tersebut, kita juga membutuhkan _method_ untuk menyimpan pekerjaan ke dalam daftar pekerjaan dan _method_ untuk menjalankan pekerjaan.

```javascript {8-12}
function mulai() {
  // ... Kode sebelumnya
  class Pengintai {
    constructor() {
      this.daftarPekerjaan = []
    }

    simpanPekerjaan() {
      if(Pengintai.pekerjaan) {
        this.daftarPekerjaan.push(Pengintai.pekerjaan)
      }
    }
  }
  Pengintai.pekerjaan = null
}
```

Pada contoh kode di atas, kita mendeklarasi _method_ bernama `simpanPekerjaan`. Di dalam _method_ tersebut kita mengecek apakah properti `pekerjaan` memiliki nilai atau tidak. Jika ya, ia akan menyimpan nilai tersebut ke dalam `daftarPekerjaan`.

Kemudian kita juga membutuhkan _method_ untuk menjalankan semua daftar pekerjaan yang telah disimpan di dalam `daftarPekerjaan`.

```javascript {14-18}
function mulai() {
  // ... Kode sebelumnya
  class Pengintai {
    constructor() {
      this.daftarPekerjaan = []
    }

    simpanPekerjaan() {
      if(Pengintai.pekerjaan) {
        this.daftarPekerjaan.push(Pengintai.pekerjaan)
      }
    }

    jalankanPekerjaan() {
      this.daftarPekerjaan.forEach(pekerjaan => {
        pekerjaan()
      })
    }
  }
  Pengintai.pekerjaan = null
}
```

Pada contoh kode di atas, kita mendeklarasikan _method_ bernama `jalankanPekerjaan`. Di dalam _method_ tersebut kita melakukan pengulangan menggunakan _method_ `forEach`. Pengulangan tersebut akan menjalankan semua pekerjaan yang telah disimpan di dalam `daftarPekerjaan`.

Selanjutnya mari kita refaktor kode yang bertugas untuk membuat objek keadaan reaktif pada bagian sebelumnya.

```javascript {3,8,14,22}
function mulai() {
  // ... Kode sebelumnya
  function observasi(objek) {
    const daftarKunci = Object.keys(objek)

    daftarKunci.forEach(kunci => {
      let nilai = objek[kunci]
      const pengintai = new Pengintai()

      Object.defineProperty(objek, kunci, {
        enumerable: true,
        configurable: true,
        get: function pengambilReaktif() {
          pengintai.simpanPekerjaan()
          return nilai
        },
        set: function pengaturReaktif(nilaiBaru) {
          if(nilaiBaru === nilai) {
            return
          }
          nilai = nilaiBaru
          pengintai.jalankanPekerjaan()
        }
      })
    })
  }
  // ... Kode setelahnya
}
```

Pada contoh kode di atas, kita telah merefaktor kode yang bertugas untuk membuat objek keadaan reaktif dengan cara membuat fungsi bernama `observasi`. Fungsi tersebut menerima 1 parameter berupa objek.

Yang pertama kita mengubahnya menjadi fungsi yang menerima parameter berupa objek. Kemudian di dalam pengulangan kita menginisialisasi objek sebenarnya dari kelas `Pengintai` dan menyimpannya ke dalam variabel bernama `pengintai`.

Selanjutnya di dalam fungsi `pengambilReaktif` sebelum kita mengembalikan nilai, kita memanggil _method_ `simpanPekerjaan` yang terdapat pada objek `pengintai`.

Dan yang terakhir kita memanggil _method_ `jalankanPekerjaan` yang terdapat pada objek `pengintai` di dalam fungsi `pengaturReaktif`.

Kode di atas memiliki fungsi yang sama seperti kode sebelumnya yakni membuat suatu objek menjadi reaktif.

Hanya saja pada kode sebelumnya ketika terdapat perubahan terhadap suatu properti yang dimiliki objek, kita langsung menjalankan pekerjaan yang berhubungan dengan properti tersebut. Dan ketika properti tersebut diakses, kita hanya mengembalikan nilainya tanpa melakukan apapun.

Sedangkan pada kode di atas, ketika properti diakses selain mengembalikan nilai kita juga menyimpan pekerjaan yang berhubungan dengan properti tersebut. Dan ketika terdapat perubahan kita menjalankan semua pekerjaan yang telah disimpan sebelumnya.

Setelah membuat kode di atas dapat digunakan secara berkali-kali, kita dapat memanggil fungsi `observasi` tersebut dengan parameter `keadaan` dan `keadaanDetik`.

```javascript
function mulai() {
  // ... Kode sebelumnya
  observasi(keadaan)
  observasi(keadaanDetik)
}
```

Dengan begitu secara otomatis semua properti yang dimiliki oleh kedua objek tersebut akan menjadi reaktif.

Kemudian mungkin teman-teman timbul pertanyaan, darimanakah kode di dalam fungsi `observasi` tahu hubungan antara properti dengan pekerjaan yang harus dijalankan ketika terjadi perubahan padanya.

Untuk menjawab pertanyaan tersebut, kita membutuhkan satu fungsi lagi sebagai bantuan.

```javascript {4-6}
function mulai() {
  // ... Kode sebelumnya
  function pelaksana(pekerjaan) {
    Pengintai.pekerjaan = pekerjaan
    pekerjaan()
    Pengintai.pekerjaan = null
  }
}
```

Pada contoh kode di atas kita membuat satu fungsi lagi sebagai bantuan. Fungsi tersebut bernama `pelaksana` yang menerima 1 parameter bernama `pekerjaan`.

Ada 3 hal yang dilakukan fungsi tersebut, yang pertama adalah menyimpan parameter ke dalam properti `pekerjaan` yang dimiliki oleh kelas `Pengintai`.

Yang kedua adalah memanggil parameter sebagai fungsi. Dan yang terakhir adalah mengatur nilai properti `pekerjaan` pada kelas `Pengintai` menjadi `null`.

Fungsi `pelaksana` tersebut menerima 1 parameter bernama `pekerjaan`. Parameter tersebut berupa **fungsi yang akan dieksekusi jika terdapat perubahan pada properti reaktif** yang dibahas sebelumnya.

Properti tersebut **pasti** diakses di dalam fungsi yang harus dijalankan ketika properti tersebut berubah.

Mari kita lihat fungsi untuk memutakhirkan layar pada aplikasi kalkulator yang telah kita buat sebelumnya.

```javascript
function mulai() {
  // ... Kode sebelumnya
  function mutakhirkanTampilan() {
    tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)
    tampilanHasil.innerText = keadaan.hasil.toString()

    tampilanInput1.value = keadaan.input1.toString()
    tampilanInput2.value = keadaan.input2.toString()

    tampilanOperator.value = keadaan.operator
  }
  // ... Kode setelahnya
}
```

Di dalam fungsi `mutakhirkanTampilan` di atas, kita mengakses properti `hasil`, `input1`, `input2` dan `operator`. Maka ketika semua properti tersebut di akses, fungsi `mutakhirkanTampilan` akan disimpan ke dalam daftar pekerjaan.

Oleh karena itu setelah kita memanggil fungsi `observasi` dengan parameter objek `keadaan` dan `keadaanDetik`, kita juga perlu memanggil fungsi `pelaksana` dengan parameter fungsi `mutakhirkanTampilan`.

```javascript
function mulai() {
  // ... Kode sebelumnya
  pelaksana(mutakhirkanTampilan)
}
```

Oya karena di dalam fungsi pelaksana kita telah memanggil parameternya sebagai fungsi, semua pemanggilan fungsi `mutakhirkanTampilan` harus kita hilangkan juga.

<app-demo-13-id />

Demo di atas kita telah berhasil menampilkan keadaan sebenarnya dari variabel `keadaan`. Tetapi ketika terjadi perubahan tidak terjadi kalkulasi secara otomatis.

Hal tersebut dikarenakan kita hanya memanggil fungsi `pelaksana` dengan parameter fungsi `mutakhirkanTampilan` saja. Seharusnya kita juga perlu memanggil fungsi `pelaksana` dengan parameter fungsi `kalkulasiHasil`.

```javascript
function mulai() {
  // ... Kode sebelumnya
  pelaksana(kalkulasiHasil)
}
```

Dengan begitu selain keadaan sebenarnya dari variabel `keadaan` ditampilkan hasil juga akan terkalkulasi secara otomatis.

<app-demo-14-id />

Kita telah berhasil merefaktor kode yang sebelumnya hanya dapat digunakan untuk satu pekerjaan menjadi dapat digunakan untuk banyak pekerjaan.

Namun kita belum mengecek apakah kode hasil refaktor kita memang benar dapat digunakan untuk banyak pekerjaan.

Karena kita telah mengubah objek `keadaanDetik` menjadi reaktif menggunakan fungsi `observasi`. Maka hal terakhir yang perlu kita lakukan adalah memanggil fungsi `pelaksana` dengan `mutakhirkanPenghitungDetik` sebagai parameternya.

```javascript
function mulai() {
  // ... Kode sebelumnya
  pelaksana(mutakhirkanPenghitungDetik)
}
```

Sekali lagi kita perlu menghapus semua pemanggilan fungsi `mutakhirkanPenghitungDetik` karena ketika dijadikan parameter pada fungsi `pelaksana`, ia akan secara otomatis dipanggil.

<app-demo-15-id />

## Ikhtisar

Pada bagian kedua ini kita telah berhasil membuat sistem reaktivitas yang dapat melakukan banyak hal dalam satu waktu. Teman-teman dapat mencobanya menggunakan demo di atas.

Tekan tombol mulai dan biarkan detiknya berjalan sembari berinteraksi dengan aplikasi kalkulatornya.

Keadaan sebenarnya pada aplikasi kalkulator tidak dipengaruhi oleh keadaan sebenarnya penghitung detik dan begitu juga sebaliknya.

Yang telah kita lakukan untuk mewujudkan sistem reaktivitas yang dapat melakukan banyak hal dalam satu waktu adalah merefaktor kode untuk mengatur fungsi `pengambilReaktif` dan `pengaturReaktif` menjadi sebuah fungsi yang dapat dipanggil secara berulang kali. Fungsi tersebut kita beri nama `observasi`.

Oleh karena itu kita juga membutuhkan fungsi tambahan bernama `pelaksana`. Fungsi ini berfungsi sebagai penghubung antara properti dengan pekerjaan yang harus ia kerjakan ketika terjadi perubahan nilai.

Selain itu kita juga membuat kelas bernama `Pengintai` yang memiliki _method_ untuk menyimpan dan menjalankan pekerjaan.

Oh ya kalau teman-teman bingung dengan penjelasannya, teman-teman dapat mengklik tautan yang terdapat pada setiap bagian demo. Tautan tersebut mengarah ke halaman Github yang menampilkan kode sumber dari demo yang bersangkutan.

Walaupun kita telah berhasil membuat sistem reaktivitas kita sendiri menyerupai Vue.js. Namun sistem tersebut masih belum dapat dikatakan sama 100%.

Hal tersebut dikarenakan kita masih belum menangani reaktivitas pada _array_. Dari bagian 1 hingga bagian 2 ini kita hanya berfokus pada membuat sistem reaktivitas yang bekerja pada objek.

Sayangnya, untuk membuat sistem reaktivitas tersebut bekerja pada _array_. Kita tidak dapat menggunakan fungsi pengambil dan pengatur.

Kita perlu memikirkan cara lain untuk melakukannya. Mungkin teman-teman bisa membantu dan memberikan saran kepada saya untuk menyelesaikan permasalahan tersebut. Kemudian kita akan coba bahas pada bagian selanjutnya.

Terima kasih dan semoga bermanfaat!

## Referensi

1. [Medium JS Dojo: Understanding Vue Reactivity Step by Step](https://medium.com/js-dojo/understand-vue-reactivity-implementation-step-by-step-599c3d51cd6c)
2. [Vue.js: Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html)

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
