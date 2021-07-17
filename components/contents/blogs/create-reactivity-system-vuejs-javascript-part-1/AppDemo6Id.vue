<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="app-demo__card demo__card-6">
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

      <div ref="script6" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo6Id',
  mounted() {
    const interval = setInterval(() => {
      const script6 = this.$refs?.script6 as Element
      if (script6) {
        this.init(script6)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script6: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.keadaan6) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan6 = (function () {
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
                '.app-demo__card-6 .keadaan'
              )

              const tampilanHasil = document.querySelector(
                '.app-demo__card-6 .hasil'
              )

              const tampilanInput1 = document.querySelector(
                '.app-demo__card-6 .input1'
              )
              const tampilanInput2 = document.querySelector(
                '.app-demo__card-6 .input2'
              )

              const tampilanOperator = document.querySelector(
                '.app-demo__card-6 .operator'
              )

              function mutakhirkanTampilan() {
                tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)
                tampilanHasil.innerText = keadaan.hasil.toString()

                tampilanInput1.value = keadaan.input1.toString()
                tampilanInput2.value = keadaan.input2.toString()

                tampilanOperator.value = keadaan.operator
              }

              mutakhirkanTampilan()

              tampilanInput1.addEventListener('input', function (peristiwa) {
                const targetInput1 = peristiwa.target
                keadaan.input1 = parseInt(targetInput1.value)
              })
              tampilanInput2.addEventListener('input', function (peristiwa) {
                const targetInput2 = peristiwa.target
                keadaan.input2 = parseInt(targetInput2.value)
              })

              tampilanOperator.addEventListener('change', function (peristiwa) {
                const targetOperator = peristiwa.target
                const selectedOperator = targetOperator.selectedOptions[0].value
                keadaan.operator = selectedOperator
              })
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return keadaan
          })()
        }`)
      newScript.appendChild(inlineScript)
      script6.appendChild(newScript)
    })
  }
})
</script>
