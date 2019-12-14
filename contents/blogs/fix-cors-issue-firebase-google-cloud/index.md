---
title: Cara Memperbaiki Masalah CORS di Firebase atau Google Cloud Storage
description: Solusi untuk memperbaiki masalah CORS di Firebase atau Google Cloud Storage
summary: Saya memperbaiki bug yang sudah lama ditinggalkan dalam proyek saya. Kesalahan sebenarnya cukup sederhana yakni, gambar yang disimpan di Firebase Cloud Storage tidak dapat diambil melalui permintaan AJAX.
img: /cover/2019/04/fix-cors-firebase-google-cloud-image-by-toa-heftiba.jpg
imgCreator: heftiba
postedDate: 2019-04-27T17:37:21.057Z
updatedDate: 2019-04-27T17:37:21.057Z
slug: fix-cors-issue-firebase-google-cloud
id: fix-cors-issue-firebase-google-cloud
---

Saya memperbaiki bug yang sudah lama ditinggalkan dalam proyek saya. Kesalahan sebenarnya cukup sederhana yakni gambar yang disimpan di Firebase Cloud Storage tidak dapat diambil melalui permintaan AJAX. Saya memeriksa konsol JavaScript dan kesalahan ini muncul:

> Access to fetch at 'IMAGE-URL-FROM-FIREBASE-CLOUD -STORAGE' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Setelah beberapa upaya, saya mendapat jawaban dari StackOverflow, [Firebase Storage and Access-Control-Allow-Origin](https://stackoverflow.com/a/37765371/7711812).

Untuk mengatasi masalah itu, kita perlu mengakses [Google Cloud Console](https://console.cloud.google.com/home/dashboard). Kemudian, pilih proyek yang ingin saya selesaikan. Aktifkan cloud shell dengan mengklik ikon terminal di sudut kanan atas.

Jendela terminal akan muncul di bagian bawah. Kemudian, jalankan perintah ini di dalam terminal tersebut:

```bash
$ nano cors.json
```

Editor di dalam terminal akan muncul. Ketikkan kode ini ke dalamnya:

```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

Kita dapat mengubah simbol `*` menjadi URL lain. Misalnya, jika kita ingin gambar hanya dapat diakses dari URL blog ini, Kita dapat mengubah `*` menjadi `https://jefrydco.id`.

Kemudian tekan `CTRL + X` diikuti oleh `y`.

Setelah itu, jalankan perintah ini:

```bash
$ gsutil cors set cors.json gs://URL-BUCKET-PROYEK-KAMU
```

Jika berhasil, tampilan terminal akan seperti ini:

```bash
jefrydco@cloudshell:~ (ID-PROYEK)$ gsutil cors set cors.json gs://URL-BUCKET-PROYEK-KAMU
Setting CORS on gs://URL-BUCKET-PROYEK-KAMU/...
jefrydco@cloudshell:~ (ID-PROYEK)$
```

URL _bucket_ proyek dapat ditemukan dari dasbor Firebase pada menu Penyimpanan seperti gambar ini:

<app-img src="/content/2019/04/firebase-storage-image-by-jefrydco.jpg" alt="Firebase Storage Image"/>

Atau dari dasbor Google Cloud Console pada menu Storage seperti gambar ini:

<app-img src="/content/2019/04/google-cloud-storage-image-by-jefrydco.jpg" alt="Google Cloud Storage" />
