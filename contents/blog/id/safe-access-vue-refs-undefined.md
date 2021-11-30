---
title: Cara Mengakses Vue Refs secara Aman tanpa Mendapatkan Nilai Undefined
description: Menggunakan $refs pada waktu dan tempat yang tepat. Walaupun demikian, terkadang nilai yang dihasilkan pun masih undefined.
summary: $refs merupakan salah satu fitur Vue.js yang gampang-gampang susah untuk digunakan. Kita harus menggunakannya pada waktu dan tempat yang tepat. Bahkan jika kita telah melakukannya, terkadang nilai yang dihasilkan masih undefined.
img: /blog/cover/2020/01/vuejs-logo-by-jefrydco.jpg
imgCreator: jefrydco
postedDate: 2021-01-25T00:00:00.000Z
updatedDate: 2021-01-25T00:00:00.000Z
slug: safe-access-vue-refs-undefined
---

> Catatan: Artikel ini mengasumsikan bahwa teman-teman telah memahami dasar-dasar komponen Vue. Jika belum, silahkan baca [dokumentasi komponen Vue](https://docs.vuejs.id/v2/guide/components.html) terlebih dahulu.

Atribut `ref` bisa dibilang cara terakhir yang dapat kita gunakan untuk memanipulasi DOM **jika tidak ada cara lain**. Bahkan penjelasan atribut `ref` terletak pada bagian [Menangani Kasus Langka](https://docs.vuejs.id/v2/guide/components-edge-cases.html) pada dokumentasi Vue. Di sana juga disebutkan bahwa kita harus menghindari manipulasi elemen DOM secara langsung.

Jadi, saya harap teman-teman memikirkannya dengan matang sebelum menggunakan fitur `ref` tersebut. Bukan berarti kita tidak dapat menggunakannya, di sini saya hanya mengingatkan agar kita lebih berhati-hati.

## Permulaan

Kita memiliki komponen Vue sebagai berikut:

```vue{}[AppNav.vue]
<template>
  <nav>
    <input ref="input">
    <p>{{ value }}</p>
  </nav>
</template>
```

Komponen tersebut memiliki input dengan atribut `ref` dan sebuah tag paragaraf yang berisi _binding_ data.

Katakanlah kita ingin membuat input tersebut menjadi fokus melalui JavaScript. Kita dapat melakukannya dengan cara `$refs.input.focus()`.

Permasalahannya, terkadang kita **tidak dapat mengakses properti refs** yang dimaksud. Karena `ref` sendiri **dibuat dari hasil dari pemanggilan fungsi render**. Lebih lanjut mengenai penjelasan ini, teman-teman dapat membacanya pada bagian [API Ref - Vue.js](https://docs.vuejs.id/v2/api/#ref).

Sebelum melanjutkan ke bagian selanjutnya, mari kita segarkan pemahaman  mengenai `ref` dan `$refs` terlebih dahulu.

`ref` adalah atribut HTML atau props dari sebuah komponen. Nilainya akan menjadi nama referensi. Sedangkan, `$refs` merupakan properti _instance_. Kita dapat mengakses nama referensi yang telah kita deklarasikan sebelumnya menggunakan `ref` dari properti ini.

Menggunakan contoh di atas, kita memberi nilai atribut `ref` dengan nilai `input`. Jadi kita dapat mengaksesnya dengan cara, `$refs.input`.

## Daftar Isi

## Perlu Dicermati

Kita harus mengetahui di mana dan kapan kita mengakses properti tersebut. Berikut beberapa contoh cara mengakses `$refs` dari tempat yang berbeda-beda:

### Created

```vue{9-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  created() {
    console.log(this.$refs.input)
    // undefined
    console.log(this.$refs)
    // {input: HTMLInputElement}
  }
}
</script>
```

Mengakses `$refs.input` secara langsung pada `created` akan menghasilkan nilai undefined. Seperti yang saya deskripsikan di atas, `ref` dibuat dari hasil pemanggilan fungsi render. Dan `created` **dipanggil sebelum fungsi render**.

Tetapi, hal aneh terjadi jika kita hanya mencetak nilai `$refs`. Konsol akan menampilkan properti input. Mengapa hal tersebut dapat terjadi? [Dion DiFelice](https://stackoverflow.com/users/2337996/dion-difelice) memberikan penjelasan ringkas di sebuah utas StackOverflow, [Vue.js refs are undefined, even though this.$refs show they're there](https://stackoverflow.com/a/58203295):


> ... is that `self.refs` is **passed by reference**. So, by the time you viewed the console, the rest of the data finished loading in a matter of milliseconds. And `self.$refs.mapRef` is **not passed by reference**, so it remains `undefined`, as it was during runtime.

Penjelasan tersebut juga berlaku jika kita mengakses `$refs` pada siklus hidup _life cycle_ Vue yang lainnya kecuali `mounted` dan `beforeDestroy`.

### Computed

```vue{4-6}[AppNav.vue]
<script>
export default {
  computed: {
    value() {
      return this.$refs.input.value
    }
  }
}
</script>
```

Mengakses `$refs.input.value` secara langsung di dalam _computed property_ akan menghasilkan galat (_error_) sebagai berikut:

```javascript
// TypeError: Cannot read property 'value' of undefined
```

Hal tersebut dikarenakan properti `input` sendiri bernilai undefined, jadi kita juga tidak akan dapat mengakses nilai dari properti `value`.

Selain itu, galat (_error_) berikut juga muncul:

```javascript
// [Vue warn]: Error in render: "TypeError: Cannot read property 'value' of undefined"
```

Hal tersebut dikarenakan galat (_error_) sebelumnya terjadi ketika proses pe-_render_-an komponen. Sehingga _computed property_ `value` juga akan bernilai undefined.

### Watch

```vue{9-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  watch: {
    // Tidak terjadi apa-apa
    '$refs.input.value': function (currentValue) {
      this.value = currentValue
    }
  }
}
</script>
```

Memasang _watcher_ perubahan pada input tidak akan melakukan apapun, karena `$refs` sendiri tidaklah reaktif. Pada salah satu bagian Menangani Kasus Langka, [Mengakses _Instance_ Komponen Anak & Elemen Anak](https://docs.vuejs.id/v2/guide/components-edge-cases.html#Mengakses-Instance-Komponen-Anak-amp-Elemen-Anak), disebutkan bahwa:

> `$refs` hanya diisi setelah komponen telah di-render, dan **mereka tidak reaktif**.

```vue{9-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  watch: {
    // Tidak terjadi apa-apa
    '$refs.input': function (currentInput) {
      this.value = currentInput.value
    }
  }
}
</script>
```

Walaupun kita hanya memasang _watcher_ pada properti `$refs.input`, hasilnya juga akan sama saja. Karena properti `$refs` sendiri tidaklah reaktif.

### Methods

```vue{9-11}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    makeFocus() {
      this.$refs.input.focus()
    }
  }
}
</script>
```

Mengakses `$refs` di dalam `methods` cukup gampang-gampang susah. Dikarenakan hal tersebut juga **tergantung di mana dan kapan kita memanggil _method_ tersebut**. Jadi kita harus memastikan, kita tidak memanggilnya ketika `$refs` sendiri masih bernilai undefined.

### Mounted

```vue{9-10,11-12}[AppNav.vue]
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    console.log(this.$refs.input)
    // <input></input>
    console.log(this.$refs)
    // {input: HTMLInputElement}
  }
}
</script>
```

Mungkin **tempat yang paling aman** untuk mengakses `$refs` adalah di `mounted`. Mengakses `$refs.input` dan `$refs` akan menghasilkan nilai yang terdefinisi.

Tetapi jika kita ingin menambahkan atribut `ref` pada komponen, kita harus memastikan komponen tersebut **tidak dimuat secara asinkronus**. Walaupun kita mengakses `$refs` pada `mounted`, hasilnya juga akan undefined.

```vue{2,8,11-14}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    console.log(this.$refs.nav)
    // undefined
    console.log(this.$refs)
    // {}
  }
}
</script>
```

### $nextTick

```vue{2,8,11-16}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.nav)
      // undefined
      console.log(this.$refs)
      // {}
    })
  }
}
</script>
```

Kita terkadang menggunakan `$nextTick` untuk menyelesaikan permasalahan mendapatkan nilai dari suatu objek. Tetapi untuk kasus ini, walaupun kita menggunakan `$nextTick` secara bertingkat, hasilnya tidak akan berhasil. Teman-teman dapat mempelajari lebih lanjut mengenai `$nextTick` pada bagian [Pembaruan Antrian Async - Vue.js](https://docs.vuejs.id/v2/guide/reactivity.html#Pembaruan-Antrian-Async).

### setTimeout

```vue{2,8,11-16}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs.nav)
      // undefined
      console.log(this.$refs)
      // {}
    }, 1000)
  }
}
</script>
```

Menggunakan `setTimeout` akan menunda eksekusi fungsi _callback_ dalam waktu tertentu. Cara ini akan bekerja jika kita **mengetahui berapa banyak waktu yang kita butuhkan untuk penundaan eksekusi**. Penundaan tersebut juga bergantung pada konektivitas pengguna. Semakin lambat internet, semakin banyak pula waktu tunda yang dibutuhkan.

---

Katakanlah cara di atas tidak ada yang bisa diandalkan. Jadi, apa yang dapat kita lakukan untuk mengakses nilai `$refs` secara aman?

## Cara Aman

Sebelum melanjutkan pembahasan, saya ingin menceritakan bagaimana saya menemukan solusi dari permasalahan tersebut.

Beberapa hari yang lalu, saya menemukan bahwa demo interaktif pada artikel "Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana" baik pada <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-1' } }">bagian 1</app-locale-path-link> dan <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } }">bagian 2</app-locale-path-link>  tidak bekerja. Saya mencurigai hal tersebut dikarenakan tag `<script></script>` yang tidak dapat dieksekusi di dalam `<template></template>` ketika _production_.

Saya mencari tahu cara lain untuk meng-_inject_ dan menjalankan JavaScript setelah peramban (_browser_) selesai memuat kodenya.

Saya memutuskan untuk menggunakan `$refs`. Permasalahannya, komponen demo interaktif tersebut dimuat secara asinkronus. Sehingga saya harus menggunakan `$nextTick` atau `setTimeout` untuk menunda _script injection_. Sayangnya, kedua cara tersebut tidak bekerja.

Kemudian saya ingat suatu hal, saya pernah menggunakan paket NPM bernama [wait-for-expect](https://github.com/TheBrainFamily/wait-for-expect). Paket tersebut berguna untuk menunggu _Jest expectation_ jika kita menjalankan kode secara asinkronus sampai mendapatkan hasil yang sesuai.

Rahasianya adalah paket tersebut **menjalankan fungsi _callback_ yang berisi kode _expectation_ secara terus menerus** dalam waktu tertentu. Eksekusi tersebut akan **berhenti ketika fungsi _callback_ telah selesai** atau tidak menghasilkan galat (_error_) apapun.

Mungkin cara tersebut dapat saya gunakan juga untuk mengakses nilai `$refs` tanpa harus mendapatkan nilai undefined.

```vue{2,8,11-19}[App.vue]
<template>
  <app-nav ref="nav"></app-nav>
</template>

<script>
export default {
  components: {
    AppNav: () => import('./components/AppNav')
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.$refs.nav) {
        console.log(this.$refs.nav)
        // VueComponent{}
        console.log(this.$refs)
        // {nav: VueComponent}
        clearInterval(interval)
      }
    }, 50)
  }
}
```

Dimulai dari tempat yang paling aman untuk mendapatkan nilai `$refs`, kita membuat sebuah variabel bernama `interval` yang direferensikan pada hasil pemanggilan fungsi `setInterval`. Fungsi tersebut akan menjalankan fungsi _callback_ setiap 50ms.

Kita dapat menyesuaikan waktu 50ms tersebut sesuai keinginan kita, tetapi di sini saya hanya mengikuti apa yang `wait-for-expect` lakukan.

Di dalam fungsi _callback_, kita melakukan pengecekan jika `$refs.nav` telah tersedia, kita dapat melakukan sesuatu dengan nilainya. Katakanlah seperti mencetaknya pada konsol peramban (_browser_). Kemudian, kita memanggil fungsi `clearInterval` dan memasukkan variabel `interval` untuk membersihkan memori dan menghentikan pemanggilan fungsi _callback_.

Dengan cara tersebut, kita tidak perlu mengetahui berapa lama waktu tunggu yang dibutuhkan sampai nilai `$refs.nav` tersedia. Selama pemanggilan fungsi _callback_ masih berjalan, akan dilakukan pengecekan terhadap nilai tersebut.

Jika teman-teman ingin mengetahui bagaimana implementasi cara tersebut pada demo interaktif, silahkan melihatnya di [AppDemo10Id.vue](https://github.com/jefrydco/jefrydco/blob/e37cf5c48417e57d7489f30ba407eddc713962ec/components/global/contents/blogs/create-reactivity-system-vuejs-javascript-part-1/AppDemo10Id.vue#L29-L35).

## Kesimpulan

$refs merupakan salah satu fitur Vue.js yang gampang-gampang susah untuk digunakan. Kita harus menggunakannya pada waktu dan tempat yang tepat. Bahkan jika kita telah melakukannya, terkadang nilai yang dihasilkan masih undefined.

Tempat yang paling aman untuk mendapatkan nilai `$refs` adalah di `mounted`. Selain di tempat tersebut, akan rawan menghasilkan nilai undefined. Sehingga, kita harus berhati-hati sebelum menggunakannya.

Untuk mengatasi permasalahan tersebut, kita dapat menggunakan fungsi `setInterval` yang kita panggil di `mounted`. Di dalam fungsi _callback_-nya, kita melakukan pengecekan apakah nilai `$refs` telah tersedia atau belum. Jika sudah, maka kita dapat melakukan apapun dengan nilai tersebut. Dan yang paling penting adalah menghentikan pemanggilan fungsi _callback_ menggunakan fungsi `clearInterval`.

> Penyangkalan: Cara ini hanya diuji berdasarkan kebutuhan saya. Saya tidak bisa menjamin akan bekerja pada studi kasus lain. Silahkan melakukan uji coba secara mendalam ketika menerapkannya. Hubungi saya melalui Twitter [@jefrydco](https://twitter.com/jefrydco), jika teman-teman menemukan permasalahan.

## Referensi

- [StackOverflow: Vue.js refs are undefined, even though this.$refs show they're there](https://stackoverflow.com/a/58203295)
- [Vue.js: Menangani Kasus Langkah](https://docs.vuejs.id/v2/guide/components-edge-cases.html)
- [Vue.js: Reaktivitas Secara Mendalam](https://docs.vuejs.id/v2/guide/reactivity.html)
- [Vue.js: Ref](https://docs.vuejs.id/v2/api/#ref)
