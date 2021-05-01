---
title: Create a Simplified Version of Vue 3 Reactivity System
description: Reveals the secret of the reactivity system of Vue 3 by recreating a simplified version.
summary: Vue 3 is already released at the end of last year. In this article, we will look into deeper the reactivity system used in Vue 3 and create a simplified version of it using the same technology.
img: /cover/2021/04/people-walking-on-pedestrian-by-andrew-teoh.jpg
imgCreator: theandrewteoh
postedDate: 2021-04-24T01:00:00.000Z
updatedDate: 2021-04-24T01:00:00.000Z
slug: create-reactivity-system-vue-3-javascript
---

<app-amp-notice :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vue-3-javascript' } }" label="Create a Simplified Version of Vue 3 Reactivity System"></app-amp-notice>


Vue 3 telah dirilis akhir tahun kemarin dengan membawa banyak perbaikan dan fitur yang keren. Pada artikel kali ini, kita akan mempelajari lebih dalam sistem reaktifitas yang digunakan di Vue 3 dan membuat versi sederhananya menggunakan teknologi yang sama.

Sebelum artikel kali ini, saya juga menulis tentang <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-1' } }">Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana - Bagian 1</app-locale-path-link> and <app-locale-path-link :to="{ name: 'blog-slug', params: { slug: 'create-reactivity-system-vuejs-javascript-part-2' } }">Membuat Sistem Reaktivitas Seperti Vue.js Versi Sederhana - Bagian 2</app-locale-path-link>. Jadi, pastikan teman-teman telah membaca artikel tersebut juga untuk mendapatkan pemahaman dasar yang lebih baik.

Cuplikan kode pada artikel ini juga ditulis menggunakan bahasa pemrograman TypeScript yang juga valid JavaScript. Jadi jika teman-teman ingin meng-_copy_, _past_ dan menjalankan kode tersebut di konsol peramban, harusnya kode tersebut dapat berjalan. Mengapa saya menulisnya pada bahasa pemrograman TypeScript? Alasannya adalah pada beberapa bagian cuplikan kode, kita dapat mengarahkan kursor di atas deklarasi tipe datanya juga.

## Daftar Isi

## Teknologi yang Digunakan

