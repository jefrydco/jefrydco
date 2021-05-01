---
title: Membuat Sistem Reaktivitas Vue 3 Versi Sederhana
description: Reveals the secret of the reactivity system of Vue 3 by recreating a simplified version.
summary: Vue 3 telah dirilis akhir tahun kemarin. Artikel ini akan membahas lebih dalam mengenai sistem reaktivitas yang digunakan di Vue 3 dan membuat versi sederhananya menggunakan teknologi yang sama.
img: /cover/2021/04/people-walking-on-pedestrian-by-andrew-teoh.jpg
imgCreator: theandrewteoh
postedDate: 2021-04-24T01:00:00.000Z
updatedDate: 2021-04-24T01:00:00.000Z
slug: create-reactivity-system-vue-3-javascript
---

<app-amp-notice :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vue-3-javascript' } }" label="Membuat Sistem Reaktivitas Vue 3 Versi Sederhana"></app-amp-notice>

Vue 3 telah dirilis akhir tahun kemarin dengan membawa banyak perbaikan dan fitur yang keren. Pada artikel kali ini, kita akan mempelajari lebih dalam sistem reaktivitas yang digunakan di Vue 3 dan membuat versi sederhananya menggunakan teknologi yang sama.

Sebelum artikel kali ini, saya juga menulis tentang <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-1' } }">Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana - Bagian 1</app-locale-path-link> and <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } }">Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana - Bagian 2</app-locale-path-link>. Jadi, pastikan teman-teman telah membaca artikel tersebut juga untuk mendapatkan pemahaman dasar yang lebih baik.

Cuplikan kode pada artikel ini juga ditulis menggunakan bahasa pemrograman TypeScript yang juga valid JavaScript. Jadi jika teman-teman ingin meng-_copy_, _past_ dan menjalankan kode tersebut di konsol peramban, harusnya kode tersebut dapat berjalan. Mengapa saya menulisnya pada bahasa pemrograman TypeScript? Alasannya adalah pada beberapa bagian cuplikan kode, kita dapat mengarahkan kursor di atas deklarasi tipe datanya juga.

## Daftar Isi

## Teknologi yang Digunakan

Untuk mengawali artikel ini, mari kita membicarakan teknologi yang digunakan. Sistem reaktivitas pada Vue 3 menggunakan beberapa API JavaScript modern, beberapa diantaranya adalah [Proxy](#proxy), [Reflect](#reflect), [WeakMap](#weakmap), [Map](#map) dan [Set](#set).

### Proxy

Jika teman-teman berasal dari latar belakang IT, mungkin teman-teman sering mendengar istilah Proxy. Secara sederhana, **proxy berperan sebagai penghubung 2 hal ketika mereka berkomunikasi**. Proxy **dapat mengubah atau hanya melewatkan sifat aslinya**.

Katakanlah, ada 2 orang teman, rumah mereka berdekatan. Walaupun mereka dapat berkomunikasi secara lisan atau berteriak satu sama lain, hal tersebut sangat tidak nyaman bagi tetangga mereka. Oleh karena itu mereka memiliki sebuah walkie talkie untuk memfasilitasi komunikasinya.

Walkie talkie tersebut memiliki beberapa fitur selain fitur utamanya untuk berkomunikasi. Beberapa diantaranya adalah menaikkan dan menurunkan volume. Bahkan walkie talkie tersebut dapat melewatkan suara selayaknya kita berbicara secara langsung.

Dari kasus tersebut, kita dapat mengatakan bahwa walkie talkie adalah proxy. Walkie talkie dapat mengubah sifat asli suara dengan meningkatkan, menurunkan dan memperjernih suara aslinya.

---

Kita telah memahami konsep dari proxy secara sederhana. Sekarang mari kita membicarakan Proxy dalam konteks JavaScript. Mungkin akan lebih mudah jika kita mempelajarinya dari contoh, coba lihat contoh kode berikut:

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}
```

Kita memiliki sebuah objek bernama `person` yang memiliki 2 properti, `name` dan `age` yang memiliki nilainya masing-masing.

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
person.name
// 'jefrydco'
person.age
// 23
```

Kemudian kita mencetak setiap properti pada konsol. Keduanya akan mencetak nilai yang dimilikinya.

#### _Handler_ Get Proxy

Bagaimana jika ketika kita mencetak properti `name`, kita juga mencetak teks lain, katakanlah "Hello &lt;value&gt;, nice to meet you!". Dan ketika kita mencetak properti `age`, kita mencetak tahun kapan orang tersebut lahir. Bagaimana kita dapat melakukannya? Gampang, kita dapat menggunakan Proxy! Mari kita menulis kode lain.

```typescript{}[]
const proxiedPerson = new Proxy(person, {
  get(target, key) {
    const value = target[key]
    if (key === 'name') {
      console.log(`Hello ${value}, nice to meet you!`)
    } else if (key === 'age') {
      const year = new Date().getFullYear() - value
      console.log(`The person was born in ${year}`)
    }
    return value
  }
})
```

Kita telah mendeklarasikan object bernama `proxiedPerson` menggunakan konstruktor `Proxy`. Objek tersebut menerima 2 parameter:

- `target`: objek asli yang ingin kita ubah sifatnya
- `handler`: objek yang mendefinisikan bagaimana operasi perubahan sifatnya

Dari kode tersebut, kita hanya mendefinisikan _handler_ `get`. _Handler_ tersebut akan dipanggil kapanpun propertinya diakses. _Handler_ `get` menerima 3 parameter:

- `target`: objek asli yang ingin kita ubah sifatnya
- `key`: nama properti yang sedang diakses
- `receiver`: objek yang diproxy (opsional)

Di dalam _handler_ `get`, kita bisa mendapatkan nilai dari properti yang diakses menggunakan notasi array `target[key]`. _Handler_ `get` akan dieksekusi untuk semua properti, sehingga untuk mengubah sifat spesifik properti, kita harus menambahkan kondisi.

Sekarang, kapanpun kita mengakses properti dari `proxiedPerson`, sifatnya akan diubah sesuai yang kita bahas sebelumnya:

```typescript{}[] twoslash
declare const proxiedPerson: {
    name: string;
    age: number;
}
/// ---cut---
proxiedPerson.name
// 'Hello jefrydco, nice to meet you!'
// 'jefrydco'
proxiedPerson.age
// 1998
// 23
```

Sifat tersebut hanya muncul ketika kita mengakses `proxiedPerosn`, bukan objek `person`-nya sendiri. Jadi objek aslinya masih sama.

#### _Handler_ Set Proxy

Bagaimana jika kita ingin mengubah sifat jika properti diubah nilainya. Katakanlah kapanpun setiap properti diubah nilainya, ia akan mencetak teks "&lt;property-name&gt; has been modified". Mari kita lihat implementasi kodenya:

