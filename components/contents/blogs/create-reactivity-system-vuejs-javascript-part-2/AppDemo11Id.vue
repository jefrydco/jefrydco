<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="app-demo__card app-demo__card-11">
      <pre class="app-demo__code keadaan"></pre>

      <input type="number" class="app-demo__form input1" min="0" />
      <select class="app-demo__form operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="app-demo__form input2" min="0" />

      <div class="result"></div>

      <hr />

      <pre class="app-demo__code keadaan-2"></pre>

      <div>
        <button class="btn mulai">Mulai</button>
        <button class="btn berhenti">Berhenti</button>
        <button class="btn reset">Reset</button>
      </div>

      <div class="detik"></div>

      <div ref="script11" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity2 from './ExtendableCreateReactivity2'

export default ExtendableCreateReactivity2.extend({
  name: 'AppDemo11Id',
  mounted() {
    const interval = setInterval(() => {
      const script11 = this.$refs?.script11 as Element
      if (script11) {
        this.init(script11)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script11: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.keadaan11) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan11 = (function () {
            const OPERATOR = {
              PLUS: '+',
              SUBSTRACT: '-',
              MULTIPLY: '*',
              DIVIDE: '/'
            }

            const keadaan = {
              result: 0,
              operator: OPERATOR.PLUS,
              input1: 0,
              input2: 0
            }

            function main() {
              // Kita harus memberi awalan selektor sesuai dengan kelas akar komponen
              // Hal tersebut mencegah scrip dieksekusi untuk semua demo
              const tampilanKeadaan = document.querySelector(
                '.app-demo__card-11 .keadaan'
              )

              const tampilanHasil = document.querySelector(
                '.app-demo__card-11 .result'
              )

              const tampilanInput1 = document.querySelector(
                '.app-demo__card-11 .input1'
              )
              const tampilanInput2 = document.querySelector(
                '.app-demo__card-11 .input2'
              )

              const tampilanOperator = document.querySelector(
                '.app-demo__card-11 .operator'
              )

              function mutakhirkanTampilan() {
                tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)
                tampilanHasil.innerText = keadaan.result.toString()

                tampilanInput1.value = keadaan.input1.toString()
                tampilanInput2.value = keadaan.input2.toString()

                tampilanOperator.value = keadaan.operator
              }

              function kalkulasiHasil() {
                switch (keadaan.operator) {
                  case OPERATOR.PLUS:
                    keadaan.result = keadaan.input1 + keadaan.input2
                    break
                  case OPERATOR.SUBSTRACT:
                    keadaan.result = keadaan.input1 - keadaan.input2
                    break
                  case OPERATOR.MULTIPLY:
                    keadaan.result = keadaan.input1 * keadaan.input2
                    break
                  case OPERATOR.DIVIDE:
                    keadaan.result = keadaan.input1 / keadaan.input2
                    break
                  default:
                    break
                }
              }

              const daftarKunci = Object.keys(keadaan)

              daftarKunci.forEach(function (kunci) {
                let nilai = keadaan[kunci]

                Object.defineProperty(keadaan, kunci, {
                  enumerable: true,
                  configurable: true,
                  get: function pengambilReaktif() {
                    return nilai
                  },
                  set: function pengaturReaktif(nilaiBaru) {
                    if (nilaiBaru === nilai) {
                      return
                    }
                    nilai = nilaiBaru
                    mutakhirkanTampilan()
                    kalkulasiHasil()
                  }
                })
              })

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
            // document.addEventListener('DOMContentLoaded', main)
            main()

            return keadaan
          })()
        }`)
      newScript.appendChild(inlineScript)
      script11.appendChild(newScript)
    })
  }
})
</script>
