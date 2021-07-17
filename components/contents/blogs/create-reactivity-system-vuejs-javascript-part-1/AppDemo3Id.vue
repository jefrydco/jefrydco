<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="app-demo__card demo__card-3">
      <pre class="app-demo__code keadaan"></pre>

      <input type="number" class="app-demo__form input1" min="0" />
      <select class="app-demo__form operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="app-demo__form input2" min="0" />

      <div class="hasil"></div>

      <div ref="script3" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo3Id',
  mounted() {
    const interval = setInterval(() => {
      const script3 = this.$refs?.script3 as Element
      if (script3) {
        this.init(script3)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script3: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.keadaan3) {
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
                '.app-demo__card-3 .keadaan'
              )
              tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)

              const tampilanHasil = document.querySelector(
                '.app-demo__card-3 .hasil'
              )
              tampilanHasil.innerText = keadaan.hasil.toString()
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return keadaan
          })()
        }`)
      newScript.appendChild(inlineScript)
      script3.appendChild(newScript)
    })
  }
})
</script>