```typescript{4}[]
const proxiedPerson = new Proxy(person, {
  set(target, key, value, receiver) {
    console.log(`${key} has been modified`)
    target[key] = value
    return value
  }
})
```

Untuk mengubah sifat ketika kita mengubah nilai suatu properti, kita dapat menggunakan _handler_ `set`. _Handler_ tersebut menerima 4 parameter:

- `target`: objek asli yang ingin kita ubah sifatnya
- `key`: nama properti yang sedang diakses
- `value`: nilai baru yang akan diubah
- `receiver`: objek yang diproxy (opsional)

Teman-teman perhatikan bagian yang dicetak tebal. Untuk menggunakan _handler_ `set`, jangan pernah lupa untuk mengubah properti ke nilai baru. Jika tidak, nilai sebelumnya tidak akan berubah.

Sekarang, kapanpun kita mengubah nilai setiap properti, kodenya akan mencetak teks juga:

```typescript{}[] twoslash
declare const proxiedPerson: {
    name: string;
    age: number;
}
/// ---cut---
proxiedPerson.name = 'jefry'
// name has been modified
// 'jefry'
proxiedPerson.age = 22
// age has been modified
// 22
```

Kita bisa melakukan banyak hal menggunakan _handler_ `set`. Salah satunya adalah kita dapat menggunakannya untuk validasi tipe data. Katakanlah properti `name` hanya dapat diatur menggunakan tipe data `string` dan properti `age` menggunakan tipe data `number`.

```typescript{3-7}[]
const proxiedPerson = new Proxy(person, {
  set(target, key, value, receiver) {
    if (key === 'name' && typeof value !== 'string') {
      throw new Error('name must be a string')
    } else if (key === 'age' && typeof value !== 'number') {
      throw new Error('age must be a number')
    }
    target[key] = value
    return value
  }
})
```

Sekarang kapanpun kita mengatur properti tersebut ke nilai yang berbeda dengan yang validator atur, kode tersebut akan melemparkan galat.

```typescript{}[] twoslash
declare const proxiedPerson: Record<string, string | number>
/// ---cut---
proxiedPerson.name = 23
// Uncaught Error: name must be a string
proxiedPerson.age = 'jefrydco'
// Uncaught Error: age must be a number
```

