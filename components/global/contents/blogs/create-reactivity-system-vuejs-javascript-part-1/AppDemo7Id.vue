<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo__card demo__card-7">
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

      <div ref="script7" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo7Id',
  updated() {
    this.init()
  },
  methods: {
    init: onetime(function () {
      // @ts-expect-error
      const script7 = this.$refs?.script7 as Element
      if (script7) {
        const newScript = document.createElement('script')
        const inlineScript = document.createTextNode(`if (!window.keadaan7) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan7 = (function () {
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
                '.demo__card-7 .keadaan'
              )

              const tampilanHasil = document.querySelector(
                '.demo__card-7 .hasil'
              )

              const tampilanInput1 = document.querySelector(
                '.demo__card-7 .input1'
              )
              const tampilanInput2 = document.querySelector(
                '.demo__card-7 .input2'
              )

              const tampilanOperator = document.querySelector(
                '.demo__card-7 .operator'
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
              })
              tampilanInput2.addEventListener('input', function (peristiwa) {
                const targetInput2 = peristiwa.target
                keadaan.input2 = parseInt(targetInput2.value)
                kalkulasiHasil()
              })

              tampilanOperator.addEventListener('change', function (peristiwa) {
                const targetOperator = peristiwa.target
                const selectedOperator = targetOperator.selectedOptions[0].value
                keadaan.operator = selectedOperator
                kalkulasiHasil()
              })
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return keadaan
          })()
        }`)
        newScript.appendChild(inlineScript)
        script7.appendChild(newScript)
      }
    })
  }
})
</script>
