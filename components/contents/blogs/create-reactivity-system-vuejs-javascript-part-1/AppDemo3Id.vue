<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo-card demo-card-3">
      <pre class="keadaan"></pre>

      <input type="number" class="input1" min="0" />
      <select class="operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="input2" min="0" />

      <div class="hasil"></div>

      <script>
        if (!window.keadaan3) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan3 = (function () {
            const OPERATOR = {
              TAMBAH: '+',
              KURANG: '-',
              KALI: '*',
              BAGI: '/'
            }

            const keadaan = {
              hasil: 0,
              operator: OPERATOR.TAMBAH,
              input1: 0,
              input2: 0
            }

            function mulai() {
              // Kita harus memberi awalan selektor sesuai dengan kelas akar komponen
              // Hal tersebut mencegah scrip dieksekusi untuk semua demo
              const tampilanKeadaan = document.querySelector(
                '.demo-card-3 .keadaan'
              )
              tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)

              const tampilanHasil = document.querySelector(
                '.demo-card-3 .hasil'
              )
              tampilanHasil.innerText = keadaan.hasil.toString()
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return keadaan
          })()
        }
      </script>
    </div>
  </app-demo>
</template>

<script>
import AppDemoBase from './AppDemoBase'

export default {
  extends: AppDemoBase
}
</script>