Ada masih banyak _handler_ proxy, silahkan teman-teman baca lebih lanjut di [Mozilla Developer Network: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

### Reflect

Ketika saya mengetahui API JavaScript ini pertama kali, saya berpikir, "apa nih? Saya tidak pernah mendengarnya". Setelah menghabiskan beberapa waktu membaca dokumentasi [Mozilla Developer Network about Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect), **Reflect berarti kemampuan untuk melihat dan mengubah sifat dari sebuah objek**.

Dari definisi tersebut, kita dapat mengatakan bahwa Reflect kombinasi yang cocok dengan [API Proxy](#proxy). Kita membutuhkan API untuk mengubah sifat dan untuk membuatnya lebih mudah, kita dapat menggunakan API Reflect.

Reflect bukanlah konstruktor sehingga ia tidak dapat diinisiasi menggunakan kata kunci `new`. Ia hanya menyediakan beberapa fungsi statis untuk melakukan hal-hal '_reflecting_'.

Mari kita mempelajari lebih dalam kemampuan Reflect dengan kembali ke contoh objek kita sebelumnya:

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}
```

Bagaimana kita mengakses nilai dari properti `name` dan `age`? Kita bisa menggunakan notasi titik dan notasi array seperti berikut:

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
person.name
// 'jefrydco'
person['name']
// 'jefrydco'
```

#### `Reflect.get()`

Keduanya bekerja dengan baik. Kita juga dapat melakukannya menggunakan `Reflect.get()`:

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
Reflect.get(person, 'name')
// 'jefrydco'
```

Fungsi `Reflect.get()` menerima 3 parameter:

- `target`: objek asli yang ingin kita ubah sifatnya
- `key`: nama properti yang ingin kita ubah
- `receiver`: objek yang diproxy (opsional)

Fungsi tersebut mengembalikan nilai yang diakses.

##### `Reflect.set()`

Selain itu, kita juga dapat mengubah nilai properti menggunakan `Reflect.set()`:

```typescript{}[] twoslash
declare const person: {
    name: string;
    age: number;
}
/// ---cut---
Reflect.set(person, 'name', 'jefry')
// true
```

Fungsi `Reflect.set()` menerima 4 parameter:

- `target`: objek asli yang ingin kita ubah sifatnya
- `key`: nama properti yang ingin kita ubah
- `value`: nilai baru yang akan diubah
- `receiver`: objek yang diproxy (opsional)

Fungsi tersebut mengembalikan `true` jika proses pengubahan nilai berhasil dan `false` jika gagal.

Jika kita melihat secara sekilas, parameter `Reflect.get()` dan `Reflect.set()` sama seperti fungsi `get` dan `set` pada properti _handler_ `Proxy`. Karena memang demikian. **Sebagian besar properti pada _handler_ `Proxy` memiliki API/fungsi yang sama seperti pada di `Reflect`**. Oleh karena itu kita dapat mengatakan `Proxy` dan `Reflect` adalah kombinasi yang tepat.

Ada masih banyak fungsi statis pada `Reflect`, silahkan teman-teman membaca lebih lanjut pada [Mozilla Developer Network: Reflect - Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods).

### Map

Tipe data `Map` menyimpan pasangan data berbentuk _key-value_. Dan jika teman-teman telah bekerja dengan JavaScript dalam beberapa waktu, mungkin teman-teman menyadari bahwa objek JavaScript biasa juga pasangan _key-value_. Lalu mengapa mengenalkan tipe data `Map` daripada menggunakan objek JavaScript biasa?

Tipe data `Map` memiliki beberapa keuntungan daripada objek JavaScript biasa. Mari kita lihat beberapa perbedaannya:

#### Properti yang Diwariskan

##### Objek JavaScript Biasa

Kapanpun kita membuat objek JavaScript biasa, objek tersebut juga mewariskan properti bawaan dari konstruktor `Objek`.

```typescript{}[] twoslash
declare const person: {
  name: string,
  age: number
}
/// ---cut---
Reflect.get(person, 'toString')
// ƒ toString() { [native code] }
```

Kita dapat menggunakan fungsi `Reflect.get()` untuk mendapatkan nilainya. Properti-properti tersebut dapat membuat perilaku yang tidak diinginkan pada beberapa kasus. Properti bawaan tersebut dapat tertimpa secara tidak sengaja oleh kita. Fungsi `toString` merupakan salah satunya yang berfungsi untuk mengonversi objek menjadi tipe data string.

```typescript{}[]
const person = {
  toString: '',
  age: 23
}
person.toString()
// Uncaught TypeError: person.toString is not a function
```

Jika secara tidak sengaja kita mendeklarasikan properti yang bernama sama seperti `toString`, kita akan menimpa properti bawaannya. Sehingga ketika kita memanggil fungsi tersebut, kode kita akan melemparkan galat.

Kita juga dapat menghapus properti bawaan menggunakan cara berikut:

```typescript{1}[] twoslash
const persons = Object.create(null)

Reflect.set(persons, 'name', 'jefrydco')
Reflect.set(persons, 'age', 23)

Reflect.get(persons, 'toString')
// undefined
```

Dengan menggunakan fungsi `Object.create()` dan melewatkan `null` sebagai parameter, kita dapat menghilangkan properti bawaan tersebut. Ketika kita mengaksesnya, ia akan mengembalikan nilai `undefined`.

##### Map

Objek yang disimpan di dalam tipe data map hanya berisi apa yang secara jelas diletakkan di dalamnya. Tipe data map juga menyediakan fungsi yang mudah untuk mengakses dan menyimpan properti menggunakan fungsi `get` dan `set`.

```typescript{}[] twoslash
const person = new Map()

person.set('name', 'jefrydco')
person.set('age', 23)

person.get('name')
// 'jefrydco'
person.get('age')
// 23
```

#### Jenis-jenis _Key_

##### Objek JavaScript Biasa

_Key_ untuk objek JavaScript biasa terbatas berupa tipe data `string` atau `Symbol`.

```typescript{}[] twoslash
const symbolForAge = Symbol.for('age')
const person = {
  name: 'jefrydco', // `string` key
  [symbolForAge]: 23 // `Symbol` key
}
Reflect.get(person, 'name')
// 'jefrydco'
Reflect.get(person, symbolForAge)
// 23
```

Tipe data [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) merupakan tipe data primitif JavaScript yang baru. Secara singkat, tipe data ini pada umumnya **digunakan untuk mencegah tabrakan antar _key_ karena nilainya selalu unik**.

```typescript{}[] twoslash
Symbol() === Symbol()
// false
Symbol.for('age') === Symbol.for('age')
// false
```

##### Map

Kita dapat menggunakan tipe data apapun yang tersedia di JavaScript sebagai kunci. Seperti `Function`, `Object`, `Array`, tipe data `Map` yang lain, dan lain-lain. Atau kita juga dapat menggunakan tipe data primitif seperti `string`, `number`, `float`, dan lain-lain.

```typescript{}[]
function main() {}
const object = {}
const array = []
const map = new Map()

const person = new Map()

person.set(main, 'Entrypoint for all function invocation')
person.set(object, 0)
person.set(array, {})
person.set(map, new Map())

person.get(main)
// 'Entrypoint for all function invocation'
person.get(object)
// 0
person.get(array)
// {}
person.get(map)
// Map(0) {}
```

Kita dapat mengisi nilainya dengan tipe data apun juga. Pada contoh tersebut, kita menggunakan `Function`, `Object`, `Array` dan `Map` sebagai _key_. Dan sebagai nilainya, kita menggunakan `string`, `number`, `Object` kosong dan `Map`.

#### Ukuran

Ukuran berarti banyaknya item yang disimpan di dalam objek atau map.

##### Objek JavaScript Biasa

Pada objek JavaScript biasa, kita harus menentukan secara manual berapa banyak data yang disimpan. Untungnya, JavaScript modern telah menyediakan fungsi yang cukup baik untuknya.

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}

const keys = Object.keys(person)
keys
// ['name', 'age']
keys.length
// 2
```

Kita dapat menggunakan fungsi `Object.keys()`, fungsi tersebut akan mengembalikan sebuah `array` yang berisi semua _key_ yang dimiliki oleh objek kecuali yang diwariskan. Karena berupa `array`, kita dapat dengan mudah mengakses properti `length` untuk menentukan berapa banyak item yang dimiliki oleh objek tersebut.

##### Map

Tipe data `Map` menyediakan fungsionalitas bawaan untuk menentukan berapa banyak data yang ia miliki. Properti tersebut bernama `size`.

```typescript{}[] twoslash
const person = new Map()

person.set('name', 'jefrydco')
person.set('age', 23)

person.size
// 2
```

---

Masih banyak perbedaan lainnya selain perbedaan di atas, jika teman-teman ingin mempelajari lebih lanjut, silahkan membacanya di [Mozilla Developer Network: Map - Objects vs. Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps).

### WeakMap

Tipe data `WeakMap` mirip dengan tipe data `Map`. Fungsinya untuk menyimpan data berupa pasangan _key-value_. Tetapi ia memiliki beberapa perbedaan:

#### _Key_ tidak Bisa Berupa Tipe Data Primitif

_Key_ tidak bisa berupa tipe data primitif (`string`, `number`, `float`, `boolean`, dan lain-lain), _Key_ harus berupa tipe data yang kompleks (`Function`, `Object`, `Array`, `WeakMap` lainnya, dan lain-lain).

```typescript{}[] twoslash
const object = {}

const person = new WeakMap()
person.set(object, 'An empty object')

person.get(object)
// 'An empty object'
```

Jika kita mencoba menggunakan tipe data primitif sebagai _key_, kode kita akan melemparkan galat:

```typescript{}[]
const person = new WeakMap()
person.set('', 'An empty string key')
// Uncaught TypeError: Invalid value used as weak map key
```

Teman-teman mungkin bertanya-tanya, mengapa _key_ haruslah berupa tipe data yang kompleks? Tunggu sebentar, kita akan membahasnya sesaat lagi.

##### Tidak dapat Melakukan Perulangan pada Item

Kita tidak dapat melakukan perulangan pada item, **Dapat diiterasi berarti mengiterasi nilai sebuah objek yang memang dapat diiterasi**. Beberapa tipe data yang dapat diiterasi pada JavaScript diantaranya `Map`, `Set`, `Array` dan `string`.

```typescript{}[]
const person = new WeakMap()
person.set(object, 'An empty object')

for (let property of person) {
  console.log(property)
}
// Uncaught TypeError: person is not iterable
```

Karena alasan ini, teman-teman mungkin bertanya-tanya juga, mengapa `WeakMap` tidak dapat diiterasi? Tunggu sebentar juga, kita akan membahasnya sesaat lagi.

---

Jadi, mengapa `WeakMap` _key_ tidak bisa berupa tipe data primitif dan datanya tidak dapat diiterasi?

Mari kita lihat definisi `WeakMap` dari [Mozilla Developer Network: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

> The `WeakMap` object is a collection of key/value pairs in which **the keys are weakly referenced**.

atau jika diterjemahkan dalam bahasa Indonesia kurang lebih:

> Objek `WeakMap` merupakan koleksi data berupa pasangan _key_/nilai yang mana **_key_-nya tereferensi secara lemah**.

Jadi apa artinya _key_-nya tereferensi secara lemah? Untuk menjawab pertanyaan tersebut, mari kita lihat contoh berikut:

```typescript{6}[]
let object = {}
const person = new WeakMap()
person.set(object, 'An empty object')

person
// WeakMap {{...} => 'An empty object'}

object = undefined
// Need to trigger the garbage collection process,
// take a look at the video below how to do that.
person
// WeakMap {}
```

Kita memiliki sebuah objek sebagai kunci untuk sebuah string. Ketika kita mendapatkan string tersebut menggunakan fungsi `person.get()`, ia akan mengembalikan string yang dimaksud. Tetapi ketika kita mereferensikan objek menjadi `undefined`, sewaktu-waktu Garbage Collector akan menghapus objek tersebut.

<app-garbage-collector-twitter-embed></app-garbage-collector-twitter-embed>

Garbage Collector pada JavaScript memiliki tugas untuk menghapus objek yang tidak digunakan dimanapun untuk membebaskan memori. Proses tersebut dijalankan secara otomatis, biasanya ketika CPU diam.

<app-video src="/videos/content/2021/04/create-reactivity-sistem-vue-3-javascript/weakmap-garbage-collection.webm"></app-video>

Ketika kita mengatur nilai objek menjadi `undefined`, Garbage Collector JavaScript akan menghapus objek yang tidak tereferensi tersebut. Untungnya, Chrome memiliki fitur untuk menjalankan proses Garbage Collector. Kita harus membuka Devtools, kemudian buka tab Performance. Akan ada tombol dengan ikon sampah, jika kita mengarahkan kursor padanya, ia akan menampilkan label "Collect Garbage".

Setelah kita mengklik tombol tersebut, cetak objek `person`, hasilnya akan menampilkan `WeakMap` kosong. Oleh karena itu **`WeakMap` disebut tereferensi secara lemah karena ketika objek dihapus, nilainya juga dihapus**. Dampak dari tereferensi secara lemah tersebut adalah **kita tidak dapat mengiterasi _key_ maupun nilainya**, karena kita benar-benar tidak mengetahui kapan objek tersebut dihapus dari memori.

### Set

Tipe data `Set` **mirip dengan tipe data `Array`, tetapi item yang tersimpan haruslah unik**. Mari kita lihat bagaimana kita berinteraksi dengan `Set`:

```typescript{}[] twoslash
const set = new Set()

set.add('First item')
set.add(2)

set
// Set(2) {"First item", 2}
```

Kita dapat menambahkan apapun ke `Set`, tetapi kita harus memperhatikan jika kita berurusan dengan item berupa objek. Konsep `Set` adalah menyimpan item yang unik, dan terkadang 2 objek dengan properti yang sama dapat dimasukkan ke dalam set.

```typescript{}[] twoslash
const set = new Set()

set.add({ name: 'jefrydco' })
set.add({ name: 'jefrydco' })

set
// Set(2) {{…}, {…}}
```

Walaupun objek `{ name: 'jefrydco' }` nampak serupa, **keduanya mengarah ke alamat yang berbeda di memori**. Itulah mengapa `Set` dapat memasukkan data tersebut. Jadi bagaimana untuk meyakinkan objek yang kita masukkan ke dalam set unik? Kita harus mereferensikannya pada variabel.

```typescript{}[] twoslash
const set = new Set()
const person = { name: 'jefrydco' }

set.add(person)
set.add(person)

set
// Set(1) {{…}}
```

Kita memanggil fungsi `add()` dua kali dengan argumen yang sama dan kode tersebut hanya memasukkan objek sekali. Karena variabel `person` yang pertama dan kedua mereferensi pada objek yang sama.

## Istilah-istilah

Keren!!! Sekarang kita telah mengenal beberapa API JavaScript yang mendukung sistem reaktivitas Vue 3. Sebelum membahas sistem reaktivitasnya, kita harus mengenal beberapa istilah yang pada umumnya kita gunakan untuk menjelaskan sistem reaktivitas. Mari kita mengenalnya.

### State

**State adalah objek umum yang merepresentasikan sesuatu**. Mari kita kembali ke contoh sebelumnya:

```typescript{}[] twoslash
const person = {
  name: 'jefrydco',
  age: 23
}
```

Kita dapat mengatakan bahwa objek `person` adalah state karena ia merepresentasikan manusia di kehidupan nyata. State dapat merepresentasikan apapun tidak hanya sesuatu di dunia nyata. Sebagai contoh, jika kita pernah bermain gim, pasti gim tersebut memiliki banyak state. Seberapa banyak proses, uang atau XP yang kita miliki atau di level mana sekarang kita berada. Kita dapat menyimpan hal tersebut di dalam state.

### Reactive State

**Reactive state adalah state lainnya yang melakukan sesuatu jika nilai propertinya berubah**. Mari kita lihat contoh sebelumnya dan membuatnya menjadi reactive state menggunakan `Proxy`:

```typescript{3}[]
const reactivePerson = new Proxy(person, {
  set(target, key, value) {
    console.log(`Do something here when "${key}" property change`)
    target[key] = value
    return value
  }
})
reactivePerson.name = 'jefry'
// 'Do something here when "name" property change'
// 'jefry'
```

Kita dapat mengatakan bahwa `reactivePerson` adalah sebuah reactive state karena ketika kita menguba, katakanlah properti `name`, ia akan mencetak sesuatu pada konsol. Kita dapat melakukan apapun sesuai keinginan kita, tidak harus mencetak sesuatu. Kita dapat memanggil fungsi lainnya, mengubah state lain, me-_render_ sesuatu di layar, dan masih banyak lagi. Kemungkinannya tak terbatas.

### _Dependencies_

Apa yang dapat kita lakukan di dalam fungsi _handler_ `set` di atas, apapun bukan? **_Dependencies_ adalah sebuah fungsi yang harus dipanggil ketika perubahan nilai berubah**. Mari kita lihat pada ocntoh sebelumnya:

```typescript{10-14}[]
function printInfoForName() {
  console.log(`Do something here when "name" property change`)
}
function printInfoForAge() {
  console.log(`Do awesome thing when "age" property change`)
}

const reactivePerson = new Proxy(person, {
  set(target, key, value) {
    if (key === 'name') {
      printInfoForName()
    } else if (key === 'age') {
      printInfoForAge()
    }
    target[key] = value
    return value
  }
})
reactivePerson.name = 'jefry'
// 'Do something here when "name" property change'
// 'jefry'
reactivePerson.age = 22
// 'Do awesome thing when "age" property change'
// 22
```

Kita mendeklarasikan 2 fungsi, `printInfoForName` dan `printInfoForAge`. Kita dapat mengatakan `printInfoForName` adalah dependensi untuk properti `name`. Dan `printInfoForAge` adalah dependensi untuk `age`.

### Tracker

**_Tracker_ adalah sebuah fungsi untuk menyimpan _dependencies_**. Akan sangat melelahkan jika semua fungsi _dependency_ ditulis manual. Biasanya, **fungsi _dependency_ ditulis sebagai fungsi anonymous**. Fungsi _anonymous_ adalah fungsi tanpa nama.

```typescript{}[] twoslash
function namedFunction () {
  // Named Function Content
}
const anonymousFunction = () => {
  // Anonymous Function Content
}
```

Mengapa kita harus menggunakan sebuah _tracker_ sebagai gantinya fungsi _dependency_ secara langsung? Karena proses pemanggilannya dapat ditunda nantinya. Kita **_track_ _dependency_ ketika properti diakses atau direferensi**. Kemudian kita eksekusi semua fungsi _dependency_-nya ketika terjadi perubahan nilai.

Kita dapat menggunakan `Object`, `Array`, `WeakMap`, `Map`, `Set` untuk menyimpan semua fungsi _dependency_. Seharusnya ada satu solusi yang cocok dengan kebutuhan kita. Tunggu sebentar, kita akan membahasnya nanti.

### Trigger

**Trigger adalah fungsi yang bertugas untuk mengeksekusi semua _dependencies_ yang tersimpan**. Untuk mendapatkan pemahaman yang lebih baik bagaimana Tracker dan Trigger bekerja, mari kita lihat pada contoh kode berikut:

```typescript{11,15}[]
function tracker(target, key) {
  // Store all dependencies
}

function trigger(target, key) {
  // Execute all dependencies
}

const reactivePerson = new Proxy(person, {
  get(target, key) {
    tracker(target, key)
    return target[key]
  },
  set(target, key, value) {
    trigger(target, key)
    target[key] = value
    return value
  }
})
```

`tracker` diletakkan di dalam _handler_ `get`, seperti yang kita sebutkan pada penjelasan sebelumnya bahwa kita **track _dependency_ ketika properti diakses atau direferensikan**. Dan _handler_ `get` juga akan dieksekusi ketika properti diakses atau direferensikan.

`trigger` diletakkan di dalam _handler_ `set`, jadi **kapanpun nilai properti berubah, kita akan men-_trigger_ atau mengekesekusi fungsi _dependency_**.

### Effect

Ada 2 hal yang harus kita pahami ketika kita membicarakan fungsi, fungsi _pure_ dan fungsi _impure_.

#### Pure Function

_Pure function_ adalah **fungsi yang menerima masukkan dan mengembalikan keluaran tanpa memodifikasi data diluar ruang lingkupnya**.

```typescript{}[]
function sum(number1, number2) {
  return number1 + number2
}

sum(4, 5)
// 9
```

Fungsi `sum` pada contoh di atas adalah _pure function_ karena ia menerima 2 argumen dan mengembalikan sebuah nilai. Fungsi tersebut juga tidak mengakses maupun memodifikasi data diluar ruang lingkupnya. Sehingga kita dapat mengambil kesimpulan bahwa _pure function_ memiliki 2 karakteristik:

- Masukkan yang sama selalu mengembalikan nilai keluaran yang sama
- Tidak memodifikasi data diluar ruang lingkupnya

#### Impure Function

_Impure function_ adalah **fungsi yang memodifikasi data diluar ruang lingkupnya**.

```typescript{}[]
const person = {
  name: 'jefrydco',
  age: 23
}

function changeName(name) {
  person.name = name
}

changeName('jefry')
```

Fungsi `changeName` adalah contoh _impure function_ karena ia mengubah properti `name` yang terletak di luar ruang lingkupnya.

---

Kita telah memahami mengenai _pure_ dan _impure function_, lalu apa effect kalau begitu? **Effect adalah fungsi yang melakukan _side effect_, _side effect_ adalah memodifikasi data di luar ruang lingkupnya**. Jadi secara teknis, **effect adalah _impure function_**.

### Watch

**Watch adalah fungsi yang "touch" properti dan mengeksekusi effect**. _Touch_ berarti secara disengaja mengakses properti tersebut untuk menyimpan _dependencies_.

```typescript{2}[]
function watch(target, key, effect) {
  const value = target[key]
  effect(value)
}
```

Pada contoh di atas, kita "touch" properti dengan cara mereferensikannya pada sebuah variabel bernama `value`.

## Sistem Reaktivitas

Sekarang kita telah memiliki pemahaman yang cukup dari sisi teknologi dan istilah. Mari kita memahami lebih jauh pada sistem reaktivitasnya sendiri. Jadi apa itu sistem reaktivitas? Untuk menjawab hal tersebut, silahkan teman-teman melihat pada animasi di bawah ini:

<app-video src="/videos/content/2021/04/create-reactivity-sistem-vue-3-javascript/reactivity-spreadsheet.webm"></app-video>

Pertama-tama, kita memasukkan angka 1 dan 2, hasilnya terkalkulasi secara otomatis. Jika kita ubah ke angka 2 dan 2, hasilnya juga akan terkalkulasi secara otomatis. Mekanisme itulah yang disebut sistem reaktivitas. Kita dapat mengatakan bahwa **sistem reaktivitas adalah sistem yang bereaksi terhadap perubahan secara otomatis**.

Kita tidak akan membahas hal tersebut terlalu detail pada Vue. Tetapi jika teman-teman ingin mengetahui lebih lanjut, silahkan teman-teman membaca pada [Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana - Bagian 1](/blog/create-reactivity-system-vuejs-javascript-part-1/#sistem-reaktivitas-vuejs) atau bahkan [Vue.js 3: Reactivity in Depth](https://v3.vuejs.org/guide/reactivity.html). Jadi mari kita mulai menulis sistem reaktivitas sederhana kita sendiri.

### Membuat Fungsi Reactive

Mari mulai dari dasar, coba lihat potongan kode berikut:

```typescript{}[]
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  })
}
```

Kita membuat sebuah fungsi bernama `reactive`. Fungsi tersebut mengembalikan _instance_ `Proxy` yang memiliki _handler_ `get` dan `set`. Di dalam _getter_, kita memanggil fungsi yang belum dideklarasikan bernama `track` dan di dalam _settter_, ktia juga memanggil fungsi yang belum dideklarasikan bernama `trigger`. Cukup mudah bukan? Kode tersebut sama seperti yang telah kita bahas pada [bagian persyaratan](#proxy).

Fungsi reactive kita di atas hanya bekerja untuk `Object` berstruktur linear. Ia tidak akan bekerja jika memiliki `Object` atau `Array` bersarang.

```typescript{}[]
// Working
const person = {
  name: 'jefrydco',
  age: 23
}

// Not working
const person = {
  name: {
    firstName: 'jefry',
    lastName: 'dewangga'
  },
  skills: ['web', 'vue']
}
```

Saya harap teman-teman sabar menunggu, kita akan membuatnya bekerja untuk `Object` dan `Array` bersarang nanti.

### Manajemen Dependencies

Kita membutuhkan struktur data untuk menyatukan semuanya. Beberapa bagian yang terhubung diantaranya:

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/target-key-dependencies.jpg" alt="Target Key Dependencies Diagram"></app-img>

- Target, adalah state yang akan kita ubah menjadi reactive state
- Key, properti dari state
- Dependencies, fungsi yang akan dijalankan jika nilai dari sebuah key berubah

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/weakmap-map-set.jpg" alt="WeakMap Map Set Diagram"></app-img>

Kita dapat menggunakan API JavaScript yang telah kita pelajari sebelumnya, Karena target merupakan `Object`, kita dapat menggunakan `WeakMap`. Dan sebagai nilainya adalah `Map`.

Key dari `Map` ini adalah properti target yang ingin kita track kemudian nilainya adalah sebuah `Set` yang berisi fungsi effect.

Silahkan teman-teman melihat contoh kode berikut untuk mendapatkan pemahaman yang lebih baik bagaimana setiap bagian berkorelasi.

```typescript{}[]
const person = {
  name: 'jefrydco',
  age: 23
}

const dep = new Set()
dep.add((value) => {
  console.log(`Value change into ${value}`)
})

const depsMap = new Map()
depsMap.set('name', dep)

const targetMap = new WeakMap()
targetMap.set(person, depsMap)
```

Kita membuat sebuah variabel baru bernama `dep` menggunakan tipe data `Set`, kemudian kita menambahkan fungsi anonymous yang mencetak informasi mengenai `value`.

Setelah itu, kita membuat variabel baru bernama `depsMap` menggunakan tipe data `Map`, kemudian kita atur itemnya menggunakan salah satu properti yang terdapat pada objek `person` yakni `name` sebagai key. Nilainya adalah variabel `dep` yang sebelumnya telah kita deklarasi.

Bagian terakhir adalah kita membuat variabel baru bernama `targetMap` menggunakan tipe data `WeakMap`, kemudian kita atur itemnya menggunakan objek `person` sebagai key. Nilainya adalah variabel `depsMap` yang telah kita deklarasikan sebelumnya.

### Membuat Fungsi Track

Jika teman-teman merasa kebingungan dengan diagram sebelumnya dan lebih suka belajar melalui kode. Mari kita menulis kodenya. Semua manajemen dependencies akan kita tulis di dalam fungsi `track`.

```typescript{5, 8}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  const dep = new Set()
  dep.add(activeEffect)

  const depsMap = new Map()
  depsMap.set(key, dep)

  targetMap.set(target, depsMap)
}
```

Pertama-tama, kita mendeklarasikan variabel bernama `targetMap` dan mereferensikan konstruktor `WeakMap`. Kita juga mendeklarasikan variabel lainnya bernama `activeEffect`, kita mereferensikannya ke `undefined`.

Variabel `targetMap` akan menjadi data struktur utama dari semua manajemen dependencies. Variabel `activeEffect` akan digunakan sebagai variabel sementara untuk menyimpan effect yang aktif sekarang.

Kode tersebut akan berjalan dengan baik jika `target` dan `key` bernilai baru. Variabel `dep` dan `depsMap` akan selalu mereferensikan pada objek baru. Kode tersebut tidak akan bekerja jika `target` dan `key` merupakan nilai yang telah kitagunakan sebelumnya. Kode tersebut akan selalu menimpa objek sebelumnya. Sehingga kita tidak akan bisa menyimpan sebanyak yang kita inginkan. Mari mengubahnya:

```typescript{5-9}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // Next code
}
```

Untuk menyelesaikan permasalahan tersebut, kita harus menambahkan kondisi. Kita memeriksa di dalam `targetmap` apakah telah tersedia `depsMap` sebelumnya atau belum. Jika belum kemudian kita dapat menginisialisasinya menggunakan `Map` baru dan menambahkannya ke dalam `targetMap`.

```typescript{7-11}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  // Previous code 

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // Next Code
}
```

Kita melakukan hal yang sama pada `depsMap`, kita memeriksa di dalam `depsMap` apakah telah tersedia `dep` sebelumnya atau belum. Jika belum, maka kita menginisialisasinya menggunakan `Set` baru dan menambahkannya ke dalam `depsMap`.

```typescript{7-9}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  // Previous code 

  if (!dep.has(activeEffect) && typeof activeEffect !== 'undefined') {
    dep.add(activeEffect)
  }

  // Next Code
}
```

Setelah itu, kita harus memeriksa juga apakah `dep` memiliki `activeEffect` yang sama seperti pada `activeEffect` atau belum. Jika belum maka kita dapat menambahkan effect tersebut. Kita juga perlu memeriksa apakah `activeEffect` sekarang bernilai `undefined` atau tidak karena pada awalnya kita mereferensikan variabel tersebut ke `undefined`, sehingga ada kemungkinan nilainya masih `undefined` ketika kode dijalankan.

```typescript{7}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  // Previous code 

  targetMap.set(target, depsMap)
}
```

Hal terakhir yang harus kita lakukan adalam memasukkan `depsMap` ke `targetMap` menggunakan `target` sebagai key. Fungsi track final akan seperti berikut:

```typescript{}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  if (!dep.has(activeEffect) && typeof activeEffect !== 'undefined') {
    dep.add(activeEffect)
  }

  targetMap.set(target, depsMap)
}
```

### Membuat Fungsi Watch

Fungsi watch akan "touch" properti dan mengeksekusi fungsi effect secara langsung. Jadi seharusnya cukup mudah bukan? Ya, tentu saja.

```typescript{}[]
function watch(target, key, effect) {
  activeEffect = effect
  const value = target[key]
  effect(value)
  activeEffect = undefined
}
```

Fungsi watch memiliki 3 parameter, `target`, `key` dan `effect`. Argumen `effect` dalam bentuk fungsi callback yang akan dieksekusi ketika nilai `key` berubah.

Kita tidak dapat melewatkan `target[key]` secara langsung ke dalam fungsi `effect` karena ia harus "touch" terlebih dahulu sebelum kita mengeksekusi `effect.`

Kita juga perlu mengatur `activeEffect` sementara dan mereferensikan kembali ke `undefined` setelah proses "touch" dan pemanggilan `effect` selesai.

### Reaktivitas Bersarang

Untuk membuat `Object` bersarang reaktiv, kita akan menggunakan metode rekursif. Secara umum, **rekursif adalah fungsi yang memanggil dirinya sendiri teruse menerus hingga sampai titik pemberhentiannya**. Titik pemberhentiannya adalah ketika fungsi tersebut berhenti memanggil dirinya sendiri. Mari kita lihat bentuk paling sederhana dari fungsi rekursif:

```typescript{2,4}[]
function printToZero(number) {
  if (number >= 0) {
    console.log(number)
    printToZero(number - 1)
  }
}
printToZero(3)
// 3
// 2
// 1
// 0
```

Baris yang dicetak tebal pertama adalah titik pemberhentiannya dan baris yang dicetak tebal kedua adalah kita memanggil fungsinya menggunakan variabel yang sama dikurangi satu.

Jadi bagaimana kita menerapkan fungsi rekursif pada fungsi `reactive` kita? Yang perlu kita lakukan hanyalah melakukan pengecekan jika nilainya berupa obje, maka kita mengembalikan fungsi `reactive` nya sendiri.

```typescript{12-14}[]
function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = target[key]

      track(target, key)

      if (isObject(value)) {
        return reactive(value)
      }

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  })
}
```

### Membuat Fungsi Track Array

Mari kita membuat kode kita bekerja untuk `Array`. Melacak perubahan di `Array` cukup berbeda dari `Object`, sehingga akan lebih baik jiak membuat fungsi baru untuk menanganinya.

Namun sebelum itu, mari kita melihat bagaimana kita biasanya berurusan dengan pengubahan item di `Array`:

```typescript{}[]
const person = []

person.push('jefry')
person.push('dewangga')
person
// ['jefry', 'dewangga']

person.unshift('jefrydco')
person
// ['jefrydco', 'jefry', 'dewangga']

person.pop()
// 'dewangga'
person
// ['jefrydco', 'jefry']

person.shift()
// 'jefrydco'
person
// ['jefry']

person.push('jefrydco')
person.push('dewangga')
person
// ['jefry', 'jefrydco', 'dewangga']
person.splice(1, 1)
// ['jefry', 'dewangga']
```

- `push`, memasukkan item di akhir array
- `unshift`, memasukkan item di awal array
- `pop`, menghapus item dari akhir array
- `shift`, menghapus item dari awal array
- `splice`, menghapus n item dari indeks tertentu

Ada masih banyak fungsi `Array`, kita akan fokus pada 4 fungsi tersebut. Tetapi jika teman-teman ingin mengetahuinya, silahkan teman-teman membaca lebih lanjut pada [Mozilla Developer Network: Array - Instance Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods).

Idenya adalah ketika fungsi tersebut dieksekusi, kita akan memanggil [fungsi trigger](#membuat-fungsi-trigger). Selain itu, kita juga harus memasikan fungsionalitas aslinya tetap sama. Jadi bagaimana kita akan melakukannya?

```typescript{2,6}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      // Do something with arrayMethod
    }
  })
}
```

Fungsi `trackArray` menerima 2 parameter, `target` dan `key`. Kita dapat mendapatkan nilai `Array` menggunakan notasi array. Setelah itu, kita dapat menggunakan nilai tersebut sebagai "target" untuk `Proxy` yang baru.

Jika `Object` memerlukan kita untuk memiliki _handler_ `get` dan `set`, pada `Array`, kita hanya memerlukan _handler_ `get`. Di dalam fungsi tersebut, kita dapat mendapatkan fungsi operasi `Array` yang saat ini dilakukan menggunakan notasi array.

```typescript{9-12}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          // Do something if arrayMethod is one of item in the array
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}
```

Kita harus memastikan `arrayMethod` bertipe fungsi. Di dalam pemeriksaan tersebut, kita juga melakukan pemeriksaan lainnya. Pemeriksaan bersarang ini untuk fungsi operasi `Array` yang ingin kita ubah fungsionalitasnya. Dalam hal ini, kita hanya mengubah fungsionalitas untuk fungsi operasi array paling umum yakni `push`, `unshift`, `pop`, `shift` dan `splice`.

Kita juga perlu melakukan `bind` `arrayMethod` yang tidak termasuk pada fungsi operasi array tersebut pada konteks `arrayTarget`.

```typescript{10-15}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          return function () {
            const result = Array.prototype[arrayKey].apply(
              arrayTarget,
              arguments
            )
          }
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}
```

Jika kedua kondisi bernilai benar, kita mengembalikan _named function_. Di dalam _named function_ tersebut, kita mengeksekusi fungsi operasi asli dari `Array` menggunakan konteks `arrayTarget`. Kita melakukannya dengan cara memanggil `apply` dari `Array.prototype[arrayKey]`. Setiap operasi fungsi array mengembalikan nilai yang berbeda, sehingga kita dapat mereferensikannya pada variabel bernama `result`.

Sebelum melanjutkan pembahasan, mari kita mempelajari secara singkat bagaimana `Array.prototype[arrayKey]` bekerja. Silahkan teman-teman melihat contoh kode berikut:

```typescript{3,7}[]
const array = []

array.push('jefrydco')
array
// ['jefrydco']

Array.prototype['push'].apply(array, ['jefry'])
array
// ['jefrydco', 'jefry']
```

Keduanya dapat menghasilkan hasil yang sama, tetapi yang kedua biasanya digunakan ketika **kita tidak memiliki akses terhadap parameter yang ingin dilewatkan**.

```typescript{}[]
const array = []

function push() {
  const result = Array.prototype['push'].apply(array, arguments)
  console.log(`Array index: ${result}`)
  return result
}

push('jefrydco')
// Array index: 1
// 1
```

**Studi kasus lain ketika kita ingin menambah fungsionalitas dari fungsi asli**, pada contoh di atas kita ingin mencetak indeks `Array` kapanpun kita memanggil fungsi `push`. Sehingga kita dapat menggunakan opsi kedua untuk memanggil fungsi operasi array aslinya, dan mereferensikan parameter fungsi bernama `push` melalui key JavaScript spesial bernama `arguments`.

```typescript{16}[]
function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          return function () {
            const result = Array.prototype[arrayKey].apply(
              arrayTarget,
              arguments
            )

            trigger(target, key, value)

            return result
          }
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}
```

Mari kita kembali ke topik. Setelah kita mendapatkan hasil dari operasi fungsi array. Kita perlu memanggil fungsi `trigger` menunjukkan bahwa terdapat perubahan pada array. Setelah itu, kita mengembalikan variabel `result`.

```typescript{12-14}[]
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = target[key]

      track(target, key)

      if (isObject(value)) {
        return reactive(value)
      }

      if (Array.isArray(value)) {
        return trackArray(target, key)
      }

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  })
}
```

Kemudian hal terkahir yang perlu kita lakukan adalah memanggil fungsi di dalam fungsi `reaktive` kita. Tetapi kita juga perlu melakukan pengecekan apakah nilai dari target berupa `Array` atau bukan menggunakan fungsi `Array.isArray()`.

### Membuat Fungsi Trigger

Fungsi trigger akan dipanggil ketika nilai properti berubah, jadi kita perlu meletakkanya di dalam _handler_ `set`. Kita juga perlu meletakkanya di dalam `trackArray` karena kita harus menambahkan fungsionalitas khusus untuk fungsi array. Mari kita lihat bagaimana fungsi trigger:

```typescript{}[]
function trigger(target, key, value) {
  const effects = targetMap.get(target).get(key)

  if (effects) {
    effects.forEach((effect) => {
      effect(value)
    })
  }
}
```

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/weakmap-map-set.jpg" alt="WeakMap Map Set Diagram"></app-img>

Teman-teman pasti ingat diagram tersebut bukan? Di dalam fungsi `trigger`, kita perlu mendapatkan `effect` yang tersimpan di dalam tipe data `Set`. Dan kita dapat melakukannya dengan cara memanggil fungsi `get` untuk setiap `WeakMap` dan `Map`.

Kita perlu memeriksa apakah nilainya ada atau tidak, jika ada, kita perlu mengiterasinya. Untungnya `Set` telah menyediakan fungsionalitas resmi untuk melakukan iterasi tersebut. Di dalam bagian iterasi tersebut, kita hanya perlu memanggil fungsi `effect`.

### Kode Reaktivitas Final

Mari kita gabungkan semuanya menjadi satu, berikut merupakan kode final untuk impelementasi sederhana sistem reaktivitas Vue 3. Kita dapat menjalankan kode berikut melalui konsol peramban secara langsung. Kita juga dapat mencobanya di [Simplified Vue 3 Reactivity System Demo](https://replit.com/@jefrydco/Simplified-Vue-3-Reactivity-System-Demo).

```typescript{}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = target[key]

      track(target, key)

      if (isObject(value)) {
        return reactive(value)
      }
      if (Array.isArray(value)) {
        return trackArray(target, key)
      }

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)

      return Reflect.set(target, key, value, receiver)
    }
  })
}

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  if (!dep.has(activeEffect) && typeof activeEffect !== 'undefined') {
    dep.add(activeEffect)
  }

  targetMap.set(target, depsMap)
}

function trackArray(target, key) {
  const value = target[key]

  return new Proxy(value, {
    get(arrayTarget, arrayKey) {
      const arrayMethod = arrayTarget[arrayKey]

      if (typeof arrayMethod === 'function') {
        if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
          return function () {
            const result = Array.prototype[arrayKey].apply(
              arrayTarget,
              arguments
            )

            trigger(target, key, value)

            return result
          }
        }
        return arrayMethod.bind(arrayTarget)
      }
      return arrayMethod
    }
  })
}

function trigger(target, key, value) {
  const effects = targetMap.get(target).get(key)
  
  if(effects) {
    effects.forEach((effect) => {
      effect(value)
    })
  }
}

function watch(target, key, effect) {
  activeEffect = effect
  const value = target[key]
  effect(value)
  activeEffect = undefined
}
```

### Penggunaan Sederhana

Kita telah menulis cukup banyak kode di atas, jadi bagaimana kita akan menggunakannya? Sederhana! Fungsi yang perlu kita perhatikan adalah `reactive` dan `watch`. Mari kita kembali ke contoh objek `person`.

Kita dapat menggunakan contoh yang sama seperti pada [Proxy Get Handler](#handler-get-proxy), kita ingin mencetak pesan "Hello &lt;value&gt;, nice to meet you!" ketika kita mengubah nilai properti `name`.

```typescript{}[] twoslash
declare const person: Record<string, unknown>
declare function reactive(target: Record<string, unknown>): Record<string, unknown>
declare function watch(target: Record<string, unknown>, key: string, effect: (value: string) => void): void
/// ---cut---
const state = reactive(person)
watch(state, 'name', (name) => {
  console.log(`Hello ${name}, nice to meet you!`)
})
// 'Hello jefrydco, nice to meet you!'

state.name = 'jefry'
// 'Hello jefry, nice to meet you!'
// 'jefry'
```

Dan ketika kita mengubah nilai properti `age`, kita akan mencetak tahun dimana orang tersebut lahir.

```typescript{}[] twoslash
declare const person: Record<string, unknown>
declare function reactive(target: Record<string, unknown>): Record<string, unknown>
declare function watch(target: Record<string, unknown>, key: string, effect: (value: number) => void): void
/// ---cut---
const state = reactive(person)
watch(state, 'age', (age) => {
  const year = new Date().getFullYear() - age
  console.log(`The person was born in ${year}`)
})
// 'The person was born in 1998'

state.name = 22
// 'The person was born in 1999'
// 22
```

### Penggunaan Kompleks

Dari kode pada [Kode Reaktivitas Final](#kode-reaktivitas-final), kita dapat membuat aplikasi yang lebih kompleks. Sebagai contohnya, kita akan membuat aplikasi "Hello World" yang umum untuk kerangka kerja JavaScript pada umumnya, yakni aplikasi Todo.

<app-reactivity-vue-3-complex-demo></app-reactivity-vue-3-complex-demo>

Kita juga dapat membuat aplikasi yang lebih kompleks lagi, silahkan teman-teman melihat aplikasi berikut, [Anime Search One](https://anime-search-one.vercel.app/). Berkas [reactivity.js](https://github.com/jefrydco/anime-search-one/blob/e84c743af9751c4746ca01b36ed943fd41a53b71/scripts/reactivity.js), kode sumbernya berasal dari [Kode Reaktivitas Final](#kode-reaktivitas-final) di atas dengan beberapa perbaikan.

### Lebih Lanjut

Terakhir, jika teman-teman ingin memahami lebih dalam lagi mengenai implementasi sistem reaktivitas pada Vue 3. Kode sumbernya terletak di repositori Vue 3 pada lokasi direktori berikut [/packages/reactivity/src](https://github.com/vuejs/vue-next/tree/master/packages/reactivity#readme).

---

Terima kasih, saya harap teman-teman menikmati artikel ini dan mempelajari sesuatu yang baru! Jika teman-teman memiliki pertanyaan, jangan sungkan-sungkan untuk mengirim pesan di [@jefrydco](https://twitter.com/jefrydco).

## Referensi

- [Mozilla Developer Network: Array - Instance Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)
- [Mozilla Developer Network: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Mozilla Developer Network: Reflect - Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods)
- [Mozilla Developer Network: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Mozilla Developer Network: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Mozilla Developer Network: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Vue.js 3: Reactivity in Depth](https://v3.vuejs.org/guide/reactivity.html)
