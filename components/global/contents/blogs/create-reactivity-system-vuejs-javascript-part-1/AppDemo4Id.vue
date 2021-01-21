<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo__card demo__card-4">
      <pre class="demo__code keadaan"></pre>

      <input type="number" class="demo__form input1" min="0" />
      <select class="demo__form operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="demo__form input2" min="0" />

      <div class="hasil"></div>

      <div ref="script4" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo4Id',
  methods: {
    init: onetime(function () {
      // @ts-expect-error
      const script4 = this.$refs?.script4 as Element
      if (script4) {
        const newScript = document.createElement('script')
        const inlineScript = document.createTextNode(`if (!window.keadaan4) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan4 = (function () {
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
                '.demo__card-4 .keadaan'
              )
              tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)

              const tampilanHasil = document.querySelector(
                '.demo__card-4 .hasil'
              )
              tampilanHasil.innerText = keadaan.hasil.toString()

              const tampilanInput1 = document.querySelector(
                '.demo__card-4 .input1'
              )
              const tampilanInput2 = document.querySelector(
                '.demo__card-4 .input2'
              )

              tampilanInput1.value = keadaan.input1.toString()
              tampilanInput2.value = keadaan.input2.toString()
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return keadaan
          })()
        }`)
        newScript.appendChild(inlineScript)
        script4.appendChild(newScript)
      }
    })
  }
})
</script>
