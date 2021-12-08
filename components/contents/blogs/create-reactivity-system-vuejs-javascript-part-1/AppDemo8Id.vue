<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name" class="app-demo__card-8">
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

    <div ref="script8" class="script"></div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo8Id',
  mounted() {
    const interval = setInterval(() => {
      const script8 = this.$refs?.script8 as Element
      if (script8) {
        this.init(script8)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script8: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.keadaan8) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan8 = (function () {
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
                '.app-demo__card-8 .keadaan'
              )

              const tampilanHasil = document.querySelector(
                '.app-demo__card-8 .hasil'
              )

              const tampilanInput1 = document.querySelector(
                '.app-demo__card-8 .input1'
              )
              const tampilanInput2 = document.querySelector(
                '.app-demo__card-8 .input2'
              )

              const tampilanOperator = document.querySelector(
                '.app-demo__card-8 .operator'
              )

              function mutakhirkanTampilan() {
                tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)
                tampilanHasil.innerText = keadaan.hasil.toString()

                tampilanInput1.value = keadaan.input1.toString()
                tampilanInput2.value = keadaan.input2.toString()

                tampilanOperator.value = keadaan.operator
              }

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
                    break
                }
              }

              mutakhirkanTampilan()

              tampilanInput1.addEventListener('input', function (peristiwa) {
                const targetInput1 = peristiwa.target
                keadaan.input1 = parseInt(targetInput1.value)
                kalkulasiHasil()
                mutakhirkanTampilan()
              })
              tampilanInput2.addEventListener('input', function (peristiwa) {
                const targetInput2 = peristiwa.target
                keadaan.input2 = parseInt(targetInput2.value)
                kalkulasiHasil()
                mutakhirkanTampilan()
              })

              tampilanOperator.addEventListener('change', function (peristiwa) {
                const targetOperator = peristiwa.target
                const selectedOperator = targetOperator.selectedOptions[0].value
                keadaan.operator = selectedOperator
                kalkulasiHasil()
                mutakhirkanTampilan()
              })
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return keadaan
          })()
        }`)
      newScript.appendChild(inlineScript)
      script8.appendChild(newScript)
    })
  }
})
</script>