Untuk mengawali artikel ini, mari kita membicarakan teknologi yang digunakan. Sistem reaktivitas pada Vue 3 menggunakan beberapa API JavaScript modern, beberapa di antaranya adalah [Proxy](#proxy), [Reflect](#reflect), [WeakMap](#weakmap), [Map](#map) dan [Set](#set).

### Proxy

Jika teman-teman berasalah dari latar belakang IT, mungkin teman-teman sering mendengar istilah Proxy. Secara sederhana, **proxy berperan sebagai penghubung 2 hal ketika mereka berkomunikasi**. Proxy **dapat mengubah atau hanya melewatkan sifat aslinya**.

Katakanlah, ada 2 orang teman, rumah mereka berdekatan. Walaupun mereka dapat berkomunikasi secara lisan atau berteriak satu sama lain, hal tersebut sangat tidak nyaman bagi tetangga mereka. Oleh karena itu mereka memiliki sebuah walkie talkie untuk memfasilitasi komunikasinya.

Walkie talkie tersebut memiliki beberapa fitur selain fitur utamanya untuk berkomunikasi. Beberapa di antaranya adalah menaikkan dan menurunkan volume. Bahkan walkie talkie tersebut dapat melewatkan suara selayaknya kita berbicara secara langsung.

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

#### Proxy Get Handler

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

#### Proxy Set Handler

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

Sekarang, kapanpun kita mengubah nilai setiap properti, kode nya akan mencetak teks juga:

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

Tipe data `Map` memiliki beberapa keuntungan daripada objek JavaScript biasa. Mari kita lihat perbedaannya:

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

Kita dapat menggunakan fungsi `Reflect.get()` untuk mendapatkan nilainya. Properti-properti tersebut dapat membuat perilaku yang tidak diinginkan pada beberapa kasus. Properti bawaan tersebut dapat tertimpa secara tidak sengaja oelh kita. Fungsi `toString` merupakan salah satunya yang berfungsi untuk mengonversi objek menjadi tipe data string.

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

Tipe data `Map` menyediakan fungsionalitasi bawaan untuk menentukan berapa banyak data yang ia miliki. Properti tersebut bernama `size`.

```typescript{}[] twoslash
const person = new Map()

person.set('name', 'jefrydco')
person.set('age', 23)

person.size
// 2
```

---

Masih banyak perbedaan lainnya, jika teman-teman ingin mempelajari lebih lanjut, silahkan membacanya di [Mozilla Developer Network: Map - Objects vs. Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps).

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

We can add anything to `Set`, but we have to pay attention if we deal with an object item. The concept of `Set` is to store a unique item, and sometimes two similar objects with the same property can be inserted into the set.

Kita dapat menambahkan apapun ke `Set`, tetapi kita harus memperhatikan jika kita berurusan dengan item objek. Konsep `Set` adalah menyimpan item yang unik, dan terkadang 2 objek dengan properti yang sama dapat dimasukkan ke dalam set.

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

**Trigger is a function to execute all the stored dependencies**. To get a better understanding of how Tracker and Trigger works, let jump into the code:

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

`tracker` is placed inside the `get` handler, as we mentioned in the previous explanation that we **track the dependency when the property is accessed or referenced**. And the `get` handler itself is also executed when the property is accessed or referenced.

`trigger` is placed inside the `set` handler, so **whenever the property value change, we will trigger or execute the dependency functions** we already stored previously.

### Effect

There is 2 kind of thing we should understand when we talk about function, they are pure function and impure function.

#### Pure Function

A pure function is a **function that accepts input and returns output without modifying data outside its scoped**.

```typescript{}[]
function sum(number1, number2) {
  return number1 + number2
}

sum(4, 5)
// 9
```

The `sum` function is the example of a pure function because it accepts 2 arguments and returns a value. It also doesn't access nor modifies data outside its scope. We can draw a conclusion, a pure function has 2 characteristics:

- Same input always return the same output
- Doesn't modify data outside its scope

#### Impure Function

An impure function is a **function that modifies data outside its scoped**.

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

The `changeName` function is an example of an impure function because it changes the `name` property which is outside of its scope.

---

We already understand about pure and impure function, now what is effect then? **Effect is a function that does side effect, side effect is modifying data outside its scoped**. So technically, **effect is impure function**.

### Watch

**Watch is a function that "touch" the property and execute the effect**. Touch means intentionally accessed to store the dependencies.

```typescript{2}[]
function watch(target, key, effect) {
  const value = target[key]
  effect(value)
}
```

On that example above, we "touch" the property by reference it to a variable called `value`.

## Reactivity System

All right!!! Now we have a quite understanding of both technological and term perspective. Let's dive into the reactivity system itself. So what's a reactivity system? To answer that question, take a look at the animation below:

<app-video src="/videos/content/2021/04/create-reactivity-sistem-vue-3-javascript/reactivity-spreadsheet.webm"></app-video>

First, we enter 1 and 2, the result is calculated automatically. If we change to 2 and 2, the result is also calculated automatically. That's called a reactivity system. We can say that **the reactivity system is a system that reacts to change automatically**.

We won't explain too much detail about the reactivity system in Vue. But if you're curious, please read over here, [Create a Simplified Version of Vue.js Reactivity System - Part 1](/en/blog/create-reactivity-system-vuejs-javascript-part-1/#vuejs-reactivity-system) or even in [Vue.js 3: Reactivity in Depth](https://v3.vuejs.org/guide/reactivity.html). So let's just get started to write our simplified reactivity system.

### Create Reactive Function

Let's start from the basic, take a look at the following code:

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

We create a function called `reactive`. The function returns a `Proxy` instance that has `get` and `set` handler. Inside the getter, we put undeclared function yet called `track` and inside the setter, we put undeclared function yet called `trigger`. It's easy peasy right? Same as what we already talked about in the [prerequisites section](#proxy).

Our current reactive function above only works for linear `Object` structure. It won't work if it nested `Object` nor for `Array`.

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

Just hold on to whatever device you currently use to read this article, we will make it work for nested `Object` and `Array` later.

### Dependencies Management

We need some kind of structured data to glue everything together. The corresponding parts are:

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/target-key-dependencies.jpg" alt="Target Key Dependencies Diagram"></app-img>

- Target, is the state that we want to convert into a reactive state
- Key, the property of the state
- Dependencies, function that have to be run if the key's value change

<app-img src="/content/2021/04/create-reactivity-system-vue-3-javascript/weakmap-map-set.jpg" alt="WeakMap Map Set Diagram"></app-img>

We can use all the JavaScript API we already learned before. Since the target is in form of `Object`, we can use `WeakMap`. And the value is regular `Map`.

The key of this `Map` is the target's property we want to track then the value is a `Set` that will contain the effect function.

Take a look at the following code below to get a better idea of how they relate to each other.

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

We create a new `dep` variable using a `Set` data type, then we add an anonymous function that prints some info about the `value`.

After that, we create a new `depsMap` variable using a `Map` data type, then we set an item using one of the `person` property which is `name` as a key. The value is the `dep` variable we already declared previously.

The last part is, we create a new `targetMap` variable using a `WeakMap` data type, then we set an item using the `person` object as a key. The value is the `depsMap` variable we already declared previously.

### Create Track Function

If you feel overwhelmed with that diagram before and prefer to learn easily through the code. Let's code over it. All of the dependencies management things will be written inside the `track` function.

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

First, we declare a variable called `targetMap` and assign it to the `WeakMap` constructor. We also declare another variable called `activeEffect`, we assign it to `undefined`.

The `targetMap` will be the root data structure of our all dependencies management. The `activeEffect` will be used as a temporary variable to store the current active effect.

That code will run well if the `target` and the `key` are always new. The `dep` and `depsMap` variable will always refer to a new object. It won't work if the `target` and the `key` are using the one that already used. It will always overwrite the existing object. So we won't be able to store as much as we want. Let's refactor it:

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

To overcome it, we have to add a condition. We check inside `targetMap` whether already have existing `depsMap` or not. If not then we can initialize it using the new `Map` and add that into `targetMap`.

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

We do the same thing to `depsMap`, we check inside `depsMap` whether already have existing `dep` or not. If not then we can initialize it using the new `Set` and add that into `depsMap`.

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

After that, we have to check whether `dep` has the current `activeEffect` or not. If not then we add that effect. We also need to check whether the current `activeEffect` is `undefined` or not because initially we assign that variable into `undefined`, so there must be a possibility the value will be `undefined`.

```typescript{7}[]
const targetMap = new WeakMap()
let activeEffect = undefined

function track(target, key) {
  // Previous code 

  targetMap.set(target, depsMap)
}
```

The last thing we should do is insert the `depsMap` to `targetMap` using `target` as a key. The final track function would be:

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

### Create Watch Function

The watch function will "touch" the property and execute the effect right away. So it should be pretty simple, right? Yes, of course.

```typescript{}[]
function watch(target, key, effect) {
  activeEffect = effect
  const value = target[key]
  effect(value)
  activeEffect = undefined
}
```

Watch function will receive 3 parameters, `target`, `key` and `effect`. The `effect` argument is in form of the callback function that will be executed if `key`'s value change.

We can't pass the `target[key]` directly to the `effect` function because it has to be "touch" first before we execute the `effect`.

We also need to set the current `activeEffect` temporary and set it to `undefined` afterwards after the "touch" and `effect` invocation process is completed.

### Nested Reactive

To make nested `Object` reactive, we will use the recursive method. In essence, **recursive is a function that calls itself over and over again until reaching its termination point**. Termination point is when the function stop calls itself. Let's take a look at the simplest form of recursive function:

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

The first highlighted line is the termination point and the second highlighted line is we call the function itself using the same variable minus one.

So how we apply recursive function to our `reactive` function? Well, the only thing we need to do is check if the value is an object, then we simply return the `reactive` function itself.

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

### Create Track Array Function

Let's make it work with `Array`. Tracking change in `Array` is a little bit different from `Object`, so it's better to create a new function to handle it.

But before that, let's take a look at how we usually deal with item changing in `Array`:

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

- `push`, insert an item to the end of the array
- `unshift`, insert an item to the start of the array
- `pop`, remove the item from the end of the array
- `shift`, remove an item from the start of the array
- `splice`, remove n item at a certain index

There are still a lot more of the `Array` function, but we will focus on those 4 functions. But if you curious about them, please check it out on [Mozilla Developer Network: Array - Instance Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods).

The idea is when those functions are executed, we will invocate the [trigger function](#create-trigger-function). Besides that, we have to make sure that the original functionality of those functions are still persisted. So how will we gonna do it?

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

The `trackArray` function receives 2 arguments, `target` and `key`. We can get the `Array` value by using array notation. After that, we use that value as a "target" for the new `Proxy`.

If `Object` requires us to have both `get` and `set` handler, in `Array`, we only need the `get` handler. Inside that function, we can get which `Array` function operation currently perform by using array notation as well.

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

We have to make sure that `arrayMethod` is a function. Inside of that checking, we also add another checking. This nested checking is for which `Array` function operation we want to intercept the functionality. For this purpose, we only intercept the most common one `push`, `unshift`, `pop`, and `shift`.

We also need to `bind` the `arrayMethod` that doesn't fit with those array method to the `arrayTarget` context.

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

If both of the condition matches, we return a named function. Inside of that named function, we execute the original `Array` operation function using `arrayTarget` context. We do that by calling `apply` from `Array.prototype[arrayKey]`. Each of the array function operations returns a different thing, so we just assign that into a variable called `result`.

Before continue, let's have short explanation on how `Array.prototype[arrayKey]` works. Please have a look at the following example:

```typescript{3,7}[]
const array = []

array.push('jefrydco')
array
// ['jefrydco']

Array.prototype['push'].apply(array, ['jefry'])
array
// ['jefrydco', 'jefry']
```

Both of them can give the same result, but the latter one is usually used when **we don't have access to the argument we want to pass**.

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

**Another use case is when we enhance the original function**, on the example above we want to print the `Array` index whenever we call the `push` function. So we can use the second option to call the original array operation function, and reference the named function `push` argument by using JavaScript special key `arguments`.

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

Let's get back to the topic. After we get the array function operation result. We need to call the `trigger` function indicating that there is a change in the array. After that, we return the `result`.

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

Then the only last thing we need to do is call that function inside our `reactive` function. But we also need to check whether the target value is `Array` or not by using the `Array.isArray()` function.

### Create Trigger Function

The trigger function will be invoked when the property value is changed, so we need to put that inside the `set` handler. We also need to place it inside `trackArray` because we have to enhance the original functionality. Let's take a look at how trigger function will shape:

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

Remember that diagram right? Inside the `trigger` function, we need to get the `effect` that stored inside the `Set` data type. And we can do that by calling the `get` function for each `WeakMap` and `Map`.

We need to check whether it exists or not, if yes, we need to iterate that. Fortunately `Set` has provided us with a built-in function to do iteration. Inside that iteration block, we just simply call the `effect` function.

### Complete Reactivity Code

Let's glue all the things together, here's our complete code for the simplified implementation of the Vue 3 reactivity system. We can run the following code through the browser console directly. We can also try it directly in [Simplified Vue 3 Reactivity System Demo](https://replit.com/@jefrydco/Simplified-Vue-3-Reactivity-System-Demo).

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

### Simple Usage

We already have a bunch of code above, so how will we use it? It's simple. The only function we need to pay attention to is `reactive` and `watch`. Let's get back to our long live `person` object.

We can use the same example as in [Proxy Get Handler](#proxy-get-handler), we want to print "Hello &lt;value&gt;, nice to meet you!" if we change the `name` property value.

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

And when we change the `age` property value, print the year when the person was born.

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

### Complex Usage

From code on [Complete Reactivity Code](#complete-reactivity-code), we can create a more complex application. For instance, we create a "Hello World" app for a common JavaScript framework, which is Todo App.

<app-reactivity-vue-3-complex-demo></app-reactivity-vue-3-complex-demo>

We also can create even more complex application, take a look at the following app, [Anime Search One](https://anime-search-one.vercel.app/). The [reactivity.js](https://github.com/jefrydco/anime-search-one/blob/e84c743af9751c4746ca01b36ed943fd41a53b71/scripts/reactivity.js) source code is based on [Complete Reactivity Code](#complete-reactivity-code) above with some improvements.

### Further More

Last but not least, if you want to deep dive into even more about the reactivity system implementation in Vue 3. The source code is located on Vue 3 repository on the following directory path [/packages/reactivity/src](https://github.com/vuejs/vue-next/tree/master/packages/reactivity#readme).

---

Thank you, hope you enjoy reading it and learn something new! If you have any question, don't hesitate to drop me a tweet in [@jefrydco](https://twitter.com/jefrydco).

## Reference

- [Mozilla Developer Network: Array - Instance Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)
- [Mozilla Developer Network: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Mozilla Developer Network: Reflect - Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods)
- [Mozilla Developer Network: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Mozilla Developer Network: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Mozilla Developer Network: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Vue.js 3: Reactivity in Depth](https://v3.vuejs.org/guide/reactivity.html)
