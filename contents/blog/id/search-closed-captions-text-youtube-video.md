---
title: Bagaimana Jika Kita Dapat Mencari Kata Kunci Apapun dari Video YouTube Manapun Melalui Captionnya?
description: Cari kata kunci apa pun dari video YouTube mana pun melalui captionnya.
summary: Bayangkan ketika kita ingat suatu momen dari sebuah video YouTube tetapi lupa pada jam, menit atau detik keberapa momen tersebut berlangsung. Bagaimana jika kita dapat mencari kata kunci apapun dari video YouTube manapun menggunakan captionnya?
img: /blog/cover/2021/02/woman-in-black-off-shouldress-dress-by-ari-he.jpg
imgCreator: talescrow
postedDate: 2021-02-12T00:00:00.000Z
updatedDate: 2021-02-12T00:00:00.000Z
slug: search-closed-captions-text-youtube-video
---

<app-amp-notice :to="{ name: 'blog-slug', params: { slug: 'search-closed-captions-text-youtube-video' } }" label="Bagaimana Jika Kita Dapat Mencari Kata Kunci Apapun dari Video YouTube Manapun Melalui Captionnya?"></app-amp-notice>

Lompat ke [artikel utama](#daftar-isi).

<app-search-youtube-closed-captions-demo></app-search-youtube-closed-captions-demo>

## Rangkuman

Tahun lalu saya mendapatkan ide untuk membuat suatu aplikasi web yang dapat mencari kata kunci dari perkataan orang di video YouTube. Ide tersebut muncul ketika saya sedang menonton web.dev Live. Aplikasi web tersebut tidak menggunakan teknologi yang canggih dan terkini, hanya melakukan pencarian dari _caption_-nya.

Ketika kita mengaktifkan fitur _caption_ pada YouTube, halaman YouTube akan melakukan _request_ data dari API. Responnya berupa objek JSON yang dapat kita ubah menjadi format lain, seperti WebVTT. Sayangnya, API tersebut dilengkapi dengan beberapa parameter yang memiliki identitas unik dan waktu kadaluarsa.

Karena hal tersebut, kita tidak bisa mengakses pranala API tersebut dengan sering. Untungnya, setiap video YouTube memiliki identitas unik di pranala nya. Tidak hanya pada halaman YouTube biasa, tetapi juga pada versi _embedded_-nya. Kita dapat menggunakan puppeteer untuk mengakses halaman _embedded_ dan meng-_intercept_ _request_-nya untuk mendapatkan pranala API _caption_ tersebut.

Kemudian kita dapat memproses data _caption_ menggunakan beberapa paket NPM bersumber terbuka dan mengubahnya menjadi REST API kita sendiri. API ini hanya membutuhkan pranala video YouTube dan sebuah kata kunci. Kita juga menggunakan Vercel sebagai tempat _hosting_ layanan API yang gratis.

Teman-teman dapat mempelajari lebih lanjut dokumentasi API-nya pada [API Cari Teks Video](https://github.com/jefrydco/cari-teks-video-api/blob/main/readme-id.md#readme) dan daftar proyek-proyek keren yang telah menggunakan API ini pada [Awesome Cari Teks Video](https://awesome-cari-teks-video.netlify.app/). Teman-teman juga dapat membaca artikel ini lebih lanjut untuk mempelajari bagaimana implementasinya.

## Daftar Isi

## Awal Mula

Pada tanggal 30 Juni sampai 2 Juli 2020 tahun kemarin, tim Chrome Developer Advocate mengadapak acara yang sangat spektakuler untuk pengembang web. Acara tersebut bernama [web.dev Live](https://web.dev/live/).

Saya sedang melihat acara tersebut hingga suatu saat salah satu Chrome Developer Advocate, [Sam Dutton](https://twitter.com/sw12) membagikan sebuah pranala di kotak _chat_. Saya klik pranala tersebut dan ternyata link tersebut berisi aplikasi untuk mencari, menjelajahi _caption_ dari video acara web.dev Live.

Aplikasi tersebut bernama [Search web.dev LIVE](https://samdutton.github.io/wdl/). Awalnya saya terkesima karena kita dapat mencari sesuatu dari sebuah video walaupun hanya melalui _caption_-nya. Saya melihat [pranala GitHub](https://github.com/samdutton/wdl) pada bagian _footer_ untuk melihat teknologi dibalik aplikasi web tersebut.

Ternyata aplikasi web tersebut tidak menggunakan teknologi yang benar-benar terkini. Tidak juga menggunakan kecerdasan buatan atau algoritma yang kompleks. Hanya JavaScript sederhana, beberapa paket NPM dan berkas _caption_. Hal yang sangat menarik bagi saya.

Saya rasa kekurangan dari Search web.dev Live adalah ia **hanya dapat mencari dari video acara web.dev Live**. Omong-omong, video acara web.dev Live ditayangkan di YouTube. Dan berkas _caption_-nya disimpan di repositori GitHubnya sendiri.

"Bagaimana jika kita dapat melakukan pencarian tersebut, tetapi untuk semua video di YouTube", pikir saya. Berdasarkan asumsi saya, algoritmanya mungkin seperti berikut:

- JavaScript mengambil kata kunci dari _input_.
- Cari kata kunci tersebut dari semua berkas _caption_ yang ada.
- Soroti hasil pencariannya.

Sebenarnya mudah bukan? Dan ternyata tidak membutuhkan waktu lama hingga saya menemukan bahwa **kita dapat mendapatkan _caption_ YouTube dari sebuah pranala tertentu**.

Pertama-tama, kita harus membuka sebuah video YouTube kemudian mengaktifkan fitur _caption_-nya.

<app-img src="/blog/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-activate-by-jefrydco.jpg" alt="Aktivasi Xaption YouTube"></app-img>

Setelah itu, YouTube akan mengakses sebuah API. Respon dari API tersebut adalah _caption_ dari video yang kita tonton.

<app-img src="/blog/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-devtools-json3-by-jefrydco.jpg" alt="Alat Pengembang Peramban Menampilkan Respon Caption YouTube"></app-img>

Berikut contoh pranala API-nya:

```typescript{}[]
const ccUrl = 'https://www.youtube.com/api/timedtext?v=CWu29PRCUvQ&asr_langs=de%2Cen%2Ces%2Cfr%2Cit%2Cja%2Cko%2Cnl%2Cpt%2Cru&caps=asr&exp=xftt&xorp=true&xoaf=5&hl=en&ip=0.0.0.0&ipbits=0&expire=1612625982&sparams=ip%2Cipbits%2Cexpire%2Cv%2Casr_langs%2Ccaps%2Cexp%2Cxorp%2Cxoaf&signature=CC705091625358E3A3883C981A21BFC4F6E35569.77DAB826C17A839CEE703DB894D73D8AECCA0AE2&key=yt8&lang=en-GB&fmt=json3&xorb=2&xobt=3&xovt=3'
```

Mari kita cermati parameter kueri yang terdapat pada pranala tersebut:

```json
{
  "v": "CWu29PRCUvQ",
  "asr_langs": "de,en,es,fr,it,ja,ko,nl,pt,ru",
  "caps": "asr",
  "exp": "xftt",
  "xorp": "true",
  "xoaf": "5",
  "hl": "en",
  "ip": "0.0.0.0",
  "ipbits": "0",
  "expire": "1612625982",
  "sparams": "ip,ipbits,expire,v,asr_langs,caps,exp,xorp,xoaf",
  "signature": "CC705091625358E3A3883C981A21BFC4F6E35569.77DAB826C17A839CEE703DB894D73D8AECCA0AE2",
  "key": "yt8",
  "lang": "en-GB",
  "fmt": "json3",
  "xorb": "2",
  "xobt": "3",
  "xovt": "3"
}
```

Kita dapat memahami beberapa pasang _key-value_:

- `v` berisi identitas unik video YouTube.
- `hl` kependekan dari _host language_. Cukup umum bagi layanan API Google menggunakan _key_ ini. Fungsinya mendefinisikan sesuatu yang berhubungan dengan pengaturan bahasa.
- `expire` kapan _request_ API akan kadaluarsa. Nilainya berformat detik.
- `signature` identitas acak dari setiap _request_. Menurut saya, nilai dari _key_ ini mendefinisikan _request_ mana yang berhak diproses. Tanggal kadaluarsa nampaknya juga memiliki koneksi dengan identitas ini. Saya mencoba menghilangkan parameter ini ketika mengakses API-nya tetapi malah mendapatkan respon gagal.
- `fmt` mendefinisikan format respon. Secara _default_, respon API terformat sebagai `json3`. Anggapan saya nilai tersebut dapat diubah. Saya mencoba format _caption_ lain, seperti `vtt` dan ternyata bekerja.

Sebenarnya masih terdapat beberapa paasng _key-value_ lainnya, tetapi yang saya sebutkan di atas merupakan yang paling penting.

<app-img src="/blog/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-devtools-vtt-by-jefrydco.jpg" alt="Alat Pengembang Menampilkan Respon Caption YouTube dalam Format WebVTT"></app-img>

Yeaye! Saya rasa kita dapat menggunakan pranala API tersebut untuk membangun aplikasi web pencari kata kunci dari sebuah video YouTube.

---

Tetapi sebelum kita melanjutkan pembahasan, mari kita melihat terlebih dahulu isi dari format WebVTT:

```vtt
WEBVTT
Kind: captions
Language: en

00:00:00.357 --> 00:00:01.822
- [Narrator] There is
a growing feeling today

00:00:01.822 --> 00:00:04.699
that something is wrong with
our system of education.
```

WebVTT hanyalah sebuah teks biasa dengan format konten tertentu. Secara umum, **WebVTT terdiri dari 2 bagian, header dan cue**. 

```vtt
WEBVTT
Kind: captions
Language: en
```

**Header berisi metadata** mengenai _caption_, seperti bahasa yang digunakan atau pembuat _caption_-nya.

```vtt
00:00:00.357 --> 00:00:01.822
- [Narrator] There is
a growing feeling today

00:00:01.822 --> 00:00:04.699
that something is wrong with
our system of education.
```

**Cue dapat dibagi menjadi 3 bagian, waktu mulai, waktu berakhir dan teks**. Teks merupakan _caption_ yang akan ditampilkan saat video diputar. Waktu mulai menunjukkan kapan suatu bagian teks akan ditampilkan sedangkan waktu berakhir menunjukkan kapan dihilangkan.

---

## Bahan Baku

Berikut beberapa paket NPM utama yang dapat kita gunakan untuk membuat API:

- [@vercel/node](https://github.com/vercel/vercel), kita akan mengunggah kode kita ke Vercel, sehingga kita membutuhkan paket NPM ini untuk menjalankan API kita di sana.
- [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda), Vercel Serverless Function di balik layar berjalan di atas AWS Lambda. AWS Lambda memiliki batas pada seberapa besar ukuran fungsi yang dijalankan. Kalau tidak salah, ukuran maksimum sekitar **50MB** dan ukuran maksimum ketika diekstrak (_unzipped_) sekitar **250MB**. Untuk mengakomodasi batasan ini, kita tidak dapat menggunakan puppeteer yang biasa. Karena puppeteer yang biasa akan mengunduh berkas Chrome secara penuh. Sebagai gantinya, kita akan menggunakan puppeteer-core dan paket ini sebagai pendampingnya. Paket ini akan memasang versi chrome yang lebih kecil ukurannya karena terkompresi menggunakan [algoritma Brotli](https://brotli.org/).
- [flexsearch](https://github.com/nextapps-de/flexsearch), kita akan membuat API untuk pencarian, sehingga kita membutuhkan mekanisme pencarian supaya efektif. Meskipun kita dapat menggunakan fungsi `Array.prototype.filter` bawaan JavaScript, menurut pendapat saya akan lebih baik jika kita dapat meningkatkan peforma pencarian menggunakan perpustakaan pihak ke-3. Aplikasi web Searh web.dev Live juga menggunakan paket NPM ini.
- [get-urls](https://github.com/sindresorhus/get-urls), paket NPM ini sangat berguna untuk mengekstrak metadata pranala dari sebuah string. Secara spesifik untuk mendapatkan pranala logo.
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch), kita akan menggunakan paket ini untuk mengambil data _caption_ dari REST API YouTube.
- [joi](https://github.com/sideway/joi), paket NPM ini berguna untuk validasi objek. Dia akan memastikan semua data sesuai dengan format yang telah ditentukan.
- [pino-logflare](https://github.com/Logflare/pino-logflare), log merupakan bagian yang cukup krusial dalam teknologi. Kita dapat menggunakannya untuk mencari dan memperbaiki bug. Namun, Vercel memiliki [aturan yang berbeda](https://vercel.com/docs/platform/limits#logs) dalam hal penyimpanan log. Singkatnya, cukup susah untuk mendapatkan informasi penting dari log karena batasan tersebut. Untungnya, Vercel juga menyediakan fitur bernama [Log Drain](https://vercel.com/blog/log-drains). Sederhananya, Vercel tidak akan menyimpan log di _server_-nya, melainkan pada layanan lain yang dikhususkan untuk menyimpan log aplikasi. Salah satunya adalah [Logflare](https://logflare.app/). Paket ini mengintegrasikan logger express bernama Pino dengan Logflare.
- [puppeteer-core](https://github.com/puppeteer/puppeteer), puppeteer merupakan headless chrome, kita membutuhkannya untuk membuka halaman YouTube.
- [string-strip-html](https://github.com/codsen/codsen/tree/main/packages/string-strip-html), terkadang _caption_ berisi kode HTML. Kita membutuhkan paket NPM ini untuk menghilangkannya.
- [caption](https://github.com/gsantiago/caption.js), kita mendapatkan data _caption_ dari YouTube API dalam format [WebVTT](https://en.wikipedia.org/wiki/WebVTT). Paket NPM ini berguna untuk mem-_parsing_ dan mengubah format tersebut menjadi objek JavaScript.
- [typescript](https://github.com/microsoft/TypeScript), JavaScript dengan tipe anotasi.

Untuk melihat lebih banyak paket NPM yang digunakan, teman-teman dapat melihatnya di berkas package.json pada repositori berikut, [Cari Teks Video API](https://github.com/jefrydco/cari-teks-video-api/blob/main/package.json).

## Modul

Kita telah mempunyai semua bahan bakunya. Sekarang kita akan membuat API dengan 2 _endpoint_, yang pertama adalah `/` dan yang kedua adalah `/search`. **_Endpoint_ indeks hanya kita gunakan untuk mendapatkan data _caption_ dari YouTube**. Sedangkan **_endpoint_ search untuk pencarian**. Pada artikel kali ini, kita akan lebih banyak membahas mengenai _endpoint_ pencarian.

<app-img src="/blog/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-api-diagram-by-jefrydco.jpg" alt="Diagram API Caption YouTube"></app-img>

Berdasarkan diagram di atas, kita dapat membagi REST API yang akan kita buat menjadi 8 modul yang lebih kecil.

### Guardian

Sesuai dengan namanya, Guardian yang berarti penjaga. Fungsi dari modul ini adalah memastikan parameter dan data yang didapat sesuai. Kita akan menggunakan Joi sebagai Guardian kita.

```typescript{}[] twoslash
import joi from 'joi'

const indexQuery = joi.object({
  url: joi.string().required(),
  page: joi.string().optional(),
  size: joi.string().optional(),
  paginated: joi.number().integer().allow(0, 1).optional()
})

const searchQuery = indexQuery.keys({
  q: joi.string().min(3).required(),
  marked: joi.number().integer().allow(0, 1).optional()
})
```

Mengikuti _endpoint_ REST API yang kita buat, ada 2 jenis parameter kueri. Yang pertama untuk indeks dan yang kedua untuk pencarian. Parameter kueri untuk pencarian meng-_extend_ indeks.

Jika teman-teman ingin mengetahui fungsi setiap parameter kueri, teman-teman dapat mempelajarinya di [dokumentasi Cari Teks Video API - Request](https://github.com/jefrydco/cari-teks-video-api/blob/main/readme-id.md#request).

### Retriever

Retriever berguna untuk mendapatkan data dari parameter kueri. Seperti yang kita lakukan pada Guardian, kita juga harus membagi retriever menjadi 2 jenis fungsi, indeks dan pencarian.

Untuk `url`, kita memasukkan pranala YouTube secara langsung sebagai parameter kueri. Tetapi jika kita membuka halaman YouTube secara umum, akan membutuhkan waktu yang lebih lama. Sehingga kita menggunakan versi _embedded_-nya. Oleh karena itu kita harus mengubah pranala tersebut menjadi versi _embedded_-nya.

Yang kita butuhkan hanyalah identitas video YouTube. Kita dapat menggunakan [Regular Expression](https://id.wikipedia.org/wiki/Ekspresi_reguler) atau pada umumnya disingkat sebagai RegEx untuk menyelesaikan permasalahan tersebut. Berikut RegEx yang akan kita gunakan:

```typescript{}[] twoslash
const youtubeUrl = 'https://www.youtube.com/watch?v=okpg-lVWLbE'
const result = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
  .exec(youtubeUrl)

let id = ''

if (Array.isArray(result) && result.length > 0) {
  id = result[1]
}
```

RegEx yang cukup panjang tetapi bekerja dengan baik. Saya mendapatkannya dari utas StackOverflow berikut, [Regular Expression untuk Identitas YouTube](https://stackoverflow.com/a/6904504).

Setelah kita mendapatkan identitas video tersebut, kita dapat menggabungkannya dengan pranala _embedded_ YouTube.

```typescript{}[] twoslash
declare const id: string;
/// ---cut---
// previous code

const youtubeEmbedUrl = `https://www.youtube.com/embed/${id}?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1`
```

Kita juga menambahkan beberapa parameter pada pranala tersebut.

- `hl`, sama seperti `hl` yang terdapat pada API _caption_ YouTube yang telah kita diskusikan di atas. `hl` merupakan kependekan dari _host language_ yang berfungsi untuk mengatur bahasa antarmuka pemutar video.
- `cc_lang_pref`, parameter ini mengatur bahasa _default_ untuk menampilkan _caption_.
- `cc_load_policy`, berfungsi untuk mengaktifkan _caption_ secara otomatis jika nilainya `1`.
- `autoplay`, memainkan video secara otomatis ketika termuat jika nilainya `1`.

### Fetcher

Modul ini merupakan bagian yang memerlukan waktu terbanyak untuk dibuat. Fetcher berisi beberapa submodul untuk mendapatkan API _caption_ YouTube, fetcher indeks dan fetcher pencarian.

### YouTube Closed Captions Fetcher

Fetcher ini sebenarnya digunakan pada _endpoint_ indeks. Tetapi untuk memahami bagaimana kita mendapatkan data _caption_, kita harus membahasnya.

Kita telah memahami algoritma untuk mendapatkan pranala API _caption_ YouTube. Kita harus mengubahnya menjadi kode yang nyata. Kita menggunakan puppeteer dan Chrome AWS Lambda untuk melakukannya. Mari kita lihat potongan kode berikut:

```typescript{6-8,13,18-24,27-29}[] twoslash
declare const youtubeEmbedUrl: string

/// ---cut---
import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

async function getYoutubeCC(url: string) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  })

  const page = await browser.newPage()

  await page.setRequestInterception(true)

  let ccUrl = ''

  page.on('request', (request) => {
    if (request.resourceType() === 'xhr') {
      const _ccUrl = request.url()
      if (_ccUrl.includes('https://www.youtube.com/api/timedtext')) {
        ccUrl = _ccUrl.replace('json3', 'vtt')
      }
    }
    request.continue()
  })

  await page.goto(url, {
    waitUntil: 'networkidle0'
  })

  return ccUrl
}

(async () => {
  const ccUrl = await getYoutubeCC(youtubeEmbedUrl)
})()
```

Kita membuat _instance_ peramban (_browser_) dan memasukkan opsi pengaturan untuk menggunakan Chrome AWS Lambda. Selain itu, kita juga menginisiasi halaman kosong baru.

Untuk mendapatkan pranala API _caption_ YouTube, kita harus meng-_intercept_ _request_ peramban. Kita dapat melakukannya dengan memanggil `setRequestInterception` yang terdapat pada objek `page` dengan parameter `true`. Sekarang kita dapat membuat _event listener_ untuk setiap _event_ `request`. Setelah itu, kita harus menyaring _request_ tersebut berdasarkan tipenya. Dalam hal ini kita harus mendapatkan _request_ bertipe `xhr`.

Selanjutnya kita juga harus memerika apakah _request_ bertipe `xhr` tersebut merupakan pranala API _caption_ YouTube atau bukan. Jika ditemukan, maka kita harus mengubah format `json3` menjadi `vtt`. _Event callback_ ini dipanggil setiap peramban melakukan _request_. Sehingga kita harus memanggil fungsi `continue` secara manual untuk memanggil _event request_ berikutnya.

Bagian terakhir dari bagian ini adalah memanggil fungsi `goto` dengan pranala _embedded_ YouTube yang telah kita deklarasikan pada bagian sebelumnya sebagai parameter pertama. Kita juga menggunakan opsi `waitUntil` dengan nilai `networkidle0`. Opsi tersebut mendefinisikan bahwa kita akan menunggu hingga halaman selesai termuat secara menyeluruh.

### Index Fetcher

Setelah kita mendapatkan pranala _caption_ dari [YouTube Closed Captions Fetcher](#youtube-closed-captions-fetcher), kita dapat mengambil data WebVTT-nya.

```typescript{4,6-8,12-13,17,21-23}[] twoslash
declare function getYoutubeCC(url: string): Promise<string>

declare type CCNode = {
    type: 'cue'
    data: {
      start: number
      end: number
      text: string
      settings?: string
    }
}

declare type CCNodeList = CCNode[]

declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare function vttToJson(vtt: string): CCNodeList

declare function stripHtml(string: string): string

declare function stripWhitespaceNewLine(string: string): string

declare function toSecond(timestamp: number): number

declare const ccUrl: string

/// ---cut---
(async () => {
  // previous code

  const data: Vtt[] = await fetch(ccUrl)
    .then((ccResponse) => {
      if (ccResponse.ok) {
        return ccResponse.text()
      }
      return ''
    })
    .then((ccText) => {
      const ccStriped = stripHtml(ccText)
      const ccJson = vttToJson(ccStriped)

      const ccData = ccJson
        .filter((item) => {
          return item.type === 'cue'
        })
        .map((item) => {
          return {
            start: toSecond((item as CCNode).data.start || 0),
            end: toSecond((item as CCNode).data.end || 0),
            text: stripWhitespaceNewLine((item as CCNode).data.text)
          }
        }) as Vtt[]

      return ccData
    })
})()
```

> Catatan: `CCNode` merupakan deklarasi tipe data yang saya buat sendiri untuk tujuan demo. Deklarasi tipe data asli yang berasal dari paket NPM subtitle adalah `NodeCue`.

Kita menggunakan fungsi `fetch` untuk mendapatkan datanya. Jika responnya sukses, kita dapat memanggil fungsi `text` dan mendapatkan data _caption_ dalam bentuk teks. Jika responsennya gagal, kita hanya mengembalikan nilai string kosong.

Biasanya, data _caption_ berisi kode HTML. Jadi kita harus menghilangkannya dengan memanggil fungsi `stripHtml`. Fungsi tersebut mengembalikan nilai dalam bentuk string juga. Untuk memudahkan kita berinteraksi dengan data tersebut, kita harus mengubahnya menjadi bentuk yang umum di JavaScript.

Kita mengubahnya menjadi objek JSON dengan cara memanggil fungsi `vttToJson`. Di balik layar, fungsi tersebut menggunakan fungsi `parseSync` dari paket NPM [subtitle](https://github.com/gsantiago/subtitle.js). Hasil nilai kembaliannya berupa _array of object_.

Terkadang item dari array tersebut tercampur antara header dan cue. Item yang kita butuhkan hanyalah cue, jadi kita harus memfilternya. Setelah itu, kita memetakan array tersebut menjadi bentuk objek yang kita butuhkan, waktu mulai, waktu berakhir dan teks _caption_.

Waktu mulai dan waktu berakhir terbaca dalam format mili detik tetapi **skema pranala YouTube pada umumnya menggunakan waktu dalam format detik**. Oleh karena itu kita harus mengubahnya menjadi format yang benar menggunakan fungsi utilitas `toSecond`. Fungsi tersebut hanyalah fungsi sederhana yang membulatkan pembagian nilai mili detik dengan 1000.

Terkadang properti teks berisi spasi dan garis baru di akhir kalimat. Kita dapat membersihkannya menggunakan fungsi utilitas `stripWhitespaceNewLine`.

### Search Fetcher

Fetcher ini digunakan pada _endpoint_ pencarian. Hal yang dilakukan adalah mendapatkan respon JSON dari _endpoint_ indeks.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare type FetcherReturnType = {
  data: Vtt[]
}

declare const youtubeUrl: string

/// ---cut---
(async () => {
  // previous code

  const indexEndpoint = `https://cari-teks-video-api.vercel.app/api/?url=${youtubeUrl}&paginated=0`

  const list: FetcherReturnType = await fetch(indexEndpoint)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return []
    })
    .then((data: Vtt[]) => {
      return {
        data
      }
    })
})()
```

Secara _default_, ketika kita melakukan _request_ ke _endpoint_ indeks, responnya akan terpaginasi. Jadi kita harus menambahkan parameter `paginated=0` untuk mendapatkan hasil keseluruhan.

### ID Generator

Flexsearch membutuhkan setiap item memiliki identitas unik. Modul ini akan meng-_generate_ identitas tersebut.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const list: Vtt[]

/// ---cut---
(async () => {
  // previous code

  const generatedIdList = list.map((item, id) => {
    return {
      ...item,
      id
    }
  })
})()
```

Modul ini akan memetakan objek sebelumnya dan menambahkan properti baru untuk identitas. Nilai dari identitas tersebut dapat kita ambil dari indeks array setiap item.

### Finder

Kita menggunakan paket NPM bernama Flexsearch untuk melakukan pencarian kata kunci. Berdasarkan uji coba yang disebutkan pada halaman GitHubnya, [Flexsearch](https://github.com/nextapps-de/flexsearch#webs-fastest-and-most-memory-flexible-full-text-search-library-with-zero-dependencies) merupakan perpustakaan pencarian teks menyeluruh yang tercepat dan paling efisien penggunaan memorinya. Selain itu Flexsearch juga tanpa dependensi apapun.

```typescript{7-10,13,17}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const generatedIdList: Vtt[]

/// ---cut---
import Flexsearch from 'flexsearch'

(async () => {
  // previous code

  const index = Flexsearch.create<Vtt>({
    doc: {
      id: 'id',
      field: ['text']
    }
  })
  generatedIdList.forEach((item) => {
    index.add(item)
  })

  const keyword = 'education'
  const resultList = await index.search(keyword)
})()
```

Pada mulanya kita membuat indeks dengan cara memanggil fungsi `create`. Kita memasukkan beberapa konfigurasi seperti nama _key_ dari identitas dan nama _key_ apa yang Flexsearch harus cari ketika melakukan pencarian.

Setelah itu, kita lakukan perulangan dan menambahkan setiap item ke dalam indeks dengan cara memanggil fungsi `add`. Jika kita ingin mencari kata kunci, yang perlu dilakukan hanyalah memanggil fungsi `search` dari objek `index` dengan kata kunci yang dimaksud sebagai parameter pertama. Nilai yang dihasilkan dari pemanggilan tersebut berupa array yang telah difilter sesuai dengan kata kunci.

### Highlighter

Sayangnya, Flexsearch belum memiliki _highlighter_ bawaan ataupun yang dapat kita ubah-ubah sendiri. Namun, kita dapat mengimplementasinya sendiri. Karena nilai yang dikembalikan dari fungsi `search` merupakan daftar yang telah difilter, kita dapat melakukan perulangan dan meng-_highlight_ kata kunci yang ditemukan dengan tag HTML.

```typescript{5,11,15-18}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const resultList: Vtt[]

declare const keyword: string

/// ---cut---
(async () => {
  // previous code

  function replacer(match: string) {
    return `<mark class="cvt-highlight">${match}</mark>`
  }

  const highlightedList: Vtt[] = resultList.map((item) => {
    let text = ''
    if (item.text.includes(keyword)) {
      text = `${item.text}`.replace(new RegExp(`${keyword}`, 'gi'), replacer)
    } else {
      const multipleWords = keyword.match(/\S+/g)
      if (multipleWords) {
        text = `${item.text}`.replace(
          new RegExp(`${multipleWords.join('|')}`, 'gi'),
          replacer
        )
      }
    }

    return {
      ...item,
      text
    }
  })
})()
```

Jika kata kunci yang digunakan hanya terdiri dari satu kata, kita menggunakan fungsi `String.prototype.includes` untuk mengecek apakah teks berisi kata kunci yang dimaksud. Jika ditemukan, maka kita dapat melakukan mekanisme _highlighting_.

Sedangkan jika kata kunci yang digunakan terdiri dari beberapa kata, kita tidak dapat menggunakan metode tersebut. Sebagai gantinya, kita menggabungkan setiap kata pada kata kunci tersebut menjadi format RegEx. Katakanlah kata kunci yang digunakan adalah `current education`, kita mengubahnya menjadi `/current|education/gi`. Sehingga ketika melakukan mekanisme _highlighting_, setiap kata akan memiliki pembungkusnya masing-masing.

### Paginator

Modul ini mengubah array menjadi versi terpaginasinya. Saya menemukan jawaban ringkas dari StackOverflow yang dapat membantu kita menyelesaikan permasalahan ini, [Mempaginasi Array JavaScript](https://stackoverflow.com/a/42761393).

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const highlightedList: Vtt[]

/// ---cut---
(async () => {
  // previous code

  const pageNumber = 1
  const pageSize = 10

  const paginatedList = highlightedList
    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
})()
```

Satu-satunya parameter yang kita butuhkan adalah nomor halaman dan banyaknya item. Nomor halaman adalah halaman saat ini yang akan dikembalikan dan banyaknya item adalah berapa banyak item yang akan dikembalikan.

### ID Remover

Identitas yang ditambahkan oleh modul ID Generator hanya digunakan untuk membuat indeks untuk pencarian. Di sini kita sudah tidak membutuhkannya dan dapat dihapus.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const paginatedList: Vtt[]

/// ---cut---
(async () => {
  // previous code

  const removedIdList = paginatedList.map((item) => {
    delete item.id
    return item
  })
})()
```

Untuk menghapus identitas tersebut, kita dapat melakukan pemetaan pada array menjadi array yang baru dan menghapus properti `id`.

### Formatter

Modul terakhir adalah formatter. Kita tidak akan membahas terlalu panjang bagaimana modul ini terimplementasi. Tetapi secara garis besar modul ini akan menghasilkan pranala untuk halaman sebelumnya, selanjutnya, pertama dan terakhir.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare type FormatterReturnType = {
  first: string
  last: string
  prev: string
  next: string
  total: number
  page: number
  data: Vtt[]
}

declare enum PaginationUrlType {
  First,
  Last,
  Prev,
  Next
}

declare type FormatterOptions = {
  reqUrl: string
  page: number
  size: number
  dataLength: number
}

declare const removedIdList: Vtt[]

declare const pageNumber: number

declare const pageSize: number

declare function getPaginationUrl(type: PaginationUrlType, options: FormatterOptions): string

/// ---cut---
(async () => {
  // previous code

  const options: FormatterOptions = {
    reqUrl: 'https://cari-teks-video-api.vercel.app/api',
    page: pageNumber,
    size: pageSize,
    dataLength: removedIdList.length
  }

  const response: FormatterReturnType = {
    first: getPaginationUrl(PaginationUrlType.First, options),
    last: getPaginationUrl(PaginationUrlType.Last, options),
    prev: getPaginationUrl(PaginationUrlType.Prev, options),
    next: getPaginationUrl(PaginationUrlType.Next, options),
    total: options.dataLength,
    page: options.page,
    data: removedIdList
  }
})()
```

Fungsi `getPaginationRul` menerima 2 parameter, parameter pertama berupa enum TypeScript. Enum tersebut berfungsi untuk mengidentifikasi paginasi yang mana yang sedang berlangsung. Parameter kedua adalah opsi yang terdiri dari:

- `reqUrl`, _request_ pranala saat ini. Jika saat ini _request_ ke _endpoint_ indeks maka pranalanya berakhiran `/`. Dan jika _request_ ke _endpoint_ pencarian, maka pranalanya berakhiran `/search`.
- `page`, halaman pencarian saat ini, secara _default_ nilai dari opsi ini adalah halaman pertama.
- `size`, berapa banyak hasil yang harus dikembalikan oleh API, secara _default_ nilai dari opsi ini adalah 10 item.
- `dataLength`, berapa banyak data sebelum terpaginasi.

---

Artikel ini hanya membahas bagian penting dari keseluruhan kode sumber. Jika teman-teman ingin mengetahui bagaimana penerapan nyatanya, teman-teman dapat mempelajarinya di repositori GitHub berikut, [Cari Teks Video API](https://github.com/jefrydco/cari-teks-video-api/blob/main/readme-id.md#readme).

## Penyangkalan

1. "Metode" mengarah ke langkah-langkah atau penjelasan yang saya tulis pada artikel ini.
2. "API" mengarah ke semua API yang tersedia pada https://cari-teks-video-api.vercel.app/api.
3. Semua metode ini murni **bertujuan untuk riset dan eksperimen**.
4. Jika YouTube memutuskan untuk mengubah skema API _caption_ atau menggunakan cara lain, metode ini **kemungkinan tidak dapat digunakan**.
5. Karena API yang dibuat di-_host_ pada versi gratis dari Vercel yang memiliki beberapa batasan. Salah satunya adalah berapa banyak pemanggilan fungsi. Jika API tersebut tiba-tiba tidak dapat diakses, kemungkinan telah melewati batasan tersebut.
6. Karena poin nomor 4 dan 5, saya **tidak dapat menjamin API tersebut akan dapat digunakan secara terus-menerus**. Tetapi saya akan melakukan pengecekan secara reguler untuk memastikannya tetap berjalan baik.
7. **Jangan gunakan untuk _production_**. Saya tidak akan bertanggung jawab terhadap dampak apapun yang ditimbulkan dari penggunaan tersebut.
8. YouTube memiliki [API Data YouTube untuk _Caption_](https://developers.google.com/youtube/v3/docs/captions?hl=id) untuk menyediakan cara resmi mengakses _caption_. Silahkan **gunakan layanan ini jika teman-teman ingin menggunakan fitur serupa untuk _production_**.
9. Jika teman-teman menemukan bug, silahkan mengirimkan _issue_ di repositori GitHub berikut, [Cari Teks Video API](https://github.com/jefrydco/cari-teks-video-api/blob/main/readme-id.md#readme).

## Referensi

- [GitHub: Cari Teks Video API Docs](https://github.com/jefrydco/cari-teks-video-api#readme)
- [GitHub: Search web.dev Live by Sam Dutton](https://github.com/samdutton/wdl)
- [Google Developers Portal: API Data YouTube untuk Caption](https://developers.google.com/youtube/v3/docs/captions)
- [StackOverflow: Mempaginasi Javascript Array](https://stackoverflow.com/a/42761393)
- [StackOverflow: Regex untuk ID YouTube](https://stackoverflow.com/a/6904504)
